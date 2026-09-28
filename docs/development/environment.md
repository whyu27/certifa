# Environment Variables

Daftar seluruh environment variables yang dibutuhkan oleh setiap layer pada Certifa.

---

## 1. Backend Environment (`backend/.env`)

| Variabel | Tipe | Contoh Nilai | Deskripsi |
| :--- | :--- | :--- | :--- |
| `PORT` | Number | `5000` | Port listening server Express |
| `FRONTEND_URL` | String | `http://localhost:5173` | Domain client frontend untuk target URL QR Code |
| `PINATA_JWT` | String | `eyJhbGciOi...` | JWT API Key dari Pinata Cloud untuk upload IPFS |
| `PINATA_GATEWAY` | String | `gateway.pinata.cloud` | Gateway IPFS yang digunakan untuk melihat file |

> **Catatan**: Jika `PINATA_JWT` dikosongkan saat development lokal, backend akan secara otomatis menghasilkan CID simulasi (mock) agar Anda tetap bisa menguji flow tanpa harus mendaftar akun Pinata terlebih dahulu.

---

## 2. Blockchain Hardhat Environment (`blockchain/.env`)

| Variabel | Deskripsi |
| :--- | :--- |
| `SEPOLIA_RPC_URL` | Endpoint RPC node Sepolia (misal: Infura, Alchemy, atau Publicnode) |
| `PRIVATE_KEY` | Private key wallet deployer/owner (wajib dirahasiakan, jangan pernah di-commit ke Git) |
| `ETHERSCAN_API_KEY` | API Key dari Etherscan untuk verifikasi source code smart contract |

---

## 3. Frontend Config Constants (`frontend/src/config/contract.js`)

Frontend Certifa menggunakan konfigurasi berbasis konstanta yang tersinkronisasi dengan jaringan:

```javascript
export const CONTRACT_ADDRESS = '0xAFC8bB36572ac3CcEa6c908dC8D26cd54E9c258a';
export const SEPOLIA_CHAIN_ID = 11155111;
export const SEPOLIA_RPC_URL = 'https://ethereum-sepolia-rpc.publicnode.com';
export const ETHERSCAN_BASE_URL = 'https://sepolia.etherscan.io';
export const BACKEND_URL = 'http://localhost:5000/api';
```
