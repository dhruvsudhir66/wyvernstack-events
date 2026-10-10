"use client";

import { WeddingImg } from "@/components/wedding-media";
import { useTemplate2 } from "@/templates/template2/context";
/* SaveTheDate.tsx
 *
 * Mobile/GPU-safe version.
 * Main goals:
 * - No backdrop-filter on the invitation card.
 * - No SVG feTurbulence grain filter.
 * - No mix-blend-mode.
 * - No large animated blur layers.
 * - No dozens of independently animated Framer Motion nodes.
 * - No mobile detection state that can cause a desktop->mobile re-render flash.
 * - Uses a stable 100svh viewport for Samsung/Android browser UI.
 * - Keeps the invitation card, frame, typography and atmospheric feel.
 */
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMemo, type CSSProperties } from "react";

type Bubble = {
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
};

type FallingElement = {
  left: string;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  rotate: number;
  opacity: number;
};

/* -------------------------------------------------------------
   SMALL ATMOSPHERIC BUBBLES
   Kept intentionally small and limited. They are CSS animated,
   rather than 40+ independent Framer Motion layers.
------------------------------------------------------------- */

const bubbles: Bubble[] = [
  {
    left: "7%",
    top: "18%",
    size: 18,
    delay: 0,
    duration: 15,
    driftX: 16,
    driftY: -28,
  },
  {
    left: "15%",
    top: "43%",
    size: 11,
    delay: 3,
    duration: 17,
    driftX: -12,
    driftY: -24,
  },
  {
    left: "9%",
    top: "72%",
    size: 15,
    delay: 6,
    duration: 18,
    driftX: 18,
    driftY: -32,
  },
  {
    left: "23%",
    top: "12%",
    size: 12,
    delay: 4,
    duration: 19,
    driftX: 14,
    driftY: -25,
  },
  {
    left: "36%",
    top: "22%",
    size: 9,
    delay: 7,
    duration: 16,
    driftX: -10,
    driftY: -22,
  },
  {
    left: "58%",
    top: "14%",
    size: 13,
    delay: 2,
    duration: 18,
    driftX: 13,
    driftY: -27,
  },
  {
    left: "74%",
    top: "20%",
    size: 17,
    delay: 5,
    duration: 16,
    driftX: -16,
    driftY: -30,
  },
  {
    left: "89%",
    top: "32%",
    size: 19,
    delay: 1,
    duration: 17,
    driftX: 15,
    driftY: -25,
  },
  {
    left: "84%",
    top: "63%",
    size: 13,
    delay: 8,
    duration: 19,
    driftX: -13,
    driftY: -31,
  },
  {
    left: "73%",
    top: "82%",
    size: 10,
    delay: 4,
    duration: 18,
    driftX: 12,
    driftY: -26,
  },
  {
    left: "28%",
    top: "76%",
    size: 13,
    delay: 9,
    duration: 20,
    driftX: -14,
    driftY: -29,
  },
  {
    left: "48%",
    top: "86%",
    size: 16,
    delay: 6,
    duration: 17,
    driftX: 15,
    driftY: -25,
  },
];

/* -------------------------------------------------------------
   FALLING ATMOSPHERIC ELEMENTS
------------------------------------------------------------- */

const fallingElements: FallingElement[] = [
  {
    left: "6%",
    size: 9,
    delay: 0,
    duration: 15,
    drift: 20,
    rotate: 30,
    opacity: 0.28,
  },
  {
    left: "18%",
    size: 7,
    delay: 4,
    duration: 18,
    drift: -16,
    rotate: 90,
    opacity: 0.22,
  },
  {
    left: "31%",
    size: 10,
    delay: 7,
    duration: 17,
    drift: 19,
    rotate: 140,
    opacity: 0.25,
  },
  {
    left: "45%",
    size: 7,
    delay: 2,
    duration: 16,
    drift: -14,
    rotate: 210,
    opacity: 0.2,
  },
  {
    left: "58%",
    size: 9,
    delay: 6,
    duration: 18,
    drift: 17,
    rotate: 280,
    opacity: 0.24,
  },
  {
    left: "71%",
    size: 7,
    delay: 9,
    duration: 19,
    drift: -19,
    rotate: 50,
    opacity: 0.2,
  },
  {
    left: "83%",
    size: 10,
    delay: 3,
    duration: 16,
    drift: 15,
    rotate: 170,
    opacity: 0.25,
  },
  {
    left: "94%",
    size: 8,
    delay: 8,
    duration: 18,
    drift: -16,
    rotate: 250,
    opacity: 0.21,
  },
];

/* -------------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------------- */

export default function SaveTheDate({ onOpen }: { onOpen: () => void }) {
  const wedding = useTemplate2();
  const reduceMotion = useReducedMotion();

  /*
   * Stable arrays. Nothing is created/removed when the Samsung
   * browser changes its visual viewport.
   */
  const visibleBubbles = useMemo(() => bubbles, []);
  const visibleFalling = useMemo(() => fallingElements, []);

  return (
    <motion.section
      className="
        save-date-root
        fixed
        inset-0
        z-[100]
        flex
        h-[100svh]
        min-h-[100svh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#eee8df]
        px-2.5
        py-2
        sm:px-4
        sm:py-4
        md:px-6
        md:py-5
      "
      initial={{ opacity: 1 }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              scale: 1.02,
              transition: {
                duration: 0.55,
                ease: [0.76, 0, 0.24, 1],
              },
            }
      }
    >
      {/* -------------------------------------------------------
          STATIC BACKGROUND
          No remote image and no animated backdrop filter.
      ------------------------------------------------------- */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[#eee8df]
        "
      />

      {/* Soft atmospheric lights.
          These are static on purpose. Static radial gradients
          are substantially safer on Android GPU compositors. */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[25%]
          -top-[20%]
          h-[75vw]
          w-[75vw]
          max-h-[700px]
          max-w-[700px]
          rounded-full
          bg-[#d7b3ae]/25
          blur-[70px]
          sm:bg-[#d7b3ae]/32
          sm:blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-[25%]
          -right-[20%]
          h-[70vw]
          w-[70vw]
          max-h-[680px]
          max-w-[680px]
          rounded-full
          bg-[#aeb8a5]/25
          blur-[70px]
          sm:bg-[#aeb8a5]/30
          sm:blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[8%]
          top-[10%]
          h-40
          w-40
          rounded-full
          bg-[#d8b27d]/10
          blur-[55px]
          sm:h-56
          sm:w-56
          sm:blur-[75px]
        "
      />

      {/* Color wash */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[#eee5dc]/65
          mix-blend-normal
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(180deg,rgba(249,244,237,.48)_0%,rgba(238,224,214,.22)_42%,rgba(66,53,46,.20)_100%)]
        "
      />

      {/* Very subtle static light sweep.
          It is intentionally not animated on mobile. */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-25%]
          top-[-20%]
          hidden
          h-[140%]
          w-[16%]
          rotate-[18deg]
          bg-gradient-to-r
          from-transparent
          via-white/[0.06]
          to-transparent
          blur-xl
          md:block
        "
      />

      <style>{`
        .save-date-fall {
          animation: save-date-fall var(--fall-duration) linear var(--fall-delay)
            infinite;
          will-change: transform, opacity;
        }

        .save-date-bubble {
          animation: save-date-bubble var(--bubble-duration) ease-in-out
            var(--bubble-delay) infinite;
          will-change: transform, opacity;
        }

        @keyframes save-date-fall {
          0% {
            transform: translate3d(0, -10vh, 0) rotate(var(--fall-rotate));
            opacity: 0;
          }
          12% {
            opacity: var(--fall-opacity);
          }
          48% {
            transform: translate3d(var(--fall-drift), 52vh, 0)
              rotate(calc(var(--fall-rotate) + 180deg));
            opacity: calc(var(--fall-opacity) * 0.72);
          }
          88% {
            opacity: var(--fall-opacity);
          }
          100% {
            transform: translate3d(0, 112vh, 0)
              rotate(calc(var(--fall-rotate) + 360deg));
            opacity: 0;
          }
        }

        @keyframes save-date-bubble {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.38;
          }
          50% {
            transform: translate3d(var(--bubble-x), var(--bubble-y), 0)
              scale(1.05);
            opacity: 0.68;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .save-date-fall,
          .save-date-bubble {
            animation: none !important;
          }
        }

        @media (max-width: 639px) {
          .save-date-fall {
            animation-duration: calc(var(--fall-duration) + 3s);
          }

          .save-date-secondary-atmosphere {
            display: none;
          }

          .save-date-bubble {
            animation-duration: calc(var(--bubble-duration) + 4s);
          }
        }
      `}</style>

      {/* -------------------------------------------------------
          FALLING ATMOSPHERE
          CSS animation uses transform/opacity only.
      ------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[15]
          overflow-hidden
        "
      >
        {visibleFalling.map((element, index) => (
          <FallingFloral
            key={index}
            {...element}
            reduceMotion={!!reduceMotion}
            index={index}
          />
        ))}
      </div>

      {/* -------------------------------------------------------
          BUBBLES
      ------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[20]
          overflow-hidden
        "
      >
        {visibleBubbles.map((bubble, index) => (
          <FloatingBubble
            key={index}
            {...bubble}
            reduceMotion={!!reduceMotion}
            index={index}
          />
        ))}
      </div>

      {/* -------------------------------------------------------
          INVITATION CARD
      ------------------------------------------------------- */}

      <motion.div
        initial={
          reduceMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                y: 26,
                scale: 0.985,
              }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={
          reduceMotion
            ? { duration: 0.2 }
            : {
                duration: 0.8,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }
        }
        className="
          relative
          z-30
          mx-auto
          flex
          w-full
          max-w-[590px]
          flex-col
          items-center
          overflow-hidden
          border
          border-[#fffaf4]/80
          bg-[#faf6ef]/95
          px-3.5
          py-4
          text-center
          shadow-[0_22px_65px_rgba(67,48,39,.18)]
          sm:px-10
          sm:py-8
          sm:shadow-[0_30px_80px_rgba(67,48,39,.20)]
          max-[380px]:px-3
          max-[380px]:py-3
        "
      >
        {/* Inner frame */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-3
            border
            border-[#b9916c]/35
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-5
            border
            border-[#a9b0a0]/20
          "
        />

        {/* Corner details */}
        <div
          aria-hidden="true"
          className="absolute left-6 top-6 text-[#b68b70]/60"
        >
          ✧
        </div>

        <div
          aria-hidden="true"
          className="absolute right-6 top-6 text-[#b68b70]/60"
        >
          ✧
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-6 left-6 text-[#b68b70]/60"
        >
          ✧
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-6 right-6 text-[#b68b70]/60"
        >
          ✧
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="relative"
        >
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.42em]
              text-[#83736b]
              mt-[10px]
            "
          >
            A new chapter begins
          </p>

          <div className="mx-auto mt-3 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#c9aaa7]" />
            <span className="text-[16px] text-[#b98579]">❀</span>
            <span className="h-px w-9 bg-[#c9aaa7]" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.34,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mt-3
            font-display
            text-[clamp(45px,11vw,100px)]
            leading-[0.8]
            tracking-[-0.065em]
            text-[#39332f]
          "
        >
          Save the
          <br />
          <span className="serif-italic font-light text-[#b87e74]">Date</span>
        </motion.h1>

        {/* Ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.7 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.48, duration: 0.45 }}
          className="mx-auto mt-4 flex items-center justify-center gap-3"
        >
          <span className="h-px w-12 bg-[#c9aaa7]" />
          <span className="text-[#c08b78]">❧</span>
          <span className="h-px w-12 bg-[#c9aaa7]" />
        </motion.div>

        {/* Couple */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.54, duration: 0.5 }}
          className="relative mt-5"
        >
          <p
            className="
              font-display
              text-[25px]
              tracking-[-0.02em]
              text-[#39332f]
              sm:text-[28px]
            "
          >
            {wedding.couple.bride}
            <span className="serif-italic mx-2 text-[#bd897c]">&</span>
            {wedding.couple.groom}
          </p>

          <p
            className="
              mt-1
              text-[9px]
              uppercase
              tracking-[0.34em]
              text-[#82746c]
              sm:text-[10px]
            "
          >
            {wedding.event.displayDate}
          </p>
        </motion.div>

        {/* -----------------------------------------------------
            IMAGE PLACEHOLDER
            The photograph is intentionally commented out.
            The wrapper is also removed, so it cannot leave an
            empty aspect-ratio box that changes card height.
        ----------------------------------------------------- */}

        {/*
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.65 }}
          className="relative mx-auto mt-5 aspect-[4/3] w-full max-w-[425px]"
        >
          <div className="pointer-events-none absolute -inset-2 bg-[#d7b3ae]/15 blur-lg" />

          <div className="relative h-full w-full overflow-hidden">
            <Image
              src="/images/save-date.webp"
              alt="Wedding table setting"
              fill
              priority
              quality={72}
              sizes="(max-width: 640px) calc(100vw - 32px), 425px"
              className="object-cover object-[center_38%]"
            />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_68%,rgba(250,246,239,.08)_82%,rgba(250,246,239,.28)_100%)]" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[10%] bg-gradient-to-t from-[#faf6ef]/10 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[7%] bg-gradient-to-b from-[#faf6ef]/20 to-transparent" />

            <div className="pointer-events-none absolute inset-[9px] border border-white/45" />
            <div className="pointer-events-none absolute inset-[13px] border border-[#ead8cf]/35" />

            <div className="pointer-events-none absolute left-[9px] top-[9px] h-5 w-5 border-l border-t border-white/60" />
            <div className="pointer-events-none absolute right-[9px] top-[9px] h-5 w-5 border-r border-t border-white/60" />
            <div className="pointer-events-none absolute bottom-[9px] left-[9px] h-5 w-5 border-b border-l border-white/60" />
            <div className="pointer-events-none absolute bottom-[9px] right-[9px] h-5 w-5 border-b border-r border-white/60" />
          </div>
        </motion.div>
        */}

        {/* -----------------------------------------------------
            WEDDING PHOTOGRAPH
            Kept static to avoid mobile GPU/compositor glitches.
        ----------------------------------------------------- */}
        <div
          className="
            relative
            mx-auto
            mt-5
            aspect-[4/3]
            w-full
            max-w-[425px]
            overflow-hidden
          "
        >
          <WeddingImg
            src="/images/save-date.webp"
            alt="Wedding table setting"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-[center_38%]"
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(ellipse_at_center,transparent_68%,rgba(250,246,239,.08)_82%,rgba(250,246,239,.28)_100%)]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-[10%]
              bg-gradient-to-t
              from-[#faf6ef]/10
              to-transparent
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-[7%]
              bg-gradient-to-b
              from-[#faf6ef]/20
              to-transparent
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-[9px]
              border
              border-white/45
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-[13px]
              border
              border-[#ead8cf]/35
            "
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[9px] top-[9px] h-5 w-5 border-l border-t border-white/60"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[9px] top-[9px] h-5 w-5 border-r border-t border-white/60"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[9px] left-[9px] h-5 w-5 border-b border-l border-white/60"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[9px] right-[9px] h-5 w-5 border-b border-r border-white/60"
          />
        </div>

        {/* Open invitation */}
        <motion.button
          type="button"
          onClick={onOpen}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.45 }}
          whileHover={reduceMotion ? undefined : { y: -1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.985 }}
          className="
            group
            relative
            mt-6
            inline-flex
            min-h-[40px]
            items-center
            justify-center
            gap-3
            overflow-hidden
            border
            border-[#b88f88]/55
            bg-[#c79a92]
            px-5
            py-[11px]
            text-[8px]
            uppercase
            tracking-[0.24em]
            text-white
            shadow-[0_7px_22px_rgba(130,89,80,.10)]
            transition-colors
            duration-300
            hover:bg-[#bd8d85]
            hover:border-[#aa7d75]/65
            touch-manipulation
            cursor-pointer
          "
        >
          <span className="relative z-10">Open invitation</span>

          <ArrowUpRight
            size={12}
            strokeWidth={1.4}
            className="
              relative
              z-10
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
              group-hover:rotate-45
            "
          />

          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              -translate-x-full
              bg-white/[0.10]
              transition-transform
              duration-500
              group-hover:translate-x-full
            "
          />
        </motion.button>

        {/* Footer ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.82, duration: 0.5 }}
          className="mt-4"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#d0c0b5]" />
            <span className="text-[17px] text-[#b88676]">❀</span>
            <span className="h-px w-8 bg-[#d0c0b5]" />
          </div>

          <p
            className="
              mt-3
              text-[8px]
              uppercase
              tracking-[0.32em]
              text-[#94847b]
              mb-[10px]
            "
          >
            We can&apos;t wait to celebrate with you
          </p>
        </motion.div>
      </motion.div>

      {/* -------------------------------------------------------
          CSS-ONLY FILM GRAIN
          No SVG filter / feTurbulence.
      ------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[60]
          opacity-[0.025]
          bg-[radial-gradient(rgba(255,255,255,.55)_0.5px,transparent_0.5px)]
          [background-size:5px_5px]
        "
      />
    </motion.section>
  );
}

/* -------------------------------------------------------------
   FALLING ELEMENT
------------------------------------------------------------- */

function FallingFloral({
  index,
  left,
  size,
  delay,
  duration,
  drift,
  rotate,
  opacity,
  reduceMotion,
}: FallingElement & { reduceMotion: boolean; index: number }) {
  return (
    <span
      className={[
        "absolute top-[-20px] block",
        index >= 4 ? "save-date-secondary-atmosphere" : "",
        reduceMotion ? "" : "save-date-fall",
      ].join(" ")}
      style={
        {
          left,
          width: size,
          height: size,
          opacity: reduceMotion ? opacity * 0.55 : undefined,
          ["--fall-duration" as string]: `${duration}s`,
          ["--fall-delay" as string]: `${delay}s`,
          ["--fall-drift" as string]: `${drift}px`,
          ["--fall-rotate" as string]: `${rotate}deg`,
          ["--fall-opacity" as string]: opacity,
        } as CSSProperties
      }
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#f7dce2]/60" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#f7dce2]/60" />
      <span className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#f7dce2]/45" />
      <span className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-[#f7dce2]/45" />
      <span className="absolute left-1/2 top-1/2 h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#efc1cc]/60" />
    </span>
  );
}

/* -------------------------------------------------------------
   FLOATING BUBBLE
------------------------------------------------------------- */

function FloatingBubble({
  index,
  left,
  top,
  size,
  delay,
  duration,
  driftX,
  driftY,
  reduceMotion,
}: Bubble & { reduceMotion: boolean; index: number }) {
  return (
    <span
      className={[
        "absolute overflow-hidden rounded-full border border-[#f6c5d2]/60 bg-[#e9aebe]/[0.16] shadow-[0_0_14px_rgba(225,157,178,0.16)] save-date-bubble-node",
        reduceMotion ? "" : "save-date-bubble",
      ].join(" ")}
      style={
        {
          left,
          top,
          width: size,
          height: size,
          opacity: reduceMotion ? 0.32 : undefined,
          ["--bubble-duration" as string]: `${duration}s`,
          ["--bubble-delay" as string]: `${delay}s`,
          ["--bubble-x" as string]: `${driftX}px`,
          ["--bubble-y" as string]: `${driftY}px`,
        } as CSSProperties
      }
    >
      <span className="absolute inset-[15%] rounded-full bg-[#efb7c7]/[0.10]" />

      <span className="absolute left-[18%] top-[15%] h-[24%] w-[24%] rounded-full bg-white/65" />

      <span className="absolute bottom-[17%] right-[16%] h-[16%] w-[16%] rounded-full bg-[#f4b9ca]/50" />

      <span className="absolute inset-[18%] rounded-full border border-[#ffdce5]/25" />
    </span>
  );
}
