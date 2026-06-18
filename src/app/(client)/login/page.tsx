"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../../store/authStore';
import { useRouter } from 'next/navigation';
import API from '../../../lib/api';
import { toast } from 'sonner';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onLogin = async (data: any) => {
    try {
      const res = await API.post('/auth/login', data);
      setAuth(res.data.token, res.data.admin);
      toast.success("Access Granted. Welcome back.");
      router.push('/admin'); // Send to dashboard
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Authentication Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 w-full max-w-md rounded-[3rem] border-primary/20 shadow-3xl shadow-primary/10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">LogiSwift</h1>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-2">Admin Portal Access</p>
        </div>

        <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 ml-4">Email</label>
            <div className="relative">
              <Mail className="absolute left-5 top-5 text-gray-500" size={18} />
              <input {...register("email")} type="email" placeholder="admin@logiswift.com" className="w-full bg-foreground/5 border border-glass-border p-5 pl-14 rounded-2xl outline-none focus:border-primary text-foreground font-bold" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 ml-4">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-5 text-gray-500" size={18} />
              <input {...register("password")} type="password" placeholder="••••••••" className="w-full bg-foreground/5 border border-glass-border p-5 pl-14 rounded-2xl outline-none focus:border-primary text-foreground font-bold" required />
            </div>
          </div>

          <button 
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-6 rounded-full font-black tracking-widest shadow-2xl shadow-primary/30 hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
          >
            {isSubmitting ? "AUTHENTICATING..." : "SIGN IN TO CONSOLE"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}