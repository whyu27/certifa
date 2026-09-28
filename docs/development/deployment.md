# Deployment Guide

Panduan mempublikasikan aplikasi Certifa ke lingkungan produksi (*Production*).

---

## 1. Deploy Smart Contract ke Ethereum Sepolia

1. Masuk ke folder blockchain:
   ```bash
   cd blockchain
   ```
2. Pastikan `PRIVATE_KEY` dan `SEPOLIA_RPC_URL` sudah terisi di `.env`.
3. Jalankan deployment menggunakan Hardhat Ignition:
   ```bash
   npx hardhat ignition deploy ./ignition/modules/CertificateRegistry.js --network sepolia
   ```
4. Salin alamat kontrak baru yang dihasilkan dan perbarui nilai `CONTRACT_ADDRESS` di:
   - `frontend/src/config/contract.js`
   - Dokumentasi proyek

---

## 2. Deploy Backend API (Render / Railway / VPS)

1. Buat repository atau hubungkan folder `backend/` ke platform cloud hosting (seperti **Render**, **Railway**, atau VPS Linux).
2. Set Environment Variables di dashboard cloud:
   - `PORT=5000` (atau sesuai port provider)
   - `FRONTEND_URL=https://certifa.app`
   - `PINATA_JWT=your_pinata_jwt_token`
   - `PINATA_GATEWAY=gateway.pinata.cloud`
3. Build & Start Command:
   - Build command: `npm install`
   - Start command: `npm start`

---

## 3. Deploy Frontend dApp (Vercel / Netlify / Cloudflare Pages)

1. Hubungkan repository frontend ke **Vercel** atau **Netlify**.
2. Konfigurasi direktori:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Sesuaikan `BACKEND_URL` di `frontend/src/config/contract.js` agar mengarah ke domain backend production Anda.

---

## 4. Deploy Dokumentasi VitePress (GitHub Pages / Vercel)

Dokumentasi VitePress dapat di-deploy secara gratis ke GitHub Pages atau Vercel:
- Root Directory: `docs`
- Build Command: `npm run build`
- Output Directory: `.vitepress/dist`
