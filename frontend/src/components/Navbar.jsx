import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Wallet, ExternalLink, LogOut, ShieldAlert, ShieldCheck, Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLandingPage = location.pathname === '/';

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
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
      ? 'bg-neutral-900 text-white shadow-xs font-semibold'
      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80';

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand / Logo */}
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <img
              src={certifaLogo}
              alt="Certifa Logo"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-105 transition-transform duration-200"
            />
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg leading-none text-neutral-900 tracking-tight">Certifa</span>
              <span className="text-[9px] sm:text-[10px] font-medium text-neutral-500 tracking-wide uppercase">
                Blockchain Registry
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-100/70 p-1 border border-neutral-200/60 absolute left-1/2 -translate-x-1/2">
            {isLandingPage ? (
              <>
                <a
                  href="#what-is-certifa"
                  onClick={(e) => handleScrollTo(e, 'what-is-certifa')}
                  className="px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 transition-all duration-200"
                >
                  What is Certifa?
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleScrollTo(e, 'how-it-works')}
                  className="px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 transition-all duration-200"
                >
                  How It Works
                </a>
                <a
                  href="#why-certifa"
                  onClick={(e) => handleScrollTo(e, 'why-certifa')}
                  className="px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 transition-all duration-200"
                >
                  Why Certifa?
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/issue"
                  className={`px-4 py-1.5 text-xs lg:text-sm font-medium transition-all duration-200 ${getNavClass('/issue')}`}
                >
                  Issue Certificate
                </Link>
                <Link
                  to="/verify"
                  className={`px-4 py-1.5 text-xs lg:text-sm font-medium transition-all duration-200 ${getNavClass('/verify')}`}
                >
                  Verify Certificate
                </Link>
              </>
            )}
          </nav>

          {/* Right Action / CTA & Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isLandingPage ? (
              <Link
                to="/issue"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 shadow-xs active:scale-95"
              >
                Launch App
              </Link>
            ) : (
              !isWalletConnected ? (
                <button
                  type="button"
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 shadow-xs active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{isConnecting ? 'Connecting...' : 'Connect'}</span>
                  <span className="hidden sm:inline">Wallet</span>
                </button>
              ) : isWrongNetwork ? (
                <button
                  type="button"
                  onClick={switchToSepolia}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-100 border border-amber-300 hover:bg-amber-200 transition cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[11px] sm:text-xs">Switch to Sepolia</span>
                </button>
              ) : (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowWalletDetails(!showWalletDetails)}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 transition-all duration-200 shadow-2xs cursor-pointer"
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${isAuthorized ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                    <span className="font-mono text-[11px]">{formatAddress(account)}</span>
                    <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 bg-neutral-100 text-neutral-600 border border-neutral-200">
                      Sepolia
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {showWalletDetails && (
                    <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white border border-neutral-200 shadow-xl p-3 z-50 text-xs animate-fade-in">
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

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 md:hidden cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white/95 backdrop-blur-md px-4 py-4 space-y-3 shadow-lg animate-fade-in">
            {isLandingPage ? (
              <div className="flex flex-col space-y-1">
                <a
                  href="#what-is-certifa"
                  onClick={(e) => handleScrollTo(e, 'what-is-certifa')}
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition rounded"
                >
                  What is Certifa?
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleScrollTo(e, 'how-it-works')}
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition rounded"
                >
                  How It Works
                </a>
                <a
                  href="#why-certifa"
                  onClick={(e) => handleScrollTo(e, 'why-certifa')}
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition rounded"
                >
                  Why Certifa?
                </a>
                <div className="pt-2 border-t border-neutral-100 grid grid-cols-2 gap-2">
                  <Link
                    to="/issue"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center px-3 py-2.5 bg-neutral-900 text-white font-medium text-xs hover:bg-neutral-800 transition"
                  >
                    Issue Certificate
                  </Link>
                  <Link
                    to="/verify"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center px-3 py-2.5 bg-white border border-neutral-300 text-neutral-800 font-medium text-xs hover:bg-neutral-50 transition"
                  >
                    Verify Certificate
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-1">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition rounded"
                >
                  Home
                </Link>
                <Link
                  to="/issue"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium transition rounded ${location.pathname === '/issue' ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'}`}
                >
                  Issue Certificate
                </Link>
                <Link
                  to="/verify"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium transition rounded ${location.pathname === '/verify' ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'}`}
                >
                  Verify Certificate
                </Link>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
}
