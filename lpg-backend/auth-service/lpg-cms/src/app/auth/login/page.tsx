"use client"
import React, { useState } from 'react';
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
  // State dengan strict typing bawaan React
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Penanganan submit dengan strict typing pada FormEvent
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi pemanggilan API (Ganti dengan logika autentikasi NextAuth/API Anda)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Login attempt with:', { email, password });
      // Redirect logika diletakkan di sini setelah sukses
    } catch (error) {
      console.error('Login failed', error);
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
              <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
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

          {/* Pemisah */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-sm text-slate-400 font-medium">Atau masuk dengan</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          {/* Social Login Google */}
          <button
            type="button"
            className="w-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Lanjutkan dengan Google
          </button>

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