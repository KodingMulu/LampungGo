"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ModalKeluar from '@/components/layout/ModalKeluar';
import Overview from '@/components/dashboard/Overview';
import RegionManagement from '@/components/dashboard/RegionManagement';
import MitraApprovals from '@/components/dashboard/MitraApprovals';
import Destinations from '@/components/dashboard/Destinations';
import Services from '@/components/dashboard/Services';
import Settings from '@/components/dashboard/Settings';

type UserRole = "ADMIN_WILAYAH" | "SUPER_ADMIN" | undefined;

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('ADMIN_WILAYAH');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          if (parsedUser?.role === 'SUPER_ADMIN' || parsedUser?.role === 'ADMIN_WILAYAH') {
            setUserRole(parsedUser.role);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsClient(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

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

  if (!isClient) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
        onLogoutClick={() => setIsLogoutModalOpen(true)}
        userRole={userRole}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)} 
          activeMenu={activeMenu} 
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderContent()}
          </div>
        </main>
      </div>

      {isLogoutModalOpen && (
        <ModalKeluar 
          isOpen={isLogoutModalOpen} 
          onClose={() => setIsLogoutModalOpen(false)} 
        />
      )}
    </div>
  );
}