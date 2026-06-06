'use client';
import { motion } from 'framer-motion';
import { Store, MoreVertical } from 'lucide-react';

const servicesData = [
  { id: '1', name: 'Homestay Asri', type: 'HOMESTAY', mitra: 'Budi Santoso', price: 'Rp 250.000', status: 'ACTIVE' },
  { id: '2', name: 'Paket Snorkeling Pahawang', type: 'TOUR', mitra: 'TravelLampung', price: 'Rp 150.000', status: 'ACTIVE' },
];

export default function Services() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Layanan Mitra</h1>
          <p className="text-gray-500 text-sm mt-1">Daftar layanan wisata yang ditawarkan mitra.</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-5 font-bold text-gray-400 text-xs uppercase tracking-wider">Nama Layanan</th>
              <th className="p-5 font-bold text-gray-400 text-xs uppercase tracking-wider">Tipe</th>
              <th className="p-5 font-bold text-gray-400 text-xs uppercase tracking-wider">Harga Dasar</th>
              <th className="p-5 font-bold text-gray-400 text-xs uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {servicesData.map((svc, idx) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={svc.id} 
                className="border-b border-gray-50 hover:bg-white transition-colors"
              >
                <td className="p-5">
                  <p className="font-semibold text-gray-800">{svc.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Oleh: {svc.mitra}</p>
                </td>
                <td className="p-5">
                  <span className="px-3 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-600">{svc.type}</span>
                </td>
                <td className="p-5 font-medium text-gray-600">{svc.price}</td>
                <td className="p-5 flex justify-end">
                  <button className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors">
                    <MoreVertical size={18} />
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