"use client";

import { useEffect } from "react";
import { WeddingAssetScope } from "@/components/wedding-media";
import { mediaUrl } from "@/lib/assets";
import WeddingInvitation from "./components/WeddingInvitation";
import { Template1Provider } from "./context";
import type { Template1Config } from "./schema";
import "./styles/template.css";

export default function Template1({ wedding }: { wedding: Template1Config }) {
  useEffect(() => {
    const html = document.documentElement;
    const previousScroll = html.style.scrollBehavior;
    const previousBackground = html.style.background;
    html.style.scrollBehavior = "smooth";
    html.style.background = "#f2ede2";
    return () => {
      html.style.scrollBehavior = previousScroll;
      html.style.background = previousBackground;
    };
  }, []);

  const paper = mediaUrl(wedding.slug, wedding.assets.paperTexture);
  const countdown = mediaUrl(wedding.slug, wedding.assets.countdownPaper);

  return (
    <Template1Provider value={wedding}>
      <WeddingAssetScope slug={wedding.slug}>
        <div
          className="template-paper min-h-screen"
          style={{
            ["--paper-texture" as string]: `url("${paper}")`,
            ["--countdown-paper" as string]: `url("${countdown}")`,
          }}
        >
          <WeddingInvitation />
        </div>
      </WeddingAssetScope>
    </Template1Provider>
  );
}
