"use client"
import React, { useState } from 'react';
import { 
  Mail, 
  ArrowRight, 
  Loader2,
  Compass,
  ArrowLeft,
  Send,
  CheckCircle2
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  // Validasi email sederhana
  const isEmailValid = email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmailValid) return;
    
    setIsLoading(true);
    
    try {
      // Simulasi pemanggilan API Kirim Link/OTP Reset Password
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Reset link sent to:', email);
      setIsSent(true);
      
      // Biasanya setelah ini pengguna diarahkan ke halaman OTP atau dicek emailnya
      // router.push('/verify'); // Jika menggunakan OTP
      
    } catch (error) {
      console.error('Failed to send reset link', error);
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
        <a href="/login" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors group">
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
          
          {isSent ? (
            // State: SUKSES EMAIL TERKIRIM
            <div className="text-center py-4 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-10 h-10 text-emerald-600 ml-1" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Cek Email Anda</h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Kami telah mengirimkan instruksi pemulihan kata sandi ke <br/>
                <span className="font-semibold text-slate-800">{email}</span>
              </p>
              
              <div className="bg-emerald-50 rounded-xl p-4 mb-8 text-left flex gap-3 border border-emerald-100">
                 <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                 <p className="text-sm text-emerald-800">
                   Silakan klik tautan atau masukkan kode OTP di email tersebut untuk membuat kata sandi baru.
                 </p>
              </div>

              <div className="space-y-3">
                <a 
                  href="/verify"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg shadow-emerald-600/20"
                >
                  Masukkan Kode OTP
                </a>
                <button 
                  onClick={() => setIsSent(false)}
                  className="w-full bg-white hover:bg-slate-50 text-slate-600 font-medium py-3 px-4 rounded-xl transition-all duration-200"
                >
                  Gunakan email lain
                </button>
              </div>
            </div>
          ) : (
            // State: FORM LUPA SANDI
            <>
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
            </>
          )}

        </div>
      </main>
      
      {/* Footer minimalis */}
      <footer className="w-full py-6 text-center relative z-10">
        <p className="text-xs text-slate-400">&copy; 2026 Jelajah Lampung. Hak Cipta Dilindungi.</p>
      </footer>

    </div>
  );
}