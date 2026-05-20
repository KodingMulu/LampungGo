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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200/60 shadow-[0_-4px_30px_rgba(0,0,0,0.05)] z-40 pb-2 pt-1 px-2 rounded-t-2xl">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = activeMenu === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className="flex flex-col items-center justify-center w-full h-full gap-1 relative group"
            >
              {/* Indikator Titik Aktif (Di atas ikon) */}
              {isActive && (
                <span className="absolute top-0 w-1 h-1 rounded-full bg-emerald-500 animate-in zoom-in" />
              )}
              
              <div 
                className={`p-1.5 rounded-xl transition-all duration-300 mt-1 ${
                  isActive ? 'text-emerald-600 bg-emerald-50 scale-110' : 'text-slate-400 group-hover:text-slate-600'
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