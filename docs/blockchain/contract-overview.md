# Smart Contract Overview

Smart contract utama Certifa adalah **`CertificateRegistry.sol`**, yang di-deploy di testnet **Ethereum Sepolia**.

---

## Informasi Kontrak On-Chain

| Parameter | Nilai |
| :--- | :--- |
| **Contract Name** | `CertificateRegistry` |
| **Target Network** | Ethereum Sepolia (Chain ID: `11155111`) |
| **Contract Address** | `0xAFC8bB36572ac3CcEa6c908dC8D26cd54E9c258a` |
| **Solidity Version** | `^0.8.24` |
| **License** | MIT |
| **Block Explorer** | [View on Etherscan Sepolia](https://sepolia.etherscan.io/address/0xAFC8bB36572ac3CcEa6c908dC8D26cd54E9c258a) |

---

## Struktur Data (`Certificate` Struct)

Setiap sertifikat yang terdaftar disimpan dalam bentuk struct berikut:

```solidity
struct Certificate {
    string certId;              // Unique Certificate ID (contoh: CERT-2026-8F92A1)
    bytes32 certificateHash;    // SHA-256 hash dari file final yang ber-QR
    string ipfsCID;             // Content Identifier file di IPFS (Pinata)
    address issuer;             // Alamat wallet issuer penerbit
    string recipient;           // Nama penerima sertifikat
    string title;               // Judul sertifikat / kompetensi
    uint256 issuedAt;           // Timestamp waktu penerbitan (block.timestamp)
    bool revoked;               // Status pencabutan (true jika dicabut)
    bool exists;                // Flag penanda keberadaan data
}
```

---

## Event On-Chain

Smart contract memancarkan event berikut untuk keperluan indexing dan tracking aktivitas:

```solidity
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

event IssuerAdded(address indexed issuer);
event IssuerRemoved(address indexed issuer);
```
