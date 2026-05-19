"use client";

import React, { useState } from 'react';
import { Menu, Bell, Search, Ticket, Tag, Info, CheckCircle2 } from 'lucide-react';

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

// 1. Data Dummy untuk daftar Notifikasi
const dummyNotifications = [
  {
    id: 1,
    type: 'ticket',
    title: 'Pembayaran Berhasil! 🎉',
    desc: 'Tiket One Day Trip Pulau Pahawang Anda sudah terbit.',
    time: '5 mnt yang lalu',
    unread: true,
  },
  {
    id: 2,
    type: 'promo',
    title: 'Promo Spesial Akhir Pekan',
    desc: 'Diskon 20% untuk pemesanan tur Teluk Kiluan khusus hari ini.',
    time: '2 jam yang lalu',
    unread: true,
  },
  {
    id: 3,
    type: 'info',
    title: 'Perjalanan Selesai',
    desc: 'Bagaimana pengalaman Anda di Way Kambas? Yuk, berikan ulasan!',
    time: '1 hari yang lalu',
    unread: false,
  }
];

export default function Header({ onMenuClick, title, user }: HeaderProps) {
  // 2. State untuk mengontrol pop-up notifikasi buka/tutup
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Fungsi untuk mendapatkan ikon berdasarkan tipe notifikasi
  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'ticket': return <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full"><Ticket className="w-4 h-4" /></div>;
      case 'promo': return <div className="p-2 bg-rose-100 text-rose-600 rounded-full"><Tag className="w-4 h-4" /></div>;
      case 'info': return <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><Info className="w-4 h-4" /></div>;
      default: return <div className="p-2 bg-slate-100 text-slate-600 rounded-full"><Bell className="w-4 h-4" /></div>;
    }
  };

  return (
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
        
        {/* Search Bar */}
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

        {/* CONTAINER NOTIFIKASI */}
        <div className="relative">
          {/* 3. Tombol Lonceng yang sudah ditambahkan event onClick */}
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`relative p-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 z-50 ${
              isNotifOpen ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Bell className="w-5 h-5" />
            
            {/* Titik Merah (Hanya muncul jika ada notif yang belum dibaca) */}
            {dummyNotifications.some(n => n.unread) && (
              <>
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white z-10"></span>
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping opacity-75"></span>
              </>
            )}
          </button>

          {/* Invisible Overlay (Agar pop-up tertutup saat user klik area kosong di luar pop-up) */}
          {isNotifOpen && (
            <div 
              className="fixed inset-0 z-40 cursor-default" 
              onClick={() => setIsNotifOpen(false)}
            />
          )}

          {/* 4. Kotak Pop-up Notifikasi (Muncul jika isNotifOpen = true) */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-50 animate-in slide-in-from-top-4 fade-in duration-200">
              
              {/* Header Pop-up */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-extrabold text-slate-800">Notifikasi</h3>
                <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Tandai dibaca
                </button>
              </div>

              {/* List Notifikasi */}
              <div className="max-h-[350px] overflow-y-auto hide-scrollbar">
                {dummyNotifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-4 border-b border-slate-50 flex gap-4 hover:bg-slate-50 cursor-pointer transition-colors ${
                      notif.unread ? 'bg-emerald-50/30' : ''
                    }`}
                  >
                    {/* Ikon Notifikasi */}
                    <div className="flex-shrink-0 mt-1">
                      {getNotifIcon(notif.type)}
                    </div>
                    
                    {/* Konten Notifikasi */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-sm font-bold ${notif.unread ? 'text-slate-900' : 'text-slate-700'}`}>
                          {notif.title}
                        </h4>
                        {/* Titik penanda belum dibaca */}
                        {notif.unread && <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>}
                      </div>
                      <p className="text-xs font-medium text-slate-500 leading-relaxed mb-2">
                        {notif.desc}
                      </p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {notif.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Pop-up */}
              <div className="p-3 border-t border-slate-100 text-center bg-slate-50/50 hover:bg-slate-100 transition-colors cursor-pointer">
                <button className="text-sm font-bold text-slate-600">
                  Lihat Semua Notifikasi
                </button>
              </div>

            </div>
          )}
        </div>

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