"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Package, Mail, Settings, 
  LogOut, PlusCircle, Bell, User 
} from 'lucide-react';
import { ThemeToggle } from '../../../components/shared/ThemeToggle';
import { useAuthStore } from '../../../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '/admin', icon: <LayoutDashboard size={20} /> },
  { name: 'Fleet', href: '/admin/shipments', icon: <Package size={20} /> },
  { name: 'New', href: '/admin/shipments/create', icon: <PlusCircle size={24} /> }, // Primary action
  { name: 'Inbox', href: '/admin/messages', icon: <Mail size={20} /> },
  { name: 'Config', href: '/admin/settings', icon: <Settings size={20} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { token, logout } = useAuthStore();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [token, router]);

  if (!isAuthorized) return null;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      
      {/* 1. DESKTOP SIDEBAR (Visible only on lg screens) */}
      <aside className="w-72 border-r border-glass-border bg-background hidden lg:flex flex-col sticky top-0 h-screen z-50">
        <div className="p-8">
          <Link href="/" className="text-2xl font-black italic tracking-tighter text-primary">LOGISWIFT</Link>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Admin Command</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${
                pathname === item.href ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-500 hover:bg-foreground/5'
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-glass-border">
          <button onClick={() => logout()} className="w-full flex items-center gap-4 p-4 text-red-500 hover:bg-red-500/10 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all">
            <LogOut size={18} /> Exit System
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 pb-24 lg:pb-0">
        
        {/* TOPBAR (Mobile & Desktop) */}
        <header className="h-16 lg:h-20 border-b border-glass-border flex items-center justify-between px-6 lg:px-8 bg-background/50 backdrop-blur-md sticky top-0 z-40">
           <div className="lg:hidden flex items-center gap-2">
              <span className="text-lg font-black italic text-primary">LS</span>
           </div>
           <h2 className="font-black text-[10px] uppercase tracking-[0.3em] opacity-40 hidden sm:block">
             Operations / {pathname.split('/').pop() || 'Overview'}
           </h2>
           
           <div className="flex items-center gap-3 lg:gap-4">
              <ThemeToggle />
              <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Bell size={18}/></button>
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-primary text-[10px] uppercase">AD</div>
           </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-6 lg:p-12">
           <AnimatePresence mode="wait">
             <motion.div
               key={pathname}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.2 }}
             >
               {children}
             </motion.div>
           </AnimatePresence>
        </main>
      </div>

      {/* 3. MOBILE BOTTOM NAVIGATION (Visible only on mobile/tablet) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-2xl border-t border-glass-border px-4 py-3 pb-safe-area-inset-bottom">
        <div className="flex justify-between items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`flex flex-col items-center gap-1 transition-all ${
                  isActive ? 'text-primary scale-110' : 'text-slate-500 opacity-60'
                }`}
              >
                <div className={`p-2 rounded-xl ${isActive ? 'bg-primary/10' : ''}`}>
                  {item.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-tighter">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

    </div>
  );
}