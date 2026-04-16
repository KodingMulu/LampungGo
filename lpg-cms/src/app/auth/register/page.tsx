"use client"
import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  User,
  Compass,
  Loader2,
  CheckCircle2,
  XCircle,
  Tent
} from 'lucide-react';

export default function RegisterPage() {
  // State form
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  
  // State UI
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  // Evaluasi kekuatan password sederhana
  useEffect(() => {
    let strength = 0;
    if (password.length > 0) strength += 1; // Ada isi
    if (password.length >= 8) strength += 1; // Minimal 8 karakter
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) strength += 1; // Ada huruf besar & angka
    if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Ada karakter spesial
    setPasswordStrength(strength);
  }, [password]);

  // Validasi form dasar
  const isFormValid = name && email && password && confirmPassword && (password === confirmPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsLoading(true);
    
    try {
      // Simulasi pemanggilan API Registrasi
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Register attempt with:', { name, email, password });
      // Redirect ke halaman login/beranda diletakkan di sini
    } catch (error) {
      console.error('Registration failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white font-sans text-slate-800 relative overflow-hidden">
      
      {/* KIRI: Sisi Visual/Branding (Hanya tampil di layar lg ke atas) */}
      <div className="hidden lg:flex w-1/2 relative bg-emerald-950 items-center justify-center p-12 overflow-hidden">
        {/* Gambar Latar Belakang (Nuansa Hutan/Pegunungan Lampung) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transform scale-105"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 z-10 bg-emerald-900/80 mix-blend-multiply" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/40" />
        
        {/* Konten Branding Tengah */}
        <div className="relative z-20 w-full max-w-md text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Tent className="w-10 h-10 text-emerald-300" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold leading-tight mb-6">
            Jadilah Bagian dari <br />
            Kisah Alam Lampung.
          </h1>
          
          <div className="space-y-4 text-left bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <p className="text-sm text-slate-200">Akses eksklusif ke paket wisata tersembunyi</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <p className="text-sm text-slate-200">Simpan jadwal perjalanan dan tiket digital</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <p className="text-sm text-slate-200">Dukungan komunitas traveler lokal</p>
            </div>
          </div>
        </div>
      </div>

      {/* KANAN: Form Register */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 md:p-20 relative z-10 bg-white overflow-y-auto">
        
        {/* Dekorasi Background Halus untuk Mobile */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 lg:hidden pointer-events-none">
           <div className="absolute top-[-5%] right-[-10%] w-64 h-64 rounded-full bg-emerald-50 blur-3xl opacity-60"></div>
        </div>

        <div className="w-full max-w-md py-8">
          {/* Header Mobile Branding */}
          <div className="lg:hidden flex items-center gap-2 mb-8 text-emerald-700">
             <div className="p-2 bg-emerald-100 rounded-lg">
              <Compass className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-lg font-bold tracking-wider text-slate-800">JELAJAH LAMPUNG</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Mulai Petualangan 🌿</h2>
            <p className="text-slate-500 text-sm">Buat akun untuk mengatur rencana perjalanan wisata Anda di Lampung.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            
            {/* Input Nama Lengkap */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 block" htmlFor="name">
                Nama Lengkap
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-200"
                  placeholder="Raden Intan"
                  required
                />
              </div>
            </div>

            {/* Input Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 block" htmlFor="email">
                Alamat Email
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
                  placeholder="email@contoh.com"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-1.5 pt-2">
              <label className="text-sm font-medium text-slate-700 block" htmlFor="password">
                Kata Sandi Baru
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
                  placeholder="Minimal 8 karakter"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Indikator Kekuatan Password (Hanya muncul jika user mulai mengetik) */}
              {password.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map((level) => (
                    <div 
                      key={level} 
                      className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                        passwordStrength >= level 
                          ? (passwordStrength < 3 ? 'bg-amber-400' : 'bg-emerald-500') 
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Input Konfirmasi Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 block" htmlFor="confirmPassword">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-11 pr-12 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 ${
                    confirmPassword && password !== confirmPassword 
                      ? 'border-red-300 focus:border-red-500 bg-red-50/50' 
                      : 'border-slate-200 focus:border-emerald-500 focus:bg-white'
                  }`}
                  placeholder="Ulangi kata sandi"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-10 pr-1 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                
                {/* Ikon Validasi */}
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                  {confirmPassword.length > 0 && (
                    password === confirmPassword 
                      ? <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      : <XCircle className="h-5 w-5 text-red-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Syarat & Ketentuan */}
            <div className="mt-4 pb-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  required
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer flex-shrink-0" 
                />
                <span className="text-xs text-slate-500 leading-relaxed">
                  Dengan mendaftar, saya menyetujui <a href="#" className="text-emerald-600 hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-emerald-600 hover:underline">Kebijakan Privasi</a> Jelajah Lampung.
                </span>
              </label>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Buat Akun Saya</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Link ke Login */}
          <p className="text-center text-slate-600 text-sm mt-8">
            Sudah memiliki akun?{' '}
            <a href="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
              Masuk di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}