"use client";

import React from 'react';
import { LogOut, AlertCircle, X } from 'lucide-react';

interface ModalKeluarProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalKeluar({ isOpen, onClose, onConfirm }: ModalKeluarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-0">
      
      {/* Background Overlay yang menggelapkan layar */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Kotak Modal Utama */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Tombol Tutup (X) di pojok */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Konten Modal */}
        <div className="p-8 sm:p-10 text-center">
          
          {/* Ikon Peringatan/Logout */}
          <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
              <LogOut className="w-7 h-7 text-red-600 ml-1" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Keluar dari Akun?
          </h2>
          
          <p className="text-slate-500 mb-8">
            Anda harus login kembali untuk mengakses e-tiket, destinasi favorit, dan pengaturan akun Anda.
          </p>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Batal
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
            >
              Ya, Keluar
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}