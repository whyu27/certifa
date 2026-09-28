import QRCode from 'qrcode';

/**
 * Generates a high-quality QR code buffer for the given URL.
 * @param {string} url - Target verification URL
 * @param {number} [width=300] - QR code width in pixels
 * @returns {Promise<Buffer>} PNG image buffer
 */
export async function generateQRCodeBuffer(url, width = 300) {
  return QRCode.toBuffer(url, {
    type: 'png',
    width: width,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });
}

/**
 * Generates a data URL for QR Code.
 * @param {string} url
 * @returns {Promise<string>} Data URL
 */
export async function generateQRCodeDataUrl(url) {
  return QRCode.toDataURL(url, {
    width: 300,
    margin: 2,
    errorCorrectionLevel: 'H'
  });
}
