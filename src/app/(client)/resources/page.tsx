"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FileText, 
  BookOpen, 
  Lightbulb, 
  Newspaper, 
  LayoutGrid, 
  ChevronRight, 
  CheckCircle2 
} from 'lucide-react';
import { ALL_RESOURCES } from '../../../constants/resourceData';

const categories = [
  { name: 'All Resources', icon: <LayoutGrid size={14} />, active: true },
  { name: 'Blog Articles', icon: <FileText size={14} />, active: false },
  { name: 'Guides', icon: <BookOpen size={14} />, active: false },
  { name: 'Case Studies', icon: <Lightbulb size={14} />, active: false },
  { name: 'News', icon: <Newspaper size={14} />, active: false },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function ResourcesPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-20">
      
      {/* 1. HERO SECTION - Blended Picture */}
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div {...fadeInUp} className="space-y-6">
            <p className="text-primary font-bold tracking-[0.3em] text-xs uppercase">Knowledge Base</p>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tighter uppercase">
              Insights That Keep <br /> You <span className="text-primary">Moving Ahead.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              Explore our expert resources to stay informed and make smarter logistics decisions.
            </p>
          </motion.div>

          <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full -z-10 lg:relative lg:z-0">
            <img 
              src="https://images.unsplash.com/photo-1494412552100-42e4e7a74ec6?q=80&w=2070" 
              className="w-full h-full object-cover"
              alt="Resource Hero"
            />
            {/* Smooth Blending Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTERS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat, i) => (
            <button 
              key={i}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                cat.active 
                ? 'bg-primary border-primary text-white shadow-xl shadow-primary/30' 
                : 'bg-white/5 border-white/10 text-gray-500 hover:border-primary/50'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* 3. FEATURED RESOURCES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-black tracking-tighter mb-12 uppercase">Featured Content</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_RESOURCES.map((item, i) => (
            <motion.div 
              key={i}
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/resources/${item.slug}`}>
                <div className="h-64 rounded-[2.5rem] overflow-hidden mb-6 relative">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                </div>
                <p className="text-primary font-bold text-[10px] tracking-widest mb-3 uppercase">{item.tag}</p>
                <h3 className="text-xl font-black mb-4 leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-2">{item.desc}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-primary group-hover:gap-4 transition-all">
                  READ ARTICLE <ChevronRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. LATEST ARTICLES LIST */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-2xl font-black tracking-tighter mb-12 uppercase">Latest Updates</h2>
        <div className="space-y-4">
          {ALL_RESOURCES.map((article, i) => (
            <Link href={`/resources/${article.slug}`} key={i}>
              <motion.div 
                {...fadeInUp}
                className="flex items-center justify-between p-6 bg-white/5 rounded-[2rem] border border-white/5 hover:bg-primary/10 hover:border-primary/20 transition-all group mb-4"
              >
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  <span className="font-bold text-lg group-hover:text-primary transition-colors">{article.title}</span>
                </div>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest hidden md:block">{article.date}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}