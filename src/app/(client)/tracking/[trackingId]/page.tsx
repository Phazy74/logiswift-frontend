"use client";
import Link from 'next/link';

import React, { use, useEffect, useState } from 'react';
import API from '../../../../lib/api';
import { Check,
  CheckCircle2, Clock, MapPin, Package, 
  ChevronLeft, Share2, Copy, Headset, 
  Truck, Mail, Phone, ChevronRight, Globe
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProfessionalTrackingPage({ params }: { params: Promise<{ trackingId: string }> }) {
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
  }, [trackingId]);;

   const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true); // Switch to checkmark icon
      toast.success("Copied to clipboard", {
        description: "The tracking ID is ready to paste.",
      });

      // Switch back to copy icon after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  if (loading) return <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center font-bold text-slate-400 animate-pulse uppercase tracking-widest text-center px-6">Synchronizing Satellite Feed...</div>;
  if (!data) return <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center font-bold text-red-500 uppercase">Invalid Tracking Identifier</div>;

  const { shipment, history } = data;
  const originStr = shipment.origin?.address || shipment.senderAddress || "N/A";
  const destStr = shipment.destination?.address || shipment.receiverAddress || "N/A";

  

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans pb-20 text-slate-800">
      
      {/* ----------------- MOBILE VIEW (Optimized for Small Screens) ----------------- */}
      <div className="lg:hidden">
        <header className="bg-white px-6 py-4 flex justify-between items-center border-b border-slate-100 sticky top-0 z-50">
          <button onClick={() => window.history.back()}><ChevronLeft size={24} /></button>
          <h1 className="font-bold text-sm uppercase tracking-tight">Track Shipment</h1>
          <button><Share2 size={20} /></button>
        </header>

        <div className="p-4 space-y-4">
          {/* 1. Hero Summary Card */}
          <div className="bg-[#2563EB] rounded-3xl p-6 text-white shadow-lg shadow-blue-200">
              <p className="text-[10px] uppercase font-bold opacity-70 tracking-[0.2em] mb-1">Tracking Number</p>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black font-mono tracking-tighter">{shipment.trackingCode}</h2>
                <button 
    onClick={() => copyToClipboard(shipment.trackingCode)} 
    className={`p-3 rounded-2xl transition-all duration-300 active:scale-90 ${
      isCopied ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white hover:bg-white/20'
    }`}
  >
    {isCopied ? <Check size={18} /> : <Copy size={18} />}
  </button>
              </div>
              <div className="flex items-center gap-2 bg-white/20 w-fit px-4 py-2 rounded-full border border-white/10">
                 <Truck size={14} className="animate-pulse" />
                 <span className="text-[11px] font-black uppercase tracking-widest">{shipment.currentStatus}</span>
              </div>
              <p className="text-[10px] mt-4 font-bold opacity-80 uppercase">Est. Delivery: {shipment.estimatedDelivery || "TBD"}</p>
          </div>

          {/* 2. Transport Movement Picture (Progress Bar) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
             <div className="flex justify-between items-start text-center">
                <ProgressStep label="Accepted" icon={<CheckCircle2 size={16}/>} active completed />
                <ProgressStep label="In Transit" icon={<Truck size={16}/>} active={shipment.currentStatus !== 'Order Confirmed'} />
                <ProgressStep label="Out for Delivery" icon={<Package size={16}/>} />
                <ProgressStep label="Delivered" icon={<CheckCircle2 size={16}/>} completed={shipment.currentStatus === 'Delivered'} />
             </div>
          </div>

          {/* 3. Latest Live Update Feature Box */}
          {history.length > 0 && (
            <div className="bg-blue-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-blue-100">
               <div className="flex justify-between items-center mb-4 relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Current Progress</p>
                  <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-[9px] font-black uppercase">LIVE</span>
               </div>
               <p className="font-black text-white text-lg uppercase leading-tight mb-1 relative z-10">{history[0].locationName}</p>
               <p className="text-sm text-blue-100 font-medium relative z-10">{history[0].statusMessage}</p>
               <Globe className="absolute -right-8 -bottom-8 opacity-10 text-white rotate-12" size={120}/>
            </div>
          )}

          {/* 4. Package Content Image (Separate Div with empty-string fix) */}
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4 px-2">
                <Package size={16} className="text-blue-600" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cargo Identification</p>
            </div>
            {shipment.productImage ? (
                <img src={shipment.productImage} className="w-full h-56 object-cover rounded-2xl shadow-inner" alt="Cargo" />
            ) : (
                <div className="w-full h-56 bg-slate-50 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                    <Package size={32} className="text-slate-300 mb-2" />
                    <h4 className="font-black text-slate-800 uppercase text-sm">{shipment.productName}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">No Visual Record Attached</p>
                </div>
            )}
          </div>

          {/* 5. Shipment Summary */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
             <h3 className="font-bold text-sm border-b border-slate-50 pb-3">Shipment Summary</h3>
             <SummaryRow label="Carrier" value={shipment.carrier || "LogiSwift"} />
             <SummaryRow label="Service" value={shipment.service || "Standard"} />
             <SummaryRow label="Weight" value={shipment.weight || "0.0kg"} />
             <SummaryRow label="Origin" value={originStr} />
             <SummaryRow label="Destination" value={destStr} />
          </div>

          {/* 6. Timeline History with 'Latest' Tag */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
             <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-8">Tracking History</h3>
             <div className="space-y-12 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100" />
                {history.map((step: any, i: number) => (
                  <div key={i} className="flex gap-6 relative">
                    <div className={`w-6 h-6 rounded-full z-10 flex items-center justify-center border-4 border-white ${i === 0 ? 'bg-blue-600 shadow-lg' : 'bg-slate-200'}`} />
                    <div className="flex-1">
                       <div className="flex justify-between items-start">
                          <p className={`text-xs font-black uppercase ${i === 0 ? 'text-slate-900' : 'text-slate-400'}`}>{step.locationName}</p>
                          {i === 0 && <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-[8px] font-black uppercase">Latest</span>}
                       </div>
                       <p className="text-xs text-slate-500 font-medium mt-1">{step.statusMessage}</p>
                       <p className="text-[9px] text-slate-300 font-bold mt-2 uppercase">{new Date(step.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          
         {/* 7. Contact Support (Mobile) */}
<div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
    <Link href="/contact" className="w-full flex items-center justify-between group">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Headset size={24}/>
            </div>
            <div className="text-left">
                <p className="font-black text-slate-900 text-sm">Need Help?</p>
                <p className="text-xs text-slate-400">Contact our 24/7 support team</p>
            </div>
        </div>
        <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
    </Link>
</div>
        </div>
      </div>

      {/* ----------------- DESKTOP VIEW (Screenshot 2 Style) ----------------- */}
      <div className="hidden lg:block max-w-7xl mx-auto p-12">
        <div className="mb-12 flex justify-between items-end">
           <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Live Tracking Console</p>
              <h1 className="text-5xl font-black tracking-tighter text-slate-900">{shipment.trackingCode}</h1>
              <button 
    onClick={() => copyToClipboard(shipment.trackingCode)} 
    className={`p-3 rounded-2xl transition-all duration-300 active:scale-90 ${
      isCopied ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white hover:bg-white/20'
    }`}
  >
    {isCopied ? <Check size={18} /> : <Copy size={18} />}
  </button>
           </div>
           <div className="flex gap-4">
              <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 flex items-center gap-3">
                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                 <span className="text-xs font-black uppercase text-slate-700">{shipment.currentStatus}</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-8 bg-white rounded-[3rem] p-16 shadow-xl shadow-slate-200/50 border border-slate-100">
             <div className="flex justify-between items-center mb-12">
                <h3 className="text-2xl font-black tracking-tight uppercase">Journey Timeline</h3>
                <span className="text-xs font-bold text-slate-400">Satellite Sync: Active</span>
             </div>
             <DesktopTimeline history={history} />
          </div>

          <div className="col-span-4 space-y-6">
             <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
                <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Shipment Details</h3>
                <div className="space-y-4">
                   <DetailItem label="Carrier" value={shipment.carrier} />
                   <DetailItem label="Service Type" value={shipment.service} />
                   <DetailItem label="Total Weight" value={shipment.weight} />
                   <DetailItem label="Origin" value={originStr} />
                   <DetailItem label="Destination" value={destStr} />
                </div>
             </div>
             
             {/* Desktop Image with empty-string fix */}
             <div className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-slate-100">
                {shipment.productImage ? (
                   <img src={shipment.productImage} className="w-full h-64 object-cover rounded-[2rem]" alt="Package" />
                ) : (
                   <div className="w-full h-64 bg-slate-50 border border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center p-6 text-center text-slate-300 font-bold uppercase text-[10px]">
                      <Package size={40} className="mb-4 opacity-20" />
                      Cargo Visual Data <br /> Not Attached
                   </div>
                )}
                <p className="text-center text-[10px] font-black uppercase text-slate-400 mt-4 tracking-widest">Identified Unit Image</p>
             </div>
             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
    <h3 className="font-bold mb-6">Need Help?</h3>
    <div className="space-y-4">
        <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
            <Phone size={18} className="text-blue-600"/> +1 234 567 8900
        </div>
        <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
            <Mail size={18} className="text-blue-600"/> support@logiswift.com
        </div>
        
        {/* UPDATED BUTTON TO LINK */}
        <Link 
            href="/contact" 
            className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-full font-bold mt-4 hover:bg-blue-600 hover:text-white transition-all block text-center"
        >
            Contact Support
        </Link>
    </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function ProgressStep({ label, icon, active = false, completed = false }: any) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-slate-50 transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-100 text-slate-300'}`}>
        {completed ? <CheckCircle2 size={18} /> : icon}
      </div>
      <p className={`text-[8px] font-black uppercase tracking-tighter ${active ? 'text-blue-600' : 'text-slate-300'}`}>{label}</p>
    </div>
  );
}

function SummaryRow({ label, value }: any) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">{label}</span>
      <span className="font-black text-slate-700 uppercase text-[10px]">{value}</span>
    </div>
  );
}

function DesktopTimeline({ history }: any) {
  return (
    <div className="space-y-12 relative">
      <div className="absolute left-[107px] top-2 bottom-2 w-0.5 bg-slate-100" />
      {history.map((step: any, i: number) => (
        <div key={i} className="flex gap-6 relative">
          <div className="w-20 text-right shrink-0">
             <p className="text-[11px] font-black text-slate-900 uppercase">{new Date(step.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
             <p className="text-[10px] font-bold text-slate-400 mt-1">{new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div className={`w-6 h-6 rounded-full z-10 flex items-center justify-center border-4 border-white ${i === 0 ? 'bg-blue-600 shadow-md ring-4 ring-blue-50' : 'bg-slate-200'}`} />
          <div className="flex-1">
             <div className="flex items-center gap-3">
                <p className={`font-black uppercase text-sm ${i === 0 ? 'text-slate-900' : 'text-slate-400'}`}>{step.locationName}</p>
                {i === 0 && <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">LATEST</span>}
             </div>
             <p className="text-sm text-slate-500 font-medium mt-1">{step.statusMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DetailItem({ label, value }: any) {
  return (
    <div>
       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
       <p className="text-sm font-bold text-slate-800 leading-tight uppercase">{value || "N/A"}</p>
    </div>
  );
}
