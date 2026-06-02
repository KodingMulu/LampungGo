"use client";

import React, { useState } from 'react';
import { User, Lock, Bell, Camera, Save, ShieldCheck, Moon, Sun, Palette } from 'lucide-react';

export default function Pengaturan() {
  const [activeTab, setActiveTab] = useState<'Profil' | 'Keamanan' | 'Notifikasi' | 'Tampilan'>('Profil');
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 w-full p-6 lg:p-10 pb-20">
      
      {/* Header Pengaturan */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Pengaturan Akun ⚙️</h2>
        <p className="text-slate-500 text-lg font-medium">Kelola informasi profil, keamanan, dan preferensi notifikasi Anda.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Mini (Tabs) */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto hide-scrollbar pb-4 md:pb-0 sticky top-28">
            {[
              { id: 'Profil', icon: User },
              { id: 'Keamanan', icon: Lock },
              { id: 'Notifikasi', icon: Bell },
              { id: 'Tampilan', icon: Palette },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)} 
                className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all duration-300 whitespace-nowrap active:scale-95 ${
                  activeTab === tab.id 
                    ? 'bg-white text-emerald-600 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100' 
                    : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-emerald-500' : 'text-slate-400'}`} /> {tab.id}
              </button>
            ))}
          </div>
        </div>

        {/* Konten Area */}
        <div className="flex-1 bg-white rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 lg:p-10">
          
          {/* TAB: TAMPILAN */}
          {activeTab === 'Tampilan' && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
              <h3 className="text-xl font-extrabold text-slate-800">Preferensi Tampilan</h3>
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {isDarkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Mode Malam (Tapis Mode)</h4>
                    <p className="text-sm text-slate-500">Aktifkan tema gelap dengan aksen emas Lampung.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`w-14 h-8 rounded-full transition-colors relative ${isDarkMode ? 'bg-emerald-600' : 'bg-slate-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all ${isDarkMode ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          )}

          {/* TAB: PROFIL */}
          {activeTab === 'Profil' && (
            <div className="space-y-10 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-100">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-emerald-400 to-emerald-600 shadow-lg">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white" />
                  </div>
                  <button className="absolute bottom-0 right-0 p-2.5 bg-slate-900 text-white rounded-full hover:bg-emerald-600 transition-colors border-4 border-white shadow-sm">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-extrabold text-slate-800">Raden Intan</h3>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase rounded-lg border border-emerald-100">Wisatawan</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="space-y-2.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">Nama Lengkap</label>
                  <input type="text" defaultValue="Raden Intan" className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl font-medium focus:bg-white focus:border-emerald-500 outline-none transition-all" />
                </div>
                {/* Anda bisa menambah input lainnya di sini */}
              </div>
              <div className="flex justify-end pt-6">
                <button className="flex items-center gap-2 px-8 py-3.5 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                  <Save className="w-5 h-5" /> Simpan Perubahan
                </button>
              </div>
            </div>
          )}

          {/* TAB: KEAMANAN & NOTIFIKASI */}
          {activeTab === 'Keamanan' && <div className="space-y-6">Keamanan Content here...</div>}
          {activeTab === 'Notifikasi' && <div className="space-y-6">Notifikasi Content here...</div>}

        </div>
      </div>
    </div>
  );
}