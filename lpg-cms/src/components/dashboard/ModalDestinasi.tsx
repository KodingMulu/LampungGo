"use client";

import React, { useEffect } from 'react';
import { 
  X, MapPin, Star, Wifi, Coffee, Camera, 
  ShieldCheck, ArrowRight, Heart 
} from 'lucide-react';

// Tipe data untuk destinasi yang diterima modal
interface Destination {
  id: string;
  name: string;
  location: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  isPopular?: boolean;
}

interface ModalDestinasiProps {
  isOpen: boolean;
  onClose: () => void;
  destination: Destination | null;
}

export default function ModalDestinasi({ isOpen, onClose, destination }: ModalDestinasiProps) {
  // Mencegah scroll pada background (body) ketika modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !destination) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6">
      
      {/* Background Overlay Hitam Transparan */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Kotak Modal Utama */}
      <div className="relative bg-white w-full sm:max-w-3xl sm:rounded-[2.5rem] rounded-t-[2.5rem] h-[85vh] sm:h-[80vh] flex flex-col overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-500">
        
        {/* Tombol Tutup Silang (Mengambang) */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full transition-all duration-300 active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Area Bisa di-Scroll (Konten Modal) */}
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
          
          {/* Hero Banner Gambar */}
          <div className="relative w-full h-72 sm:h-80">
            <img 
              src={destination.image} 
              alt={destination.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="text-white">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider border border-white/20 mb-3 inline-block">
                  {destination.category}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1">
                  {destination.name}
                </h2>
                <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  {destination.location}
                </div>
              </div>
            </div>
          </div>

          {/* Body Konten */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Info Rating & Reviews */}
            <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 text-amber-500 rounded-xl">
                  <Star className="w-6 h-6 fill-amber-500" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-slate-800">{destination.rating}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{destination.reviews} Ulasan</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-slate-800">Terverifikasi</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mitra Resmi</p>
                </div>
              </div>
            </div>

            {/* Deskripsi Singkat */}
            <div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-3">Tentang Tempat Ini</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                Sempurnakan liburan Anda dengan mengunjungi <strong>{destination.name}</strong> di {destination.location}. 
                Menawarkan pemandangan yang memukau dan pengalaman alam yang tidak terlupakan. Cocok untuk Anda yang ingin lari sejenak dari hiruk-pikuk kota dan mencari ketenangan atau petualangan baru.
              </p>
            </div>

            {/* Fasilitas */}
            <div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-4">Fasilitas Unggulan</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Camera className="w-6 h-6 text-emerald-500 mb-2" />
                  <span className="text-sm font-bold text-slate-600">Spot Foto</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Coffee className="w-6 h-6 text-emerald-500 mb-2" />
                  <span className="text-sm font-bold text-slate-600">Restoran</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Wifi className="w-6 h-6 text-emerald-500 mb-2" />
                  <span className="text-sm font-bold text-slate-600">Wifi Publik</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <ShieldCheck className="w-6 h-6 text-emerald-500 mb-2" />
                  <span className="text-sm font-bold text-slate-600">Pusat Medis</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Sticky Footer Area (Bagian Bawah Mengambang untuk Pesan Tiket) */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-xl border-t border-slate-200/60 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex items-center justify-between z-20 rounded-b-[2.5rem]">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Total Harga</p>
            <p className="text-2xl font-extrabold text-emerald-600">{destination.price} <span className="text-sm font-medium text-slate-400">/org</span></p>
          </div>
          <div className="flex gap-3">
            <button className="p-4 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-100 transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-slate-900/20 active:scale-95">
              Pesan Tiket <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}