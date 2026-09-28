import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import iconVerified from '../assets/icon-status-verified.svg';
import iconRevoked from '../assets/icon-status-revoked.svg';
import iconNotFound from '../assets/icon-status-notfound.svg';
import ethereumSepoliaBadge from '../assets/ethereum-sepolia-badge.png';
import ipfsBadge from '../assets/ipfs-badge.svg';
import {
  Search,
  ExternalLink,
  ShieldAlert,
  FileCheck,
  Upload,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Loader2
} from 'lucide-react';
import {
  publicClient,
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  ETHERSCAN_BASE_URL,
  BACKEND_URL
} from '../config/contract';

export default function Verify() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryId = searchParams.get('id') || '';

  const [certIdInput, setCertIdInput] = useState(queryId);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // File hash check state (Bab 21 PRD)
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isCalculatingHash, setIsCalculatingHash] = useState(false);
  const [fileHashResult, setFileHashResult] = useState(null);

  // Verify Certificate on Ethereum Sepolia Smart Contract using viem publicClient
  const verifyOnChain = useCallback(async (id) => {
    if (!id || !id.trim()) {
      setResult(null);
      return;
    }

    const cleanId = id.trim();
    setIsLoading(true);
    setFileHashResult(null);
    setUploadedFile(null);

    try {
      const cert = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getCertificate',
        args: [cleanId]
      });

      const dateStr = cert.issuedAt
        ? new Date(Number(cert.issuedAt) * 1000).toISOString().split('T')[0]
        : '-';

      setResult({
        status: cert.revoked ? 'REVOKED' : 'VALID',
        id: cert.certId,
        title: cert.title,
        recipient: cert.recipient,
        issuer: cert.issuer,
        issueDate: dateStr,
        ipfsCid: cert.ipfsCID,
        certificateHash: cert.certificateHash,
        revoked: cert.revoked
      });
    } catch (error) {
      console.warn('Smart contract verification returned not found or error:', error);
      // Contract reverted (e.g. CertificateNotFound)
      setResult({
        status: 'NOT_FOUND',
        id: cleanId
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (queryId) {
      verifyOnChain(queryId);
    }
  }, [queryId, verifyOnChain]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (certIdInput.trim()) {
      const clean = certIdInput.trim();
      setSearchParams({ id: clean });
      verifyOnChain(clean);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Optional: File Hash Integrity Check (Bab 21 PRD)
  const handleFileUploadCheck = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setIsCalculatingHash(true);
      setFileHashResult(null);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${BACKEND_URL}/certificates/verify-hash`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        const { bytes32Hash } = response.data.data;
        const onChainHash = result?.certificateHash?.toLowerCase();
        const calculatedHash = bytes32Hash?.toLowerCase();

        const isMatch = onChainHash && calculatedHash === onChainHash;

        setFileHashResult({
          calculatedHash: bytes32Hash,
          onChainHash: result?.certificateHash,
          isMatch: Boolean(isMatch)
        });
      } catch (err) {
        console.error('Error calculating file hash:', err);
        alert('Gagal menghitung hash file.');
      } finally {
        setIsCalculatingHash(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 animate-fade-in text-left">
      {/* Search Header */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Verify Certificate
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
          Verifikasi publik langsung ke smart contract Sepolia tanpa koneksi wallet (powered by Viem). Masukkan Certificate ID atau scan QR Code untuk memeriksa keaslian registri on-chain.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative pt-2">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Masukkan Certificate ID (Contoh: CERT-2026-XXXXXX)"
              value={certIdInput}
              onChange={(e) => setCertIdInput(e.target.value)}
              className="w-full pl-5 pr-28 py-3.5 bg-white border border-neutral-300 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 shadow-sm transition"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-1.5 px-5 py-2.5 bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Checking...
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" /> Verify
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white p-12 border border-neutral-200 text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-neutral-800" />
          <h3 className="text-sm font-bold text-neutral-800">Membaca Data dari Ethereum Sepolia...</h3>
          <p className="text-xs text-neutral-400">Menghubungi smart contract di alamat 0xAFC8bB3...258a via Viem</p>
        </div>
      )}

      {/* VERIFICATION RESULT PANEL (Bab 12 PRD) */}
      {!isLoading && result && (
        <div className="space-y-6">
          {/* RESULT CARD 1: VALID */}
          {result.status === 'VALID' && (
            <div className="bg-white p-6 sm:p-8 border border-neutral-200/90 shadow-lg space-y-6 animate-fade-in relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6">
                <div className="flex items-center gap-4">
                  <img src={iconVerified} alt="Verified Status" className="w-14 h-14" />
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold tracking-wide uppercase mb-1">
                      VERIFIED AUTHENTIC
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-900">{result.title}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 text-neutral-700 text-xs font-mono border border-neutral-200">
                    <img src={ethereumSepoliaBadge} alt="Sepolia" className="w-3.5 h-3.5 opacity-80" />
                    Sepolia On-Chain
                  </div>
                </div>
              </div>

              {/* Certificate Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">CERTIFICATE ID</span>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 text-sm">{result.id}</span>
                    <button
                      onClick={() => copyToClipboard(result.id)}
                      className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">RECIPIENT NAME</span>
                  <span className="font-bold text-neutral-900 text-sm">{result.recipient}</span>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">ISSUE DATE</span>
                  <span className="font-bold text-neutral-900 text-sm">{result.issueDate}</span>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">STATUS</span>
                  <span className="font-bold text-emerald-600 text-sm flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ACTIVE / VALID
                  </span>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200/80 space-y-1 md:col-span-2">
                  <span className="text-neutral-400 block text-[10px]">ISSUER WALLET ADDRESS</span>
                  <a
                    href={`${ETHERSCAN_BASE_URL}/address/${result.issuer}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-neutral-800 hover:text-indigo-600 truncate block"
                  >
                    {result.issuer}
                  </a>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200/80 space-y-1 md:col-span-2">
                  <span className="text-neutral-400 block text-[10px]">IPFS STORAGE CID</span>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-800 truncate">{result.ipfsCid}</span>
                    <a
                      href={`https://gateway.pinata.cloud/ipfs/${result.ipfsCid}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 hover:underline inline-flex items-center gap-1 font-sans"
                    >
                      <img src={ipfsBadge} alt="IPFS" className="w-3.5 h-3.5" /> View on IPFS <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200/80 space-y-1 md:col-span-2">
                  <span className="text-neutral-400 block text-[10px]">ON-CHAIN SHA-256 HASH (BYTES32)</span>
                  <span className="font-bold text-neutral-700 truncate block text-[11px]">{result.certificateHash}</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Smart Contract Signature Verified
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400">
                    Verified directly from Ethereum Sepolia Registry via Viem
                  </div>
                </div>

                <a
                  href={`${ETHERSCAN_BASE_URL}/address/${CONTRACT_ADDRESS}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white text-neutral-900 text-xs font-semibold hover:bg-neutral-100 transition inline-flex items-center gap-1.5 shrink-0"
                >
                  View Contract <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* RESULT CARD 2: REVOKED */}
          {result.status === 'REVOKED' && (
            <div className="bg-white p-6 sm:p-8 border border-rose-200 shadow-lg space-y-6 animate-fade-in">
              <div className="flex items-center gap-4 border-b border-neutral-100 pb-6">
                <img src={iconRevoked} alt="Revoked Status" className="w-14 h-14" />
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-rose-100 text-rose-800 text-[11px] font-bold tracking-wide uppercase mb-1">
                    CERTIFICATE REVOKED
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900">{result.title}</h2>
                </div>
              </div>

              <div className="p-4 bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" /> Sertifikat Ini Telah Dicabut oleh Issuer
                </div>
                <p className="text-[11px] text-rose-700">
                  Status pencabutan tercatat permanen pada smart contract di blockchain Ethereum Sepolia.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">CERTIFICATE ID</span>
                  <span className="font-bold text-neutral-900">{result.id}</span>
                </div>
                <div className="p-4 bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">RECIPIENT</span>
                  <span className="font-bold text-neutral-900">{result.recipient}</span>
                </div>
                <div className="p-4 bg-neutral-50 border border-neutral-200 space-y-1 md:col-span-2">
                  <span className="text-neutral-400 block text-[10px]">ISSUER WALLET</span>
                  <span className="font-bold text-neutral-800 truncate block">{result.issuer}</span>
                </div>
              </div>
            </div>
          )}

          {/* RESULT CARD 3: NOT FOUND */}
          {result.status === 'NOT_FOUND' && (
            <div className="bg-white p-8 border border-neutral-200/90 shadow-sm text-center space-y-6 animate-fade-in">
              <img src={iconNotFound} alt="Not Found Status" className="w-16 h-16 mx-auto" />
              <div className="space-y-2 max-w-sm mx-auto">
                <h3 className="text-xl font-bold text-neutral-900">CERTIFICATE NOT FOUND</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Tidak ada data sertifikat dengan ID <code className="bg-neutral-100 px-1.5 py-0.5 font-mono font-bold text-neutral-800">{result.id}</code> di dalam smart contract registry Certifa.
                </p>
              </div>

              <div className="pt-2 text-xs text-neutral-400 max-w-xs mx-auto">
                Pastikan Anda telah memasukkan ID yang benar dari dokumen atau QR Code yang diterbitkan.
              </div>
            </div>
          )}

          {/* OPTIONAL ADVANCED FEATURE: File Hash Verification (Bab 21 PRD) */}
          {result.status === 'VALID' && (
            <div className="bg-neutral-50 p-6 border border-neutral-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-neutral-700" />
                  <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Verify File Integrity (SHA-256 Hash Match)
                  </h4>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-neutral-200 text-neutral-600 font-mono">Bab 21 PRD</span>
              </div>

              <p className="text-xs text-neutral-500 leading-relaxed">
                Unggah file sertifikat PDF/gambar yang Anda miliki untuk mencocokkan SHA-256 Hash file lokal dengan Hash terdaftar di blockchain.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="px-4 py-2 bg-white border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition cursor-pointer inline-flex items-center gap-2 shadow-2xs">
                  <Upload className="w-3.5 h-3.5" /> Pilih File Sertifikat Lokal
                  <input type="file" accept="image/*,.pdf" onChange={handleFileUploadCheck} className="hidden" />
                </label>

                {uploadedFile && (
                  <span className="text-xs font-mono text-neutral-700 truncate max-w-xs">
                    {uploadedFile.name}
                  </span>
                )}
              </div>

              {isCalculatingHash && (
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Menghitung SHA-256 Hash file lokal...
                </div>
              )}

              {fileHashResult && (
                <div
                  className={`p-4 border text-xs font-mono space-y-1 ${
                    fileHashResult.isMatch
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
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
                    Local Calculated Hash: {fileHashResult.calculatedHash}
                  </div>
                  <div className="text-[10px] text-neutral-600 truncate">
                    On-Chain Hash: {fileHashResult.onChainHash}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
