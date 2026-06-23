"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '../../../components/shared/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../../../components/shared/Logo';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Resources', href: '/resources' },
  { name: 'Tracking', href: '/tracking' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      {/* MAIN HEADER (h-16) */}
      <header className="sticky top-0 z-[100] w-full bg-background/95 backdrop-blur-md border-b border-slate-100 dark:border-white/5 h-16 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          
          <Link href="/">
            <Logo />
          </Link>

          {/* Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all hover:text-primary ${
                  pathname === link.href ? 'text-primary' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            
            <Link 
              href="/quote" 
              className="hidden md:flex items-center bg-primary text-white px-6 py-2.5 rounded-none font-black text-[9px] tracking-widest uppercase hover:bg-blue-700 shadow-lg shadow-primary/10"
            >
              Get a Quote
            </Link>

            <button 
              className="lg:hidden p-2 text-slate-900 dark:text-white" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* COMPACT FLOATING MENU (Reduced Height) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click-away Backdrop (Invisible but covers screen) */}
            <div 
              className="fixed inset-0 z-[90] lg:hidden" 
              onClick={() => setIsOpen(false)} 
            />

            {/* The Compact Menu Card */}
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-16 right-4 w-[280px] z-[100] bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-white/10 lg:hidden flex flex-col rounded-none"
            >
              <div className="p-4 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                 
                 <ThemeToggle />
              </div>

              {/* Height is dynamic based on content (h-auto) */}
              <div className="py-2 flex flex-col">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className={`flex items-center justify-between px-6 py-4 transition-all ${
                      pathname === link.href 
                      ? 'bg-primary/5 text-primary' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-widest">{link.name}</span>
                    <ChevronRight size={14} className={pathname === link.href ? 'text-primary' : 'opacity-20'} />
                  </Link>
                ))}
              </div>

              <div className="p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5">
                <Link 
                  href="/quote"
                  className="flex items-center justify-center w-full bg-primary text-white py-4 rounded-none font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20"
                >
                  Request Quote <ArrowRight className="ml-2" size={14} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};