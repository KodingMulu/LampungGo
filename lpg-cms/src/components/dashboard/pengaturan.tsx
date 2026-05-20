"use client";

import React, { useState } from 'react';
import { User, Lock, Bell, Camera, Save, ShieldCheck } from 'lucide-react';

export default function Pengaturan() {
  const [activeTab, setActiveTab] = useState<'Profil' | 'Keamanan' | 'Notifikasi'>('Profil');

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
            <button 
              onClick={() => setActiveTab('Profil')} 
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all duration-300 whitespace-nowrap active:scale-95 ${
                activeTab === 'Profil' 
                  ? 'bg-white text-emerald-600 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100' 
                  : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'
              }`}
            >
              <User className={`w-5 h-5 ${activeTab === 'Profil' ? 'text-emerald-500' : 'text-slate-400'}`} /> Profil Saya
            </button>
            <button 
              onClick={() => setActiveTab('Keamanan')} 
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all duration-300 whitespace-nowrap active:scale-95 ${
                activeTab === 'Keamanan' 
                  ? 'bg-white text-emerald-600 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100' 
                  : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'
              }`}
            >
              <Lock className={`w-5 h-5 ${activeTab === 'Keamanan' ? 'text-emerald-500' : 'text-slate-400'}`} /> Keamanan
            </button>
            <button 
              onClick={() => setActiveTab('Notifikasi')} 
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all duration-300 whitespace-nowrap active:scale-95 ${
                activeTab === 'Notifikasi' 
                  ? 'bg-white text-emerald-600 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100' 
                  : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'
              }`}
            >
              <Bell className={`w-5 h-5 ${activeTab === 'Notifikasi' ? 'text-emerald-500' : 'text-slate-400'}`} /> Notifikasi
            </button>
          </div>
        </div>

        {/* Konten Area */}
        <div className="flex-1 bg-white rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 lg:p-10">
          
          {/* TAB 1: PROFIL */}
          {activeTab === 'Profil' && (
            <div className="space-y-10 animate-in fade-in zoom-in-95 duration-300">
              {/* Foto Profil Area */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-100">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/20">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover border-4 border-white" 
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 p-2.5 bg-slate-900 text-white rounded-full hover:bg-emerald-600 transition-colors border-4 border-white shadow-sm group-hover:scale-110">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-extrabold text-slate-800">Raden Intan</h3>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-1.5">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-emerald-100">Wisatawan</span>
                    <span className="text-slate-400 text-sm font-medium">Bergabung Mei 2026</span>
                  </div>
                </div>
              </div>

              {/* Form Input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="space-y-2.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">Nama Lengkap</label>
                  <input type="text" defaultValue="Raden Intan" className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl font-medium focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300 text-slate-800" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
                  <input type="text" defaultValue="@radenintan" className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl font-medium focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300 text-slate-800" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
                  <input type="email" defaultValue="raden.intan@email.com" className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl font-medium focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300 text-slate-800" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">Nomor Telepon</label>
                  <input type="tel" defaultValue="+62 812 3456 7890" className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl font-medium focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300 text-slate-800" />
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button className="flex items-center gap-2 px-8 py-3.5 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-600/20">
                  <Save className="w-5 h-5" /> Simpan Perubahan
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: KEAMANAN */}
          {activeTab === 'Keamanan' && (
            <div className="space-y-10 animate-in fade-in zoom-in-95 duration-300">
              <div>
                <h3 className="text-xl font-extrabold text-slate-800 mb-1.5">Ubah Kata Sandi</h3>
                <p className="text-slate-500 text-sm font-medium mb-8">Pastikan akun Anda menggunakan kata sandi yang panjang dan aman.</p>
                
                <div className="space-y-6 max-w-md">
                  <div className="space-y-2.5">
                    <label className="text-sm font-bold text-slate-700 ml-1">Kata Sandi Saat Ini</label>
                    <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl font-medium focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300" />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-sm font-bold text-slate-700 ml-1">Kata Sandi Baru</label>
                    <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl font-medium focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300" />
                  </div>
                  <button className="w-full py-4 mt-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all duration-300 shadow-lg active:scale-95">
                    Perbarui Kata Sandi
                  </button>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100/50">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-800">Autentikasi Dua Faktor (2FA)</h3>
                      <p className="text-slate-500 text-sm font-medium mt-1 max-w-sm">Amankan akun Anda dengan menambahkan lapisan keamanan ekstra melalui email atau SMS.</p>
                    </div>
                  </div>
                  <button className="px-6 py-3 w-full sm:w-auto bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors border border-emerald-200 shadow-sm active:scale-95">
                    Aktifkan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NOTIFIKASI */}
          {activeTab === 'Notifikasi' && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
              <div>
                <h3 className="text-xl font-extrabold text-slate-800 mb-8">Preferensi Notifikasi Email</h3>
                
                <div className="space-y-6">
                  {/* Item Toggle Modern */}
                  {[
                    { title: "Promo & Penawaran Spesial", desc: "Dapatkan diskon paket wisata dan rekomendasi destinasi terbaru.", active: true },
                    { title: "Update Perjalanan (E-Tiket)", desc: "Kirimkan e-tiket, pengingat jadwal, dan status booking saya.", active: true },
                    { title: "Aktivitas Akun", desc: "Beritahu saya ketika ada login dari perangkat baru.", active: false },
                  ].map((item, idx) => (
                    <label key={idx} className="flex items-start gap-5 cursor-pointer group p-4 hover:bg-slate-50 rounded-2xl transition-colors border border-transparent hover:border-slate-100">
                      <div className="relative mt-1">
                        <input type="checkbox" className="sr-only peer" defaultChecked={item.active} />
                        <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
                      </div>
                      <div>
                        <h4 className="text-slate-800 font-bold group-hover:text-emerald-600 transition-colors">{item.title}</h4>
                        <p className="text-sm font-medium text-slate-500 mt-1">{item.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-8 border-t border-slate-100 mt-8">
                <button className="px-8 py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all duration-300 active:scale-95 shadow-lg">
                  Simpan Preferensi
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}