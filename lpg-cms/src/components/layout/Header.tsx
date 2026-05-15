"use client";

import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';

interface User {
  name: string;
  avatar: string;
  role: string;
}

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  user: User;
}

export default function Header({ onMenuClick, title, user }: HeaderProps) {
  return (
    // PERUBAHAN UTAMA DI SINI:
    // bg-white/70 (background putih transparan 70%)
    // backdrop-blur-xl (efek blur kaca yang lebih kuat)
    // border-white/50 (garis bawah sedikit transparan)
    // ditambahkan sedikit soft shadow
    <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.03)] flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30 flex-shrink-0 transition-all duration-300">
      
      {/* Bagian Kiri (Menu Icon & Title) */}
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
          onClick={onMenuClick}
          aria-label="Buka menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 hidden sm:block tracking-tight">
          {title}
        </h1>
      </div>

      {/* Bagian Kanan (Search, Notification, Profile) */}
      <div className="flex items-center gap-4 sm:gap-6">
        
        {/* Search Bar dengan efek fokus yang lebih halus */}
        <div className="hidden md:flex relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Cari destinasi..." 
            className="pl-10 pr-4 py-2.5 bg-slate-100/80 hover:bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-full text-sm w-64 transition-all duration-300 outline-none shadow-inner"
          />
        </div>

        {/* Notifikasi dengan animasi ping pada titik merah */}
        <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-full transition-all duration-200 hover:scale-105 active:scale-95">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping opacity-75"></span>
        </button>

        {/* User Avatar dengan interaksi hover */}
        <div className="flex items-center gap-3 pl-2 sm:pl-4 sm:border-l border-slate-200/80 cursor-pointer group hover:opacity-90 transition-opacity">
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-emerald-100 transition-all duration-300"
          />
          <div className="hidden sm:block text-left">
            <p className="text-sm font-bold text-slate-700 leading-tight">{user.name}</p>
            <p className="text-xs text-slate-500 font-medium">{user.role}</p>
          </div>
        </div>

      </div>
    </header>
  );
}