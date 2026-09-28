import { Link } from 'react-router-dom';
import ethereumSepoliaBadge from '../assets/ethereum-sepolia-badge.png';
import ipfsBadge from '../assets/ipfs-badge.svg';
import certifaLogo from '../assets/logo-certifa.svg';
import { ExternalLink, Code } from 'lucide-react';
import { DOCS_URL } from '../config/contract';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200/80 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <img src={certifaLogo} alt="Certifa Logo" className="w-7 h-7 object-contain" />
              <span className="font-bold text-lg text-neutral-900 tracking-tight">Certifa</span>
            </div>
            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
              Your simple space to issue and verify authentic certificates. Permissioned issuance, public verification powered by Ethereum Sepolia and IPFS.
            </p>

            {/* Trust / Ecosystem Badges Section */}
            <div className="pt-2 flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-700 text-[11px] font-medium">
                <img src={ethereumSepoliaBadge} alt="Ethereum Sepolia" className="w-4 h-4 opacity-80" />
                <span>Ethereum Sepolia</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-700 text-[11px] font-medium">
                <img src={ipfsBadge} alt="IPFS Storage" className="w-4 h-4 opacity-80" />
                <span>IPFS Storage</span>
              </div>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div className="text-left">
            <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="text-neutral-500 hover:text-neutral-900 transition">Features</Link></li>
              <li><Link to="/issue" className="text-neutral-500 hover:text-neutral-900 transition">Issue Certificate</Link></li>
              <li><Link to="/verify" className="text-neutral-500 hover:text-neutral-900 transition">Public Verification</Link></li>
              <li><a href="#how-it-works" className="text-neutral-500 hover:text-neutral-900 transition">How It Works</a></li>
              <li><a href="#technologies" className="text-neutral-500 hover:text-neutral-900 transition">Technologies</a></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="text-left">
            <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-4">Architecture</h4>
            <ul className="space-y-2.5 text-xs">
              <li><span className="text-neutral-500">Smart Contract</span></li>
              <li><span className="text-neutral-500">Pinata IPFS Pinning</span></li>
              <li><span className="text-neutral-500">SHA-256 Hash Registry</span></li>
              <li><span className="text-neutral-500">QR Gateway</span></li>
            </ul>
          </div>

          {/* Nav Col 3 */}
          <div className="text-left">
            <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://sepolia.etherscan.io"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900 transition"
                >
                  Sepolia Explorer <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={DOCS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900 transition"
                >
                  Official Docs <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/whyu27"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900 transition"
                >
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} Certifa Protocol. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-600 transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-600 transition cursor-pointer">Terms of Service</span>
            <div className="flex items-center gap-2 text-neutral-600">
              <Code className="w-4 h-4 hover:text-neutral-900 transition cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
