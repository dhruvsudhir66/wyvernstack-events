"use client";

import { useEffect } from "react";
import { WeddingAssetScope } from "@/components/wedding-media";
import SmoothScroll from "./components/layout/SmoothScroll";
import WeddingExperience from "./components/wedding/WeddingExperience";
import { Template2Provider } from "./context";
import type { Template2Config } from "./schema";
import "./styles/template.css";

export default function Template2({ wedding }: { wedding: Template2Config }) {
  useEffect(() => {
    const html = document.documentElement;
    const previousScroll = html.style.scrollBehavior;
    const previousBackground = html.style.background;
    html.style.scrollBehavior = "auto";
    html.style.background = "#f7f3ed";
    return () => {
      html.style.scrollBehavior = previousScroll;
      html.style.background = previousBackground;
    };
  }, []);

  return (
    <Template2Provider value={wedding}>
      <WeddingAssetScope slug={wedding.slug}>
        <div className="template-pink min-h-screen">
          <SmoothScroll>
            <WeddingExperience />
          </SmoothScroll>
        </div>
      </WeddingAssetScope>
    </Template2Provider>
  );
}
