"use client";

import { useEffect, useState } from "react";

import Hero from "./Hero";
import Countdown from "./Countdown";
import MeetTheBride from "./MeetTheBride";
import MeetTheGroom from "./MeetTheGroom";
import OurStory from "./OurStory";
import Gallery from "./Gallery";
import Venue from "./Venue";
import Footer from "./Footer";

export function WeddingMainContent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpenInvitation = () => {
      /*
       * Reset the page position instantly.
       *
       * We do this BEFORE revealing the wedding content,
       * so the user never sees the page scrolling to the top.
       */
      const html = document.documentElement;
      const body = document.body;

      const previousScrollBehavior = html.style.scrollBehavior;

      html.style.scrollBehavior = "auto";

      window.scrollTo(0, 0);
      html.scrollTop = 0;
      body.scrollTop = 0;

      /*
       * Reveal the wedding content only after the viewport
       * is already positioned at the Hero section.
       */
      setIsOpen(true);

      /*
       * Restore the original scroll behaviour after the
       * browser has processed the position reset.
       */
      requestAnimationFrame(() => {
        html.style.scrollBehavior = previousScrollBehavior;
      });
    };

    window.addEventListener("wedding:open-invitation", handleOpenInvitation);

    return () => {
      window.removeEventListener(
        "wedding:open-invitation",
        handleOpenInvitation,
      );
    };
  }, []);

  return (
    <main
      id="wedding-content"
      className={`
        relative
        w-full
        overflow-hidden
        bg-[#F8F4EA]
        transition-[opacity,transform,visibility]
        duration-[1100ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible translate-y-5 opacity-0"
        }
      `}
    >
      <Hero />
      <Countdown />
      <MeetTheBride />
      <MeetTheGroom />
      <OurStory />
      <Gallery />
      <Venue />
      <Footer />
    </main>
  );
}
