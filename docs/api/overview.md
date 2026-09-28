# Backend API Overview

Backend Certifa adalah RESTful API berbasis **Node.js & Express** yang bertugas menangani pemrosesan off-chain yang membutuhkan keamanan dan komputasi file.

---

## Mengapa Diperlukan Backend API?

1. **Keamanan Kredensial IPFS (Pinata Secret)**:
   API Key dan JWT Token Pinata disimpan secara aman di environment server backend (`PINATA_JWT`), mencegah kebocoran kredensial di sisi client/browser.
2. **Stamping QR Code Multi-Format**:
   Backend memanipulasi file sertifikat asli:
   - **Gambar (PNG, JPG, WEBP)**: Menggunakan engine `sharp` untuk menempelkan badge QR Code di pojok kanan bawah dokumen.
   - **Dokumen PDF**: Menggunakan engine `pdf-lib` untuk menempelkan QR Code ke halaman PDF.
3. **Kalkulasi SHA-256 Otomatis**:
   Menghitung SHA-256 hash dari file final yang sudah tertempel QR Code, lalu mengonversinya ke format `bytes32` (`0x...`) yang siap dikirimkan ke smart contract.

---

## Base URL

```text
http://localhost:5000/api
```
*(Atau domain production server Anda).*
