"use client";

import { useEffect } from "react";
import { WeddingAssetScope } from "@/components/wedding-media";
import { SaveTheDate } from "./components/save-date/SaveTheDate";
import { WeddingMainContent } from "./components/WeddingMainContent";
import WeddingAudio from "./components/WeddingAudio";
import { Template3Provider } from "./context";
import type { Template3Config } from "./schema";
import "./styles/template.css";

export default function Template3({ wedding }: { wedding: Template3Config }) {
  useEffect(() => {
    const html = document.documentElement;
    const previousScroll = html.style.scrollBehavior;
    const previousBackground = html.style.background;
    html.style.scrollBehavior = "smooth";
    html.style.background = wedding.theme.browser;
    return () => {
      html.style.scrollBehavior = previousScroll;
      html.style.background = previousBackground;
    };
  }, [wedding.theme.browser]);

  return (
    <Template3Provider value={wedding}>
      <WeddingAssetScope slug={wedding.slug}>
        <div className="template-sage min-h-screen">
          <main className="relative min-h-screen overflow-x-hidden bg-[#F8F4EA]">
            <SaveTheDate />
            <WeddingMainContent />
            <WeddingAudio />
          </main>
        </div>
      </WeddingAssetScope>
    </Template3Provider>
  );
}
