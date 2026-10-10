"use client";

import { WeddingAudio } from "@/components/wedding-media";

import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTemplate2 } from "@/templates/template2/context";

import SaveTheDate from "@/templates/template2/components/wedding/SaveTheDate";
import Nav from "@/templates/template2/components/wedding/Nav";
import Hero from "@/templates/template2/components/wedding/Hero";
import Countdown from "@/templates/template2/components/wedding/Countdown";
import Marquee from "@/templates/template2/components/wedding/Marquee";
import Couple from "@/templates/template2/components/wedding/Couple";
import Story from "@/templates/template2/components/wedding/Story";
import Gallery from "@/templates/template2/components/wedding/Gallery";
import Venue from "@/templates/template2/components/wedding/Venue";
import RSVP from "@/templates/template2/components/wedding/RSVP";
import Upload from "@/templates/template2/components/wedding/Upload";
import Footer from "@/templates/template2/components/wedding/Footer";

export default function WeddingExperience() {
  const wedding = useTemplate2();
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        audio.pause();
      } else {
        if (!muted) {
          audio.play().catch(() => {
            // Browser may require user interaction again
          });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [muted]);

  const handleOpenWedding = async () => {
    setOpened(true);

    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.currentTime = 0;
      audio.volume = wedding.music.volume;
      audio.muted = false;

      await audio.play();
      setMuted(false);
    } catch (error) {
      console.error("Unable to start wedding music:", error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !muted;

    audio.muted = nextMuted;
    setMuted(nextMuted);

    if (!nextMuted && audio.paused && !document.hidden) {
      audio.play().catch(() => {});
    }
  };

  return (
    <main className="wedding-noise overflow-x-clip">
      <WeddingAudio
        ref={audioRef}
        src={wedding.music.src}
        preload="auto"
        loop
        playsInline
      />

      <AnimatePresence mode="wait">
        {!opened && <SaveTheDate key="save-date" onOpen={handleOpenWedding} />}
      </AnimatePresence>

      {opened && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Nav />
          <Hero />
          <Countdown />
          {wedding.sections.marquee ? <Marquee /> : null}
          <Couple />
          <Story />
          <Gallery />
          <Venue />
          <RSVP />
          <Upload />
          <Footer />

          <motion.button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute wedding music" : "Mute wedding music"}
            title={muted ? "Unmute music" : "Mute music"}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 1,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            className="
                  fixed
                  bottom-6
                  right-6
                  z-50
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-[#691638]/80
                  text-white
                  shadow-[0_8px_30px_rgba(0,0,0,0.18)]
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:bg-white/15
                "
          >
            {/* Ambient ring */}
            <span
              className="
      absolute
      inset-0
      rounded-full
      border
      border-white/10
      opacity-70
    "
            />

            {/* Icon */}
            <AnimatePresence mode="wait" initial={false}>
              {muted ? (
                <motion.span
                  key="muted"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <VolumeX size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="playing"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Volume2 size={18} />
                </motion.span>
              )}
            </AnimatePresence>

            {/* Status dot */}
            <motion.span
              className="
      absolute
      right-2
      top-1
      h-1
      w-1
      rounded-full
      bg-[#C890A7]
      shadow-[0_0_5px_rgba(200,144,167,0.7)]
    "
            />
          </motion.button>
        </motion.div>
      )}
    </main>
  );
}
