"use client";

import { WeddingImg } from "@/components/wedding-media";

import { motion } from "framer-motion";
import { useTemplate3 } from "@/templates/template3/context";

const galleryChrome = {
  sectionNumber: "06",
  eyebrow: "A PRIVATE COLLECTION",
  title: "Little moments.",
  subtitle: "The memories we keep close.",
};

function SmallMark() {
  return (
    <span aria-hidden="true" className="relative block h-4 w-4 shrink-0">
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#59674D]/35" />

      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#59674D]/35" />

      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#C8B58A] bg-[#F8F4EA]" />
    </span>
  );
}

function PhotoStrip({
  images,
  side,
}: {
  images: { src: string; alt: string }[];
  side: "left" | "right";
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 32,
        rotate: side === "left" ? -3 : 3,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: side === "left" ? -1 : 1,
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative w-[44vw] max-w-[228px] min-w-0 shrink-0"
    >
      {/* Offset paper layer */}
      <div
        aria-hidden="true"
        className={[
          "absolute inset-0 bg-[#DCD5C6] shadow-[0_22px_45px_-28px_rgba(48,53,43,0.5)]",
          side === "left"
            ? "translate-x-[5px] translate-y-[7px] rotate-[1.2deg]"
            : "-translate-x-[5px] translate-y-[7px] rotate-[-1.2deg]",
        ].join(" ")}
      />

      {/* Main paper */}
      <div className="relative z-10 overflow-hidden bg-[#FFFDF9] px-2 pb-12 pt-2 shadow-[0_22px_48px_-27px_rgba(48,53,43,0.5)] transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:px-2.5 sm:pb-[56px] sm:pt-2.5">
        <div className="space-y-2 sm:space-y-2.5">
          {images.map((image, index) => (
            <div
              key={image.src}
              className="relative overflow-hidden bg-[#E7E2D8]"
            >
              <WeddingImg
                src={image.src}
                alt={image.alt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.012]"
              />

              <span className="pointer-events-none absolute inset-0 border border-black/[0.08]" />
            </div>
          ))}
        </div>

        <div className="relative h-[56px] sm:h-[64px]">
          <span className="absolute bottom-3 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#A87E8E]/70" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const wedding = useTemplate3();
  const galleryDetails = {
    ...galleryChrome,
    strips: wedding.gallery.strips.map((images) => ({ images })),
  };
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative w-full overflow-hidden bg-[#F8F4EA] px-4 py-12 text-[#30352B] sm:px-8 sm:py-16 lg:px-12 lg:py-20"
    >
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[20%] top-[4%] h-[35%] w-[55%] rounded-full bg-[#59674D]/[0.04] blur-[120px]" />

        <div className="absolute -right-[15%] bottom-[10%] h-[30%] w-[50%] rounded-full bg-[#A87E8E]/[0.028] blur-[120px]" />

        <div className="absolute left-1/2 top-[48%] h-[55%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.34] blur-[110px]" />
      </div>

      {/* Subtle paper texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #30352B 0.5px, transparent 0.5px)",
          backgroundSize: "15px 15px",
        }}
      />

      {/* =========================================================
          HEADER
      ========================================================== */}
      <motion.header
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 mx-auto max-w-[820px]"
      >
        {/* Top metadata */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-3.5">
            <span className="h-px w-8 bg-[#59674D]/45 sm:w-12" />

            <span className="font-sans text-[8px] font-bold uppercase tracking-[0.26em] text-[#59674D]/85 sm:text-[9px]">
              {galleryDetails.sectionNumber}
            </span>

            <span className="h-px w-6 bg-[#59674D]/30" />

            <span className="font-display text-[8px] font-semibold tracking-[0.26em] text-[#59674D]/72">
              GALLERY
            </span>
          </div>

          <span className="font-display text-[8px] font-medium tracking-[0.2em] text-[#59674D]/52 sm:text-[9px]">
            A + L / 2026
          </span>
        </div>

        {/* Main heading area */}
        <div className="py-8 sm:py-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 font-sans text-[8px] font-semibold uppercase tracking-[0.3em] text-[#59674D]/75 sm:text-[9px]">
                A collection of us
              </p>

              <h2
                id="gallery-title"
                className="
                  font-display
                  text-[44px]
                  font-medium
                  leading-[0.82]
                  tracking-[-0.055em]
                  text-[#30352B]
                  sm:text-[58px]
                  lg:text-[68px]
                "
              >
                Little
                <br />
                <span className="italic text-[#59674D]">moments.</span>
              </h2>
            </div>

            {/* Desktop subtitle */}
            <div className="hidden pb-1 sm:block">
              <p className="font-script text-[24px] font-medium leading-[0.92] text-[#59674D]/75 lg:text-[28px]">
                the memories
                <br />
                we keep close
              </p>
            </div>
          </div>

          {/* Collection divider */}
          <div className="mt-7 flex items-center gap-3">
            <SmallMark />

            <span className="h-px w-8 bg-[#59674D]/25 sm:w-12" />

            <span className="font-sans text-[7px] font-semibold tracking-[0.28em] text-[#59674D]/58 sm:text-[8px]">
              A PRIVATE COLLECTION
            </span>

            <span className="h-px flex-1 bg-[#59674D]/22" />
          </div>
        </div>
      </motion.header>

      {/* =========================================================
          PHOTO COLLECTION
      ========================================================== */}
      <div className="relative z-10 mx-auto max-w-[620px]">
        <div className="flex items-start justify-center gap-3 sm:gap-6 md:gap-9">
          <PhotoStrip images={galleryDetails.strips[0].images} side="left" />

          <PhotoStrip images={galleryDetails.strips[1].images} side="right" />
        </div>

        {/* Center divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-7 flex max-w-[200px] items-center justify-center gap-3"
        >
          <span className="h-px flex-1 bg-[#59674D]/22" />

          <SmallMark />

          <span className="h-px flex-1 bg-[#59674D]/22" />
        </motion.div>
      </div>

      {/* =========================================================
          FOOTER CAPTION
      ========================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 mx-auto mt-8 max-w-[820px] border-t border-[#59674D]/20 pt-5 sm:mt-9"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A87E8E]/75" />

            <span className="font-sans text-[7px] font-semibold tracking-[0.27em] text-[#59674D]/62 sm:text-[8px]">
              LOYED &amp; ANEENA
            </span>
          </div>

          <span className="font-sans text-[7px] font-semibold tracking-[0.22em] text-[#59674D]/48 sm:text-[8px]">
            22 · 11 · 2026
          </span>
        </div>

        <p className="mt-5 text-center font-script text-[26px] font-medium leading-none text-[#59674D]/76 sm:text-[30px]">
          collected along the way
        </p>
      </motion.div>
    </section>
  );
}
