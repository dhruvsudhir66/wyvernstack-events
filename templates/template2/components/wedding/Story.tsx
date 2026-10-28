"use client";

import { WeddingImage as Image } from "@/components/wedding-media";
import { useTemplate2 } from "@/templates/template2/context";
import { motion } from "framer-motion";
import Reveal from "@/templates/template2/components/ui/Reveal";

export default function Story() {
  const wedding = useTemplate2();
  return (
    <section
      id="story"
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-[#f8ebe6]
        py-16
        sm:py-20
        md:py-28
        lg:py-32
      "
    >
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Central glow */}
        <div
          className="
            absolute
            left-1/2
            top-[38%]
            h-[420px]
            w-[90vw]
            -translate-x-1/2
            rounded-full
            bg-[#C890A7]/[0.08]
            blur-[110px]
            sm:h-[520px]
            sm:w-[70vw]
          "
        />

        {/* Left blush */}
        <div
          className="
            absolute
            -left-[180px]
            top-[16%]
            h-[320px]
            w-[320px]
            rounded-full
            bg-[#C890A7]/[0.055]
            blur-[90px]
            sm:h-[420px]
            sm:w-[420px]
          "
        />

        {/* Right blush */}
        <div
          className="
            absolute
            -right-[180px]
            bottom-[12%]
            h-[360px]
            w-[360px]
            rounded-full
            bg-[#D9AFC0]/[0.07]
            blur-[100px]
            sm:h-[450px]
            sm:w-[450px]
          "
        />

        {/* =======================================================
            PAINTED STROKES
        ======================================================= */}

        <motion.div
          className="
            absolute
            -left-28
            top-[15%]
            h-16
            w-[260px]
            rotate-[-15deg]
            rounded-[50%]
            bg-[#C890A7]/[0.09]
            blur-[1px]
            sm:h-20
            sm:w-[340px]
          "
          animate={{
            x: [0, 8, 0],
            rotate: [-15, -13, -15],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="
            absolute
            -right-32
            top-[30%]
            h-20
            w-[300px]
            rotate-[17deg]
            rounded-[50%]
            bg-[#C890A7]/[0.07]
            blur-[1px]
            sm:h-24
            sm:w-[390px]
          "
          animate={{
            x: [0, -8, 0],
            rotate: [17, 15, 17],
            opacity: [0.55, 0.8, 0.55],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Fine grain */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:radial-gradient(
              rgba(105,22,56,0.7)_0.5px,
              transparent_0.5px
            )]
            [background-size:5px_5px]
          "
        />

        {/* Small floating particles */}
        {Array.from({ length: 14 }).map((_, index) => (
          <motion.span
            key={index}
            className="
              absolute
              h-1
              w-1
              rounded-full
              bg-[#C890A7]/40
            "
            style={{
              left: `${7 + ((index * 31) % 88)}%`,
              top: `${8 + ((index * 43) % 84)}%`,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration: 4 + (index % 4),
              delay: index * 0.25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div
        className="
          container-wedding
          relative
          z-10
          w-full
          px-5
          sm:px-6
          md:px-8
        "
      >
        {/* =======================================================
            SECTION INTRO
        ======================================================= */}

        <Reveal>
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="h-px w-9 bg-[#C890A7]/50 sm:w-12" />

              <span
                className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-[#691638]
                  sm:text-[9px]
                "
              >
                Our story
              </span>
            </div>

            <h2
              className="
                mt-5
                max-w-[340px]
                font-display
                text-[42px]
                leading-[0.92]
                tracking-[-0.045em]
                text-[#691638]
                sm:max-w-xl
                sm:text-[54px]
                md:text-[68px]
              "
            >
              It started
              <span className="serif-italic font-light"> with a hello.</span>
            </h2>

            <p
              className="
                mt-5
                max-w-[340px]
                text-[11px]
                leading-6
                text-[#691638]/65
                sm:max-w-lg
                sm:text-[13px]
                sm:leading-7
              "
            >
              Two separate journeys slowly became one shared story, filled with
              ordinary moments that somehow became the ones we treasure most.
            </p>
          </div>
        </Reveal>

        {/* =======================================================
            MAIN STORY COMPOSITION
        ======================================================= */}

        <div
          className="
            relative
            mt-14
            w-full
            sm:mt-18
            md:mt-24
          "
        >
          <div
            className="
              grid
              w-full
              items-center
              gap-14
              md:grid-cols-[1.05fr_0.95fr]
              md:gap-16
              lg:gap-24
            "
          >
            {/* ===================================================
                PHOTO COMPOSITION
            =================================================== */}

            <Reveal>
              <div
                className="
                  relative
                  mx-auto
                  h-[455px]
                  w-full
                  max-w-[360px]
                  sm:h-[560px]
                  sm:max-w-[500px]
                  md:h-[610px]
                "
              >
                {/* -----------------------------------------------
                    Large painted background shape
                ------------------------------------------------ */}

                <motion.div
                  className="
                    absolute
                    left-[5%]
                    top-[10%]
                    h-[72%]
                    w-[82%]
                    rounded-[52%_48%_46%_54%]
                    bg-[#C890A7]/[0.15]
                  "
                  animate={{
                    borderRadius: [
                      "52% 48% 46% 54%",
                      "47% 53% 52% 48%",
                      "52% 48% 46% 54%",
                    ],
                    rotate: [-3, 0, -3],
                  }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* -----------------------------------------------
                    Organic outline
                ------------------------------------------------ */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-[8%]
                    top-[12%]
                    h-[72%]
                    w-[82%]
                    rounded-[52%_48%_46%_54%]
                    border
                    border-[#C890A7]/25
                    rotate-[-3deg]
                  "
                />

                {/* -----------------------------------------------
                    Main image

                    IMPORTANT:
                    width is controlled on mobile so it can
                    never extend beyond the viewport.
                ------------------------------------------------ */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 28,
                    rotate: -3,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotate: -3,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    rotate: -1,
                    scale: 1.01,
                  }}
                  className="
                    absolute
                    left-[10%]
                    top-[3%]
                    z-10
                    h-[76%]
                    w-[73%]
                    overflow-hidden
                    rounded-[48%_52%_46%_54%]
                    bg-[#eadbd5]
                    shadow-[0_22px_60px_rgba(105,22,56,0.12)]
                    sm:h-[80%]
                    sm:w-[74%]
                  "
                >
                  <Image
                    src={wedding.assets.storyPrimary}
                    alt={wedding.couple.joined}
                    fill
                    priority={false}
                    sizes="
                      (max-width: 640px) 65vw,
                      (max-width: 768px) 52vw,
                      38vw
                    "
                    className="
                      object-cover
                      grayscale-[7%]
                      sepia-[4%]
                      saturate-[94%]
                      contrast-[96%]
                      brightness-[0.98]
                      transition-transform
                      duration-[1800ms]
                      hover:scale-[1.035]
                    "
                  />

                  {/* Soft image wash */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-br
                      from-white/[0.08]
                      via-transparent
                      to-[#691638]/[0.06]
                    "
                  />

                  {/* Image edge */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-[7px]
                      rounded-[48%_52%_46%_54%]
                      border
                      border-white/35
                    "
                  />

                  {/* Subtle grain */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      opacity-[0.035]
                      [background-image:radial-gradient(
                        rgba(255,255,255,0.9)_0.5px,
                        transparent_0.5px
                      )]
                      [background-size:5px_5px]
                    "
                  />
                </motion.div>

                {/* -----------------------------------------------
                    Small secondary photograph
                ------------------------------------------------ */}

                {/* -----------------------------------------------
                    Date stamp
                ------------------------------------------------ */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    delay: 0.35,
                    duration: 0.8,
                  }}
                  className="
                    absolute
                    bottom-[17%]
                    left-[0]
                    z-30
                    rotate-[-4deg]
                    border
                    border-[#691638]/15
                    bg-[#f8ebe6]/80
                    px-3
                    py-2
                    backdrop-blur-sm
                    sm:px-4
                    sm:py-2.5
                  "
                >
                  <p
                    className="
                      text-[7px]
                      uppercase
                      tracking-[0.22em]
                      text-[#691638]/55
                      sm:text-[8px]
                    "
                  >
                    {wedding.story.captionLabel}
                  </p>

                  <p
                    className="
                      mt-1
                      font-display
                      text-sm
                      tracking-[-0.02em]
                      text-[#691638]
                      sm:text-base
                    "
                  >
                    {wedding.story.captionDate}
                  </p>
                </motion.div>

                {/* -----------------------------------------------
                    Tiny decorative line
                ------------------------------------------------ */}

                <motion.div
                  className="
                    absolute
                    right-[7%]
                    top-[7%]
                    z-30
                    h-12
                    w-px
                    origin-top
                    bg-[#691638]/25
                  "
                  initial={{
                    scaleY: 0,
                  }}
                  whileInView={{
                    scaleY: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: 0.4,
                    duration: 0.8,
                  }}
                />

                <motion.div
                  className="
                    absolute
                    right-[4%]
                    top-[5%]
                    z-30
                    h-2
                    w-2
                    rotate-45
                    border
                    border-[#691638]/35
                    bg-[#f8ebe6]
                  "
                  initial={{
                    opacity: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: 0.7,
                    duration: 0.5,
                  }}
                />
              </div>
            </Reveal>

            {/* ===================================================
                STORY TEXT
            =================================================== */}

            <Reveal delay={0.12}>
              <div
                className="
                  relative
                  w-full
                  max-w-xl
                  md:pb-8
                "
              >
                {/* Small eyebrow */}
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#C890A7]/50" />

                  <span
                    className="
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.28em]
                      text-[#691638]/60
                    "
                  >
                    A little bit of us
                  </span>
                </div>

                <h3
                  className="
                    mt-5
                    max-w-[330px]
                    font-display
                    text-[35px]
                    leading-[0.95]
                    tracking-[-0.04em]
                    text-[#691638]
                    sm:max-w-lg
                    sm:text-[46px]
                    md:text-[52px]
                  "
                >
                  Somewhere between then
                  <span className="serif-italic font-light"> and now.</span>
                </h3>

                {/* Paragraphs */}
                <div
                  className="
                    mt-7
                    max-w-[340px]
                    space-y-5
                    text-[11px]
                    leading-6
                    text-[#691638]/65
                    sm:max-w-lg
                    sm:text-[13px]
                    sm:leading-7
                  "
                >
                  {wedding.story.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {/* Bottom signature line */}
                <div className="mt-8 flex items-center gap-4">
                  <span className="h-px w-10 bg-[#691638]/20" />

                  <span
                    className="
                      serif-italic
                      text-[13px]
                      text-[#691638]/55
                      sm:text-sm
                    "
                  >
                    {wedding.couple.joined}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
