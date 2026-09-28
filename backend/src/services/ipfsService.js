import axios from 'axios';
import FormData from 'form-data';
import crypto from 'crypto';

/**
 * Uploads a file buffer to Pinata IPFS.
 * Fallbacks to local simulated CID if PINATA_JWT is not configured.
 * 
 * @param {Buffer} buffer - File buffer
 * @param {string} fileName - File name to store on IPFS
 * @param {Object} metadata - Optional custom metadata
 * @returns {Promise<{ ipfsHash: string, pinSize: number, timestamp: string, ipfsUrl: string }>}
 */
export async function uploadBufferToIPFS(buffer, fileName, metadata = {}) {
  const pinataJwt = process.env.PINATA_JWT;
  const pinataGateway = process.env.PINATA_GATEWAY || 'gateway.pinata.cloud';

  if (!pinataJwt || pinataJwt.trim() === '') {
    // Graceful fallback for local development without Pinata API key
    console.warn('[IPFS] Warning: PINATA_JWT not configured in .env. Generating mock IPFS CID for development.');
    const mockHash = 'Qm' + crypto.createHash('sha256').update(buffer).digest('hex').slice(0, 44);
    return {
      ipfsHash: mockHash,
      pinSize: buffer.length,
      timestamp: new Date().toISOString(),
      ipfsUrl: `https://${pinataGateway}/ipfs/${mockHash}`
    };
  }

  const formData = new FormData();
  formData.append('file', buffer, { filename: fileName });

  const pinataMetadata = JSON.stringify({
    name: fileName,
    keyvalues: {
      platform: 'Certifa',
      ...metadata
    }
  });
  formData.append('pinataMetadata', pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0
  });
  formData.append('pinataOptions', pinataOptions);

  try {
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      maxBodyLength: Infinity,
      headers: {
        'Authorization': `Bearer ${pinataJwt}`,
        ...formData.getHeaders()
      }
    });

    const ipfsHash = response.data.IpfsHash;
    return {
      ipfsHash: ipfsHash,
      pinSize: response.data.PinSize,
      timestamp: response.data.Timestamp,
      ipfsUrl: `https://${pinataGateway}/ipfs/${ipfsHash}`
    };
  } catch (error) {
    console.error('[IPFS] Pinata upload error:', error.response?.data || error.message);
    throw new Error(`Failed to upload file to IPFS: ${error.response?.data?.error?.details || error.message}`);
  }
}
