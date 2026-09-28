# How to Verify a Certificate

Halaman `/verify` adalah antarmuka publik yang dapat diakses oleh siapapun (recruiter, HRD, perusahaan, institusi) untuk memverifikasi keaslian sertifikat tanpa memerlukan wallet.

---

## 1. Verifikasi Melalui Scan QR Code

Setiap sertifikat resmi Certifa memiliki QR Code verifikasi pada dokumennya.

1. Gunakan kamera smartphone atau aplikasi QR Scanner untuk memindai QR Code pada sertifikat.
2. QR Code akan mengarahkan browser ke URL verifikasi:
   ```text
   https://certifa.app/verify?id=CERT-2026-8F92A1
   ```
3. Sistem akan secara otomatis membaca Certificate ID dan memuat data registri langsung dari smart contract Sepolia.

---

## 2. Verifikasi Manual Menggunakan Certificate ID

Jika Anda hanya memiliki nomor Certificate ID:

1. Buka halaman `/verify`.
2. Masukkan nomor Certificate ID (contoh: `CERT-2026-8F92A1`) pada kolom pencarian.
3. Klik tombol **Verify**.
4. Sistem akan menanyakan data ke smart contract dan menampilkan hasilnya secara instan.

---

## Memahami Status Hasil Verifikasi

Hasil verifikasi dapat menampilkan salah satu dari 3 status berikut:

### 🟢 VALID (Verified Authentic)
Sertifikat terdaftar resmi di blockchain dan belum pernah dicabut.
- **Data yang ditampilkan**: Judul sertifikat, Nama Penerima, Tanggal Penerbitan, Alamat Wallet Issuer, Link IPFS, dan On-Chain SHA-256 Hash.

### 🔴 REVOKED (Sertifikat Dicabut)
Sertifikat pernah diterbitkan, namun telah dicabut status keabsahannya oleh institusi penerbit.
- **Data yang ditampilkan**: Keterangan pencabutan dan rincian identitas sertifikat.

### ⚪ NOT FOUND (Tidak Terdaftar)
Certificate ID yang dimasukkan tidak ditemukan di dalam smart contract registry.
- Menandakan dokumen tersebut kemungkinan palsu atau nomor ID salah ketik.
