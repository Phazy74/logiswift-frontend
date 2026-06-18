"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Ship, 
  Truck, 
  Warehouse, 
  ShieldCheck, 
  Zap, 
  Globe, 
  ArrowRight,
  Check
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'air',
    title: 'Air Freight',
    icon: <Plane size={32} />,
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069',
    desc: 'Priority air transport solutions for time-sensitive cargo. We ensure your goods reach any global destination within 48-72 hours.',
    features: ['Express Delivery', 'Real-time Tracking', 'Customs Clearance', 'Global Network']
  },
  {
    id: 'sea',
    title: 'Ocean Freight',
    icon: <Ship size={32} />,
    img: 'https://images.unsplash.com/photo-1494412552100-42e4e7a74ec6?q=80&w=2070',
    desc: 'Cost-effective sea transport for large volumes. Our LCL and FCL services provide flexibility for any shipment size.',
    features: ['Full Container (FCL)', 'Shared Container (LCL)', 'Port-to-Door', 'Marine Insurance']
  },
  {
    id: 'road',
    title: 'Road Transport',
    icon: <Truck size={32} />,
    img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075',
    desc: 'Modern fleet covering cross-border routes. Our GPS-monitored trucks provide the safest last-mile delivery solution.',
    features: ['Cross-border Logistics', 'Temperature Control', 'Heavy Haulage', 'Local Distribution']
  },
  {
    id: 'warehouse',
    title: 'Warehousing',
    icon: <Warehouse size={32} />,
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070',
    desc: 'Smart storage and inventory management. Our automated facilities ensure your products are safe and ready for dispatch.',
    features: ['Inventory Control', 'Pick & Pack', 'Secure Storage', 'E-commerce Fulfillment']
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

export default function ServicesPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-32 overflow-x-hidden">
      
      {/* 1. HERO SECTION - Blended Background */}
      <section className="relative min-h-[70vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?q=80&w=2070" 
            className="w-full h-full object-cover"
            alt="Cargo Plane"
          />
          {/* Edge Blending Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <motion.div {...fadeInUp} className="max-w-2xl">
            <p className="text-primary font-black tracking-[0.4em] text-xs uppercase mb-4 underline underline-offset-8">Global Expertise</p>
            <h1 className="text-5xl lg:text-8xl font-black tracking-tighter leading-none mb-8">
              LOGISTICS <br /> WITHOUT <span className="text-primary">LIMITS.</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-lg mb-10 leading-relaxed">
              We provide a full spectrum of logistics services designed to optimize your supply chain and drive business growth.
            </p>
            <Link href="/quote" className="bg-primary text-white px-10 py-4 rounded-full font-bold shadow-2xl shadow-primary/30 inline-block hover:scale-105 transition-all">
              Request a Custom Plan
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. CORE SERVICES LIST */}
      <section className="max-w-7xl mx-auto px-6 py-32 space-y-32">
        {services.map((service, i) => (
          <motion.div 
            key={service.id}
            {...fadeInUp}
            className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Image Side with Fade */}
            <div className={`relative h-[500px] rounded-[3rem] overflow-hidden group ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <img src={service.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={service.title} />
              {/* Radial and Linear Blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className={`absolute inset-0 bg-gradient-to-${i % 2 !== 0 ? 'l' : 'r'} from-background via-transparent to-transparent`} />
            </div>

            {/* Text Side */}
            <div className="space-y-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                {service.icon}
              </div>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase">{service.title}</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {service.desc}
              </p>
              
              <ul className="grid grid-cols-2 gap-4">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-bold text-gray-500">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <button className="flex items-center gap-2 text-primary font-bold group">
                LEARN MORE <ArrowRight size={18} className="group-hover:translate-x-2 transition-all" />
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 3. WHY CHOOSE US (Value Prop) */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-white/5 border border-white/10 rounded-[4rem] p-12 lg:p-24 relative overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-3 gap-16 text-center">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500 mb-6"><Zap /></div>
              <h4 className="text-xl font-bold">Fastest Routes</h4>
              <p className="text-gray-500 text-sm">Automated route optimization ensures zero-waste travel time.</p>
            </div>
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6"><ShieldCheck /></div>
              <h4 className="text-xl font-bold">Full Insurance</h4>
              <p className="text-gray-500 text-sm">Every shipment is backed by a comprehensive protection plan.</p>
            </div>
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-500 mb-6"><Globe /></div>
              <h4 className="text-xl font-bold">Global Presence</h4>
              <p className="text-gray-500 text-sm">Direct access to hubs in over 195 countries worldwide.</p>
            </div>
          </div>
          {/* Background decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-6 pt-32">
        <motion.div 
          {...fadeInUp}
          className="bg-primary p-16 lg:p-24 rounded-[4rem] text-center shadow-3xl shadow-primary/40 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-none">Ready to Move <br /> Your Business?</h2>
            <p className="text-white/70 mb-12 max-w-lg mx-auto font-medium text-lg">
              Get a customized logistics plan and a free quote from our global strategy team within 24 hours.
            </p>
            <Link href="/quote" className="bg-white text-primary px-12 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all inline-block shadow-2xl">
              Get a Free Quote
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
        </motion.div>
      </section>

    </div>
  );
}