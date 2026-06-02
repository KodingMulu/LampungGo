"use client";

import React from 'react';
import { 
  MapPin, 
  Ticket, 
  Heart, 
  Calendar, 
  Sun, 
  ChevronRight, 
  ArrowRight,
  Star,
  Clock,
  Droplets, // <-- Icon tambahan untuk cuaca
  Wind,     // <-- Icon tambahan untuk cuaca
  Sparkles  // <-- Icon tambahan untuk promo
} from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  price: string;
}

interface Booking {
  id: string;
  title: string;
  date: string;
  status: 'Terkonfirmasi' | 'Menunggu' | 'Selesai';
  image: string;
}

const recommendedDestinations: Destination[] = [
  { 
    id: "d1", 
    name: "Pulau Pahawang", 
    location: "Pesawaran", 
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    rating: 4.8, 
    price: "Rp 250.000" 
  },
  { 
    id: "d2", 
    name: "Way Kambas", 
    location: "Lampung Timur", 
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    rating: 4.9, 
    price: "Rp 50.000" 
  },
  { 
    id: "d3", 
    name: "Pantai Gigi Hiu", 
    location: "Tanggamus", 
    image: "https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    rating: 4.7, 
    price: "Rp 20.000" 
  },
  { 
    id: "d4", 
    name: "Teluk Kiluan", 
    location: "Tanggamus", 
    image: "https://images.unsplash.com/photo-1607153333881-22fb1387d7b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    rating: 4.6, 
    price: "Rp 150.000" 
  }
];

const recentBookings: Booking[] = [
  { 
    id: "b1", 
    title: "Snorkeling Trip Pahawang", 
    date: "15 Mei 2026", 
    status: "Terkonfirmasi", 
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
  }
];

export default function Ikhtisar() {
  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'Terkonfirmasi': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Menunggu': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Selesai': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 w-full p-6 lg:p-10 pb-20">
      
      {/* Banner Utama */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.15)] group">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Hutan Tropis Lampung" 
            className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/80 to-transparent" />
        </div>
        <div className="relative z-20 max-w-xl text-white">
          <div className="inline-block px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 rounded-full text-emerald-200 text-sm font-semibold mb-6">
            ✨ Mulai Petualangan Baru
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight leading-tight">Tabik Pun, Raden! 👋</h2>
          <p className="text-emerald-100/90 mb-8 text-lg font-medium leading-relaxed max-w-md">
            Siap menjelajahi pesona tersembunyi Sai Bumi Ruwa Jurai akhir pekan ini?
          </p>
          <button className="bg-white text-emerald-900 px-8 py-4 rounded-full font-bold hover:bg-emerald-50 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 shadow-lg">
            Buat Rencana Perjalanan
          </button>
        </div>
      </div>

      {/* Grid Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <MapPin className="text-blue-600 w-7 h-7" />, bg: 'bg-blue-50', label: 'Total Perjalanan', value: '12' },
          { icon: <Ticket className="text-emerald-600 w-7 h-7" />, bg: 'bg-emerald-50', label: 'Tiket Aktif', value: '2' },
          { icon: <Heart className="text-rose-600 w-7 h-7" />, bg: 'bg-rose-50', label: 'Destinasi Favorit', value: '8' }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center gap-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className={`w-16 h-16 ${stat.bg} rounded-[1.25rem] flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-3xl font-extrabold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* JADWAL PERJALANAN TERDEKAT */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-extrabold text-slate-800">Jadwal Terdekat Anda</h3>
          <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors group">
            Lihat Semua <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 items-center p-4 md:p-5 bg-slate-50 hover:bg-slate-100/80 transition-colors rounded-3xl border border-slate-200/60">
          <div className="relative w-full md:w-56 h-40 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Pulau Pahawang" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-extrabold uppercase tracking-wider rounded-lg shadow-sm">
              Berangkat 3 Hari Lagi
            </div>
          </div>
          
          <div className="flex-1 space-y-3 w-full">
            <div>
              <h4 className="text-xl font-extrabold text-slate-900 mb-1">One Day Trip Pulau Pahawang</h4>
              <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-500" /> Pesawaran, Lampung
              </p>
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-3 pt-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                <Calendar className="w-4 h-4 text-emerald-500" /> Sabtu, 20 Mei 2026
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                <Clock className="w-4 h-4 text-emerald-500" /> 07:30 WIB
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-auto mt-4 md:mt-0 md:pl-6 md:border-l border-slate-200">
            <button className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-slate-900/20 active:scale-95">
              <Ticket className="w-5 h-5" /> E-Tiket
            </button>
          </div>
        </div>
      </div>

      {/* Grid Utama Bawah */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: CAROUSEL REKOMENDASI & BANNER PROMO */}
        <div className="lg:col-span-2 space-y-8 overflow-hidden">
          
          {/* Bagian Carousel */}
          <div>
            <div className="flex items-end justify-between px-2 mb-6">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800">Pilihan Teratas</h3>
                <p className="text-slate-500 font-medium mt-1">Destinasi yang paling sering dikunjungi minggu ini.</p>
              </div>
              <button className="hidden sm:flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full transition-colors group">
                Lihat Semua <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Wrapper Carousel Horizontal */}
            <div className="flex overflow-x-auto gap-6 pb-6 pt-2 px-2 -mx-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {recommendedDestinations.map((dest) => (
                <div 
                  key={dest.id} 
                  className="flex-none w-[280px] sm:w-[320px] snap-center group bg-white rounded-[2rem] overflow-hidden border border-slate-100 flex flex-col hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer"
                >
                  <div className="relative h-56 overflow-hidden p-2">
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white font-semibold text-sm">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {dest.rating}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-5 flex flex-col flex-1">
                    <h4 className="font-extrabold text-slate-800 text-xl line-clamp-1 group-hover:text-emerald-600 transition-colors duration-300 mb-1">{dest.name}</h4>
                    <p className="text-slate-500 text-sm flex items-center gap-1.5 mb-4 font-medium">
                      <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" /> <span className="truncate">{dest.location}</span>
                    </p>
                    <div className="w-full h-px bg-slate-100 my-4" />
                    <div className="mt-auto flex items-end justify-between">
                      <div>
                        <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-1">Mulai dari</span>
                        <p className="font-extrabold text-lg text-emerald-600">{dest.price}</p>
                      </div>
                      <button className="w-12 h-12 flex items-center justify-center bg-slate-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 active:scale-90">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Banner Promo Eksklusif */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden group">
            {/* Ornamen Latar Belakang */}
            <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
              <Sparkles className="w-48 h-48" />
            </div>
            
            <div className="relative z-10 text-center sm:text-left">
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-[10px] font-extrabold uppercase tracking-wider mb-3">
                Promo Terbatas
              </div>
              <h4 className="text-xl font-extrabold mb-1">Diskon 20% Paket Keluarga!</h4>
              <p className="text-emerald-50 text-sm font-medium">Berlaku untuk pemesanan tur Way Kambas akhir pekan ini.</p>
            </div>
            <button className="relative z-10 w-full sm:w-auto px-6 py-3.5 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors active:scale-95 whitespace-nowrap">
              Klaim Promo
            </button>
          </div>

        </div>

        {/* Kolom Kanan: Widget Cuaca & Trip Mendatang */}
        <div className="space-y-8">
          
          {/* Widget Cuaca (Telah Diperbarui dengan Detail Angin & Kelembapan) */}
          <div className="bg-gradient-to-br from-sky-400 via-blue-500 to-blue-600 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-[0_10px_30px_rgba(59,130,246,0.3)]">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <p className="font-semibold text-sky-100 text-sm tracking-wide uppercase mb-1">Cuaca Hari Ini</p>
                <h4 className="text-2xl font-bold">Bandar Lampung</h4>
              </div>
              <Sun className="w-12 h-12 text-yellow-300 drop-shadow-md animate-spin-slow" />
            </div>
            
            <div className="flex items-end gap-4 relative z-10">
              <span className="text-6xl font-black tracking-tighter">29°</span>
              <span className="text-sky-100 font-medium pb-2 text-lg">Cerah</span>
            </div>

            {/* Detail Cuaca Tambahan */}
            <div className="mt-8 pt-6 border-t border-white/20 flex justify-between relative z-10">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-sky-200" />
                <span className="text-sm font-medium text-sky-50">78%</span>
              </div>
              <div className="w-px h-5 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-sky-200" />
                <span className="text-sm font-medium text-sky-50">12 km/j</span>
              </div>
            </div>
          </div>

          {/* Widget Trip Mendatang */}
          <div className="bg-white rounded-[2rem] p-7 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <h3 className="text-xl font-extrabold text-slate-800 mb-5">Riwayat Pesanan</h3>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex gap-4 items-center p-3 hover:bg-slate-50/80 rounded-2xl transition-colors border border-transparent hover:border-slate-100 cursor-pointer group">
                  <img 
                    src={booking.image} 
                    alt={booking.title} 
                    className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform" 
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-sm truncate group-hover:text-emerald-600 transition-colors">{booking.title}</h4>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500 font-medium">
                      <Calendar className="w-3.5 h-3.5" /> 
                      <span>{booking.date}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold tracking-wider uppercase border ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-sm font-bold text-slate-500 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
              <Ticket className="w-4 h-4" /> Buka E-Tiket Saya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}