"use client";

import React from 'react';
import { 
  Compass, 
  Map, 
  Ticket, 
  Heart, 
  Settings, 
  LogOut, 
  X 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

export default function Sidebar({ isOpen, onClose, activeMenu, setActiveMenu }: SidebarProps) {
  const menuItems = [
    { id: 'Overview', icon: <Compass className="w-5 h-5" />, label: 'Ikhtisar' },
    { id: 'Destinations', icon: <Map className="w-5 h-5" />, label: 'Eksplorasi' },
    { id: 'Tickets', icon: <Ticket className="w-5 h-5" />, label: 'Tiket & Booking' },
    { id: 'Favorites', icon: <Heart className="w-5 h-5" />, label: 'Favorit' },
  ];

  return (
    <>
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2 text-emerald-700">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <Compass className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xl font-bold tracking-wider text-slate-800">JELAJAH</span>
          </div>
          <button 
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            onClick={onClose}
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 mt-2">Menu Utama</p>
          {menuItems.map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  onClose(); // Tutup sidebar di mobile setelah klik
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className={isActive ? 'text-emerald-600' : 'text-slate-400'}>
                  {item.icon}
                </div>
                {item.label}
              </button>
            );
          })}

          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 mt-8">Lainnya</p>
          
          {/* TOMBOL PENGATURAN YANG SUDAH DIPERBARUI */}
          <button 
            onClick={() => {
              setActiveMenu('Settings');
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
              activeMenu === 'Settings' 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Settings className={`w-5 h-5 ${activeMenu === 'Settings' ? 'text-emerald-600' : 'text-slate-400'}`} />
            Pengaturan Akun
          </button>

        </nav>

        {/* Profile Footer Sidebar */}
        <div className="p-4 border-t border-slate-100 flex-shrink-0">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium">
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Overlay Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
}