"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TrackingPage() {
  const [id, setId] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (id.trim()) router.push(`/tracking/${id}`);
  };

  return (
    <div className="bg-background min-h-screen text-foreground pb-20">
      {/* 1. HERO SEARCH SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <p className="text-primary font-black tracking-[0.4em] text-xs uppercase">Real-Time Updates</p>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
              Complete <br /> <span className="text-primary">Visibility.</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Enter your unique tracking number to monitor your cargo's journey across the globe.
            </p>

            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto pt-8">
          <div className="relative flex items-center w-full">
         <input 
         type="text" 
         value={id}
         onChange={(e) => setId(e.target.value)}
         placeholder="Enter Tracking ID" 
         className="w-full bg-foreground/5 border border-glass-border rounded-full py-5 pl-10 pr-40 text-lg font-bold focus:outline-none focus:border-primary transition-all text-foreground"
         />
         <button 
         type="submit" 
         className="absolute right-2 top-2 bottom-2 bg-primary text-white px-8 rounded-full font-black hover:bg-blue-600 transition-all flex items-center gap-2"
         >
          TRACK <Search size={18} />
         </button>
          </div>
         </form>
          </motion.div>
        </div>

        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Package />, t: "Enter Tracking ID", d: "Find your code on your shipping receipt or email." },
            { icon: <MapPin />, t: "Live Map View", d: "See the exact GPS location of your cargo on the map." },
            { icon: <CheckCircle2 />, t: "Instant Delivery", d: "Get notified the moment your cargo arrives." },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card p-10 rounded-[2.5rem] border-white/5 hover:border-primary/20 transition-all text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                {item.icon}
              </div>
              <h4 className="text-xl font-black mb-3 uppercase tracking-tight">{item.t}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{item.d}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export {};