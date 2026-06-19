"use client";

import React, { useState } from 'react';
import { Variants } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Search, Truck, Globe, Shield, Plane, Ship, 
  Warehouse, Zap, BarChart3, Headphones 
} from 'lucide-react';

/**
 * ⚠️ FIX 1: Path Check
 * If this file is in src/app/page.tsx, the path to components is '../components'
 * Using '@/' alias is safer if configured in tsconfig.json
 */
import Counter from '../../components/shared/Counter';

// Animation variants - Fixed with space for 'as const'
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
}; // Removed the 'as const' here because typing it as Variants is sufficient

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2 } 
  }
};

export default function HomePage() {
  const [trackId, setTrackId] = useState("");
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackId.trim()) {
      router.push(`/tracking/${trackId.trim()}`);
    }
  };

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden px-6 pt-20">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075" className="absolute inset-0 w-full h-full object-cover" alt="Main Truck" />
          <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070" className="absolute right-0 top-0 w-2/3 h-full object-cover opacity-20 grayscale mix-blend-overlay hidden lg:block" alt="Fleet" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="space-y-8">
            <div className="flex items-center gap-3">
               <span className="w-12 h-[2px] bg-primary"></span>
               <p className="text-primary font-black tracking-[0.5em] text-[10px] uppercase">Elite Logistics Network</p>
            </div>
            <h1 className="text-6xl lg:text-[100px] font-black leading-[0.9] tracking-tighter uppercase">
              Global <br /> Reach. <br /> <span className="text-primary">Zero Limits.</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-md leading-relaxed font-medium">
              We don’t just ship cargo; we provide the <span className="text-white">infrastructure for global commerce.</span> Experience unmatched precision.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/quote" className="bg-primary text-white px-10 py-5 font-black text-xs tracking-widest rounded-full hover:bg-blue-600 transition-all shadow-2xl shadow-primary/30">
                GET AN INSTANT QUOTE
              </Link>
              <Link href="/services" className="glass-card px-10 py-5 font-black text-xs tracking-widest rounded-full hover:bg-foreground/5 transition-all text-foreground uppercase border border-white/10">
                Explore Fleet
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-12 rounded-[3.5rem] shadow-3xl backdrop-blur-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
            <h3 className="text-3xl font-black tracking-tighter mb-2">Live Tracking</h3>
            <p className="text-gray-400 text-sm mb-8 font-medium italic">Enter your identifier to visualize cargo movement.</p>
            <form onSubmit={handleTrack} className="relative">
              <input 
                type="text" 
                value={trackId} 
                onChange={(e) => setTrackId(e.target.value)} 
                placeholder="e.g. TRK-8829-XJ" 
                className="w-full bg-foreground/5 border border-glass-border rounded-3xl p-6 focus:outline-none focus:border-primary text-foreground placeholder:text-gray-600 font-bold pr-24 text-lg" 
              />
              <button type="submit" className="absolute right-2 top-2 bottom-2 bg-primary px-8 rounded-2xl hover:bg-blue-500 transition-colors text-white">
                <Search size={24} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="py-10 border-y border-white/5 bg-foreground/[0.02]">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-8">Trusted by Global Industry Leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-30 grayscale contrast-125">
               <span className="text-2xl font-black tracking-tighter">VOLVO</span>
               <span className="text-2xl font-black tracking-tighter">SAMSUNG</span>
               <span className="text-2xl font-black tracking-tighter">MAERSK</span>
               <span className="text-2xl font-black tracking-tighter">TESLA</span>
               <span className="text-2xl font-black tracking-tighter">AMAZON</span>
            </div>
         </div>
      </section>

      {/* 3. CORE SERVICES */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-20 text-center lg:text-left">
          <p className="text-primary font-black tracking-[0.4em] text-[10px] uppercase mb-4">Multi-Modal Infrastructure</p>
          <h2 className="text-5xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
            Engineered <br /> <span className="opacity-40">Efficiency.</span>
          </h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "AIR FREIGHT", icon: <Plane />, desc: "Next-day global delivery for time-critical high-value cargo." },
            { title: "OCEAN FREIGHT", icon: <Ship />, desc: "Scalable container solutions for intercontinental commerce." },
            { title: "ROAD NETWORK", icon: <Truck />, desc: "Precision last-mile delivery across established road corridors." },
            { title: "SMART WAREHOUSING", icon: <Warehouse />, desc: "AI-driven inventory management and automated fulfillment." },
          ].map((service, i) => (
            <motion.div key={i} variants={fadeInUp} className="p-12 glass-card rounded-[3rem] hover:bg-primary transition-all group cursor-pointer border border-white/5">
              <div className="text-primary group-hover:text-white mb-10 transition-colors scale-[1.8] w-fit origin-left">
                {service.icon}
              </div>
              <h4 className="text-xl font-black mb-4 group-hover:text-white uppercase tracking-tight">{service.title}</h4>
              <p className="text-sm text-gray-500 group-hover:text-white/70 leading-relaxed font-medium">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. THE ADVANTAGE SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-32 bg-primary/5 rounded-[4rem] border border-primary/10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
                <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">The LogiSwift <br /> Advantage.</h2>
                <div className="space-y-6">
                    <AdvantageItem icon={<Zap />} title="AI-Route Optimization" desc="Our neural networks calculate the fastest path, bypassing port congestion automatically." />
                    <AdvantageItem icon={<Shield />} title="Military-Grade Security" desc="Every shipment is monitored via encrypted satellite links with 100% insurance." />
                    <AdvantageItem icon={<BarChart3 />} title="Live Analytics" desc="Get deep insights into your supply chain health with our real-time dashboard." />
                </div>
            </div>
            <div className="relative">
                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070" className="rounded-[3rem] shadow-2xl grayscale" alt="Warehouse AI" />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay rounded-[3rem]" />
            </div>
        </div>
      </section>

      {/* 5. IMPACT STATS */}
      <section className="relative py-48">
        <div className="absolute inset-0 z-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070" className="w-full h-full object-cover grayscale" alt="Stats BG" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-background" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <StatBox label="Active Vessels" value={18} suffix="K" />
          <StatBox label="Countries Linked" value={195} suffix="+" />
          <StatBox label="Annual Revenue" value={4} suffix="B+" />
          <StatBox label="Success Rate" value={99} suffix=".9%" />
        </div>
      </section>

      {/* 6. SUPPORT CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
         <div className="glass-card p-16 rounded-[4rem] border border-white/5">
            <Headphones size={48} className="mx-auto text-primary mb-6 animate-pulse" />
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Need Assistance?</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-10 font-medium text-lg">Our strategy team is available 24/7 to solve your logistics complexities.</p>
            <Link href="/contact" className="text-primary font-black uppercase tracking-[0.3em] text-sm hover:underline decoration-2 underline-offset-8">
               Contact a Strategist
            </Link>
         </div>
      </section>

    </div>
  );
}

function AdvantageItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex gap-6 group">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                {icon}
            </div>
            <div>
                <h4 className="font-black text-lg uppercase tracking-tight text-white mb-1">{title}</h4>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function StatBox({ label, value, suffix }: { label: string, value: number, suffix: string }) {
    return (
        <div>
            <h3 className="text-6xl lg:text-9xl font-black text-primary mb-2 tracking-tighter">
                <Counter value={value} />{suffix}
            </h3>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.5em]">{label}</p>
        </div>
    );
}