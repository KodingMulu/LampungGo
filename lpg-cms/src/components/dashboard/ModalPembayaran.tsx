"use client";

import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, CreditCard, Wallet, QrCode, 
  ChevronRight, ArrowLeft, Receipt, ShieldCheck
} from 'lucide-react';

// Tipe data yang diterima dari halaman tiket
interface BookingRecord {
  id: string;
  bookingCode: string;
  title: string;
  price: string;
}

interface ModalPembayaranProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingRecord | null;
}

export default function ModalPembayaran({ isOpen, onClose, booking }: ModalPembayaranProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset state jika modal ditutup atau dibuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setPaymentMethod(null);
      setIsProcessing(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !booking) return null;

  const handleNextStep = () => {
    if (step === 2) {
      // Simulasi loading proses pembayaran
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(3); // Lanjut ke halaman sukses
      }, 1500);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6">
      
      {/* Overlay Background */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={step === 3 ? onClose : undefined} // Jangan tutup kalau lagi bayar, kecuali udah sukses
      />

      {/* Kotak Modal */}
      <div className="relative bg-white w-full sm:max-w-md sm:rounded-[2rem] rounded-t-[2.5rem] h-[85vh] sm:h-auto flex flex-col overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-500">
        
        {/* Header Modal */}
        <div className="p-5 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
          {step === 2 ? (
            <button onClick={() => setStep(1)} className="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
          ) : (
            <div className="w-9" /> // Placeholder biar seimbang
          )}
          
          <h3 className="font-extrabold text-slate-800 text-lg">
            {step === 1 ? 'Pembayaran' : step === 2 ? 'Selesaikan Pembayaran' : 'Transaksi Sukses'}
          </h3>
          
          <button onClick={onClose} className="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Indikator Langkah (Progress Bar) */}
        <div className="flex items-center px-8 pt-6 pb-2">
          <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-emerald-500' : 'bg-slate-100'} transition-colors duration-500`} />
          <div className={`w-2 h-2 rounded-full mx-2 ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-200'} transition-colors duration-500`} />
          <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-100'} transition-colors duration-500`} />
          <div className={`w-2 h-2 rounded-full mx-2 ${step >= 3 ? 'bg-emerald-500' : 'bg-slate-200'} transition-colors duration-500`} />
          <div className={`h-2 flex-1 rounded-full ${step >= 3 ? 'bg-emerald-500' : 'bg-slate-100'} transition-colors duration-500`} />
        </div>

        {/* Body Konten yang bisa di-scroll */}
        <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
          
          {/* ================= STEP 1: PILIH METODE ================= */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
              
              {/* Ringkasan Order */}
              <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3 mb-3 text-emerald-700">
                  <Receipt className="w-5 h-5" />
                  <span className="font-bold text-sm">Ringkasan Pesanan</span>
                </div>
                <h4 className="font-extrabold text-slate-800 mb-1">{booking.title}</h4>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">ID: {booking.bookingCode}</p>
                <div className="flex justify-between items-end pt-4 border-t border-emerald-200/50">
                  <span className="text-sm font-medium text-slate-600">Total Tagihan</span>
                  <span className="text-2xl font-extrabold text-emerald-600">{booking.price}</span>
                </div>
              </div>

              {/* Pilihan Metode */}
              <div>
                <h4 className="font-extrabold text-slate-800 mb-3">Pilih Metode Pembayaran</h4>
                <div className="space-y-3">
                  {[
                    { id: 'qris', name: 'QRIS (Gopay, OVO, Dana)', icon: <QrCode className="w-6 h-6 text-pink-500" /> },
                    { id: 'va', name: 'Virtual Account Bank', icon: <CreditCard className="w-6 h-6 text-blue-500" /> },
                    { id: 'wallet', name: 'E-Wallet', icon: <Wallet className="w-6 h-6 text-emerald-500" /> },
                  ].map((method) => (
                    <label 
                      key={method.id}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all active:scale-[0.98] ${
                        paymentMethod === method.id 
                          ? 'border-emerald-500 bg-emerald-50/30 shadow-[0_4px_20px_rgba(16,185,129,0.1)]' 
                          : 'border-slate-100 hover:border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                          {method.icon}
                        </div>
                        <span className="font-bold text-slate-700">{method.name}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === method.id ? 'border-emerald-500' : 'border-slate-300'}`}>
                        {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                      </div>
                      {/* Hidden radio input for accessibility */}
                      <input type="radio" name="payment" value={method.id} className="hidden" onChange={() => setPaymentMethod(method.id)} />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 2: SCAN QR ================= */}
          {step === 2 && (
            <div className="space-y-6 text-center animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-bold animate-pulse">
                Selesaikan dalam 14:59
              </div>
              
              <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-xl shadow-slate-200/50 inline-block">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
                  alt="QR Code Dummy" 
                  className="w-48 h-48 opacity-80"
                />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-slate-800 mb-2">Scan QRIS</h4>
                <p className="text-sm font-medium text-slate-500 px-6">Buka aplikasi m-Banking atau e-Wallet Anda, lalu scan kode QR di atas untuk membayar.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-center gap-2 text-slate-600 border border-slate-100">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-bold">Pembayaran diverifikasi otomatis</span>
              </div>
            </div>
          )}

          {/* ================= STEP 3: SUKSES ================= */}
          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-in zoom-in duration-500">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20" />
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 relative z-10">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-800 mt-4">Pembayaran Berhasil!</h3>
              <p className="text-slate-500 font-medium text-center px-4">Hore! Tiket Anda sudah aktif. Silakan cek di menu Tiket Aktif atau email Anda.</p>
              
              <div className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-4 text-left">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Dibayar</p>
                <p className="text-xl font-extrabold text-emerald-600">{booking.price}</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Area (Tombol Aksi) */}
        <div className="p-5 border-t border-slate-100 bg-white">
          {step === 1 && (
            <button 
              onClick={handleNextStep}
              disabled={!paymentMethod}
              className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                paymentMethod 
                  ? 'bg-slate-900 text-white hover:bg-emerald-600 shadow-lg active:scale-95' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Lanjutkan Pembayaran <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {step === 2 && (
            <button 
              onClick={handleNextStep}
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 active:scale-95"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> 
                  Memproses...
                </span>
              ) : (
                'Simulasi: Saya Sudah Bayar'
              )}
            </button>
          )}

          {step === 3 && (
            <button 
              onClick={onClose}
              className="w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 bg-slate-900 text-white shadow-lg active:scale-95 hover:bg-emerald-600"
            >
              Selesai & Lihat Tiket
            </button>
          )}
        </div>

      </div>
    </div>
  );
}