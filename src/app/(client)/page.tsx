"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Warehouse, Plane, Ship, Truck, Check, 
  Star, Quote, ArrowRight, Search, Globe, 
  Clock, Headphones, BarChart3, Zap, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- 1. LOCAL COMPONENT: INTERNAL COUNTER ---
function LocalCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value]);
  return <span ref={ref}>{count}</span>;
}

export default function HomePage() {
  const router = useRouter();
  const [trackId, setTrackId] = useState("");
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackId.trim()) router.push(`/tracking/${trackId.trim()}`);
  };

  const reviews = [
    { name: "Marko Smith", role: "Aify Agency", text: "Ocean Gate Shipping Logistics International customer service is some of the best we have ever had. We like to ship as much as possible." },
    { name: "Sarah Jenkins", role: "Tesla Supply", text: "Their digital tracking saves us hours of manual work every single week. Highly precise and extremely reliable." },
    { name: "Marcus Thorne", role: "Global Corp", text: "Truly a partner, not just a vendor. Their speed in clearing customs is revolutionary and saved us thousands." },
  ];

  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx(prev => (prev + 1) % reviews.length), 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <div className="bg-background text-foreground overflow-x-hidden w-full transition-colors duration-300">
      
      {/* SECTION 1: HERO & PILL TRACKING BAR */}
      <section className="relative min-h-screen flex items-center pt-24 pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070" className="w-full h-full object-cover grayscale opacity-30 dark:opacity-20" alt="Warehouse" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-30 w-full">
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration: 0.8}} className="max-w-4xl space-y-10">
            <p className="text-primary font-black tracking-[0.4em] text-[11px] uppercase border-l-4 border-primary pl-4">Flexible, Improved and Accelerated Solutions</p>
            <h1 className="text-5xl sm:text-7xl lg:text-[100px] font-black leading-[0.95] tracking-tighter uppercase text-slate-950 dark:text-white">
              Full Sustainable <br /> <span className="text-primary">Cargo Solutions!</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl font-medium leading-relaxed">
              Representative logistics operator providing full range of service in the sphere of customs clearance and transportation worldwide.
            </p>

            {/* RESPONSIVE TRACKING BAR (THE ONLY CURVED COMPONENT) */}
<form 
  onSubmit={handleTrack} 
  className="relative z-50 flex flex-col sm:flex-row items-center w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-full p-2 shadow-2xl border-4 border-white dark:border-white/5 mt-10 transition-all"
>
  <div className="relative flex-1 w-full">
    {/* Search Icon */}
    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary">
      <Search size={20} />
    </div>

    {/* Input Field */}
    <input 
      type="text" 
      value={trackId}
      onChange={(e) => setTrackId(e.target.value)}
      placeholder="Enter tracking code..." 
      className="w-full pl-16 pr-6 py-5 bg-transparent outline-none font-bold text-slate-800 dark:text-white placeholder:text-slate-400 text-lg sm:text-xl" 
    />
  </div>

  {/* Button - Full width on mobile, pill width on desktop */}
  <button 
    type="submit" 
    className="w-full sm:w-auto bg-primary text-white px-10 py-5 sm:py-4 font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-3 rounded-[1.5rem] sm:rounded-full mt-2 sm:mt-0"
  >
    Track <ArrowRight size={20} />
  </button>
</form>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: QUICK SERVICES (SHARP) */}
      <section className="relative z-40 -mt-12 lg:-mt-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 shadow-2xl bg-white dark:bg-slate-950 border-t-4 border-primary">
          {[
            { t: "Warehousing Services", icon: <Warehouse />, active: true },
            { t: "Air Freight Services", icon: <Plane />, active: false },
            { t: "Ocean Freight Services", icon: <Ship />, active: false },
            { t: "Road Freight Services", icon: <Truck />, active: false },
          ].map((item, i) => (
            <div key={i} className={`p-12 flex flex-col items-center text-center gap-4 transition-all cursor-pointer border-r border-slate-100 dark:border-white/5 last:border-0 ${item.active ? 'bg-primary text-white' : 'bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5'}`}>
              <div className={`${item.active ? 'text-white' : 'text-primary'} scale-[1.5]`}>{item.icon}</div>
              <h4 className="font-black text-lg uppercase tracking-tight leading-tight">{item.t}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: ABOUT SUMMARY (SHARP) */}
      <section className="max-w-7xl mx-auto px-6 py-40 grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1200" className="w-full h-[600px] object-cover rounded-none" alt="Forklift" />
          <div className="absolute bottom-10 -right-4 lg:-right-10 bg-primary p-12 text-white shadow-2xl text-center min-w-[240px] rounded-none">
             <div className="mb-2 flex justify-center"><Warehouse size={40} /></div>
             <h3 className="text-6xl font-black mb-1"><LocalCounter value={355} />m</h3>
             <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Delivered Goods</p>
          </div>
        </div>
        <div className="space-y-8">
          <p className="text-primary font-bold text-xs uppercase tracking-[0.3em] border-l-4 border-primary pl-4">Reliable Logistic Solutions</p>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-[1.1] text-slate-950 dark:text-white">Reliable Logistic & Transport Solutions Saves Your Time!</h2>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg font-medium">LogiSwift Shipping is a representative logistics operator providing full range of service in the sphere of customs clearance worldwide.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
            <div className="space-y-3">
              <h4 className="font-black uppercase text-sm text-slate-950 dark:text-white border-l-4 border-primary pl-4">Quality</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Following the quality of our service thus having gained trust of our many clients.</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-black uppercase text-sm text-slate-950 dark:text-white border-l-4 border-primary pl-4">Reliability</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">We provide with cargo safety throughout all the stages of our delivery process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: MULTINATIONAL SERVICES GRID (SHARP) */}
      <section className="bg-slate-50 dark:bg-slate-900/30 py-40">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-10 items-end mb-24">
              <div className="space-y-4">
                <p className="text-primary font-black text-[11px] uppercase tracking-[0.4em]">Safe & Reliable Cargo Solutions!</p>
                <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none text-slate-950 dark:text-white">Managing Logistics For <br /> Multinational Companies.</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 max-w-md font-medium text-lg">Our global logistics expertise and advanced supply chain technology help you analyze and implement successful strategies.</p>
           </div>
           <div className="grid md:grid-cols-3 border border-slate-100 dark:border-white/5">
              {[
                { t: "Air Freight Services", icon: <Plane />, d: "Comprehensive service in the sphere of urgent, valuable, or fragile cargoes worldwide." },
                { t: "Ocean Freight Services", icon: <Ship />, d: "Basic conditions for international sea transportation implemented by our global carriers." },
                { t: "Road Freight Services", icon: <Truck />, d: "Wide range of transportation services including quality international road distribution." },
              ].map((serv, i) => (
                <div key={i} className="bg-white dark:bg-slate-950 p-16 border-r last:border-0 border-slate-100 dark:border-white/5 hover:bg-primary group transition-all cursor-pointer">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-white/5 text-primary flex items-center justify-center mb-10">
                    {serv.icon}
                  </div>
                  <h4 className="text-2xl font-black text-slate-950 dark:text-white uppercase mb-6 tracking-tight">{serv.t}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium group-hover:text-white/80 mb-10">{serv.d}</p>
                  <div className="w-12 h-1 bg-primary group-hover:bg-white transition-all"></div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* SECTION 5: BLUE BANNER (SHARP) */}
      <section className="bg-primary py-32 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10"><Globe size={500}/></div>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-6">
            <p className="font-bold text-[10px] uppercase tracking-[0.5em] opacity-80 underline underline-offset-8 decoration-2 text-white">Directions, That Matter!</p>
            <h2 className="text-5xl lg:text-[80px] font-black tracking-tighter uppercase leading-[0.9]">Digital Freight <br /> That Saves <br /> Your Time!</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {["Quality Control System", "100% Satisfaction Guarantee", "Highly Professional Staff", "Unrivalled Workmanship", "Accurate Testing Processes", "Professional And Qualified"].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-6 h-6 bg-white/20 flex items-center justify-center shrink-0">
                  <Check size={14} className="text-white" strokeWidth={4} />
                </div>
                <span className="text-sm font-black uppercase tracking-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: FEATURED PROJECTS (SHARP) */}
      <section className="py-40 bg-white dark:bg-background">
         <div className="max-w-7xl mx-auto px-6 text-center mb-24">
            <p className="text-primary font-black text-[10px] uppercase tracking-widest mb-4">Explore Recent Works</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase text-slate-950 dark:text-white">Featured Projects</h2>
         </div>
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-0">
            {[
              { t: "Chemical Factory", tag: "Analytics, Optimization", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80" },
              { t: "Warehouse Inventory", tag: "Warehousing, Distribution", img: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80" },
              { t: "Minimize Manufacturing", tag: "Logistics, Analytics", img: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?q=80" },
            ].map((p, i) => (
              <div key={i} className="group border border-slate-100 dark:border-white/5">
                <div className="h-[350px] overflow-hidden relative">
                   <img src={p.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Project" />
                   <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all" />
                </div>
                <div className="p-10">
                    <h4 className="text-xl font-black uppercase text-slate-900 dark:text-white">{p.t}</h4>
                    <p className="text-primary text-[10px] font-bold uppercase mt-2 mb-6 tracking-widest">{p.tag}</p>
                    <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] tracking-widest uppercase hover:text-primary transition-colors cursor-pointer">
                    Explore Case Study <ArrowRight size={14}/>
                    </div>
                </div>
              </div>
            ))}
         </div>
      </section>

      {/* SECTION 7: PARTNERS LOGOS (HIGH VISIBILITY) */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/10 border-y border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 grayscale dark:invert transition-all opacity-40 hover:opacity-100">
             <span className="text-3xl font-black tracking-tighter">VOLVO</span>
             <span className="text-3xl font-black tracking-tighter">MAERSK</span>
             <span className="text-3xl font-black tracking-tighter">SAMSUNG</span>
             <span className="text-3xl font-black tracking-tighter">DHL</span>
             <span className="text-3xl font-black tracking-tighter">TESLA</span>
           </div>
        </div>
      </section>

      {/* SECTION 8: TESTIMONIALS (PLAN. SECTION) */}
      <section className="bg-white dark:bg-background py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8 relative">
            <p className="text-primary font-bold text-xs uppercase tracking-widest">What Our Clients Say!</p>
            <h2 className="text-5xl lg:text-[100px] font-black tracking-tighter uppercase leading-[0.85] text-slate-950 dark:text-white relative z-10">
               Individually <br /> Assess Each <br /> <span className="text-primary">PLAN.</span>
            </h2>
            <span className="absolute left-0 bottom-0 text-[200px] font-black text-slate-50 dark:text-white/[0.02] -z-10 leading-none select-none">WHAT</span>
            <Link href="/contact" className="inline-flex items-center justify-center bg-slate-900 dark:bg-primary text-white px-10 py-5 font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
              Connect With Us <ArrowRight className="ml-3" size={16} />
            </Link>
          </div>

          <div className="relative bg-white dark:bg-slate-950 p-12 lg:p-24 shadow-2xl border border-slate-100 dark:border-white/10 overflow-hidden min-h-[550px] flex flex-col justify-center">
            <Quote className="absolute -right-4 -bottom-4 text-slate-50 dark:text-white/[0.03] scale-[6]" size={100} />
            <AnimatePresence mode="wait">
              <motion.div key={testimonialIdx} initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="relative z-10">
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />)}
                </div>
                <p className="text-slate-800 dark:text-slate-200 text-2xl lg:text-3xl leading-relaxed mb-12 italic font-medium">
                  "{reviews[testimonialIdx].text}"
                </p>
                <div>
                    <p className="font-black text-slate-950 dark:text-white uppercase text-xl leading-none">{reviews[testimonialIdx].name}</p>
                    <p className="text-primary text-[11px] font-bold uppercase mt-2 tracking-widest">{reviews[testimonialIdx].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-4 mt-16 relative z-20">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)} className={`h-1.5 transition-all duration-300 rounded-none ${testimonialIdx === i ? 'w-20 bg-primary' : 'w-8 bg-slate-200 dark:bg-white/10'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}