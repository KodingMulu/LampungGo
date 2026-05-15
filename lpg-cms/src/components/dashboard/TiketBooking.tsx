"use client";

import React, { useState } from 'react';
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Download, 
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

type BookingStatus = 'Terkonfirmasi' | 'Menunggu' | 'Selesai' | 'Dibatalkan';

interface BookingRecord {
  id: string;
  bookingCode: string;
  title: string;
  destination: string;
  date: string;
  time: string;
  guests: number;
  status: BookingStatus;
  image: string;
  price: string;
}

const myBookings: BookingRecord[] = [
  {
    id: "bk-101",
    bookingCode: "LPG-PHW-8291",
    title: "One Day Trip Pulau Pahawang",
    destination: "Pesawaran, Lampung",
    date: "Sabtu, 20 Mei 2026",
    time: "07:30 WIB",
    guests: 2,
    status: "Terkonfirmasi",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: "Rp 500.000"
  },
  {
    id: "bk-102",
    bookingCode: "LPG-KLN-4420",
    title: "Tur Lumba-Lumba Teluk Kiluan",
    destination: "Tanggamus, Lampung",
    date: "Minggu, 28 Mei 2026",
    time: "06:00 WIB",
    guests: 4,
    status: "Menunggu",
    image: "https://images.unsplash.com/photo-1607153333881-22fb1387d7b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: "Rp 600.000"
  },
  {
    id: "bk-098",
    bookingCode: "LPG-WYK-1102",
    title: "Eksplorasi Taman Nasional Way Kambas",
    destination: "Lampung Timur",
    date: "Minggu, 02 April 2026",
    time: "08:00 WIB",
    guests: 2,
    status: "Selesai",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: "Rp 100.000"
  }
];

export default function TiketBooking() {
  const [activeTab, setActiveTab] = useState<'Aktif' | 'Riwayat'>('Aktif');

  const displayedBookings = myBookings.filter(booking => {
    if (activeTab === 'Aktif') {
      return booking.status === 'Terkonfirmasi' || booking.status === 'Menunggu';
    }
    return booking.status === 'Selesai' || booking.status === 'Dibatalkan';
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Terkonfirmasi':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-200/60 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" /> Terkonfirmasi
          </div>
        );
      case 'Menunggu':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-xl text-xs font-bold border border-amber-200/60 shadow-sm">
            <Clock className="w-3.5 h-3.5" /> Menunggu Pembayaran
          </div>
        );
      case 'Selesai':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold border border-slate-200 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
          </div>
        );
      case 'Dibatalkan':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-200/60 shadow-sm">
            <AlertCircle className="w-3.5 h-3.5" /> Dibatalkan
          </div>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 w-full p-6 lg:p-10 pb-20">
      
      {/* Header & Tabs */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Tiket & Booking 🎟️</h2>
        <p className="text-slate-500 text-lg font-medium mb-8">Kelola semua e-tiket dan riwayat perjalanan Anda di Lampung.</p>
        
        {/* Tab Navigation (Gaya Modern) */}
        <div className="flex gap-2 p-1.5 bg-slate-200/60 backdrop-blur-md rounded-2xl w-fit mb-2">
          <button 
            onClick={() => setActiveTab('Aktif')}
            className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
              activeTab === 'Aktif' 
                ? 'bg-white text-emerald-600 shadow-[0_2px_10px_rgba(0,0,0,0.05)]' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
            }`}
          >
            Tiket Aktif
          </button>
          <button 
            onClick={() => setActiveTab('Riwayat')}
            className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
              activeTab === 'Riwayat' 
                ? 'bg-white text-emerald-600 shadow-[0_2px_10px_rgba(0,0,0,0.05)]' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
            }`}
          >
            Riwayat Perjalanan
          </button>
        </div>
      </div>

      {/* Daftar Tiket */}
      {displayedBookings.length > 0 ? (
        <div className="space-y-6">
          {displayedBookings.map((booking) => (
            <div 
              key={booking.id} 
              className="group bg-white rounded-[2rem] border border-slate-100 p-5 md:p-6 flex flex-col md:flex-row gap-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500"
            >
              {/* Gambar Thumbnail */}
              <div className="w-full md:w-56 h-48 md:h-auto rounded-[1.5rem] overflow-hidden flex-shrink-0 relative">
                <img 
                  src={booking.image} 
                  alt={booking.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              {/* Detail Info */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-wider">
                    {booking.bookingCode}
                  </span>
                  {getStatusBadge(booking.status)}
                </div>
                
                <h3 className="text-2xl font-extrabold text-slate-800 mb-1.5 group-hover:text-emerald-600 transition-colors">
                  {booking.title}
                </h3>
                <p className="text-sm text-emerald-600 font-bold flex items-center gap-1.5 mb-5">
                  <MapPin className="w-4 h-4" /> {booking.destination}
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-3 mt-auto bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <Users className="w-4 h-4 text-emerald-500" />
                    <span>{booking.guests} Orang</span>
                  </div>
                </div>
              </div>

              {/* Aksi Pembayaran/Tiket */}
              <div className="md:w-56 flex flex-col justify-between pt-5 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
                <div>
                  <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-1">Total Pembayaran</span>
                  <p className="text-2xl font-extrabold text-slate-800">{booking.price}</p>
                </div>
                
                <div className="mt-4 space-y-3">
                  {booking.status === 'Terkonfirmasi' ? (
                    <button className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-colors active:scale-95 shadow-lg shadow-emerald-600/20">
                      <Download className="w-4 h-4" /> E-Tiket
                    </button>
                  ) : booking.status === 'Menunggu' ? (
                    <button className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-amber-500 text-white font-bold rounded-2xl hover:bg-amber-600 transition-colors active:scale-95 shadow-lg shadow-amber-500/20">
                      Bayar Sekarang
                    </button>
                  ) : (
                    <button className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors active:scale-95">
                      Lihat Detail
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="w-full flex flex-col items-center justify-center py-24 text-center bg-white rounded-[2.5rem] border border-slate-100 shadow-sm mt-4">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
            <Ticket className="w-12 h-12 text-emerald-300" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-800 mb-3">Belum Ada Tiket</h3>
          <p className="text-slate-500 max-w-md mb-8 font-medium leading-relaxed">
            Anda belum memiliki tiket perjalanan di kategori ini. Yuk, mulai cari destinasi impianmu di Lampung!
          </p>
          <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-emerald-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-emerald-600/30 active:scale-95">
            Eksplorasi Destinasi <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}