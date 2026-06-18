// src/providers/ThemeProvider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // We use a simple state check to ensure we only render the provider 
  // after the initial mount if the error persists, 
  // but usually, suppressHydrationWarning is enough.
  
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={true}
    >
      {children}
    </NextThemesProvider>
  );
}