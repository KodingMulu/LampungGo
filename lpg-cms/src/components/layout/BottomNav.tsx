"use client";

import React from 'react';
import { Compass, Map, Ticket, Heart, Settings } from 'lucide-react';

interface BottomNavProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

export default function BottomNav({ activeMenu, setActiveMenu }: BottomNavProps) {
  const navItems = [
    { id: 'Overview', icon: <Compass className="w-5 h-5" />, label: 'Beranda' },
    { id: 'Destinations', icon: <Map className="w-5 h-5" />, label: 'Eksplor' },
    { id: 'Tickets', icon: <Ticket className="w-5 h-5" />, label: 'Tiket' },
    { id: 'Favorites', icon: <Heart className="w-5 h-5" />, label: 'Favorit' },
    { id: 'Settings', icon: <Settings className="w-5 h-5" />, label: 'Akun' },
  ];

  return (
    // Membawa desain floating (mengambang) dan membulat
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200/60 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40 pb-2 pt-2 px-2 rounded-t-3xl">
      <div className="flex justify-around items-center h-14">
        {navItems.map((item) => {
          const isActive = activeMenu === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className="flex flex-col items-center justify-center w-full h-full gap-1 relative group active:scale-95 transition-transform"
            >
              {/* Indikator Titik Aktif (Muncul melayang di atas ikon yang sedang diklik) */}
              {isActive && (
                <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-in zoom-in duration-300" />
              )}
              
              <div 
                className={`p-1 rounded-xl transition-all duration-300 ${
                  isActive ? 'text-emerald-600 scale-110' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                {item.icon}
              </div>
              
              <span 
                className={`text-[10px] font-bold tracking-wide transition-colors ${
                  isActive ? 'text-emerald-600' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}