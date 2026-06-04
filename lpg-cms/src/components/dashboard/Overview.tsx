'use client';
import { motion } from 'framer-motion';
import { Map, Users, MapPin, Tent } from 'lucide-react';

const stats = [
  { label: 'Total Wilayah', value: '15', icon: Map, color: 'text-blue-500' },
  { label: 'Mitra Menunggu Approval', value: '8', icon: Users, color: 'text-amber-500' },
  { label: 'Total Destinasi', value: '42', icon: MapPin, color: 'text-emerald-500' },
  { label: 'Layanan Aktif', value: '124', icon: Tent, color: 'text-purple-500' },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Ikhtisar Platform</h1>
          <p className="text-gray-500 mt-1">Pantau aktivitas LampungGo secara real-time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-white/50 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-2xl bg-gray-50/50 ${stat.color}`}>
                <stat.icon size={28} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}