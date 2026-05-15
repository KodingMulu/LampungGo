"use client";
import React from 'react';
import { 
  MapPin, 
  Ticket, 
  Heart, 
  Calendar, 
  Sun, 
  ChevronRight, 
  ArrowRight 
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
    image: "[https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)", 
    rating: 4.8, 
    price: "Rp 250.000" 
  },
  { 
    id: "d2", 
    name: "Taman Nasional Way Kambas", 
    location: "Lampung Timur", 
    image: "[https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)", 
    rating: 4.9, 
    price: "Rp 50.000" 
  }
];

const recentBookings: Booking[] = [
  { 
    id: "b1", 
    title: "Snorkeling Trip Pahawang", 
    date: "15 Mei 2026", 
    status: "Terkonfirmasi", 
    image: "[https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80](https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80)" 
  }
];

export default function Ikhtisar() {
  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'Terkonfirmasi': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Menunggu': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Selesai': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 w-full p-6 lg:p-10">
      
      {/* Banner */}
      <div className="bg-emerald-900 rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-emerald-900/10">
        <div className="absolute top-0 right-0 w-64 h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-emerald-900 z-10" />
          <img 
            src="[https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)" 
            alt="Hutan Tropis Lampung" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay" 
          />
        </div>
        <div className="relative z-20 max-w-xl text-white">
          <h2 className="text-3xl font-bold mb-2">Tabik Pun, Raden! 👋</h2>
          <p className="text-emerald-100 mb-6 text-lg">Siap menjelajahi pesona Sai Bumi Ruwa Jurai hari ini?</p>
          <button className="bg-white text-emerald-800 px-6 py-2.5 rounded-xl font-medium hover:bg-emerald-50 transition-colors shadow-lg">
            Buat Rencana Perjalanan
          </button>
        </div>
      </div>

      {/* Grid Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-5 hover:shadow-lg hover:shadow-slate-200/40 transition-shadow">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
            <MapPin className="text-blue-500 w-7 h-7" />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Total Perjalanan</p>
            <p className="text-2xl font-bold text-slate-800">12</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-5 hover:shadow-lg hover:shadow-slate-200/40 transition-shadow">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <Ticket className="text-emerald-500 w-7 h-7" />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Tiket Aktif</p>
            <p className="text-2xl font-bold text-slate-800">2</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-5 hover:shadow-lg hover:shadow-slate-200/40 transition-shadow">
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center">
            <Heart className="text-red-500 w-7 h-7" />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Destinasi Favorit</p>
            <p className="text-2xl font-bold text-slate-800">8</p>
          </div>
        </div>
      </div>

      {/* Grid Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Rekomendasi */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-slate-800">Rekomendasi di Lampung</h3>
              <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1 group">
                Lihat Semua <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {recommendedDestinations.map((dest) => (
                <div key={dest.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 flex flex-col hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-white text-sm font-medium flex items-center gap-1.5">
                      <span className="text-yellow-400">★</span> {dest.rating}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="font-bold text-slate-800 text-lg">{dest.name}</h4>
                    <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4 text-emerald-500" /> {dest.location}
                    </p>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400">Mulai dari</span>
                        <p className="font-bold text-emerald-600">{dest.price}</p>
                      </div>
                      <button className="p-2 text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-600 hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Kolom Widget Sidebar */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-blue-500/20">
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <h4 className="font-semibold text-sky-50 text-sm">Cuaca Hari Ini</h4>
                <p className="text-xl font-bold">Bandar Lampung</p>
              </div>
              <Sun className="w-10 h-10 text-yellow-300" />
            </div>
            <div className="flex items-end gap-3 relative z-10">
              <span className="text-5xl font-bold tracking-tighter">29°</span>
              <span className="text-sky-100 font-medium pb-1">Cerah Berawan</span>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 text-sm text-sky-50 relative z-10">
              <span>Sangat cocok untuk ke pantai!</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-5">Trip Mendatang</h3>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex gap-4 items-center p-3 hover:bg-slate-50 rounded-2xl transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                  <img 
                    src={booking.image} 
                    alt={booking.title} 
                    className="w-16 h-16 rounded-xl object-cover" 
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 text-sm truncate">{booking.title}</h4>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5" /> 
                      <span>{booking.date}</span>
                    </div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 border border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-500 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
              <Ticket className="w-4 h-4" /> Lihat Semua E-Tiket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
