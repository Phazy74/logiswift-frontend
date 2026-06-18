"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ALL_RESOURCES } from '../../../../constants/resourceData';
import { ArrowLeft, Calendar, Share2, Clock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ArticleDetail() {
  const params = useParams();
  const router = useRouter();
  
  // Find article by slug
  const article = ALL_RESOURCES.find(item => item.slug === params.slug);

  if (!article) {
    return <div className="p-40 text-center font-bold">Article Not Found.</div>;
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      
      {/* 1. ARTICLE HERO */}
      <section className="relative h-[70vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={article.img} className="w-full h-full object-cover" alt={article.title} />
          {/* Multi-directional blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-primary font-black text-xs tracking-widest mb-10 hover:gap-4 transition-all"
          >
            <ArrowLeft size={16} /> BACK TO RESOURCES
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="bg-primary text-white text-[10px] font-black px-5 py-1.5 rounded-full mb-6 inline-block uppercase tracking-widest">
              {article.tag}
            </span>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-8 uppercase">
              {article.title}
            </h1>
            <div className="flex gap-8 text-gray-300 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2 text-primary"><Calendar size={14} /> {article.date}</span>
              <span className="flex items-center gap-2"><Clock size={14} /> 5 MIN READ</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CONTENT AREA */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-4 gap-16">
          
          {/* Sidebar / Social */}
          <div className="hidden lg:block space-y-8">
            <div className="sticky top-32">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Share Insights</p>
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <button key={i} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition-all group">
                    <Share2 size={18} className="group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Body */}
          <div className="lg:col-span-3">
            <div className="prose prose-invert max-w-none">
              <p className="text-2xl text-gray-300 leading-relaxed font-medium mb-12 italic border-l-4 border-primary pl-8">
                {article.desc}
              </p>
              <div className="text-gray-400 text-xl leading-[1.8] whitespace-pre-line space-y-6">
                {article.content}
              </div>
            </div>

            {/* Author Card */}
            <div className="mt-20 p-10 bg-white/5 rounded-[3rem] border border-white/5 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center font-black text-white text-xl">LS</div>
              <div>
                <p className="text-lg font-black uppercase tracking-tight">LogiSwift Editorial</p>
                <p className="text-sm text-primary font-bold">Global Logistics Analysts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CTA BOX */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-primary p-16 rounded-[4rem] text-center relative overflow-hidden shadow-3xl shadow-primary/40">
           <div className="relative z-10">
             <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase leading-none">Ready to Optimize <br /> Your Logistics?</h2>
             <p className="text-white/70 mb-10 max-w-md mx-auto font-medium">Contact our strategy team for a customized supply chain audit and performance review.</p>
             <Link href="/quote" className="bg-white text-primary px-12 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all inline-block shadow-2xl">
                Get a Free Quote
             </Link>
           </div>
           {/* Background decorative glow */}
           <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-[100px]" />
        </div>
      </section>

    </div>
  );
}