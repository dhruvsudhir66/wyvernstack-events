"use client";

import { useTemplate2 } from "@/templates/template2/context";

export default function Marquee() {
  const words = useTemplate2().marquee;

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        border-y
        border-[#F8EBE6]/20
        bg-[#9B6079]
        py-5
        md:py-6
      "
    >
      {/* =====================================================
          SUBTLE ATMOSPHERE
      ===================================================== */}

      {/* Soft center illumination */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-24
          w-[55%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#F8EBE6]/[0.045]
          blur-[60px]
        "
      />

      {/* Very subtle top light */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-[12%]
          top-0
          h-16
          bg-gradient-to-b
          from-white/[0.055]
          to-transparent
          blur-xl
        "
      />

      {/* =====================================================
          MOVING LIGHT SHEEN
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          -left-[15%]
          w-[18%]
          rotate-[12deg]
          bg-gradient-to-r
          from-transparent
          via-white/[0.07]
          to-transparent
          blur-lg
          transition-transform
          duration-[1800ms]
          group-hover:translate-x-[650%]
        "
      />

      {/* =====================================================
          CLEAN SIDE FRAMING
      ===================================================== */}

      {/* Left inner line */}
      <div
        className="
          pointer-events-none
          absolute
          inset-y-2
          left-4
          w-px
          bg-[#F8EBE6]/[0.14]
          md:left-7
        "
      />

      {/* Left outer accent */}
      <div
        className="
          pointer-events-none
          absolute
          inset-y-5
          left-7
          w-px
          bg-[#6B2948]/[0.22]
          md:left-10
        "
      />

      {/* Right inner line */}
      <div
        className="
          pointer-events-none
          absolute
          inset-y-2
          right-4
          w-px
          bg-[#F8EBE6]/[0.14]
          md:right-7
        "
      />

      {/* Right outer accent */}
      <div
        className="
          pointer-events-none
          absolute
          inset-y-5
          right-7
          w-px
          bg-[#6B2948]/[0.22]
          md:right-10
        "
      />

      {/* =====================================================
          SOFT EDGE VIGNETTE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-0
          z-10
          w-14
          bg-gradient-to-r
          from-[#7F4A63]/40
          to-transparent
          md:w-20
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          right-0
          z-10
          w-14
          bg-gradient-to-l
          from-[#7F4A63]/40
          to-transparent
          md:w-20
        "
      />

      {/* =====================================================
          INNER BORDERS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-white/25
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-px
          bg-[#5E3045]/30
        "
      />

      {/* =====================================================
          SUBTLE GRAIN
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:radial-gradient(rgba(255,255,255,0.9)_0.5px,transparent_0.5px)]
          [background-size:5px_5px]
        "
      />

      {/* =====================================================
          MARQUEE
      ===================================================== */}

      <div className="marquee-track relative z-[2]">
        {[...words, ...words].map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="
              mx-6
              inline-flex
              items-center
              gap-6
              whitespace-nowrap
              font-display
              text-[25px]
              leading-none
              tracking-[-0.025em]
              text-[#FFF8F5]
              sm:mx-7
              sm:text-[28px]
              md:mx-8
              md:gap-8
              md:text-3xl
            "
          >
            <span
              className="
                drop-shadow-[0_1px_8px_rgba(55,20,35,0.16)]
              "
            >
              {word}
            </span>

            {/* Elegant diamond separator */}
            <span
              className="
                relative
                flex
                h-3
                w-3
                items-center
                justify-center
              "
            >
              {/* Very subtle diamond glow */}
              <span
                className="
                  absolute
                  h-3
                  w-3
                  rotate-45
                  bg-[#F8EBE6]/[0.07]
                  blur-[3px]
                "
              />

              {/* Diamond */}
              <span
                className="
                  relative
                  h-1.5
                  w-1.5
                  rotate-45
                  border
                  border-[#FFF8F5]/70
                  transition-all
                  duration-500
                  group-hover:border-[#FFF8F5]
                  group-hover:bg-[#FFF8F5]/10
                "
              />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
