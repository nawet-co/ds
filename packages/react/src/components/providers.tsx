"use client";

import type { ReactNode } from "react";

import { TooltipProvider } from "./tooltip";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <TooltipProvider>{children}</TooltipProvider>
);
