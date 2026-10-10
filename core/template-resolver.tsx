"use client";

import Template1 from "@/templates/template1/Template";
import Template2 from "@/templates/template2/Template";
import Template3 from "@/templates/template3/Template";
import type { WeddingConfig } from "./wedding-base";

export default function WeddingTemplate({ wedding }: { wedding: WeddingConfig }) {
  switch (wedding.template) {
    case "template1":
      return <Template1 wedding={wedding} />;
    case "template2":
      return <Template2 wedding={wedding} />;
    case "template3":
      return <Template3 wedding={wedding} />;
    default: {
      const unreachable: never = wedding;
      return unreachable;
    }
  }
}
