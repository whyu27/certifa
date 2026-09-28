import crypto from 'crypto';

/**
 * Calculates SHA-256 hash of a buffer.
 * Returns bytes32 formatted hex string (0x...) compatible with Solidity bytes32.
 * @param {Buffer} buffer
 * @returns {{ hashHex: string, bytes32Hash: string }}
 */
export function calculateFileHash(buffer) {
  const hashHex = crypto.createHash('sha256').update(buffer).digest('hex');
  const bytes32Hash = `0x${hashHex}`;
  return { hashHex, bytes32Hash };
}
