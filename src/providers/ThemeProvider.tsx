"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="light" 
      forcedTheme="light" // 👈 This locks the site to light mode
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  );
}