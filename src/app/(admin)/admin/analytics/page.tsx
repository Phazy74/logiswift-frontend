"use client";

import React from 'react';
import { BarChart3, TrendingUp, Globe, Zap } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Fleet Analytics</h1>
        <p className="text-slate-400 font-medium text-sm italic">Statistical breakdown of global cargo movements.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-white/5 p-10 rounded-[3rem] border border-slate-100 dark:border-white/5 h-80 flex items-center justify-center">
           <BarChart3 className="text-primary opacity-20" size={80} />
           <p className="absolute font-black uppercase tracking-widest text-xs opacity-40">Volume distribution coming soon</p>
        </div>
        <div className="bg-white dark:bg-white/5 p-10 rounded-[3rem] border border-slate-100 dark:border-white/5 h-80 flex items-center justify-center">
           <TrendingUp className="text-primary opacity-20" size={80} />
           <p className="absolute font-black uppercase tracking-widest text-xs opacity-40">Revenue Growth Matrix</p>
        </div>
      </div>
    </div>
  );
}