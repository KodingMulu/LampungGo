"use client"
import React from 'react';
import Link from 'next/link'; // Pakai Link untuk navigasi
import { usePathname } from 'next/navigation'; // Hook sakti Next.js
import { Compass, Map, Ticket, Heart, Settings, LogOut, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const pathname = usePathname(); // Ini akan mengambil path seperti "/dashboard" atau "/dashboard/explorasi"

  const menuItems = [
    { id: 'Overview', icon: <Compass className="w-5 h-5" />, label: 'Ikhtisar', href: '/dashboard' },
    { id: 'Destinations', icon: <Map className="w-5 h-5" />, label: 'Eksplorasi', href: '/dashboard/eksplorasi' },
    { id: 'Tickets', icon: <Ticket className="w-5 h-5" />, label: 'Tiket & Booking', href: '/dashboard/tickets' },
    { id: 'Favorites', icon: <Heart className="w-5 h-5" />, label: 'Favorit', href: '/dashboard/favorites' },
  ];

  return (
    <>
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
           <Link href="/dashboard" className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <Compass className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xl font-bold tracking-wider text-slate-800 uppercase">Jelajah</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 mt-2">Menu Utama</p>
          
          {menuItems.map((item) => {
            // Cek apakah item ini aktif berdasarkan URL
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)} // Tutup menu mobile saat klik
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
              </Link>
            );
          })}
          
          {/* Menu Lainnya tetap sama pakai Link atau button */}
        </nav>
        
        {/* Profile Footer tetap sama */}
      </aside>

      {/* Overlay Mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};