import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PrismaHero } from '@/components/ui/prisma-hero';
import ethereumSepoliaBadge from '../assets/ethereum-sepolia-badge.png';
import ipfsBadge from '../assets/ipfs-badge.svg';

export default function Home() {
  const [activeTab, setActiveTab] = useState('preview');
  const [sampleCertId, setSampleCertId] = useState('CERT-2026-8F92A1');

  return (
    <div className="space-y-12 pb-12">
      {/* HERO SECTION */}
      <PrismaHero />

      {/* TRUST BADGES BAR (Ref1 style) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
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

      {/* FEATURE SECTION 1 ("How Certifa Works" - Seamless Background with Column Dividers) */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Main Title Header */}
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
            How Certifa Works
          </h2>
          <p className="text-base sm:text-lg font-semibold text-neutral-700">
            From certificate to verification.
          </p>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-xl">
            Certifa turns every certificate into a verifiable digital credential through a simple three-step process.
          </p>
        </div>

        {/* Grid Container with Top Horizontal Line & Column Dividers */}
        <div className="relative">
          {/* Top Horizontal Dividers Line behind Badges */}
          <div className="absolute top-9 left-0 right-0 h-px border-b border-dashed border-neutral-200 hidden md:block z-0" />

          {/* 3 Columns Grid with Vertical Dividers */}
          <div className="grid grid-cols-1 md:grid-cols-3 relative z-10">
            {/* --- STEP 01 (Highlighted Column Fill) --- */}
            <div className="flex flex-col justify-between bg-[#fafafa] border-b md:border-b-0 md:border-r border-neutral-200/80 pb-0 md:pb-0">
              {/* Step Badge & Text Block */}
              <div className="p-6 sm:p-8 sm:space-y-6">
                {/* Badge */}
                <div>
                  <span className="inline-block px-4 py-1.5 bg-black text-white text-xs font-semibold shadow-xs">
                    Step 1
                  </span>
                  {/* Image Container (Game UI SVG Asset from OwnaFarm) */}
                  <div className="px-6">
                    <div className="w-full h-48 sm:h-48 flex flex-col items-center justify-center p-3 text-center overflow-hidden">
                      <div className="w-full h-full max-w-[180px] max-h-[115px] flex items-center justify-center relative">
                        <svg viewBox="0 0 120 100" className="w-full h-full text-neutral-800" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="20" y="22" width="80" height="56" rx="14" fill="#ffffff" stroke="#7b7979ff" strokeWidth="1" />
                          <circle cx="38" cy="50" r="3" fill="#ffffff" stroke="#7b7979ff" />
                          <circle cx="48" cy="50" r="3" fill="#ffffff" stroke="#7b7979ff" />
                          <line x1="33" y1="50" x2="53" y2="50" stroke="#7b7979ff" strokeWidth="2.2" />
                          <circle cx="76" cy="44" r="3.5" fill="#ffffff" stroke="#7b7979ff" />
                          <circle cx="84" cy="56" r="3.5" fill="#ffffff" stroke="#7b7979ff" />
                          <path d="M 60 78 L 60 90" strokeDasharray="2 3" stroke="#a3a3a3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-neutral-900">
                    Create a certificate.
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    Authorized issuers connect their wallet, upload a certificate, and provide the recipient details.
                  </p>
                </div>
              </div>
            </div>

            {/* --- STEP 02 --- */}
            <div className="flex flex-col justify-between bg-[#fafafa] border-b md:border-b-0 md:border-r border-neutral-200/80 pb-6 md:pb-0">
              {/* Step Badge & Text Block */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Badge */}
                <div>
                  <span className="inline-block px-4 py-1.5 bg-[#f0f0f2] text-neutral-700 text-xs font-medium border border-neutral-200/60">
                    Step 2
                  </span>
                  {/* Step 2 Visual Container */}
                  <div className="px-6">
                    <div className="w-full h-48 sm:h-48 flex flex-col items-center justify-center p-3 text-center overflow-hidden">
                      <div className="w-full h-full max-w-[180px] max-h-[115px] flex items-center justify-center relative">
                        <svg viewBox="0 0 120 100" className="w-full h-full text-neutral-800" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          {/* Certificate Document */}
                          <path d="M 32 18 L 78 18 L 88 28 L 88 84 L 32 84 Z" fill="#ffffff" stroke="#7b7979ff" strokeWidth="1" />
                          <path d="M 78 18 L 78 28 L 88 28" stroke="#7b7979ff" strokeWidth="1" />
                          {/* Document Lines */}
                          <line x1="42" y1="36" x2="70" y2="36" stroke="#7b7979ff" strokeWidth="1" />
                          <line x1="42" y1="46" x2="65" y2="46" stroke="#7b7979ff" strokeWidth="1" />
                          {/* Mini QR Code */}
                          <rect x="62" y="60" width="18" height="18" rx="2" fill="#ffffff" stroke="#7b7979ff" strokeWidth="1.2" />
                          <rect x="66" y="64" width="4" height="4" fill="#7b7979ff" />
                          <rect x="72" y="70" width="4" height="4" fill="#7b7979ff" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-neutral-900">
                    Make it verifiable.
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    Certifa adds a unique QR code, stores the certificate on IPFS, and registers its proof on the blockchain.
                  </p>
                </div>
              </div>
            </div>

            {/* --- STEP 03 --- */}
            <div className="flex flex-col justify-between bg-[#fafafa] pb-6 md:pb-0">
              {/* Step Badge & Text Block */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Badge */}
                <div>
                  <span className="inline-block px-4 py-1.5 bg-[#f0f0f2] text-neutral-700 text-xs font-medium border border-neutral-200/60">
                    Step 3
                  </span>
                  {/* Step 3 Visual Container */}
                  <div className="px-6">
                    <div className="w-full h-48 sm:h-48 flex flex-col items-center justify-center p-3 text-center overflow-hidden">
                      <div className="w-full h-full max-w-[180px] max-h-[115px] flex items-center justify-center relative">
                        <svg viewBox="0 0 120 100" className="w-full h-full text-neutral-800" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          {/* Verification Shield */}
                          <path d="M 60 20 L 84 30 V 54 C 84 70 60 82 60 82 C 60 82 36 70 36 54 V 30 Z" fill="#ffffff" stroke="#7b7979ff" strokeWidth="1" />
                          {/* Verified Checkmark */}
                          <path d="M 48 50 L 56 58 L 72 42" stroke="#7b7979ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-neutral-900">
                    Verify in seconds.
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    Scan the QR code or enter the Certificate ID to verify the certificate. No account. No wallet required.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE SECTION 2 ("Why Certifa?" - Split List Layout matching why-choose-us image) */}
      <section id="why-certifa" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
            Why Certifa?
          </h2>
          <p className="text-base sm:text-lg font-semibold text-neutral-700">
            Because a certificate should be more than just a PDF.
          </p>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-xl">
            Certifa adds verifiable proof to every certificate, making credentials easier to issue, share, and verify.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* LEFT COLUMN: Balanced Aspect Ratio Visual */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative mx-auto flex aspect-[4/5] min-h-[460px] w-full max-w-[400px] items-center justify-center overflow-hidden rounded-3xl border border-black/10 bg-[#FAFAF7] sm:max-w-[440px] lg:ml-0 lg:mr-auto">
              {/* Matrix Binary Pattern Background */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-5 py-6 font-mono text-[11px] leading-[1.35] tracking-[0.05em] text-[#C9C9C0]" aria-hidden="true">
                <span className="block whitespace-nowrap opacity-50">1001100100100100101001000100100100100110010100100100100</span>
                <span className="block whitespace-nowrap opacity-50">0101010010010111010010010010010100100010010100101010101</span>
                <span className="block whitespace-nowrap opacity-50">1011010010010110100101010100111010010010010100101010010</span>
                <span className="block whitespace-nowrap opacity-50">0010010010010100100110100011101001001010110100100001001</span>
                <span className="block whitespace-nowrap opacity-50">1010011010010100011010001001110100010100010010010110001</span>
                <span className="block whitespace-nowrap opacity-50">0111001010101010100100010010001001000111010010101100100</span>
                <span className="block whitespace-nowrap opacity-50">0100110100100100011010100100101110010100100100101010100</span>
                <span className="block whitespace-nowrap opacity-50">1100101010010100100100110100100100100100100100101100100</span>
              </div>

              {/* Scan Light Glow Bar */}
              <span className="pointer-events-none absolute inset-x-6 h-12 rounded-full bg-gradient-to-b from-black/0 via-black/10 to-black/0 blur-md opacity-40" aria-hidden="true" />

              {/* Isometric Certificate Verification SVG */}
              <svg viewBox="0 0 400 400" width="82%" height="82%" fill="none" className="relative" aria-hidden="true">
                <title>Certifa tamper-evident verification illustration</title>
                <g stroke="#0A0A0A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  {/* Background Paper Document (RWA Invoice style with CERTIFICATE label) */}
                  <g transform="translate(130, 45) scale(2.2)">
                    {/* Paper Sheet Outline */}
                    <path d="M 32 18 L 78 18 L 88 28 L 88 84 L 32 84 Z" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 78 18 L 78 28 L 88 28" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Certificate Text Label */}
                    <text x="56" y="35" textAnchor="middle" fontSize="6" fontWeight="700" fill="#0A0A0A" stroke="none" letterSpacing="0.05em">CERTIFICATE</text>
                    {/* Document Line Items */}
                    <line x1="42" y1="46" x2="78" y2="46" stroke="#9A9A9A" strokeWidth="1" />
                    <line x1="42" y1="56" x2="78" y2="56" stroke="#9A9A9A" strokeWidth="1" />
                    <line x1="42" y1="66" x2="64" y2="66" stroke="#9A9A9A" strokeWidth="1" />
                  </g>

                  {/* Dashed Ghost Block */}
                  <g stroke="#0A0A0A" strokeDasharray="4 4" strokeWidth="1.4" opacity="0.7">
                    <path d="M 110 180 L 150 180 L 150 220 L 110 220 Z" />
                    <path d="M 150 180 L 165 165 L 165 205 L 150 220" />
                    <path d="M 110 180 L 125 165 L 165 165" />
                  </g>
                </g>

                {/* Foreground Verified Contract Plate */}
                <g style={{ transformOrigin: '170px 257px' }}>
                  <path d="M 95 195 L 215 195 L 245 225 L 245 320 L 125 320 L 95 290 Z" fill="none" stroke="#0A0A0A" strokeWidth="9" strokeLinejoin="round" opacity="0.1" style={{ filter: 'blur(4px)' }} />
                  <path d="M 95 195 L 215 195 L 245 225 L 245 320 L 125 320 L 95 290 Z" fill="#FAFAF7" stroke="#0A0A0A" strokeWidth="3" strokeLinejoin="round" strokeDasharray="520" strokeDashoffset="0" />
                  <path d="M 215 195 L 215 225 L 245 225" stroke="#0A0A0A" strokeWidth="3" fill="none" strokeLinejoin="round" strokeDasharray="520" strokeDashoffset="0" />
                  <path d="M 125 320 L 125 225 L 95 195" stroke="#0A0A0A" strokeWidth="3" fill="none" strokeLinejoin="round" strokeDasharray="520" strokeDashoffset="0" />
                  <path d="M 125 225 L 215 225" stroke="#0A0A0A" strokeWidth="3" fill="none" strokeDasharray="520" strokeDashoffset="0" />
                  <circle cx="180" cy="260" r="20" stroke="#0A0A0A" strokeWidth="2" fill="none" strokeDasharray="130" strokeDashoffset="0" />
                  <path d="M 171 261 L 178 268 L 190 254" stroke="#0A0A0A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="40" strokeDashoffset="0" />
                  <text x="185" y="305" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0A0A0A" letterSpacing="0.06em">CONTRACT</text>
                </g>
              </svg>

              {/* Bottom Labels */}
              <div className="absolute bottom-4 left-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
                Tamper-Proof
              </div>
              <div className="absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                Valid · On-Chain
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Top Main Heading + 4 List Items */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Top Main Heading */}
            <div className="border-t border-neutral-200 pt-6 pb-8">
              <h2 className="text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight leading-snug">
                Built for certificates people can trust.
              </h2>
            </div>

            {/* List Items */}
            <div className="flex flex-col">
              {/* Item 01 */}
              <div className="border-t border-neutral-200 py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                <div className="sm:col-span-5 space-y-1">
                  <span className="text-xs font-mono font-medium text-neutral-400 block">01</span>
                  <span className="text-xs font-semibold text-neutral-500 block uppercase tracking-wider">Tamper-Evident</span>
                  <h4 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                    Protect certificate integrity
                  </h4>
                </div>
                <div className="sm:col-span-7 pt-1">
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    Each certificate is registered with a unique cryptographic hash, making unauthorized changes detectable.
                  </p>
                </div>
              </div>

              {/* Item 02 */}
              <div className="border-t border-neutral-200 py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                <div className="sm:col-span-5 space-y-1">
                  <span className="text-xs font-mono font-medium text-neutral-400 block">02</span>
                  <span className="text-xs font-semibold text-neutral-500 block uppercase tracking-wider">Instant Verification</span>
                  <h4 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                    Verify in seconds
                  </h4>
                </div>
                <div className="sm:col-span-7 pt-1">
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    Scan a QR code or enter a Certificate ID to instantly verify a certificate without creating an account.
                  </p>
                </div>
              </div>

              {/* Item 03 */}
              <div className="border-t border-neutral-200 py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                <div className="sm:col-span-5 space-y-1">
                  <span className="text-xs font-mono font-medium text-neutral-400 block">03</span>
                  <span className="text-xs font-semibold text-neutral-500 block uppercase tracking-wider">Blockchain-Backed</span>
                  <h4 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                    A record you can verify
                  </h4>
                </div>
                <div className="sm:col-span-7 pt-1">
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    Certificate records are anchored on the blockchain, providing a transparent and independently verifiable proof.
                  </p>
                </div>
              </div>

              {/* Item 04 */}
              <div className="border-t border-neutral-200 py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                <div className="sm:col-span-5 space-y-1">
                  <span className="text-xs font-mono font-medium text-neutral-400 block">04</span>
                  <span className="text-xs font-semibold text-neutral-500 block uppercase tracking-wider">Simple by Design</span>
                  <h4 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                    No friction for verification
                  </h4>
                </div>
                <div className="sm:col-span-7 pt-1">
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    Issuers can create verifiable certificates through a simple workflow, while anyone can verify them without a wallet.
                  </p>
                </div>
              </div>

              {/* Bottom Border */}
              <div className="border-t border-neutral-200" />
            </div>
          </div>

        </div>
      </section>

      {/* BOTTOM CTA BANNER ("How You Take Notes?" equivalent) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-100 p-8 sm:p-12 border border-neutral-200/80 text-center space-y-6 relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            How You Issue Certificates?
          </h2>
          <p className="text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
            Start issuing tamper-proof certificates on Ethereum Sepolia. Connect your wallet and manage credentials effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/issue"
              className="px-6 py-3 bg-neutral-900 text-white font-medium text-xs sm:text-sm hover:bg-neutral-800 transition shadow-sm"
            >
              Launch App
            </Link>
            <Link
              to="/verify"
              className="px-6 py-3 bg-white border border-neutral-300 text-neutral-800 font-medium text-xs sm:text-sm hover:bg-neutral-50 transition"
            >
              Certifa Docs &gt;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
