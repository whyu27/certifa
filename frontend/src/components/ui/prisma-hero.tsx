import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-section.jpg";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] text-emerald-400">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

interface PrismaHeroProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

const PrismaHero = ({
  title = "Certifa",
  description = "Certifa is a worldwide network for tamper-proof certificate issuance, instant QR verification, and decentralized IPFS storage on Ethereum Sepolia.",
  ctaText = "Issue Certificate",
  ctaLink = "/issue",
}: PrismaHeroProps) => {
  return (
    <section className="h-[85vh] min-h-[600px] max-h-[900px] w-full p-2 sm:p-4">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] shadow-2xl">

        {/* Background image requested by user */}
        <img
          src={heroBg}
          alt="Certifa Hero Background"
          className="absolute inset-0 h-full w-full object-cover object-center scale-105 transition-transform duration-1000"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.6] mix-blend-overlay" />

        {/* Gradient overlay for contrast */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/80" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 sm:px-8 md:px-12 lg:pb-12">
          <div className="grid grid-cols-12 items-end gap-6">

            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-display font-bold leading-[0.85] tracking-tight text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] xl:text-[15vw] drop-shadow-md select-none"
                style={{ color: "#E1E0CC" }}
              >
                <WordsPullUp text={title} showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-6 pb-2 lg:col-span-4 lg:pb-4">

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs text-[#E1E0CC]/80 sm:text-sm md:text-base font-sans tracking-wide leading-relaxed font-light backdrop-blur-xs p-1 rounded-lg"
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3"
              >
                <Link
                  to={ctaLink}
                  className="group inline-flex items-center gap-3 self-start rounded-full bg-[#E1E0CC] py-1.5 pl-6 pr-1.5 text-sm font-semibold text-neutral-950 transition-all hover:bg-white hover:gap-4 hover:shadow-lg sm:text-base"
                >
                  {ctaText}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4" style={{ color: "#E1E0CC" }} />
                  </span>
                </Link>

                <Link
                  to="/verify"
                  className="inline-flex items-center px-5 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs sm:text-sm font-medium text-[#E1E0CC] hover:bg-white/20 transition-all"
                >
                  Verify Document
                </Link>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
