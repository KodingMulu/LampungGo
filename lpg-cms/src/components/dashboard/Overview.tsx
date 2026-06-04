'use client';
import { motion } from 'framer-motion';
import { Map, Users, MapPin, Store } from 'lucide-react';

const stats = [
  { label: 'Total Wilayah', value: '15', icon: Map, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Menunggu Approval', value: '8', icon: Users, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Total Destinasi', value: '42', icon: MapPin, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'Layanan Aktif', value: '124', icon: Store, color: 'text-purple-500', bg: 'bg-purple-50' },
];

export default function Overview() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Ikhtisar Platform</h1>
          <p className="text-gray-500 text-sm mt-1">Pantau aktivitas LampungGo secara real-time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-black text-gray-800 mt-2">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} strokeWidth={2.5} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}