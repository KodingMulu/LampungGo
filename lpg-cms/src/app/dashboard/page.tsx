"use client";

import React, { useState } from 'react';

// Pastikan path import ini sesuai dengan nama folder yang Anda buat di src/components
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Ikhtisar from '@/components/dashboard/Ikhtisar';
import Eksplorasi from '@/components/dashboard/Eksplorasi';

// Data User Sementara
const currentUser = {
  name: "Raden Intan",
  role: "Wisatawan",
  avatar: "[https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80](https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80)"
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
          
          {activeMenu === 'Overview' && <Ikhtisar />}
          
          {activeMenu === 'Destinations' && <Eksplorasi />}
          
          {(activeMenu === 'Tickets' || activeMenu === 'Favorites') && (
             <div className="flex items-center justify-center h-full p-10 animate-in fade-in">
               <div className="text-center bg-white p-12 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50">
                 <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                   <span className="text-3xl">🚧</span>
                 </div>
                 <h2 className="text-2xl font-bold text-slate-800">Halaman {getPageTitle()}</h2>
                 <p className="text-slate-500 mt-3 max-w-sm mx-auto">
                   Fitur ini sedang dalam tahap pengembangan. Segera kembali untuk melihat pembaruan!
                 </p>
               </div>
             </div>
          )}

        </main>
      </div>
    </div>
  );
}
