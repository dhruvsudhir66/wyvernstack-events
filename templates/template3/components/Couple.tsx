"use client";

import { WeddingImage as Image } from "@/components/wedding-media";
import { Allura, Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const people = [
  {
    number: "01",
    role: "The bride",
    name: "Aneena Vincent",
    image: "/images/aneena.webp",
    family:
      "Daughter of Vincent & Lilly and sister of Alwin, raised with love, faith, and the warmth of family.",
    work: "Works in technology, with a love for learning, creativity, and building meaningful things.",
  },
  {
    number: "02",
    role: "The groom",
    name: "Loyed Varghese",
    image: "/images/loyed.webp",
    family:
      "Son of Varghese & Ancy, and brother to Leanda. Rooted in the love, memories, and values of the family that shaped him.",
    work: "Works as a Merchant Navy officer, travelling the seas while building a life grounded in family and purpose.",
  },
];

type PortraitProps = {
  image: string;
  name: string;
  number: string;
  caption: string;
  side: "left" | "right";
};

function Portrait({ image, name, number, caption, side }: PortraitProps) {
  const isLeft = side === "left";

  return (
    <div
      className="
        group
        relative
        mx-auto
        w-[76%]
        max-w-[340px]
        lg:mx-0
        lg:w-full
      "
    >
      {/* Editorial number */}
      <span
        className={`
          absolute
          top-1/2
          z-20
          -translate-y-1/2
          font-sans
          text-[9px]
          font-medium
          tracking-[0.32em]
          [writing-mode:vertical-rl]
          ${isLeft ? "-left-6 text-[#B57F96]" : "-right-6 text-[#59674D]"}
        `}
      >
        {number}
      </span>

      {/* =====================================================
          OUTER OFFSET FRAME
          ===================================================== */}

      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          inset-0
          border
          transition-transform
          duration-700
          ease-out
          motion-reduce:transition-none
          ${
            isLeft
              ? "-translate-x-3 translate-y-3 border-[#C890A7]/40 group-hover:-translate-x-4 group-hover:translate-y-4"
              : "translate-x-3 translate-y-3 border-[#59674D]/35 group-hover:translate-x-4 group-hover:translate-y-4"
          }
        `}
      />

      {/* Secondary frame detail */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          inset-0
          border
          transition-transform
          duration-700
          ease-out
          motion-reduce:transition-none
          ${
            isLeft
              ? "translate-x-[5px] -translate-y-[5px] border-[#C890A7]/15 group-hover:translate-x-[7px] group-hover:-translate-y-[7px]"
              : "-translate-x-[5px] -translate-y-[5px] border-[#59674D]/15 group-hover:-translate-x-[7px] group-hover:-translate-y-[7px]"
          }
        `}
      />

      {/* =====================================================
          PHOTOGRAPH
          ===================================================== */}

      <div
        className="
          relative
          z-10
          aspect-[0.84]
          overflow-hidden
          bg-[#E6DED6]
          shadow-[0_16px_36px_rgba(54,48,40,0.13),0_3px_10px_rgba(54,48,40,0.07)]
          transition-shadow
          duration-700
          ease-out
          group-hover:shadow-[0_22px_45px_rgba(54,48,40,0.17),0_5px_14px_rgba(54,48,40,0.08)]
          motion-reduce:transition-none
        "
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 76vw, (max-width: 1024px) 340px, 360px"
          quality={74}
          className="
            object-cover
            object-center
            transition-transform
            duration-[1100ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-[1.045]
            motion-reduce:transition-none
            motion-reduce:group-hover:scale-100
          "
        />

        {/* Subtle photographic color grade */}
        <div
          aria-hidden="true"
          className={`
            pointer-events-none
            absolute
            inset-0
            ${isLeft ? "bg-[#B9919D]/[0.045]" : "bg-[#68745E]/[0.045]"}
          `}
        />

        {/* Gentle depth across the photograph */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[linear-gradient(180deg,rgba(255,249,239,0.08)_0%,transparent_35%,transparent_60%,rgba(30,32,27,0.24)_100%)]
          "
        />

        {/* Soft edge vignette */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(33,34,28,0.10)_100%)]
          "
        />

        {/* =====================================================
            SUBTLE DESKTOP LIGHT SWEEP
            ===================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            -left-[85%]
            hidden
            w-[55%]
            -skew-x-[18deg]
            bg-gradient-to-r
            from-transparent
            via-white/[0.13]
            to-transparent
            opacity-0
            transition-[left,opacity]
            duration-[1100ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:left-[135%]
            group-hover:opacity-100
            motion-reduce:transition-none
            lg:block
          "
        />

        {/* Fine inner photographic border */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-[9px]
            border
            border-white/25
            sm:inset-[11px]
          "
        />

        {/* Corner registration marks */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-[11px]
            top-[11px]
            h-5
            w-5
            border-l
            border-t
            border-white/65
            sm:left-[13px]
            sm:top-[13px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-[11px]
            right-[11px]
            h-5
            w-5
            border-b
            border-r
            border-white/65
            sm:bottom-[13px]
            sm:right-[13px]
          "
        />

        {/* =====================================================
            PHOTOGRAPH CAPTION
            ===================================================== */}

        <div
          className={`
            absolute
            bottom-6
            z-20
            flex
            items-center
            gap-2.5
            ${isLeft ? "left-6" : "right-6"}
          `}
        >
          {isLeft && <span className="h-px w-6 bg-white/75" />}

          <span
            className="
              font-sans
              text-[8px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-white
              drop-shadow-[0_1px_5px_rgba(0,0,0,0.45)]
            "
          >
            {caption}
          </span>

          {!isLeft && <span className="h-px w-6 bg-white/75" />}
        </div>
      </div>

      {/* =====================================================
          LOWER EDITORIAL CAPTION
          ===================================================== */}

      <div
        className={`
          absolute
          -bottom-8
          z-20
          flex
          items-center
          gap-2.5
          ${isLeft ? "right-0" : "left-0"}
        `}
      >
        {isLeft && (
          <span
            className="
              font-sans
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-[#59674D]/55
            "
          >
            Aneena
          </span>
        )}

        <span
          className={`
            h-px
            w-6
            ${isLeft ? "bg-[#C890A7]/65" : "bg-[#59674D]/55"}
          `}
        />

        {!isLeft && (
          <span
            className="
              font-sans
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-[#59674D]/55
            "
          >
            Loyed
          </span>
        )}
      </div>
    </div>
  );
}

export default function Couple() {
  return (
    <section
      id="couple"
      aria-label="Meet the couple"
      className="
        relative
        overflow-hidden
        bg-[#F7F3ED]
        text-[#45483F]
      "
    >
      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_12%_18%,rgba(200,144,167,0.045),transparent_25%),radial-gradient(circle_at_88%_78%,rgba(89,103,77,0.045),transparent_26%)]
        "
      />

      {/* Paper grain */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          mix-blend-multiply
        "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='.4'/%3E%3C/svg%3E\")",
        }}
      />

      {/* =====================================================
          SIDE ARCHITECTURAL LINES
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-6
          top-0
          h-28
          w-px
          bg-[#59674D]/15
          sm:left-10
          lg:left-16
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-6
          top-0
          h-40
          w-px
          bg-[#59674D]/10
          sm:right-10
          lg:right-16
        "
      />

      {/* =====================================================
          SECTION HEADER
          ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1180px]
          px-7
          pb-16
          pt-24
          sm:px-10
          sm:pb-20
          sm:pt-28
          lg:px-14
          lg:pb-24
          lg:pt-32
        "
      >
        <div
          className="
            flex
            flex-col
            gap-8
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#59674D]/45" />

              <span
                className="
                  font-sans
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.42em]
                  text-[#59674D]/65
                  sm:text-[9px]
                "
              >
                Chapter II
              </span>
            </div>

            <h2
              className={`
                ${cormorant.className}
                mt-5
                text-[clamp(3.2rem,8vw,6.5rem)]
                font-normal
                leading-[0.86]
                tracking-[-0.035em]
                text-[#4B5045]
              `}
            >
              Meet the couple
            </h2>
          </div>

          <div
            className="
              max-w-[285px]
              border-l
              border-[#59674D]/20
              pl-5
              lg:mb-2
            "
          >
            <p
              className="
                font-sans
                text-[11px]
                leading-[1.9]
                tracking-[0.015em]
                text-[#55564E]/75
                sm:text-[12px]
              "
            >
              Two lives, two families, and a story that found its way from
              separate beginnings to one shared chapter.
            </p>
          </div>
        </div>

        <div
          className="
            mt-10
            flex
            items-center
            gap-4
            sm:mt-14
          "
        >
          <span className="h-px flex-1 bg-[#59674D]/12" />

          <span
            className="
              font-sans
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-[#59674D]/50
            "
          >
            Two stories / One beginning
          </span>

          <span className="h-px flex-1 bg-[#59674D]/12" />
        </div>
      </div>

      {/* =====================================================
          COUPLE CONTENT
          ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1120px]
          px-7
          pb-28
          sm:px-10
          sm:pb-36
          lg:px-14
          lg:pb-44
        "
      >
        {/* =================================================
            BRIDE
            ================================================= */}

        <article
          className="
            relative
            grid
            items-center
            gap-14
            lg:grid-cols-[360px_1fr]
            lg:gap-24
          "
        >
          <Portrait
            image={people[0].image}
            name={people[0].name}
            number={people[0].number}
            caption={people[0].role}
            side="left"
          />

          <div className="max-w-[520px] lg:pb-1">
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#C890A7]/55" />

              <span
                className="
                  font-sans
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.34em]
                  text-[#59674D]/70
                "
              >
                {people[0].role}
              </span>
            </div>

            <h3
              className={`
                ${cormorant.className}
                mt-4
                text-[clamp(2.7rem,6vw,4.8rem)]
                font-normal
                leading-[0.95]
                tracking-[-0.035em]
                text-[#464A41]
              `}
            >
              {people[0].name}
            </h3>

            <div className="mt-6 h-px w-10 bg-[#C890A7]/45" />

            <p
              className="
                mt-6
                max-w-[460px]
                font-sans
                text-[12px]
                leading-[1.9]
                text-[#55564E]/80
                sm:text-[13px]
              "
            >
              {people[0].family}
            </p>

            <p
              className="
                mt-4
                max-w-[460px]
                font-sans
                text-[12px]
                leading-[1.9]
                text-[#55564E]/80
                sm:text-[13px]
              "
            >
              {people[0].work}
            </p>

            <div
              className={`
                ${allura.className}
                mt-7
                -rotate-2
                text-[22px]
                text-[#C890A7]/85
                sm:text-[24px]
              `}
            >
              her story
            </div>
          </div>
        </article>

        {/* =================================================
            CENTER CONNECTION
            ================================================= */}

        <div
          className="
            relative
            my-24
            flex
            items-center
            justify-center
            sm:my-28
            lg:my-36
          "
        >
          <span className="h-px w-full bg-[#59674D]/12" />

          <div
            className="
              absolute
              flex
              h-10
              w-10
              items-center
              justify-center
              bg-[#F7F3ED]
            "
          >
            <span
              className="
                h-7
                w-7
                rotate-45
                border
                border-[#59674D]/25
              "
            />

            <span
              className={`
                ${allura.className}
                absolute
                text-[19px]
                text-[#59674D]
              `}
            >
              &amp;
            </span>
          </div>
        </div>

        {/* =================================================
            GROOM
            ================================================= */}

        <article
          className="
            relative
            grid
            items-center
            gap-14
            lg:grid-cols-[1fr_360px]
            lg:gap-24
          "
        >
          <div
            className="
              order-2
              max-w-[520px]
              lg:order-1
              lg:justify-self-end
              lg:pb-1
            "
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#59674D]/55" />

              <span
                className="
                  font-sans
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.34em]
                  text-[#59674D]/70
                "
              >
                {people[1].role}
              </span>
            </div>

            <h3
              className={`
                ${cormorant.className}
                mt-4
                text-[clamp(2.7rem,6vw,4.8rem)]
                font-normal
                leading-[0.95]
                tracking-[-0.035em]
                text-[#464A41]
              `}
            >
              {people[1].name}
            </h3>

            <div className="mt-6 h-px w-10 bg-[#59674D]/45" />

            <p
              className="
                mt-6
                max-w-[460px]
                font-sans
                text-[12px]
                leading-[1.9]
                text-[#55564E]/80
                sm:text-[13px]
              "
            >
              {people[1].family}
            </p>

            <p
              className="
                mt-4
                max-w-[460px]
                font-sans
                text-[12px]
                leading-[1.9]
                text-[#55564E]/80
                sm:text-[13px]
              "
            >
              {people[1].work}
            </p>

            <div
              className={`
                ${allura.className}
                mt-7
                -rotate-2
                text-[22px]
                text-[#59674D]/85
                sm:text-[24px]
              `}
            >
              his story
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Portrait
              image={people[1].image}
              name={people[1].name}
              number={people[1].number}
              caption={people[1].role}
              side="right"
            />
          </div>
        </article>
      </div>

      {/* =====================================================
          CLOSING THOUGHT
          ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[760px]
          px-7
          pb-28
          text-center
          sm:px-10
          sm:pb-36
        "
      >
        <div className="mx-auto flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-[#59674D]/20" />
          <span className="h-1 w-1 rounded-full bg-[#C890A7]/55" />
          <span className="h-px w-10 bg-[#59674D]/20" />
        </div>

        <p
          className={`
            ${cormorant.className}
            mt-7
            text-[clamp(1.45rem,3.5vw,2.25rem)]
            font-normal
            leading-[1.25]
            tracking-[-0.015em]
            text-[#59604F]
          `}
        >
          Two separate beginnings.
          <br />
          One shared chapter.
        </p>

        <div
          className={`
            ${allura.className}
            mt-5
            text-[21px]
            text-[#C890A7]/85
            sm:text-[24px]
          `}
        >
          together, now
        </div>
      </div>

      {/* =====================================================
          PAGE NUMBER
          ===================================================== */}

      <div
        className="
          absolute
          bottom-7
          left-7
          z-20
          flex
          items-center
          gap-3
          sm:left-10
          lg:left-16
        "
      >
        <span
          className="
            font-sans
            text-[8px]
            font-medium
            tracking-[0.25em]
            text-[#59674D]/65
          "
        >
          02
        </span>

        <span className="h-px w-8 bg-[#59674D]/20" />

        <span
          className="
            font-sans
            text-[8px]
            uppercase
            tracking-[0.25em]
            text-[#59674D]/50
          "
        >
          The couple
        </span>
      </div>

      {/* =====================================================
          CONTINUE
          ===================================================== */}

      <div
        className="
          absolute
          bottom-7
          right-7
          z-20
          flex
          flex-col
          items-center
          gap-2
          sm:right-10
        "
      >
        <span
          className="
            font-sans
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-[#59674D]/50
            [writing-mode:vertical-rl]
          "
        >
          Continue
        </span>

        <span className="h-8 w-px bg-[#59674D]/20" />
      </div>
    </section>
  );
}
