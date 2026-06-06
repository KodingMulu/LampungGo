'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import { MitraStatus, UserProfile } from '@/types/mitra';

export default function MitraApprovals() {
  const [mitras, setMitras] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchPendingMitra = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      const response = await axios.get(`${backendUrl}/api/users/mitra/pending`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMitras(response.data);
    } catch (error) {
      console.error("Gagal memuat mitra:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingMitra();
  }, []);

  const handleUpdateStatus = async (id: string, status: MitraStatus) => {
    setProcessingId(id);
    try {
      const token = localStorage.getItem('access_token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      
      await axios.patch(`${backendUrl}/api/users/mitra/${id}/validate`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refresh list setelah sukses
      fetchPendingMitra();
    } catch (error) {
      console.error("Gagal update status:", error);
      alert("Gagal memproses mitra.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Approval Mitra</h1>
        <p className="text-gray-500 text-sm mt-1">Verifikasi pendaftaran mitra baru di wilayah Anda.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden">
        {isLoading ? (
          <div className="p-10 text-center text-gray-500 flex justify-center items-center gap-2">
            <Loader2 className="animate-spin" size={20} /> Memuat data...
          </div>
        ) : mitras.length === 0 ? (
          <div className="p-10 text-center text-gray-500">Tidak ada mitra yang menunggu approval.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-5 font-bold text-gray-400 text-xs uppercase">Mitra Info</th>
                <th className="p-5 font-bold text-gray-400 text-xs uppercase">Email</th>
                <th className="p-5 font-bold text-gray-400 text-xs uppercase text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mitras.map((mitra, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={mitra.id} 
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                      {mitra.name.charAt(0)}
                    </div>
                    <p className="font-semibold text-gray-800">{mitra.name}</p>
                  </td>
                  <td className="p-5 text-sm text-gray-600">{mitra.email}</td>
                  <td className="p-5 flex justify-end gap-3">
                    <button 
                      disabled={processingId === mitra.id}
                      onClick={() => handleUpdateStatus(mitra.id, MitraStatus.REJECTED)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-semibold disabled:opacity-50"
                    >
                      <XCircle size={16} /> Tolak
                    </button>
                    <button 
                      disabled={processingId === mitra.id}
                      onClick={() => handleUpdateStatus(mitra.id, MitraStatus.APPROVED)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors text-sm font-semibold disabled:opacity-50"
                    >
                      {processingId === mitra.id ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle size={16} />}
                      Terima
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}