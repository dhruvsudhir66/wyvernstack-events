"use client";

import { createContext, useContext } from "react";
import type { Template2Config } from "./schema";

const Template2Context = createContext<Template2Config | null>(null);

export function Template2Provider({
  value,
  children,
}: {
  value: Template2Config;
  children: React.ReactNode;
}) {
  return <Template2Context.Provider value={value}>{children}</Template2Context.Provider>;
}

export function useTemplate2(): Template2Config {
  const value = useContext(Template2Context);
  if (!value) throw new Error("Template 2 rendered without its wedding config.");
  return value;
}
