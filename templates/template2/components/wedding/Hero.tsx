"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, CalendarDays } from "lucide-react";
import { WeddingImage as Image } from "@/components/wedding-media";
import { useTemplate2 } from "@/templates/template2/context";

const bokehLights = [
  { left: "6%", top: "16%", size: 110, delay: 0, duration: 14, opacity: 0.14 },
  { left: "17%", top: "60%", size: 65, delay: 2, duration: 16, opacity: 0.11 },
  { left: "79%", top: "14%", size: 95, delay: 4, duration: 15, opacity: 0.13 },
  { left: "91%", top: "52%", size: 125, delay: 1, duration: 18, opacity: 0.11 },
  { left: "72%", top: "70%", size: 58, delay: 6, duration: 15, opacity: 0.13 },
];

const particles = Array.from({ length: 14 }, (_, index) => ({
  left: `${5 + ((index * 31) % 88)}%`,
  top: `${8 + ((index * 37) % 82)}%`,
  delay: index * 0.28,
  duration: 5 + (index % 4),
  size: index % 5 === 0 ? 4 : 2,
  opacity: index % 5 === 0 ? 0.42 : 0.25,
}));

export default function Hero() {
  const wedding = useTemplate2();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#e5ded6] [isolation:isolate]"
    >
      {/* HERO IMAGE — one static image layer */}
      <div className="absolute inset-0">
        <Image
          src={wedding.assets.hero}
          alt=""
          fill
          priority
          quality={72}
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(35,30,27,.05)_10%,rgba(35,30,27,.08)_45%,rgba(35,30,27,.68)_100%)]"
        />

        {/* Facial diffusion without backdrop-filter */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_18%_16%_at_52%_43%,rgba(255,244,235,.06)_0%,rgba(255,244,235,.035)_42%,transparent_72%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_28%_24%_at_54%_46%,rgba(255,244,235,.035)_0%,transparent_68%)]"
        />

        {/* Static atmospheric glows — no animated large blur surfaces */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[42%] top-[34%] h-[30vw] w-[30vw] max-h-[520px] max-w-[520px] -translate-x-1/2 rounded-full bg-[#f4d7b5]/[0.13] blur-[55px] sm:blur-[80px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[48%] top-[39%] h-40 w-40 rounded-full bg-[#fff0d5]/[0.13] blur-[45px]"
        />

        {/* Bokeh: transform/opacity only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {bokehLights.map((light, index) => (
            <span
              key={index}
              className={[
                "hero-bokeh absolute rounded-full bg-white",
                index >= 3 ? "hero-bokeh-secondary" : "",
                reduceMotion ? "" : "hero-bokeh-animated",
              ].join(" ")}
              style={
                {
                  left: light.left,
                  top: light.top,
                  width: light.size,
                  height: light.size,
                  opacity: light.opacity,
                  ["--bokeh-duration" as string]: `${light.duration}s`,
                  ["--bokeh-delay" as string]: `${light.delay}s`,
                } as import("react").CSSProperties
              }
            />
          ))}
        </div>

        {/* Small foreground light orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[8%] top-[30%] h-20 w-20 rounded-full bg-[#fff1d8]/[0.12] blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[9%] top-[38%] h-28 w-28 rounded-full bg-[#f8dfbc]/[0.12] blur-2xl"
        />

        {/* Desktop-only cinematic sweeps */}
        <div
          aria-hidden="true"
          className="hero-light-sweep pointer-events-none absolute left-[-35%] top-[-30%] hidden h-[165%] w-[24%] rotate-[16deg] bg-gradient-to-r from-transparent via-[#fff8eb]/[0.14] to-transparent blur-2xl md:block"
        />
        <div
          aria-hidden="true"
          className="hero-light-leak pointer-events-none absolute left-[-40%] top-[-15%] hidden h-[130%] w-[42%] rotate-[12deg] bg-gradient-to-r from-transparent via-[#e8c99f]/[0.08] to-transparent blur-[45px] md:block"
        />

        {/* Lens flare */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[57%] top-[20%] h-16 w-16 rounded-full bg-[#fff1c9]/[0.16] blur-xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[57.5%] top-[21%] h-px w-32 rotate-[12deg] bg-gradient-to-r from-transparent via-[#fff4d5]/[0.24] to-transparent"
        />

        {/* Particles */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {particles.map((particle, index) => (
            <span
              key={index}
              className={
                reduceMotion
                  ? "absolute rounded-full bg-white"
                  : "hero-particle absolute rounded-full bg-white"
              }
              style={
                {
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  opacity: particle.opacity,
                  ["--particle-duration" as string]: `${particle.duration}s`,
                  ["--particle-delay" as string]: `${particle.delay}s`,
                  ["--particle-x" as string]: `${index % 2 === 0 ? 7 : -7}px`,
                } as import("react").CSSProperties
              }
            />
          ))}
        </div>

        {/* Vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(35,30,27,.07)_62%,rgba(35,30,27,.30)_100%)]"
        />

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-[#211b18]/45 via-[#211b18]/12 to-transparent"
        />

        {/* CSS grain — no SVG feTurbulence */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.025] bg-[radial-gradient(rgba(255,255,255,.55)_0.5px,transparent_0.5px)] [background-size:5px_5px]"
        />
      </div>

      {/* HERO CONTENT */}
      <div className="container-wedding relative z-10 px-5 pb-12 pt-28 text-white sm:px-6 sm:pb-16 sm:pt-32 md:pb-24 md:pt-36">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow-white text-white"
        >
          With joyful hearts, we invite you
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-5xl font-display text-[clamp(70px,13vw,170px)] leading-[.78] tracking-[-.065em]"
        >
          {wedding.couple.bride}
          <span className="serif-italic font-light"> & </span>
          {wedding.couple.groom}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-5 text-sm"
        >
          <span className="inline-flex items-center gap-2">
            <CalendarDays size={15} />
            {wedding.event.weekdayDate}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-white/60 md:block" />
        </motion.div>

        <motion.a
          href="#story"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.6 }}
          className="mt-14 inline-flex items-center gap-3 text-[10px] uppercase tracking-[.25em] text-white/80 touch-manipulation"
        >
          Discover our story
          <ArrowDown size={14} />
        </motion.a>
      </div>

      <style>{`
        .hero-bokeh-animated {
          animation: hero-bokeh var(--bokeh-duration) ease-in-out var(--bokeh-delay) infinite;
          will-change: transform, opacity;
          filter: blur(18px);
        }

        .hero-particle {
          animation: hero-particle var(--particle-duration) ease-in-out var(--particle-delay) infinite;
          will-change: transform, opacity;
          box-shadow: 0 0 7px rgba(255,244,225,.28);
        }

        .hero-light-sweep {
          animation: hero-light-sweep 20s ease-in-out 2s infinite;
          will-change: transform, opacity;
        }

        .hero-light-leak {
          animation: hero-light-leak 26s ease-in-out 5s infinite;
          will-change: transform, opacity;
        }

        @keyframes hero-bokeh {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(10px,-12px,0) scale(1.06); }
        }

        @keyframes hero-particle {
          0%, 100% { transform: translate3d(0,0,0) scale(.7); opacity: 0; }
          35% { opacity: 1; }
          65% { transform: translate3d(var(--particle-x),-22px,0) scale(1.1); opacity: .55; }
          100% { transform: translate3d(0,-34px,0) scale(.8); opacity: 0; }
        }

        @keyframes hero-light-sweep {
          0%,20% { transform: translate3d(-120%,0,0) rotate(16deg); opacity: 0; }
          42% { opacity: .8; }
          65%,100% { transform: translate3d(250%,0,0) rotate(16deg); opacity: 0; }
        }

        @keyframes hero-light-leak {
          0%,30% { transform: translate3d(-70%,0,0) rotate(12deg); opacity: 0; }
          50% { opacity: .65; }
          72%,100% { transform: translate3d(210%,0,0) rotate(12deg); opacity: 0; }
        }

        @media (max-width: 767px) {
          .hero-bokeh-animated { filter: blur(12px); }
          .hero-bokeh-secondary { display: none; }
          .hero-particle { animation-duration: calc(var(--particle-duration) + 2s); box-shadow: none; }
          .hero-light-sweep, .hero-light-leak { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-bokeh-animated, .hero-particle, .hero-light-sweep, .hero-light-leak {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
