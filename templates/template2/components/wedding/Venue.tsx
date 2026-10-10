"use client";

import { WeddingImage as Image } from "@/components/wedding-media";
import { motion } from "framer-motion";
import { ArrowUpRight, Church, MapPin } from "lucide-react";
import { useTemplate2 } from "@/templates/template2/context";

export default function Venue() {
  const venueConfig = useTemplate2().venue;
  const events = venueConfig.events;
  const bethrothalColors = venueConfig.colors;
  return (
    <section
      id="venue"
      className="relative isolate overflow-hidden bg-[#f8ebe6] py-20 sm:py-24 lg:py-28"
    >
      {/* =======================================================
          STATIC BACKGROUND ATMOSPHERE

          Deliberately no Framer Motion, filters, blur layers,
          continuously animated particles, or backdrop-filter.
      ======================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Central blush — radial gradient instead of a huge CSS blur */}
        <div
          className="
            absolute left-1/2 top-[14%] h-[620px] w-[620px]
            -translate-x-1/2 rounded-full
            bg-[radial-gradient(circle,rgba(200,144,167,0.12)_0%,rgba(200,144,167,0.055)_34%,transparent_70%)]
          "
        />

        {/* Side atmospheric washes */}
        <div
          className="
            absolute -left-[180px] top-[38%] h-[500px] w-[500px]
            rounded-full
            bg-[radial-gradient(circle,rgba(200,144,167,0.075)_0%,transparent_68%)]
          "
        />

        <div
          className="
            absolute -right-[180px] top-[52%] h-[540px] w-[540px]
            rounded-full
            bg-[radial-gradient(circle,rgba(200,144,167,0.065)_0%,transparent_68%)]
          "
        />

        <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-white/[0.20] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#eadbd6]/[0.24] to-transparent" />

        {/* Very light paper texture */}
        <div
          className="
            absolute inset-0 opacity-[0.022]
            [background-image:radial-gradient(rgba(105,22,56,0.8)_0.5px,transparent_0.5px)]
            [background-size:7px_7px]
          "
        />

        {/* Large editorial frame */}
        <div
          className="
            absolute left-1/2 top-[3%] hidden h-[78%] w-[86%]
            -translate-x-1/2 rounded-[50%_50%_12%_12%]
            border border-[#691638]/[0.035]
            sm:block
          "
        />

        <div
          className="
            absolute left-1/2 top-[4.5%] hidden h-[75%] w-[82%]
            -translate-x-1/2 rounded-[50%_50%_10%_10%]
            border border-[#C890A7]/[0.04]
            sm:block
          "
        />

        {/* Complex decorative SVGs are desktop/tablet-only.
            The mobile version keeps the cleaner frame and content. */}
        <div className="hidden sm:block">
          {/* Main heart contour */}
          <svg
            className="
              absolute left-1/2 top-[5%] h-[520px] w-[760px]
              -translate-x-1/2 opacity-[0.065]
              md:h-[600px] md:w-[900px]
            "
            viewBox="0 0 900 620"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M450 525 C340 430 155 355 155 190 C155 95 260 55 335 105 C385 138 420 190 450 225 C480 190 515 138 565 105 C640 55 745 95 745 190 C745 355 560 430 450 525"
              stroke="#691638"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeDasharray="3 8"
            />
            <path
              d="M450 495 C365 415 190 340 190 210 C190 135 270 92 330 130 C380 162 420 216 450 252 C480 216 520 162 570 130 C630 92 710 135 710 210 C710 340 535 415 450 495"
              stroke="#C890A7"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
            <path
              d="M450 215 L462 227 L450 239 L438 227 Z"
              stroke="#691638"
              strokeWidth="0.8"
            />
          </svg>

          {/* Left ornament */}
          <svg
            className="absolute -left-[70px] top-[22%] h-[360px] w-[360px] opacity-[0.055]"
            viewBox="0 0 360 360"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="180"
              cy="180"
              r="135"
              stroke="#691638"
              strokeWidth="0.8"
              strokeDasharray="2 8"
            />
            <circle
              cx="180"
              cy="180"
              r="108"
              stroke="#C890A7"
              strokeWidth="0.7"
              strokeDasharray="1 6"
            />
            <circle
              cx="180"
              cy="180"
              r="80"
              stroke="#691638"
              strokeWidth="0.55"
              strokeDasharray="2 9"
            />
            <path
              d="M180 50 C220 95 255 120 300 140 C255 160 220 195 180 310"
              stroke="#C890A7"
              strokeWidth="0.7"
            />
            <path
              d="M180 50 C140 95 105 120 60 140 C105 160 140 195 180 310"
              stroke="#C890A7"
              strokeWidth="0.7"
            />
          </svg>

          {/* Right ornament */}
          <svg
            className="absolute -right-[80px] top-[30%] h-[390px] w-[390px] opacity-[0.05]"
            viewBox="0 0 390 390"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="195"
              cy="195"
              r="150"
              stroke="#691638"
              strokeWidth="0.8"
              strokeDasharray="2 8"
            />
            <circle
              cx="195"
              cy="195"
              r="120"
              stroke="#C890A7"
              strokeWidth="0.7"
              strokeDasharray="1 7"
            />
            <circle
              cx="195"
              cy="195"
              r="88"
              stroke="#691638"
              strokeWidth="0.55"
              strokeDasharray="2 9"
            />
            <path
              d="M195 45 C240 105 285 135 345 155 C285 175 240 220 195 345"
              stroke="#C890A7"
              strokeWidth="0.7"
            />
            <path
              d="M195 45 C150 105 105 135 45 155 C105 175 150 220 195 345"
              stroke="#C890A7"
              strokeWidth="0.7"
            />
          </svg>

          {/* Ribbon lines */}
          <svg
            className="absolute left-[-80px] top-[47%] h-[240px] w-[500px] opacity-[0.045]"
            viewBox="0 0 500 240"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M-20 190 C70 100 135 100 205 145 C280 193 345 180 520 35"
              stroke="#691638"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="3 9"
            />
            <path
              d="M-20 210 C70 120 140 115 210 160 C290 210 360 195 520 55"
              stroke="#C890A7"
              strokeWidth="0.7"
              strokeLinecap="round"
            />
            <path
              d="M-20 225 C80 140 145 135 215 175 C300 225 375 205 520 75"
              stroke="#691638"
              strokeWidth="0.45"
              strokeLinecap="round"
              strokeDasharray="1 7"
            />
          </svg>

          {/* Small constellation */}
          <div className="absolute right-[10%] top-[17%] h-28 w-28 opacity-[0.10]">
            <span className="absolute left-3 top-10 h-1.5 w-1.5 rounded-full bg-[#C890A7]" />
            <span className="absolute left-12 top-2 h-1 w-1 rounded-full bg-[#691638]" />
            <span className="absolute right-2 top-14 h-1.5 w-1.5 rounded-full bg-[#C890A7]" />
            <span className="absolute left-16 bottom-4 h-1 w-1 rounded-full bg-[#691638]" />
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              fill="none"
            >
              <path
                d="M12 42 C35 22 58 18 88 52"
                stroke="#691638"
                strokeWidth="0.6"
                strokeDasharray="1 5"
              />
              <path
                d="M45 10 C50 34 66 55 80 76"
                stroke="#C890A7"
                strokeWidth="0.6"
                strokeDasharray="1 5"
              />
            </svg>
          </div>

          <StaticSparkle className="left-[12%] top-[20%]" />
          <StaticSparkle className="right-[15%] top-[46%]" small />
          <StaticSparkle className="left-[18%] bottom-[18%]" small />
          <StaticSparkle className="right-[10%] bottom-[12%]" />
        </div>
      </div>

      {/* =======================================================
          CONTENT
      ======================================================= */}
      <div className="container-wedding relative z-10">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[9px] uppercase tracking-[0.28em] text-[#691638]/50">
            The celebration
          </p>

          <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-[-0.04em] text-[#691638] sm:text-5xl lg:text-6xl">
            Two moments.
            <br />
            <span className="serif-italic font-light">One celebration.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#691638]/55 sm:text-[15px]">
            From the quiet beauty of the church to an evening of celebration, we
            would love to have you with us.
          </p>
        </motion.div>

        {/* =====================================================
            CHURCH IMAGE
        ===================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-12 w-full max-w-4xl sm:mt-14 lg:mt-16"
        >
          {/* Static atmospheric glow — no CSS blur */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute -inset-8
              rounded-[50%]
              bg-[radial-gradient(ellipse,rgba(200,144,167,0.11)_0%,rgba(200,144,167,0.045)_42%,transparent_72%)]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute -bottom-8 left-1/2 h-28 w-[70%]
              -translate-x-1/2 rounded-full
              bg-[radial-gradient(ellipse,rgba(105,22,56,0.06)_0%,transparent_72%)]
            "
          />

          <div
            className="
              relative mx-auto aspect-[4/3] w-full max-w-[720px]
              overflow-hidden rounded-[50%_50%_3%_3%]
              border border-[#691638]/10 bg-[#eadbd6]
              shadow-[0_18px_45px_rgba(105,22,56,0.07)]
            "
          >
            <Image
              src="/images/church-thuruthipuram.webp"
              alt="Church where the celebration begins"
              fill
              sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 88vw, 720px"
              quality={70}
              loading="lazy"
              className="object-cover object-center"
            />

            {/* Image vignette */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute inset-0
                bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(45,20,30,0.055)_78%,rgba(45,20,30,0.11)_100%)]
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute inset-x-0 top-0 h-28
                bg-gradient-to-b from-white/[0.16] to-transparent
              "
            />

            {/* Static fine grain; no animated filter */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute inset-0 opacity-[0.018]
                [background-image:radial-gradient(rgba(255,255,255,0.9)_0.5px,transparent_0.5px)]
                [background-size:7px_7px]
              "
            />

            {/* Frames */}
            <div className="pointer-events-none absolute inset-[10px] border border-white/30 sm:inset-[14px]" />
            <div className="pointer-events-none absolute inset-[15px] border border-white/15 sm:inset-[20px]" />

            {/* Corners */}
            <div className="pointer-events-none absolute left-[10px] top-[10px] h-6 w-6 border-l border-t border-white/42 sm:left-[14px] sm:top-[14px]" />
            <div className="pointer-events-none absolute right-[10px] top-[10px] h-6 w-6 border-r border-t border-white/42 sm:right-[14px] sm:top-[14px]" />
            <div className="pointer-events-none absolute bottom-[10px] left-[10px] h-6 w-6 border-b border-l border-white/42 sm:bottom-[14px] sm:left-[14px]" />
            <div className="pointer-events-none absolute bottom-[10px] right-[10px] h-6 w-6 border-b border-r border-white/42 sm:bottom-[14px] sm:right-[14px]" />
          </div>

          {/* Church label — solid translucent panel, no backdrop-filter */}
          <div
            className="
              absolute bottom-5 left-5 z-10
              border border-white/35 bg-[#691638]/90
              px-4 py-3
              shadow-[0_8px_24px_rgba(105,22,56,0.10)]
              sm:bottom-8 sm:left-8
            "
          >
            <p className="text-[7px] uppercase tracking-[0.25em] text-white/55">
              Where it begins
            </p>
            <p className="mt-1 font-display text-lg text-white sm:text-xl">
              The Church
            </p>
          </div>

          {/* Location label */}
          <div
            className="
              absolute -bottom-4 right-4 z-10
              flex items-center gap-2
              border border-[#691638]/10
              bg-[#f8ebe6]
              px-4 py-3
              shadow-[0_10px_26px_rgba(105,22,56,0.07)]
              sm:-bottom-5 sm:right-8
            "
          >
            <MapPin size={13} strokeWidth={1.4} className="text-[#C890A7]" />
            <span className="text-[8px] uppercase tracking-[0.18em] text-[#691638]/65">
              Thuruthipuram
            </span>
          </div>
        </motion.div>

        {/* =====================================================
            EVENT TIMELINE
        ===================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-12 w-full max-w-5xl sm:mt-14 lg:mt-16"
        >
          {/* Mobile line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-[13px] top-0 w-px bg-[#691638]/[0.07] lg:hidden"
          />

          {/* Mobile / tablet */}
          <div className="space-y-6 sm:space-y-8 lg:hidden">
            {events.map((event) => (
              <div key={event.number} className="relative pl-10">
                <TimelineMarker />

                <EventContent event={event} />
              </div>
            ))}
          </div>

          {/* Desktop */}
          <div className="relative hidden lg:block">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-[#691638]/[0.07]"
            />

            <div className="space-y-10 xl:space-y-12">
              {events.map((event, index) => (
                <div
                  key={event.number}
                  className="
                    relative grid min-h-[190px]
                    grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)]
                    items-center
                  "
                >
                  <div className="min-w-0 pr-10 xl:pr-16">
                    {index % 2 === 0 && (
                      <div className="ml-auto max-w-[390px] text-right">
                        <EventContent event={event} align="right" />
                      </div>
                    )}
                  </div>

                  <TimelineMarker desktop />

                  <div className="min-w-0 pl-10 xl:pl-16">
                    {index % 2 !== 0 && (
                      <div className="max-w-[390px]">
                        <EventContent event={event} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Separator */}
        <div className="mt-7 flex flex-col items-center sm:mt-9 lg:mt-10">
          <div className="flex w-full items-center justify-center">
            <span className="h-px w-28 bg-[#691638]/[0.07]" />
            <span className="mx-4 h-2 w-2 rotate-45 border border-[#C890A7]/30 bg-[#f8ebe6] sm:mx-6" />
            <span className="h-px w-28 bg-[#691638]/[0.07]" />
          </div>
          <div className="mt-3 h-px w-5 bg-[#C890A7]/22" />
        </div>

        {/* =====================================================
            BETHROTHAL COLOUR THEME
        ===================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="
            relative mt-4 overflow-hidden rounded-[2px]
            bg-[#F3E7E3] px-5 py-10
            sm:mt-6 sm:px-8 sm:py-12
            lg:mt-7 lg:px-12 lg:py-14
          "
        >
          {/* Blend washes */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f8ebe6] to-transparent opacity-70"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f8ebe6] to-transparent opacity-50"
          />

          {/* Static central glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute left-1/2 top-1/2
              h-64 w-64 -translate-x-1/2 -translate-y-1/2
              rounded-full
              bg-[radial-gradient(circle,rgba(200,144,167,0.10)_0%,rgba(200,144,167,0.035)_42%,transparent_70%)]
            "
          />

          {/* Decorative pattern — desktop/tablet */}
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
            <svg
              className="absolute -left-[95px] -top-[85px] h-[310px] w-[310px] opacity-[0.055]"
              viewBox="0 0 310 310"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="155"
                cy="155"
                r="128"
                stroke="#691638"
                strokeWidth="0.9"
                strokeDasharray="2 7"
              />
              <circle
                cx="155"
                cy="155"
                r="103"
                stroke="#C890A7"
                strokeWidth="0.8"
                strokeDasharray="1 6"
              />
              <circle
                cx="155"
                cy="155"
                r="77"
                stroke="#691638"
                strokeWidth="0.6"
                strokeDasharray="2 8"
              />
              <circle
                cx="155"
                cy="155"
                r="49"
                stroke="#C890A7"
                strokeWidth="0.6"
              />
              <path
                d="M155 27 C205 80 244 105 285 125 C245 155 205 185 155 283"
                stroke="#691638"
                strokeWidth="0.7"
              />
              <path
                d="M155 27 C105 80 66 105 25 125 C65 155 105 185 155 283"
                stroke="#691638"
                strokeWidth="0.7"
              />
              <path
                d="M155 78 C180 105 201 120 225 135 C201 151 180 170 155 232"
                stroke="#C890A7"
                strokeWidth="0.7"
                strokeDasharray="2 5"
              />
              <path
                d="M155 78 C130 105 109 120 85 135 C109 151 130 170 155 232"
                stroke="#C890A7"
                strokeWidth="0.7"
                strokeDasharray="2 5"
              />
            </svg>

            <svg
              className="absolute -bottom-[100px] -right-[100px] h-[330px] w-[330px] opacity-[0.045]"
              viewBox="0 0 330 330"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="165"
                cy="165"
                r="135"
                stroke="#691638"
                strokeWidth="0.8"
                strokeDasharray="2 8"
              />
              <circle
                cx="165"
                cy="165"
                r="108"
                stroke="#C890A7"
                strokeWidth="0.7"
                strokeDasharray="1 7"
              />
              <circle
                cx="165"
                cy="165"
                r="79"
                stroke="#691638"
                strokeWidth="0.6"
                strokeDasharray="2 8"
              />
              <path
                d="M165 30 C210 82 250 112 305 138 C250 165 210 202 165 300"
                stroke="#C890A7"
                strokeWidth="0.8"
              />
              <path
                d="M165 30 C120 82 80 112 25 138 C80 165 120 202 165 300"
                stroke="#C890A7"
                strokeWidth="0.8"
              />
            </svg>

            <svg
              className="absolute right-[7%] top-[8%] h-[130px] w-[130px] opacity-[0.04]"
              viewBox="0 0 130 130"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M65 108 C42 88 15 70 15 43 C15 23 37 12 53 23 C60 28 64 35 65 40 C66 35 70 28 77 23 C93 12 115 23 115 43 C115 70 88 88 65 108"
                stroke="#691638"
                strokeWidth="0.9"
                strokeDasharray="2 6"
              />
            </svg>

            <div className="absolute bottom-[12%] left-[10%] h-20 w-20 opacity-[0.09]">
              <span className="absolute left-1 top-8 h-1.5 w-1.5 rounded-full bg-[#C890A7]" />
              <span className="absolute left-9 top-2 h-1 w-1 rounded-full bg-[#691638]" />
              <span className="absolute right-1 top-12 h-1.5 w-1.5 rounded-full bg-[#C890A7]" />
              <span className="absolute left-12 bottom-1 h-1 w-1 rounded-full bg-[#691638]" />
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 80 80"
                fill="none"
              >
                <path
                  d="M8 38 C25 20 45 17 72 45"
                  stroke="#691638"
                  strokeWidth="0.6"
                  strokeDasharray="1 5"
                />
                <path
                  d="M37 8 C42 28 54 45 65 65"
                  stroke="#C890A7"
                  strokeWidth="0.6"
                  strokeDasharray="1 5"
                />
              </svg>
            </div>
          </div>

          {/* Fine texture */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0 opacity-[0.018]
              [background-image:radial-gradient(rgba(105,22,56,0.8)_0.5px,transparent_0.5px)]
              [background-size:7px_7px]
            "
          />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <p className="text-[9px] uppercase tracking-[0.28em] text-[#691638]/50">
              The colour story
            </p>

            <h3 className="mt-3 font-display text-3xl leading-tight tracking-[-0.03em] text-[#691638] sm:text-4xl">
              Colours for our{" "}
              <span className="serif-italic font-light">celebration.</span>
            </h3>

            <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-[#691638]/55 sm:text-sm">
              A soft palette chosen for our {venueConfig.events[0]?.type}.
            </p>

            <div className="mt-7 flex flex-wrap items-start justify-center gap-x-5 gap-y-5 sm:gap-x-7">
              {bethrothalColors.map((color) => (
                <div key={color} className="group flex flex-col items-center">
                  <div
                    className="
                      relative flex h-11 w-11 items-center justify-center
                      rounded-full border border-[#691638]/10
                      bg-[#F3E7E3]
                      shadow-[0_5px_18px_rgba(105,22,56,0.045)]
                      transition-transform duration-300
                      sm:h-[52px] sm:w-[52px]
                      motion-safe:group-hover:scale-105
                    "
                  >
                    <span className="pointer-events-none absolute inset-[4px] rounded-full border border-[#C890A7]/20" />
                    <span
                      className="h-7 w-7 rounded-full shadow-[0_4px_14px_rgba(105,22,56,0.08)] sm:h-8 sm:w-8"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-7 h-px w-10 bg-[#C890A7]/22" />

            <p className="mt-2 text-[8px] uppercase tracking-[0.24em] text-[#691638]">
              {venueConfig.events[0]?.type} palette
            </p>
          </div>
        </motion.section>
      </div>
    </section>
  );
}

function TimelineMarker({ desktop = false }: { desktop?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={
        desktop
          ? "relative z-10 flex h-8 w-8 items-center justify-center justify-self-center"
          : "absolute left-0 top-0 flex h-7 w-7 items-center justify-center"
      }
    >
      <span
        className={
          desktop
            ? "absolute h-8 w-8 rotate-45 border border-[#C890A7]/30 bg-[#f8ebe6]"
            : "absolute h-7 w-7 rotate-45 border border-[#C890A7]/30 bg-[#f8ebe6]"
        }
      />
      <span className="relative h-1.5 w-1.5 rotate-45 bg-[#C890A7]" />
    </div>
  );
}

function StaticSparkle({
  className,
  small = false,
}: {
  className: string;
  small?: boolean;
}) {
  const size = small ? "h-3 w-3" : "h-5 w-5";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className} ${size} opacity-[0.07]`}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#691638]" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#691638]" />
      <span className="absolute left-1/2 top-1/2 h-[35%] w-[35%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#C890A7]" />
    </div>
  );
}

function EventContent({
  event,
  align = "left",
}: {
  event: {
    number: string;
    type: string;
    time: string;
    place: string;
    description: string;
    mapsUrl: string;
  };
  align?: "left" | "right";
}) {
  const isRight = align === "right";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-md ${isRight ? "ml-auto" : ""}`}
    >
      <div
        className={`flex items-center gap-3 ${isRight ? "justify-end" : "justify-start"}`}
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#C890A7]">
          {event.number}
        </span>
        <span className="h-px w-8 bg-[#C890A7]/25" />
      </div>

      <h3
        className={`
          mt-3 font-display text-3xl leading-none
          tracking-[-0.035em] text-[#691638] sm:text-4xl
          ${isRight ? "text-right" : "text-left"}
        `}
      >
        {event.type}
      </h3>

      <div
        className={`
          mt-3 flex flex-wrap items-center gap-x-4 gap-y-2
          ${isRight ? "justify-end" : "justify-start"}
        `}
      >
        <span className="text-[10px] uppercase tracking-[0.18em] text-[#691638]/65">
          {event.time}
        </span>

        <span className="h-1 w-1 rounded-full bg-[#C890A7]" />

        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#691638]/50">
          <Church size={12} strokeWidth={1.3} className="text-[#C890A7]" />
          {event.place}
        </span>
      </div>

      <p
        className={`
          mt-4 text-xs leading-6 text-[#691638]/55 sm:text-sm
          ${isRight ? "text-right" : "text-left"}
        `}
      >
        {event.description}
      </p>

      <div className={isRight ? "text-right" : "text-left"}>
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group mt-4 inline-flex min-h-8 items-center gap-2
            text-[9px] uppercase tracking-[0.2em] text-[#691638]/65
            transition-colors duration-200
            hover:text-[#691638]
          "
        >
          Open location
          <ArrowUpRight
            size={12}
            strokeWidth={1.4}
            className="
              transition-transform duration-200
              motion-safe:group-hover:-translate-y-0.5
              motion-safe:group-hover:translate-x-0.5
            "
          />
        </a>
      </div>
    </motion.div>
  );
}
