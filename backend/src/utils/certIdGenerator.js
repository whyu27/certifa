import crypto from 'crypto';

/**
 * Generates a unique Certificate ID following the PRD standard.
 * Format: CERT-YYYY-XXXXXX (e.g. CERT-2026-8F92A1)
 */
export function generateCertificateId() {
  const year = new Date().getFullYear();
  const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `CERT-${year}-${randomHex}`;
}
