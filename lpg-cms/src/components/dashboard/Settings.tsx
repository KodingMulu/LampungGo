'use client';
import { User, Lock, Mail } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Pengaturan Akun</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola informasi profil dan keamanan akun Anda.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <User className="text-emerald-500" size={20} /> Profil Admin
        </h2>
        
        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
              <input type="text" defaultValue="Admin Pusat" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-gray-900 outline-none font-medium text-sm text-gray-800" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Mail size={14}/> Email</label>
              <input type="email" defaultValue="admin@lampunggo.com" disabled className="w-full px-4 py-3 rounded-xl bg-gray-100 border-none text-gray-500 outline-none font-medium text-sm cursor-not-allowed" />
            </div>
          </div>
          
          <div className="pt-6 mt-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Lock className="text-amber-500" size={20} /> Keamanan
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password Baru</label>
                <input type="password" placeholder="Kosongkan jika tidak ingin mengubah" className="w-full md:w-1/2 px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-gray-900 outline-none font-medium text-sm" />
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button type="button" className="px-6 py-3 rounded-xl text-white font-semibold bg-gray-900 hover:bg-gray-800 transition-all shadow-lg active:scale-95">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}