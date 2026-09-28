import { createPublicClient, http, parseAbi } from 'viem';
import { sepolia } from 'viem/chains';

export const CONTRACT_ADDRESS = '0xAFC8bB36572ac3CcEa6c908dC8D26cd54E9c258a';
export const SEPOLIA_CHAIN_ID = 11155111;
export const SEPOLIA_RPC_URL = 'https://ethereum-sepolia-rpc.publicnode.com';
export const ETHERSCAN_BASE_URL = 'https://sepolia.etherscan.io';
export const IPFS_GATEWAY_URL = 'https://gateway.pinata.cloud/ipfs';
export const BACKEND_URL = 'http://localhost:5000/api';

export const CONTRACT_ABI = parseAbi([
  'function isAuthorizedIssuer(address _issuer) external view returns (bool)',
  'function owner() external view returns (address)',
  'function addIssuer(address _issuer) external',
  'function removeIssuer(address _issuer) external',
  'function issueCertificate(string calldata certId, bytes32 certificateHash, string calldata ipfsCID, string calldata recipient, string calldata title) external',
  'function revokeCertificate(string calldata certId) external',
  'function getCertificate(string calldata certId) external view returns ((string certId, bytes32 certificateHash, string ipfsCID, address issuer, string recipient, string title, uint256 issuedAt, bool revoked, bool exists))',
  'function getCertificatesByIssuer(address _issuer) external view returns (string[])',
  'function getAllCertificateIds() external view returns (string[])',
  'function getTotalCertificates() external view returns (uint256)',
  'event CertificateIssued(string certId, bytes32 indexed certIdHash, address indexed issuer, bytes32 certificateHash, string ipfsCID, string recipient, string title, uint256 issuedAt)',
  'event CertificateRevoked(string certId, bytes32 indexed certIdHash, address indexed issuer, uint256 revokedAt)',
  'event IssuerAdded(address indexed issuer)',
  'event IssuerRemoved(address indexed issuer)'
]);

/**
 * Public viem client connected to Ethereum Sepolia.
 * Does not require wallet or user interaction (used for public verification).
 */
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(SEPOLIA_RPC_URL)
});
