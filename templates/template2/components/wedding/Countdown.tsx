"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/templates/template2/components/ui/Reveal";
import { useTemplate2 } from "@/templates/template2/context";

type RemainingTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getRemaining(target: number, now = Date.now()): RemainingTime {
  const distance = Math.max(0, target - now);

  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

/**
 * The timer is isolated from the decorative section.
 * Only this small component re-renders every second.
 *
 * It also:
 * - avoids hydration mismatches
 * - aligns updates to the real second boundary
 * - pauses while the tab is hidden
 * - avoids Framer Motion remounts/filter animations for every second
 */
function CountdownTimer() {
  const event = useTemplate2().event;
  const target = new Date(event.countdownIso).getTime();
  const [time, setTime] = useState<RemainingTime | null>(null);

  useEffect(() => {
    let intervalId: number | undefined;
    let timeoutId: number | undefined;

    const update = () => {
      setTime(getRemaining(target));
    };

    const start = () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      update();

      // Wait until the next second boundary instead of drifting.
      const delay = 1000 - (Date.now() % 1000);

      timeoutId = window.setTimeout(() => {
        update();

        intervalId = window.setInterval(update, 1000);
      }, delay);
    };

    const stop = () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };

    const handleVisibilityChange = () => {
      stop();

      if (!document.hidden) {
        start();
      }
    };

    start();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const safeTime = time ?? {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const values = [
    ["Days", safeTime.days],
    ["Hours", safeTime.hours],
    ["Minutes", safeTime.minutes],
    ["Seconds", safeTime.seconds],
  ] as const;

  return (
    <div
      className="
        relative
        flex
        items-center
        justify-center
        gap-3
        sm:gap-6
        md:gap-10
      "
      aria-label={`Countdown to ${event.displayDate}`}
    >
      {values.map(([label, value], index) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="relative min-w-[54px] overflow-hidden sm:min-w-[70px] md:min-w-[90px]">
              <span
                className="
                  block
                  font-display
                  text-[42px]
                  leading-none
                  tracking-[-0.06em]
                  tabular-nums
                  text-[#691638]
                  sm:text-[52px]
                  md:text-[64px]
                "
              >
                {String(value).padStart(2, "0")}
              </span>
            </div>

            <span
              className="
                mt-3
                text-[7px]
                font-medium
                uppercase
                tracking-[0.24em]
                text-[#691638]
                sm:text-[8px]
                md:text-[9px]
              "
            >
              {label}
            </span>
          </div>

          {index < values.length - 1 && (
            <span
              className="
                mx-1
                mb-5
                font-display
                text-xl
                font-light
                text-[#C890A7]/60
                sm:mx-2
                sm:text-2xl
                md:mx-4
                md:text-3xl
              "
              aria-hidden="true"
            >
              ·
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Countdown() {
  const displayDate = useTemplate2().event.displayDate;
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const shouldAnimate = !reduceMotion && !isMobile;

  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        [contain:layout_paint]
        bg-[#f8ebe6]
        py-16
        text-[#691638]
        sm:py-20
        md:py-24
      "
    >
      {/* =====================================================
          ROMANTIC ATMOSPHERE
      ===================================================== */}

      {/* Central soft pink glow */}
      <motion.div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#C890A7]/[0.12]
          blur-[50px] sm:blur-[70px] sm:blur-[110px]
          sm:h-[520px]
          sm:w-[520px]
        "
        animate={
          shouldAnimate
            ? {
                scale: [1, 1.08, 1],
                opacity: [0.55, 0.85, 0.55],
              }
            : undefined
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Left blush */}
      <motion.div
        className="
          pointer-events-none
          absolute
          -left-32
          top-[15%]
          h-72
          w-72
          rounded-full
          bg-[#C890A7]/[0.08]
          blur-[65px] sm:blur-[100px]
        "
        animate={
          shouldAnimate
            ? {
                x: [0, 35, 0],
                y: [0, -20, 0],
                opacity: [0.4, 0.65, 0.4],
              }
            : undefined
        }
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Right blush */}
      <motion.div
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-[5%]
          h-80
          w-80
          rounded-full
          bg-[#C890A7]/[0.07]
          blur-[50px] sm:blur-[70px] sm:blur-[110px]
        "
        animate={
          shouldAnimate
            ? {
                x: [0, -30, 0],
                y: [0, 20, 0],
                opacity: [0.35, 0.6, 0.35],
              }
            : undefined
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          SUBTLE PAINTED BRUSH STROKES
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Upper-left blush brush */}
        <motion.div
          className="
            absolute
            -left-20
            top-[10%]
            h-20
            w-[280px]
            rotate-[-16deg]
            rounded-[45%]
            bg-[#C890A7]/[0.13]
            blur-[1px]
            sm:h-24
            sm:w-[360px]
          "
          animate={{
            x: [0, 8, 0],
            rotate: [-16, -14, -16],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Fine wine brush over upper-left stroke */}
        <motion.div
          className="
            absolute
            -left-16
            top-[12%]
            h-2
            w-[230px]
            rotate-[-13deg]
            rounded-full
            bg-[#691638]/[0.09]
            blur-[0.5px]
            sm:w-[300px]
          "
          animate={{
            x: [0, 10, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Upper-right dusty rose brush */}
        <motion.div
          className="
            absolute
            -right-24
            top-[22%]
            h-16
            w-[260px]
            rotate-[18deg]
            rounded-[45%]
            bg-[#D9AFC0]/[0.16]
            blur-[1px]
            sm:h-20
            sm:w-[340px]
          "
          animate={{
            x: [0, -10, 0],
            rotate: [18, 20, 18],
            opacity: [0.65, 0.85, 0.65],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Lower-right soft brush */}
        <motion.div
          className="
            absolute
            -right-28
            bottom-[9%]
            h-24
            w-[330px]
            rotate-[-12deg]
            rounded-[50%]
            bg-[#C890A7]/[0.11]
            blur-[2px]
            sm:h-28
            sm:w-[420px]
          "
          animate={{
            x: [0, -8, 0],
            rotate: [-12, -10, -12],
            opacity: [0.55, 0.75, 0.55],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Small bottom accent */}
        <motion.div
          className="
            absolute
            bottom-[4%]
            left-1/2
            h-3
            w-28
            -translate-x-1/2
            rotate-[-4deg]
            rounded-full
            bg-[#691638]/[0.08]
            blur-[1px]
            sm:w-40
          "
          animate={{
            scaleX: [0.9, 1.08, 0.9],
            opacity: [0.45, 0.7, 0.45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* =====================================================
          FLOATING PETAL-LIKE LIGHT
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: isMobile ? 7 : 12 }, (_, index) => {
          const left = `${4 + ((index * 41) % 92)}%`;
          const top = `${7 + ((index * 29) % 86)}%`;

          return (
            <motion.span
              key={index}
              className="
                absolute
                rounded-full
                bg-[#C890A7]/40
                blur-[0.5px]
              "
              style={{
                left,
                top,
                width: index % 4 === 0 ? 4 : 2.5,
                height: index % 4 === 0 ? 4 : 2.5,
              }}
              animate={
                shouldAnimate
                  ? {
                      opacity: [0, 0.5, 0.15, 0],
                      y: [0, -18, -35],
                      x: [
                        0,
                        index % 2 === 0 ? 8 : -8,
                        index % 2 === 0 ? -3 : 3,
                      ],
                      scale: [0.7, 1.2, 0.8],
                    }
                  : undefined
              }
              transition={{
                duration: 5 + (index % 5),
                delay: index * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* =====================================================
          DELICATE ORNAMENTAL CURVES
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          -left-20
          top-1/2
          h-56
          w-56
          rounded-full
          border
          border-[#C890A7]/[0.10]
          sm:h-72
          sm:w-72
        "
        animate={
          shouldAnimate
            ? {
                rotate: [0, 8, 0],
                scale: [1, 1.04, 1],
              }
            : undefined
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          pointer-events-none
          absolute
          -right-20
          top-1/2
          h-56
          w-56
          rounded-full
          border
          border-[#C890A7]/[0.10]
          sm:h-72
          sm:w-72
        "
        animate={
          shouldAnimate
            ? {
                rotate: [0, -8, 0],
                scale: [1, 1.04, 1],
              }
            : undefined
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Fine paper grain */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:radial-gradient(rgba(105,22,56,0.55)_0.5px,transparent_0.5px)]
          [background-size:5px_5px]
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="container-wedding relative z-10">
        <Reveal>
          <div className="relative">
            {/* Top ornament */}
            <div className="mb-9 flex items-center justify-center gap-4 sm:mb-11">
              <span className="h-px w-16 bg-[#C890A7]/25 sm:w-24" />

              <motion.div
                animate={{
                  rotate: [45, 135, 45],
                  scale: [0.85, 1, 0.85],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative
                  h-3
                  w-3
                  rotate-45
                  border
                  border-[#C890A7]/65
                "
              >
                <span
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    h-1
                    w-1
                    -translate-x-1/2
                    -translate-y-1/2
                    -rotate-45
                    rounded-full
                    bg-[#C890A7]/70
                  "
                />
              </motion.div>

              <span className="h-px w-16 bg-[#C890A7]/25 sm:w-24" />
            </div>

            {/* =================================================
                HEADING
            ================================================= */}

            <div className="text-center">
              <motion.p
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.32em]
                  text-[#691638]
                  sm:text-[10px]
                "
              >
                Until we say I do
              </motion.p>

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.08,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  font-display
                  mt-4
                  text-[38px]
                  leading-[0.94]
                  tracking-[-0.045em]
                  text-[#691638]
                  sm:text-[46px]
                  md:text-[56px]
                "
              >
                The countdown is on.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.25,
                  duration: 0.9,
                }}
                className="
                  mx-auto
                  mt-5
                  max-w-[290px]
                  text-[10px]
                  font-600
                  uppercase
                  leading-6
                  text-[#691638]/65
                  sm:max-w-md
                  sm:text-[10px]
                "
              >
                Soon, two hearts become one beautiful beginning.
              </motion.p>
            </div>

            {/* =================================================
                SIMPLE ROMANTIC TIMER
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 22,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                delay: 0.25,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                mx-auto
                mt-12
                max-w-4xl
                sm:mt-14
              "
            >
              {/* Soft glow directly behind timer */}
              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-32
                  w-[80%]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-[#C890A7]/[0.10]
                  blur-[50px] sm:blur-[70px]
                  sm:h-40
                "
              />

              {/* Timer */}
              <CountdownTimer />
            </motion.div>

            {/* =================================================
                DATE
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.55,
                duration: 0.8,
              }}
              className="
                mt-10
                flex
                items-center
                justify-center
                gap-4
                sm:mt-12
              "
            >
              <span className="h-px w-8 bg-[#C890A7]/25 sm:w-12" />

              <span
                className="
                  text-center
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-[#691638]
                  sm:text-[9px]
                "
              >
                {displayDate}
              </span>

              <span className="h-px w-8 bg-[#C890A7]/25 sm:w-12" />
            </motion.div>

            {/* =================================================
                FINAL ROMANTIC ORNAMENT
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.7,
                duration: 0.8,
              }}
              className="mt-10 flex justify-center sm:mt-12"
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#C890A7]/20" />

                <motion.span
                  animate={
                    shouldAnimate
                      ? {
                          scale: [0.85, 1, 0.85],
                          opacity: [0.45, 0.9, 0.45],
                        }
                      : undefined
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    h-1.5
                    w-1.5
                    rotate-45
                    bg-[#C890A7]/70
                  "
                />

                <span className="h-px w-10 bg-[#C890A7]/20" />
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
