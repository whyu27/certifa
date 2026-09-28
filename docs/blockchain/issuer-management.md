# Issuer Authorization & Roles

Sistem Certifa membedakan dua hak akses utama: **Contract Owner** dan **Authorized Issuer**.

---

## 1. Peran Pengguna (*Roles*)

| Peran | Hak Akses |
| :--- | :--- |
| **Contract Owner** | • Menambah Authorized Issuer baru (`addIssuer`)<br>• Mencabut status Authorized Issuer (`removeIssuer`)<br>• Mencabut sertifikat darurat (`revokeCertificate`) |
| **Authorized Issuer** | • Menerbitkan sertifikat baru (`issueCertificate`)<br>• Mencabut sertifikat yang diterbitkannya sendiri (`revokeCertificate`)<br>• Melihat riwayat sertifikatnya |
| **Public Verifier** | • Membaca dan memverifikasi sertifikat tanpa wallet (`getCertificate`) |

---

## 2. Fungsi Manajemen Issuer

### A. Menambahkan Issuer (`addIssuer`)
Hanya dapat dipanggil oleh **Contract Owner**:

```solidity
function addIssuer(address _issuer) external onlyOwner
```

Setelah fungsi ini dieksekusi on-chain, mapping `authorizedIssuers[_issuer]` bernilai `true` dan memancarkan event `IssuerAdded(_issuer)`.

### B. Menghapus Issuer (`removeIssuer`)
Hanya dapat dipanggil oleh **Contract Owner**:

```solidity
function removeIssuer(address _issuer) external onlyOwner
```

Status otorisasi wallet tersebut akan dicabut (`false`), sehingga tidak dapat lagi memanggil `issueCertificate`.

### C. Cek Status Otorisasi (`isAuthorizedIssuer`)
Fungsi read-only publik untuk memeriksa apakah suatu address adalah authorized issuer:

```solidity
function isAuthorizedIssuer(address _issuer) external view returns (bool)
```
