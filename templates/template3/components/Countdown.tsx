"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTemplate3 } from "@/templates/template3/context";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calendarDays = Array.from({ length: 30 }, (_, index) => index + 1);

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

function getTimeLeft(weddingDate: Date): TimeLeft {
  const difference = weddingDate.getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

/* =========================================================
   COUNTDOWN UNIT
========================================================= */

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center px-1 sm:px-3">
      <span
        className="
          font-display
          text-[clamp(2.8rem,11vw,5rem)]
          font-semibold
          leading-[0.8]
          tracking-[-0.045em]
          text-[#30352B]
        "
      >
        {String(value).padStart(2, "0")}
      </span>

      <span
        className="
          mt-3
          font-sans
          text-[9px]
          font-bold
          uppercase
          tracking-[0.22em]
          text-[#59674D]
          sm:mt-3.5
          sm:text-[10px]
        "
      >
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   WEDDING DATE MARKER
========================================================= */

function WeddingDateCell({ day }: { day: number }) {
  return (
    <div
      className="
        relative
        flex
        h-[42px]
        w-[42px]
        items-center
        justify-center
        sm:h-[46px]
        sm:w-[46px]
      "
    >
      {/* Soft background wash */}
      <span
        aria-hidden="true"
        className="
          absolute
          inset-[3px]
          bg-[#59674D]/[0.075]
        "
      />

      {/* Thin vertical champagne marker */}
      <span
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-0
          h-[8px]
          w-px
          -translate-x-1/2
          bg-[#C8B58A]
        "
      />

      {/* Editorial corner marks */}
      <span
        aria-hidden="true"
        className="
          absolute
          left-0
          top-[5px]
          h-[8px]
          w-[8px]
          border-l
          border-t
          border-[#59674D]/75
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          right-0
          top-[5px]
          h-[8px]
          w-[8px]
          border-r
          border-t
          border-[#59674D]/75
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-[5px]
          left-0
          h-[8px]
          w-[8px]
          border-b
          border-l
          border-[#59674D]/75
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-[5px]
          right-0
          h-[8px]
          w-[8px]
          border-b
          border-r
          border-[#59674D]/75
        "
      />

      {/* Main 22 */}
      <motion.span
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 2,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          z-10
          -translate-y-[1px]
          font-display
          text-[16px]
          font-semibold
          leading-none
          tracking-[-0.04em]
          text-[#30352B]
          sm:text-[18px]
        "
      >
        {day}
      </motion.span>

      {/* Tiny mauve accent */}
      <span
        aria-hidden="true"
        className="
          absolute
          bottom-[1px]
          left-1/2
          h-[4px]
          w-[4px]
          -translate-x-1/2
          rotate-45
          bg-[#A87E8E]
        "
      />
    </div>
  );
}

/* =========================================================
   COUNTDOWN
========================================================= */

export default function Countdown() {
  const wedding = useTemplate3();
  const weddingDate = new Date(wedding.countdown.iso);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft(weddingDate));

    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(weddingDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const isWeddingDay =
    mounted &&
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <section
      id="countdown"
      aria-labelledby="countdown-title"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F3EFE5]
        text-[#30352B]
      "
    >
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(
            ellipse_at_12%_10%,
            rgba(255,255,255,0.95),
            transparent_44%
          )]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(
            ellipse_at_88%_88%,
            rgba(200,144,167,0.075),
            transparent_42%
          )]
        "
      />

      {/* Main light area around calendar */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[39%]
          h-[50%]
          w-[70%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/[0.52]
          blur-[100px]
        "
      />

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
          FRAME
      ========================================================== */}

      <div className="pointer-events-none absolute inset-4 border border-[#59674D]/20 sm:inset-6 lg:inset-9" />

      <div className="pointer-events-none absolute left-4 top-4 h-9 w-9 border-l border-t border-[#59674D]/55 sm:left-6 sm:top-6 lg:left-9 lg:top-9" />

      <div className="pointer-events-none absolute bottom-4 right-4 h-9 w-9 border-b border-r border-[#59674D]/46 sm:bottom-6 sm:right-6 lg:bottom-9 lg:right-9" />

      {/* =========================================================
          HEADER
      ========================================================== */}

      <header className="absolute inset-x-0 top-0 z-20 flex items-start justify-between px-7 pt-8 sm:px-10 sm:pt-10 md:px-12 lg:px-16 lg:pt-14">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#59674D]/58 sm:w-12" />

          <span className="font-sans text-[9px] font-bold uppercase tracking-[0.28em] text-[#59674D] sm:text-[10px]">
            CHAPTER TWO
          </span>
        </div>

        <span className="font-display text-[18px] font-semibold italic leading-none text-[#30352B]/62 sm:text-[20px]">
          02
        </span>
      </header>

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <div className="relative z-10 flex w-full flex-col items-center px-7 pb-20 pt-28 sm:px-10 sm:pb-24 sm:pt-32">
        {/* =======================================================
            TITLE
        ======================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center text-center"
        >
          <span className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] text-[#59674D] sm:text-[10px]">
            THE DAY IS GETTING CLOSER
          </span>

          <h1
            id="countdown-title"
            className="
              mt-4
              font-display
              text-[clamp(3.5rem,12vw,6.2rem)]
              font-semibold
              leading-[0.8]
              tracking-[-0.045em]
              text-[#30352B]
            "
          >
            Until we say
            <br />
            <span className="ml-[9%]">I do.</span>
          </h1>
        </motion.div>

        {/* =======================================================
            CALENDAR
        ======================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.14 }}
          transition={{
            duration: 0.85,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 flex w-full max-w-[480px] flex-col items-center sm:mt-10"
        >
          {/* Divider */}
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#59674D]/34 sm:w-16" />

            <span className="h-1.5 w-1.5 rotate-45 bg-[#C890A7]" />

            <span className="h-px w-10 bg-[#59674D]/34 sm:w-16" />
          </div>

          {/* Calendar */}
          <div
            className="
              mt-5
              w-[280px]
              border-y
              border-[#59674D]/26
              py-5
              sm:w-[310px]
              sm:py-6
            "
          >
            {/* Month / year */}
            <div className="mb-5 flex items-center justify-between px-1.5">
              <span className="font-display text-[21px] font-medium leading-none text-[#30352B] sm:text-[23px]">
                {wedding.date.monthLabel}
              </span>

              <span className="font-sans text-[8px] font-bold uppercase tracking-[0.25em] text-[#59674D]/78 sm:text-[9px]">
                {wedding.date.year}
              </span>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7">
              {weekDays.map((day, index) => (
                <span
                  key={`${day}-${index}`}
                  className="
                    text-center
                    font-sans
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.05em]
                    text-[#59674D]/72
                    sm:text-[9px]
                  "
                >
                  {day}
                </span>
              ))}
            </div>

            {/* Dates */}
            <div className="mt-2.5 grid grid-cols-7 gap-y-1">
              {calendarDays.map((day) => {
                const isWeddingDay = day === wedding.date.day;

                return (
                  <div
                    key={day}
                    className="
                      relative
                      flex
                      h-[44px]
                      items-center
                      justify-center
                      sm:h-[47px]
                    "
                  >
                    {isWeddingDay ? (
                      <WeddingDateCell day={wedding.date.day} />
                    ) : (
                      <span
                        className="
                          font-sans
                          text-[9px]
                          font-medium
                          text-[#59674D]/78
                          sm:text-[10px]
                        "
                      >
                        {day}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* =====================================================
              WEDDING DATE CAPTION
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{
              duration: 0.7,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-7 flex flex-col items-center"
          >
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] text-[#59674D]/78 sm:text-[10px]">
              OUR WEDDING DAY
            </span>

            <div className="mt-2.5 flex items-center gap-3">
              <span className="h-px w-7 bg-[#A87E8E]/62 sm:w-9" />

              <p className="font-display text-[21px] font-medium leading-none text-[#30352B] sm:text-[25px]">
                {wedding.date.caption}
              </p>

              <span className="h-px w-7 bg-[#A87E8E]/62 sm:w-9" />
            </div>
          </motion.div>
        </motion.div>

        {/* =======================================================
            COUNTDOWN
        ======================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{
            duration: 0.8,
            delay: 0.14,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-9 w-full max-w-[650px] sm:mt-10"
        >
          {isWeddingDay ? (
            <div className="text-center">
              <p className="font-display text-[44px] font-semibold leading-none text-[#30352B] sm:text-[54px]">
                Today is the day.
              </p>

              <p className="mt-2.5 font-script text-[31px] text-[#59674D] sm:text-[35px]">
                finally, forever begins
              </p>
            </div>
          ) : (
            <div className="border-y border-[#59674D]/24 py-6 sm:py-7">
              <div className="grid grid-cols-4 divide-x divide-[#59674D]/24">
                <CountdownUnit value={timeLeft.days} label="Days" />

                <CountdownUnit value={timeLeft.hours} label="Hours" />

                <CountdownUnit value={timeLeft.minutes} label="Minutes" />

                <CountdownUnit value={timeLeft.seconds} label="Seconds" />
              </div>
            </div>
          )}
        </motion.div>

        {/* =======================================================
            SUPPORTING MESSAGE
        ======================================================== */}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="
            mt-7
            text-center
            font-display
            text-[15px]
            font-medium
            italic
            text-[#59674D]/82
            sm:mt-8
            sm:text-[17px]
          "
        >
          A little closer to forever, every second.
        </motion.p>
      </div>

      {/* =========================================================
          BOTTOM CHAPTER LABEL
      ========================================================== */}

      <div className="absolute bottom-5 left-7 z-30 flex items-center gap-3 sm:bottom-7 sm:left-10 lg:left-16">
        <span className="font-sans text-[8px] font-bold tracking-[0.25em] text-[#59674D]/82 sm:text-[9px]">
          02
        </span>

        <span className="h-px w-7 bg-[#59674D]/42 sm:w-8" />

        <span className="font-sans text-[7px] font-bold uppercase tracking-[0.25em] text-[#59674D]/68 sm:text-[8px]">
          COUNTDOWN
        </span>
      </div>

      {/* =========================================================
          NEXT INDICATOR
      ========================================================== */}

      <div className="absolute bottom-5 right-7 z-30 flex flex-col items-center gap-2 sm:bottom-7 sm:right-10">
        <span className="font-sans text-[7px] font-semibold uppercase tracking-[0.3em] text-[#59674D]/68 sm:text-[8px] [writing-mode:vertical-rl]">
          NEXT
        </span>

        <span className="h-7 w-px bg-[#59674D]/42 sm:h-8" />

        <span className="h-1.5 w-1.5 rounded-full bg-[#C890A7]" />
      </div>
    </section>
  );
}
