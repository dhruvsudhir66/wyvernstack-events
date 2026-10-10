"use client";

import { WeddingImage as Image } from "@/components/wedding-media";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/templates/template2/components/ui/SectionHeading";
import { useTemplate2 } from "@/templates/template2/context";

export default function Couple() {
  const wedding = useTemplate2();
  const people = wedding.people;
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="couple"
      className="
        relative
        isolate
        overflow-hidden
        [contain:layout_paint]
        bg-[var(--off-white)]
        section-pad
      "
    >
      {/* =====================================================
          LIGHTWEIGHT ATMOSPHERIC BACKGROUND
          Static gradients keep the same warmth without animating blur.
      ===================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[40%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,170,167,0.075)_0%,rgba(201,170,167,0.025)_42%,transparent_72%)]" />
        <div className="absolute -left-32 top-[18%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(215,184,174,0.06)_0%,transparent_70%)]" />
        <div className="absolute -right-32 bottom-[10%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(201,170,167,0.055)_0%,transparent_70%)]" />
      </div>

      {/* Fine background grain */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.022]
          [background-image:radial-gradient(rgba(53,49,46,0.8)_0.5px,transparent_0.5px)]
          [background-size:5px_5px]
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="container-wedding relative z-10">
        <SectionHeading
          eyebrow="Meet the couple"
          title="Two lives, one beautiful beginning."
          description="A little glimpse into the people behind the invitation."
        />

        {/* =====================================================
            COUPLE GRID
        ===================================================== */}

        <div className="relative mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-0">
          {/* Desktop center line */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[12%]
              hidden
              h-[76%]
              w-px
              -translate-x-1/2
              bg-[var(--line)]
              md:block
            "
          />

          {/* Center diamond */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              hidden
              h-2
              w-2
              -translate-x-1/2
              -translate-y-1/2
              rotate-45
              border
              border-[var(--terracotta)]/50
              bg-[var(--off-white)]
              md:block
            "
          />

          {people.map((person, index) => (
            <motion.article
              key={person.name}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`
                  group
                  relative
                  ${index === 0 ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"}
                `}
            >
              {/* =================================================
                    PORTRAIT
                ================================================= */}

              <div className="relative mx-auto aspect-[4/5] w-[92%] sm:w-[88%]">
                {/* Lightweight portrait halo */}
                <div
                  aria-hidden="true"
                  className="
                      pointer-events-none
                      absolute
                      -inset-[3%]
                      rounded-[48%_52%_45%_55%]
                      bg-[radial-gradient(ellipse_at_center,rgba(184,143,136,0.10)_0%,rgba(184,143,136,0.045)_42%,transparent_72%)]
                    "
                />

                {/* Editorial outline ring */}
                <div
                  aria-hidden="true"
                  className="
                      pointer-events-none
                      absolute
                      -inset-[3%]
                      z-10
                      rounded-[48%_52%_45%_55%]
                      border
                      border-[#b88f88]/20
                    "
                />

                {/* Main portrait */}
                <motion.div
                  className="
                      absolute
                      inset-0
                      overflow-hidden
                      bg-[#c9b7ae]
                      [clip-path:polygon(
                        8%_3%,
                        48%_0%,
                        91%_5%,
                        97%_31%,
                        94%_70%,
                        87%_94%,
                        55%_98%,
                        17%_95%,
                        3%_72%,
                        5%_30%
                      )]
                    "
                  initial={{
                    opacity: 0,
                    scale: 1.04,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Image
                    src={person.image}
                    alt={`${person.name}, ${person.role}`}
                    fill
                    className="
                        object-cover
                        grayscale-[18%]
                        sepia-[8%]
                        saturate-[86%]
                        contrast-[96%]
                        brightness-[0.96]
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.04]
                        group-hover:translate-y-[-2px]
                      "
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 46vw, 42vw"
                    quality={72}
                  />

                  {/* Subtle warm photo treatment */}
                  <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[#9d6f62]/[0.08]
                        mix-blend-color
                      "
                  />

                  {/* Subtle photographic edges */}
                  <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[radial-gradient(
                          ellipse_at_center,
                          transparent_38%,
                          rgba(53,49,46,0.055)_72%,
                          rgba(53,49,46,0.11)_100%
                        )]
                      "
                  />

                  {/* Soft lower fade */}
                  <div
                    className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        bottom-0
                        h-[25%]
                        bg-gradient-to-t
                        from-[var(--off-white)]
                        via-[var(--off-white)]/25
                        to-transparent
                      "
                  />

                  {/* Subtle grain */}
                  <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        hidden opacity-[0.06] mix-blend-overlay sm:block
                        [background-image:radial-gradient(rgba(255,255,255,.8)_0.6px,transparent_0.6px)]
                        [background-size:4px_4px]
                      "
                  />
                </motion.div>

                {/* =================================================
                      FINE EDITORIAL OUTLINE
                  ================================================= */}

                <div
                  className="
                      pointer-events-none
                      absolute
                      inset-[10px]
                      z-20
                      border
                      border-[#9d6f62]/30
                      [clip-path:polygon(
                        8%_3%,
                        48%_0%,
                        91%_5%,
                        97%_31%,
                        94%_70%,
                        87%_94%,
                        55%_98%,
                        17%_95%,
                        3%_72%,
                        5%_30%
                      )]
                    "
                />

                {/* =================================================
                      CORNER ACCENTS
                  ================================================= */}

                <div
                  className="
                      pointer-events-none
                      absolute
                      left-[7%]
                      top-[7%]
                      z-30
                      h-5
                      w-5
                      border-l
                      border-t
                      border-[#9d6f62]/60
                    "
                />

                <div
                  className="
                      pointer-events-none
                      absolute
                      bottom-[7%]
                      right-[7%]
                      z-30
                      h-5
                      w-5
                      border-b
                      border-r
                      border-[#9d6f62]/60
                    "
                />

                {/* =================================================
                      FLOATING DIAMOND
                  ================================================= */}

                <span
                  className="
                      pointer-events-none
                      absolute
                      right-[4%]
                      top-[15%]
                      z-30
                      h-2
                      w-2
                      rotate-45
                      border
                      border-[#b88f88]/50
                      bg-[var(--off-white)]
                    "
                />

                {/* Second tiny accent */}
                <span
                  className="
                      pointer-events-none
                      absolute
                      left-[13%]
                      bottom-[20%]
                      z-30
                      h-1
                      w-1
                      rounded-full
                      bg-[#f8ebe6]/70
                      shadow-[0_0_8px_rgba(248,235,230,0.35)]
                    "
                />

                {/* =================================================
                      ROLE
                  ================================================= */}

                <div
                  className="
                      absolute
                      bottom-[10%]
                      left-[8%]
                      z-30
                      flex
                      items-center
                      gap-3
                    "
                >
                  <span className="h-px w-7 bg-[#f7f3ed]/70" />

                  <span
                    className="
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.28em]
                        text-[#f7f3ed]
                        drop-shadow-[0_1px_5px_rgba(0,0,0,.25)]
                      "
                  >
                    {person.role}
                  </span>
                </div>
              </div>

              {/* =================================================
                    DETAILS
                ================================================= */}

              <div
                className="
                    relative
                    mx-auto
                    w-[92%]
                    border-b
                    border-[var(--line)]
                    py-7
                    sm:w-[88%]
                    md:py-8
                  "
              >
                {/* Name */}
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p
                      className="
                          mb-2
                          text-[8px]
                          uppercase
                          tracking-[0.25em]
                          text-[var(--terracotta)]
                        "
                    >
                      {index === 0 ? "She" : "He"}
                    </p>

                    <h3
                      className="
                          font-display
                          text-[34px]
                          leading-none
                          tracking-[-0.035em]
                          text-[var(--ink)]
                          sm:text-4xl
                        "
                    >
                      {person.name}
                    </h3>
                  </div>

                  <span
                    className="
                        pt-1
                        font-display
                        text-xl
                        italic
                        text-[var(--terracotta)]/60
                      "
                  >
                    0{index + 1}
                  </span>
                </div>

                {/* Family */}
                <div className="mt-7">
                  <p
                    className="
                        text-[8px]
                        font-medium
                        uppercase
                        tracking-[0.24em]
                        text-[var(--terracotta)]
                      "
                  >
                    Family
                  </p>

                  <p
                    className="
                        mt-2
                        max-w-lg
                        text-[12px]
                        leading-6
                        text-[var(--muted)]
                        sm:text-[13px]
                        sm:leading-7
                      "
                  >
                    {person.family}
                  </p>
                </div>

                {/* What we do */}
                <div className="mt-6">
                  <p
                    className="
                        text-[8px]
                        font-medium
                        uppercase
                        tracking-[0.24em]
                        text-[var(--terracotta)]
                      "
                  >
                    What we do
                  </p>

                  <p
                    className="
                        mt-2
                        max-w-lg
                        text-[12px]
                        leading-6
                        text-[var(--muted)]
                        sm:text-[13px]
                        sm:leading-7
                      "
                  >
                    {person.work}
                  </p>
                </div>

                {/* Small editorial footer */}
                <div className="mt-7 flex items-center gap-3">
                  <span
                    className="
                        h-1
                        w-1
                        rotate-45
                        bg-[var(--terracotta)]/60
                      "
                  />

                  <span className="h-px w-12 bg-[var(--line)]" />

                  <span
                    className="
                        text-[8px]
                        uppercase
                        tracking-[0.2em]
                        text-[var(--muted)]/60
                      "
                  >
                    {wedding.couple.joined}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
