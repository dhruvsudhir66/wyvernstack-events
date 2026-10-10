"use client";

import { WeddingImage as Image } from "@/components/wedding-media";
import { motion } from "framer-motion";
import { useTemplate3 } from "@/templates/template3/context";

export default function OurStory() {
  const weddingConfig = useTemplate3();
  const photos = weddingConfig.assets.story;
  const brideName = weddingConfig.couple.secondName;
  const groomName = weddingConfig.couple.firstName;

  return (
    <section
      id="our-story"
      aria-labelledby="our-story-title"
      className="relative isolate w-full overflow-hidden bg-[#59674D] text-[#F8F4EA]"
    >
      {/* =========================================================
          CINEMATIC BACKGROUND
      ========================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src={photos.background}
          alt=""
          fill
          sizes="100vw"
          className="
            scale-[1.035]
            object-cover
            object-center
            saturate-[0.48]
            brightness-[0.68]
            contrast-[0.96]
          "
          priority={false}
        />

        {/* Overall olive/sage colour treatment */}
        <div className="absolute inset-0 bg-[#30352B]/25 mix-blend-multiply" />

        {/* Strong cinematic top-to-bottom treatment */}
        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(
             _180deg,
              rgba(30,36,29,0.72)_0%,
              rgba(48,53,43,0.38)_18%,
              rgba(89,103,77,0.08)_40%,
              rgba(48,53,43,0.24)_62%,
              rgba(27,33,27,0.72)_100%
            )]
          "
        />

        {/* Central readability zone.
            Keeps the photograph visible while giving the text
            a calmer visual surface. */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(
              ellipse_at_50%_48%,
              rgba(28,34,28,0.44)_0%,
              rgba(42,48,39,0.30)_24%,
              rgba(55,63,47,0.14)_48%,
              transparent_72%
            )]
          "
        />

        {/* Bottom text protection */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[48%]
            bg-[linear-gradient(
              180deg,
              transparent_0%,
              rgba(35,41,34,0.14)_24%,
              rgba(27,33,27,0.46)_62%,
              rgba(22,28,22,0.76)_100%
            )]
          "
        />

        {/* Slight top vignette */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-[28%]
            bg-[linear-gradient(
              180deg,
              rgba(22,28,22,0.52)_0%,
              rgba(22,28,22,0.18)_58%,
              transparent_100%
            )]
          "
        />

        {/* Outer vignette keeps the eye toward the center */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(
              ellipse_at_center,
              transparent_34%,
              rgba(18,24,18,0.12)_62%,
              rgba(16,22,16,0.38)_100%
            )]
          "
        />

        {/* Very subtle warm lift behind the photograph */}
        <div
          className="
            absolute
            left-1/2
            top-[43%]
            h-[58%]
            w-[76%]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#F8F4EA]/[0.045]
            blur-[90px]
          "
        />
      </div>

      {/* =========================================================
          PAPER / FILM TEXTURE
      ========================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #F8F4EA 0.5px, transparent 0.5px)",
          backgroundSize: "15px 15px",
        }}
      />

      {/* =========================================================
          LARGE SECTION NUMBER
      ========================================================== */}
      <div className="pointer-events-none absolute right-[-2vw] top-[-1%] select-none font-display text-[clamp(9rem,21vw,21rem)] font-light leading-none tracking-[-0.11em] text-[#F8F4EA]/[0.045]">
        05
      </div>

      <div className="relative z-10 mx-auto max-w-[1250px] px-5 pb-9 pt-7 sm:px-8 sm:pb-11 sm:pt-8 lg:px-12 lg:pb-12 lg:pt-9">
        {/* =======================================================
            SECTION HEADER
        ======================================================== */}
        <header className="flex items-center justify-between text-[#F8F4EA]">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="h-px w-8 bg-[#F8F4EA]/55 sm:w-12" />

            <span className="font-display text-[9px] font-semibold uppercase tracking-[0.3em] text-[#F8F4EA]/95 sm:text-[10px]">
              Our story
            </span>
          </div>

          <span className="font-display text-[15px] font-medium italic leading-none text-[#F8F4EA]/68 sm:text-[17px]">
            05
          </span>
        </header>

        <div className="relative z-20 mx-auto mt-9 max-w-[820px] sm:mt-11 lg:mt-12">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.14 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* =================================================
                INTRO LABEL
            ================================================== */}
            <div className="text-center">
              <span className="font-display text-[8px] font-semibold uppercase tracking-[0.34em] text-[#F8F4EA]/82 sm:text-[9px]">
                before there was an us
              </span>
            </div>

            {/* =================================================
                CHILDHOOD PHOTOGRAPH
            ================================================== */}
            <div className="relative mx-auto mt-6 sm:mt-8">
              {/* Glow behind image */}
              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-[43%]
                  h-[74%]
                  w-[122%]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-[50%]
                  bg-[#F8F4EA]/[0.11]
                  blur-[42px]
                "
              />

              <motion.figure
                initial={{
                  opacity: 0,
                  rotate: -2,
                  scale: 0.965,
                }}
                whileInView={{
                  opacity: 1,
                  rotate: -1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.18,
                }}
                transition={{
                  duration: 0.85,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  relative
                  z-20
                  mx-auto
                  w-[72%]
                  bg-[#F8F4EA]
                  p-2
                  pb-11
                  shadow-[0_30px_65px_-28px_rgba(12,18,12,0.72)]
                  sm:w-[55%]
                  sm:p-2.5
                  sm:pb-12
                  lg:w-[50%]
                "
              >
                <div className="relative aspect-[0.72] overflow-hidden bg-[#D9D6CA]">
                  <Image
                    src={photos.childhood}
                    alt={`${brideName} and ${groomName} as children`}
                    fill
                    sizes="(max-width: 640px) 72vw, 500px"
                    className="
                      object-cover
                      object-center
                      transition-transform
                      duration-700
                      hover:scale-[1.02]
                    "
                  />

                  {/* Subtle image treatment */}
                  <div className="pointer-events-none absolute inset-0 bg-[#30352B]/[0.05] mix-blend-multiply" />
                </div>

                {/* Washi tape */}
                <span className="absolute left-1/2 top-[-9px] h-6 w-20 -translate-x-1/2 rotate-[1deg] bg-[#C8B58A]/70" />
              </motion.figure>

              {/* =================================================
                  STORY COPY
              ================================================== */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-30"
              >
                <h2
                  id="our-story-title"
                  className="
                    mt-8
                    text-center
                    font-display
                    text-[clamp(3.25rem,9vw,5.2rem)]
                    font-medium
                    leading-[0.82]
                    tracking-[-0.055em]
                    text-[#F8F4EA]
                    drop-shadow-[0_3px_18px_rgba(20,25,20,0.32)]
                    sm:mt-8
                  "
                >
                  Two little
                  <br />
                  <span className="italic text-[#D8CAA9]">lives.</span>
                </h2>

                {/* Decorative divider */}
                <div className="mt-5 flex items-center justify-center gap-3 sm:mt-5">
                  <span className="h-px w-10 bg-[#F8F4EA]/36 sm:w-16" />

                  <span className="h-1.5 w-1.5 rotate-45 border border-[#D8CAA9]/75" />

                  <span className="h-px w-10 bg-[#F8F4EA]/36 sm:w-16" />
                </div>

                {/* Main story paragraph */}
                <p
                  className="
                    mx-auto
                    mt-6
                    max-w-[590px]
                    text-center
                    font-display
                    text-[15px]
                    font-medium
                    leading-[1.65]
                    text-[#F8F4EA]/92
                    drop-shadow-[0_2px_12px_rgba(20,25,20,0.3)]
                    sm:mt-7
                    sm:text-[17px]
                    sm:leading-[1.7]
                  "
                >
                  Long before there was a story to tell, there were simply two
                  little lives growing in their own directions, completely
                  unaware of where they would eventually meet.
                </p>

                {/* =================================================
                    NAMES
                ================================================== */}
                <div className="mt-8 text-center sm:mt-9">
                  <span className="block font-display text-[8px] font-semibold uppercase tracking-[0.32em] text-[#F8F4EA]/62 sm:text-[9px]">
                    And somehow
                  </span>

                  <div className="mt-3 flex flex-wrap items-baseline justify-center gap-x-3">
                    <span
                      className="
                        font-script
                        text-[clamp(3rem,7vw,4.8rem)]
                        leading-none
                        text-[#F8F4EA]
                        drop-shadow-[0_3px_16px_rgba(20,25,20,0.28)]
                      "
                    >
                      {groomName}
                    </span>

                    <span className="font-display text-[18px] font-medium italic text-[#D8CAA9] sm:text-[19px]">
                      &
                    </span>

                    <span
                      className="
                        font-script
                        text-[clamp(3rem,7vw,4.8rem)]
                        leading-none
                        text-[#F8F4EA]
                        drop-shadow-[0_3px_16px_rgba(20,25,20,0.28)]
                      "
                    >
                      {brideName}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* =====================================================
              TRANSITION TO NEXT PART OF STORY
          ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{
              duration: 0.7,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-10 max-w-[620px] text-center sm:mt-11"
          >
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-[#F8F4EA]/24" />

              <span className="font-display text-[8px] font-semibold uppercase tracking-[0.28em] text-[#F8F4EA]/62 sm:text-[9px]">
                before us
              </span>

              <span className="h-px flex-1 bg-[#F8F4EA]/24" />
            </div>

            <p className="mt-3 font-display text-[13px] font-medium italic text-[#F8F4EA]/68 sm:text-[14px]">
              And this was only the beginning.
            </p>
          </motion.div>
        </div>

        {/* =======================================================
            FOOTER / CHAPTER MARKER
        ======================================================== */}
        <div className="relative z-30 mt-9 border-t border-[#F8F4EA]/20 pt-4 sm:mt-10 sm:pt-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-[7px] font-semibold uppercase tracking-[0.28em] text-[#F8F4EA]/48 sm:text-[8px]">
              chapter 01
            </span>

            <span className="font-display text-[7px] font-semibold uppercase tracking-[0.28em] text-[#F8F4EA]/48 sm:text-[8px]">
              our story
            </span>

            <span className="font-display text-[7px] font-semibold uppercase tracking-[0.28em] text-[#F8F4EA]/48 sm:text-[8px]">
              05
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
