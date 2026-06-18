import React from 'react';

const recentShipments = [
  { id: "LSW123456789", status: "In Transit", origin: "Los Angeles, USA", destination: "New York, USA", date: "May 24, 2024, 10:30 AM" },
  { id: "LSW987654321", status: "Out for Delivery", origin: "Hamburg, Germany", destination: "Berlin, Germany", date: "May 24, 2024, 09:15 AM" },
  { id: "LSW112233445", status: "Delivered", origin: "Shanghai, China", destination: "Singapore", date: "May 23, 2024, 04:20 PM" },
  { id: "LS454473829", status: "In Transit", origin: "Dubai, UAE", destination: "Mumbai, India", date: "May 23, 2024, 11:05 AM" },
];

export const RecentTracking = () => {
  return (
    <div className="glass-card p-8 mt-20 overflow-hidden">
      <h2 className="text-2xl font-bold mb-8">Recent Tracking</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-white/5">
              <th className="pb-4 font-medium">Tracking Number</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium">Origin</th>
              <th className="pb-4 font-medium">Destination</th>
              <th className="pb-4 font-medium">Last Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {recentShipments.map((item, index) => (
              <tr key={index} className="group hover:bg-white/5 transition-colors">
                <td className="py-4 text-sm font-mono text-blue-400">{item.id}</td>
                <td className="py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'Delivered' ? 'bg-green-500/10 text-green-400' : 
                    item.status === 'Out for Delivery' ? 'bg-orange-500/10 text-orange-400' : 
                    'bg-blue-500/10 text-blue-400'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 text-sm text-gray-300">{item.origin}</td>
                <td className="py-4 text-sm text-gray-300">{item.destination}</td>
                <td className="py-4 text-sm text-gray-500">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};