"use client"
import React, { useState, useEffect } from 'react';
import { 
  KeyRound, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2,
  CheckCircle2,
  XCircle,
  Compass,
  ArrowLeft
} from 'lucide-react';

export default function ChangePasswordPage() {
  // State form
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  
  // State UI
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  // State validasi kekuatan password
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false
  });

  // Evaluasi kekuatan password secara real-time
  useEffect(() => {
    // Cek syarat
    const hasLength = newPassword.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);

    setRequirements({
      length: hasLength,
      uppercase: hasUppercase,
      number: hasNumber,
      special: hasSpecial
    });

    // Hitung skor (0-4)
    let strength = 0;
    if (newPassword.length > 0) strength += 1;
    if (hasLength) strength += 1;
    if (hasUppercase && hasNumber) strength += 1;
    if (hasSpecial) strength += 1;
    
    setPasswordStrength(strength);
  }, [newPassword]);

  // Validasi form: semua syarat terpenuhi & password cocok
  const isFormValid = 
    requirements.length && 
    requirements.uppercase && 
    requirements.number && 
    newPassword === confirmPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsLoading(true);
    
    try {
      // Simulasi pemanggilan API Ganti Password
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Password successfully changed');
      setIsSuccess(true);
      
      // Biasanya di sini kita set timeout untuk redirect ke halaman Login
      // setTimeout(() => router.push('/login'), 2000);
      
    } catch (error) {
      console.error('Failed to change password', error);
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
          <span className="text-sm font-medium">Batal</span>
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
          
          {isSuccess ? (
            // State: SUKSES GANTI PASSWORD
            <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Sandi Diperbarui!</h2>
              <p className="text-slate-500 mb-8">
                Kata sandi akun Anda telah berhasil diubah. Silakan masuk kembali menggunakan kata sandi baru Anda.
              </p>
              <a 
                href="/login"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg shadow-emerald-600/20"
              >
                Kembali ke Login
              </a>
            </div>
          ) : (
            // State: FORM GANTI PASSWORD
            <>
              {/* Ikon Kunci */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100">
                  <KeyRound className="w-8 h-8 text-emerald-500" />
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">Buat Sandi Baru</h1>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Sandi baru Anda harus unik dan berbeda dari sandi yang pernah digunakan sebelumnya.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                
                {/* Input Password Baru */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 block" htmlFor="newPassword">
                    Kata Sandi Baru
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                      className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-200"
                      placeholder="Masukkan sandi baru"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  {/* Indikator Kekuatan Password */}
                  {newPassword.length > 0 && (
                    <div className="flex gap-1 mt-2 mb-4">
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

                  {/* Checklist Syarat Password */}
                  <div className="space-y-2 mt-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-700 mb-2">Sandi harus mengandung:</p>
                    <div className="flex items-center gap-2">
                      {requirements.length ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-slate-300" />}
                      <span className={`text-xs ${requirements.length ? 'text-slate-700' : 'text-slate-500'}`}>Minimal 8 karakter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {requirements.uppercase ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-slate-300" />}
                      <span className={`text-xs ${requirements.uppercase ? 'text-slate-700' : 'text-slate-500'}`}>Satu huruf besar (A-Z)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {requirements.number ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-slate-300" />}
                      <span className={`text-xs ${requirements.number ? 'text-slate-700' : 'text-slate-500'}`}>Satu angka (0-9)</span>
                    </div>
                  </div>
                </div>

                {/* Input Konfirmasi Password */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-sm font-medium text-slate-700 block" htmlFor="confirmPassword">
                    Konfirmasi Sandi Baru
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
                      className={`w-full pl-11 pr-12 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        confirmPassword && newPassword !== confirmPassword 
                          ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500 bg-red-50/50' 
                          : 'border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white'
                      }`}
                      placeholder="Ulangi sandi baru"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-10 pr-1 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    
                    {/* Ikon Validasi Match */}
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                      {confirmPassword.length > 0 && (
                        newPassword === confirmPassword 
                          ? <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                          : <XCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">Kata sandi tidak cocok</p>
                  )}
                </div>

                {/* Tombol Submit */}
                <button
                  type="submit"
                  disabled={isLoading || !isFormValid}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-4 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Simpan Sandi Baru</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
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