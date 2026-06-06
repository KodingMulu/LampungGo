'use client';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Map, Activity } from 'lucide-react';

const regionsData = [
  { id: '1', name: 'Bandar Lampung', totalDestinations: 12, totalMitra: 45, status: 'ACTIVE' },
  { id: '2', name: 'Pesawaran', totalDestinations: 28, totalMitra: 34, status: 'ACTIVE' },
  { id: '3', name: 'Pesisir Barat', totalDestinations: 8, totalMitra: 5, status: 'INACTIVE' },
];

export default function RegionManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Manajemen Wilayah</h1>
          <p className="text-gray-500 text-sm mt-1">Atur kabupaten/kota operasi platform.</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-2xl hover:bg-gray-800 transition-all shadow-lg active:scale-95">
          <Plus size={18} />
          <span className="font-medium text-sm">Tambah Wilayah</span>
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-5 font-bold text-gray-400 text-xs uppercase tracking-wider">Nama Wilayah</th>
              <th className="p-5 font-bold text-gray-400 text-xs uppercase tracking-wider text-center">Destinasi</th>
              <th className="p-5 font-bold text-gray-400 text-xs uppercase tracking-wider">Status</th>
              <th className="p-5 font-bold text-gray-400 text-xs uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {regionsData.map((region, idx) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={region.id} 
                className="border-b border-gray-50 hover:bg-white transition-colors"
              >
                <td className="p-5 flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><Map size={18} /></div>
                  <span className="font-semibold text-gray-800">{region.name}</span>
                </td>
                <td className="p-5 text-center font-medium text-gray-600">{region.totalDestinations}</td>
                <td className="p-5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${region.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                    <Activity size={14} /> {region.status === 'ACTIVE' ? 'Aktif' : 'Non-Aktif'}
                  </span>
                </td>
                <td className="p-5 flex justify-end gap-2">
                  <button className="p-2 rounded-xl text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"><Edit2 size={16} /></button>
                  <button className="p-2 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}