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

// ==========================================
// INTERFACES & TYPES (Strict Typing)
// ==========================================
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

// ==========================================
// DATA MOCKUP TIKET
// ==========================================
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
    image: "[https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80)",
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
    image: "[https://images.unsplash.com/photo-1607153333881-22fb1387d7b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1607153333881-22fb1387d7b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80)",
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
    image: "[https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80)",
    price: "Rp 100.000"
  }
];

// ==========================================
// KOMPONEN UTAMA
// ==========================================
export default function TiketBooking() {
  const [activeTab, setActiveTab] = useState<'Aktif' | 'Riwayat'>('Aktif');

  // Filter data berdasarkan Tab
  const displayedBookings = myBookings.filter(booking => {
    if (activeTab === 'Aktif') {
      return booking.status === 'Terkonfirmasi' || booking.status === 'Menunggu';
    }
    return booking.status === 'Selesai' || booking.status === 'Dibatalkan';
  });

  // Helper fungsi untuk gaya badge status
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Terkonfirmasi':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Terkonfirmasi
          </div>
        );
      case 'Menunggu':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-bold border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Menunggu Pembayaran
          </div>
        );
      case 'Selesai':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold border border-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
          </div>
        );
      case 'Dibatalkan':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-bold border border-red-200">
            <AlertCircle className="w-3.5 h-3.5" /> Dibatalkan
          </div>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 w-full p-6 lg:p-10">
      
      {/* 1. Header & Tabs */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Tiket & Booking 🎟️</h2>
        <p className="text-slate-500 text-lg mb-8">Kelola semua e-tiket dan riwayat perjalanan Anda di Lampung.</p>
        
        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('Aktif')}
            className={`pb-4 px-2 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'Aktif' 
                ? 'border-emerald-600 text-emerald-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Tiket Aktif (Akan Datang)
          </button>
          <button 
            onClick={() => setActiveTab('Riwayat')}
            className={`pb-4 px-2 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'Riwayat' 
                ? 'border-emerald-600 text-emerald-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Riwayat Perjalanan
          </button>
        </div>
      </div>

      {/* 2. Daftar Tiket (List View) */}
      {displayedBookings.length > 0 ? (
        <div className="space-y-5">
          {displayedBookings.map((booking) => (
            <div 
              key={booking.id} 
              className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 flex flex-col md:flex-row gap-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
            >
              {/* Gambar Thumbnail (Kiri) */}
              <div className="w-full md:w-48 h-40 md:h-full rounded-2xl overflow-hidden flex-shrink-0">
                <img 
                  src={booking.image} 
                  alt={booking.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Detail Info (Tengah) */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    {booking.bookingCode}
                  </span>
                  {getStatusBadge(booking.status)}
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-1">{booking.title}</h3>
                <p className="text-sm text-emerald-600 font-medium flex items-center gap-1.5 mb-4">
                  <MapPin className="w-4 h-4" /> {booking.destination}
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-auto">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>{booking.guests} Orang</span>
                  </div>
                </div>
              </div>

              {/* Aksi (Kanan) */}
              <div className="md:w-48 flex flex-col justify-between pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
                <div>
                  <span className="text-xs text-slate-400 block mb-0.5">Total Pembayaran</span>
                  <p className="text-lg font-bold text-slate-800">{booking.price}</p>
                </div>
                
                <div className="mt-4 space-y-2">
                  {booking.status === 'Terkonfirmasi' ? (
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors">
                      <Download className="w-4 h-4" /> E-Tiket
                    </button>
                  ) : booking.status === 'Menunggu' ? (
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors">
                      Bayar Sekarang
                    </button>
                  ) : (
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors">
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
        <div className="w-full flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-slate-100">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
            <Ticket className="w-10 h-10 text-emerald-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Belum Ada Tiket</h3>
          <p className="text-slate-500 max-w-sm mb-6">
            Anda belum memiliki tiket perjalanan di kategori ini. Yuk, mulai cari destinasi impianmu di Lampung!
          </p>
          <a href="#" className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2">
            Eksplorasi Destinasi <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
}