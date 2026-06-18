"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Send, Package, MapPin, User, Phone, Mail, 
  Truck, Plane, Ship, ShieldCheck, Globe, CheckCircle2, X 
} from 'lucide-react';
import Link from 'next/link';

// 1. Validation Schema
const quoteSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  serviceType: z.enum(['Air', 'Sea', 'Road', 'Warehousing']),
  origin: z.string().min(3, "Origin city is required"),
  destination: z.string().min(3, "Destination city is required"),
  weight: z.string().min(1, "Weight is required"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export default function QuotePage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { serviceType: 'Road' }
  });

  const onSubmit = async (data: QuoteFormData) => {
    // Simulate API process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmittedEmail(data.email);
    setIsSuccess(true);
    reset();
  };

  return (
    <div className="bg-background min-h-screen text-foreground pb-20 pt-10 relative">
      
      {/* SUCCESS MODAL OVERLAY */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setIsSuccess(false)}
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card p-12 max-w-lg w-full text-center relative z-10 border-primary/20 shadow-3xl shadow-primary/20 rounded-[3rem]"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
                <CheckCircle2 size={48} className="animate-bounce" />
              </div>
              <h2 className="text-3xl font-black tracking-tighter uppercase mb-4">Request Sent!</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                A confirmation email has been sent to <span className="text-primary font-bold">{submittedEmail}</span>. 
                Our logistics experts will review your details and reach out to you within 24 hours.
              </p>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="bg-primary text-white py-4 rounded-full font-black tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-primary/30"
                >
                  GOT IT
                </button>
                <Link href="/" className="text-xs font-bold text-gray-500 hover:text-primary transition-colors">
                   BACK TO HOME
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-4"
        >
          <p className="text-primary font-black tracking-[0.4em] text-xs uppercase">Custom Solutions</p>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
            Get a <span className="text-primary">Tailored Quote.</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Provide your shipment details below, and we will send an expert strategy to your email.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* FORM SECTION */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="glass-card p-10 rounded-[2.5rem] border-glass-border">
                <div className="flex items-center gap-3 mb-8 text-primary font-bold uppercase tracking-widest text-xs">
                  <User size={18} /> Contact Information
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput label="Full Name" name="fullName" register={register} error={errors.fullName} placeholder="John Doe" />
                  <FormInput label="Email Address" name="email" type="email" register={register} error={errors.email} placeholder="john@example.com" />
                  <FormInput label="Phone Number" name="phone" register={register} error={errors.phone} placeholder="+1 234 567 890" />
                </div>
              </div>

              <div className="glass-card p-10 rounded-[2.5rem] border-glass-border">
                <div className="flex items-center gap-3 mb-8 text-primary font-bold uppercase tracking-widest text-xs">
                  <Package size={18} /> Shipment Details
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <FormInput label="Origin City" name="origin" register={register} error={errors.origin} placeholder="City, Country" />
                  <FormInput label="Destination City" name="destination" register={register} error={errors.destination} placeholder="City, Country" />
                </div>
                <FormInput label="Weight (kg)" name="weight" register={register} error={errors.weight} placeholder="e.g. 500" />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-6 rounded-full font-black text-lg tracking-widest shadow-2xl shadow-primary/30 hover:bg-blue-600 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSubmitting ? "PROCESSING..." : "REQUEST QUOTE"} <Send size={20} />
              </button>
            </form>
          </div>

          {/* SIDEBAR INFO */}
          <div className="space-y-6">
            <div className="glass-card p-10 rounded-[3rem] border-primary/20 bg-primary/5">
              <h3 className="text-2xl font-black mb-6 tracking-tighter uppercase">Why LogiSwift?</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0"><ShieldCheck size={20}/></div>
                  <div><p className="font-bold text-sm">Fully Insured</p><p className="text-xs text-gray-500">Your cargo is protected.</p></div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0"><Globe size={20}/></div>
                  <div><p className="font-bold text-sm">Global Network</p><p className="text-xs text-gray-500">Access to 195+ countries.</p></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// REUSABLE INPUT
function FormInput({ label, name, register, error, type = "text", placeholder }: any) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">{label}</label>
      <input 
        type={type} 
        {...register(name)} 
        placeholder={placeholder}
        className={`bg-foreground/5 border ${error ? 'border-red-500' : 'border-glass-border'} p-5 rounded-2xl focus:outline-none focus:border-primary transition-all text-foreground font-bold text-sm`}
      />
      {error && <span className="text-[10px] text-red-500 font-bold ml-2 uppercase italic">{error.message}</span>}
    </div>
  );
}