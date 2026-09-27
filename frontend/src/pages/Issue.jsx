import { useState } from 'react';
import {
  Wallet,
  ShieldAlert,
  ShieldCheck,
  Upload,
  FileText,
  CheckCircle2,
  Loader2,
  Download,
  ExternalLink,
  QrCode,
  RefreshCw,
  Ban,
  AlertTriangle,
  Copy,
  Check,
  Search,
  X
} from 'lucide-react';
import iconVerified from '../assets/icon-status-verified.svg';
import iconRevoked from '../assets/icon-status-revoked.svg';

export default function Issue({ isWalletConnected, setIsWalletConnected, isAuthorized, setIsAuthorized }) {
  const [formData, setFormData] = useState({
    recipient: '',
    title: '',
    issueDate: new Date().toISOString().split('T')[0],
    file: null,
  });

  const [processingState, setProcessingState] = useState('idle'); // 'idle' | 'processing' | 'success'
  const [currentStep, setCurrentStep] = useState(0);
  const [resultData, setResultData] = useState(null);

  // My Certificates State (List of certificates issued by this issuer)
  const [certificates, setCertificates] = useState([
    {
      certId: 'CERT-2026-8F92A1',
      title: 'Certified Smart Contract Engineer',
      recipient: 'Alex Morgan',
      issueDate: '2026-02-18',
      status: 'VALID',
      cid: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
      txHash: '0x8f92a17c0938b8293e810a9c8192830192830192830192830192830192830192',
    },
    {
      certId: 'CERT-2026-992B1C',
      title: 'Fullstack Ethereum Developer Certification',
      recipient: 'Sarah Jenkins',
      issueDate: '2026-02-20',
      status: 'VALID',
      cid: 'QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx',
      txHash: '0x17b4c9201948ba92018374829104857d9182349bc12837491028374912837491',
    },
    {
      certId: 'CERT-REVOKED-001',
      title: 'Blockchain Architecture Specialist',
      recipient: 'David Miller',
      issueDate: '2025-11-10',
      status: 'REVOKED',
      revokedDate: '2026-01-15',
      revocationReason: 'Credential superseded by advanced certificate',
      cid: 'QmQJ2b89182918293849102938491029384910293849102',
      txHash: '0x3a4b92c81726e91048b29104857d9182349bc128374910283749128374910283',
    }
  ]);

  // Search & Filter state for My Certificates
  const [certSearch, setCertSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL' | 'VALID' | 'REVOKED'

  // Revoke Modal State
  const [revokeTarget, setRevokeTarget] = useState(null);
  const [revokeReason, setRevokeReason] = useState('Pelanggaran ketentuan atau sertifikat diperbarui');
  const [isRevoking, setIsRevoking] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const steps = [
    'Generating Certificate ID',
    'Adding QR Code to Certificate',
    'Uploading Final File to IPFS (Pinata)',
    'Calculating Final SHA-256 Hash',
    'Submitting Transaction to Ethereum Sepolia'
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    if (!formData.recipient || !formData.title || !formData.file) {
      alert('Harap lengkapi semua bidang form dan pilih file sertifikat.');
      return;
    }

    setProcessingState('processing');
    setCurrentStep(0);

    // Simulate issuing pipeline steps
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          const certId = `CERT-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
          const cid = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
          const txHash = `0x${Math.random().toString(16).substring(2, 34)}${Math.random().toString(16).substring(2, 34)}`;

          const newCert = {
            certId,
            cid,
            txHash,
            recipient: formData.recipient,
            title: formData.title,
            issueDate: formData.issueDate,
            issuer: '0x71C7656EC7ab88b098defB751B7401B5f6d83A94',
            status: 'VALID'
          };

          setResultData(newCert);

          // Auto add to My Certificates
          setCertificates((prevList) => [newCert, ...prevList]);

          setProcessingState('success');
          return prev;
        }
      });
    }, 1200);
  };

  const resetForm = () => {
    setProcessingState('idle');
    setFormData({
      recipient: '',
      title: '',
      issueDate: new Date().toISOString().split('T')[0],
      file: null,
    });
    setResultData(null);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handle Revocation
  const handleConfirmRevoke = () => {
    if (!revokeTarget) return;
    setIsRevoking(true);

    setTimeout(() => {
      setCertificates((prev) =>
        prev.map((c) => {
          if (c.certId === revokeTarget.certId) {
            return {
              ...c,
              status: 'REVOKED',
              revokedDate: new Date().toISOString().split('T')[0],
              revocationReason: revokeReason
            };
          }
          return c;
        })
      );
      setIsRevoking(false);
      setRevokeTarget(null);
    }, 1000);
  };

  // Filtered Certificates
  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.certId.toLowerCase().includes(certSearch.toLowerCase()) ||
      cert.recipient.toLowerCase().includes(certSearch.toLowerCase()) ||
      cert.title.toLowerCase().includes(certSearch.toLowerCase());

    const matchesStatus =
      filterStatus === 'ALL' || cert.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 animate-fade-in text-left">
      {/* Header */}
      <div className="space-y-2 border-b border-neutral-200 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Issuer Dashboard
        </h1>
        <p className="text-sm text-neutral-500">
          Pusat penerbitan (Issue) dan pengelolaan status sertifikat on-chain (termasuk pencabutan/Revoke) untuk Authorized Issuer.
        </p>
      </div>

      {/* STATE 1: Wallet Not Connected */}
      {!isWalletConnected && (
        <div className="bg-white p-8 border border-neutral-200/90 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 bg-neutral-100 flex items-center justify-center mx-auto text-neutral-700 border border-neutral-200">
            <Wallet className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-sm mx-auto">
            <h3 className="text-xl font-bold text-neutral-900">Connect Your Web3 Wallet</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Anda harus menghubungkan wallet (MetaMask) untuk mengonfirmasi identitas dan otorisasi issuer Anda.
            </p>
          </div>
          <button
            onClick={() => setIsWalletConnected(true)}
            className="px-6 py-3 bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition shadow-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <Wallet className="w-4 h-4" /> Connect Wallet Sekarang
          </button>
        </div>
      )}

      {/* STATE 2: Wallet Connected but Unauthorized */}
      {isWalletConnected && !isAuthorized && (
        <div className="bg-amber-50/60 p-8 border border-amber-200 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 bg-amber-100 flex items-center justify-center mx-auto text-amber-700 border border-amber-200">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-neutral-900">Wallet Connected but Unauthorized</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Wallet <code className="bg-amber-100 px-1.5 py-0.5 font-mono text-neutral-800">0x71C...3A94</code> belum terdaftar sebagai Authorized Issuer pada smart contract.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsAuthorized(true)}
              className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition cursor-pointer"
            >
              Simulasikan Authorize Wallet
            </button>
          </div>
        </div>
      )}

      {/* STATE 3: Authorized Issuer Form & Issuing Workflow */}
      {isWalletConnected && isAuthorized && (
        <div className="space-y-12">
          {/* SECTION 1: ISSUE FORM */}
          {processingState === 'idle' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">Penerbitan Sertifikat Baru (Issue)</h2>
                  <p className="text-xs text-neutral-500">Daftarkan metadata sertifikat dan file final ke blockchain & IPFS</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                    Authorized Issuer
                  </span>
                </div>
              </div>

              <form onSubmit={handleIssueSubmit} className="bg-white p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-6">
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                      Judul / Nama Sertifikat *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Certificate of Excellence in Blockchain Engineering"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition"
                    />
                  </div>

                  {/* Recipient */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                      Nama Penerima (Recipient) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={formData.recipient}
                      onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition"
                    />
                  </div>

                  {/* Issue Date */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                      Tanggal Penerbitan *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.issueDate}
                      onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition"
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                      Upload File Sertifikat Asli (PDF/PNG/JPG) *
                    </label>
                    <div className="border-2 border-dashed border-neutral-200 hover:border-neutral-400 p-6 text-center bg-neutral-50/50 transition relative">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="space-y-2 pointer-events-none">
                        <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center mx-auto text-neutral-600">
                          <Upload className="w-5 h-5" />
                        </div>
                        {formData.file ? (
                          <div className="text-xs font-semibold text-emerald-600 flex items-center justify-center gap-1">
                            <FileText className="w-4 h-4" /> {formData.file.name}
                          </div>
                        ) : (
                          <div>
                            <p className="text-xs font-medium text-neutral-700">Klik atau seret file sertifikat ke sini</p>
                            <p className="text-[11px] text-neutral-400">PDF, PNG, JPG hingga 10MB</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Generate & Register Certificate
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* PROCESSING STATE */}
          {processingState === 'processing' && (
            <div className="bg-white p-8 border border-neutral-200 shadow-md space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-neutral-900">Processing Certificate...</h3>
                <p className="text-xs text-neutral-500">
                  Harap tunggu, sistem sedang memproses gambar, QR code, IPFS, dan transaksi Ethereum Sepolia.
                </p>
              </div>

              <div className="space-y-3 max-w-md mx-auto pt-4">
                {steps.map((stepName, idx) => {
                  const isDone = idx < currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 border flex items-center gap-3 transition-all ${isDone
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                          : isCurrent
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-400 opacity-60'
                        }`}
                    >
                      <div className="w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : isCurrent ? (
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <span className="text-xs font-medium">{stepName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUCCESS STATE */}
          {processingState === 'success' && resultData && (
            <div className="bg-white p-8 border border-neutral-200 shadow-lg space-y-6 animate-fade-in">
              <div className="flex items-center gap-4 border-b border-neutral-100 pb-6">
                <img src={iconVerified} alt="Verified" className="w-12 h-12" />
                <div>
                  <h3 className="text-2xl font-extrabold text-neutral-900">Certificate Issued Successfully!</h3>
                  <p className="text-xs text-neutral-500">Bukti penerbitan telah tersimpan di IPFS & Smart Contract Registry serta ditambahkan ke daftar di bawah.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">CERTIFICATE ID</span>
                  <span className="font-bold text-neutral-900 text-sm">{resultData.certId}</span>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">RECIPIENT</span>
                  <span className="font-bold text-neutral-900">{resultData.recipient}</span>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">IPFS CID</span>
                  <span className="font-bold text-neutral-800 truncate block">{resultData.cid}</span>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">TRANSACTION HASH</span>
                  <span className="font-bold text-emerald-600 truncate block">{resultData.txHash}</span>
                </div>
              </div>

              <div className="p-4 bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-semibold">Final Certificate Ready</div>
                  <div className="text-[11px] text-neutral-400">Termasuk QR Code verifikasi terintegrasi</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Downloading certificate for ${resultData.certId}...`)}
                    className="px-4 py-2 bg-emerald-500 text-neutral-950 font-semibold text-xs hover:bg-emerald-400 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF Final
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <button
                  onClick={resetForm}
                  className="px-5 py-2.5 bg-neutral-100 text-neutral-800 font-semibold text-xs hover:bg-neutral-200 transition inline-flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Issue Certificate Lainnya
                </button>

                <a
                  href={`/verify?id=${resultData.certId}`}
                  className="px-5 py-2.5 bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition inline-flex items-center gap-2 cursor-pointer"
                >
                  Buka Halaman Verifikasi <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* SECTION 2: MY CERTIFICATES (List & Revoke Action) */}
          <div className="pt-6 border-t border-neutral-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
                  My Certificates
                  <span className="text-xs font-semibold px-2 py-0.5 bg-neutral-100 text-neutral-600 border border-neutral-200">
                    {certificates.length} Total
                  </span>
                </h2>
                <p className="text-xs text-neutral-500">
                  Daftar seluruh sertifikat yang telah diterbitkan oleh wallet Anda beserta fungsi pencabutan (Revoke).
                </p>
              </div>

              {/* Search & Filter Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Cari ID, Nama, Judul..."
                    value={certSearch}
                    onChange={(e) => setCertSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-white border border-neutral-200 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 w-48 sm:w-56"
                  />
                </div>

                <div className="flex border border-neutral-200 bg-white text-xs">
                  <button
                    onClick={() => setFilterStatus('ALL')}
                    className={`px-3 py-1.5 font-medium transition cursor-pointer ${filterStatus === 'ALL' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                  >
                    Semua
                  </button>
                  <button
                    onClick={() => setFilterStatus('VALID')}
                    className={`px-3 py-1.5 font-medium transition cursor-pointer ${filterStatus === 'VALID' ? 'bg-emerald-600 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilterStatus('REVOKED')}
                    className={`px-3 py-1.5 font-medium transition cursor-pointer ${filterStatus === 'REVOKED' ? 'bg-rose-600 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                  >
                    Revoked
                  </button>
                </div>
              </div>
            </div>

            {/* Certificates Table / Cards */}
            {filteredCertificates.length === 0 ? (
              <div className="bg-white p-8 border border-neutral-200 text-center space-y-2">
                <p className="text-xs text-neutral-500">Tidak ada sertifikat yang cocok dengan pencarian atau filter status.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCertificates.map((cert) => {
                  const isRevoked = cert.status === 'REVOKED';

                  return (
                    <div
                      key={cert.certId}
                      className={`bg-white p-5 border transition-all hover:shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${isRevoked ? 'border-rose-200/80 bg-rose-50/20' : 'border-neutral-200'}`}
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 border border-neutral-200 flex items-center gap-1.5">
                            {cert.certId}
                            <button
                              onClick={() => copyToClipboard(cert.certId, cert.certId)}
                              className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
                              title="Copy ID"
                            >
                              {copiedId === cert.certId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </span>

                          {isRevoked ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-bold tracking-wide uppercase border border-rose-200">
                              <Ban className="w-3 h-3" /> REVOKED
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-wide uppercase border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" /> ACTIVE / VALID
                            </span>
                          )}

                          <span className="text-[11px] text-neutral-400 font-mono">
                            Issued: {cert.issueDate}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-neutral-900">{cert.title}</h4>
                          <p className="text-xs text-neutral-600">
                            Recipient: <span className="font-semibold text-neutral-800">{cert.recipient}</span>
                          </p>
                        </div>

                        {isRevoked && (
                          <div className="text-[11px] text-rose-700 bg-rose-50 p-2 border border-rose-200/60 flex items-start gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>
                              Dicabut pada <strong>{cert.revokedDate}</strong>. Alasan: <em>{cert.revocationReason}</em>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100">
                        <a
                          href={`/verify?id=${cert.certId}`}
                          className="px-3 py-1.5 bg-neutral-100 text-neutral-800 hover:bg-neutral-200 text-xs font-medium transition inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          Verify <ExternalLink className="w-3 h-3" />
                        </a>

                        <a
                          href={`https://ipfs.io/ipfs/${cert.cid}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-neutral-100 text-neutral-800 hover:bg-neutral-200 text-xs font-medium transition inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          IPFS <ExternalLink className="w-3 h-3" />
                        </a>

                        {!isRevoked && (
                          <button
                            onClick={() => {
                              setRevokeTarget(cert);
                              setRevokeReason('Pelanggaran ketentuan atau sertifikat diperbarui');
                            }}
                            className="px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-xs font-semibold transition inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <Ban className="w-3 h-3" /> Revoke
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* REVOKE CONFIRMATION MODAL */}
      {revokeTarget && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 border border-neutral-300 shadow-2xl space-y-5 animate-fade-in">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 text-rose-600">
                <div className="w-10 h-10 bg-rose-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Revoke Certificate</h3>
                  <p className="text-xs text-neutral-500">Pencabutan status sertifikat on-chain</p>
                </div>
              </div>
              <button
                onClick={() => setRevokeTarget(null)}
                className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs space-y-1.5 font-mono">
              <div>
                <span className="text-neutral-400">ID:</span> <strong className="text-neutral-900">{revokeTarget.certId}</strong>
              </div>
              <div>
                <span className="text-neutral-400">Recipient:</span> <strong className="text-neutral-900">{revokeTarget.recipient}</strong>
              </div>
              <div className="truncate">
                <span className="text-neutral-400">Title:</span> <strong className="text-neutral-900">{revokeTarget.title}</strong>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <label className="block font-bold text-neutral-800 uppercase tracking-wider">
                Alasan Pencabutan (Revocation Reason) *
              </label>
              <textarea
                rows={3}
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                placeholder="Masukkan alasan pembatalan atau pencabutan sertifikat..."
                className="w-full p-3 bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition"
              />
              <p className="text-[11px] text-neutral-500">
                Aksi ini akan mencatat status <code className="bg-rose-100 text-rose-800 px-1 font-mono">revoked = true</code> pada smart contract dan tidak dapat diurungkan kembali.
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setRevokeTarget(null)}
                disabled={isRevoking}
                className="px-4 py-2 bg-neutral-100 text-neutral-700 text-xs font-semibold hover:bg-neutral-200 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmRevoke}
                disabled={isRevoking}
                className="px-5 py-2 bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isRevoking ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Revoking on Blockchain...
                  </>
                ) : (
                  <>
                    <Ban className="w-3.5 h-3.5" /> Konfirmasi Revoke
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
