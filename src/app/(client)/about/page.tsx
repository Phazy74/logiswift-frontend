"use client";

import React from 'react';
import { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { Shield, Users, Lightbulb, Target, ArrowRight } from 'lucide-react';
import Counter from '../../../components/shared/Counter';
import { LocationsMap } from '../../../components/client/about/LocationsMap';

// Animation Variant for scrolling
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
}as const; 



export default function AboutPage() {
  return (
    <div className="bg-background text-foreground overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075" 
            className="w-full h-full object-cover"
            alt="Hero BG"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-2xl"
          >
            <p className="text-primary font-bold tracking-[0.4em] text-xs uppercase mb-4">Established 2009</p>
            <h1 className="text-5xl lg:text-8xl font-black leading-none mb-8 tracking-tighter">
              DRIVING <br /> LOGISTICS <br /> <span className="text-primary">FORWARD.</span>
            </h1>
            <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
              Connecting global markets through seamless, intelligent, and reliable supply chain infrastructure.
            </p>
            {/* CURVED BUTTON */}
            <button className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-blue-500 transition-all flex items-center gap-4 group shadow-xl shadow-primary/20">
              EXPLORE SOLUTIONS <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. EFFICIENCY STATS SECTION (Counting Numbers) */}
      <section className="relative z-20 -mt-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Years Experience', value: 15, suffix: '+' },
            { label: 'Shipments Delivered', value: 250, suffix: 'K+' },
            { label: 'Global Partners', value: 120, suffix: '+' },
            { label: 'On-Time Success', value: 99, suffix: '%' },
          ].map((s, i) => (
            <motion.div 
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="glass-card p-10 text-center rounded-[2rem] border-white/5 bg-background/60 backdrop-blur-3xl shadow-2xl"
            >
              <div className="text-5xl font-black text-primary mb-2 tracking-tighter">
                <Counter value={s.value} />{s.suffix}
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. OUR STORY */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="relative"
          >
             <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
             <img 
               src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070" 
               className="relative z-10 w-full h-[450px] object-cover rounded-[3rem] grayscale hover:grayscale-0 transition-all duration-700"
               alt="Warehouse Story"
             />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-8"
          >
            <h2 className="text-5xl font-black tracking-tighter">OUR STORY.</h2>
            <div className="w-20 h-1.5 bg-primary rounded-full" />
            <p className="text-gray-400 text-xl leading-relaxed">
              LogiSwift began with a simple mission: to provide businesses with logistics solutions they can rely on. Today, we serve a global network with state-of-the-art infrastructure.
            </p>
            <button className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Learn more about our heritage <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 4. OUR VALUES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div 
           initial="hidden" 
           whileInView="visible" 
           viewport={{ once: true }} 
           variants={fadeInUp}
        >
          <h2 className="text-sm font-bold text-primary tracking-[0.4em] mb-16 uppercase">Core Principles</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Reliability', icon: <Shield size={28} /> },
            { title: 'Integrity', icon: <Users size={28} /> },
            { title: 'Innovation', icon: <Lightbulb size={28} /> },
            { title: 'Customer First', icon: <Target size={28} /> },
          ].map((v, i) => (
            <motion.div 
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="p-10 glass-card border-white/5 rounded-[2.5rem] hover:bg-primary/5 transition-all group"
            >
              <div className="mb-8 text-primary group-hover:scale-110 transition-transform bg-primary/10 w-fit p-4 rounded-2xl">
                {v.icon}
              </div>
              <h4 className="font-black mb-4 text-xl tracking-tight uppercase">{v.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Delivering excellence through dedicated service standards.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. GLOBAL PRESENCE (Map Background) */}
      <section className="relative py-40 px-6">
        <div className="absolute inset-0 z-0 opacity-40">
           <LocationsMap />
           <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-7xl mx-auto relative z-10 text-center"
        >
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8">GLOBAL PRESENCE.</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12">
            Strategic hubs located in major trade corridors ensure your cargo moves through the fastest routes across the globe.
          </p>
          <button className="bg-primary text-white px-12 py-5 rounded-full font-bold shadow-2xl shadow-primary/40">
            VIEW HUB NETWORK
          </button>
        </motion.div>
      </section>
    </div>
  );
}