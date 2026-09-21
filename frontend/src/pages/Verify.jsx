import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import iconVerified from '../assets/icon-status-verified.svg';
import iconRevoked from '../assets/icon-status-revoked.svg';
import iconNotFound from '../assets/icon-status-notfound.svg';
import ethereumSepoliaBadge from '../assets/ethereum-sepolia-badge.png';
import ipfsBadge from '../assets/ipfs-badge.svg';
import {
  Search,
  QrCode,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  FileCheck,
  Upload,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

export default function Verify() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryId = searchParams.get('id') || '';

  const [certIdInput, setCertIdInput] = useState(queryId);
  const [activeSearchId, setActiveSearchId] = useState(queryId);
  const [copied, setCopied] = useState(false);

  // File hash check state (Bab 21 PRD)
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileHashResult, setFileHashResult] = useState(null);

  useEffect(() => {
    if (queryId) {
      setCertIdInput(queryId);
      setActiveSearchId(queryId);
    }
  }, [queryId]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (certIdInput.trim()) {
      setActiveSearchId(certIdInput.trim());
      setSearchParams({ id: certIdInput.trim() });
    }
  };

  // Mock Database based on Bab 12 PRD Statuses
  const getVerificationData = (id) => {
    if (!id) return null;
    const cleanId = id.toUpperCase();

    if (cleanId.includes('REVOKED')) {
      return {
        status: 'REVOKED',
        id: cleanId,
        title: 'Fullstack Ethereum Developer Certification',
        recipient: 'David Miller',
        issuer: 'BlockLabs Academy',
        issuerWallet: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
        issueDate: '2025-11-10',
        revokedDate: '2026-01-15',
        revocationReason: 'Credential superseded by advanced certificate',
        ipfsCid: 'QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx',
        txHash: '0x3a4b92c81726e91048b29104857d9182349bc128374910283749128374910283',
        fileHash: '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
      };
    }

    if (cleanId.includes('INVALID') || cleanId.includes('999')) {
      return {
        status: 'NOT_FOUND',
        id: cleanId
      };
    }

    // Default VALID certificate
    return {
      status: 'VALID',
      id: cleanId.startsWith('CERT-') ? cleanId : `CERT-2026-${cleanId}`,
      title: 'Certified Smart Contract Engineer',
      recipient: 'Alex Morgan',
      issuer: 'Ethereum Academy Institute',
      issuerWallet: '0x71C7656EC7ab88b098defB751B7401B5f6d83A94',
      issueDate: '2026-02-18',
      ipfsCid: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
      txHash: '0x8f92a17c0938b8293e810a9c8192830192830192830192830192830192830192',
      fileHash: '0xa495991b7852b855e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934c'
    };
  };

  const result = getVerificationData(activeSearchId);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUploadCheck = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      // Simulate SHA-256 calculation matching mock
      setFileHashResult({
        calculatedHash: '0xa495991b7852b855e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934c',
        isMatch: result && result.status === 'VALID'
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 animate-fade-in text-left">
      {/* Search Header */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Public Gateway</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Verify Certificate
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
          Verifikasi publik tanpa koneksi wallet. Masukkan Certificate ID atau scan QR Code untuk memeriksa keaslian registri on-chain.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative pt-2">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Masukkan Certificate ID (Contoh: CERT-2026-8F92A1)"
              value={certIdInput}
              onChange={(e) => setCertIdInput(e.target.value)}
              className="w-full pl-5 pr-28 py-3.5 rounded-full bg-white border border-neutral-300 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 shadow-sm transition"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition shadow-2xs flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" /> Verify
            </button>
          </div>
        </form>
      </div>

      {/* Quick Sample Links */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-neutral-400 font-medium">Contoh Tes:</span>
        <button
          onClick={() => { setCertIdInput('CERT-2026-8F92A1'); setActiveSearchId('CERT-2026-8F92A1'); setSearchParams({ id: 'CERT-2026-8F92A1' }); }}
          className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[11px] hover:bg-emerald-100 transition"
        >
          Valid Certificate
        </button>
        <button
          onClick={() => { setCertIdInput('CERT-REVOKED-001'); setActiveSearchId('CERT-REVOKED-001'); setSearchParams({ id: 'CERT-REVOKED-001' }); }}
          className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-mono text-[11px] hover:bg-rose-100 transition"
        >
          Revoked Certificate
        </button>
        <button
          onClick={() => { setCertIdInput('CERT-INVALID-999'); setActiveSearchId('CERT-INVALID-999'); setSearchParams({ id: 'CERT-INVALID-999' }); }}
          className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 font-mono text-[11px] hover:bg-neutral-200 transition"
        >
          Not Found Certificate
        </button>
      </div>

      {/* VERIFICATION RESULT PANEL (Bab 12 PRD) */}
      {result && (
        <div className="space-y-6">
          {/* RESULT CARD 1: VALID */}
          {result.status === 'VALID' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-lg space-y-6 animate-fade-in relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6">
                <div className="flex items-center gap-4">
                  {/* Status Badge Icon */}
                  <img src={iconVerified} alt="Verified Status" className="w-14 h-14" />
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold tracking-wide uppercase mb-1">
                      VERIFIED AUTHENTIC
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-900">{result.title}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-mono border border-neutral-200">
                    <img src={ethereumSepoliaBadge} alt="Sepolia" className="w-3.5 h-3.5 opacity-80" />
                    Sepolia On-Chain
                  </div>
                </div>
              </div>

              {/* Certificate Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">CERTIFICATE ID</span>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 text-sm">{result.id}</span>
                    <button onClick={() => copyToClipboard(result.id)} className="text-neutral-400 hover:text-neutral-600">
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">RECIPIENT NAME</span>
                  <span className="font-bold text-neutral-900 text-sm">{result.recipient}</span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">ISSUER INSTITUTION</span>
                  <span className="font-bold text-neutral-900 text-sm">{result.issuer}</span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">ISSUE DATE</span>
                  <span className="font-bold text-neutral-900 text-sm">{result.issueDate}</span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1 md:col-span-2">
                  <span className="text-neutral-400 block text-[10px]">ISSUER WALLET ADDRESS</span>
                  <span className="font-bold text-neutral-800 truncate block">{result.issuerWallet}</span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1 md:col-span-2">
                  <span className="text-neutral-400 block text-[10px]">IPFS STORAGE CID</span>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-800 truncate">{result.ipfsCid}</span>
                    <a
                      href={`https://ipfs.io/ipfs/${result.ipfsCid}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 hover:underline inline-flex items-center gap-1 font-sans"
                    >
                      <img src={ipfsBadge} alt="IPFS" className="w-3.5 h-3.5" /> View on IPFS <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Smart Contract Signature Verified
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400 truncate max-w-md">
                    Tx: {result.txHash}
                  </div>
                </div>

                <a
                  href={`https://sepolia.etherscan.io/tx/${result.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white text-neutral-900 text-xs font-semibold rounded-full hover:bg-neutral-100 transition inline-flex items-center gap-1.5 shrink-0"
                >
                  View Explorer <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* RESULT CARD 2: REVOKED */}
          {result.status === 'REVOKED' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-lg space-y-6 animate-fade-in">
              <div className="flex items-center gap-4 border-b border-neutral-100 pb-6">
                <img src={iconRevoked} alt="Revoked Status" className="w-14 h-14" />
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold tracking-wide uppercase mb-1">
                    CERTIFICATE REVOKED
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900">{result.title}</h2>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" /> Sertifikat Ini telah Dicabut oleh Issuer
                </div>
                <p className="text-[11px] text-rose-700">
                  Tanggal pencabutan: <strong>{result.revokedDate}</strong>. Alasan: {result.revocationReason}.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">CERTIFICATE ID</span>
                  <span className="font-bold text-neutral-900">{result.id}</span>
                </div>
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">RECIPIENT</span>
                  <span className="font-bold text-neutral-900">{result.recipient}</span>
                </div>
              </div>
            </div>
          )}

          {/* RESULT CARD 3: NOT FOUND */}
          {result.status === 'NOT_FOUND' && (
            <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm text-center space-y-6 animate-fade-in">
              <img src={iconNotFound} alt="Not Found Status" className="w-16 h-16 mx-auto" />
              <div className="space-y-2 max-w-sm mx-auto">
                <h3 className="text-xl font-bold text-neutral-900">CERTIFICATE NOT FOUND</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Tidak ada data sertifikat dengan ID <code className="bg-neutral-100 px-1.5 py-0.5 rounded font-mono font-bold text-neutral-800">{result.id}</code> di dalam smart contract registry Certifa.
                </p>
              </div>

              <div className="pt-2 text-xs text-neutral-400 max-w-xs mx-auto">
                Pastikan Anda telah memasukkan ID yang benar dari dokumen atau QR Code yang diterbitkan.
              </div>
            </div>
          )}

          {/* OPTIONAL ADVANCED FEATURE: File Hash Verification (Bab 21 PRD) */}
          <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-neutral-700" />
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  Optional: Verify File Integrity (SHA-256 Hash Match)
                </h4>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-600 font-mono">Bab 21 PRD</span>
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed">
              Unggah file sertifikat PDF/gambar yang Anda miliki untuk mencocokkan SHA-256 Hash file lokal dengan Hash terdaftar di blockchain.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label className="px-4 py-2 bg-white border border-neutral-300 rounded-full text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition cursor-pointer inline-flex items-center gap-2 shadow-2xs">
                <Upload className="w-3.5 h-3.5" /> Pilih File Sertifikat Lokal
                <input type="file" accept="image/*,.pdf" onChange={handleFileUploadCheck} className="hidden" />
              </label>

              {uploadedFile && (
                <span className="text-xs font-mono text-neutral-700 truncate max-w-xs">
                  {uploadedFile.name}
                </span>
              )}
            </div>

            {fileHashResult && (
              <div className={`p-4 rounded-2xl border text-xs font-mono space-y-1 ${fileHashResult.isMatch
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                <div className="font-bold font-sans flex items-center gap-1.5">
                  {fileHashResult.isMatch ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> FILE HASH MATCH! Authenticity Confirmed.
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" /> FILE HASH MISMATCH! Document might be modified.
                    </>
                  )}
                </div>
                <div className="text-[10px] text-neutral-600 truncate">
                  Local Hash: {fileHashResult.calculatedHash}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
