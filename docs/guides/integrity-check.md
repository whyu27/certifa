# File Integrity Verification

Sesuai dengan **Bab 21 PRD**, Certifa menyediakan fitur verifikasi integritas file untuk memastikan bahwa file sertifikat yang dipegang oleh verifier belum pernah dimodifikasi atau diedit sama sekali.

---

## Bagaimana Cara Kerjanya?

```text
File Sertifikat yang Dimiliki Verifier
                 │
                 ▼
Kalkulasi Kriptografis SHA-256 Hash
                 │
                 ▼
Dibandingkan dengan Hash Terdaftar di Blockchain
                 │
        ┌────────┴────────┐
        ▼                 ▼
   HASH COCOK       HASH BERBEDA
 (MATCH / ASLI)   (MISMATCH / DIEDIT)
```

---

## Langkah-Langkah Verifikasi File:

1. Buka halaman `/verify` dan cari sertifikat yang valid terlebih dahulu.
2. Pada bagian bawah kartu hasil verifikasi, temukan kotak **Verify File Integrity (SHA-256 Hash Match)**.
3. Klik tombol **Pilih File Sertifikat Lokal**.
4. Pilih file sertifikat (PDF atau gambar) yang Anda terima dari pelamar/penerima.
5. Sistem akan menghitung SHA-256 hash dari file lokal tersebut dan mencocokkannya dengan hash on-chain:
   - **🟢 FILE HASH MATCH! Authenticity Confirmed**: Dokumen 100% identik dan belum pernah dimodifikasi.
   - **🔴 FILE HASH MISMATCH! Document might be modified**: Dokumen telah mengalami perubahan isi (nama, tanggal, nilai, dsb.) atau bukan merupakan file final resmi yang diterbitkan.
