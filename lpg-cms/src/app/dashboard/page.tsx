"use client"
import React, { useState } from 'react';
import { 
  MapPin, 
  Ticket, 
  Heart, 
  Calendar, 
  Sun, 
  ChevronRight,
  Map
} from 'lucide-react';
import { Sidebar } from './components/Sidebar'; // Pastikan file Sidebar.tsx sudah ada
import { Header } from './components/Header';   // Pastikan file Header.tsx sudah ada

// --- MOCK DATA ---
const currentUser = {
  name: "Raden Intan",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
};

const recommendedDestinations = [
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
    name: "Taman Nasional Way Kambas",
    location: "Lampung Timur",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    price: "Rp 50.000"
  }
];

const recentBookings = [
  {
    id: "b1",
    title: "Snorkeling Trip Pahawang",
    date: "15 Mei 2026",
    status: "Terkonfirmasi" as const,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  }
];

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Overview');

  const menuLabels: Record<string, string> = {
    'Overview': 'Ikhtisar',
    'Destinations': 'Eksplorasi',
    'Tickets': 'Tiket & Booking',
    'Favorites': 'Favorit'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terkonfirmasi': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Menunggu': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex overflow-hidden">
      
      {/* Sidebar yang sudah dipisah */}
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        setIsOpen={setIsMobileMenuOpen} 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header yang sudah dipisah */}
        <Header 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
          title={menuLabels[activeMenu]} 
          user={currentUser} 
        />

        {/* --- AREA KONTEN UTAMA (KONTEN LAMA DISINI) --- */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* Welcome Banner */}
            <div className="bg-emerald-900 rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-emerald-900/10">
              <div className="absolute top-0 right-0 w-64 h-full">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-emerald-900 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Lampung" 
                  className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
              </div>
              <div className="relative z-20 max-w-xl text-white">
                <h2 className="text-3xl font-bold mb-2">Tabik Pun, {currentUser.name.split(' ')[0]}! 👋</h2>
                <p className="text-emerald-100 mb-6 text-lg">Siap menjelajahi pesona Sai Bumi Ruwa Jurai hari ini?</p>
                <button className="bg-white text-emerald-800 px-6 py-2.5 rounded-xl font-medium hover:bg-emerald-50 transition-colors">
                  Buat Rencana Perjalanan
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <StatCard label="Total Perjalanan" value="12" icon={<MapPin className="text-blue-500" />} bg="bg-blue-50" />
               <StatCard label="Tiket Aktif" value="2" icon={<Ticket className="text-emerald-500" />} bg="bg-emerald-50" />
               <StatCard label="Favorit" value="8" icon={<Heart className="text-red-500" />} bg="bg-red-50" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Rekomendasi */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Rekomendasi di Lampung</h3>
                  <button className="text-emerald-600 text-sm font-medium flex items-center gap-1 group">
                    Lihat Semua <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {recommendedDestinations.map((dest) => (
                    <div key={dest.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all">
                      <img src={dest.image} className="h-48 w-full object-cover" alt={dest.name} />
                      <div className="p-5">
                        <h4 className="font-bold text-lg">{dest.name}</h4>
                        <p className="text-slate-500 text-sm flex items-center gap-1 mb-4"><MapPin className="w-4 h-4" /> {dest.location}</p>
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-emerald-600">{dest.price}</p>
                          <span className="text-yellow-500 font-bold">★ {dest.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Widget (Weather & Trip) */}
              <div className="space-y-8">
                {/* Weather */}
                <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-3xl p-6 text-white shadow-lg">
                  <div className="flex justify-between mb-6">
                    <p className="font-bold">Bandar Lampung</p>
                    <Sun className="w-8 h-8 text-yellow-300" />
                  </div>
                  <span className="text-5xl font-bold">29°C</span>
                  <p className="mt-2 text-sky-50">Cerah Berawan</p>
                </div>

                {/* Upcoming Trip */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100">
                  <h3 className="font-bold mb-4">Trip Mendatang</h3>
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex gap-4 items-center p-3 bg-slate-50 rounded-2xl">
                      <img src={booking.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                      <div className="flex-1">
                        <p className="text-sm font-bold truncate">{booking.title}</p>
                        <p className="text-[10px] text-slate-500">{booking.date}</p>
                      </div>
                      <span className={`text-[9px] px-2 py-1 rounded-md border font-bold ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Helper Small Component
function StatCard({ label, value, icon, bg }: { label: string, value: string, icon: React.ReactNode, bg: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-5">
      <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-7 h-7' })}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}