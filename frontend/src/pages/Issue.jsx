import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useWriteContract } from 'wagmi';
import {
  Wallet,
  ShieldAlert,
  Upload,
  FileText,
  CheckCircle2,
  Loader2,
  Download,
  ExternalLink,
  RefreshCw,
  Ban,
  AlertTriangle,
  Copy,
  Check,
  Search,
  X,
  AlertCircle
} from 'lucide-react';
import iconVerified from '../assets/icon-status-verified.svg';
import { useWallet } from '../context/WalletContext';
import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  publicClient,
  BACKEND_URL,
  ETHERSCAN_BASE_URL
} from '../config/contract';

export default function Issue() {
  const {
    account,
    isWalletConnected,
    isAuthorized,
    connectWallet,
    switchToSepolia,
    isWrongNetwork
  } = useWallet();

  const { writeContractAsync } = useWriteContract();

  const [formData, setFormData] = useState({
    recipient: '',
    title: '',
    issueDate: new Date().toISOString().split('T')[0],
    file: null,
  });

  const [processingState, setProcessingState] = useState('idle'); // 'idle' | 'processing' | 'success' | 'error'
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [resultData, setResultData] = useState(null);

  // My Certificates State (List of certificates issued by this issuer from blockchain)
  const [certificates, setCertificates] = useState([]);
  const [isLoadingCerts, setIsLoadingCerts] = useState(false);

  // Search & Filter state for My Certificates
  const [certSearch, setCertSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL' | 'VALID' | 'REVOKED'

  // Revoke Modal State
  const [revokeTarget, setRevokeTarget] = useState(null);
  const [isRevoking, setIsRevoking] = useState(false);
  const [revokeError, setRevokeError] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const steps = [
    'Processing Certificate & Stamping QR Code',
    'Uploading Final File to IPFS (Pinata)',
    'Calculating Final SHA-256 Hash',
    'Submitting Transaction via Wagmi to Ethereum Sepolia',
    'Waiting for Blockchain Confirmation'
  ];

  // Fetch issued certificates for connected account
  const fetchIssuerCertificates = useCallback(async () => {
    if (!account) {
      setCertificates([]);
      return;
    }

    setIsLoadingCerts(true);
    try {
      const certIds = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getCertificatesByIssuer',
        args: [account]
      });

      if (certIds && certIds.length > 0) {
        // Fetch details for each certificate in reverse order (newest first)
        const certPromises = [...certIds].reverse().map(async (id) => {
          try {
            const cert = await publicClient.readContract({
              address: CONTRACT_ADDRESS,
              abi: CONTRACT_ABI,
              functionName: 'getCertificate',
              args: [id]
            });

            const dateStr = cert.issuedAt
              ? new Date(Number(cert.issuedAt) * 1000).toISOString().split('T')[0]
              : '-';

            return {
              certId: cert.certId,
              title: cert.title,
              recipient: cert.recipient,
              issueDate: dateStr,
              status: cert.revoked ? 'REVOKED' : 'VALID',
              cid: cert.ipfsCID,
              certificateHash: cert.certificateHash,
              issuer: cert.issuer,
            };
          } catch (e) {
            console.error(`Error loading cert ${id}:`, e);
            return null;
          }
        });

        const loadedCerts = (await Promise.all(certPromises)).filter(Boolean);
        setCertificates(loadedCerts);
      } else {
        setCertificates([]);
      }
    } catch (error) {
      console.error('Failed to fetch issuer certificates via viem:', error);
    } finally {
      setIsLoadingCerts(false);
    }
  }, [account]);

  useEffect(() => {
    if (isWalletConnected && account) {
      fetchIssuerCertificates();
    } else {
      setCertificates([]);
    }
  }, [isWalletConnected, account, fetchIssuerCertificates]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    if (!formData.recipient || !formData.title || !formData.file) {
      alert('Harap lengkapi semua bidang form dan pilih file sertifikat.');
      return;
    }

    if (isWrongNetwork) {
      switchToSepolia();
      return;
    }

    setProcessingState('processing');
    setErrorMessage('');
    setCurrentStep(0);

    try {
      // STEP 1: Process file & stamp QR code + IPFS upload on backend
      setCurrentStep(0);
      const uploadData = new FormData();
      uploadData.append('file', formData.file);
      uploadData.append('recipient', formData.recipient.trim());
      uploadData.append('title', formData.title.trim());
      uploadData.append('issueDate', formData.issueDate);

      const backendResponse = await axios.post(`${BACKEND_URL}/certificates/process`, uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (!backendResponse.data || !backendResponse.data.success) {
        throw new Error(backendResponse.data?.message || 'Gagal memproses file pada server.');
      }

      const { certId, certHash, ipfsCID, ipfsUrl, fileBase64, fileName, mimeType } = backendResponse.data.data;

      // STEP 2 & 3: Final hash & IPFS ready
      setCurrentStep(1);
      await new Promise((r) => setTimeout(r, 400));
      setCurrentStep(2);
      await new Promise((r) => setTimeout(r, 400));

      // STEP 4: Submit transaction via Wagmi useWriteContract
      setCurrentStep(3);
      const txHash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'issueCertificate',
        args: [
          certId,
          certHash,
          ipfsCID,
          formData.recipient.trim(),
          formData.title.trim()
        ]
      });

      // STEP 5: Wait for transaction confirmation on Sepolia
      setCurrentStep(4);
      const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

      const newCertData = {
        certId,
        cid: ipfsCID,
        ipfsUrl,
        txHash: receipt.transactionHash || txHash,
        recipient: formData.recipient.trim(),
        title: formData.title.trim(),
        issueDate: formData.issueDate,
        issuer: account,
        status: 'VALID',
        fileBase64,
        fileName,
        mimeType
      };

      setResultData(newCertData);
      setProcessingState('success');

      // Refresh certificates list from blockchain
      await fetchIssuerCertificates();
    } catch (error) {
      console.error('Error during certificate issuance via wagmi:', error);
      setProcessingState('error');
      let msg = error.message || 'Terjadi kesalahan saat menerbitkan sertifikat.';
      if (error.name === 'UserRejectedRequestError' || error.message?.includes('User rejected')) {
        msg = 'Transaksi dibatalkan oleh pengguna pada wallet.';
      } else if (error.response?.data?.message) {
        msg = error.response.data.message;
      }
      setErrorMessage(msg);
    }
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
    setErrorMessage('');
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Download processed certificate file from Base64
  const downloadProcessedCertificate = () => {
    if (!resultData?.fileBase64) return;
    const a = document.createElement('a');
    a.href = resultData.fileBase64;
    a.download = resultData.fileName || `${resultData.certId}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Handle Real Revocation on Smart Contract via Wagmi
  const handleConfirmRevoke = async () => {
    if (!revokeTarget) return;
    setIsRevoking(true);
    setRevokeError('');

    try {
      const txHash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'revokeCertificate',
        args: [revokeTarget.certId]
      });

      await publicClient.waitForTransactionReceipt({ hash: txHash });

      // Refresh list
      await fetchIssuerCertificates();
      setRevokeTarget(null);
    } catch (error) {
      console.error('Error revoking certificate via wagmi:', error);
      let msg = error.message || 'Gagal mencabut sertifikat.';
      if (error.name === 'UserRejectedRequestError' || error.message?.includes('User rejected')) {
        msg = 'Transaksi dibatalkan oleh pengguna.';
      }
      setRevokeError(msg);
    } finally {
      setIsRevoking(false);
    }
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12 animate-fade-in text-left">
      {/* Header */}
      <div className="space-y-2 border-b border-neutral-200 pb-5 sm:pb-6">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Issuer Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
          Pusat penerbitan (Issue) dan pengelolaan status sertifikat on-chain (termasuk pencabutan/Revoke) untuk Authorized Issuer menggunakan Wagmi & Viem.
        </p>
      </div>

      {/* STATE 1: Wallet Not Connected */}
      {!isWalletConnected && (
        <div className="bg-white p-6 sm:p-8 border border-neutral-200/90 shadow-sm text-center space-y-5 sm:space-y-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-neutral-100 flex items-center justify-center mx-auto text-neutral-700 border border-neutral-200">
            <Wallet className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div className="space-y-2 max-w-sm mx-auto">
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">Connect Your Web3 Wallet</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Anda harus menghubungkan wallet (MetaMask) untuk mengonfirmasi identitas dan otorisasi issuer Anda di Ethereum Sepolia.
            </p>
          </div>
          <button
            onClick={connectWallet}
            className="w-full sm:w-auto px-6 py-3 bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <Wallet className="w-4 h-4" /> Connect Wallet Sekarang
          </button>
        </div>
      )}

      {/* STATE 2: Wallet Connected but Unauthorized */}
      {isWalletConnected && !isAuthorized && (
        <div className="bg-amber-50/60 p-6 sm:p-8 border border-amber-200 shadow-sm text-center space-y-5 sm:space-y-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-100 flex items-center justify-center mx-auto text-amber-700 border border-amber-200">
            <ShieldAlert className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">Wallet Connected but Unauthorized</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Wallet <code className="bg-amber-100 px-1.5 py-0.5 font-mono text-neutral-800 break-all">{account}</code> belum terdaftar sebagai Authorized Issuer pada smart contract.
            </p>
            <p className="text-[11px] text-neutral-500 pt-2">
              Hanya Contract Owner yang dapat menambahkan alamat wallet ini sebagai authorized issuer melalui fungsi <code>addIssuer</code>.
            </p>
          </div>
        </div>
      )}

      {/* STATE 3: Authorized Issuer Form & Issuing Workflow */}
      {isWalletConnected && isAuthorized && (
        <div className="space-y-10 sm:space-y-12">
          {/* SECTION 1: ISSUE FORM */}
          {processingState === 'idle' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-900">Penerbitan Sertifikat Baru (Issue)</h2>
                  <p className="text-xs text-neutral-500">Daftarkan metadata sertifikat dan file final ke blockchain & IPFS</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="w-2 h-2 bg-emerald-500 animate-pulse"></span>
                  <span className="text-[11px] sm:text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                    Authorized Issuer
                  </span>
                </div>
              </div>

              <form onSubmit={handleIssueSubmit} className="bg-white p-5 sm:p-8 border border-neutral-200/90 shadow-sm space-y-6">
                <div className="space-y-4 sm:space-y-5">
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
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition"
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
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition"
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
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition"
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                      Upload File Sertifikat Asli (PDF/PNG/JPG/WEBP) *
                    </label>
                    <div className="border-2 border-dashed border-neutral-200 hover:border-neutral-400 p-5 sm:p-6 text-center bg-neutral-50/50 transition relative">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="space-y-2 pointer-events-none">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-neutral-100 flex items-center justify-center mx-auto text-neutral-600">
                          <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        {formData.file ? (
                          <div className="text-xs font-semibold text-emerald-600 flex items-center justify-center gap-1">
                            <FileText className="w-4 h-4" /> {formData.file.name}
                          </div>
                        ) : (
                          <div>
                            <p className="text-xs font-medium text-neutral-700">Klik atau seret file sertifikat ke sini</p>
                            <p className="text-[11px] text-neutral-400">PDF, PNG, JPG, WEBP hingga 10MB</p>
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
            <div className="bg-white p-6 sm:p-8 border border-neutral-200 shadow-md space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900">Processing Certificate...</h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
                  Harap konfirmasi transaksi di wallet MetaMask Anda. Sistem sedang menempelkan QR code, mengunggah ke IPFS, dan mencatat transaksi ke Ethereum Sepolia.
                </p>
              </div>

              <div className="space-y-2.5 sm:space-y-3 max-w-md mx-auto pt-2 sm:pt-4">
                {steps.map((stepName, idx) => {
                  const isDone = idx < currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div
                      key={idx}
                      className={`p-3 sm:p-3.5 border flex items-center gap-3 transition-all ${
                        isDone
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                          : isCurrent
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-400 opacity-60'
                      }`}
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                        ) : isCurrent ? (
                          <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin text-white" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <span className="text-[11px] sm:text-xs font-medium">{stepName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ERROR STATE */}
          {processingState === 'error' && (
            <div className="bg-rose-50/70 p-6 sm:p-8 border border-rose-200 shadow-sm space-y-5 sm:space-y-6 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-rose-100 flex items-center justify-center mx-auto text-rose-600">
                <AlertCircle className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-base sm:text-lg font-bold text-rose-950">Gagal Menerbitkan Sertifikat</h3>
                <p className="text-xs text-rose-800 leading-relaxed font-mono bg-rose-100/60 p-3 border border-rose-200 text-left break-all">
                  {errorMessage}
                </p>
              </div>
              <button
                onClick={resetForm}
                className="w-full sm:w-auto px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition cursor-pointer"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* SUCCESS STATE */}
          {processingState === 'success' && resultData && (
            <div className="bg-white p-5 sm:p-8 border border-neutral-200 shadow-lg space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-neutral-100 pb-5 sm:pb-6">
                <img src={iconVerified} alt="Verified" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900">Certificate Issued Successfully!</h3>
                  <p className="text-xs text-neutral-500">Bukti penerbitan telah tersimpan di IPFS & Smart Contract Registry Sepolia.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs font-mono">
                <div className="p-3.5 sm:p-4 bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">CERTIFICATE ID</span>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 text-xs sm:text-sm truncate">{resultData.certId}</span>
                    <button
                      onClick={() => copyToClipboard(resultData.certId, 'success-id')}
                      className="text-neutral-400 hover:text-neutral-600 cursor-pointer ml-2"
                    >
                      {copiedId === 'success-id' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">RECIPIENT</span>
                  <span className="font-bold text-neutral-900 truncate block">{resultData.recipient}</span>
                </div>

                <div className="p-3.5 sm:p-4 bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">IPFS CID</span>
                  <a
                    href={`https://gateway.pinata.cloud/ipfs/${resultData.cid}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-indigo-600 hover:underline truncate block"
                  >
                    {resultData.cid}
                  </a>
                </div>

                <div className="p-3.5 sm:p-4 bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="text-neutral-400 block text-[10px]">TRANSACTION HASH</span>
                  <a
                    href={`${ETHERSCAN_BASE_URL}/tx/${resultData.txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-emerald-600 hover:underline truncate block"
                  >
                    {resultData.txHash}
                  </a>
                </div>
              </div>

              {/* Instant Download Action */}
              <div className="p-4 bg-neutral-900 text-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold">Final Certificate Ready</div>
                  <div className="text-[11px] text-neutral-400">Termasuk QR Code verifikasi terintegrasi</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={downloadProcessedCertificate}
                    className="w-full sm:w-auto px-4 py-2 bg-emerald-500 text-neutral-950 font-semibold text-xs hover:bg-emerald-400 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" /> Download File Final
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-5 py-2.5 bg-neutral-100 text-neutral-800 font-semibold text-xs hover:bg-neutral-200 transition inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Issue Certificate Lainnya
                </button>

                <a
                  href={`/verify?id=${resultData.certId}`}
                  className="w-full sm:w-auto px-5 py-2.5 bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition inline-flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  Buka Halaman Verifikasi <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* SECTION 2: MY CERTIFICATES (Real Blockchain Data) */}
          <div className="pt-6 border-t border-neutral-200 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
                  My Certificates
                  <span className="text-xs font-semibold px-2 py-0.5 bg-neutral-100 text-neutral-600 border border-neutral-200">
                    {certificates.length} On-Chain
                  </span>
                </h2>
                <p className="text-xs text-neutral-500">
                  Daftar seluruh sertifikat yang telah diterbitkan oleh wallet Anda di smart contract.
                </p>
              </div>

              {/* Search & Filter Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Cari ID, Nama, Judul..."
                    value={certSearch}
                    onChange={(e) => setCertSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-white border border-neutral-200 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 w-full sm:w-52 md:w-56"
                  />
                </div>

                <div className="grid grid-cols-3 border border-neutral-200 bg-white text-xs shrink-0 text-center">
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
            {isLoadingCerts ? (
              <div className="bg-white p-8 border border-neutral-200 text-center space-y-2">
                <Loader2 className="w-6 h-6 animate-spin mx-auto text-neutral-600" />
                <p className="text-xs text-neutral-500">Memuat riwayat sertifikat dari blockchain Sepolia...</p>
              </div>
            ) : filteredCertificates.length === 0 ? (
              <div className="bg-white p-8 border border-neutral-200 text-center space-y-2">
                <p className="text-xs text-neutral-500">
                  {certificates.length === 0
                    ? 'Belum ada sertifikat yang diterbitkan oleh wallet ini.'
                    : 'Tidak ada sertifikat yang cocok dengan pencarian atau filter status.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCertificates.map((cert) => {
                  const isRevoked = cert.status === 'REVOKED';

                  return (
                    <div
                      key={cert.certId}
                      className={`bg-white p-4 sm:p-5 border transition-all hover:shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 ${
                        isRevoked ? 'border-rose-200/80 bg-rose-50/20' : 'border-neutral-200'
                      }`}
                    >
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 border border-neutral-200 flex items-center gap-1.5 max-w-full">
                            <span className="truncate">{cert.certId}</span>
                            <button
                              onClick={() => copyToClipboard(cert.certId, cert.certId)}
                              className="text-neutral-400 hover:text-neutral-700 cursor-pointer shrink-0"
                              title="Copy ID"
                            >
                              {copiedId === cert.certId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </span>

                          {isRevoked ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-bold tracking-wide uppercase border border-rose-200">
                              <Ban className="w-3 h-3" /> REVOKED
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-wide uppercase border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" /> ACTIVE / VALID
                            </span>
                          )}

                          <span className="text-[11px] text-neutral-400 font-mono">
                            Issued: {cert.issueDate}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-neutral-900 break-words">{cert.title}</h4>
                          <p className="text-xs text-neutral-600">
                            Recipient: <span className="font-semibold text-neutral-800">{cert.recipient}</span>
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-neutral-100">
                        <a
                          href={`/verify?id=${cert.certId}`}
                          className="px-3 py-1.5 bg-neutral-100 text-neutral-800 hover:bg-neutral-200 text-xs font-medium transition inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          Verify <ExternalLink className="w-3 h-3" />
                        </a>

                        <a
                          href={`https://gateway.pinata.cloud/ipfs/${cert.cid}`}
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
                              setRevokeError('');
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
          <div className="bg-white max-w-md w-full p-5 sm:p-6 border border-neutral-300 shadow-2xl space-y-4 sm:space-y-5 animate-fade-in">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 text-rose-600">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-rose-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Revoke Certificate</h3>
                  <p className="text-xs text-neutral-500">Pencabutan status sertifikat on-chain via Wagmi</p>
                </div>
              </div>
              <button
                onClick={() => setRevokeTarget(null)}
                className="text-neutral-400 hover:text-neutral-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs space-y-1.5 font-mono">
              <div className="break-all">
                <span className="text-neutral-400">ID:</span> <strong className="text-neutral-900">{revokeTarget.certId}</strong>
              </div>
              <div>
                <span className="text-neutral-400">Recipient:</span> <strong className="text-neutral-900">{revokeTarget.recipient}</strong>
              </div>
              <div className="truncate">
                <span className="text-neutral-400">Title:</span> <strong className="text-neutral-900">{revokeTarget.title}</strong>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              Apakah Anda yakin ingin mencabut sertifikat ini? Aksi ini akan mencatat status <code className="bg-rose-100 text-rose-800 px-1 font-mono">revoked = true</code> pada smart contract Sepolia dan tidak dapat diurungkan kembali.
            </p>

            {revokeError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-800 break-all">
                {revokeError}
              </div>
            )}

            <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2">
              <button
                onClick={() => setRevokeTarget(null)}
                disabled={isRevoking}
                className="px-4 py-2 bg-neutral-100 text-neutral-700 text-xs font-semibold hover:bg-neutral-200 transition cursor-pointer text-center"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmRevoke}
                disabled={isRevoking}
                className="px-5 py-2 bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isRevoking ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Revoking on Sepolia...
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
