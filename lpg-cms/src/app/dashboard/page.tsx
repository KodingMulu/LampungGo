"use client"
import React, { useState } from 'react';
import { 
  Compass, 
  Map, 
  Ticket, 
  Heart, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search, 
  MapPin, 
  Calendar,
  Sun,
  ChevronRight,
  Clock
} from 'lucide-react';

// --- TYPES & INTERFACES ---
interface User {
  name: string;
  email: string;
  avatar: string;
}

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

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

// --- MOCK DATA (Khusus Lampung) ---
const currentUser: User = {
  name: "Raden Intan",
  email: "raden.intan@email.com",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
};

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
    name: "Taman Nasional Way Kambas",
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
  }
];

const recentBookings: Booking[] = [
  {
    id: "b1",
    title: "Snorkeling Trip Pahawang",
    date: "15 Mei 2026",
    status: "Terkonfirmasi",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "b2",
    title: "Tour Lumba-lumba Kiluan",
    date: "20 Jun 2026",
    status: "Menunggu",
    image: "https://images.unsplash.com/photo-1607153333881-22fb1387d7b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  }
];

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string>('Overview');

  const menuItems = [
    { id: 'Overview', icon: <Compass className="w-5 h-5" />, label: 'Ikhtisar' },
    { id: 'Destinations', icon: <Map className="w-5 h-5" />, label: 'Eksplorasi' },
    { id: 'Tickets', icon: <Ticket className="w-5 h-5" />, label: 'Tiket & Booking' },
    { id: 'Favorites', icon: <Heart className="w-5 h-5" />, label: 'Favorit' },
  ];

  // Helper untuk warna status badge
  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'Terkonfirmasi': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Menunggu': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Selesai': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex overflow-hidden">
      
      {/* --- SIDEBAR (Desktop & Mobile) --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-emerald-700">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <Compass className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xl font-bold tracking-wider text-slate-800">JELAJAH</span>
          </div>
          <button 
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 mt-2">Menu Utama</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                activeMenu === item.id 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className={activeMenu === item.id ? 'text-emerald-600' : 'text-slate-400'}>
                {item.icon}
              </div>
              {item.label}
            </button>
          ))}

          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 mt-8">Lainnya</p>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium">
            <Settings className="w-5 h-5 text-slate-400" />
            Pengaturan Akun
          </button>
        </nav>

        {/* Profile Footer Sidebar */}
        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium">
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Overlay Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}


      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 hidden sm:block">
              {menuItems.find(m => m.id === activeMenu)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search Bar (Hidden on small mobile) */}
            <div className="hidden md:flex relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Cari destinasi..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-full text-sm w-64 transition-all duration-300 outline-none"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-3 pl-2 sm:pl-4 sm:border-l border-slate-200 cursor-pointer">
              <img 
                src={currentUser.avatar} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-slate-100"
              />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-700">{currentUser.name}</p>
                <p className="text-xs text-slate-400">Wisatawan</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* Welcome Banner */}
            <div className="bg-emerald-900 rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-emerald-900/10">
              {/* Background Dekoratif */}
              <div className="absolute top-0 right-0 w-64 h-full">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-emerald-900 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Lampung Forest" 
                  className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
              </div>
              
              <div className="relative z-20 max-w-xl text-white">
                <h2 className="text-3xl font-bold mb-2">Tabik Pun, {currentUser.name.split(' ')[0]}! 👋</h2>
                <p className="text-emerald-100 mb-6 text-lg">Siap menjelajahi pesona Sai Bumi Ruwa Jurai hari ini?</p>
                <button className="bg-white text-emerald-800 px-6 py-2.5 rounded-xl font-medium hover:bg-emerald-50 transition-colors shadow-lg shadow-black/10">
                  Buat Rencana Perjalanan
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Perjalanan', value: '12', icon: <MapPin className="text-blue-500" />, bg: 'bg-blue-50' },
                { label: 'Tiket Aktif', value: '2', icon: <Ticket className="text-emerald-500" />, bg: 'bg-emerald-50' },
                { label: 'Destinasi Favorit', value: '8', icon: <Heart className="text-red-500" />, bg: 'bg-red-50' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-5 hover:shadow-lg hover:shadow-slate-200/40 transition-shadow">
                  <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center`}>
                    {React.cloneElement(stat.icon as React.ReactElement, { className: 'w-7 h-7' })}
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* KOLOM KIRI (Lebih Lebar) */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Section: Rekomendasi Destinasi */}
                <section>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl font-bold text-slate-800">Rekomendasi di Lampung</h3>
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1 group">
                      Lihat Semua <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {recommendedDestinations.map((dest) => (
                      <div key={dest.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300">
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={dest.image} 
                            alt={dest.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500 hover:text-white transition-colors">
                            <Heart className="w-5 h-5" />
                          </button>
                          <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-white text-sm font-medium flex items-center gap-1.5">
                            <span className="text-yellow-400">★</span> {dest.rating}
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-slate-800 text-lg">{dest.name}</h4>
                              <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                                <MapPin className="w-4 h-4 text-emerald-500" /> {dest.location}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div>
                              <span className="text-xs text-slate-400">Mulai dari</span>
                              <p className="font-bold text-emerald-600">{dest.price}</p>
                            </div>
                            <button className="p-2 text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-600 hover:text-white transition-colors">
                              <ArrowRightIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* KOLOM KANAN (Sidebar Widget) */}
              <div className="space-y-8">
                
                {/* Widget: Cuaca (Konteks Lokal) */}
                <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-3xl p-6 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
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
                  <div className="mt-4 pt-4 border-t border-white/20 flex justify-between text-sm text-sky-50 relative z-10">
                    <span>Sangat cocok untuk ke pantai!</span>
                  </div>
                </div>

                {/* Widget: Jadwal / Booking Mendatang */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-slate-800">Trip Mendatang</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex gap-4 items-center p-3 hover:bg-slate-50 rounded-2xl transition-colors border border-transparent hover:border-slate-100">
                        <img 
                          src={booking.image} 
                          alt={booking.title} 
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-800 text-sm truncate">{booking.title}</h4>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {booking.date}</span>
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
        </div>
      </main>
    </div>
  );
}

// Helper icon component since ArrowRight wasn't directly imported from lucide above
function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}