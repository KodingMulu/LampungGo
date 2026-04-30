"use client"
import React, { useState } from 'react';
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  QrCode, 
  Download, 
  ChevronRight, 
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

// --- MOCK DATA TIKET ---
const myTickets = [
  {
    id: "TKT-2026-001",
    destination: "Pulau Pahawang",
    location: "Pesawaran, Lampung",
    date: "15 Mei 2026",
    time: "08:00 WIB",
    type: "Open Trip",
    status: "Aktif",
    price: "Rp 250.000",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "TKT-2026-002",
    destination: "Way Kambas",
    location: "Lampung Timur",
    date: "20 Mei 2026",
    time: "09:30 WIB",
    type: "Tiket Masuk",
    status: "Menunggu Pembayaran",
    price: "Rp 50.000",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "TKT-2026-003",
    destination: "Pantai Gigi Hiu",
    location: "Tanggamus",
    date: "10 April 2026",
    time: "14:00 WIB",
    type: "Tiket Masuk",
    status: "Selesai",
    price: "Rp 20.000",
    image: "https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?auto=format&fit=crop&w=400&q=80"
  }
];

export default function TicketsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Semua");

  const statusColors: Record<string, string> = {
    'Aktif': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Menunggu Pembayaran': 'bg-amber-100 text-amber-700 border-amber-200',
    'Selesai': 'bg-slate-100 text-slate-500 border-slate-200',
  };

  const filteredTickets = filterStatus === "Semua" 
    ? myTickets 
    : myTickets.filter(t => t.status === filterStatus);

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
          title="Tiket & Reservasi" 
          user={{ name: "Raden Intan", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" }} 
        />

        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* --- TAB FILTER --- */}
            <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-100 w-fit shadow-sm">
              {["Semua", "Aktif", "Menunggu Pembayaran", "Selesai"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterStatus(tab)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    filterStatus === tab 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* --- LIST TIKET --- */}
            <div className="grid grid-cols-1 gap-6 pb-10">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col md:flex-row overflow-hidden">
                  
                  {/* Foto Destinasi */}
                  <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
                    <img src={ticket.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                    <div className="absolute bottom-4 left-4 md:hidden">
                       <span className={`px-3 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${statusColors[ticket.status]}`}>
                        {ticket.status}
                      </span>
                    </div>
                  </div>

                  {/* Info Tiket */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="hidden md:flex justify-between items-start mb-4">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${statusColors[ticket.status]}`}>
                          {ticket.status}
                        </span>
                        <p className="text-xs font-mono text-slate-400">{ticket.id}</p>
                      </div>

                      <h3 className="text-2xl font-black text-slate-800 mb-2">{ticket.destination}</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Calendar className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm font-medium">{ticket.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                          <Clock className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm font-medium">{ticket.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 col-span-2">
                          <MapPin className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm font-medium">{ticket.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between pt-6 border-t border-dashed border-slate-200">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Metode: {ticket.type}</p>
                        <p className="text-xl font-black text-slate-800">{ticket.price}</p>
                      </div>
                      <div className="flex gap-3">
                         <button className="p-3 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-colors">
                           <Download className="w-5 h-5" />
                         </button>
                         <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95">
                           Detail Tiket <ChevronRight className="w-4 h-4" />
                         </button>
                      </div>
                    </div>
                  </div>

                  {/* QR Section (Dekat Sisi Kanan) */}
                  <div className="hidden lg:flex flex-col items-center justify-center w-48 bg-slate-50 border-l border-dashed border-slate-200 p-6 relative">
                    {/* Efek Sobekan Tiket (Atas) */}
                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-slate-50 rounded-full border border-slate-100 shadow-inner" />
                    {/* Efek Sobekan Tiket (Bawah) */}
                    <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-slate-50 rounded-full border border-slate-100 shadow-inner" />
                    
                    <div className="bg-white p-3 rounded-2xl shadow-sm mb-3">
                      <QrCode className="w-20 h-20 text-slate-800" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest leading-tight">
                      Scan Saat <br /> Kedatangan
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredTickets.length === 0 && (
              <div className="py-20 flex flex-col items-center bg-white rounded-[3rem] border border-dashed border-slate-200">
                <Ticket className="w-16 h-16 text-slate-200 mb-4" />
                <h3 className="text-xl font-bold text-slate-800">Belum ada tiket di sini</h3>
                <p className="text-slate-400">Yuk, cari destinasi seru di halaman Eksplorasi!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}