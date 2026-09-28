# Core Principles

Filosofi produk Certifa didasarkan pada prinsip utama:

> **"Permissioned issuance, public verification."**  
> *(Penerbitan berizin, verifikasi terbuka untuk publik).*

---

## 1. Permissioned Issuance (Penerbitan Berizin)

- Penerbitan sertifikat tidak dibuka untuk umum.
- Hanya wallet yang telah terdaftar sebagai **Authorized Issuer** pada smart contract yang dapat mengeksekusi fungsi `issueCertificate()`.
- Contract Owner bertanggung jawab memvalidasi dan mendaftarkan institusi/lembaga penerbit melalui method `addIssuer(address)`.
- Validasi keamanan ditegakkan di level blockchain (**smart contract modifier `onlyAuthorizedIssuer`**), bukan hanya di tampilan frontend.

---

## 2. Public Verification (Verifikasi Publik)

- Proses verifikasi sertifikat terbuka 100% untuk siapapun: recruiter, perusahaan, kampus, atau masyarakat umum.
- **Tidak Memerlukan Wallet**: Pihak verifier tidak perlu memiliki MetaMask, wallet Web3, atau saldo kripto.
- **Tidak Perlu Akun**: Tidak ada form login/register atau username/password.
- Frontend membaca data langsung dari jaringan Ethereum Sepolia menggunakan Public RPC Provider melalui Viem.

---

## 3. Tamper-Resistance & File Integrity

- Setiap sertifikat yang diterbitkan menghasilkan nilai hash kriptografis unik (**SHA-256**) dari file final.
- Jika ada pihak yang memodifikasi bahkan satu piksel atau satu huruf pada dokumen sertifikat, hash dokumen tersebut akan berubah total dan otomatis terdeteksi sebagai `MISMATCH / MODIFIED`.

---

## 4. No Gimmick Blockchain Decision

Certifa menggunakan blockchain secara fungsional dan terukur:
- **Bukan NFT yang bisa diperjualbelikan**: Penerima tidak perlu memiliki wallet atau menanggung gas fee.
- **Registry Abadi**: Status sertifikat dan bukti penerbitan tidak dapat diubah atau dihapus oleh pihak manapun secara sepihak.
