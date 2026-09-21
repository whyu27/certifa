# Certifa

## Product Requirements Document (PRD)

**Version:** 1.0
**Product:** Certifa
**Product Type:** Blockchain-Based Certificate Verification Platform
**Target Network:** Ethereum Sepolia
**Status:** MVP

---

# 1. Product Overview

**Certifa** adalah platform penerbitan dan verifikasi sertifikat berbasis blockchain.

Certifa memungkinkan **authorized issuer** menerbitkan sertifikat digital yang memiliki:

- Certificate ID
- QR Code
- Certificate Hash
- IPFS CID
- Issuer Wallet Address
- Recipient
- Certificate Title
- Issue Date
- Blockchain transaction record
- Revocation status

Sertifikat final disimpan di **IPFS**, sedangkan informasi penting mengenai sertifikat dicatat pada **smart contract** di blockchain.

Pihak yang menerima sertifikat tidak perlu memiliki wallet. Mereka cukup menunjukkan sertifikat dengan QR Code kepada pihak lain seperti perusahaan, recruiter, institusi pendidikan, atau organisasi.

Verifier dapat melakukan verifikasi melalui:

1. Scan QR Code
2. Memasukkan Certificate ID secara manual

Proses verifikasi bersifat publik dan **tidak memerlukan koneksi wallet**.

---

# 2. Problem Statement

Sertifikat digital konvensional memiliki beberapa masalah:

- Sertifikat PDF/image mudah diedit.
- Pihak ketiga sulit memastikan apakah sertifikat benar-benar diterbitkan oleh institusi tertentu.
- Verifikasi sering masih dilakukan secara manual.
- Tidak terdapat registry publik yang dapat digunakan untuk memeriksa status sertifikat.
- Sertifikat yang sudah dicabut masih dapat beredar dalam bentuk file lama.

Certifa menggunakan blockchain sebagai **tamper-resistant certificate registry** sehingga pihak ketiga dapat memeriksa informasi penerbitan dan status sertifikat.

---

# 3. Product Goals

### Primary Goals

1. Memungkinkan hanya **authorized issuer** yang menerbitkan sertifikat.
2. Menyimpan bukti penerbitan sertifikat pada blockchain.
3. Menyimpan file sertifikat final pada IPFS.
4. Memberikan Certificate ID unik untuk setiap sertifikat.
5. Menambahkan QR Code ke sertifikat.
6. Memungkinkan verifikasi publik tanpa wallet.
7. Memungkinkan issuer mencabut sertifikat.
8. Memastikan integritas file melalui certificate hash.

### Non-Goals untuk MVP

Certifa MVP tidak mencakup:

- Username/password authentication
- JWT/session authentication
- Traditional user account
- NFT certificate
- Marketplace
- Certificate transfer
- Social features
- PostgreSQL/database sebagai source of truth
- Dashboard analytics
- Mobile application
- Multi-chain deployment
- Automatic institution verification
- AI-generated certificates

---

# 4. Target Users

## 4.1 Authorized Issuer

Institusi atau pihak yang memiliki kewenangan menerbitkan sertifikat.

Contoh:

- Universitas
- Organisasi
- Event organizer
- Lembaga pelatihan
- Komunitas
- Perusahaan

Issuer menggunakan wallet untuk membuktikan identitas dan kewenangannya.

---

## 4.2 Certificate Recipient

Orang yang menerima sertifikat.

Recipient:

- Tidak wajib memiliki wallet.
- Tidak perlu login.
- Menerima/download sertifikat final.
- Dapat memberikan sertifikat kepada recruiter atau pihak lain.

---

## 4.3 Verifier

Pihak yang ingin memeriksa keaslian sertifikat.

Contoh:

- Recruiter
- HR
- Universitas
- Perusahaan
- Institusi lain

Verifier:

- Tidak perlu wallet.
- Tidak perlu membuat akun.
- Dapat melakukan verifikasi melalui QR atau Certificate ID.

---

## 4.4 Contract Owner

Wallet yang memiliki hak administratif terhadap smart contract.

Contract Owner dapat:

- Menambahkan authorized issuer.
- Menghapus authorized issuer.

Contract Owner bukan issuer sertifikat secara otomatis.

---

# 5. Core Product Principle

Certifa menggunakan konsep:

> **"Permissioned issuance, public verification."**

Artinya:

**Penerbitan dibatasi**, tetapi **verifikasi terbuka untuk publik**.

```text
                    CERTIFA
                       |
          ┌────────────┴────────────┐
          │                         │
     Issuer Side              Verification Side
          │                         │
     Connect Wallet             No Wallet
          │                         │
   Authorized Check                 │
          │                         │
     Issue Certificate              │
          │                         │
          └────────────┬────────────┘
                       ↓
                  Blockchain
                       ↓
                Public Registry
```

---

# 6. Web3 Identity & Authorization

Certifa tidak menggunakan username/password untuk issuer.

Wallet digunakan sebagai identitas Web3.

Smart contract menyimpan daftar wallet yang diperbolehkan menerbitkan sertifikat.

Secara konseptual:

```solidity
mapping(address => bool) public authorizedIssuers;
```

Ketika issuer memanggil fungsi `issueCertificate()`, smart contract memeriksa:

```text
Is msg.sender an authorized issuer?
        │
   ┌────┴────┐
  YES        NO
   │          │
 Issue      Reject
```

Frontend juga melakukan pengecekan untuk memberikan feedback kepada user.

Namun **security enforcement wajib dilakukan di smart contract**, bukan hanya di frontend.

---

# 7. Main User Flows

## 7.1 Issuing Certificate Flow

```text
Issuer opens /issue
        ↓
Connect Wallet
        ↓
Check authorized issuer
        ↓
Upload original certificate
        ↓
Enter certificate information
        ↓
Generate Certificate ID
        ↓
Generate QR Code
        ↓
Add QR Code to certificate
        ↓
Generate final certificate
        ↓
Upload final certificate to IPFS
        ↓
Calculate hash of final certificate
        ↓
Submit transaction
        ↓
Smart contract verifies issuer
        ↓
Certificate registered
        ↓
Wait for transaction confirmation
        ↓
Display success
        ↓
Download final certificate
```

---

# 8. Certificate Creation Logic

Urutan pemrosesan certificate harus mengikuti:

```text
Original Certificate
        ↓
Add QR Code
        ↓
Final Certificate
        ↓
Upload Final Certificate to IPFS
        ↓
Calculate Final Certificate Hash
        ↓
Register Hash + IPFS CID on Blockchain
```

Hal ini penting.

Hash **tidak boleh dihitung sebelum QR ditambahkan**, karena file yang diverifikasi harus merupakan file final yang benar-benar diterbitkan.

---

# 9. QR Code

QR Code berfungsi sebagai shortcut menuju halaman verifikasi.

QR Code **tidak langsung diarahkan ke IPFS**.

Contoh:

```text
https://certifa.app/verify?id=CERT-2026-8F92A1
```

Ketika QR discan:

```text
Scan QR
   ↓
Open Certifa /verify
   ↓
Read ?id=CERT-2026-8F92A1
   ↓
Read blockchain
   ↓
Display verification result
```

Dengan demikian QR Code memiliki fungsi utama sebagai **verification gateway**, bukan sekadar link download file.

---

# 10. Certificate ID

Setiap sertifikat harus memiliki ID unik.

Contoh:

```text
CERT-2026-8F92A1
```

Certificate ID digunakan sebagai identifier utama untuk proses verifikasi.

Verifier dapat memasukkannya secara manual pada halaman `/verify`.

QR Code pada dasarnya hanya mempermudah verifier memperoleh Certificate ID tersebut.

---

# 11. Verification Flow

## 11.1 QR Verification

```text
Recipient shows certificate
        ↓
Verifier scans QR
        ↓
Certifa /verify?id=...
        ↓
Read Certificate ID
        ↓
Read Smart Contract
        ↓
Check certificate
        ↓
Display result
```

---

## 11.2 Manual Verification

```text
Verifier opens /verify
        ↓
Enter Certificate ID
        ↓
Search blockchain
        ↓
Display result
```

---

# 12. Verification Result

Certifa memiliki tiga status utama.

### VALID

Certificate ID ditemukan dan sertifikat belum dicabut.

Display:

```text
VERIFIED

Certificate ID
Issuer
Recipient
Certificate Title
Issue Date
Issuer Wallet
Network
Transaction
```

---

### REVOKED

Certificate ditemukan tetapi issuer telah mencabutnya.

Display:

```text
REVOKED

This certificate has been revoked by the issuer.
```

Data certificate tetap dapat ditampilkan untuk transparency.

---

### NOT FOUND

Certificate ID tidak ditemukan dalam registry.

Display:

```text
CERTIFICATE NOT FOUND

No certificate with this ID exists in the Certifa registry.
```

---

# 13. Certificate Hash

Hash digunakan sebagai mekanisme pemeriksaan integritas.

Konsep:

```text
Certificate File
       ↓
   Hash Function
       ↓
Certificate Hash
```

Hash tersebut disimpan di blockchain.

Jika file berubah:

```text
Original Certificate
      ↓
Hash A

Modified Certificate
      ↓
Hash B
```

Jika:

```text
Hash A != Hash B
```

maka file tersebut berbeda dari file yang diregistrasikan.

---

# 14. IPFS

IPFS digunakan sebagai decentralized file storage/reference.

Blockchain tidak menyimpan PDF/image secara langsung.

Blockchain menyimpan:

```text
IPFS CID
```

yang mengarah ke certificate file.

Arsitektur:

```text
Certificate File
      │
      ↓
    IPFS
      │
      ↓
   CID
      │
      ↓
Smart Contract
```

Untuk MVP, layanan pinning seperti **Pinata** dapat digunakan agar file tetap tersedia di IPFS.

---

# 15. Blockchain Data

Smart contract minimal menyimpan:

```text
Certificate ID
Certificate Hash
IPFS CID
Issuer Address
Recipient
Certificate Title
Issue Timestamp
Revoked Status
```

Secara konseptual:

```solidity
struct Certificate {
    bytes32 certificateHash;
    string ipfsCID;
    address issuer;
    string recipient;
    string title;
    uint256 issuedAt;
    bool revoked;
}
```

Certificate ID dapat direpresentasikan secara on-chain menggunakan hash identifier, misalnya:

```text
keccak256(certificateId)
```

Hal ini menghindari ketergantungan pada string sebagai key internal smart contract.

---

# 16. Smart Contract Requirements

Contract utama:

```text
CertificateRegistry.sol
```

## Required Functions

### `issueCertificate()`

Digunakan authorized issuer untuk mendaftarkan certificate.

Input minimal:

```text
Certificate ID
Certificate Hash
IPFS CID
Recipient
Certificate Title
```

Contract harus:

1. Memastikan caller adalah authorized issuer.
2. Memastikan Certificate ID belum digunakan.
3. Menyimpan certificate data.
4. Emit `CertificateIssued`.

---

### `getCertificate()`

Digunakan frontend untuk mengambil data certificate.

Fungsi ini bersifat read-only.

---

### `revokeCertificate()`

Digunakan issuer untuk mencabut certificate.

Contract harus memastikan:

- Certificate ditemukan.
- Caller merupakan issuer yang menerbitkan certificate tersebut, atau memiliki authorization yang sesuai.
- Certificate belum revoked.

Kemudian:

```text
revoked = true
```

dan emit:

```text
CertificateRevoked
```

---

### `addIssuer()`

Hanya dapat dilakukan oleh Contract Owner.

---

### `removeIssuer()`

Hanya dapat dilakukan oleh Contract Owner.

---

# 17. Smart Contract Events

Contract harus memiliki event untuk aktivitas penting.

Contoh:

```solidity
event CertificateIssued(
    bytes32 indexed certificateId,
    address indexed issuer
);
```

dan:

```solidity
event CertificateRevoked(
    bytes32 indexed certificateId,
    address indexed issuer
);
```

Event dapat digunakan untuk tracking dan future indexing.

---

# 18. Pages

Certifa MVP hanya memiliki **3 halaman utama**.

## `/`

### Landing Page

Tujuan:

- Menjelaskan Certifa.
- Menjelaskan masalah certificate verification.
- Menjelaskan bagaimana blockchain digunakan.
- Menampilkan CTA.

CTA:

```text
Issue Certificate
Verify Certificate
```

Section yang disarankan:

1. Hero
2. How Certifa Works
3. Why Blockchain
4. Verification Flow
5. CTA

---

# 19. `/issue`

Halaman untuk authorized issuer.

### State 1 — Wallet Not Connected

```text
Connect Wallet
```

---

### State 2 — Wallet Connected but Unauthorized

```text
Wallet Connected

You are not an authorized issuer.
```

Issuer tidak dapat melakukan issuing.

---

### State 3 — Authorized Issuer

Tampilkan form:

```text
Certificate File
Recipient Name
Certificate Title
Issue Date
```

Kemudian:

```text
Generate Certificate
```

---

### Processing State

Tampilkan progress:

```text
Generating Certificate
Adding QR Code
Uploading to IPFS
Calculating Hash
Waiting for Blockchain Confirmation
```

---

### Success State

Tampilkan:

```text
Certificate Issued Successfully

Certificate ID
IPFS CID
Transaction Hash
Issuer Address

[Download Certificate]
```

---

# 20. `/verify`

Halaman publik.

Tidak membutuhkan wallet.

UI:

```text
Verify Certificate

Enter Certificate ID

[ Certificate ID                 ]

[ Verify ]
```

QR scanner dapat menjadi metode input tambahan.

Jika URL mengandung:

```text
/verify?id=CERT-2026-8F92A1
```

frontend otomatis menggunakan Certificate ID tersebut.

---

# 21. Optional Advanced Verification

Fitur upload certificate untuk pemeriksaan hash merupakan **future/advanced feature**, bukan requirement MVP.

Flow:

```text
Upload Certificate
        ↓
Calculate Hash
        ↓
Read registered Hash
        ↓
Compare
        ↓
MATCH / MODIFIED
```

Contoh:

```text
Certificate ID: CERT-2026-8F92A1

Blockchain Hash:
abc123...

Uploaded File Hash:
abc123...

Result:
AUTHENTIC
```

Jika berbeda:

```text
MODIFIED
```

Fitur ini dapat menjadi pengembangan setelah MVP selesai.

---

# 22. NFT Decision

Certifa MVP **tidak menggunakan NFT sebagai requirement**.

Blockchain digunakan untuk:

- certificate registry
- issuer authorization
- certificate integrity
- timestamp
- revocation

Bukan sekadar untuk membuat certificate menjadi NFT.

NFT/non-transferable certificate dapat dipertimbangkan sebagai **future version**, tetapi bukan bagian dari MVP.

Alasannya:

- Recipient tidak perlu memiliki wallet.
- Tidak ada masalah kehilangan wallet recipient.
- Tidak ada transferability.
- Architecture lebih sederhana.
- Fokus produk tetap pada verification.

---

# 23. Technology Stack

## Frontend

```text
React
Vite
JavaScript
Tailwind CSS
wagmi
viem
React Router
```

---

## Backend

```text
Node.js
Express
JavaScript
```

Backend digunakan untuk proses yang lebih cocok dilakukan off-chain, seperti:

- menerima upload file
- memproses certificate
- menambahkan QR
- menghitung hash
- upload ke IPFS
- mengembalikan metadata kepada frontend

Backend bukan source of truth untuk certificate registry.

---

## Blockchain

```text
Solidity
Hardhat
Ethereum Sepolia
```

Hardhat digunakan untuk:

- compile
- test
- deployment
- development workflow

---

## Storage

```text
IPFS
Pinata
```

---

## Wallet

```text
MetaMask
```

---

## Blockchain Interaction

```text
wagmi + viem
```

---

# 24. High-Level Architecture

```text
                         CERTIFA
                            |
              ┌─────────────┴─────────────┐
              │                           │
          Frontend                    Backend
        React + Vite                 Express
              │                           │
              │                    ┌──────┴──────┐
              │                    │             │
              │                   QR           IPFS
              │                    │             │
              │                    └──────┬──────┘
              │                           │
              └──────────────┬────────────┘
                             ↓
                       Smart Contract
                             │
                     Ethereum Sepolia
```

---

# 25. Source of Truth

Certifa harus memiliki pembagian tanggung jawab yang jelas.

| Data                 | Storage    |
| -------------------- | ---------- |
| Certificate File     | IPFS       |
| Certificate Hash     | Blockchain |
| Certificate ID       | Blockchain |
| Issuer               | Blockchain |
| Recipient            | Blockchain |
| Issue Date           | Blockchain |
| Revocation Status    | Blockchain |
| IPFS CID             | Blockchain |
| Wallet Authorization | Blockchain |

Blockchain merupakan **source of truth untuk certificate registry**.

IPFS merupakan **source of truth untuk file certificate yang diterbitkan**.

Backend bukan source of truth.

---

# 26. Security Requirements

## Issuer Authorization

Frontend tidak boleh menjadi satu-satunya security layer.

Smart contract wajib memvalidasi:

```text
msg.sender ∈ authorizedIssuers
```

---

## Duplicate Certificate ID

Certificate ID yang sudah digunakan tidak boleh digunakan kembali.

---

## Unauthorized Revocation

Issuer hanya dapat revoke certificate yang menjadi kewenangannya.

---

## Private Keys

Private key/seed phrase tidak boleh:

- disimpan di source code
- disimpan di database
- dikirim ke backend
- dimasukkan ke frontend

MetaMask menangani signing transaction.

---

## Environment Variables

Sensitive configuration harus menggunakan environment variables.

Contoh:

```text
PINATA_JWT
RPC_URL
PRIVATE_KEY
```

`PRIVATE_KEY` hanya digunakan untuk deployment/admin development environment dan tidak boleh di-commit ke Git.

---

# 27. Privacy Considerations

Blockchain bersifat publik.

Karena itu Certifa tidak boleh menyimpan data pribadi sensitif secara sembarangan pada blockchain.

Untuk MVP:

- Gunakan data dummy untuk development.
- Hindari menyimpan informasi sensitif.
- Recipient data yang ditulis ke blockchain harus diminimalkan.
- Jangan menyimpan dokumen sensitif yang tidak diperlukan.

IPFS juga bukan private database secara default.

---

# 28. Project Structure

```text
certifa/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Issue.jsx
│   │   │   └── Verify.jsx
│   │   │
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   │   ├── wagmi.ts
│   │   │   └── contract.ts
│   │   │
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   │   ├── certificate.js
│   │   │   ├── ipfs.js
│   │   │   └── qr.js
│   │   │
│   │   └── server.js
│   │
│   └── package.json
│
├── blockchain/
│   ├── contracts/
│   │   └── CertificateRegistry.sol
│   │
│   ├── test/
│   │   └── CertificateRegistry.ts
│   │
│   ├── ignition/
│   │   └── modules/
│   │       └── CertificateRegistry.ts
│   │
│   ├── hardhat.config.ts
│   └── package.json
│
└── README.md
```

---

# 29. MVP Feature Priorities

## Must Have

### Blockchain

- [ ] CertificateRegistry smart contract
- [ ] Authorized issuer system
- [ ] Certificate issuing
- [ ] Certificate retrieval
- [ ] Certificate revocation
- [ ] Events
- [ ] Hardhat tests
- [ ] Sepolia deployment

### Frontend

- [ ] Landing page
- [ ] Issue page
- [ ] Verify page
- [ ] MetaMask connection
- [ ] Authorized issuer check
- [ ] Issue certificate flow
- [ ] Certificate verification
- [ ] QR-based verification
- [ ] Certificate ID verification

### Backend

- [ ] Certificate upload
- [ ] QR generation
- [ ] QR embedding
- [ ] Certificate hash generation
- [ ] IPFS upload

### Storage

- [ ] IPFS integration
- [ ] Pinata integration

---

# 30. Advanced Features

Setelah MVP berhasil:

- [ ] Upload certificate for hash verification
- [ ] Issuer management dashboard
- [ ] Institution profile
- [ ] Certificate templates
- [ ] Multiple certificate designs
- [ ] Certificate expiration
- [ ] Certificate metadata URI
- [ ] Certificate NFT / Soulbound Token
- [ ] Multi-chain support
- [ ] Certificate search/indexing
- [ ] Analytics
- [ ] Dedicated issuer portal

---

# 31. Acceptance Criteria

## Issuer

A certificate can only be issued when:

```text
Wallet connected
+
Wallet authorized
+
Certificate data valid
+
Certificate ID unique
```

---

## Certificate

Every successfully issued certificate must contain:

```text
Certificate ID
QR Code
Certificate information
```

and have:

```text
IPFS CID
Blockchain record
Certificate hash
Transaction
```

---

## Verification

Given a valid Certificate ID:

```text
Certifa must return the corresponding certificate.
```

Given a revoked Certificate ID:

```text
Certifa must display REVOKED.
```

Given an unknown Certificate ID:

```text
Certifa must display NOT FOUND.
```

Given a QR Code from a valid certificate:

```text
The QR must open the Certifa verification page
and automatically identify the certificate.
```

---

# 32. Definition of Done — MVP

Certifa MVP dianggap selesai apabila:

1. Smart contract berhasil di-deploy ke Ethereum Sepolia.
2. Contract owner dapat mengotorisasi issuer.
3. Unauthorized wallet tidak dapat issue certificate.
4. Authorized wallet dapat issue certificate.
5. Certificate final memiliki QR Code.
6. Certificate final tersimpan di IPFS.
7. Certificate hash tersimpan di blockchain.
8. Certificate ID tersimpan di blockchain.
9. Verifier dapat melakukan verifikasi tanpa wallet.
10. QR Code dapat membuka halaman verification.
11. Certificate dapat direvoke.
12. Revoked certificate menampilkan status REVOKED.
13. Unknown certificate menampilkan NOT FOUND.
14. Semua fungsi utama smart contract memiliki test.
15. Project dapat dijalankan oleh developer lain melalui README.

---

# 33. Core Product Flow

Keseluruhan sistem Certifa:

```text
                    ISSUER
                       │
                       ↓
                 Connect Wallet
                       │
                       ↓
              Authorized Issuer?
                 │           │
                NO          YES
                 │           │
              Reject         ↓
                         Upload File
                             │
                             ↓
                     Certificate Data
                             │
                             ↓
                      Generate ID
                             │
                             ↓
                        Generate QR
                             │
                             ↓
                    Create Final File
                             │
                    ┌────────┴────────┐
                    ↓                 ↓
                  IPFS              Hash
                    │                 │
                    └────────┬────────┘
                             ↓
                       Smart Contract
                             │
                             ↓
                       Certificate
                       Registered
                             │
                             ↓
                    Download Certificate


================================================


                    VERIFIER
                       │
                Scan QR / Enter ID
                       │
                       ↓
                  /verify?id=...
                       │
                       ↓
                 Read Blockchain
                       │
             ┌─────────┼─────────┐
             ↓         ↓         ↓
           VALID     REVOKED   NOT FOUND
```

---

# 34. Product Philosophy

Certifa tidak menjadikan blockchain sebagai gimmick.

Blockchain digunakan karena memiliki fungsi yang jelas:

**Wallet**
→ membuktikan identitas issuer.

**Smart Contract**
→ mengontrol siapa yang boleh menerbitkan dan menyimpan registry.

**Blockchain**
→ menyediakan record penerbitan yang dapat diverifikasi.

**Hash**
→ memastikan integritas file.

**IPFS**
→ menyimpan certificate file.

**QR**
→ memberikan akses cepat ke verification page.

**Public Verification**
→ memungkinkan pihak ketiga memeriksa certificate tanpa harus memiliki akun atau wallet.

Dengan demikian, Web3 merupakan bagian dari arsitektur inti Certifa, bukan sekadar fitur tambahan.
