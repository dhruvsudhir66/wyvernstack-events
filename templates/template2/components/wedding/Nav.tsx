"use client";

import { WeddingImg } from "@/components/wedding-media";
import { useTemplate2 } from "@/templates/template2/context";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  ["Story", "#story"],
  ["Gallery", "#gallery"],
  ["Venue", "#venue"],
  ["RSVP", "#rsvp"],
];

export default function Nav() {
  const wedding = useTemplate2();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 70);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ═══════════════════════════════════════════════
          FIXED NAVBAR
      ═══════════════════════════════════════════════ */}

      <motion.header
        initial={false}
        animate={{
          opacity: scrolled ? 0.78 : 1,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          fixed
          left-0
          right-0
          top-0
          z-40
          px-4
          pt-4
          sm:px-5
          sm:pt-5
          md:px-7
        "
      >
        <div
          className="
            container-wedding
            flex
            items-center
            justify-between
          "
        >
          {/* ═════════════════════════════════════════
              LOGO
          ═════════════════════════════════════════ */}

          <motion.a
            href="#home"
            aria-label={`${wedding.couple.joined} — Home`}
            animate={{
              scale: scrolled ? 0.88 : 1,
              opacity: scrolled ? 0.82 : 1,
            }}
            whileHover={{
              scale: scrolled ? 0.93 : 1.03,
            }}
            whileTap={{
              scale: 0.96,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              flex
              h-[58px]
              w-[58px]
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              border-white/25
              bg-white/[0.10]
              p-2
              shadow-[0_5px_24px_rgba(0,0,0,0.14)]
              backdrop-blur-md
              sm:h-[62px]
              sm:w-[62px]
              md:h-[66px]
              md:w-[66px]
            "
          >
            <WeddingImg
              src={wedding.assets.logo}
              alt={wedding.couple.joined}
              className="
                h-full
                w-full
                object-contain
                drop-shadow-[0_2px_6px_rgba(0,0,0,0.24)]
              "
            />
          </motion.a>

          {/* ═════════════════════════════════════════
              DESKTOP NAVIGATION
          ═════════════════════════════════════════ */}

          <motion.nav
            initial={false}
            animate={{
              backgroundColor: scrolled
                ? "rgba(35,30,28,0.38)"
                : "rgba(0,0,0,0.16)",

              borderColor: scrolled
                ? "rgba(255,255,255,0.09)"
                : "rgba(255,255,255,0.12)",

              boxShadow: scrolled
                ? "0 6px 24px rgba(0,0,0,0.07)"
                : "0 8px 30px rgba(0,0,0,0.06)",

              backdropFilter: scrolled ? "blur(14px)" : "blur(18px)",
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              hidden
              items-center
              gap-1
              rounded-full
              border
              px-2
              py-2
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-white
              md:flex
            "
          >
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="
                  group
                  relative
                  px-4
                  py-2.5
                  transition-all
                  duration-300
                  hover:text-white
                "
              >
                {/* Label */}
                <span
                  className="
                    transition-opacity
                    duration-300
                    group-hover:opacity-60
                  "
                >
                  {label}
                </span>

                {/* Underline */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    bottom-[5px]
                    left-4
                    right-4
                    h-px
                    origin-left
                    scale-x-0
                    bg-white/55
                    transition-transform
                    duration-300
                    group-hover:scale-x-100
                  "
                />
              </a>
            ))}
          </motion.nav>

          {/* ═════════════════════════════════════════
              MOBILE MENU BUTTON
          ═════════════════════════════════════════ */}

          <motion.button
            onClick={() => setOpen(true)}
            whileTap={{
              scale: 0.92,
            }}
            aria-label="Open menu"
            aria-expanded={open}
            animate={{
              opacity: scrolled ? 0.86 : 1,
              scale: scrolled ? 0.94 : 1,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/15
              text-white
              shadow-[0_6px_20px_rgba(0,0,0,0.10)]
              backdrop-blur-xl
              transition-colors
              duration-300
              hover:bg-black/25
              md:hidden
            "
          >
            <Menu size={18} strokeWidth={1.5} />
          </motion.button>
        </div>
      </motion.header>

      {/* ═══════════════════════════════════════════════
          MOBILE FULLSCREEN MENU
      ═══════════════════════════════════════════════ */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              clipPath: "inset(0 0 100% 0)",
            }}
            animate={{
              clipPath: "inset(0 0 0% 0)",
            }}
            exit={{
              clipPath: "inset(0 0 100% 0)",
            }}
            transition={{
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="
              fixed
              inset-0
              z-50
              overflow-hidden
              bg-[#35312e]
              text-[#f7f3ed]
            "
          >
            {/* ═══════════════════════════════════════
                MENU ATMOSPHERE
            ═══════════════════════════════════════ */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {/* Main blush */}
              <motion.div
                className="
                  absolute
                  left-1/2
                  top-[42%]
                  h-[380px]
                  w-[380px]
                  -translate-x-1/2
                  rounded-full
                  bg-[#C890A7]/[0.07]
                  blur-[110px]
                "
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.45, 0.75, 0.45],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Large watermark */}
              <div
                className="
                  absolute
                  left-1/2
                  top-[48%]
                  -translate-x-1/2
                  -translate-y-1/2
                  select-none
                  whitespace-nowrap
                  font-serif
                  text-[190px]
                  font-light
                  tracking-[-0.08em]
                  text-[#f7f3ed]/[0.025]
                "
              >
                A&L
              </div>

              {/* Orbital line */}
              <motion.div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[430px]
                  w-[260px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rotate-[18deg]
                  rounded-[50%]
                  border
                  border-[#C890A7]/[0.08]
                "
                animate={{
                  rotate: [18, 22, 18],
                }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Grain */}
              <div
                className="
                  absolute
                  inset-0
                  opacity-[0.025]
                  [background-image:radial-gradient(rgba(255,255,255,0.8)_0.5px,transparent_0.5px)]
                  [background-size:6px_6px]
                "
              />
            </div>

            {/* ═══════════════════════════════════════
                MENU HEADER
            ═══════════════════════════════════════ */}

            <div
              className="
                relative
                z-10
                flex
                items-center
                justify-between
                px-6
                py-5
                sm:px-8
              "
            >
              <a
                href="#home"
                onClick={() => setOpen(false)}
                aria-label={`${wedding.couple.joined} — Home`}
                className="
                  flex
                  h-[58px]
                  w-[58px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.05]
                  p-2
                "
              >
                <WeddingImg
                  src={wedding.assets.logo}
                  alt={wedding.couple.joined}
                  className="
                    h-full
                    w-full
                    object-contain
                    brightness-0
                    invert
                    opacity-95
                  "
                />
              </a>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.04]
                  text-white
                  transition-colors
                  hover:bg-white/[0.08]
                "
              >
                <X size={19} strokeWidth={1.4} />
              </button>
            </div>

            {/* ═══════════════════════════════════════
                MENU LINKS
            ═══════════════════════════════════════ */}

            <nav
              className="
                relative
                z-10
                mt-20
                flex
                flex-col
                px-6
                sm:mt-24
                sm:px-8
              "
            >
              {links.map(([label, href], index) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.15 + index * 0.07,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    group
                    relative
                    flex
                    items-center
                    border-b
                    border-white/[0.09]
                    py-5
                    sm:py-6
                  "
                >
                  {/* Number */}
                  <span
                    className="
                      mr-5
                      w-7
                      text-[9px]
                      tracking-[0.14em]
                      text-[#c9aaa7]/70
                    "
                  >
                    0{index + 1}
                  </span>

                  {/* Label */}
                  <span
                    className="
                      font-display
                      text-[clamp(42px,12vw,64px)]
                      leading-none
                      tracking-[-0.035em]
                      transition-transform
                      duration-500
                      group-hover:translate-x-2
                    "
                  >
                    {label}
                  </span>

                  {/* Arrow */}
                  <span
                    className="
                      ml-auto
                      translate-x-2
                      text-xl
                      text-[#c9aaa7]/70
                      opacity-0
                      transition-all
                      duration-500
                      group-hover:translate-x-0
                      group-hover:opacity-100
                    "
                  >
                    ↗
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* ═══════════════════════════════════════
                MENU FOOTER
            ═══════════════════════════════════════ */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.65,
                duration: 0.8,
              }}
              className="
                absolute
                bottom-7
                left-6
                right-6
                z-10
                flex
                items-center
                justify-between
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-white/40
                sm:left-8
                sm:right-8
              "
            >
              <span>{wedding.couple.joined}</span>

              <span>{wedding.event.navDate}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
