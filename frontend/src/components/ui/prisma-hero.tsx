import { motion } from "framer-motion";
import { ArrowDownRight, Play, Sliders, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-section.jpg";

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
  secondaryCtaLink = "/verify",
}: PrismaHeroProps) => {
  return (
    <section className="w-full mx-auto px-2 sm:px-4 pt-2">
      <div className="relative w-full overflow-hidden bg-[#f4f4f5] border border-neutral-200/80 shadow-xs text-neutral-900">

        {/* Top Bar: Brand Logo & Centered Pill Badge */}
        <div className="flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8">
          {/* Right Spacer */}
          <div className="w-16 hidden sm:block"></div>
        </div>

        {/* Main Hero Header Text */}
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-2 text-center">
          {/* Main Headline */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.08] mb-4"
          >
            {titleLine1} <br />
            <span className="text-neutral-900">{titleLine2}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mx-auto text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed mb-8 font-normal"
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
          >
            <Link
              to={primaryCtaLink}
              className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition shadow-md"
            >
              {primaryCtaText}
            </Link>

            <Link
              to={secondaryCtaLink}
              className="px-6 py-3 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300/80 text-xs sm:text-sm font-semibold transition shadow-xs flex items-center gap-1.5"
            >
              {secondaryCtaText} <span className="text-neutral-400">&gt;</span>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Background Image (hero-section.jpg) */}
        <div className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#f4f4f5] via-[#f4f4f5]/20 to-transparent z-10 pointer-events-none h-20" />
          <img
            src={heroBg}
            alt="Certifa Hero Background"
            className="w-full h-full object-cover object-bottom"
          />
        </div>

      </div>
    </section>
  );
};