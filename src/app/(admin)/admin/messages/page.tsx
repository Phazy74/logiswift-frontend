"use client";

import React, { useEffect, useState } from 'react';
import API from '../../../../lib/api';
import { Mail, Trash2, User, Calendar, MessageSquare, Loader2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<any>(null); // For viewing full message

  const fetchMessages = async () => {
    try {
      const res = await API.get('/auth/messages');
      setMessages(res.data);
    } catch (err) {
      toast.error("Failed to sync inbox");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this message?")) return;
    try {
      await API.delete(`/auth/messages/${id}`);
      toast.success("Message purged");
      fetchMessages();
      if (selectedMsg?._id === id) setSelectedMsg(null);
    } catch (err) { toast.error("Purge failed"); }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Command Inbox</h1>
        <div className="bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
           {messages.length} Total Inquiries
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* LIST OF MESSAGES */}
        <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          {messages.length > 0 ? messages.map((msg: any) => (
            <div 
              key={msg._id} 
              onClick={() => setSelectedMsg(msg)}
              className={`p-6 rounded-[2rem] border transition-all cursor-pointer group ${
                selectedMsg?._id === msg._id 
                ? 'bg-primary border-primary shadow-xl shadow-primary/20' 
                : 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/5 hover:border-primary/40'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <p className={`text-[10px] font-black uppercase tracking-widest ${selectedMsg?._id === msg._id ? 'text-white/60' : 'text-primary'}`}>
                  {msg.subject}
                </p>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(msg._id); }} className="opacity-0 group-hover:opacity-100 text-red-500 hover:scale-110 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
              <p className={`font-bold truncate ${selectedMsg?._id === msg._id ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                {msg.name}
              </p>
              <p className={`text-[10px] font-medium mt-1 ${selectedMsg?._id === msg._id ? 'text-white/70' : 'text-slate-400'}`}>
                {new Date(msg.createdAt).toLocaleDateString()}
              </p>
            </div>
          )) : (
            <p className="text-center text-slate-500 font-bold py-10">No transmissions found.</p>
          )}
        </div>

        {/* MESSAGE VIEWER */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedMsg ? (
              <motion.div 
                key={selectedMsg._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-white/5 rounded-[3rem] border border-slate-100 dark:border-white/10 p-10 lg:p-16 h-full shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                   <MessageSquare size={120} />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-xl">
                         {selectedMsg.name.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                         <h2 className="text-2xl font-black uppercase tracking-tight">{selectedMsg.name}</h2>
                         <p className="text-primary font-bold text-sm">{selectedMsg.email}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Received On</p>
                      <p className="font-bold text-sm">{new Date(selectedMsg.createdAt).toLocaleString()}</p>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/5">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Topic</p>
                      <p className="text-lg font-bold uppercase">{selectedMsg.subject}</p>
                   </div>
                   <div className="prose dark:prose-invert max-w-none">
                      <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                        {selectedMsg.message}
                      </p>
                   </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem] flex flex-col items-center justify-center text-slate-400">
                 <Eye size={40} className="mb-4 opacity-20" />
                 <p className="font-bold uppercase tracking-widest text-xs">Select a message to decode transmission</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}