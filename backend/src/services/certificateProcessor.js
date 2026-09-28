import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';
import { generateQRCodeBuffer } from './qrService.js';
import { calculateFileHash } from '../utils/hashUtil.js';

/**
 * Stamps a QR code onto an image certificate (PNG, JPEG, WEBP).
 * Positions the QR code at bottom-right corner with a sleek border.
 * 
 * @param {Buffer} imageBuffer - Original certificate image buffer
 * @param {string} certId - Certificate ID
 * @param {string} verifyUrl - Verification URL for QR code
 * @returns {Promise<{ buffer: Buffer, mimeType: string }>}
 */
async function stampQRCodeOnImage(imageBuffer, certId, verifyUrl) {
  const metadata = await sharp(imageBuffer).metadata();
  const width = metadata.width || 1920;
  const height = metadata.height || 1080;

  // Responsive QR sizing (proportional to certificate resolution)
  const qrSize = Math.max(140, Math.min(260, Math.round(width * 0.12)));
  const margin = Math.round(width * 0.035);

  const qrBuffer = await generateQRCodeBuffer(verifyUrl, qrSize);

  // Create a stylish badge with white background and subtle rounded rect or label
  const badgeWidth = qrSize + 20;
  const badgeHeight = qrSize + 40;
  const badgeSvg = `
    <svg width="${badgeWidth}" height="${badgeHeight}">
      <rect x="0" y="0" width="${badgeWidth}" height="${badgeHeight}" rx="12" fill="white" stroke="#e2e8f0" stroke-width="2" />
      <text x="${badgeWidth / 2}" y="${badgeHeight - 12}" font-family="sans-serif" font-size="10" font-weight="bold" fill="#475569" text-anchor="middle">
        VERIFY AUTHENTICITY
      </text>
    </svg>
  `;
  const badgeBuffer = Buffer.from(badgeSvg);

  const compositeBadge = await sharp(badgeBuffer)
    .composite([
      {
        input: qrBuffer,
        top: 10,
        left: 10
      }
    ])
    .png()
    .toBuffer();

  const left = Math.max(0, width - badgeWidth - margin);
  const top = Math.max(0, height - badgeHeight - margin);

  const processedBuffer = await sharp(imageBuffer)
    .composite([
      {
        input: compositeBadge,
        top: top,
        left: left
      }
    ])
    .png()
    .toBuffer();

  return {
    buffer: processedBuffer,
    mimeType: 'image/png'
  };
}

/**
 * Stamps a QR code onto a PDF certificate using pdf-lib.
 * 
 * @param {Buffer} pdfBuffer - Original PDF buffer
 * @param {string} certId - Certificate ID
 * @param {string} verifyUrl - Verification URL for QR code
 * @returns {Promise<{ buffer: Buffer, mimeType: string }>}
 */
async function stampQRCodeOnPDF(pdfBuffer, certId, verifyUrl) {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  const qrSize = Math.max(70, Math.min(120, width * 0.15));
  const qrMargin = 25;

  const qrImageBuffer = await generateQRCodeBuffer(verifyUrl, Math.round(qrSize * 3));
  const qrImage = await pdfDoc.embedPng(qrImageBuffer);

  firstPage.drawImage(qrImage, {
    x: width - qrSize - qrMargin,
    y: qrMargin,
    width: qrSize,
    height: qrSize
  });

  const processedPdfBytes = await pdfDoc.save();
  return {
    buffer: Buffer.from(processedPdfBytes),
    mimeType: 'application/pdf'
  };
}

/**
 * Main certificate processing pipeline:
 * 1. Takes original file
 * 2. Stamped with QR Code for verification
 * 3. Computes final SHA-256 hash
 * 
 * @param {Object} file - Multer uploaded file
 * @param {string} certId - Certificate ID
 * @param {string} verifyUrl - Verification URL
 * @returns {Promise<{ finalBuffer: Buffer, mimeType: string, finalHash: string, bytes32Hash: string }>}
 */
export async function processCertificateFile(file, certId, verifyUrl) {
  const isPDF = file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf');
  
  let processedResult;
  if (isPDF) {
    processedResult = await stampQRCodeOnPDF(file.buffer, certId, verifyUrl);
  } else {
    processedResult = await stampQRCodeOnImage(file.buffer, certId, verifyUrl);
  }

  // Calculate SHA-256 on final processed buffer (with QR embedded)
  const { hashHex, bytes32Hash } = calculateFileHash(processedResult.buffer);

  return {
    finalBuffer: processedResult.buffer,
    mimeType: processedResult.mimeType,
    finalHash: hashHex,
    bytes32Hash: bytes32Hash
  };
}
