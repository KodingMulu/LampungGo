"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  UserCheck, 
  MapPin, 
  Store,
  Settings, 
  LogOut, 
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  onLogoutClick?: () => void;
  userRole?: 'SUPER_ADMIN' | 'ADMIN_WILAYAH'; // Tambahkan role untuk filter menu
}

export default function Sidebar({ 
  isOpen, 
  onClose, 
  activeMenu, 
  setActiveMenu, 
  onLogoutClick,
  userRole = 'SUPER_ADMIN' // Default untuk keperluan UI testing
}: SidebarProps) {
  
  // Daftar menu disesuaikan dengan kebutuhan CMS
  const allMenuItems = [
    { id: 'Overview', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Ikhtisar', roles: ['SUPER_ADMIN', 'ADMIN_WILAYAH'] },
    { id: 'Regions', icon: <Map className="w-5 h-5" />, label: 'Manajemen Wilayah', roles: ['SUPER_ADMIN'] }, // Khusus Super Admin
    { id: 'MitraApprovals', icon: <UserCheck className="w-5 h-5" />, label: 'Approval Mitra', roles: ['SUPER_ADMIN', 'ADMIN_WILAYAH'] },
    { id: 'Destinations', icon: <MapPin className="w-5 h-5" />, label: 'Destinasi', roles: ['SUPER_ADMIN', 'ADMIN_WILAYAH'] },
    { id: 'Services', icon: <Store className="w-5 h-5" />, label: 'Layanan Mitra', roles: ['SUPER_ADMIN', 'ADMIN_WILAYAH'] },
  ];

  // Filter menu berdasarkan role
  const menuItems = allMenuItems.filter(item => item.roles.includes(userRole));

  return (
    <>
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out flex flex-col
        bg-white/80 backdrop-blur-2xl border-r border-white/50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100/50 flex-shrink-0">
          <div className="flex items-center gap-3 text-gray-800">
            <div className="p-2.5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg shadow-gray-900/20">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="block text-lg font-bold tracking-tight text-gray-900 leading-none">LampungGo</span>
              <span className="block text-xs font-medium text-gray-500 mt-1 uppercase tracking-wider">Workspace</span>
            </div>
          </div>
          <button 
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100/50 transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Utama */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 mt-2">Menu Utama</p>
          
          {menuItems.map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  onClose(); 
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium text-sm ${
                  isActive 
                    ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10 scale-[0.98]' 
                    : 'text-gray-500 hover:bg-gray-100/80 hover:text-gray-900'
                }`}
              >
                <div className={isActive ? 'text-gray-300' : 'text-gray-400'}>
                  {item.icon}
                </div>
                {item.label}
              </button>
            );
          })}

          <div className="pt-6 mt-6 border-t border-gray-100/50">
            <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Pengaturan</p>
            
            <button 
              onClick={() => {
                setActiveMenu('Settings');
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium text-sm ${
                activeMenu === 'Settings' 
                  ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10 scale-[0.98]' 
                  : 'text-gray-500 hover:bg-gray-100/80 hover:text-gray-900'
              }`}
            >
              <Settings className={`w-5 h-5 ${activeMenu === 'Settings' ? 'text-gray-300' : 'text-gray-400'}`} />
              Sistem Akun
            </button>
          </div>
        </nav>

        {/* Tombol Logout di Bawah */}
        <div className="p-4 border-t border-gray-100/50">
          <button 
            onClick={onLogoutClick}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium text-sm text-red-600 hover:bg-red-50 hover:text-red-700 group"
          >
            <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-600 transition-colors" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Overlay Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/20 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}
    </>
  );
}