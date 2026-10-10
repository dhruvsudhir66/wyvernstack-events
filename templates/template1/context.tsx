"use client";

import { createContext, useContext } from "react";
import type { Template1Config } from "./schema";

const Template1Context = createContext<Template1Config | null>(null);

export function Template1Provider({
  value,
  children,
}: {
  value: Template1Config;
  children: React.ReactNode;
}) {
  return <Template1Context.Provider value={value}>{children}</Template1Context.Provider>;
}

export function useTemplate1(): Template1Config {
  const value = useContext(Template1Context);
  if (!value) throw new Error("Template 1 rendered without its wedding config.");
  return value;
}
