// src/app/layout.tsx
import { Toaster } from 'sonner'; // Add this import

import { Navbar } from "../components/client/navbar/Navbar";
import { Footer } from "../components/client/footer/footer";
import { ThemeProvider } from "../providers/ThemeProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // YOU MUST ADD THIS ATTRIBUTE HERE
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />  
        </ThemeProvider>
      </body>
    </html>
  );
}