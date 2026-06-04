"use client";

import React, { useState } from 'react';

// Import Komponen Layout
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ModalKeluar from '@/components/layout/ModalKeluar';

// Import Komponen Konten (Pastikan Anda sudah membuat/mengubah nama file ini di folder dashboard)
import Overview from '@/components/dashboard/Overview';
import RegionManagement from '@/components/dashboard/RegionManagement';
import MitraApprovals from '@/components/dashboard/MitraApprovals';
import Destinations from '@/components/dashboard/Destinations';
import Services from '@/components/dashboard/Services';
import Settings from '@/components/dashboard/Settings';

export default function DashboardPage() {
  // State Management
  const [activeMenu, setActiveMenu] = useState('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  // Simulasi Role (Nantinya nilai ini diambil dari JWT Token / Session Auth)
  // Ubah ke 'ADMIN_WILAYAH' untuk melihat bagaimana menu 'Manajemen Wilayah' otomatis hilang
  const userRole = 'SUPER_ADMIN'; 

  // Fungsi untuk merender komponen secara dinamis berdasarkan menu yang diklik
  const renderContent = () => {
    switch (activeMenu) {
      case 'Overview':
        return <Overview />;
      case 'Regions':
        return <RegionManagement />;
      case 'MitraApprovals':
        return <MitraApprovals />;
      case 'Destinations':
        return <Destinations />;
      case 'Services':
        return <Services />;
      case 'Settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50">
      
      {/* 1. Sidebar Component */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
        onLogoutClick={() => setIsLogoutModalOpen(true)}
        userRole={userRole}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header Component */}
        {/* Pastikan Header Anda memiliki props onMenuClick untuk membuka sidebar di mobile */}
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)} 
          activeMenu={activeMenu} 
        />

        {/* Dynamic Content Rendering */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth">
          {/* Animasi transisi ringan saat render */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* 3. Modal Logout */}
      {/* Pastikan komponen ModalKeluar menerima isOpen dan onClose */}
      {isLogoutModalOpen && (
        <ModalKeluar 
          isOpen={isLogoutModalOpen} 
          onClose={() => setIsLogoutModalOpen(false)} 
        />
      )}
      
    </div>
  );
}