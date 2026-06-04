/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  MapPin, 
  Compass,
  Loader2
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  
  // State dengan strict typing bawaan React
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Penanganan submit dengan strict typing pada FormEvent
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Menggunakan environment variable untuk URL Backend
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://manufactured-down-contractors-jewel.trycloudflare.com';
      
      const response = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password
      });

      // Backend me-return access_token dan object user
      const { access_token, user } = response.data;

      // Menyimpan token dan informasi user ke dalam localStorage
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect ke halaman dashboard saat sukses
      router.push('/dashboard');
      
    } catch (error: any) {
      console.error('Login failed', error);
      // Anda bisa menggantinya dengan toast/notification bawaan Anda jika ada
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan saat login';
      alert(errorMessage); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white font-sans text-slate-800 relative overflow-hidden">
      
      {/* KIRI: Sisi Visual/Branding (Hanya tampil di layar md ke atas) */}
      <div className="hidden lg:flex w-1/2 relative bg-emerald-900 items-end p-12 overflow-hidden">
        {/* Gambar Latar Belakang (Nuansa Pantai/Pulau Pahawang Lampung) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-10000"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        
        {/* Overlay Gradient agar teks terbaca */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        
        {/* Konten Branding */}
        <div className="relative z-20 w-full max-w-lg text-white">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-emerald-500 rounded-lg backdrop-blur-sm bg-opacity-80">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-wider">JELAJAH LAMPUNG</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Temukan Keajaiban <br />
            <span className="text-emerald-400">Sai Bumi Ruwa Jurai.</span>
          </h1>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            Mulai dari lumba-lumba di Teluk Kiluan hingga pesona bawah laut Pahawang. Masuk untuk merencanakan petualangan tropis Anda selanjutnya.
          </p>

          {/* Testimonial/Info Singkat */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="text-emerald-300 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Destinasi Terpopuler</p>
              <p className="text-xs text-slate-300">Taman Nasional Way Kambas & Pantai Gigi Hiu</p>
            </div>
          </div>
        </div>
      </div>

      {/* KANAN: Form Login */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 md:p-20 relative z-10 bg-white">
        
        {/* Dekorasi Background Halus untuk Mobile */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 lg:hidden">
           <div className="absolute top-[-10%] right-[-5%] w-64 h-64 rounded-full bg-emerald-50 blur-3xl opacity-60"></div>
           <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 rounded-full bg-teal-50 blur-3xl opacity-60"></div>
        </div>

        <div className="w-full max-w-md">
          {/* Header Mobile Branding (Hanya tampil di mobile) */}
          <div className="lg:hidden flex items-center gap-2 mb-10 text-emerald-700">
             <div className="p-2 bg-emerald-100 rounded-lg">
              <Compass className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xl font-bold tracking-wider text-slate-800">JELAJAH LAMPUNG</span>
          </div>

          <div className="mb-10 text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Selamat Datang! 👋</h2>
            <p className="text-slate-500">Silakan masuk ke akun Anda untuk melihat jadwal perjalanan dan tiket wisata.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Input Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 block" htmlFor="email">
                Email / Nomor Telepon
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-200"
                  placeholder="wisatawan@email.com"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 block" htmlFor="password">
                Kata Sandi
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Opsi Tambahan */}
            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer" 
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">Ingat saya</span>
              </label>
              <a href="/auth/forgot-password" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
                Lupa sandi?
              </a>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-6 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Masuk ke Akun</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Link Registrasi */}
          <p className="text-center text-slate-600 text-sm mt-8">
            Belum punya akun wisatawan?{' '}
            <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
              Daftar sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}