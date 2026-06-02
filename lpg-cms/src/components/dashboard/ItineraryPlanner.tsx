"use client";

import React, { useState } from 'react';
import { 
  Calendar, 
  Sparkles, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Compass, 
  BadgeDollarSign, 
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';

interface Activity {
  time: string;
  activity: string;
  location: string;
  cost: string;
}

interface DayPlan {
  day: number;
  activities: Activity[];
}

export default function ItineraryPlanner() {
  // State untuk form input planner
  const [duration, setDuration] = useState<number>(1);
  const [budget, setBudget] = useState<string>('medium');
  const [mood, setMood] = useState<string>('Healing');
  const [generatedPlan, setGeneratedPlan] = useState<DayPlan[] | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const moods = ['Healing', 'Petualangan', 'Keluarga', 'Fotografi', 'Edukasi'];

  // Simulasi Engine Rekomendasi Rute Wisata Lampung berbasis input user
  const handleGenerateItinerary = () => {
    setIsGenerating(true);
    
    // Simulasi loading state animasi 1 detik
    setTimeout(() => {
      const mockData: DayPlan[] = [];
      
      for (let i = 1; i <= duration; i++) {
        if (mood === 'Healing' || mood === 'Fotografi') {
          mockData.push({
            day: i,
            activities: [
              { time: "07:00 - 08:30", activity: "Penyeberangan dari Dermaga Ketapang", location: "Pesawaran", cost: "Rp 50.000" },
              { time: "09:00 - 12:00", activity: "Snorkeling & Foto Underwater di Pulau Pahawang Besar", location: "Pesawaran", cost: "Rp 150.000" },
              { time: "12:30 - 14:00", activity: "Makan Siang Kuliner Seafood Khas Lampung", location: "Pulau Kelagian", cost: "Rp 75.000" },
              { time: "15:30 - 17:30", activity: "Menikmati Sunset & Hunting Foto Estetik", location: "Pantai Gigi Hiu", location_detail: "Tanggamus", cost: "Rp 20.000" }
            ]
          });
        } else if (mood === 'Petualangan') {
          mockData.push({
            day: i,
            activities: [
              { time: "08:00 - 11:00", activity: "Trekking Ringan Menelusuri Area Konservasi Gajah", location: "Taman Nasional Way Kambas", cost: "Rp 50.000" },
              { time: "13:00 - 15:30", activity: "Eksplorasi Jalur Offroad & Hutan Lindung", location: "Kaki Gunung Rajabasa", cost: "Rp 100.000" },
              { time: "16:00 - 18:00", activity: "Mengarungi Teluk & Melihat Lumba-lumba Liar", location: "Teluk Kiluan", cost: "Rp 150.000" }
            ]
          });
        } else {
          // Default / Keluarga / Edukasi
          mockData.push({
            day: i,
            activities: [
              { time: "08:30 - 11:30", activity: "Edukasi Satwa Elephant Safari Tour", location: "Way Kambas, Lampung Timur", cost: "Rp 50.000" },
              { time: "13:00 - 15:00", activity: "Wisata Sejarah & Foto Keluarga di Spot Ikonik", location: "Menara Siger, Bakauheni", cost: "Rp 15.000" },
              { time: "16:00 - 18:00", activity: "Santai Sore & Berburu Oleh-oleh Khas Lampung", location: "Bandar Lampung", cost: "Rp 100.000" }
            ]
          });
        }
      }
      
      setGeneratedPlan(mockData);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 w-full p-6 lg:p-10 pb-20">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl mb-3 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> AI Itinerary Engine
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Rencana Perjalanan Otomatis 🗺️</h2>
        <p className="text-slate-500 text-base font-medium">Susun rute liburan terbaik di Sai Bumi Ruwa Jurai dalam hitungan detik.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* PANEL KONTROL INPUT (WIZARD FORM) */}
        <div className="bg-white p-6 md:p-7 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <SlidersHorizontal className="w-5 h-5 text-slate-700" />
            <h3 className="font-extrabold text-slate-800 text-lg">Atur Preferensi</h3>
          </div>

          {/* Durasi Trip */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-500" /> Durasi Wisata
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setDuration(day)}
                  className={`py-3 rounded-xl font-bold text-sm transition-all border ${
                    duration === day
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {day} Hari
                </button>
              ))}
            </div>
          </div>

          {/* Estimasi Budget */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
              <BadgeDollarSign className="w-4 h-4 text-emerald-500" /> Kelas Anggaran
            </label>
            <div className="space-y-2">
              {[
                { id: 'low', label: 'Backpacker (Ekonomis)' },
                { id: 'medium', label: 'Standar (Rekomendasi)' },
                { id: 'high', label: 'Premium (Eksklusif)' }
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBudget(b.id)}
                  className={`w-full px-4 py-3 rounded-xl font-semibold text-sm text-left transition-all border flex items-center justify-between ${
                    budget === b.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{b.label}</span>
                  <ChevronRight className={`w-4 h-4 opacity-60 ${budget === b.id ? 'translate-x-0.5' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Fokus Suasana / Mood */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-500" /> Suasana Liburan
            </label>
            <div className="flex flex-wrap gap-2">
              {moods.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                    mood === m
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 ring-2 ring-emerald-500/10'
                      : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  #{m}
                </button>
              ))}
            </div>
          </div>

          {/* Tombol Aksi */}
          <button
            type="button"
            onClick={handleGenerateItinerary}
            disabled={isGenerating}
            className="w-full mt-2 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 text-sm active:scale-[0.98]"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Menyusun Rute Terbaik...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Susun Jadwal Sekarang
              </>
            )}
          </button>
        </div>

        {/* AREA LIVE TIMELINE PREVIEW */}
        <div className="lg:col-span-2">
          {generatedPlan ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-400">
              {generatedPlan.map((dayPlan) => (
                <div key={dayPlan.day} className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] space-y-6">
                  {/* Judul Hari */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h4 className="text-xl font-extrabold text-slate-900">Rencana Perjalanan Hari ke-{dayPlan.day}</h4>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-extrabold rounded-lg">
                      Optimal
                    </span>
                  </div>

                  {/* Wrapper Alur Garis Timeline */}
                  <div className="relative pl-6 space-y-6 before:absolute before:inset-y-1 before:left-2 before:w-0.5 before:bg-slate-200/80">
                    {dayPlan.activities.map((act, idx) => (
                      <div key={idx} className="relative group">
                        {/* Simpul Titik Aktif */}
                        <div className="absolute -left-[22px] top-1.5 w-3 h-3 bg-white border-2 border-emerald-500 rounded-full group-hover:bg-emerald-500 transition-colors z-10" />
                        
                        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100/70">
                          {/* Jam Pelaksanaan */}
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-100/70 px-2.5 py-1 rounded-lg self-start">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {act.time}
                          </div>
                          
                          {/* Deskripsi Kegiatan */}
                          <div className="flex-1 space-y-1.5">
                            <h5 className="font-extrabold text-slate-800 text-base leading-tight group-hover:text-emerald-600 transition-colors">
                              {act.activity}
                            </h5>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {act.location}
                              </span>
                              <span className="text-slate-400">|</span>
                              <span className="text-slate-500 font-semibold">
                                Estimasi: <span className="text-emerald-600 font-bold">{act.cost}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Pesan Penutup / CTA */}
              <div className="p-6 bg-slate-900 rounded-[2rem] text-white flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h4 className="font-bold text-lg">Suka dengan susunan rute otomatis ini?</h4>
                  <p className="text-slate-400 text-sm">Simpan ke jadwal utama dan langsung pesan e-tiket semua destinasi sekaligus.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md text-sm whitespace-nowrap active:scale-95">
                  Gunakan Rute Ini <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* EMPTY / INITIAL STATE */
            <div className="w-full h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-8 bg-white/40">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 shadow-sm mb-4">
                <Compass className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-700 text-lg mb-1">Rute Belum Dibuat</h4>
              <p className="text-slate-400 text-sm max-w-sm">
                Silakan sesuaikan preferensi liburan Anda di panel kiri lalu tekan tombol untuk merancang rencana wisata ideal Anda.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}