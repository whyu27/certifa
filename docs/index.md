---
layout: page
title: Certifa Documentation
---

<div class="certifa-hero-container">

<h1 class="certifa-hero-title">
  Decentralized Certificate Registry &amp; Verification Protocol
</h1>

<p class="certifa-hero-desc">
  Platform penerbitan dan verifikasi sertifikat digital berbasis smart contract Ethereum Sepolia dan penyimpanan terdesentralisasi IPFS. Dibangun di atas prinsip <em>permissioned issuance, public verification</em>.
</p>

<div class="certifa-actions-row">
  <a href="/introduction/overview" class="certifa-btn-primary">
    Get Started &rarr;
  </a>
  <a href="/blockchain/contract-overview" class="certifa-btn-secondary">
    Smart Contract Reference
  </a>
  <a href="/api/overview" class="certifa-btn-secondary">
    Backend REST API
  </a>
</div>

<hr style="border:none; border-top:1px solid var(--vp-c-border); margin: 36px 0;" />

## Explore by Domain

<div class="certifa-grid-matrix">

<a href="/guides/issuing" class="certifa-card">
  <div class="certifa-card-badge">01 / ISSUER FLOW</div>
  <div class="certifa-card-title">
    Certificate Issuance
    <span>&rarr;</span>
  </div>
  <div class="certifa-card-desc">
    Panduan penerbitan sertifikat digital bagi Authorized Issuer: upload dokumen, penempelan QR otomatis, dan transaksi on-chain.
  </div>
</a>

<a href="/guides/verification" class="certifa-card">
  <div class="certifa-card-badge">02 / PUBLIC VERIFICATION</div>
  <div class="certifa-card-title">
    Public Verification
    <span>&rarr;</span>
  </div>
  <div class="certifa-card-desc">
    Mekanisme verifikasi publik tanpa wallet. Verifikasi keaslian via scan QR Code atau input manual Certificate ID secara instan.
  </div>
</a>

<a href="/guides/integrity-check" class="certifa-card">
  <div class="certifa-card-badge">03 / FILE INTEGRITY</div>
  <div class="certifa-card-title">
    SHA-256 Hash Matching
    <span>&rarr;</span>
  </div>
  <div class="certifa-card-desc">
    Pengujian integritas file dokumen lokal terhadap nilai hash kriptografis yang tersimpan permanen di blockchain.
  </div>
</a>

<a href="/blockchain/contract-overview" class="certifa-card">
  <div class="certifa-card-badge">04 / SMART CONTRACT</div>
  <div class="certifa-card-title">
    CertificateRegistry.sol
    <span>&rarr;</span>
  </div>
  <div class="certifa-card-desc">
    Dokumentasi teknis smart contract: spesifikasi method, data struct, custom errors, role access control, dan event on-chain.
  </div>
</a>

<a href="/api/endpoints" class="certifa-card">
  <div class="certifa-card-badge">05 / BACKEND REST API</div>
  <div class="certifa-card-title">
    API Endpoints &amp; IPFS
    <span>&rarr;</span>
  </div>
  <div class="certifa-card-desc">
    Spesifikasi endpoint Express API: pemrosesan file, QR stamping via Sharp/pdf-lib, dan proxy upload Pinata IPFS.
  </div>
</a>

<a href="/development/getting-started" class="certifa-card">
  <div class="certifa-card-badge">06 / DEVELOPER SETUP</div>
  <div class="certifa-card-title">
    Local Development
    <span>&rarr;</span>
  </div>
  <div class="certifa-card-desc">
    Panduan menjalankan seluruh ekosistem Certifa di komputer lokal, manajemen environment variable, dan deployment produksi.
  </div>
</a>

</div>

## Protocol Pipeline Overview

Alur penerbitan dan verifikasi sertifikat menghubungkan client, backend processing, IPFS, dan smart contract:

```text
[ Issuer (Frontend) ]
        │ 1. Upload file asli + recipient + title
        ▼
[ Backend API (Express) ] ─── Pinata JWT Credentials
        │ 2. Generate Certificate ID (CERT-YYYY-XXXXXX)
        │ 3. Stamp QR Code onto Document (Sharp / pdf-lib)
        │ 4. Compute SHA-256 Hash of Final File
        │ 5. Upload Final Stamped File to IPFS
        │ 6. Return metadata { certId, certHash, ipfsCID }
        ▼
[ Frontend dApp (Wagmi) ]
        │ 7. Prompt transaction signature in MetaMask
        ▼
[ Smart Contract (Sepolia) ]
        │ 8. issueCertificate(certId, certHash, ipfsCID, recipient, title)
        │ 9. Validate msg.sender ∈ authorizedIssuers
        │ 10. Record immutable state & emit CertificateIssued
        ▼
[ Public Verifier ]
        │ 11. Read-only query getCertificate(certId) without wallet
        ▼
[ Result: VALID / REVOKED / NOT_FOUND ]
```

---

## Technical Specifications Summary

<table class="certifa-spec-table">
  <thead>
    <tr>
      <th>Layer</th>
      <th>Teknologi</th>
      <th>Fungsi Utama</th>
      <th>Status Jaringan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Blockchain</strong></td>
      <td>Solidity 0.8.24 + Hardhat</td>
      <td>Certificate Registry &amp; Role-based Access Control</td>
      <td><code>Sepolia: 0xAFC8bB3...258a</code></td>
    </tr>
    <tr>
      <td><strong>Storage</strong></td>
      <td>IPFS + Pinata Pinning</td>
      <td>Decentralized Content-Addressed File Storage</td>
      <td><code>Gateway: gateway.pinata.cloud</code></td>
    </tr>
    <tr>
      <td><strong>Backend</strong></td>
      <td>Node.js, Express, Sharp, pdf-lib</td>
      <td>QR Stamping, SHA-256 Hashing, IPFS Proxy</td>
      <td><code>REST API (Port 5000)</code></td>
    </tr>
    <tr>
      <td><strong>Frontend</strong></td>
      <td>React 19, Vite, Wagmi v3, Viem, Tailwind CSS</td>
      <td>Issuer dApp &amp; Public Verification UI</td>
      <td><code>Client (Port 5173)</code></td>
    </tr>
  </tbody>
</table>

</div>
