"use client";

const items = [
  {
    large: "ANEENA",
    small: "THE BRIDE",
  },
  {
    large: "LOYED",
    small: "THE GROOM",
  },
  {
    large: "30 NOVEMBER",
    small: "THE DAY",
  },
  {
    large: "2026",
    small: "THE YEAR",
  },
  {
    large: "KERALA",
    small: "THE PLACE",
  },
  {
    large: "FOREVER",
    small: "THE STORY",
  },
];

const topTrack = [...items, ...items];

const bottomTrack = [
  "LOVE",
  "TOGETHER",
  "CHAPTER ONE",
  "L + A",
  "OUR STORY",
  "BEGINNING",
  ...["LOVE", "TOGETHER", "CHAPTER ONE", "A + D", "OUR STORY", "BEGINNING"],
];

function OrbitMark() {
  return (
    <span
      aria-hidden="true"
      className="
        relative
        flex
        h-7
        w-7
        shrink-0
        items-center
        justify-center
        rounded-full
        border
        border-[#D8CAA9]/45
        sm:h-9
        sm:w-9
      "
    >
      <span
        className="
          absolute
          h-[3px]
          w-[3px]
          rounded-full
          bg-[#D8CAA9]/70
        "
      />

      <span
        className="
          absolute
          inset-[5px]
          rounded-full
          border
          border-[#D8CAA9]/20
        "
      />
    </span>
  );
}

function SmallCross() {
  return (
    <span
      aria-hidden="true"
      className="
        relative
        block
        h-3
        w-3
        shrink-0
      "
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#D8CAA9]/40" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#D8CAA9]/40" />
    </span>
  );
}

export default function Marquee() {
  return (
    <section
      aria-label="Wedding details"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#30352B]
      "
    >
      {/* =====================================================
          TOP MOVING LINE
      ====================================================== */}

      <div
        className="
          relative
          flex
          h-[46px]
          items-center
          overflow-hidden
          border-y
          border-[#F8F4EA]/10
          sm:h-[56px]
        "
      >
        {/* left atmospheric fade */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-20
            w-16
            bg-gradient-to-r
            from-[#30352B]
            to-transparent
            sm:w-28
          "
        />

        {/* right atmospheric fade */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-20
            w-16
            bg-gradient-to-l
            from-[#30352B]
            to-transparent
            sm:w-28
          "
        />

        <div className="marquee-top-track flex min-w-max items-center">
          {topTrack.map((item, index) => (
            <div
              key={`${item.large}-${index}`}
              className="
                flex
                shrink-0
                items-center
                gap-4
                px-4
                sm:gap-7
                sm:px-7
              "
            >
              <span
                className="
                  font-serif
                  text-[6px]
                  font-medium
                  tracking-[0.28em]
                  text-[#D8CAA9]/55
                  sm:text-[7px]
                "
              >
                {item.small}
              </span>

              <span
                className="
                  whitespace-nowrap
                  font-serif
                  text-[20px]
                  font-light
                  tracking-[-0.025em]
                  text-[#F8F4EA]
                  sm:text-[27px]
                "
              >
                {item.large}
              </span>

              <span
                aria-hidden="true"
                className="
                  h-px
                  w-8
                  bg-[#D8CAA9]/30
                  sm:w-12
                "
              />

              <span
                className="
                  font-serif
                  text-[6px]
                  tracking-[0.25em]
                  text-[#D8CAA9]/40
                  sm:text-[7px]
                "
              >
                01
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          ORBIT MARKS
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[7%]
          top-1/2
          z-30
          hidden
          -translate-y-1/2
          md:block
        "
      >
        <OrbitMark />
      </div>

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[7%]
          top-1/2
          z-30
          hidden
          -translate-y-1/2
          md:block
        "
      >
        <OrbitMark />
      </div>

      {/* =====================================================
          BOTTOM MOVING LINE
      ====================================================== */}

      <div
        className="
          relative
          flex
          h-[46px]
          items-center
          overflow-hidden
          border-b
          border-[#F8F4EA]/10
          sm:h-[56px]
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-20
            w-16
            bg-gradient-to-r
            from-[#30352B]
            to-transparent
            sm:w-28
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-20
            w-16
            bg-gradient-to-l
            from-[#30352B]
            to-transparent
            sm:w-28
          "
        />

        <div className="marquee-bottom-track flex min-w-max items-center">
          {bottomTrack.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="
                flex
                shrink-0
                items-center
                gap-4
                px-4
                sm:gap-7
                sm:px-7
              "
            >
              <SmallCross />

              <span
                className="
                  whitespace-nowrap
                  font-serif
                  text-[9px]
                  font-medium
                  tracking-[0.23em]
                  text-[#D8CAA9]/65
                  sm:text-[11px]
                "
              >
                {item}
              </span>

              <span
                className="
                  font-serif
                  text-[7px]
                  tracking-[0.26em]
                  text-[#F8F4EA]/30
                  sm:text-[8px]
                "
              >
                / 2026 /
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          SMALL CENTRE LABEL
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-1px]
          left-1/2
          z-50
          flex
          -translate-x-1/2
          items-center
          gap-2
          bg-[#30352B]
          px-3
        "
      >
        <span className="h-px w-3 bg-[#D8CAA9]/35" />

        <span
          className="
            font-serif
            text-[5px]
            tracking-[0.32em]
            text-[#D8CAA9]/45
            sm:text-[6px]
          "
        >
          OUR CHAPTER
        </span>

        <span className="h-px w-3 bg-[#D8CAA9]/35" />
      </div>
    </section>
  );
}
