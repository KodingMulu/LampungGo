'use client';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, UserCheck } from 'lucide-react';

const pendingMitras = [
  { id: '1', name: 'Budi Santoso', email: 'budi@gmail.com', type: 'Homestay', region: 'Pesawaran', date: '12 Okt 2023' },
  { id: '2', name: 'Siti Aminah', email: 'siti@tour.com', type: 'Tour Guide', region: 'Bandar Lampung', date: '14 Okt 2023' },
];

export default function MitraApprovals() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Approval Mitra</h1>
          <p className="text-gray-500 text-sm mt-1">Verifikasi pendaftaran mitra baru.</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-5 font-bold text-gray-400 text-xs uppercase tracking-wider">Mitra Info</th>
              <th className="p-5 font-bold text-gray-400 text-xs uppercase tracking-wider">Tipe Layanan</th>
              <th className="p-5 font-bold text-gray-400 text-xs uppercase tracking-wider">Wilayah</th>
              <th className="p-5 font-bold text-gray-400 text-xs uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pendingMitras.map((mitra, idx) => (
              <motion.tr 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={mitra.id} 
                className="border-b border-gray-50 hover:bg-white transition-colors"
              >
                <td className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                    {mitra.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{mitra.name}</p>
                    <p className="text-xs text-gray-500">{mitra.email} • {mitra.date}</p>
                  </div>
                </td>
                <td className="p-5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">{mitra.type}</span>
                </td>
                <td className="p-5 text-sm text-gray-600 font-medium">{mitra.region}</td>
                <td className="p-5 flex justify-end gap-3">
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-semibold">
                    <XCircle size={16} /> Tolak
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors text-sm font-semibold">
                    <CheckCircle size={16} /> Terima
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}