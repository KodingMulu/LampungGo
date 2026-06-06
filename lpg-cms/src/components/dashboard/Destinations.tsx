'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react';
import DestinationModal from './DestinationModal';

const destinations = [
  { id: '1', name: 'Pulau Pahawang', location: 'Pesawaran', lat: '-5.671', lng: '105.212' },
  { id: '2', name: 'Way Kambas', location: 'Lampung Timur', lat: '-4.912', lng: '105.789' },
];

export default function Destinations() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Destinasi Wisata</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola titik lokasi pariwisata.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-2xl hover:bg-gray-800 transition-all shadow-lg active:scale-95"
        >
          <Plus size={18} />
          <span className="font-medium text-sm">Tambah Destinasi</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {destinations.map((dest, idx) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            key={dest.id}
            className="group bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-white/90 backdrop-blur shadow-sm rounded-xl text-blue-600 hover:bg-blue-50"><Edit2 size={16}/></button>
              <button className="p-2 bg-white/90 backdrop-blur shadow-sm rounded-xl text-red-600 hover:bg-red-50"><Trash2 size={16}/></button>
            </div>
            
            <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-5 flex items-center justify-center relative overflow-hidden">
               <MapPin size={40} className="text-gray-300" />
            </div>
            
            <h3 className="text-lg font-bold text-gray-900">{dest.name}</h3>
            <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1.5 font-medium">
              <MapPin size={14} className="text-emerald-500" /> {dest.location}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4 text-xs font-bold text-gray-400">
              <span className="bg-gray-50 px-2 py-1 rounded-md">Lat: {dest.lat}</span>
              <span className="bg-gray-50 px-2 py-1 rounded-md">Lng: {dest.lng}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && <DestinationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}