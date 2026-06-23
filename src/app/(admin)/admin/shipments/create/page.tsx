"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Camera, ArrowRight, Loader2, MapPin, User, Package, Weight } from 'lucide-react';
import { toast } from 'sonner';
import API from '../../../../../lib/api';

export default function CreateShipmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { register, handleSubmit } = useForm();

  // 1. Image Preview Logic
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

const onSubmit = async (data: any) => {
    setLoading(true);
    const formData = new FormData();
    
    // Use these exact keys
    formData.append('productName', data.productName);
    formData.append('senderName', data.senderName);
    formData.append('senderAddress', data.senderAddress);
    formData.append('receiverName', data.receiverName);
    formData.append('receiverAddress', data.receiverAddress);
    formData.append('weight', data.weight);
    formData.append('serviceType', data.serviceType);
    formData.append('estimatedDelivery', data.estimatedDelivery);
// Keep this: it only adds the image IF the admin selected one
    if (data.productImage?.[0]) {
      formData.append('productImage', data.productImage[0]);
    }

    try {
      // 1. REMOVED: Headers (Axios handles this automatically for FormData)
      const res = await API.post('/shipments', formData); 
      
      toast.success("Shipment Created!");
      router.push('/admin/shipments');
    } catch (err: any) {
      // 2. IMPROVED: Show actual error from backend if possible
      const msg = err.response?.data?.message || "Creation failed. Check server connection.";
      toast.error(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-10 text-slate-800">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Generate Shipment</h1>
        <p className="text-slate-500">Add a new item to the fleet and upload cargo proof.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Cargo Details */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase">
              <Package size={16} /> Item Information
            </div>
            <input {...register("productName")} placeholder="Cargo Name (e.g. Samsung OLED Panels)" className="w-full border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 font-semibold" required />
            
            <div className="relative border-2 border-dashed border-slate-200 rounded-3xl h-64 flex flex-col items-center justify-center overflow-hidden bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer">
               {preview ? (
                 <img src={preview} className="w-full h-full object-contain" alt="Preview" />
               ) : (
                 <div className="text-center">
                    <Camera className="mx-auto text-slate-300 mb-2" size={40} />
                    <p className="text-sm font-bold text-slate-400">Upload Item Image</p>
                 </div>
               )}
               <input 
                    type="file" 
                      {...register("productImage")} // 👈 Removed {required: true}
                        onChange={handleImageChange} 
                       className="absolute inset-0 opacity-0 cursor-pointer" 
                       accept="image/*" 
              />
            </div>
          </div>

          {/* Route Details */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase">
              <MapPin size={16} /> Route & Destination
            </div>
            <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Origin City/Address</label>
                 <input {...register("senderAddress")} placeholder="e.g. New York, USA" className="w-full border border-slate-200 p-4 rounded-2xl outline-none" required />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Destination City/Address</label>
                 <input {...register("receiverAddress")} placeholder="e.g. Lagos, Nigeria" className="w-full border border-slate-200 p-4 rounded-2xl outline-none" required />
               </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Parties & Stats) */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase">
              <User size={16} /> Customer Data
            </div>
            <input {...register("senderName")} placeholder="Sender Name" className="w-full border border-slate-200 p-4 rounded-2xl outline-none" required />
            <input {...register("receiverName")} placeholder="Receiver Name" className="w-full border border-slate-200 p-4 rounded-2xl outline-none" required />
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase">
              <Weight size={16} /> Specifics
            </div>
            <input {...register("weight")} placeholder="Weight (e.g. 450kg)" className="w-full border border-slate-200 p-4 rounded-2xl outline-none" required />
            <input {...register("estimatedDelivery")} placeholder="Estimate (e.g. June 30, 2024)" className="w-full border border-slate-200 p-4 rounded-2xl outline-none" required />
            
            <select {...register("serviceType")} className="w-full border border-slate-200 p-4 rounded-2xl outline-none bg-white font-bold">
               <option value="Standard Delivery">Standard Delivery</option>
               <option value="Express Shipping">Express Shipping</option>
               <option value="Priority Air">Priority Air</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-6 rounded-3xl font-bold shadow-xl shadow-blue-100 flex items-center justify-center gap-3 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><ArrowRight size={20} /> GENERATE SYSTEM ID</>}
          </button>
        </div>

      </form>
    </div>
  );
}
}