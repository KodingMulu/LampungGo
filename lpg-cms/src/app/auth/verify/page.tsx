"use client"
import React, { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Loader2, 
  RefreshCcw,
  Compass,
  ArrowLeft
} from 'lucide-react';

export default function VerifyOTPPage() {
  // State untuk 4 digit OTP
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // State untuk timer kirim ulang (resend)
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  // Refs untuk setiap input box agar bisa auto-focus
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Efek untuk menghitung mundur timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle perubahan teks di setiap kotak
  const handleChange = (index: number, value: string) => {
    // Hanya izinkan angka
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    // Ambil karakter terakhir (mencegah user paste banyak angka di 1 kotak tanpa event onPaste)
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus ke kotak berikutnya jika ada isinya
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Handle navigasi keyboard (Backspace, Arrow keys)
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Jika kotak kosong dan tekan backspace, mundur ke kotak sebelumnya
      inputRefs[index - 1].current?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Handle paste kode (misal user copy "1234")
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 4);
    
    // Pastikan yang di-paste hanya angka
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        if (i < 4) newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      
      // Focus ke kotak terakhir yang diisi
      const focusIndex = Math.min(pastedData.length, 3);
      inputRefs[focusIndex].current?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    
    // Reset timer
    setTimer(60);
    setCanResend(false);
    
    // Simulasi API Resend
    console.log('Mengirim ulang kode OTP...');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    // Validasi harus 4 digit
    if (otpCode.length < 4) return;
    
    setIsLoading(true);
    
    try {
      // Simulasi pemanggilan API Verifikasi
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Verifying OTP code:', otpCode);
      // Redirect ke dashboard diletakkan di sini
    } catch (error) {
      console.error('Verification failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cek apakah form siap di-submit
  const isFormValid = otp.every(digit => digit !== '');

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans text-slate-800 flex flex-col relative overflow-hidden">
      
      {/* Dekorasi Background Ambient */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full bg-emerald-200 blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full bg-teal-200 blur-3xl opacity-20 pointer-events-none"></div>

      {/* Header Sederhana */}
      <header className="w-full p-6 lg:p-8 relative z-10 flex justify-between items-center max-w-7xl mx-auto">
        <a href="/register" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Kembali</span>
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
          
          {/* Ikon Shield */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100">
              <ShieldCheck className="w-8 h-8 text-emerald-500" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">Verifikasi Email</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Kami telah mengirimkan 4 digit kode ke email <br />
              <span className="font-semibold text-slate-800">wisatawan@email.com</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            
            {/* Input 4 Digit OTP */}
            <div className="flex justify-center gap-3 sm:gap-4" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-14 h-16 sm:w-16 sm:h-18 text-center text-2xl sm:text-3xl font-bold rounded-2xl border bg-slate-50 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 ${
                    digit 
                      ? 'border-emerald-500 bg-white text-emerald-700 shadow-sm shadow-emerald-100' 
                      : 'border-slate-200 text-slate-900 focus:border-emerald-400 focus:bg-white'
                  }`}
                  aria-label={`Digit ke-${index + 1}`}
                />
              ))}
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Verifikasi Sekarang</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Area Kirim Ulang (Resend) */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 mb-3">Belum menerima kode?</p>
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                canResend 
                  ? 'text-emerald-600 hover:text-emerald-700' 
                  : 'text-slate-400 cursor-not-allowed'
              }`}
            >
              <RefreshCcw className={`w-4 h-4 ${!canResend && timer > 0 ? 'animate-spin-slow' : ''}`} />
              {canResend ? 'Kirim Ulang Kode' : `Kirim ulang dalam 00:${timer.toString().padStart(2, '0')}`}
            </button>
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