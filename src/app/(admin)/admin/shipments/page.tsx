"use client";
import React, { useEffect, useState } from 'react';
import API from '../../../../lib/api';
import { Trash2, Edit3, MapPin, Eye, Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AdminShipmentsPage() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShipments = async () => {
    try {
      const res = await API.get('/shipments');
      setShipments(res.data);
    } catch (err) {
      toast.error("Failed to load shipments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchShipments(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await API.delete(`/shipments/${id}`);
      toast.success("Shipment deleted");
      fetchShipments(); // Refresh the list
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Shipment Fleet</h1>
        <Link href="/admin/shipments/create" className="bg-primary text-white px-6 py-3 rounded-full font-bold text-xs">CREATE NEW</Link>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b">
            <tr>
              <th className="px-8 py-5">Code</th>
              <th className="px-8 py-5">Recipient</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {shipments.map((s: any) => (
              <tr key={s._id} className="hover:bg-slate-50/50 transition-colors group text-slate-700">
                <td className="px-8 py-6 font-mono font-bold text-blue-600">{s.trackingCode}</td>
                <td className="px-8 py-6">
                  <p className="font-bold text-sm">{s.receiverName}</p>
                  <p className="text-[10px] text-slate-400">{s.destination?.address}</p>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase">
                    {s.currentStatus}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/shipments/${s._id}/manage`} title="Add Update" className="p-2 hover:bg-blue-100 rounded-lg text-blue-600"><MapPin size={18}/></Link>
                    <Link href={`/tracking/${s.trackingCode}`} title="View Public" className="p-2 hover:bg-slate-100 rounded-lg"><Eye size={18}/></Link>
                    <button onClick={() => handleDelete(s._id)} title="Delete" className="p-2 hover:bg-red-100 rounded-lg text-red-500"><Trash2 size={18}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}