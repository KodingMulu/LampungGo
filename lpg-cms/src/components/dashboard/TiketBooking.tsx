'use client';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react';

const destinations = [
  { id: '1', name: 'Pantai Mutun', location: 'Pesawaran', lat: -5.523, lng: 105.231 },
  { id: '2', name: 'Taman Nasional Way Kambas', location: 'Lampung Timur', lat: -4.912, lng: 105.789 },
];

export default function Destinations() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Manajemen Destinasi</h1>
          <p className="text-gray-500 text-sm mt-1">Atur lokasi pariwisata di wilayah Anda.</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-2xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
          <Plus size={18} />
          <span className="font-medium text-sm">Tambah Destinasi</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {destinations.map((dest, idx) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            key={dest.id}
            className="group bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-sm border border-white/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button className="p-2 bg-white/90 shadow-sm rounded-xl text-blue-600 hover:bg-blue-50"><Edit2 size={16}/></button>
              <button className="p-2 bg-white/90 shadow-sm rounded-xl text-red-600 hover:bg-red-50"><Trash2 size={16}/></button>
            </div>
            
            <div className="h-32 bg-gray-100 rounded-2xl mb-4 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <MapPin size={32} opacity={0.5} />
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800">{dest.name}</h3>
            <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1">
              <MapPin size={14} /> {dest.location}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4 text-xs font-medium text-gray-400">
              <span>Lat: {dest.lat}</span>
              <span>Lng: {dest.lng}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}