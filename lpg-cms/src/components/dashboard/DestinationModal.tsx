'use client';
import { motion } from 'framer-motion';
import { X, MapPin, Image as ImageIcon } from 'lucide-react';

export default function DestinationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white/90 backdrop-blur-2xl w-full max-w-lg rounded-3xl shadow-2xl border border-white p-6 md:p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Tambah Destinasi</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nama Destinasi</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-gray-900 outline-none transition-all text-sm font-medium" placeholder="Contoh: Pantai Klara" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Latitude</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-gray-900 outline-none transition-all text-sm font-medium" placeholder="-5.xxx" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Longitude</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-gray-900 outline-none transition-all text-sm font-medium" placeholder="105.xxx" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Upload Foto</label>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer">
              <ImageIcon size={32} className="mb-2" />
              <span className="text-sm font-medium">Klik untuk upload gambar</span>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 rounded-xl text-gray-600 font-semibold bg-gray-100 hover:bg-gray-200 transition-colors">Batal</button>
            <button type="button" className="flex-1 px-4 py-3 rounded-xl text-white font-semibold bg-gray-900 hover:bg-gray-800 transition-colors shadow-lg">Simpan</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}