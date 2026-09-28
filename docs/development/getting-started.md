# Getting Started Locally

Panduan menjalankan seluruh ekosistem Certifa (Frontend, Backend, dan Blockchain) di komputer lokal.

---

## 1. Kloning Repository

```bash
git clone https://github.com/khilman/certifa.git
cd certifa
```

---

## 2. Menjalankan Backend Server

1. Masuk ke folder backend dan pasang dependensi:
   ```bash
   cd backend
   npm install
   ```
2. Salin template environment:
   ```bash
   cp .env.example .env
   ```
3. Jalankan server dalam mode development:
   ```bash
   npm run dev
   ```
   Server backend akan aktif di `http://localhost:5000`.

---

## 3. Menjalankan Frontend dApp

1. Buka terminal baru, masuk ke folder frontend dan pasang dependensi:
   ```bash
   cd frontend
   npm install
   ```
2. Jalankan Vite dev server:
   ```bash
   npm run dev
   ```
3. Buka browser di `http://localhost:5173`.

---

## 4. Menjalankan Dokumentasi VitePress

1. Buka terminal baru di folder `docs`:
   ```bash
   cd docs
   npm install
   ```
2. Jalankan VitePress development server:
   ```bash
   npm run dev
   ```
3. Buka browser di `http://localhost:5173` (atau port yang diberikan oleh VitePress).
