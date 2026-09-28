import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Wallet, ExternalLink, LogOut, ShieldAlert, ShieldCheck } from 'lucide-react';
import certifaLogo from '../assets/logo-certifa.svg';
import { useWallet } from '../context/WalletContext';
import { ETHERSCAN_BASE_URL } from '../config/contract';

export default function Navbar() {
  const {
    account,
    isWalletConnected,
    isAuthorized,
    isOwner,
    isWrongNetwork,
    isConnecting,
    connectWallet,
    disconnectWallet,
    switchToSepolia
  } = useWallet();

  const location = useLocation();
  const navigate = useNavigate();
  const [showWalletDetails, setShowWalletDetails] = useState(false);

  const isLandingPage = location.pathname === '/';

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
      }
    }
  };

  const getNavClass = (path) =>
    location.pathname === path
      ? 'bg-neutral-900 text-white shadow-sm'
      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80';

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand / Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={certifaLogo}
              alt="Certifa Logo"
              className="w-8 h-8 object-contain group-hover:scale-105 transition-transform duration-200"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none text-neutral-900 tracking-tight">Certifa</span>
              <span className="text-[10px] font-medium text-neutral-500 tracking-wide uppercase">
                Blockchain Registry
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden sm:flex items-center gap-1 bg-neutral-100/70 p-1 border border-neutral-200/60 absolute left-1/2 -translate-x-1/2">
            {isLandingPage ? (
              <>
                <a
                  href="#what-is-certifa"
                  onClick={(e) => handleScrollTo(e, 'what-is-certifa')}
                  className="px-4 py-1.5 text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 transition-all duration-200"
                >
                  What is Certifa?
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleScrollTo(e, 'how-it-works')}
                  className="px-4 py-1.5 text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 transition-all duration-200"
                >
                  How It Works
                </a>
                <a
                  href="#why-certifa"
                  onClick={(e) => handleScrollTo(e, 'why-certifa')}
                  className="px-4 py-1.5 text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 transition-all duration-200"
                >
                  Why Certifa?
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/issue"
                  className={`px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ${getNavClass('/issue')}`}
                >
                  Issue Certificate
                </Link>
                <Link
                  to="/verify"
                  className={`px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ${getNavClass('/verify')}`}
                >
                  Verify Certificate
                </Link>
              </>
            )}
          </nav>

          {/* Right Action / CTA */}
          <div className="flex items-center gap-3">
            {isLandingPage ? (
              <Link
                to="/issue"
                className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 shadow-sm active:scale-95"
              >
                Launch App
              </Link>
            ) : (
              !isWalletConnected ? (
                <button
                  type="button"
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Wallet className="w-4 h-4" />
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              ) : isWrongNetwork ? (
                <button
                  type="button"
                  onClick={switchToSepolia}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-100 border border-amber-300 hover:bg-amber-200 transition cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Switch to Sepolia
                </button>
              ) : (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowWalletDetails(!showWalletDetails)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 transition-all duration-200 shadow-xs cursor-pointer"
                  >
                    <span className={`w-2 h-2 rounded-full ${isAuthorized ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                    <span className="font-mono text-[11px]">{formatAddress(account)}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-neutral-100 text-neutral-600 border border-neutral-200">
                      Sepolia
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {showWalletDetails && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-neutral-200 shadow-xl p-3 z-50 text-xs">
                      <div className="pb-2 border-b border-neutral-100 mb-2">
                        <div className="text-[11px] text-neutral-500">Connected Wallet</div>
                        <div className="font-mono font-medium text-neutral-900 break-all text-[11px] mt-0.5">
                          {account}
                        </div>
                      </div>

                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-500">Network:</span>
                          <span className="font-medium text-emerald-600">Ethereum Sepolia</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-500">Issuer Status:</span>
                          <span className={`font-semibold flex items-center gap-1 ${isAuthorized ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {isAuthorized ? (
                              <>
                                <ShieldCheck className="w-3.5 h-3.5" /> Authorized
                              </>
                            ) : (
                              <>
                                <ShieldAlert className="w-3.5 h-3.5" /> Unauthorized
                              </>
                            )}
                          </span>
                        </div>
                        {isOwner && (
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-500">Contract Role:</span>
                            <span className="font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200 text-[10px]">
                              Owner
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1 pt-2 border-t border-neutral-100">
                        <a
                          href={`${ETHERSCAN_BASE_URL}/address/${account}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between w-full px-2 py-1.5 text-neutral-700 hover:bg-neutral-50 rounded transition"
                        >
                          <span>View on Etherscan</span>
                          <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            disconnectWallet();
                            setShowWalletDetails(false);
                          }}
                          className="flex items-center justify-between w-full px-2 py-1.5 text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer"
                        >
                          <span>Disconnect</span>
                          <LogOut className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </header>
    </>
  );
}
