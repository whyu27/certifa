# Contract Functions & Methods

Dokumentasi fungsi dan method yang tersedia pada smart contract `CertificateRegistry.sol`.

---

## 1. Penerbitan Sertifikat (`issueCertificate`)

Mendaftarkan data sertifikat baru ke dalam blockchain.

```solidity
function issueCertificate(
    string calldata certId,
    bytes32 certificateHash,
    string calldata ipfsCID,
    string calldata recipient,
    string calldata title
) external onlyAuthorizedIssuer
```

### Parameter:
- `certId` (*string*): ID unik sertifikat (misal: `"CERT-2026-8F92A1"`).
- `certificateHash` (*bytes32*): Hash SHA-256 dari file final ber-QR.
- `ipfsCID` (*string*): CID file di IPFS (misal: `"QmXoypiz..."`).
- `recipient` (*string*): Nama penerima.
- `title` (*string*): Judul sertifikat.

### Aturan Keamanan:
- Hanya boleh dipanggil oleh **Authorized Issuer**.
- `certId` belum pernah terdaftar sebelumnya (mencegah duplikasi).
- Parameter tidak boleh kosong.

---

## 2. Pencabutan Sertifikat (`revokeCertificate`)

Mencabut keabsahan sertifikat yang telah diterbitkan.

```solidity
function revokeCertificate(string calldata certId) external
```

### Parameter:
- `certId` (*string*): ID sertifikat yang akan dicabut.

### Aturan Keamanan:
- Hanya boleh dipanggil oleh **Issuer yang menerbitkan sertifikat tersebut** atau **Contract Owner**.
- Sertifikat harus terdaftar dan belum pernah dicabut sebelumnya.

---

## 3. Pembacaan Sertifikat (`getCertificate`)

Mengambil data lengkap sertifikat berdasarkan Certificate ID.

```solidity
function getCertificate(string calldata certId) external view returns (Certificate memory)
```

### Parameter:
- `certId` (*string*): ID sertifikat yang dicari.

### Return:
- Mengembalikan struct `Certificate` lengkap.
- Jika sertifikat tidak ditemukan, fungsi akan melakukan `revert CertificateNotFound(certId)`.

---

## 4. Riwayat Issuer (`getCertificatesByIssuer`)

Mengambil daftar seluruh ID sertifikat yang pernah diterbitkan oleh alamat wallet tertentu.

```solidity
function getCertificatesByIssuer(address _issuer) external view returns (string[] memory)
```
