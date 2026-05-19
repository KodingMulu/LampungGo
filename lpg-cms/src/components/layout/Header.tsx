"use client";

import React, { useState } from 'react';
import { 
  Menu, Bell, Search, Ticket, Tag, Info, CheckCircle2, 
  Settings, HelpCircle, LogOut, ChevronDown 
} from 'lucide-react';

interface User {
  name: string;
  avatar: string;
  role: string;
}

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  user: User;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

const dummyNotifications = [
  { id: 1, type: 'ticket', title: 'Pembayaran Berhasil! 🎉', desc: 'Tiket One Day Trip Pulau Pahawang Anda sudah terbit.', time: '5 mnt yang lalu', unread: true },
  { id: 2, type: 'promo', title: 'Promo Spesial Akhir Pekan', desc: 'Diskon 20% untuk pemesanan tur Teluk Kiluan khusus hari ini.', time: '2 jam yang lalu', unread: true },
  { id: 3, type: 'info', title: 'Perjalanan Selesai', desc: 'Bagaimana pengalaman Anda di Way Kambas? Yuk, berikan ulasan!', time: '1 hari yang lalu', unread: false }
];

export default function Header({ onMenuClick, title, user, onSettingsClick, onLogoutClick }: HeaderProps) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
      
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors" onClick={onMenuClick}>
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 hidden sm:block tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        
        <div className="hidden md:flex relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          </div>
          <input type="text" placeholder="Cari destinasi..." className="pl-10 pr-4 py-2.5 bg-slate-100/80 hover:bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-full text-sm w-64 transition-all duration-300 outline-none shadow-inner" />
        </div>

        <div className="relative">
          <button 
            onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
            className={`relative p-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 z-50 ${isNotifOpen ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <Bell className="w-5 h-5" />
            {dummyNotifications.some(n => n.unread) && (
              <>
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white z-10"></span>
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping opacity-75"></span>
              </>
            )}
          </button>

          {isNotifOpen && <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsNotifOpen(false)} />}
          {isNotifOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-50 animate-in slide-in-from-top-4 fade-in duration-200">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-extrabold text-slate-800">Notifikasi</h3>
                <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Tandai dibaca
                </button>
              </div>
              <div className="max-h-[350px] overflow-y-auto hide-scrollbar">
                {dummyNotifications.map((notif) => (
                  <div key={notif.id} className={`p-4 border-b border-slate-50 flex gap-4 hover:bg-slate-50 cursor-pointer transition-colors ${notif.unread ? 'bg-emerald-50/30' : ''}`}>
                    <div className="flex-shrink-0 mt-1">{getNotifIcon(notif.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-sm font-bold ${notif.unread ? 'text-slate-900' : 'text-slate-700'}`}>{notif.title}</h4>
                        {notif.unread && <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>}
                      </div>
                      <p className="text-xs font-medium text-slate-500 leading-relaxed mb-2">{notif.desc}</p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-slate-100 text-center bg-slate-50/50 hover:bg-slate-100 transition-colors cursor-pointer">
                <button className="text-sm font-bold text-slate-600">Lihat Semua Notifikasi</button>
              </div>
            </div>
          )}
        </div>

        <div className="relative pl-1 sm:pl-3 sm:border-l border-slate-200/80">
          <button 
            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
            className="flex items-center gap-3 p-1 pr-2 rounded-full hover:bg-slate-100 transition-all duration-200 active:scale-95 group z-50 relative"
          >
            <img src={user.avatar} alt="Profile" className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 transition-all duration-300 ${isProfileOpen ? 'border-emerald-500 shadow-md' : 'border-white shadow-sm group-hover:border-emerald-200'}`} />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold text-slate-700 leading-tight group-hover:text-emerald-600 transition-colors">{user.name}</p>
              <p className="text-[11px] text-slate-500 font-medium">{user.role}</p>
            </div>
            <ChevronDown className={`hidden sm:block w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-emerald-500' : ''}`} />
          </button>

          {isProfileOpen && <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsProfileOpen(false)} />}
          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-50 animate-in slide-in-from-top-4 fade-in duration-200 p-2">
              <div className="sm:hidden flex items-center gap-3 p-3 border-b border-slate-100 mb-2">
                <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-emerald-100" />
                <div>
                  <p className="text-sm font-bold text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{user.role}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-1 sm:mt-0">
                <button 
                  onClick={() => { setIsProfileOpen(false); if (onSettingsClick) onSettingsClick(); }}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all w-full text-left"
                >
                  <Settings className="w-4 h-4" /> Pengaturan Akun
                </button>
                <button className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all w-full text-left">
                  <HelpCircle className="w-4 h-4" /> Pusat Bantuan
                </button>
                <div className="w-full h-px bg-slate-100 my-1" />
                <button 
                  onClick={() => { setIsProfileOpen(false); if (onLogoutClick) onLogoutClick(); }}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all w-full text-left"
                >
                  <LogOut className="w-4 h-4" /> Keluar
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}