import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PrismaHero } from '@/components/ui/prisma-hero';

const stackLayers = [
  {
    id: 0,
    layerTag: 'L4',
    leftTitle: 'CERTIFICATE',
    rightTitle: 'DIGITAL CERTIFICATE',
    subtitle: 'Certificate with a unique ID and QR code.',
    zHeight: 90,
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 1,
    layerTag: 'L3',
    leftTitle: 'HASH',
    rightTitle: 'CERTIFICATE INTEGRITY',
    subtitle: 'A cryptographic fingerprint that makes changes detectable.',
    zHeight: 60,
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <line x1="10" y1="3" x2="8" y2="21" />
        <line x1="16" y1="3" x2="14" y2="21" />
      </svg>
    ),
  },
  {
    id: 2,
    layerTag: 'L2',
    leftTitle: 'IPFS STORAGE',
    rightTitle: 'DECENTRALIZED STORAGE',
    subtitle: 'The final certificate is stored on IPFS.',
    zHeight: 30,
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 3,
    layerTag: 'L1',
    leftTitle: 'BLOCKCHAIN',
    rightTitle: 'ON-CHAIN VERIFICATION',
    subtitle: 'A blockchain record provides independent proof of authenticity.',
    zHeight: 0,
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('preview');
  const [sampleCertId, setSampleCertId] = useState('CERT-2026-8F92A1');
  const [activeLayer, setActiveLayer] = useState(0);
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="pb-12">
      {/* HERO SECTION */}
      <PrismaHero />

      {/* WHAT IS CERTIFA (3D Stack Interactive Section) */}
      <section id="what-is-certifa" className="relative overflow-hidden bg-white pt-6 pb-16 sm:pt-10 sm:pb-24-24 lg:pt-12 lg:pb-32 lg:pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          {/* TOP HEADER */}
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              {/* Skewed Badge */}
              <span
                className="inline-flex w-fit items-center gap-2 border bg-white/80 px-5 py-2 text-xs font-medium tracking-wide shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-md"
                style={{
                  borderColor: 'rgba(0,0,0,0.08)',
                  color: '#0A0A0A',
                  transform: 'skewX(-14deg)',
                }}
              >
                <span className="inline-flex items-center gap-2" style={{ transform: 'skewX(14deg)' }}>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 text-neutral-900"
                  >
                    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
                    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
                    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
                  </svg>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-900">
                    What is Certifa?
                  </span>
                </span>
              </span>

              {/* Title */}
              <h2
                className="font-display mt-5 text-3xl font-semibold sm:mt-6 sm:text-5xl md:text-6xl text-neutral-900"
                style={{ letterSpacing: '-0.025em', lineHeight: 1.08 }}
              >
                A modern certificate platform with built-in blockchain.
              </h2>
            </div>

            {/* Description */}
            <p className="font-sans max-w-md text-sm leading-relaxed sm:text-base text-neutral-500">
              Certifa turns traditional certificates into verifiable digital credentials. Certificates are securely stored, cryptographically secured, and registered on-chain creating a simple and trustworthy way to verify credentials.
            </p>
          </div>

          {/* 3D INTERACTIVE STACK SECTION */}
          <div className="mt-12 grid items-center gap-8 sm:mt-16 lg:mt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_minmax(0,0.9fr)] lg:gap-14">

            {/* LEFT LIST (Desktop) */}
            <ul className="relative z-10 hidden flex-col gap-7 self-center lg:flex">
              {stackLayers.map((layer) => {
                const isActive = activeLayer === layer.id;
                return (
                  <li key={layer.id}>
                    <button
                      type="button"
                      onClick={() => setActiveLayer(layer.id)}
                      className="group flex w-full cursor-pointer items-center justify-end gap-3 text-right transition-colors"
                    >
                      <span
                        className="font-mono text-xs uppercase tracking-[0.18em] transition-colors"
                        style={{
                          color: isActive ? '#0A0A0A' : '#A3A3A3',
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {layer.leftTitle}
                      </span>
                      <span
                        className="h-px transition-all duration-300"
                        style={{
                          backgroundColor: isActive ? '#0A0A0A' : 'rgba(0,0,0,0.12)',
                          width: isActive ? '2.5rem' : '1.25rem',
                        }}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* CENTER 3D STAGE */}
            <div
              className="relative mx-auto h-80 w-full max-w-[520px] sm:h-[420px] lg:h-[480px]"
              style={{ perspective: '1800px', perspectiveOrigin: '50% 85%' }}
            >
              <div
                className="relative h-full w-full"
                style={{
                  transform: 'rotateX(58deg) rotateZ(-22deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {stackLayers.map((layer) => {
                  const isActive = activeLayer === layer.id;
                  const baseZ = (stackLayers.length - 1 - layer.id) * 28;
                  const zPosition = isActive ? 115 : baseZ;

                  return (
                    <div
                      key={layer.id}
                      className="absolute transition-all duration-500 ease-out"
                      style={{
                        left: '50%',
                        top: '50%',
                        width: '78%',
                        height: '58%',
                        transform: `translate(-50%, -50%) translateZ(${zPosition}px)`,
                        transformStyle: 'preserve-3d',
                        zIndex: isActive ? 50 : 10 - layer.id,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveLayer(layer.id)}
                        className="relative block h-full w-full cursor-pointer rounded-2xl border-2 transition-all duration-300"
                        style={{
                          backgroundColor: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                          borderColor: isActive ? '#0A0A0A' : 'rgba(0,0,0,0.1)',
                          boxShadow: isActive
                            ? '0 22px 45px rgba(0, 0, 0, 0.16)'
                            : '0 2px 8px rgba(0,0,0,0.03)',
                          backdropFilter: 'blur(2px)',
                        }}
                        aria-label={layer.rightTitle}
                      >
                        {/* Gradient Overlay */}
                        <div
                          className="absolute inset-0 rounded-2xl transition-opacity duration-400"
                          style={{
                            opacity: isActive ? 0.08 : 0,
                            backgroundImage: 'linear-gradient(135deg, #000000 0%, transparent 60%)',
                          }}
                        />

                        {/* Header with Icon & Tag */}
                        <div className="absolute inset-4 flex items-start justify-between">
                          <span
                            className="flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-300"
                            style={{
                              backgroundColor: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
                              borderColor: isActive ? '#0A0A0A' : 'rgba(0,0,0,0.12)',
                              color: isActive ? '#0A0A0A' : '#737373',
                            }}
                          >
                            {layer.icon}
                          </span>
                          <span
                            className="font-mono text-[9px] uppercase tracking-[0.2em] transition-colors"
                            style={{
                              color: isActive ? '#0A0A0A' : '#737373',
                              fontWeight: isActive ? 700 : 500,
                            }}
                          >
                            {layer.layerTag}
                          </span>
                        </div>

                        {/* Bottom Progress Bar & Dot */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                          <span
                            className="flex h-1.5 flex-1 rounded-full transition-colors"
                            style={{
                              backgroundColor: isActive ? '#0A0A0A' : 'rgba(0,0,0,0.08)',
                            }}
                          />
                          <span
                            className="flex h-1.5 w-1.5 rounded-full transition-colors"
                            style={{
                              backgroundColor: isActive ? '#0A0A0A' : 'rgba(0,0,0,0.12)',
                            }}
                          />
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT LIST (Desktop) */}
            <ul className="hidden flex-col gap-7 self-center lg:flex">
              {stackLayers.map((layer) => {
                const isActive = activeLayer === layer.id;
                return (
                  <li key={layer.id}>
                    <button
                      type="button"
                      onClick={() => setActiveLayer(layer.id)}
                      className="flex w-full cursor-pointer items-center gap-3 text-left transition-colors"
                    >
                      <span
                        className="h-px transition-all duration-300"
                        style={{
                          backgroundColor: isActive ? '#0A0A0A' : 'rgba(0,0,0,0.12)',
                          width: isActive ? '2.5rem' : '1.25rem',
                        }}
                        aria-hidden="true"
                      />
                      <div className="flex flex-col">
                        <span
                          className="font-mono text-xs uppercase tracking-[0.18em] transition-colors"
                          style={{
                            color: isActive ? '#0A0A0A' : '#A3A3A3',
                            fontWeight: isActive ? 600 : 400,
                          }}
                        >
                          {layer.rightTitle}
                        </span>
                        {isActive && (
                          <span className="text-[11px] text-neutral-500 font-sans tracking-normal mt-0.5 max-w-xs transition-opacity animate-fade-in">
                            {layer.subtitle}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* MOBILE VIEW SELECTOR */}
            <div className="flex flex-col items-center gap-4 text-center lg:hidden">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-900 font-medium">
                Layer {stackLayers[activeLayer].layerTag} · 0{activeLayer + 1} / 04
              </span>
              <h3 className="font-display text-2xl font-semibold sm:text-3xl text-neutral-900 tracking-tight">
                {stackLayers[activeLayer].rightTitle}
              </h3>
              <p className="font-sans max-w-xs text-sm leading-relaxed text-neutral-500">
                {stackLayers[activeLayer].subtitle}
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                {stackLayers.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setActiveLayer(l.id)}
                    className="h-1.5 cursor-pointer rounded-full transition-all duration-300"
                    style={{
                      width: activeLayer === l.id ? '24px' : '8px',
                      backgroundColor: activeLayer === l.id ? '#0A0A0A' : 'rgba(0,0,0,0.12)',
                    }}
                    aria-label={`Show ${l.rightTitle}`}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FEATURE SECTION 1 ("How Certifa Works" - Seamless Background with Column Dividers) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-5 sm:px-8 py-30 space-y-10">
        {/* Main Title Header */}
        <div className="max-w-2xl space-y-4">
          {/* Skewed Badge */}
          <span
            className="inline-flex w-fit items-center gap-2 border bg-white/80 px-5 py-2 text-xs font-medium tracking-wide shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-md"
            style={{
              borderColor: 'rgba(0,0,0,0.08)',
              color: '#0A0A0A',
              transform: 'skewX(-14deg)',
            }}
          >
            <span className="inline-flex items-center gap-2" style={{ transform: 'skewX(14deg)' }}>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 text-neutral-900"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-900">
                How Certifa Works
              </span>
            </span>
          </span>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
            From certificate to verification.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-xl">
            Certifa turns every certificate into a verifiable digital credential through a simple three-step process.
          </p>
        </div>

        {/* Grid Container with Top Horizontal Line & Column Dividers */}
        <div className="relative">
          {/* 3 Columns Grid with Vertical Dividers */}
          <div className="grid grid-cols-1 md:grid-cols-3 relative z-10">
            {/* Top Horizontal Connecting Line behind Badges (Desktop/Tablet) */}
            <div className="absolute top-[38px] sm:top-[46px] left-6 right-6 sm:left-10 sm:right-10 h-px border-b border-dashed border-neutral-300 hidden md:block z-10 pointer-events-none" />

            {/* --- STEP 01 --- */}
            <div
              onClick={() => setActiveStep(1)}
              className={`group flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200/80 pb-0 md:pb-0 cursor-pointer transition-all duration-300 ${
                activeStep === 1 ? 'bg-[#f5f5f5]' : 'bg-[#fafafa] hover:bg-[#f5f5f5]'
              }`}
            >
              {/* Step Badge & Text Block */}
              <div className="p-6 sm:p-8 sm:space-y-6">
                {/* Badge */}
                <div>
                  <span
                    className={`font-mono relative z-20 inline-block px-4 py-1.5 text-xs transition-all duration-300 ${
                      activeStep === 1
                        ? 'bg-black text-white font-semibold shadow-xs scale-105'
                        : 'bg-[#f0f0f2] text-neutral-600 hover:text-neutral-900 border border-neutral-200/60 font-medium'
                    }`}
                  >
                    Step 1
                  </span>
                  {/* Image Container */}
                  <div className="px-6">
                    <div className="w-full h-48 sm:h-48 flex flex-col items-center justify-center p-3 text-center overflow-hidden">
                      <div className="w-full h-full max-w-[180px] max-h-[115px] flex items-center justify-center relative">
                        <svg viewBox="0 0 120 100" className="w-full h-full transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="20" y="22" width="80" height="56" rx="14" fill="#ffffff" stroke={activeStep === 1 ? "#0A0A0A" : "#9ca3af"} strokeWidth={activeStep === 1 ? "1.6" : "1"} />
                          <circle cx="38" cy="50" r="3" fill="#ffffff" stroke={activeStep === 1 ? "#0A0A0A" : "#9ca3af"} strokeWidth={activeStep === 1 ? "1.6" : "1"} />
                          <circle cx="48" cy="50" r="3" fill="#ffffff" stroke={activeStep === 1 ? "#0A0A0A" : "#9ca3af"} strokeWidth={activeStep === 1 ? "1.6" : "1"} />
                          <line x1="33" y1="50" x2="53" y2="50" stroke={activeStep === 1 ? "#0A0A0A" : "#9ca3af"} strokeWidth={activeStep === 1 ? "2.6" : "2"} />
                          <circle cx="76" cy="44" r="3.5" fill="#ffffff" stroke={activeStep === 1 ? "#0A0A0A" : "#9ca3af"} strokeWidth={activeStep === 1 ? "1.6" : "1"} />
                          <circle cx="84" cy="56" r="3.5" fill="#ffffff" stroke={activeStep === 1 ? "#0A0A0A" : "#9ca3af"} strokeWidth={activeStep === 1 ? "1.6" : "1"} />
                          <path d="M 60 78 L 60 90" strokeDasharray="2 3" stroke={activeStep === 1 ? "#0A0A0A" : "#d1d5db"} />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className={`font-display text-lg font-bold transition-colors ${activeStep === 1 ? 'text-neutral-900' : 'text-neutral-700'}`}>
                    Create a certificate.
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    Authorized issuers connect their wallet, upload a certificate, and provide the recipient details.
                  </p>
                </div>
              </div>
            </div>

            {/* --- STEP 02 --- */}
            <div
              onClick={() => setActiveStep(2)}
              className={`group flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200/80 pb-6 md:pb-0 cursor-pointer transition-all duration-300 ${
                activeStep === 2 ? 'bg-[#f5f5f5]' : 'bg-[#fafafa] hover:bg-[#f5f5f5]'
              }`}
            >
              {/* Step Badge & Text Block */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Badge */}
                <div>
                  <span
                    className={`font-mono relative z-20 inline-block px-4 py-1.5 text-xs transition-all duration-300 ${
                      activeStep === 2
                        ? 'bg-black text-white font-semibold shadow-xs scale-105'
                        : 'bg-[#f0f0f2] text-neutral-600 hover:text-neutral-900 border border-neutral-200/60 font-medium'
                    }`}
                  >
                    Step 2
                  </span>
                  {/* Step 2 Visual Container */}
                  <div className="px-6">
                    <div className="w-full h-48 sm:h-48 flex flex-col items-center justify-center p-3 text-center overflow-hidden">
                      <div className="w-full h-full max-w-[180px] max-h-[115px] flex items-center justify-center relative">
                        <svg viewBox="0 0 120 100" className="w-full h-full transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          {/* Certificate Document */}
                          <path d="M 32 18 L 78 18 L 88 28 L 88 84 L 32 84 Z" fill="#ffffff" stroke={activeStep === 2 ? "#0A0A0A" : "#9ca3af"} strokeWidth={activeStep === 2 ? "1.6" : "1"} />
                          <path d="M 78 18 L 78 28 L 88 28" stroke={activeStep === 2 ? "#0A0A0A" : "#9ca3af"} strokeWidth="1" />
                          {/* Document Lines */}
                          <line x1="42" y1="36" x2="70" y2="36" stroke={activeStep === 2 ? "#0A0A0A" : "#9ca3af"} strokeWidth={activeStep === 2 ? "1.4" : "1"} />
                          <line x1="42" y1="46" x2="65" y2="46" stroke={activeStep === 2 ? "#0A0A0A" : "#9ca3af"} strokeWidth={activeStep === 2 ? "1.4" : "1"} />
                          {/* Mini QR Code */}
                          <rect x="62" y="60" width="18" height="18" rx="2" fill="#ffffff" stroke={activeStep === 2 ? "#0A0A0A" : "#9ca3af"} strokeWidth={activeStep === 2 ? "1.6" : "1.2"} />
                          <rect x="66" y="64" width="4" height="4" fill={activeStep === 2 ? "#0A0A0A" : "#9ca3af"} />
                          <rect x="72" y="70" width="4" height="4" fill={activeStep === 2 ? "#0A0A0A" : "#9ca3af"} />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className={`font-display text-lg font-bold transition-colors ${activeStep === 2 ? 'text-neutral-900' : 'text-neutral-700'}`}>
                    Make it verifiable.
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    Certifa adds a unique QR code, stores the certificate on IPFS, and registers its proof on the blockchain.
                  </p>
                </div>
              </div>
            </div>

            {/* --- STEP 03 --- */}
            <div
              onClick={() => setActiveStep(3)}
              className={`group flex flex-col justify-between pb-6 md:pb-0 cursor-pointer transition-all duration-300 ${
                activeStep === 3 ? 'bg-[#f5f5f5]' : 'bg-[#fafafa] hover:bg-[#f5f5f5]'
              }`}
            >
              {/* Step Badge & Text Block */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Badge */}
                <div>
                  <span
                    className={`font-mono relative z-20 inline-block px-4 py-1.5 text-xs transition-all duration-300 ${
                      activeStep === 3
                        ? 'bg-black text-white font-semibold shadow-xs scale-105'
                        : 'bg-[#f0f0f2] text-neutral-600 hover:text-neutral-900 border border-neutral-200/60 font-medium'
                    }`}
                  >
                    Step 3
                  </span>
                  {/* Step 3 Visual Container */}
                  <div className="px-6">
                    <div className="w-full h-48 sm:h-48 flex flex-col items-center justify-center p-3 text-center overflow-hidden">
                      <div className="w-full h-full max-w-[180px] max-h-[115px] flex items-center justify-center relative">
                        <svg viewBox="0 0 120 100" className="w-full h-full transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          {/* Verification Shield */}
                          <path d="M 60 20 L 84 30 V 54 C 84 70 60 82 60 82 C 60 82 36 70 36 54 V 30 Z" fill="#ffffff" stroke={activeStep === 3 ? "#0A0A0A" : "#9ca3af"} strokeWidth={activeStep === 3 ? "1.6" : "1"} />
                          {/* Verified Checkmark */}
                          <path d="M 48 50 L 56 58 L 72 42" stroke={activeStep === 3 ? "#0A0A0A" : "#9ca3af"} strokeWidth={activeStep === 3 ? "2.6" : "1.8"} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className={`font-display text-lg font-bold transition-colors ${activeStep === 3 ? 'text-neutral-900' : 'text-neutral-700'}`}>
                    Verify in seconds.
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    Scan the QR code or enter the Certificate ID to verify the certificate. No account. No wallet required.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE SECTION 2 ("Why Certifa?" - Split List Layout matching why-choose-us image) */}
      <section id="why-certifa" className="w-full bg-white py-30">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
          <div className="max-w-2xl space-y-4">
            {/* Skewed Badge */}
            <span
              className="inline-flex w-fit items-center gap-2 border bg-white/80 px-5 py-2 text-xs font-medium tracking-wide shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-md"
              style={{
                borderColor: 'rgba(0,0,0,0.08)',
                color: '#0A0A0A',
                transform: 'skewX(-14deg)',
              }}
            >
              <span className="inline-flex items-center gap-2" style={{ transform: 'skewX(14deg)' }}>
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2.2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 text-neutral-900"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-900">
                  Why Certifa?
                </span>
              </span>
            </span>

            <h2 className="font-display text-3xl sm:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
              Because a certificate should be more than just a PDF.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-xl">
              Certifa adds verifiable proof to every certificate, making credentials easier to issue, share, and verify.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* LEFT COLUMN: Balanced Aspect Ratio Visual */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="relative mx-auto flex aspect-[4/5] min-h-[460px] w-full max-w-[400px] items-center justify-center overflow-hidden rounded-3xl border border-black/10 bg-[#FAFAF7] sm:max-w-[440px] lg:ml-0 lg:mr-auto">
                {/* Matrix Binary Pattern Background with subtle opacity animation */}
                <motion.div
                  className="pointer-events-none absolute inset-0 flex flex-col justify-between px-5 py-6 font-mono text-[11px] leading-[1.35] tracking-[0.05em] text-[#C9C9C0]"
                  animate={{ opacity: [0.35, 0.65, 0.35] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                >
                  <span className="block whitespace-nowrap opacity-50">1001100100100100101001000100100100100110010100100100100</span>
                  <span className="block whitespace-nowrap opacity-50">01010100100101110100100100100101001000100101001001010101</span>
                  <span className="block whitespace-nowrap opacity-50">1011010010010110100101010100111010010010010100101010010</span>
                  <span className="block whitespace-nowrap opacity-50">0010010010010100100110100011101001001010110100100001001</span>
                  <span className="block whitespace-nowrap opacity-50">1010011010010100011010001001110100010100010010010110001</span>
                  <span className="block whitespace-nowrap opacity-50">0111001010101010100100010010001001000111010010101100100</span>
                  <span className="block whitespace-nowrap opacity-50">0100110100100100011010100100101110010100100100101010100</span>
                  <span className="block whitespace-nowrap opacity-50">1100101010010100100100110100100100100100100100101100100</span>
                </motion.div>

                {/* Scanning Laser Beam Effect */}
                <motion.div
                  className="pointer-events-none absolute inset-x-4 h-16 rounded-full bg-gradient-to-b from-black/0 via-black/10 to-black/0 blur-md z-20"
                  animate={{
                    top: ['8%', '78%', '8%'],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  aria-hidden="true"
                />
                <motion.div
                  className="pointer-events-none absolute inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-neutral-900/30 to-transparent z-20"
                  animate={{
                    top: ['10%', '80%', '10%'],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  aria-hidden="true"
                />

                {/* Isometric Certificate Verification SVG with Floating Parallax */}
                <svg viewBox="0 0 400 400" width="82%" height="82%" fill="none" className="relative z-10" aria-hidden="true">
                  <title>Certifa tamper-evident verification illustration</title>

                  {/* Floating Certificate Paper Document */}
                  <motion.g
                    stroke="#0A0A0A"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{
                      y: [0, -7, 0],
                    }}
                    transition={{
                      duration: 4.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <g transform="translate(130, 45) scale(2.2)">
                      <path d="M 32 18 L 78 18 L 88 28 L 88 84 L 32 84 Z" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M 78 18 L 78 28 L 88 28" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <text x="56" y="35" textAnchor="middle" fontSize="6" fontWeight="700" fill="#0A0A0A" stroke="none" letterSpacing="0.05em">CERTIFICATE</text>
                      <line x1="42" y1="46" x2="78" y2="46" stroke="#9A9A9A" strokeWidth="1" />
                      <line x1="42" y1="56" x2="78" y2="56" stroke="#9A9A9A" strokeWidth="1" />
                      <line x1="42" y1="66" x2="64" y2="66" stroke="#9A9A9A" strokeWidth="1" />
                    </g>

                    {/* Dashed Ghost Block */}
                    <motion.g
                      stroke="#0A0A0A"
                      strokeDasharray="4 4"
                      strokeWidth="1.4"
                      animate={{
                        opacity: [0.45, 0.8, 0.45],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <path d="M 110 180 L 150 180 L 150 220 L 110 220 Z" />
                      <path d="M 150 180 L 165 165 L 165 205 L 150 220" />
                      <path d="M 110 180 L 125 165 L 165 165" />
                    </motion.g>
                  </motion.g>

                  {/* Foreground Verified Contract Plate with Floating Parallax */}
                  <motion.g
                    style={{ transformOrigin: '170px 257px' }}
                    animate={{
                      y: [0, 6, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.2,
                    }}
                  >
                    <path d="M 95 195 L 215 195 L 245 225 L 245 320 L 125 320 L 95 290 Z" fill="none" stroke="#0A0A0A" strokeWidth="9" strokeLinejoin="round" opacity="0.1" style={{ filter: 'blur(4px)' }} />
                    <path d="M 95 195 L 215 195 L 245 225 L 245 320 L 125 320 L 95 290 Z" fill="#FAFAF7" stroke="#0A0A0A" strokeWidth="3" strokeLinejoin="round" strokeDasharray="520" strokeDashoffset="0" />
                    <path d="M 215 195 L 215 225 L 245 225" stroke="#0A0A0A" strokeWidth="3" fill="none" strokeLinejoin="round" strokeDasharray="520" strokeDashoffset="0" />
                    <path d="M 125 320 L 125 225 L 95 195" stroke="#0A0A0A" strokeWidth="3" fill="none" strokeLinejoin="round" strokeDasharray="520" strokeDashoffset="0" />
                    <path d="M 125 225 L 215 225" stroke="#0A0A0A" strokeWidth="3" fill="none" strokeDasharray="520" strokeDashoffset="0" />
                    <circle cx="180" cy="260" r="20" stroke="#0A0A0A" strokeWidth="2" fill="none" strokeDasharray="130" strokeDashoffset="0" />
                    <path d="M 171 261 L 178 268 L 190 254" stroke="#0A0A0A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="40" strokeDashoffset="0" />
                    <text x="185" y="305" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0A0A0A" letterSpacing="0.06em">CONTRACT</text>
                  </motion.g>
                </svg>

                {/* Bottom Labels */}
                <div className="absolute bottom-4 left-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 z-20">
                  <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
                  Tamper-Proof
                </div>
                <div className="absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 z-20">
                  Valid · On-Chain
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Top Main Heading + 4 List Items */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Top Main Heading */}
              <div className="border-t border-neutral-200 pt-6 pb-8">
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight leading-snug">
                  Built for certificates people can trust.
                </h2>
              </div>

              {/* List Items */}
              <div className="flex flex-col">
                {/* Item 01 */}
                <div className="border-t border-neutral-200 py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                  <div className="sm:col-span-5 space-y-1">
                    <span className="text-xs font-mono font-medium text-neutral-400 block">01</span>
                    <span className="text-xs font-mono font-semibold text-neutral-500 block uppercase tracking-wider">Tamper-Evident</span>
                    <h4 className="font-display text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                      Protect certificate integrity
                    </h4>
                  </div>
                  <div className="sm:col-span-7 pt-1">
                    <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">
                      Each certificate is registered with a unique cryptographic hash, making unauthorized changes detectable.
                    </p>
                  </div>
                </div>

                {/* Item 02 */}
                <div className="border-t border-neutral-200 py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                  <div className="sm:col-span-5 space-y-1">
                    <span className="text-xs font-mono font-medium text-neutral-400 block">02</span>
                    <span className="text-xs font-mono font-semibold text-neutral-500 block uppercase tracking-wider">Instant Verification</span>
                    <h4 className="font-display text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                      Verify in seconds
                    </h4>
                  </div>
                  <div className="sm:col-span-7 pt-1">
                    <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">
                      Scan a QR code or enter a Certificate ID to instantly verify a certificate without creating an account.
                    </p>
                  </div>
                </div>

                {/* Item 03 */}
                <div className="border-t border-neutral-200 py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                  <div className="sm:col-span-5 space-y-1">
                    <span className="text-xs font-mono font-medium text-neutral-400 block">03</span>
                    <span className="text-xs font-mono font-semibold text-neutral-500 block uppercase tracking-wider">Blockchain-Backed</span>
                    <h4 className="font-display text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                      A record you can verify
                    </h4>
                  </div>
                  <div className="sm:col-span-7 pt-1">
                    <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">
                      Certificate records are anchored on the blockchain, providing a transparent and independently verifiable proof.
                    </p>
                  </div>
                </div>

                {/* Item 04 */}
                <div className="border-t border-neutral-200 py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                  <div className="sm:col-span-5 space-y-1">
                    <span className="text-xs font-mono font-medium text-neutral-400 block">04</span>
                    <span className="text-xs font-mono font-semibold text-neutral-500 block uppercase tracking-wider">Simple by Design</span>
                    <h4 className="font-display text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                      No friction for verification
                    </h4>
                  </div>
                  <div className="sm:col-span-7 pt-1">
                    <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">
                      Issuers can create verifiable certificates through a simple workflow, while anyone can verify them without a wallet.
                    </p>
                  </div>
                </div>

                {/* Bottom Border */}
                <div className="border-t border-neutral-200" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER ("How You Take Notes?" equivalent) */}
      <section className="max-w-6xl mx-auto px-4 pt-16 sm:px-6">
        <div className="bg-neutral-100 p-8 sm:p-12 border border-neutral-200/80 text-center space-y-6 relative overflow-hidden">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            How You Issue Certificates?
          </h2>
          <p className="font-sans text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
            Start issuing tamper-proof certificates on Ethereum Sepolia. Connect your wallet and manage credentials effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 font-sans">
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
