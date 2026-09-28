import express from 'express';
import multer from 'multer';
import { generateCertificateId } from '../utils/certIdGenerator.js';
import { processCertificateFile } from '../services/certificateProcessor.js';
import { uploadBufferToIPFS } from '../services/ipfsService.js';
import { calculateFileHash } from '../utils/hashUtil.js';

const router = express.Router();

// Configure Multer for memory storage (max file size 10MB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'application/pdf'
    ];
    if (allowedMimes.includes(file.mimetype) || file.originalname.match(/\.(jpg|jpeg|png|webp|pdf)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Format file tidak didukung. Harap upload gambar (PNG, JPG, WEBP) atau dokumen PDF.'));
    }
  }
});

/**
 * @route   POST /api/certificates/process
 * @desc    Process original certificate: stamp QR code, calculate final SHA-256, upload to IPFS
 * @access  Public (Called by Issuer via Frontend before submitting on-chain tx)
 */
router.post('/process', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'File sertifikat wajib diunggah.'
      });
    }

    const { recipient, title, issueDate } = req.body;

    if (!recipient || !title) {
      return res.status(400).json({
        success: false,
        message: 'Recipient dan Title wajib diisi.'
      });
    }

    // 1. Generate unique Certificate ID
    const certId = generateCertificateId();

    // 2. Build Verification URL
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const verifyUrl = `${frontendUrl}/verify?id=${encodeURIComponent(certId)}`;

    // 3. Process certificate (stamp QR code & compute final SHA-256 hash)
    const { finalBuffer, mimeType, finalHash, bytes32Hash } = await processCertificateFile(
      req.file,
      certId,
      verifyUrl
    );

    // 4. Determine final filename
    const ext = mimeType === 'application/pdf' ? 'pdf' : 'png';
    const finalFileName = `${certId}.${ext}`;

    // 5. Upload final file to IPFS
    const ipfsResult = await uploadBufferToIPFS(finalBuffer, finalFileName, {
      certId,
      recipient,
      title
    });

    // 6. Return metadata & Base64 preview for client-side download
    const base64Data = `data:${mimeType};base64,${finalBuffer.toString('base64')}`;

    return res.status(200).json({
      success: true,
      data: {
        certId,
        certHash: bytes32Hash,
        rawHash: finalHash,
        ipfsCID: ipfsResult.ipfsHash,
        ipfsUrl: ipfsResult.ipfsUrl,
        recipient,
        title,
        issueDate: issueDate || new Date().toISOString().split('T')[0],
        mimeType,
        fileName: finalFileName,
        fileBase64: base64Data
      }
    });
  } catch (error) {
    console.error('Error processing certificate:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Terjadi kesalahan saat memproses sertifikat.'
    });
  }
});

/**
 * @route   POST /api/certificates/verify-hash
 * @desc    Calculate SHA-256 of uploaded file to verify integrity against blockchain
 */
router.post('/verify-hash', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'File sertifikat wajib diunggah untuk kalkulasi hash.'
      });
    }

    const { hashHex, bytes32Hash } = calculateFileHash(req.file.buffer);

    return res.status(200).json({
      success: true,
      data: {
        hashHex,
        bytes32Hash,
        fileSize: req.file.size,
        fileName: req.file.originalname
      }
    });
  } catch (error) {
    console.error('Error calculating hash:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menghitung hash file.'
    });
  }
});

export default router;
