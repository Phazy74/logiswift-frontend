"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Package, Loader2, ExternalLink, Globe } from 'lucide-react';
import API from '../../../../lib/api';
import { toast } from 'sonner';

/** 
 * Module Marker: TS-TRACK-MOD-01
 * This constant ensures the file is never treated as empty by the compiler.
 */
const MODULE_ID = "ADMIN_TRACKING_PAGE";

export default function AdminTrackingPage() {
  const [id, setId] = useState('');
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const res = await API.get('/shipments');
        setShipments(res.data || []);
      } catch (err) {
        toast.error("Operational sync failed");
      } finally {
        setLoading(false);
      }
    };
    fetchShipments();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (id.trim()) {
      router.push(`/tracking/${id.trim()}`);
    }
  };

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-primary mb-4" size={40} />
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Syncing with Satellite...</p>
    </div>
  );

  return (
    <div className="space-y-10 pb-20">
      <section className="bg-white dark:bg-white/5 p-10 rounded-[3rem] border border-slate-100 dark:border-white/10 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-primary font-black tracking-[0.4em] text-[10px] uppercase mb-2">Internal Tools</p>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-6 text-slate-900 dark:text-white">Global Search</h1>
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <input 
              type="text" 
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter Tracking ID..." 
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full py-5 pl-10 pr-40 text-lg font-bold focus:outline-none focus:border-primary transition-all text-slate-800 dark:text-white"
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 bg-primary text-white px-8 rounded-full font-black hover:bg-blue-600 transition-all">
              INSPECT
            </button>
          </form>
        </div>
        <Globe className="absolute -right-20 -bottom-20 text-primary opacity-5 pointer-events-none" size={300} />
      </section>

      <section>
        <h3 className="font-black text-sm uppercase tracking-widest text-slate-400 mb-6 px-4">Active Fleet ({shipments.length})</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shipments.map((s: any) => (
            <div key={s._id} className="bg-white dark:bg-white/5 p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <p className="font-mono font-bold text-blue-600 text-sm">{s.trackingCode}</p>
                <button onClick={() => router.push(`/tracking/${s.trackingCode}`)} className="text-primary"><ExternalLink size={16}/></button>
              </div>
              <h4 className="font-black uppercase text-xs text-slate-800 dark:text-white truncate">{s.productName}</h4>
              <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase flex items-center gap-2">
                <MapPin size={12} className="text-primary" /> {s.currentStatus}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}