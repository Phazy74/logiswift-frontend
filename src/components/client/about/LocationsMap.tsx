"use client";
import React from 'react';
import { motion } from 'framer-motion';

const hubs = [
  { name: 'NY', x: '25%', y: '35%' },
  { name: 'LDN', x: '47%', y: '30%' },
  { name: 'HK', x: '82%', y: '40%' },
  { name: 'DXB', x: '60%', y: '45%' },
];

export const LocationsMap = () => {
  return (
    <div className="relative w-full h-[600px] bg-transparent rounded-none overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1974" 
        className="w-full h-full object-cover"
        alt="World Map"
      />
      {hubs.map((hub, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ left: hub.x, top: hub.y }}
          className="absolute"
        >
          <div className="w-2 h-2 bg-primary rounded-none animate-ping absolute inset-0" />
          <div className="w-2 h-2 bg-primary rounded-none relative z-10 shadow-[0_0_10px_#3b82f6]" />
        </motion.div>
      ))}
    </div>
  );
};