"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Camera, ArrowRight, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import API from '../../../../../lib/api';

export default function CreateShipmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { register, handleSubmit } = useForm();

  // Handle Image Selection Preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const formData = new FormData();
    
    // Fill all fields from the LogiTrack UI
    Object.keys(data).forEach(key => {
      if (key !== 'productImage') formData.append(key, data[key]);
    });

    if (data.productImage?.[0]) {
      formData.append('productImage', data.productImage[0]);
    }

    try {
      const res = await API.post('/shipments', formData);
      toast.success(`Shipment Created: ${res.data.trackingCode}`);
      router.push('/admin/shipments');
    } catch (err: any) {
      console.error("Upload Error:", err.response?.data);
      toast.error(err.response?.data?.message || "Check console for errors");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-slate-50 min-h-screen text-slate-900">
      <h1 className="text-3xl font-bold mb-8">Generate New Shipment</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold mb-6">Cargo & Image</h3>
            <input {...register("productName")} placeholder="Item Name" className="w-full border p-4 rounded-xl mb-4" required />
            
            {/* Image Upload with Preview */}
            <div className="relative border-2 border-dashed border-slate-200 rounded-2xl h-48 flex items-center justify-center overflow-hidden">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="text-center">
                  <Camera className="mx-auto text-slate-300" />
                  <p className="text-xs font-bold text-slate-400 mt-2">Click to select product photo</p>
                </div>
              )}
              <input type="file" {...register("productImage")} onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 grid md:grid-cols-2 gap-6">
            <input {...register("senderName")} placeholder="Sender Name" className="border p-4 rounded-xl" />
            <input {...register("receiverName")} placeholder="Receiver Name" className="border p-4 rounded-xl" />
            <input {...register("weight")} placeholder="Weight (e.g. 12.5 kg)" className="border p-4 rounded-xl" />
            <input {...register("serviceType")} placeholder="Service Type" className="border p-4 rounded-xl" defaultValue="Standard Delivery" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
             <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3">
               {loading ? <Loader2 className="animate-spin" /> : "GENERATE SHIPMENT"}
             </button>
          </div>
        </div>
      </form>
    </div>
  );
}