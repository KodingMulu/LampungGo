'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X } from 'lucide-react';

interface ModalKeluarProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void; // Nanti diisi fungsi handleLogout dari auth
}

export default function ModalKeluar({ isOpen, onClose, onConfirm }: ModalKeluarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          
          {/* Backdrop blur */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white/90 backdrop-blur-2xl w-full max-w-sm rounded-3xl shadow-2xl border border-white p-6 sm:p-8"
          >
            {/* Tombol Close di Pojok Kanan Atas */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>

            {/* Ikon & Teks Konfirmasi */}
            <div className="flex flex-col items-center text-center mt-2 mb-8">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-5 shadow-inner">
                <LogOut className="w-8 h-8 text-red-500 ml-1" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Keluar dari Sistem?</h2>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                Sesi Anda akan diakhiri dan Anda harus login kembali untuk masuk ke dalam panel admin.
              </p>
            </div>

            {/* Aksi Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={onClose} 
                className="flex-1 px-4 py-3 rounded-xl text-gray-700 font-bold bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  if(onConfirm) onConfirm();
                  // SEMENTARA: Refresh halaman jika onConfirm belum disiapkan
                  window.location.href = '/auth/login';
                }} 
                className="flex-1 px-4 py-3 rounded-xl text-white font-bold bg-red-600 hover:bg-red-700 transition-all shadow-lg shadow-red-500/30 active:scale-95"
              >
                Ya, Keluar
              </button>
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}