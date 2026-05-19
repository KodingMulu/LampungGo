"use client";

import React, { useState } from 'react';

// Pastikan path import ini sesuai dengan nama folder yang Anda buat di src/components
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Ikhtisar from '@/components/dashboard/Ikhtisar';
import Eksplorasi from '@/components/dashboard/Eksplorasi';
import TiketBooking from '@/components/dashboard/TiketBooking';
import Favorit from '@/components/dashboard/Favorit';
import Pengaturan from '@/components/dashboard/pengaturan'; // <-- Huruf P sudah diperbaiki menjadi besar
import ModalKeluar from '@/components/layout/ModalKeluar'; // <-- 1. Import ModalKeluar

// Data User Sementara
const currentUser = {
  name: "Raden Intan",
  role: "Wisatawan",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
};

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Overview'); 
  
  // 2. State untuk mengatur kapan Pop-up Keluar muncul
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const getPageTitle = () => {
    switch (activeMenu) {
      case 'Overview': return 'Ikhtisar';
      case 'Destinations': return 'Eksplorasi';
      case 'Tickets': return 'Tiket & Booking';
      case 'Favorites': return 'Destinasi Favorit';
      case 'Settings': return 'Pengaturan Akun';
      default: return 'Dashboard';
    }
  };

  // 3. Fungsi yang dijalankan jika tombol "Ya, Keluar" ditekan di dalam pop-up
  const handleConfirmLogout = () => {
    // Nantinya logika untuk menghapus sesi/token dan redirect ke halaman Login diletakkan di sini
    alert("Berhasil Keluar! Anda akan dialihkan ke halaman Login.");
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex overflow-hidden relative">
      
      {/* 4. Berikan fungsi onLogoutClick ke Sidebar agar Sidebar bisa memunculkan pop-up */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        onLogoutClick={() => setIsLogoutModalOpen(true)} 
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)}
          title={getPageTitle()}
          user={currentUser}
          onSettingsClick={() => setActiveMenu('Settings')} // <-- UPDATE: Mengarahkan ke Pengaturan
          onLogoutClick={() => setIsLogoutModalOpen(true)}  // <-- UPDATE: Memunculkan Modal Keluar
        />

        <main className="flex-1 overflow-y-auto scroll-smooth">
          
          {/* Tampilan Konten */}
          {activeMenu === 'Overview' && <Ikhtisar />}
          {activeMenu === 'Destinations' && <Eksplorasi />}
          {activeMenu === 'Tickets' && <TiketBooking />}
          {activeMenu === 'Favorites' && <Favorit />}
          {activeMenu === 'Settings' && <Pengaturan />}

        </main>
      </div>

      {/* 5. Tampilan Pop-up (Modal) Keluar dipasang di luar susunan halaman */}
      <ModalKeluar 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)} // Menutup pop-up jika diklik 'Batal'
        onConfirm={handleConfirmLogout}             // Menjalankan fungsi jika diklik 'Ya, Keluar'
      />

    </div>
  );
}