import React from 'react';

export const ImpactStats = () => {
  return (
    <section className="relative py-32 overflow-hidden border-y border-white/5">
      {/* Background with Blend */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075" 
          className="w-full h-full object-cover opacity-20 grayscale"
          alt="Logistics Background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
        {[
          { label: "Vessels Tracked", value: "14.2K" },
          { label: "Countries Covered", value: "195+" },
          { label: "Annual Shipments", value: "2.5M" },
          { label: "Expert Workers", value: "850+" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <h3 className="text-5xl lg:text-7xl font-black text-primary mb-2 tracking-tighter">
              {stat.value}
            </h3>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};