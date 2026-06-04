'use client';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

// Mock data berdasarkan Prisma Schema UserProfile
const pendingMitras = [
  { id: '1', name: 'Budi Santoso', email: 'budi@gmail.com', region: 'Bandar Lampung', status: 'PENDING' },
  { id: '2', name: 'Siti Aminah', email: 'siti@homestay.com', region: 'Pesawaran', status: 'PENDING' },
];

export default function MitraApprovals() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Persetujuan Mitra</h1>
      </div>

      <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-sm border border-white/50 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-5 font-medium text-gray-500">Nama & Email</th>
              <th className="p-5 font-medium text-gray-500">Wilayah</th>
              <th className="p-5 font-medium text-gray-500">Status</th>
              <th className="p-5 font-medium text-gray-500 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pendingMitras.map((mitra, idx) => (
              <motion.tr 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={mitra.id} 
                className="border-b border-gray-50 hover:bg-white/80 transition-colors"
              >
                <td className="p-5">
                  <p className="font-semibold text-gray-800">{mitra.name}</p>
                  <p className="text-sm text-gray-500">{mitra.email}</p>
                </td>
                <td className="p-5 text-gray-600">{mitra.region}</td>
                <td className="p-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                    <Clock size={14} /> Menunggu
                  </span>
                </td>
                <td className="p-5 flex justify-end gap-3">
                  <button className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                    <XCircle size={20} />
                  </button>
                  <button className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                    <CheckCircle size={20} />
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