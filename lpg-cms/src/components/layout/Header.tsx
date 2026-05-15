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
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30 flex-shrink-0">
      
      {/* Bagian Kiri (Menu Icon & Title) */}
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={onMenuClick}
          aria-label="Buka menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 hidden sm:block">
          {title}
        </h1>
      </div>

      {/* Bagian Kanan (Search, Notification, Profile) */}
      <div className="flex items-center gap-4 sm:gap-6">
        
        {/* Search Bar (Sembunyi di mobile kecil) */}
        <div className="hidden md:flex relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Cari destinasi..." 
            className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-full text-sm w-64 transition-all duration-300 outline-none"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-3 pl-2 sm:pl-4 sm:border-l border-slate-200 cursor-pointer group">
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 group-hover:border-emerald-200 transition-colors"
          />
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-700">{user.name}</p>
            <p className="text-xs text-slate-400">{user.role}</p>
          </div>
        </div>

      </div>
    </header>
  );
}