"use client";

import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Camera, 
  Save, 
  ShieldCheck 
} from 'lucide-react';

export default function Pengaturan() {
  const [activeTab, setActiveTab] = useState<'Profil' | 'Keamanan' | 'Notifikasi'>('Profil');

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 w-full p-6 lg:p-10">
      
      {/* Header Pengaturan */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Pengaturan Akun ⚙️</h2>
        <p className="text-slate-500 text-lg">Kelola informasi profil, keamanan, dan preferensi notifikasi Anda.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Mini (Tabs) */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
            <button 
              onClick={() => setActiveTab('Profil')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === 'Profil' 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <User className={`w-5 h-5 ${activeTab === 'Profil' ? 'text-emerald-600' : 'text-slate-400'}`} />
              Profil Saya
            </button>
            <button 
              onClick={() => setActiveTab('Keamanan')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === 'Keamanan' 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Lock className={`w-5 h-5 ${activeTab === 'Keamanan' ? 'text-emerald-600' : 'text-slate-400'}`} />
              Keamanan
            </button>
            <button 
              onClick={() => setActiveTab('Notifikasi')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === 'Notifikasi' 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Bell className={`w-5 h-5 ${activeTab === 'Notifikasi' ? 'text-emerald-600' : 'text-slate-400'}`} />
              Notifikasi
            </button>
          </div>
        </div>

        {/* Konten Area */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8">
          
          {/* TAB 1: PROFIL */}
          {activeTab === 'Profil' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                <div className="relative">
                  <img 
                    src="[https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80](https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80)" 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-slate-50"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors border-2 border-white shadow-sm">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Raden Intan</h3>
                  <p className="text-slate-500 text-sm">Wisatawan • Bergabung sejak Mei 2026</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
                  <input type="text" defaultValue="Raden Intan" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Username</label>
                  <input type="text" defaultValue="@radenintan" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email</label>
                  <input type="email" defaultValue="raden.intan@email.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Nomor Telepon</label>
                  <input type="tel" defaultValue="+62 812 3456 7890" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Alamat</label>
                  <textarea rows={3} defaultValue="Bandar Lampung, Lampung, Indonesia" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none"></textarea>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors">
                  <Save className="w-5 h-5" /> Simpan Perubahan
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: KEAMANAN */}
          {activeTab === 'Keamanan' && (
            <div className="space-y-8 animate-in fade-in">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Ubah Kata Sandi</h3>
                <p className="text-slate-500 text-sm mb-6">Pastikan akun Anda menggunakan kata sandi yang panjang dan aman.</p>
                
                <div className="space-y-5 max-w-md">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Kata Sandi Saat Ini</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Kata Sandi Baru</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Konfirmasi Kata Sandi Baru</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" />
                  </div>
                  <button className="w-full py-3 mt-2 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-900 transition-colors">
                    Perbarui Kata Sandi
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      Autentikasi Dua Faktor (2FA) <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    </h3>
                    <p className="text-slate-500 text-sm mt-1 max-w-md">Amankan akun Anda dengan menambahkan lapisan keamanan ekstra melalui email atau SMS.</p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-50 text-emerald-700 font-medium rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200">
                    Aktifkan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NOTIFIKASI */}
          {activeTab === 'Notifikasi' && (
            <div className="space-y-8 animate-in fade-in">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-6">Preferensi Notifikasi Email</h3>
                
                <div className="space-y-6">
                  {/* Toggle 1 */}
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative mt-1">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-semibold group-hover:text-emerald-600 transition-colors">Promo & Penawaran Spesial</h4>
                      <p className="text-sm text-slate-500 mt-0.5">Dapatkan diskon paket wisata dan rekomendasi destinasi terbaru di Lampung.</p>
                    </div>
                  </label>

                  {/* Toggle 2 */}
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative mt-1">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-semibold group-hover:text-emerald-600 transition-colors">Update Perjalanan (E-Tiket)</h4>
                      <p className="text-sm text-slate-500 mt-0.5">Kirimkan e-tiket, pengingat jadwal keberangkatan, dan status booking saya.</p>
                    </div>
                  </label>

                  {/* Toggle 3 */}
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative mt-1">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-semibold group-hover:text-emerald-600 transition-colors">Aktivitas Akun</h4>
                      <p className="text-sm text-slate-500 mt-0.5">Beritahu saya ketika ada login dari perangkat baru atau perubahan password.</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors">
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