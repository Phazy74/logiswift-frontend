import React from 'react';
import { Plane, Ship, Truck, Warehouse, ArrowRight } from 'lucide-react';

const services = [
  { title: "AIR FREIGHT", icon: <Plane size={32} />, desc: "Fast global delivery via our premium air carriers." },
  { title: "OCEAN FREIGHT", icon: <Ship size={32} />, desc: "Cost-effective international shipping for large cargo." },
  { title: "ROAD TRANSPORT", icon: <Truck size={32} />, desc: "Reliable door-to-door delivery across continents." },
  { title: "WAREHOUSING", icon: <Warehouse size={32} />, desc: "Secure, climate-controlled storage for your inventory." },
];

export const ServicesGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <p className="text-primary font-black tracking-[0.4em] text-xs uppercase mb-4">Our Expertise</p>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">COMPREHENSIVE <br /> SOLUTIONS.</h2>
        </div>
        <button className="text-sm font-bold border-b-2 border-primary pb-1 hover:text-primary transition-all">
          VIEW ALL SERVICES
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/5">
        {services.map((service, i) => (
          <div key={i} className="p-10 border border-white/5 hover:bg-primary transition-all group cursor-pointer">
            <div className="text-primary group-hover:text-white mb-8 transition-colors">
              {service.icon}
            </div>
            <h4 className="text-xl font-black mb-4 group-hover:text-white">{service.title}</h4>
            <p className="text-sm text-gray-500 group-hover:text-white/80 leading-relaxed mb-8">
              {service.desc}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-primary group-hover:text-white opacity-0 group-hover:opacity-100 transition-all">
              LEARN MORE <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};