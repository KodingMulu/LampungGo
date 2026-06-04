"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  Mail, 
  ArrowRight, 
  Loader2,
  Compass,
  ArrowLeft
} from 'lucide-react';

// Interface untuk response API
interface ForgotPasswordResponse {
  message: string;
}

interface ErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Validasi email sederhana
  const isEmailValid = email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmailValid) return;
    
    setIsLoading(true);
    
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://manufactured-down-contractors-jewel.trycloudflare.com';
      
      const response = await axios.post<ForgotPasswordResponse>(`${backendUrl}/api/auth/forgot-password`, {
        email
      });

      // Tampilkan notifikasi (seperti "Jika email terdaftar, kode OTP akan dikirimkan...")
      alert(response.data.message);
      
      // Simpan email ke session storage khusus untuk reset password
      sessionStorage.setItem('reset_email', email);
      
      // Langsung redirect ke halaman verify-reset-otp sesuai permintaan
      router.push('/auth/verify-reset-otp');
      
    } catch (error: unknown) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        const errorData = error.response?.data;
        const errorMessage = Array.isArray(errorData?.message) 
          ? errorData.message.join(', ') 
          : errorData?.message || 'Terjadi kesalahan pada sistem.';
          
        alert(errorMessage);
      } else {
        console.error('Failed to send reset link', error);
        alert('Terjadi kesalahan pada sistem.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans text-slate-800 flex flex-col relative overflow-hidden">
      
      {/* Dekorasi Background Ambient */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full bg-emerald-200 blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full bg-teal-200 blur-3xl opacity-20 pointer-events-none"></div>

      {/* Header Sederhana */}
      <header className="w-full p-6 lg:p-8 relative z-10 flex justify-between items-center max-w-7xl mx-auto">
        <a href="/auth/login" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Kembali ke Login</span>
        </a>
        
        <div className="flex items-center gap-2 text-emerald-700">
          <div className="p-1.5 bg-emerald-100 rounded-lg">
            <Compass className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-lg font-bold tracking-wider text-slate-800 hidden sm:block">JELAJAH LAMPUNG</span>
        </div>
      </header>

      {/* Konten Utama Terpusat */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 sm:p-10 border border-slate-100">
          
          {/* Ikon Mail/Kunci */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100">
              <Mail className="w-8 h-8 text-emerald-500" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">Lupa Sandi?</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Jangan khawatir! Masukkan alamat email yang terdaftar, dan kami akan mengirimkan instruksi untuk mengatur ulang sandi Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            
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
                  className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    email.length > 0 && !isEmailValid 
                      ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500 bg-red-50/50' 
                      : 'border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white'
                  }`}
                  placeholder="emailanda@contoh.com"
                  required
                />
              </div>
              {/* Pesan Error Email */}
              {email.length > 0 && !isEmailValid && (
                <p className="text-xs text-red-500 mt-1">Format email tidak valid.</p>
              )}
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isLoading || !isEmailValid}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Kirim Instruksi</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Bantuan Alternatif */}
          <div className="mt-8 text-center text-sm text-slate-500">
            Mengalami masalah? <a href="#" className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline">Hubungi Bantuan</a>
          </div>

        </div>
      </main>
      
      {/* Footer minimalis */}
      <footer className="w-full py-6 text-center relative z-10">
        <p className="text-xs text-slate-400">&copy; 2026 Jelajah Lampung. Hak Cipta Dilindungi.</p>
      </footer>

    </div>
  );
}