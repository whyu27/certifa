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
  RefreshCw 
} from 'lucide-react';
import iconVerified from '../assets/icon-status-verified.svg';

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

          setResultData({
            certId,
            cid,
            txHash,
            recipient: formData.recipient,
            title: formData.title,
            issueDate: formData.issueDate,
            issuer: '0x71C7656EC7ab88b098defB751B7401B5f6d83A94'
          });

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

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 animate-fade-in text-left">
      {/* Header */}
      <div className="space-y-2 border-b border-neutral-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Issuer Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Penerbitan Sertifikat (Issue)
        </h1>
        <p className="text-sm text-neutral-500">
          Halaman khusus bagi Authorized Issuer untuk mendaftarkan sertifikat baru pada smart contract Ethereum Sepolia & IPFS.
        </p>
      </div>

      {/* STATE 1: Wallet Not Connected */}
      {!isWalletConnected && (
        <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto text-neutral-700 border border-neutral-200">
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
            className="px-6 py-3 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition shadow-sm inline-flex items-center gap-2"
          >
            <Wallet className="w-4 h-4" /> Connect Wallet Sekarang
          </button>
        </div>
      )}

      {/* STATE 2: Wallet Connected but Unauthorized */}
      {isWalletConnected && !isAuthorized && (
        <div className="bg-amber-50/60 rounded-3xl p-8 border border-amber-200 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto text-amber-700 border border-amber-200">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-neutral-900">Wallet Connected but Unauthorized</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Wallet <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-neutral-800">0x71C...3A94</code> belum terdaftar sebagai Authorized Issuer pada smart contract.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsAuthorized(true)}
              className="px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition"
            >
              Simulasikan Authorize Wallet
            </button>
          </div>
        </div>
      )}

      {/* STATE 3: Authorized Issuer Form */}
      {isWalletConnected && isAuthorized && processingState === 'idle' && (
        <form onSubmit={handleIssueSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-neutral-800">Status: Authorized Issuer</span>
            </div>
            <span className="text-xs font-mono text-neutral-400">Sepolia Network</span>
          </div>

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
                className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition"
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
                className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition"
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
                className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                Upload File Sertifikat Asli (PDF/PNG/JPG) *
              </label>
              <div className="border-2 border-dashed border-neutral-200 hover:border-neutral-400 rounded-2xl p-6 text-center bg-neutral-50/50 transition relative">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-2 pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-600">
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
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition shadow-md flex items-center justify-center gap-2"
            >
              Generate & Register Certificate
            </button>
          </div>
        </form>
      )}

      {/* PROCESSING STATE */}
      {processingState === 'processing' && (
        <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-md space-y-6">
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
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                    isDone 
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
                      : isCurrent 
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm' 
                      : 'bg-neutral-50 border-neutral-200 text-neutral-400 opacity-60'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
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
        <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-lg space-y-6 animate-fade-in">
          <div className="flex items-center gap-4 border-b border-neutral-100 pb-6">
            <img src={iconVerified} alt="Verified" className="w-12 h-12" />
            <div>
              <h3 className="text-2xl font-extrabold text-neutral-900">Certificate Issued Successfully!</h3>
              <p className="text-xs text-neutral-500">Bukti penerbitan telah tersimpan di IPFS & Smart Contract Registry.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="text-neutral-400 block text-[10px]">CERTIFICATE ID</span>
              <span className="font-bold text-neutral-900 text-sm">{resultData.certId}</span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="text-neutral-400 block text-[10px]">RECIPIENT</span>
              <span className="font-bold text-neutral-900">{resultData.recipient}</span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="text-neutral-400 block text-[10px]">IPFS CID</span>
              <span className="font-bold text-neutral-800 truncate block">{resultData.cid}</span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="text-neutral-400 block text-[10px]">TRANSACTION HASH</span>
              <span className="font-bold text-emerald-600 truncate block">{resultData.txHash}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold">Final Certificate Ready</div>
              <div className="text-[11px] text-neutral-400">Termasuk QR Code verifikasi terintegrasi</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`Downloading certificate mock for ${resultData.certId}...`)}
                className="px-4 py-2 bg-emerald-500 text-neutral-950 font-semibold rounded-full text-xs hover:bg-emerald-400 transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF Final
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
            <button
              onClick={resetForm}
              className="px-5 py-2.5 rounded-full bg-neutral-100 text-neutral-800 font-semibold text-xs hover:bg-neutral-200 transition inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Issue Certificate Lainnya
            </button>

            <a
              href={`/verify?id=${resultData.certId}`}
              className="px-5 py-2.5 rounded-full bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition inline-flex items-center gap-2"
            >
              Buka Halaman Verifikasi <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
