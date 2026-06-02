import React from 'react';
import { Calendar, Clock, MapPin, Ticket, ChevronRight } from 'lucide-react';

export default function JadwalTerdekat() {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Bagian */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-extrabold text-slate-800">Jadwal Terdekat Anda</h3>
        <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors">
          Lihat Semua <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Konten Kartu Jadwal */}
      <div className="flex flex-col md:flex-row gap-6 items-center p-4 bg-slate-50 hover:bg-slate-100/80 transition-colors rounded-3xl border border-slate-200/60">
        
        {/* Thumbnail Gambar */}
        <div className="relative w-full md:w-48 h-36 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
            alt="Pulau Pahawang" 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-extrabold uppercase tracking-wider rounded-lg shadow-sm">
            Berangkat 3 Hari Lagi
          </div>
        </div>

        {/* Informasi Destinasi & Waktu */}
        <div className="flex-1 space-y-3 w-full">
          <div>
            <h4 className="text-xl font-extrabold text-slate-900 mb-1">One Day Trip Pulau Pahawang</h4>
            <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-500" /> Pesawaran, Lampung
            </p>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
              <Calendar className="w-4 h-4 text-emerald-500" /> 
              Sabtu, 20 Mei 2026
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
              <Clock className="w-4 h-4 text-emerald-500" /> 
              07:30 WIB
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="w-full md:w-auto mt-2 md:mt-0 md:pl-4 md:border-l border-slate-200">
          <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-slate-900/20 active:scale-95">
            <Ticket className="w-5 h-5" /> 
            E-Tiket
          </button>
        </div>

      </div>
    </div>
  );
}