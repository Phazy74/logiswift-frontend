"use client";

import React, { useEffect, useState } from 'react';
import { MapPin, Globe, Loader2, Search } from 'lucide-react';
import API from '../../../lib/api';
import { toast } from 'sonner';

export default function AdminTrackingOverview() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const res = await API.get('/shipments');
        setShipments(res.data);
      } catch (err) {
        toast.error("Failed to load live fleet data");
      } finally {
        setLoading(false);
      }
    };
    fetchShipments();
  }, []);

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="animate-spin text-primary" size={40} />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Satellite Data...</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Live Fleet Monitor</h1>
        <p className="text-slate-400 font-medium text-sm italic">Real-time GPS visualization of all active cargo units.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 h-[70vh]">
        {/* Map View Placeholder */}
        <div className="lg:col-span-3 bg-white dark:bg-white/5 rounded-[3rem] border border-slate-100 dark:border-white/5 relative overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://carto.com/help/images/posts/basemaps/dark_all.png')] bg-cover opacity-40 grayscale group-hover:scale-105 transition-transform duration-[10s]" />
          
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-center z-10">
                <Globe className="mx-auto text-primary mb-4 animate-pulse" size={48} />
                <p className="font-black uppercase tracking-[0.2em] text-xs text-white">Global Fleet Projection</p>
             </div>
          </div>

          {/* Decorative Corner Label */}
          <div className="absolute top-8 left-8 bg-primary text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
            Live Satellite Feed
          </div>
        </div>

        {/* Active List Sidebar */}
        <div className="lg:col-span-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400 px-4">Active Signals ({shipments.length})</h3>
          
          {shipments.length > 0 ? shipments.map((s: any) => (
            <div key={s._id} className="p-6 bg-white dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-white/5 hover:border-primary/50 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <p className="font-mono text-xs font-bold text-primary">{s.trackingCode}</p>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              </div>
              <p className="text-xs font-black uppercase text-slate-700 dark:text-white truncate">{s.productName}</p>
              <div className="flex items-center gap-2 mt-3 text-[10px] text-slate-400 font-bold uppercase">
                <MapPin size={12} className="text-primary" />
                {s.currentStatus}
              </div>
            </div>
          )) : (
            <div className="p-10 text-center border-2 border-dashed border-slate-100 dark:border-white/5 rounded-[2rem]">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest opacity-50">No signals detected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}