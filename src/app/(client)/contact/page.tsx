"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Mail, Phone, MapPin, Send, 
  CheckCircle2, Globe, Clock, MessageSquare 
} from 'lucide-react';
import API from '../../../lib/api';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(5, "Subject is too short"),
  message: z.string().min(10, "Please provide more details"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await API.post('/auth/contact', data);
      setIsSuccess(true);
      reset();
    } catch (err) {
      toast.error("Failed to send message. Try again later.");
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen pb-20 relative overflow-hidden">
      
      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-12 max-w-md w-full text-center border-primary/20">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                <CheckCircle2 size={48} className="animate-bounce" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Transmission Received</h2>
              <p className="text-gray-500 mb-8 font-medium">Your message has been routed to our global strategy team. We will respond within 2-4 hours.</p>
              <button onClick={() => setIsSuccess(false)} className="w-full bg-primary text-white py-4 rounded-full font-black tracking-widest shadow-xl">DISMISS</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-6">
          <p className="text-primary font-black tracking-[0.5em] text-[10px] uppercase">Contact HQ</p>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
            Let’s Connect & <br /> <span className="text-primary">Move Together.</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium">Have a global logistics challenge? Our strategists are standing by.</p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
        
        {/* LEFT: INFO CARDS */}
        <div className="space-y-6">
           <ContactInfoCard 
             icon={<Mail />} 
             label="Digital Correspondence" 
             value="hq@logiswift.com" 
             desc="Our primary channel for business inquiries."
           />
           <ContactInfoCard 
             icon={<Phone />} 
             label="Global Hotlines" 
             value="+1 (800) LOGI-SWIFT" 
             desc="Available 24/7 for urgent transit issues."
           />
           <ContactInfoCard 
             icon={<MapPin />} 
             label="Primary Hub (HQ)" 
             value="122 Logistics Way, Dallas, TX 75201" 
             desc="Visit our command center for enterprise demos."
           />
           <div className="glass-card p-8 rounded-[2.5rem] border-white/5 bg-primary/5">
              <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest mb-4">
                 <Clock size={14} /> Operations Clock
              </div>
              <div className="flex justify-between items-center text-sm font-bold">
                 <span className="text-gray-400">Mon - Fri</span>
                 <span>00:00 - 24:00 (Global)</span>
              </div>
           </div>
        </div>

        {/* RIGHT: CONTACT FORM */}
        <div className="lg:col-span-2">
          <motion.form 
            onSubmit={handleSubmit(onSubmit)} 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-10 md:p-16 rounded-[3.5rem] border-primary/10 shadow-3xl space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
               <FormInput label="Full Name" name="name" register={register} error={errors.name} placeholder="John Logistics" />
               <FormInput label="Corporate Email" name="email" type="email" register={register} error={errors.email} placeholder="john@company.com" />
            </div>
            <FormInput label="Subject / Service Interest" name="subject" register={register} error={errors.subject} placeholder="e.g. Bulk Sea Freight Inquiry" />
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-4">Detailed Message</label>
               <textarea 
                 {...register("message")} 
                 placeholder="Tell us about your requirements..." 
                 className="w-full bg-foreground/5 border border-glass-border p-6 rounded-3xl h-48 outline-none focus:border-primary text-foreground font-medium transition-all"
               />
               {errors.message && <span className="text-[10px] text-red-500 font-bold ml-4 uppercase">{errors.message.message}</span>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-6 rounded-full font-black tracking-widest text-lg shadow-2xl shadow-primary/30 hover:bg-blue-600 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
            >
              {isSubmitting ? "ENCRYPTING & SENDING..." : "DISPATCH MESSAGE"} <Send size={20} />
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}

// SUB-COMPONENTS
function ContactInfoCard({ icon, label, value, desc }: any) {
    return (
        <div className="glass-card p-8 rounded-[2.5rem] border-white/5 group hover:border-primary/20 transition-all">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">{label}</p>
            <p className="text-lg font-black text-white uppercase tracking-tight mb-2">{value}</p>
            <p className="text-xs text-gray-500 font-medium">{desc}</p>
        </div>
    );
}

function FormInput({ label, name, register, error, type = "text", placeholder }: any) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">{label}</label>
      <input 
        type={type} 
        {...register(name)} 
        placeholder={placeholder}
        className={`bg-foreground/5 border ${error ? 'border-red-500' : 'border-glass-border'} p-6 rounded-2xl focus:outline-none focus:border-primary transition-all text-foreground font-bold placeholder:text-gray-700`}
      />
      {error && <span className="text-[10px] text-red-500 font-bold ml-4 uppercase">{error.message}</span>}
    </div>
  );
}