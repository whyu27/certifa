# How to Issue a Certificate

Halaman `/issue` adalah portal khusus bagi **Authorized Issuer** untuk menerbitkan sertifikat digital baru ke blockchain dan IPFS.

---

## Prasyarat Sebelum Menerbitkan

1. Browser terpasang ekstensi **MetaMask** atau wallet Web3 lainnya.
2. Alamat wallet Anda telah terdaftar sebagai **Authorized Issuer** pada smart contract Certifa di Ethereum Sepolia.
3. Memiliki sedikit saldo **SepoliaETH** untuk biaya gas transaksi (bisa didapatkan gratis dari Sepolia Faucet).

---

## Langkah-Langkah Penerbitan

### 1. Hubungkan Wallet
1. Buka halaman `/issue`.
2. Klik tombol **Connect Wallet**.
3. Pilih akun MetaMask Anda dan setujui koneksi.
4. Jika Anda belum berada di jaringan **Ethereum Sepolia**, dApp akan secara otomatis menampilkan tombol switch/add network.

### 2. Mengisi Formulir Penerbitan
Lengkapi data sertifikat:
- **Judul / Nama Sertifikat**: Misal `Certified Smart Contract Engineer`.
- **Nama Penerima (Recipient)**: Nama lengkap penerima sertifikat.
- **Tanggal Penerbitan**: Tanggal kelulusan atau tanggal sertifikat diterbitkan.
- **Upload File Asli**: Pilih file template sertifikat dalam format PNG, JPG, WEBP, atau PDF.

### 3. Generate & Register On-Chain
1. Klik tombol **Generate & Register Certificate**.
2. Backend akan memproses file secara otomatis:
   - Men-generate Certificate ID unik (`CERT-YYYY-XXXXXX`).
   - Menempelkan QR Code verifikasi di pojok dokumen.
   - Mengunggah file final ke IPFS (Pinata).
   - Menghitung SHA-256 Hash dari file final.
3. MetaMask akan membuka jendela konfirmasi transaksi.
4. Klik **Confirm** pada MetaMask.

### 4. Unduh File Final
Setelah transaksi berhasil dikonfirmasi di blockchain Sepolia:
- Klik tombol **Download File Final** untuk mengunduh sertifikat yang sudah ditempeli QR Code resmi.
- Berikan file final ini kepada penerima sertifikat.

---

## Cara Mencabut Sertifikat (*Revoke*)

Jika sertifikat perlu dibatalkan karena kesalahan data atau pelanggaran:
1. Buka bagian **My Certificates** di bagian bawah halaman `/issue`.
2. Cari sertifikat yang ingin dicabut berdasarkan ID atau nama penerima.
3. Klik tombol **Revoke**.
4. Konfirmasi transaksi di MetaMask.
5. Status sertifikat di blockchain akan berubah menjadi `REVOKED` secara permanen.
