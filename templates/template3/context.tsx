"use client";

import { createContext, useContext } from "react";
import type { Template3Config } from "./schema";

const Template3Context = createContext<Template3Config | null>(null);

export function Template3Provider({
  value,
  children,
}: {
  value: Template3Config;
  children: React.ReactNode;
}) {
  return <Template3Context.Provider value={value}>{children}</Template3Context.Provider>;
}

export function useTemplate3(): Template3Config {
  const value = useContext(Template3Context);
  if (!value) throw new Error("Template 3 rendered without its wedding config.");
  return value;
}
