import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PrismaHero } from '@/components/ui/prisma-hero';
import heroCart from '../assets/hero-cart.png';
import iconIssuance from '../assets/icon-issuance.png';
import iconVerify from '../assets/icon-verify.png';
import iconIpfs from '../assets/icon-ipfs.png';
import iconLedger from '../assets/icon-ledger.png';
import iconVerified from '../assets/icon-status-verified.svg';
import iconRevoked from '../assets/icon-status-revoked.svg';
import iconNotFound from '../assets/icon-status-notfound.svg';
import ethereumSepoliaBadge from '../assets/ethereum-sepolia-badge.png';
import ipfsBadge from '../assets/ipfs-badge.svg';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Search,
  QrCode,
  Sparkles,
  Lock,
  ExternalLink,
  Sliders,
  FileCheck
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('preview');
  const [sampleCertId, setSampleCertId] = useState('CERT-2026-8F92A1');

  return (
    <div className="space-y-12 pb-12">
      {/* HERO SECTION */}
      <PrismaHero />


      {/* HERO SHOWCASE CARD (Inspired by Ref1 main card frame) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-neutral-200/90 shadow-xl shadow-neutral-100 relative overflow-hidden">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span className="text-xs font-mono text-neutral-400 ml-2">certifa.app/verify?id=CERT-2026-8F92A1</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                <img src={iconVerified} alt="Verified" className="w-4 h-4" /> Valid Certificate
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left side preview text */}
            <div className="md:col-span-5 space-y-4 text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-semibold">
                Certificate Preview
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 leading-snug">
                Certified Smart Contract Developer
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Diterbitkan untuk <strong className="text-neutral-800">Alex Morgan</strong> oleh <strong className="text-neutral-800">Ethereum Academy Institute</strong>.
              </p>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-neutral-500">
                  <span>Certificate ID:</span>
                  <span className="text-neutral-900 font-semibold">{sampleCertId}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>IPFS CID:</span>
                  <span className="text-neutral-900 truncate max-w-[140px]">QmXoypizjW3Wkn...</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>SHA-256 Hash:</span>
                  <span className="text-emerald-600 font-semibold truncate max-w-[140px]">0x8f92a17c...</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  to={`/verify?id=${sampleCertId}`}
                  className="px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition inline-flex items-center gap-2"
                >
                  <Search className="w-3.5 h-3.5" /> Verifikasi Sekarang
                </Link>
              </div>
            </div>

            {/* Right side graphic asset */}
            <div className="md:col-span-7 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-3xl blur-xs opacity-50 group-hover:opacity-100 transition duration-300"></div>
                <img
                  src={heroCart}
                  alt="Certifa Certificate Cart Preview"
                  className="relative rounded-2xl border border-neutral-200 shadow-md max-h-[340px] object-cover bg-white p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES BAR (Ref1 style) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 py-6 border-y border-neutral-200/60 text-xs font-medium text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">✓</span> 100% Legal & Cryptographic Compliance
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">⚡</span> 80%+ Reduced Certificate Abuse
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">🛡️</span> Zero Wallet Verification
          </div>
          <div className="flex items-center gap-2">
            <img src={ethereumSepoliaBadge} alt="Ethereum" className="w-4 h-4 opacity-70" />
            <span>Sepolia Network</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={ipfsBadge} alt="IPFS" className="w-4 h-4 opacity-70" />
            <span>IPFS Storage</span>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION 1 ("Notes that work the way you think" equivalent) */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-4 space-y-10">
        <div className="text-left space-y-2 max-w-xl">
          <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">
            Notes that work the way you think.
          </h2>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Certificates shouldn't feel vulnerable or messy. With Certifa, every thought and document flows into an organized, tamper-resistant system that keeps you focused.
          </p>
        </div>

        {/* Workflow Showcase Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-sm space-y-8">
          <div className="flex items-center gap-2 pb-4 border-b border-neutral-100">
            <span className="px-3 py-1 rounded-full bg-neutral-100 text-xs font-mono font-medium text-neutral-700">Style 01</span>
            <span className="text-xs text-neutral-400">↘</span>
            <span className="text-xs font-semibold text-neutral-800">Auto QR & Hash Registration Flow</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center font-bold text-neutral-800 shadow-2xs">
                1
              </div>
              <h4 className="text-base font-semibold text-neutral-900">Original Document</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Issuer mengunggah draf sertifikat PDF atau gambar penerbitan.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center font-bold text-neutral-800 shadow-2xs">
                2
              </div>
              <h4 className="text-base font-semibold text-neutral-900">QR Code Insertion</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Sistem menyisipkan QR Code verifikasi unik langsung pada file sertifikat final.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-emerald-600 font-bold shadow-2xs">
                3
              </div>
              <h4 className="text-base font-semibold text-neutral-900">IPFS & Blockchain Registry</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                File disimpan di IPFS dan SHA-256 Hash didaftarkan di Ethereum Sepolia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID SECTION ("Smarter Notes. One Simple Space..." style) */}
      <section className="max-w-5xl mx-auto px-4 space-y-12">
        <div className="text-left space-y-3 max-w-2xl">
          <div className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-600">
            Earned by users today
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">
            Smarter Notes. One Simple Space to Capture, Organize & Remember
          </h2>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Simplify the way you issue and verify credentials. Capture records in real time, keep authorized control, and let verifiers access data anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs hover:shadow-md transition space-y-4 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 p-2 border border-neutral-200/80 flex items-center justify-center">
                <img src={iconIssuance} alt="Permissioned Issuance" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Permissioned Issuance</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Hanya wallet terotorisasi yang dapat menambahkan registri sertifikat ke smart contract.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-100 text-[11px] font-semibold text-neutral-400">
              Web3 Wallet Auth
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs hover:shadow-md transition space-y-4 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 p-2 border border-neutral-200/80 flex items-center justify-center">
                <img src={iconVerify} alt="Public Verification" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Public Verification</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Penerima dan HR/Verifier dapat memeriksa keabsahan tanpa memerlukan wallet atau akun.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-100 text-[11px] font-semibold text-neutral-400">
              Zero Wallet Needed
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs hover:shadow-md transition space-y-4 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 p-2 border border-neutral-200/80 flex items-center justify-center">
                <img src={iconIpfs} alt="IPFS Storage" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Decentralized IPFS</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                File sertifikat final disimpan terdesentralisasi di IPFS melalui Pinata gateway.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-100 text-[11px] font-semibold text-neutral-400">
              Permanent Storage
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs hover:shadow-md transition space-y-4 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 p-2 border border-neutral-200/80 flex items-center justify-center">
                <img src={iconLedger} alt="Tamper-Proof Ledger" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Tamper-Proof Hash</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Perubahan sekecil apapun pada sertifikat akan langsung mengubah hash file.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-100 text-[11px] font-semibold text-neutral-400">
              Cryptographic Proof
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER ("How You Take Notes?" equivalent) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-neutral-100 rounded-3xl p-8 sm:p-12 border border-neutral-200/80 text-center space-y-6 relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            How You Issue Certificates?
          </h2>
          <p className="text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
            Start issuing tamper-proof certificates on Ethereum Sepolia. Connect your wallet and manage credentials effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/issue"
              className="px-6 py-3 rounded-full bg-neutral-900 text-white font-medium text-xs sm:text-sm hover:bg-neutral-800 transition shadow-sm"
            >
              Get Started Free
            </Link>
            <Link
              to="/verify"
              className="px-6 py-3 rounded-full bg-white border border-neutral-300 text-neutral-800 font-medium text-xs sm:text-sm hover:bg-neutral-50 transition"
            >
              Verify Certificate &gt;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
