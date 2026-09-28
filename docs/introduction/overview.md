# Overview

## Apa itu Certifa?

**Certifa** adalah platform penerbitan (*issuance*) dan verifikasi sertifikat digital berbasis blockchain.

Certifa memfasilitasi institusi resmi (**Authorized Issuer**) seperti universitas, lembaga pelatihan, komunitas, dan perusahaan untuk menerbitkan sertifikat digital yang memiliki:

- **Certificate ID** unik (format: `CERT-YYYY-XXXXXX`).
- **QR Code Gateway** yang tertempel langsung pada sertifikat.
- **SHA-256 Hash Integritas File** yang dicatat di blockchain.
- **IPFS CID** untuk penyimpanan file final yang terdesentralisasi.
- **Catatan Transaksi On-Chain** di jaringan Ethereum Sepolia.
- **Status Revokasi Permanen** yang dapat diperiksa oleh siapapun.

---

## Masalah yang Diselesaikan

Sertifikat digital konvensional (PDF/Gambar biasa) memiliki sejumlah kelemahan kritis:

1. **Mudah Dipalsukan**: File PDF dan gambar sangat mudah diedit menggunakan software pengedit dokumen tanpa meninggalkan jejak yang jelas.
2. **Sulit Diverifikasi**: Pihak ketiga (perusahaan, recruiter, universitas) kesulitan memverifikasi apakah sertifikat benar-benar diterbitkan oleh institusi terkait.
3. **Ketiadaan Registry Publik Terpercaya**: Tidak ada registri terpusat atau terdesentralisasi yang dapat diakses publik 24/7 tanpa batas waktu.
4. **Sertifikat yang Dicabut Tetap Beredar**: Jika sebuah institusi mencabut (*revoke*) sertifikat penerima karena pelanggaran atau kesalahan data, dokumen lama tetap bisa disebarkan tanpa diketahui pihak lain.

---

## Solusi Certifa

Certifa memanfaatkan **Ethereum Blockchain** sebagai *tamper-resistant certificate registry* dan **IPFS** sebagai media penyimpanan file terdesentralisasi.

- Hanya **Authorized Issuer** yang memiliki izin untuk menerbitkan sertifikat on-chain.
- Verifikasi terbuka bagi publik **tanpa perlu membuat akun ataupun menghubungkan wallet Web3**.
- File sertifikat dapat diuji integritasnya melalui kalkulasi SHA-256 hash secara instan.
