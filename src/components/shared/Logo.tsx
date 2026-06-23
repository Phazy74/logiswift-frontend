import React from 'react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      {/* The SVG Icon - Stays Blue (Primary) */}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary transition-transform group-hover:rotate-90"
      >
        <path d="M4 4H14V14H4V4Z" fill="currentColor" />
        <path d="M18 4H28V14H18V4Z" fill="currentColor" fillOpacity="0.4" />
        <path d="M4 18H14V28H4V18Z" fill="currentColor" fillOpacity="0.7" />
        <path d="M18 18L28 28H18V18Z" fill="currentColor" />
      </svg>
      
      {/* 
         THE BRAND NAME 
         slate-950 = Very Dark (Light Mode)
         dark:text-white = Turns white when dark mode is active
      */}
      <span className="text-lg font-black italic tracking-tighter text-slate-950 dark:text-white uppercase leading-none transition-colors duration-300">
        Logi<span className="text-primary">Swift</span>
      </span>
    </div>
  );
};