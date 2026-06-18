import React from 'react';

const blogs = [
  { date: "MAR 12, 2024", title: "The Future of AI in Supply Chain Management", tag: "TECHNOLOGY" },
  { date: "MAR 10, 2024", title: "How to Reduce Shipping Costs in 2024", tag: "EFFICIENCY" },
  { date: "MAR 05, 2024", title: "Global Trade Shifts: What You Need to Know", tag: "MARKET" },
];

export const LatestInsights = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-16">
        <p className="text-primary font-black tracking-[0.4em] text-xs uppercase mb-4">News & Insights</p>
        <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">STAY AHEAD.</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {blogs.map((post, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="h-64 bg-white/5 border border-white/10 mb-6 overflow-hidden relative">
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity" />
              <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-3 py-1">
                {post.tag}
              </div>
            </div>
            <p className="text-xs text-gray-500 font-bold mb-3">{post.date}</p>
            <h4 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
              {post.title}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};