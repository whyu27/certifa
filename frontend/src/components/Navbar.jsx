import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, CheckCircle2, ChevronRight } from 'lucide-react';
import certifaLogo from '../assets/certifa-logo.png';

export default function Navbar({ isWalletConnected, setIsWalletConnected, isAuthorized, setIsAuthorized }) {
  const location = useLocation();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const activeClass = (path) =>
    location.pathname === path
      ? 'bg-neutral-900 text-white shadow-sm'
      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80';

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={certifaLogo} alt="Certifa Logo" className="w-8 h-8 object-contain group-hover:scale-105 transition-transform duration-200" />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none text-neutral-900 tracking-tight">Certifa</span>
              <span className="text-[10px] font-medium text-neutral-500 tracking-wide uppercase">Blockchain Registry</span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-1 bg-neutral-100/70 p-1 border border-neutral-200/60">
            <Link
              to="/"
              className={`px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ${activeClass('/')}`}
            >
              Home
            </Link>
            <Link
              to="/issue"
              className={`px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ${activeClass('/issue')}`}
            >
              Issue Certificate
            </Link>
            <Link
              to="/verify"
              className={`px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ${activeClass('/verify')}`}
            >
              Verify
            </Link>
          </nav>

          {/* Wallet Actions */}
          <div className="flex items-center gap-3">
            {!isWalletConnected ? (
              <button
                onClick={() => setShowWalletModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 shadow-sm active:scale-95"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </button>
            ) : (
              <div className="relative group">
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-full transition-all duration-200 shadow-xs"
                >
                  <span className={`w-2 h-2 rounded-full ${isAuthorized ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                  <span className="font-mono text-[11px]">0x71C...3A94</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                    Sepolia
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Wallet Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-neutral-200 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-neutral-900">Wallet Simulation</h3>
              <button
                onClick={() => setShowWalletModal(false)}
                className="text-neutral-400 hover:text-neutral-600 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-500 mb-6">
              Simulasikan koneksi Web3 wallet dan status verifikasi issuer on-chain (Ethereum Sepolia).
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-neutral-900">Koneksi Wallet</div>
                  <div className="text-[11px] text-neutral-500">Status: {isWalletConnected ? 'Connected' : 'Disconnected'}</div>
                </div>
                <button
                  onClick={() => setIsWalletConnected(!isWalletConnected)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${isWalletConnected
                    ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                    }`}
                >
                  {isWalletConnected ? 'Disconnect' : 'Connect'}
                </button>
              </div>

              {isWalletConnected && (
                <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-neutral-900">Otorisasi Issuer</div>
                    <div className="text-[11px] text-neutral-500">
                      {isAuthorized ? 'Authorized Issuer ✅' : 'Unauthorized Wallet ⚠️'}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAuthorized(!isAuthorized)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${isAuthorized
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                  >
                    {isAuthorized ? 'Set Unauthorized' : 'Authorize'}
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowWalletModal(false)}
              className="mt-6 w-full py-2.5 bg-neutral-900 text-white rounded-full text-xs font-semibold hover:bg-neutral-800 transition"
            >
              Simpan & Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
