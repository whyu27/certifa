import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-section.jpg";
import { DOCS_URL } from "@/config/contract";

interface PrismaHeroProps {
  brandName?: string;
  badgeText?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export const PrismaHero = ({
  titleLine1 = "Certificates. Integrity. Verification.",
  titleLine2 = "On-chain when trust matters.",
  description = "Combine certificate issuance, tamper evident hashing, and instant QR verification in one blockchain backed registry ready whenever trust matters.",
  primaryCtaText = "Launch App",
  primaryCtaLink = "/issue",
  secondaryCtaText = "Certifa Docs",
  secondaryCtaLink = DOCS_URL,
}: PrismaHeroProps) => {
  const isExternalSecondary = secondaryCtaLink.startsWith("http");

  return (
    <section className="w-full mx-auto px-3 sm:px-4 pt-2">
      <div className="relative w-full overflow-hidden bg-[#f4f4f5] border border-neutral-200/80 shadow-xs text-neutral-900">

        {/* Main Hero Header Text */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-2 text-center">
          {/* Main Headline */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.12] sm:leading-[1.08] mb-4"
          >
            {titleLine1} <br className="hidden sm:inline" />
            <span className="text-neutral-900">{titleLine2}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans max-w-xl mx-auto text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8 font-normal px-2"
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-xs sm:max-w-none mx-auto"
          >
            <Link
              to={primaryCtaLink}
              className="w-full sm:w-auto px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition shadow-md text-center"
            >
              {primaryCtaText}
            </Link>

            {isExternalSecondary ? (
              <a
                href={secondaryCtaLink}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300/80 text-xs sm:text-sm font-semibold transition shadow-xs flex items-center justify-center gap-1.5"
              >
                {secondaryCtaText} <span className="text-neutral-400">&gt;</span>
              </a>
            ) : (
              <Link
                to={secondaryCtaLink}
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300/80 text-xs sm:text-sm font-semibold transition shadow-xs flex items-center justify-center gap-1.5"
              >
                {secondaryCtaText} <span className="text-neutral-400">&gt;</span>
              </Link>
            )}
          </motion.div>
        </div>

        {/* Bottom Background Image (hero-section.jpg) with Mist/Cloud Fog Effect */}
        <div className="relative w-full h-[180px] xs:h-[220px] sm:h-[300px] md:h-[380px] overflow-hidden">
          {/* Top Gradient Blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f4f4f5] via-[#f4f4f5]/20 to-transparent z-10 pointer-events-none h-16 sm:h-20" />

          <img
            src={heroBg}
            alt="Certifa Hero Background"
            className="w-full h-full object-cover object-bottom"
          />

          {/* LAYER 1: Volumetric Ambient Fog Glow (Soft radial clouds) */}
          <div className="absolute -bottom-10 -left-12 w-3/5 h-40 bg-white/70 rounded-full blur-3xl pointer-events-none z-10" />
          <div className="absolute -bottom-12 left-1/4 w-3/5 h-44 bg-white/85 rounded-full blur-3xl pointer-events-none z-10" />
          <div className="absolute -bottom-10 -right-12 w-3/5 h-40 bg-white/75 rounded-full blur-3xl pointer-events-none z-10" />

          {/* LAYER 2: Organic Cloud / Mist Wave Silhouette SVG */}
          <div className="absolute bottom-0 inset-x-0 z-15 pointer-events-none overflow-hidden leading-none">
            <svg
              viewBox="0 0 1440 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-16 sm:h-24 md:h-32 text-white"
              preserveAspectRatio="none"
            >
              {/* Back Cloud Layer */}
              <path
                d="M0 180V100C120 70 240 110 360 85C480 60 600 95 720 75C840 55 960 100 1080 80C1200 60 1320 90 1440 75V180H0Z"
                fill="currentColor"
                fillOpacity="0.45"
              />
              {/* Mid Cloud Layer */}
              <path
                d="M0 180V115C100 95 220 130 340 110C460 90 580 120 700 105C820 90 940 125 1060 110C1180 95 1300 115 1440 105V180H0Z"
                fill="currentColor"
                fillOpacity="0.7"
              />
              {/* Foreground Cloud Layer */}
              <path
                d="M0 180V135C140 110 260 145 380 130C500 115 620 140 740 125C860 110 980 135 1100 125C1220 115 1340 130 1440 120V180H0Z"
                fill="currentColor"
                fillOpacity="0.95"
              />
            </svg>
          </div>

          {/* LAYER 3: Smooth Bottom Mist Gradient to pure white */}
          <div className="absolute bottom-0 inset-x-0 h-16 sm:h-24 md:h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-3 bg-white z-20 pointer-events-none" />
        </div>

      </div>
    </section>
  );
};