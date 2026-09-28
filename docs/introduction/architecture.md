# Architecture & Workflow

Arsitektur sistem Certifa terdiri dari tiga lapisan utama: **Frontend Client**, **Backend Service**, dan **Blockchain & Storage Layer**.

```text
                         CERTIFA SYSTEM ARCHITECTURE
                                      │
         ┌────────────────────────────┴────────────────────────────┐
         │                                                         │
   FRONTEND DAPP                                             BACKEND API
  (React 19 + Wagmi)                                     (Express + Node.js)
         │                                                         │
         │ 1. Upload file asli + meta                              │
         ├────────────────────────────────────────────────────────►│ 2. Generate QR
         │                                                         │ 3. Stamping Image/PDF
         │                                                         │ 4. Hash SHA-256
         │ 5. Return: { certId, certHash, ipfsCID }                │ 5. Upload Pinata IPFS
         │◄────────────────────────────────────────────────────────┘
         │
         │ 6. Send transaction (MetaMask Signer)
         ▼
  SMART CONTRACT (Ethereum Sepolia)
  Address: 0xAFC8bB36572ac3CcEa6c908dC8D26cd54E9c258a
         │
         ├─────────────────────────────┬─────────────────────────────┐
         ▼                             ▼                             ▼
  onlyAuthorizedIssuer          issueCertificate()            getCertificate()
  (Validasi Identitas)        (Simpan Hash & CID on-chain)   (Public Verification)
```

---

## Alur Penerbitan Sertifikat (*Issuing Flow*)

Urutan pembuatan sertifikat mengikuti aturan ketat:

```text
Original Certificate File
        ↓
Generate Unique Certificate ID (CERT-YYYY-XXXXXX)
        ↓
Generate QR Code (Target: https://domain/verify?id=...)
        ↓
Stamp / Overlay QR Code onto Certificate (Sharp / pdf-lib)
        ↓
Final Certificate File Ready
        ↓
Upload Final File to IPFS (Pinata Pinning) ──► Mendapatkan IPFS CID
        ↓
Calculate SHA-256 Hash of Final File ──────► Format bytes32 on-chain
        ↓
Submit Transaction via Wagmi to Ethereum Sepolia
        ↓
Smart Contract Memvalidasi Otorisasi Issuer
        ↓
Event CertificateIssued Diterbitkan On-Chain
```

> **PENTING**: SHA-256 Hash dihitung **setelah** QR Code ditempelkan ke file sertifikat, sehingga file yang di-hash adalah file final yang identik dengan yang disimpan di IPFS dan diterima oleh penerima.

---

## Pembagian Tanggung Jawab (*Source of Truth*)

| Data | Tempat Penyimpanan | Keterangan |
| :--- | :--- | :--- |
| **File Dokumen Sertifikat** | **IPFS (Pinata)** | File gambar (PNG/JPG) atau PDF yang sudah ber-QR |
| **Certificate Hash (SHA-256)** | **Smart Contract** | Digunakan untuk pembuktian keaslian file |
| **Certificate ID** | **Smart Contract** | Identifier unik sertifikat |
| **Issuer Address** | **Smart Contract** | Alamat wallet penerbit resmi |
| **Recipient Name & Title** | **Smart Contract** | Metadata sertifikat publik |
| **Status Revokasi** | **Smart Contract** | Menentukan apakah sertifikat aktif / dicabut |
| **Daftar Otorisasi Issuer** | **Smart Contract** | Daftar wallet yang diizinkan menerbitkan |

Blockchain adalah **Source of Truth** utama untuk keabsahan registri sertifikat.
