"use client";

import { motion } from "framer-motion";
import { useTemplate3 } from "@/templates/template3/context";

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.7" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const wedding = useTemplate3();
  return (
    <footer className="w-full bg-[#F8F4EA] text-[#30352B]">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[1100px] px-6 py-12 sm:px-8 sm:py-15 lg:px-10 lg:py-18"
      >
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#59674D]/25 sm:w-12" />

          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.28em] text-[#59674D]/70">
            Until forever
          </span>

          <span className="h-px w-8 bg-[#59674D]/25 sm:w-12" />
        </div>

        <div className="mt-8 flex flex-col items-center text-center sm:mt-10">
          <h2 className="font-script text-[3.2rem] leading-[0.9] text-[#30352B] sm:text-[3.8rem]">
            {wedding.couple.joined}
          </h2>

          <p className="mt-3 max-w-[300px] font-sans text-[10px] leading-relaxed text-[#30352B]/60 sm:max-w-none sm:text-[11px]">
            {wedding.footer.message}
          </p>
        </div>

        <div className="mx-auto my-9 max-w-[760px] border-t border-[#30352B]/10 sm:my-11" />

        <div className="flex flex-col items-center text-center">
          <p className="font-sans text-[9px] font-medium uppercase tracking-[0.24em] text-[#30352B]/50">
            Website crafted by
          </p>

          <p className="mt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#30352B] sm:text-[12px]">
            Wyvernstack
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <a
              href={wedding.footer.studioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[9px] tracking-[0.05em] text-[#59674D]/75 transition-colors duration-300 hover:text-[#A87E8E] sm:text-[10px]"
            >
              wyvernstack.com
            </a>

            <span className="h-1 w-1 rounded-full bg-[#A87E8E]/45" />

            <a
              href={wedding.footer.studioInstagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Wyvernstack on Instagram"
              className="inline-flex min-h-9 items-center gap-1.5 font-mono text-[9px] tracking-[0.05em] text-[#59674D]/75 transition-colors duration-300 hover:text-[#A87E8E] sm:text-[10px]"
            >
              <InstagramIcon size={13} />
              @wyvernstack
            </a>
          </div>
        </div>

        <div className="mx-auto mt-9 max-w-[760px] border-t border-[#30352B]/8 sm:mt-11" />

        <div className="mt-6 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between">
          <p className="font-sans text-[9px] tracking-[0.06em] text-[#30352B]/45 sm:text-[10px]">
            {wedding.footer.copyright}
          </p>

          <p className="font-sans text-[9px] uppercase tracking-[0.14em] text-[#30352B]/35 sm:text-[10px]">
            {wedding.footer.closing}
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
