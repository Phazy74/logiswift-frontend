"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  MapPin, 
  Trash2, 
  Eye,
  Loader2,
  TrendingUp
} from 'lucide-react';
import Counter from '../../../components/shared/Counter';
import Link from 'next/link';
import { toast } from 'sonner';
import API from '../../../lib/api';

export default function AdminDashboard() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Real Data from Backend
  const fetchData = async () => {
    try {
      const res = await API.get('/shipments');
      setShipments(res.data);
    } catch (err) {
      toast.error("Failed to sync with logistics server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // 2. Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this shipment?")) return;
    try {
      await API.delete(`/shipments/${id}`);
      toast.success("Shipment removed from fleet");
      fetchData(); // Refresh list
    } catch (err) {
      toast.error("Delete operation failed");
    }
  };

  // 3. Calculate Live Stats
  const stats = [
    { label: 'Total Fleet', value: shipments.length, icon: <Package />, color: 'bg-blue-500' },
    { label: 'In Transit', value: shipments.filter((s: any) => s.currentStatus === 'In Transit').length, icon: <Truck />, color: 'bg-orange-500' },
    { label: 'Delivered', value: shipments.filter((s: any) => s.currentStatus === 'Delivered').length, icon: <CheckCircle2 />, color: 'bg-green-500' },
    { label: 'Anomalies', value: shipments.filter((s: any) => s.currentStatus === 'Delayed').length, icon: <AlertTriangle />, color: 'bg-red-500' },
  ];

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="animate-spin text-primary" size={40} />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing Fleet Data...</p>
    </div>
  );

  return (
    <div className="space-y-10 pb-20">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase text-slate-800 dark:text-white">Fleet Command</h1>
          <p className="text-slate-400 text-sm font-medium">Real-time monitoring of global logistics operations.</p>
        </div>
        <Link href="/admin/shipments/create" className="bg-primary text-white px-8 py-4 rounded-full font-black text-xs tracking-widest flex items-center gap-3 shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
          <Plus size={18} /> GENERATE NEW SHIPMENT
        </Link>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg ${stat.color}`}>
              {stat.icon}
            </div>
            <h3 className="text-4xl font-black tracking-tighter mb-1 text-slate-800 dark:text-white">
              <Counter value={stat.value} />
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* RECENT SHIPMENTS MANAGEMENT TABLE */}
      <div className="bg-white dark:bg-white/5 rounded-[3rem] border border-slate-100 dark:border-white/10 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 dark:border-white/5 flex justify-between items-center">
          <h3 className="font-black text-sm uppercase tracking-widest text-slate-800 dark:text-white flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" /> Active Logistics Stream
          </h3>
          <span className="text-[10px] font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase">Live Update</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <th className="px-8 py-5">Identifer</th>
                <th className="px-8 py-5">Cargo / Recipient</th>
                <th className="px-8 py-5">Current Status</th>
                <th className="px-8 py-5 text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-white/5">
              {shipments.length > 0 ? shipments.map((s: any) => (
                <tr key={s._id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <p className="font-mono font-bold text-primary text-sm">{s.trackingCode}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Generated: {new Date(s.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-black text-slate-700 dark:text-white uppercase">{s.productName}</p>
                    <p className="text-[10px] text-slate-400 font-medium">To: {s.receiverName}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full animate-pulse ${s.currentStatus === 'Delivered' ? 'bg-green-500' : 'bg-primary'}`} />
                       <span className="text-[10px] font-black uppercase tracking-tighter text-slate-600 dark:text-slate-300">
                        {s.currentStatus}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-4">
                      {/* MANAGE (Add Location) */}
                      <Link 
                        href={`/admin/shipments/${s._id}/manage`} 
                        title="Update Journey"
                        className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <MapPin size={16} />
                      </Link>

                      {/* VIEW PUBLIC */}
                      <Link 
                        href={`/tracking/${s.trackingCode}`} 
                        title="View Track Page"
                        className="p-3 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white rounded-xl hover:bg-slate-800 hover:text-white transition-all"
                      >
                        <Eye size={16} />
                      </Link>

                      {/* DELETE */}
                      <button 
                        onClick={() => handleDelete(s._id)} 
                        title="Remove Shipment"
                        className="p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <p className="text-slate-400 font-bold text-sm italic">No active shipments in fleet. Start by creating one.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}