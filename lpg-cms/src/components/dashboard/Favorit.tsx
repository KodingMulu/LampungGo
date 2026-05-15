"use client";

import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  Star, 
  ArrowRight, 
  Trash2
} from 'lucide-react';

interface FavoriteDestination {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
}

const initialFavorites: FavoriteDestination[] = [
  { 
    id: "d1", name: "Pulau Pahawang", location: "Pesawaran", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", rating: 4.8, reviews: 1245, price: "Rp 250.000"
  },
  { 
    id: "d4", name: "Teluk Kiluan", location: "Tanggamus", image: "https://images.unsplash.com/photo-1607153333881-22fb1387d7b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", rating: 4.6, reviews: 920, price: "Rp 150.000"
  },
  { 
    id: "d6", name: "Menara Siger", location: "Bakauheni", image: "https://images.unsplash.com/photo-1628181677353-84724b1ae05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", rating: 4.4, reviews: 2150, price: "Rp 15.000"
  }
];

export default function Favorit() {
  const [favorites, setFavorites] = useState<FavoriteDestination[]>(initialFavorites);

  const removeFavorite = (idToRemove: string) => {
    setFavorites(prev => prev.filter(dest => dest.id !== idToRemove));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 w-full p-6 lg:p-10 pb-20">
      
      {/* Header Favorit */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4 px-2">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Destinasi Favorit ❤️</h2>
          <p className="text-slate-500 text-lg font-medium">Daftar tempat impian yang ingin Anda kunjungi.</p>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-full border border-slate-200 text-sm font-bold text-slate-600 shadow-[0_4px_15px_rgb(0,0,0,0.03)]">
          Total: <span className="text-rose-600 ml-1">{favorites.length} Tempat</span>
        </div>
      </div>

      {/* Grid Destinasi Favorit */}
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {favorites.map((dest) => (
            <div 
              key={dest.id} 
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 flex flex-col hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden p-2">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white font-semibold text-sm">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {dest.rating}
                  </div>
                </div>

                {/* Tombol Hapus Favorit */}
                <button 
                  onClick={() => removeFavorite(dest.id)}
                  className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md rounded-full text-rose-500 hover:bg-rose-600 hover:text-white transition-all duration-300 z-10 shadow-md hover:scale-110"
                  title="Hapus dari favorit"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 pt-5 flex flex-col flex-1">
                <h4 className="font-extrabold text-slate-800 text-xl line-clamp-1 group-hover:text-emerald-600 transition-colors duration-300 mb-1">
                  {dest.name}
                </h4>
                <p className="text-slate-500 text-sm flex items-center gap-1.5 mb-4 font-medium">
                  <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" /> 
                  <span className="truncate">{dest.location}</span>
                </p>

                <div className="w-full h-px bg-slate-100 my-4" />

                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-1">Estimasi Biaya</span>
                    <p className="font-extrabold text-lg text-emerald-600">{dest.price}</p>
                  </div>
                  <button className="px-5 py-2.5 bg-emerald-50 text-emerald-600 text-sm font-bold rounded-xl hover:bg-emerald-600 hover:text-white transition-colors duration-300 active:scale-95 shadow-sm">
                    Rencanakan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="w-full flex flex-col items-center justify-center py-28 text-center bg-white rounded-[2.5rem] border border-slate-100 shadow-sm mt-4">
          <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-rose-300" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-800 mb-3">Belum Ada Favorit</h3>
          <p className="text-slate-500 max-w-md mb-8 font-medium leading-relaxed">
            Wah, sepertinya Anda belum menambahkan tempat impian. Kumpulkan destinasi wisata favorit Anda di sini!
          </p>
          <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-emerald-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-emerald-600/30 active:scale-95">
            Mulai Eksplorasi <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}