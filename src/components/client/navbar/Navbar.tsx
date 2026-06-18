"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '../../.././components/shared/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Tracking', href: '/tracking' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Resources', href: '/resources' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <>
      {/* 
         MAIN HEADER 
         z-[100] ensures it stays above the page content.
      */}
      <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          {/* 1. LOGO */}
          <Link href="/" className="text-2xl font-black italic tracking-tighter text-primary">
            LOGISWIFT
          </Link>

          {/* 2. DESKTOP NAV LINKS (Center) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-xs font-bold uppercase tracking-widest text-foreground/60 hover:text-primary transition-all underline-offset-8 hover:underline"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 3. DESKTOP ACTIONS (Right) */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <Link 
              href="/quote" 
              className="hidden md:flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-none font-bold text-[10px] tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-primary/20"
            >
              GET A QUOTE <ArrowRight size={14} />
            </Link>

            {/* HAMBURGER TOGGLE (Mobile only) */}
            <button 
              className="lg:hidden p-2 text-foreground transition-transform active:scale-90"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* 
         MOBILE MENU OVERLAY
         z-[1000] ensures it sits ABOVE the navbar and the homepage content.
      */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            /* 
               IMPORTANT: 'bg-background' must be a SOLID hex in globals.css. 
               This is what stops the "bleeding" effect.
            */
            className="fixed inset-0 z-[1000] bg-background w-full h-screen lg:hidden flex flex-col"
          >
            {/* Mobile Menu Header (Logo + Close Button) */}
            <div className="h-20 px-6 flex justify-between items-center border-b border-white/5">
              <span className="text-2xl font-black italic tracking-tighter text-primary">
                LOGISWIFT
              </span>
              <button onClick={() => setIsOpen(false)} className="p-2 text-foreground">
                <X size={28} />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex flex-col p-6 space-y-2 overflow-y-auto">
              
              
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="flex justify-between items-center p-5 rounded-none bg-foreground/5 hover:bg-primary/10 border-l-4 border-transparent hover:border-primary transition-all"
                >
                  <span className="text-2xl font-black text-foreground uppercase tracking-tight">
                    {link.name}
                  </span>
                  <ChevronRight size={20} className="text-primary" />
                </Link>
              ))}

              {/* Mobile Action Button */}
              <div className="pt-10">
                <Link 
                  href="/quote"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full bg-primary py-6 rounded-none font-black text-white text-lg tracking-widest shadow-2xl shadow-primary/30"
                >
                  GET A QUOTE
                </Link>
              </div>
            </div>

            {/* Mobile Menu Footer */}
            <div className="mt-auto p-10 border-t border-white/5 text-center">
               <p className="text-xs text-gray-500 font-medium">Fast. Reliable. Everywhere.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};