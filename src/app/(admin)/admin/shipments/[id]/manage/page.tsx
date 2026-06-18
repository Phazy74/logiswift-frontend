"use client";
import React, { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, RefreshCcw, Loader2, Camera, ArrowLeft, ToggleRight, ToggleLeft } from 'lucide-react';
import { toast } from 'sonner';
import API from '../../../../../../lib/api';

export default function ManageShipmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form States
  const [status, setStatus] = useState("In Transit");
  const [estimate, setEstimate] = useState("");
  const [updateLog, setUpdateLog] = useState(false); // Toggle
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<FileList | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('shipmentId', id);
    formData.append('currentStatus', status);
    formData.append('estimatedDelivery', estimate);
    formData.append('updateLog', String(updateLog));

    if (updateLog) {
      formData.append('locationName', location);
      formData.append('statusMessage', message);
      if (images) {
        Array.from(images).forEach(file => formData.append('productImage', file));
      }
    }

    try {
      await API.post('/track/update', formData);
      toast.success("Shipment Updated Successfully!");
      router.push('/admin/shipments');
    } catch (err) {
      toast.error("Update failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 pb-20">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-400 font-bold text-xs"><ArrowLeft size={16}/> BACK</button>
      
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Update Package</h2>

        <form onSubmit={handleUpdate} className="space-y-8">
          {/* SECTION 1: MAIN STATUS */}
          <div className="grid md:grid-cols-2 gap-6 bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-blue-600 ml-2">Active Phase</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-white p-4 rounded-2xl outline-none font-bold">
                <option value="Order Confirmed">Order Confirmed</option>
                <option value="Picked Up">Picked Up</option>
                <option value="In Transit">In Transit</option>
                <option value="Arrived at Hub">Arrived at Hub</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-blue-600 ml-2">Estimated Arrival</label>
              <input type="text" value={estimate} onChange={(e) => setEstimate(e.target.value)} placeholder="e.g. June 20, 2024" className="w-full bg-white p-4 rounded-2xl outline-none font-bold" />
            </div>
          </div>

          {/* TOGGLE: CREATE LOG */}
          <div className="flex items-center justify-between p-6 border border-slate-100 rounded-3xl bg-slate-50 cursor-pointer" onClick={() => setUpdateLog(!updateLog)}>
            <div>
              <p className="font-bold text-slate-800">Create Timeline Log?</p>
              <p className="text-xs text-slate-400">Add a new city checkpoint to the customer's view.</p>
            </div>
            {updateLog ? <ToggleRight size={40} className="text-blue-600" /> : <ToggleLeft size={40} className="text-slate-300" />}
          </div>

          {/* SECTION 2: OPTIONAL LOG */}
          {updateLog && (
            <div className="space-y-6 p-6 border-2 border-dashed border-slate-100 rounded-[2rem] animate-in fade-in">
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Current City (e.g. New York Hub)" className="w-full bg-slate-50 p-5 rounded-2xl outline-none" required />
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message for customer..." className="w-full bg-slate-50 p-5 rounded-2xl h-24 outline-none" required />
              <input type="file" multiple onChange={(e) => setImages(e.target.files)} className="text-xs font-bold text-slate-400" />
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-6 rounded-full font-black tracking-widest shadow-2xl flex items-center justify-center gap-3">
            {loading ? <Loader2 className="animate-spin" /> : <><RefreshCcw size={20}/> CONFIRM UPDATES</>}
          </button>
        </form>
      </div>
    </div>
  );
}