# Backend API Endpoints

Referensi lengkap endpoint REST API Certifa.

---

## 1. Process Certificate & Pin to IPFS

Memproses file sertifikat asli, menempelkan QR Code verifikasi, mengunggah ke Pinata IPFS, dan mengembalikan hash SHA-256 final.

- **Method**: `POST`
- **Endpoint**: `/api/certificates/process`
- **Content-Type**: `multipart/form-data`

### Request Body (FormData):

| Field | Tipe | Wajib | Keterangan |
| :--- | :--- | :--- | :--- |
| `file` | `File (Binary)` | Ya | Dokumen sertifikat asli (PNG, JPG, WEBP, atau PDF) |
| `recipient` | `string` | Ya | Nama lengkap penerima sertifikat |
| `title` | `string` | Ya | Judul atau nama kompetensi sertifikat |
| `issueDate` | `string (YYYY-MM-DD)` | Tidak | Tanggal penerbitan sertifikat |

### Response Success (`200 OK`):

```json
{
  "success": true,
  "data": {
    "certId": "CERT-2026-8F92A1",
    "certHash": "0xa495991b7852b855e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934c",
    "rawHash": "a495991b7852b855e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934c",
    "ipfsCID": "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
    "ipfsUrl": "https://gateway.pinata.cloud/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
    "recipient": "Budi Santoso",
    "title": "Certified Smart Contract Engineer",
    "issueDate": "2026-09-28",
    "mimeType": "image/png",
    "fileName": "CERT-2026-8F92A1.png",
    "fileBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  }
}
```

---

## 2. Verify File Hash Integrity

Menghitung nilai SHA-256 Hash dari file lokal yang diunggah oleh verifier untuk dicocokkan dengan blockchain.

- **Method**: `POST`
- **Endpoint**: `/api/certificates/verify-hash`
- **Content-Type**: `multipart/form-data`

### Request Body (FormData):

| Field | Tipe | Wajib | Keterangan |
| :--- | :--- | :--- | :--- |
| `file` | `File (Binary)` | Ya | File sertifikat yang ingin dicek keasliannya |

### Response Success (`200 OK`):

```json
{
  "success": true,
  "data": {
    "hashHex": "a495991b7852b855e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934c",
    "bytes32Hash": "0xa495991b7852b855e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934c",
    "fileSize": 204850,
    "fileName": "CERT-2026-8F92A1.png"
  }
}
```

---

## 3. Health Check

Memeriksa ketersediaan server dan status konfigurasi kredensial Pinata IPFS.

- **Method**: `GET`
- **Endpoint**: `/api/health`

### Response Success (`200 OK`):

```json
{
  "status": "ok",
  "service": "Certifa Backend API",
  "timestamp": "2026-09-28T08:00:51.068Z",
  "pinataConfigured": true
}
```
