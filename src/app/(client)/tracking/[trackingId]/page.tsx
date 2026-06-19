"use client";
import React, { use, useEffect, useState } from 'react';
import API from '../../../../lib/api';
import { CheckCircle2, Clock, MapPin, Package, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrackingResultPage({ params }: { params: Promise<{ trackingId: string }> }) {
  // 1. Unwrap the Next.js 15 params
  const resolvedParams = use(params);
  const trackingId = resolvedParams.trackingId;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/track/${trackingId}`)
      .then(res => setData(res.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [trackingId]);

  if (loading) return <div className="p-20 text-center font-bold animate-pulse text-slate-400">LOCATING CARGO...</div>;
  if (!data) return <div className="p-20 text-center font-bold text-red-500">INVALID TRACKING CODE</div>;

  const { shipment, history } = data;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex justify-between items-center">
           <h2 className="text-xl font-bold">Tracking Code: <span className="text-blue-600 font-mono">{shipment.trackingCode}</span></h2>
           <div className="bg-blue-50 text-blue-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
             {shipment.currentStatus}
           </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* TIMELINE (Left Column) */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 relative">
            <h3 className="font-black text-sm uppercase tracking-widest text-slate-400 mb-2">Shipment Status</h3>
            
            {/* NEW: ESTIMATED DELIVERY HIGHLIGHT */}
            <div className="bg-blue-600 p-6 rounded-3xl text-white shadow-lg shadow-blue-200 relative overflow-hidden">
                <div className="relative z-10 flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-2xl">
                        <Clock size={24} className="text-white" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Estimated Delivery</p>
                        <p className="text-lg font-bold leading-tight">{shipment.estimatedDelivery || "Pending Schedule"}</p>
                    </div>
                </div>
                {/* Decorative background circle */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
            </div>

            <div className="pt-4 relative">
                <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-8 px-2">Journey Log</h3>
                
                {/* Vertical Line */}
                <div className="absolute left-[23px] top-16 bottom-4 w-0.5 bg-slate-50" />
                
                <div className="space-y-10">
                    {history.map((step: any, i: number) => (
                    <div key={i} className="flex gap-6 relative">
                        <div className="w-4 h-4 rounded-full bg-blue-600 ring-8 ring-blue-50 z-10 shrink-0 mt-1" />
                        <div className="space-y-4">
                        <div>
                            <p className="font-bold text-slate-800 leading-none mb-1 text-sm">{step.locationName}</p>
                            <p className="text-xs text-slate-400 font-medium">{step.statusMessage}</p>
                            <p className="text-[10px] text-slate-300 mt-1 font-bold">{new Date(step.timestamp).toLocaleString()}</p>
                        </div>
                        
                        {/* CHECKPOINT IMAGES */}
                        <div className="flex gap-2 flex-wrap">
                            {step.images?.map((img: string, idx: number) => (
                                <img key={idx} src={img} className="w-14 h-14 object-cover rounded-xl border border-slate-100 shadow-sm" alt="Checkpoint" />
                            ))}
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          </div>

          {/* MAIN CONTENT (Right Column) */}
          <div className="lg:col-span-2 space-y-6">
            {/* PRODUCT IMAGE */}
            <div className="bg-white p-4 rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
               <img src={shipment.productImage} className="w-full h-80 object-cover rounded-[2.5rem]" alt="Goods" />
               <div className="p-6">
                  <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Identified Cargo</p>
                  <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{shipment.productName}</h2>
               </div>
            </div>

{/* DETAILS GRID */}
<div className="grid md:grid-cols-2 gap-6 text-slate-700">
   <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Route Details</p>
      <div className="space-y-4">
         <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Origin / Sender</p>
            <p className="text-sm font-bold text-slate-800">{shipment.senderName}</p>
            <p className="text-xs text-slate-500">{shipment.senderAddress}</p>
         </div>
         <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Destination / Receiver</p>
            <p className="text-sm font-bold text-slate-800">{shipment.receiverName}</p>
            {/* THIS IS THE FIX: Accessing receiverAddress directly */}
            <p className="text-sm font-bold text-blue-600">{shipment.receiverAddress || "City not set"}</p>
         </div>
      </div>
   </div>

   <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Cargo Specifications</p>
      <div className="space-y-6">
         <div className="flex justify-between items-center border-b border-slate-50 pb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Weight</span>
            <span className="text-sm font-black text-slate-800">{shipment.weight || '0.0 kg'}</span>
         </div>
         <div className="flex justify-between items-center border-b border-slate-50 pb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Service</span>
            <span className="text-sm font-black text-blue-600 uppercase">{shipment.serviceType}</span>
         </div>
         <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Ref Number</span>
            <span className="text-sm font-mono font-bold text-slate-400">#LOG-{shipment._id?.substring(0,6).toUpperCase()}</span>
         </div>
      </div>
   </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}