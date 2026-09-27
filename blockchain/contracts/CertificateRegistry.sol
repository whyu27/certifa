// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CertificateRegistry
 * @dev Smart contract registry for decentralized certificate verification (Certifa).
 * Follows the core principle: "Permissioned issuance, public verification."
 */
contract CertificateRegistry is Ownable {
    // --- Custom Errors ---
    error UnauthorizedIssuer(address caller);
    error CertificateAlreadyExists(string certId);
    error CertificateNotFound(string certId);
    error CertificateAlreadyRevoked(string certId);
    error UnauthorizedRevocation(address caller);
    error InvalidParameters(string reason);

    // --- Structs ---
    struct Certificate {
        string certId;
        bytes32 certificateHash;
        string ipfsCID;
        address issuer;
        string recipient;
        string title;
        uint256 issuedAt;
        bool revoked;
        bool exists;
    }

    // --- State Variables ---
    // Mapping to track authorized issuers
    mapping(address => bool) public authorizedIssuers;

    // Mapping from keccak256(bytes(certId)) to Certificate struct
    mapping(bytes32 => Certificate) private certificates;

    // List of all registered certificate IDs
    string[] private allCertificateIds;

    // Mapping from issuer address to their issued certificate IDs
    mapping(address => string[]) private issuerCertificates;

    // --- Events ---
    event IssuerAdded(address indexed issuer);
    event IssuerRemoved(address indexed issuer);
    event CertificateIssued(
        string certId,
        bytes32 indexed certIdHash,
        address indexed issuer,
        bytes32 certificateHash,
        string ipfsCID,
        string recipient,
        string title,
        uint256 issuedAt
    );
    event CertificateRevoked(
        string certId,
        bytes32 indexed certIdHash,
        address indexed issuer,
        uint256 revokedAt
    );

    // --- Modifiers ---
    modifier onlyAuthorizedIssuer() {
        if (!authorizedIssuers[msg.sender]) {
            revert UnauthorizedIssuer(msg.sender);
        }
        _;
    }

    /**
     * @dev Constructor initializes the contract setting deployer as initial owner.
     * Optionally adds deployer as the first authorized issuer for initial testing.
     */
    constructor() Ownable(msg.sender) {
        authorizedIssuers[msg.sender] = true;
        emit IssuerAdded(msg.sender);
    }

    // ==========================================
    //            ISSUER MANAGEMENT
    // ==========================================

    /**
     * @notice Add a new authorized issuer. Only contract owner can call this.
     * @param _issuer Address of the issuer to authorize.
     */
    function addIssuer(address _issuer) external onlyOwner {
        if (_issuer == address(0)) {
            revert InvalidParameters("Zero address");
        }
        authorizedIssuers[_issuer] = true;
        emit IssuerAdded(_issuer);
    }

    /**
     * @notice Remove an authorized issuer. Only contract owner can call this.
     * @param _issuer Address of the issuer to remove.
     */
    function removeIssuer(address _issuer) external onlyOwner {
        authorizedIssuers[_issuer] = false;
        emit IssuerRemoved(_issuer);
    }

    /**
     * @notice Check if an address is an authorized issuer.
     * @param _issuer Address to check.
     */
    function isAuthorizedIssuer(address _issuer) external view returns (bool) {
        return authorizedIssuers[_issuer];
    }

    // ==========================================
    //          CERTIFICATE ISSUANCE
    // ==========================================

    /**
     * @notice Issue a new certificate. Only authorized issuers can call this.
     * @param certId Unique Certificate ID (e.g. CERT-2026-8F92A1).
     * @param certificateHash SHA-256 / Keccak256 hash of the final certificate file.
     * @param ipfsCID IPFS Content Identifier where the certificate file is pinned.
     * @param recipient Name of the certificate recipient.
     * @param title Title of the certificate / credential.
     */
    function issueCertificate(
        string calldata certId,
        bytes32 certificateHash,
        string calldata ipfsCID,
        string calldata recipient,
        string calldata title
    ) external onlyAuthorizedIssuer {
        if (bytes(certId).length == 0) revert InvalidParameters("Empty certId");
        if (certificateHash == bytes32(0)) revert InvalidParameters("Empty certificateHash");
        if (bytes(ipfsCID).length == 0) revert InvalidParameters("Empty ipfsCID");
        if (bytes(recipient).length == 0) revert InvalidParameters("Empty recipient");
        if (bytes(title).length == 0) revert InvalidParameters("Empty title");

        bytes32 idHash = keccak256(bytes(certId));

        if (certificates[idHash].exists) {
            revert CertificateAlreadyExists(certId);
        }

        Certificate memory newCert = Certificate({
            certId: certId,
            certificateHash: certificateHash,
            ipfsCID: ipfsCID,
            issuer: msg.sender,
            recipient: recipient,
            title: title,
            issuedAt: block.timestamp,
            revoked: false,
            exists: true
        });

        certificates[idHash] = newCert;
        allCertificateIds.push(certId);
        issuerCertificates[msg.sender].push(certId);

        emit CertificateIssued(
            certId,
            idHash,
            msg.sender,
            certificateHash,
            ipfsCID,
            recipient,
            title,
            block.timestamp
        );
    }

    // ==========================================
    //          CERTIFICATE REVOCATION
    // ==========================================

    /**
     * @notice Revoke a certificate. Only the original issuer (or contract owner) can revoke.
     * @param certId Unique Certificate ID to revoke.
     */
    function revokeCertificate(string calldata certId) external {
        bytes32 idHash = keccak256(bytes(certId));
        Certificate storage cert = certificates[idHash];

        if (!cert.exists) {
            revert CertificateNotFound(certId);
        }
        if (cert.revoked) {
            revert CertificateAlreadyRevoked(certId);
        }
        if (msg.sender != cert.issuer && msg.sender != owner()) {
            revert UnauthorizedRevocation(msg.sender);
        }

        cert.revoked = true;

        emit CertificateRevoked(certId, idHash, msg.sender, block.timestamp);
    }

    // ==========================================
    //          PUBLIC VERIFICATION & READ
    // ==========================================

    /**
     * @notice Public verification method to get certificate data by ID.
     * @param certId Unique Certificate ID.
     * @return Certificate struct containing all metadata and revocation status.
     */
    function getCertificate(string calldata certId) external view returns (Certificate memory) {
        bytes32 idHash = keccak256(bytes(certId));
        Certificate memory cert = certificates[idHash];

        if (!cert.exists) {
            revert CertificateNotFound(certId);
        }

        return cert;
    }

    /**
     * @notice Verify and get certificate data by keccak256 hash of Certificate ID.
     * @param certIdHash Keccak256 hash of Certificate ID.
     */
    function getCertificateByIdHash(bytes32 certIdHash) external view returns (Certificate memory) {
        Certificate memory cert = certificates[certIdHash];

        if (!cert.exists) {
            revert CertificateNotFound("");
        }

        return cert;
    }

    /**
     * @notice Get all certificate IDs issued by a specific issuer.
     * @param _issuer Address of the issuer.
     */
    function getCertificatesByIssuer(address _issuer) external view returns (string[] memory) {
        return issuerCertificates[_issuer];
    }

    /**
     * @notice Get all certificate IDs registered in the contract.
     */
    function getAllCertificateIds() external view returns (string[] memory) {
        return allCertificateIds;
    }

    /**
     * @notice Get the total number of registered certificates.
     */
    function getTotalCertificates() external view returns (uint256) {
        return allCertificateIds.length;
    }
}
