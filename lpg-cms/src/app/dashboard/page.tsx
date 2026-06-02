"use client";

import React, { useState } from 'react';

// Import komponen UI layout
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import ModalKeluar from '@/components/layout/ModalKeluar';

// Import komponen konten Dashboard
import Ikhtisar from '@/components/dashboard/Ikhtisar';
import Eksplorasi from '@/components/dashboard/Eksplorasi';
import TiketBooking from '@/components/dashboard/TiketBooking';
import Favorit from '@/components/dashboard/Favorit';
import Pengaturan from '@/components/dashboard/pengaturan'; // Pastikan nama file Pengaturan.tsx
import ItineraryPlanner from '@/components/dashboard/ItineraryPlanner';
import SplitBill from '@/components/dashboard/SplitBill'; // Import fitur baru

// Data User
const currentUser = {
  name: "Raden Intan",
  role: "Wisatawan",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
};

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Overview'); 
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const getPageTitle = () => {
    switch (activeMenu) {
      case 'Overview': return 'Ikhtisar';
      case 'Destinations': return 'Eksplorasi';
      case 'Tickets': return 'Tiket & Booking';
      case 'Itinerary': return 'Rencana Perjalanan';
      case 'SplitBill': return 'Kalkulator Patungan'; // Judul untuk menu Split Bill
      case 'Favorites': return 'Destinasi Favorit';
      case 'Settings': return 'Pengaturan Akun';
      default: return 'Dashboard';
    }
  };

  const handleConfirmLogout = () => {
    alert("Berhasil Keluar!");
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex overflow-hidden relative">
      
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
          onSettingsClick={() => setActiveMenu('Settings')}
          onLogoutClick={() => setIsLogoutModalOpen(true)}  
        />

        {/* Konten Utama */}
        <main className="flex-1 overflow-y-auto scroll-smooth pb-24 lg:pb-0">
          {activeMenu === 'Overview' && <Ikhtisar />}
          {activeMenu === 'Destinations' && <Eksplorasi />}
          {activeMenu === 'Tickets' && <TiketBooking />}
          {activeMenu === 'Itinerary' && <ItineraryPlanner />}
          {activeMenu === 'SplitBill' && <SplitBill />} {/* Rendering komponen SplitBill */}
          {activeMenu === 'Favorites' && <Favorit />}
          {activeMenu === 'Settings' && <Pengaturan />}
        </main>
      </div>

      <BottomNav 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
      />

      <ModalKeluar 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}