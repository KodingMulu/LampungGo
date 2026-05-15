"use client";

import React, { useState } from 'react';

// Pastikan path import ini sesuai dengan nama folder yang Anda buat di src/components
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Ikhtisar from '@/components/dashboard/Ikhtisar';
import Eksplorasi from '@/components/dashboard/Eksplorasi';
import TiketBooking from '@/components/dashboard/TiketBooking';
import Favorit from '@/components/dashboard/Favorit';
import Pengaturan from '@/components/dashboard/pengaturan';

// Data User Sementara
const currentUser = {
  name: "Raden Intan",
  role: "Wisatawan",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
};

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Overview'); 

  const getPageTitle = () => {
    switch (activeMenu) {
      case 'Overview': return 'Ikhtisar';
      case 'Destinations': return 'Eksplorasi';
      case 'Tickets': return 'Tiket & Booking';
      case 'Favorites': return 'Destinasi Favorit';
      case 'Settings': return 'Pengaturan Akun'; // <-- 2. Judul untuk Pengaturan ditambahkan
      default: return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex overflow-hidden">
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)}
          title={getPageTitle()}
          user={currentUser}
        />

        <main className="flex-1 overflow-y-auto scroll-smooth">
          
          {/* Tampilan Ikhtisar */}
          {activeMenu === 'Overview' && <Ikhtisar />}
          
          {/* Tampilan Eksplorasi */}
          {activeMenu === 'Destinations' && <Eksplorasi />}

          {/* Tampilan Tiket & Booking */}
          {activeMenu === 'Tickets' && <TiketBooking />}
          
          {/* Tampilan Destinasi Favorit */}
          {activeMenu === 'Favorites' && <Favorit />}

          {/* Tampilan Pengaturan (Baru Ditambahkan) */}
          {activeMenu === 'Settings' && <Pengaturan />}

        </main>
      </div>
    </div>
  );
}