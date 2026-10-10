"use client";

import { useEffect, useRef, useState } from "react";
import { mediaUrl } from "@/lib/assets";
import { useTemplate3 } from "@/templates/template3/context";

function VolumeIcon({ muted }: { muted: boolean }) {
  if (muted) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[17px] w-[17px]"
        aria-hidden="true"
      >
        <path d="M11 5 6.8 8.5H4.5v7h2.3L11 19V5Z" />
        <path d="m16 9-4 6" />
        <path d="m12 9 4 6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[17px] w-[17px]"
      aria-hidden="true"
    >
      <path d="M11 5 6.8 8.5H4.5v7h2.3L11 19V5Z" />
      <path d="M15 9.5a4 4 0 0 1 0 6" />
      <path d="M17.8 7a7.5 7.5 0 0 1 0 11" />
    </svg>
  );
}

export default function WeddingAudio() {
  const wedding = useTemplate3();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(mediaUrl(wedding.slug, wedding.assets.music));

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = wedding.music.volume;
    audio.muted = false;

    audioRef.current = audio;

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.pause();
      audio.currentTime = 0;

      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);

      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleOpenInvitation = async () => {
      const audio = audioRef.current;

      if (!audio) return;

      try {
        /*
         * Start from the beginning every time the invitation
         * is opened during the current page session.
         */
        audio.currentTime = 0;
        audio.muted = false;
        setIsMuted(false);

        await audio.play();
      } catch (error) {
        /*
         * The browser may still reject playback in some
         * environments. We intentionally do not throw.
         */
        console.warn("Wedding audio could not start:", error);
      }
    };

    window.addEventListener("wedding:open-invitation", handleOpenInvitation);

    return () => {
      window.removeEventListener(
        "wedding:open-invitation",
        handleOpenInvitation,
      );
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) return;

    const nextMuted = !audio.muted;

    audio.muted = nextMuted;
    setIsMuted(nextMuted);

    /*
     * If playback was blocked earlier and the user interacts
     * with the sound button, try starting playback again.
     */
    if (!nextMuted && !isPlaying) {
      void audio.play().catch(() => {});
    }
  };

  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-label={isMuted ? "Turn wedding music on" : "Mute wedding music"}
      aria-pressed={isMuted}
      className="
        fixed
        right-5
        top-5
        z-[90]
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-[#F8F4EA]/30
        bg-[#30352B]/70
        text-[#F8F4EA]
        shadow-[0_8px_30px_rgba(0,0,0,0.18)]
        backdrop-blur-md
        transition-all
        duration-300
        hover:bg-[#30352B]/85
        active:scale-95
        sm:right-7
        sm:top-7
      "
    >
      <VolumeIcon muted={isMuted} />

      <span className="sr-only">
        {isMuted ? "Turn wedding music on" : "Mute wedding music"}
      </span>
    </button>
  );
}
