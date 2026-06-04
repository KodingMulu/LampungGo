'use client';

import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  activeMenu: string;
}

export default function Header({ onMenuClick, activeMenu }: HeaderProps) {
  // Fungsi untuk mengubah ID menu menjadi teks yang lebih ramah dibaca
  const getMenuTitle = (menu: string) => {
    switch (menu) {
      case 'Overview': return 'Ikhtisar';
      case 'Regions': return 'Manajemen Wilayah';
      case 'MitraApprovals': return 'Approval Mitra';
      case 'Destinations': return 'Destinasi Wisata';
      case 'Services': return 'Layanan Mitra';
      case 'Settings': return 'Pengaturan Akun';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-2xl border-b border-gray-100/50 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      
      {/* Bagian Kiri: Tombol Menu (Mobile) & Judul */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 hidden sm:block tracking-tight">
          {getMenuTitle(activeMenu)}
        </h2>
      </div>

      {/* Bagian Kanan: Pencarian, Notifikasi, & Profil Admin */}
      <div className="flex items-center gap-3 sm:gap-5">
        
        {/* Search Bar (Opsional/Visual) */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-full border border-gray-100 focus-within:ring-2 focus-within:ring-gray-900 focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari sesuatu..." 
            className="bg-transparent border-none outline-none text-sm font-medium w-48 placeholder:text-gray-400"
          />
        </div>

        {/* Tombol Notifikasi */}
        <button className="relative p-2.5 text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors border border-gray-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Profil Admin */}
        <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-gray-200/60">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
            A
          </div>
          <div className="hidden md:block text-sm">
            <p className="font-bold text-gray-800 leading-none">Admin Pusat</p>
            <p className="text-[11px] font-medium text-emerald-600 mt-1 uppercase tracking-wider">Super Admin</p>
          </div>
        </div>

      </div>
    </header>
  );
}