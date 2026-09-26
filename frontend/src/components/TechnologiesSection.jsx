import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, Cpu, ShieldCheck, Database, Code2, Globe } from 'lucide-react';

// Import Assets
import certifaLogo from '../assets/logo-certifa.svg';
import ethereumSvg from '../assets/tech/ethereum.svg';
import soliditySvg from '../assets/tech/solidity.svg';
import ipfsSvg from '../assets/tech/ipfs.svg';
import viemSvg from '../assets/tech/viem.svg';
import wagmiSvg from '../assets/tech/wagmi.svg';
import reactSvg from '../assets/tech/react.svg';
import typescriptSvg from '../assets/tech/typescript.svg';
import tailwindSvg from '../assets/tech/tailwind.svg';

const technologies = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    tag: 'Layer 1 & Sepolia',
    category: 'blockchain',
    categoryLabel: 'Blockchain & Consensus',
    icon: ethereumSvg,
    shortDesc: 'Consensus & Immutable Registry',
    description: 'Anchors certificate issuance, revocation states, and cryptographic verification hashes on the Ethereum Sepolia testnet with decentralized finality.',
    features: ['EVM Compatible', 'Tamper-Proof Records', 'Sepolia Testnet'],
    docUrl: 'https://ethereum.org',
  },
  {
    id: 'solidity',
    name: 'Solidity',
    tag: 'Smart Contracts',
    category: 'blockchain',
    categoryLabel: 'Blockchain & Consensus',
    icon: soliditySvg,
    shortDesc: 'Permissioned Issuance Logic',
    description: 'Powers Certifa’s core registry smart contract with role-based access control (RBAC), permissioned issuer management, and gas-efficient state validation.',
    features: ['RBAC Access Control', 'On-Chain Verification', 'Gas Optimized'],
    docUrl: 'https://soliditylang.org',
  },
  {
    id: 'ipfs',
    name: 'IPFS',
    tag: 'Decentralized Storage',
    category: 'storage',
    categoryLabel: 'Storage & Frontend',
    icon: ipfsSvg,
    shortDesc: 'Content-Addressed Storage',
    description: 'Stores immutable certificate metadata and PDF files using cryptographic Content Identifiers (CIDs), eliminating single points of failure.',
    features: ['Decentralized P2P', 'CID Cryptographic Hashes', 'Zero Single Point of Failure'],
    docUrl: 'https://ipfs.tech',
  },
  {
    id: 'viem',
    name: 'Viem',
    tag: 'EVM Interface',
    category: 'blockchain',
    categoryLabel: 'Blockchain & Consensus',
    icon: viemSvg,
    shortDesc: 'Type-Safe RPC Client',
    description: 'Provides ultra-fast, lightweight, and type-safe blockchain primitives for RPC communications, gas estimation, and low-level EVM interactions.',
    features: ['Type-Safe Primitives', 'Ultra Lightweight', 'Fast Contract Calls'],
    docUrl: 'https://viem.sh',
  },
  {
    id: 'wagmi',
    name: 'Wagmi',
    tag: 'Web3 Hooks',
    category: 'blockchain',
    categoryLabel: 'Blockchain & Consensus',
    icon: wagmiSvg,
    shortDesc: 'Reactive Wallet & Contract State',
    description: 'Provides modular React hooks for Web3 wallet connection, multi-chain switching, transaction simulation, and asynchronous state caching.',
    features: ['React 19 Ready', 'Auto-Reconnect', 'Reactive State Cache'],
    docUrl: 'https://wagmi.sh',
  },
  {
    id: 'react',
    name: 'React 19',
    tag: 'UI Framework',
    category: 'storage',
    categoryLabel: 'Storage & Frontend',
    icon: reactSvg,
    shortDesc: 'Component Architecture',
    description: 'Drives the modern, responsive interface for certificate issuing workflows, dynamic verification previews, and real-time validation states.',
    features: ['Component-Driven UI', 'Fast Rendering', 'Interactive QR Engine'],
    docUrl: 'https://react.dev',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    tag: 'Type Safety',
    category: 'storage',
    categoryLabel: 'Storage & Frontend',
    icon: typescriptSvg,
    shortDesc: 'End-to-End Type Safety',
    description: 'Ensures strict type checking across contract ABIs, IPFS metadata schemas, and client state pipelines to prevent runtime regressions.',
    features: ['Strict Type Checking', 'Typed Contract ABIs', 'Zero Runtime Errors'],
    docUrl: 'https://www.typescriptlang.org',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    tag: 'Design System',
    category: 'storage',
    categoryLabel: 'Storage & Frontend',
    icon: tailwindSvg,
    shortDesc: 'Utility-First Styling',
    description: 'Enables high-performance, minimalist UI styling with responsive layouts, fluid typography, and clean monochrome visual accents.',
    features: ['Utility-First CSS', 'Responsive Grid', 'Modern Monochrome Design'],
    docUrl: 'https://tailwindcss.com',
  },
];

// Arc Geometry Calculations
// Semicircular arc with 8 nodes from 195 deg to 345 deg (span = 150 deg)
const CENTER_X = 600;
const CENTER_Y = 540;
const RADIUS = 430;
const START_ANGLE = 195;
const END_ANGLE = 345;

export default function TechnologiesSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTechId, setSelectedTechId] = useState('ethereum');
  const [isPaused, setIsPaused] = useState(false);

  // Compute node coordinates along the arc
  const arcNodes = useMemo(() => {
    const total = technologies.length;
    return technologies.map((tech, index) => {
      const angleDeg = START_ANGLE + (index * (END_ANGLE - START_ANGLE)) / (total - 1);
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = CENTER_X + RADIUS * Math.cos(angleRad);
      const y = CENTER_Y + RADIUS * Math.sin(angleRad);
      const leftPercent = (x / 1200) * 100;
      const topPercent = (y / 600) * 100;

      // Quadratic curve control point for ray
      const midY = (CENTER_Y + y) / 2 + 10;
      const rayPath = `M ${CENTER_X},${CENTER_Y} Q ${CENTER_X},${midY} ${x.toFixed(1)},${y.toFixed(1)}`;

      return {
        ...tech,
        index,
        x,
        y,
        leftPercent,
        topPercent,
        rayPath,
      };
    });
  }, []);

  // Filtered list based on active category
  const activeList = useMemo(() => {
    if (activeCategory === 'all') return arcNodes;
    return arcNodes.filter((t) => t.category === activeCategory);
  }, [activeCategory, arcNodes]);

  // Auto-switch technology logo every 5 seconds (5000ms)
  useEffect(() => {
    if (isPaused || activeList.length === 0) return;

    const interval = setInterval(() => {
      setSelectedTechId((currentId) => {
        const currentIndex = activeList.findIndex((t) => t.id === currentId);
        const nextIndex = (currentIndex + 1) % activeList.length;
        return activeList[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, activeList]);

  const selectedTech = arcNodes.find((t) => t.id === selectedTechId) || arcNodes[0];

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'all') return;
    const firstMatch = arcNodes.find((t) => t.category === category);
    if (firstMatch) {
      setSelectedTechId(firstMatch.id);
    }
  };

  return (
    <section id="technologies" className="relative w-full bg-white py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-neutral-100">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">

        {/* SECTION HEADER */}
        <div className="flex flex-col items-start max-w-3xl">
          {/* Skewed Badge with Certifa Logo */}
          <span
            className="inline-flex w-fit items-center gap-2 border bg-white px-5 py-2 text-xs font-medium tracking-wide shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            style={{
              borderColor: 'rgba(0,0,0,0.08)',
              color: '#0A0A0A',
              transform: 'skewX(-14deg)',
            }}
          >
            <span className="inline-flex items-center gap-2" style={{ transform: 'skewX(14deg)' }}>
              <img
                src={certifaLogo}
                alt="Certifa Logo"
                className="h-4 w-4 object-contain"
              />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-900">
                Technologies
              </span>
              <span className="h-3 w-px bg-neutral-200" aria-hidden="true" />
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                Decentralized Architecture
              </span>
            </span>
          </span>

          {/* Section Heading */}
          <h2
            className="font-display mt-5 text-3xl font-semibold sm:mt-6 sm:text-5xl md:text-6xl text-neutral-900"
            style={{ letterSpacing: '-0.025em', lineHeight: 1.06 }}
          >
            Powered by proven <br />
            <span className="text-neutral-900 font-bold">blockchain technologies.</span>
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-sm leading-relaxed sm:text-base text-neutral-500 font-sans">
            Every node on the arc represents a foundational pillar of Certifa. From cryptographic smart contracts to distributed IPFS storage, explore how each technology secures authentic credentials.
          </p>
        </div>

        {/* INTERACTIVE ARC DIAGRAM STAGE */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative mx-auto mt-10 sm:mt-14 w-full max-w-5xl aspect-[2/1] min-h-[360px] sm:min-h-[460px] lg:min-h-[520px]"
        >

          {/* SVG Arc & Ray Vector Canvas */}
          <svg
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              {/* Radial Glow at Hub Base */}
              <radialGradient id="certifa-tech-glow" cx="50%" cy="92%" r="55%">
                <stop offset="0%" stopColor="rgba(0, 0, 0, 0.08)" />
                <stop offset="60%" stopColor="rgba(0, 0, 0, 0.02)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
              </radialGradient>

              {/* Active Ray Glow Filter */}
              <filter id="ray-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Glow Area */}
            <circle cx={CENTER_X} cy={CENTER_Y} r="410" fill="url(#certifa-tech-glow)" />

            {/* Inner Concentric Guide Arcs */}
            <path
              d={`M 260,${CENTER_Y} A 340,340 0 0,1 940,${CENTER_Y}`}
              stroke="rgba(0,0,0,0.04)"
              strokeWidth="1"
              strokeDasharray="3 4"
              fill="none"
            />
            <path
              d={`M 360,${CENTER_Y} A 240,240 0 0,1 840,${CENTER_Y}`}
              stroke="rgba(0,0,0,0.03)"
              strokeWidth="1"
              strokeDasharray="2 3"
              fill="none"
            />

            {/* Main Outer Connecting Arc */}
            <path
              d={`M ${arcNodes[0].x.toFixed(1)},${arcNodes[0].y.toFixed(1)} A ${RADIUS},${RADIUS} 0 0,1 ${arcNodes[arcNodes.length - 1].x.toFixed(1)},${arcNodes[arcNodes.length - 1].y.toFixed(1)}`}
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
            />

            {/* Connecting Ray Lines from Center Hub to Each Node */}
            {arcNodes.map((node) => {
              const isSelected = selectedTechId === node.id;
              const isDimmed = activeCategory !== 'all' && node.category !== activeCategory;

              return (
                <g key={`ray-${node.id}`}>
                  <path
                    d={node.rayPath}
                    stroke={
                      isSelected
                        ? '#0A0A0A'
                        : isDimmed
                          ? 'rgba(0,0,0,0.02)'
                          : 'rgba(0,0,0,0.07)'
                    }
                    strokeWidth={isSelected ? '2' : '1'}
                    strokeDasharray={isSelected ? 'none' : '3 3'}
                    fill="none"
                    className="transition-all duration-300"
                  />
                  {isSelected && (
                    <path
                      d={node.rayPath}
                      stroke="rgba(0,0,0,0.2)"
                      strokeWidth="6"
                      fill="none"
                      filter="url(#ray-glow)"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* ABSOLUTELY POSITIONED INTERACTIVE NODES */}
          <div className="absolute inset-0">
            {arcNodes.map((node) => {
              const isSelected = selectedTechId === node.id;
              const isDimmed = activeCategory !== 'all' && node.category !== activeCategory;

              return (
                <div
                  key={node.id}
                  className="absolute transition-transform duration-300"
                  style={{
                    left: `${node.leftPercent}%`,
                    top: `${node.topPercent}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isSelected ? 30 : 20,
                  }}
                >
                  <div className="relative flex flex-col items-center group">
                    {/* Tooltip Label over Node */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.span
                          initial={{ opacity: 0, y: 6, scale: 0.9 }}
                          animate={{ opacity: 1, y: -8, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-full mb-1 whitespace-nowrap rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-mono font-medium text-white shadow-md pointer-events-none"
                        >
                          {node.name}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Interactive Node Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedTechId(node.id)}
                      aria-label={`Select ${node.name}`}
                      className={`relative flex h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 cursor-pointer items-center justify-center rounded-full border transition-all duration-300 ${isSelected
                        ? 'border-neutral-900 bg-white shadow-xl scale-110 ring-4 ring-neutral-900/10'
                        : isDimmed
                          ? 'border-neutral-200/50 bg-white/60 opacity-40 hover:opacity-100 hover:scale-105'
                          : 'border-neutral-200 bg-white shadow-xs hover:border-neutral-800 hover:scale-110 hover:shadow-md'
                        }`}
                    >
                      {/* Active Pulse Wave */}
                      {isSelected && (
                        <span className="absolute inset-0 rounded-full bg-neutral-900/10 animate-ping" />
                      )}

                      {/* Tech Icon SVG */}
                      <img
                        src={node.icon}
                        alt={node.name}
                        className={`h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 object-contain transition-transform duration-200 ${isSelected ? 'scale-110' : 'group-hover:scale-110'
                          }`}
                      />
                    </button>

                    {/* Subtitle / Name under Node for larger screens */}
                    <span
                      className={`mt-2 font-mono text-[10px] tracking-wider uppercase transition-colors hidden sm:block ${isSelected
                        ? 'text-neutral-900 font-semibold'
                        : isDimmed
                          ? 'text-neutral-300'
                          : 'text-neutral-500 group-hover:text-neutral-900'
                        }`}
                    >
                      {node.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTER BASE HUB WITH CERTIFA LOGO */}
          <div className="absolute left-1/2 bottom-[12%] -translate-x-1/2 translate-y-1/2 flex flex-col items-center pointer-events-auto z-30">
            {/* Center Hub Outer Ring */}
            <div className="relative flex items-center justify-center">
              <div className="absolute h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-neutral-900/5 animate-pulse" />
              <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 border-neutral-900 bg-white shadow-xl">
                <img
                  src={certifaLogo}
                  alt="Certifa Center Hub"
                  className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
                />
              </div>
            </div>
            <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] font-semibold text-neutral-900">
              Certifa Core
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
