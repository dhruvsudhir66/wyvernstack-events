"use client";

import { WeddingImage as Image } from "@/components/wedding-media";
import { motion } from "framer-motion";
import { useTemplate3 } from "@/templates/template3/context";

export function Hero() {
  const weddingConfig = useTemplate3();
  return (
    <section
      id="hero"
      aria-label="Our story"
      className="
        relative
        min-h-[100svh]
        overflow-hidden
        bg-[#30352B]
        text-[#F8F4EA]
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <motion.div
        initial={{ scale: 1.035 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0"
      >
        <Image
          src={weddingConfig.assets.hero}
          alt={weddingConfig.copy.hero.photoAlt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="
            object-cover
            object-center
          "
        />
      </motion.div>

      {/* =====================================================
          BASE IMAGE TREATMENT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[#30352B]/20
          mix-blend-multiply
        "
      />

      {/* =====================================================
          GLOBAL READABILITY GRADIENT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(
            180deg,
            rgba(15,20,15,0.66)_0%,
            rgba(18,23,18,0.28)_17%,
            rgba(20,25,20,0.05)_37%,
            rgba(20,25,20,0.14)_55%,
            rgba(18,23,18,0.48)_76%,
            rgba(13,18,13,0.90)_100%
          )]
        "
      />

      {/* =====================================================
          LOWER TEXT-SAFE AREA
          Stronger protection behind the hero copy
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-[62%]
          bg-[linear-gradient(
            180deg,
            transparent_0%,
            rgba(17,22,17,0.08)_12%,
            rgba(17,22,17,0.28)_36%,
            rgba(15,20,15,0.58)_65%,
            rgba(11,16,11,0.88)_100%
          )]
        "
      />

      {/* =====================================================
          CENTRE READABILITY
          Soft local darkening behind central content
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(
            ellipse_at_42%_67%,
            rgba(18,24,18,0.30)_0%,
            rgba(18,24,18,0.20)_24%,
            rgba(18,24,18,0.08)_48%,
            transparent_72%
          )]
        "
      />

      {/* =====================================================
          TOP READABILITY
          Protects header against bright areas
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-[28%]
          bg-[linear-gradient(
            180deg,
            rgba(12,17,12,0.34)_0%,
            rgba(12,17,12,0.16)_42%,
            transparent_100%
          )]
        "
      />

      {/* =====================================================
          SOFT CENTRE WASH
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(
            ellipse_at_50%_48%,
            rgba(248,244,234,0.045),
            transparent_58%
          )]
        "
      />

      {/* =====================================================
          OUTER VIGNETTE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(
            circle_at_center,
            transparent_38%,
            rgba(10,15,10,0.25)_100%
          )]
        "
      />

      {/* =====================================================
          EDITORIAL FRAME
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-4
          z-20
          border
          border-white/22
          sm:inset-6
          lg:inset-9
        "
      />

      {/* Top-left corner */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-4
          top-4
          z-30
          h-10
          w-10
          border-l
          border-t
          border-[#D7DECB]/70
          sm:left-6
          sm:top-6
          lg:left-9
          lg:top-9
        "
      />

      {/* Bottom-right corner */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-4
          right-4
          z-30
          h-10
          w-10
          border-b
          border-r
          border-[#D7DECB]/50
          sm:bottom-6
          sm:right-6
          lg:bottom-9
          lg:right-9
        "
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.header
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          inset-x-0
          top-0
          z-30
          flex
          items-center
          justify-between
          px-7
          pt-8
          sm:px-10
          sm:pt-10
          md:px-12
          md:pt-12
          lg:px-16
          lg:pt-14
        "
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-7 bg-[#E5EBDD]/75 shadow-[0_1px_7px_rgba(0,0,0,0.35)] sm:w-10" />

          <span
            className="
              font-sans
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.38em]
              text-[#FFF9F1]
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]
              sm:text-[9px]
            "
          >
            CHAPTER ONE
          </span>
        </div>

        <div
          className="
            font-display
            text-[18px]
            italic
            leading-none
            tracking-[0.08em]
            text-[#FFF9F1]
            drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]
            sm:text-[21px]
          "
        >
          {weddingConfig.couple.firstName?.charAt(0)}

          <span className="mx-1.5 text-[#C890A7]">&amp;</span>

          {weddingConfig.couple.secondName?.charAt(0)}
        </div>
      </motion.header>

      {/* =====================================================
          DESKTOP FRAME LABELS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          right-0
          top-[34%]
          z-20
          hidden
          items-center
          justify-between
          px-12
          lg:flex
        "
      >
        {["FRAME 01", "FRAME 02", "FRAME 03"].map((label) => (
          <span
            key={label}
            className="
              font-sans
              text-[7px]
              font-medium
              uppercase
              tracking-[0.32em]
              text-[#F8F4EA]/60
              drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]
            "
          >
            {label}
          </span>
        ))}
      </div>

      {/* =====================================================
          MAIN HERO COPY
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-[100svh]
          w-full
          flex-col
          justify-end
          px-6
          pb-24
          pt-32
          sm:px-10
          sm:pb-28
          md:px-12
          lg:px-16
          lg:pb-24
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-[1160px]"
        >
          {/* =================================================
              OUR STORY LABEL
          ================================================= */}

          <div className="mb-4 flex items-center gap-3 sm:mb-5">
            <span className="h-px w-8 bg-[#E5EBDD]/70 shadow-[0_1px_7px_rgba(0,0,0,0.35)] sm:w-12" />

            <span
              className="
                font-sans
                text-[6px]
                font-semibold
                uppercase
                tracking-[0.32em]
                text-[#FFF9F1]
                drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]
                sm:text-[7px]
              "
            >
              OUR STORY
            </span>
          </div>

          {/* =================================================
              MAIN TITLE
          ================================================= */}

          <h1
            className="
              max-w-[980px]
              font-display
              text-[clamp(4rem,15vw,9rem)]
              font-medium
              leading-[0.78]
              tracking-[-0.055em]
              text-[#FFFDF8]
              drop-shadow-[0_7px_24px_rgba(5,10,5,0.72)]
            "
          >
            WE FOUND LOVE.
          </h1>
          <br />
          <br />
          {/* =================================================
              STORY COPY
          ================================================= */}

          <div
            className="
              mt-6
              max-w-[560px]
              border-l
              border-[#E5EBDD]/75
              pl-4
              sm:mt-7
              sm:pl-6
            "
          >
            <p
              className="
                font-display
                text-[15px]
                leading-[1.52]
                text-[#FFF9F1]
                drop-shadow-[0_3px_14px_rgba(5,10,5,0.76)]
                sm:text-[19px]
                sm:leading-[1.5]
              "
            >
              A little laughter. A little movement. A thousand small moments
              that slowly became something more. And somewhere along the way,
              two separate stories began moving in the same direction.
            </p>
          </div>

          {/* =================================================
              COUPLE / DATE
          ================================================= */}

          <div
            className="
              mt-8
              grid
              grid-cols-2
              gap-x-8
              gap-y-5
              sm:mt-10
              sm:flex
              sm:items-end
              sm:gap-10
              lg:gap-14
            "
          >
            {/* Couple */}

            <div>
              <p
                className="
                  font-sans
                  text-[6px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#E7EDDE]/80
                  drop-shadow-[0_2px_7px_rgba(0,0,0,0.65)]
                  sm:text-[7px]
                "
              >
                THE COUPLE
              </p>

              <p
                className="
                  mt-1
                  font-display
                  text-[20px]
                  leading-none
                  text-[#FFFDF8]
                  drop-shadow-[0_3px_12px_rgba(0,0,0,0.72)]
                  sm:text-[25px]
                "
              >
                {weddingConfig.couple.firstName}

                <span className="mx-1.5 italic text-[#D59BB0]">&amp;</span>

                {weddingConfig.couple.secondName}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =====================================================
          MOBILE EDGE MARKER
      ===================================================== */}

      <div
        className="
          absolute
          right-5
          top-1/2
          z-30
          flex
          -translate-y-1/2
          flex-col
          items-center
          gap-3
          lg:hidden
        "
      >
        <span className="h-7 w-px bg-[#E2E9DA]/50 shadow-[0_1px_7px_rgba(0,0,0,0.4)]" />

        <span
          className="
            font-sans
            text-[6px]
            font-medium
            uppercase
            tracking-[0.26em]
            text-[#FFF9F1]/75
            drop-shadow-[0_2px_7px_rgba(0,0,0,0.55)]
            [writing-mode:vertical-rl]
          "
        >
          OUR STORY
        </span>

        <span className="h-7 w-px bg-[#E2E9DA]/30" />
      </div>

      {/* =====================================================
          DESKTOP SIDE STORY MARKER
      ===================================================== */}

      <div
        className="
          absolute
          right-8
          top-1/2
          z-30
          hidden
          -translate-y-1/2
          flex-col
          items-center
          gap-4
          lg:flex
        "
      >
        <span className="h-12 w-px bg-[#D7DECB]/40" />

        <span
          className="
            font-sans
            text-[7px]
            font-medium
            uppercase
            tracking-[0.3em]
            text-[#FFF9F1]/65
            drop-shadow-[0_2px_7px_rgba(0,0,0,0.55)]
            [writing-mode:vertical-rl]
          "
        >
          THEN
        </span>

        <span className="h-7 w-px bg-[#D7DECB]/25" />

        <span
          className="
            font-sans
            text-[7px]
            font-medium
            uppercase
            tracking-[0.3em]
            text-[#FFF9F1]/90
            drop-shadow-[0_2px_7px_rgba(0,0,0,0.55)]
            [writing-mode:vertical-rl]
          "
        >
          NOW
        </span>

        <span className="h-12 w-px bg-[#D7DECB]/40" />
      </div>

      {/* =====================================================
          LOWER LEFT SECTION MARKER
      ===================================================== */}

      <div
        className="
          absolute
          bottom-7
          left-7
          z-30
          flex
          items-center
          gap-3
          sm:bottom-9
          sm:left-10
          lg:left-16
        "
      >
        <span
          className="
            font-sans
            text-[7px]
            font-semibold
            tracking-[0.25em]
            text-[#FFF9F1]
            drop-shadow-[0_2px_8px_rgba(0,0,0,0.62)]
            sm:text-[8px]
          "
        >
          01
        </span>

        <span className="h-px w-7 bg-[#D7DECB]/50 sm:w-8" />

        <span
          className="
            font-sans
            text-[6px]
            font-medium
            uppercase
            tracking-[0.25em]
            text-[#FFF9F1]/65
            drop-shadow-[0_2px_8px_rgba(0,0,0,0.62)]
            sm:text-[7px]
          "
        >
          OUR STORY
        </span>
      </div>

      {/* =====================================================
          LOWER RIGHT CONTINUE MARKER
      ===================================================== */}

      <div
        className="
          absolute
          bottom-7
          right-7
          z-30
          flex
          flex-col
          items-center
          gap-2
          sm:bottom-9
          sm:right-10
        "
      >
        <span
          className="
            font-sans
            text-[6px]
            font-medium
            uppercase
            tracking-[0.3em]
            text-[#FFF9F1]/70
            drop-shadow-[0_2px_8px_rgba(0,0,0,0.60)]
            [writing-mode:vertical-rl]
            sm:text-[7px]
          "
        >
          CONTINUE
        </span>

        <span className="h-8 w-px bg-[#D7DECB]/50 shadow-[0_1px_7px_rgba(0,0,0,0.4)] sm:h-9" />

        <span className="h-1.5 w-1.5 rounded-full bg-[#C890A7] shadow-[0_0_10px_rgba(200,144,167,0.45)]" />
      </div>

      {/* =====================================================
          SUBTLE FILM GRAIN
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-40
          opacity-[0.035]
          mix-blend-soft-light
        "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='.4'/%3E%3C/svg%3E\")",
        }}
      />
    </section>
  );
}

export default Hero;
