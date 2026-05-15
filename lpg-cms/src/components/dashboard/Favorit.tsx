"use client";

import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  Star, 
  ArrowRight, 
  Trash2,
  ChevronRight
} from 'lucide-react';

// ==========================================
// INTERFACES & TYPES
// ==========================================
interface FavoriteDestination {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
}

// ==========================================
// DATA MOCKUP FAVORIT
// ==========================================
const initialFavorites: FavoriteDestination[] = [
  { 
    id: "d1", 
    name: "Pulau Pahawang", 
    location: "Pesawaran", 
    image: "[https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)", 
    rating: 4.8, 
    reviews: 1245,
    price: "Rp 250.000"
  },
  { 
    id: "d4", 
    name: "Teluk Kiluan", 
    location: "Tanggamus", 
    image: "[https://images.unsplash.com/photo-1607153333881-22fb1387d7b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1607153333881-22fb1387d7b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)", 
    rating: 4.6, 
    reviews: 920,
    price: "Rp 150.000"
  },
  { 
    id: "d6", 
    name: "Menara Siger", 
    location: "Bakauheni, Lampung Selatan", 
    image: "[https://images.unsplash.com/photo-1628181677353-84724b1ae05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1628181677353-84724b1ae05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)", 
    rating: 4.4, 
    reviews: 2150,
    price: "Rp 15.000"
  }
];

export default function Favorit() {
  const [favorites, setFavorites] = useState<FavoriteDestination[]>(initialFavorites);

  // Fungsi simulasi untuk menghapus dari favorit
  const removeFavorite = (idToRemove: string) => {
    // Menampilkan animasi keluar sebelum menghapus state bisa dilakukan di real app
    // Di sini kita langsung filter state
    setFavorites(prev => prev.filter(dest => dest.id !== idToRemove));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 w-full p-6 lg:p-10">
      
      {/* 1. Header Favorit */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Destinasi Favorit ❤️</h2>
          <p className="text-slate-500 text-lg">Daftar tempat impian yang ingin Anda kunjungi di Lampung.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 shadow-sm">
          Total: <span className="text-emerald-600 font-bold">{favorites.length} Tempat</span>
        </div>
      </div>

      {/* 2. Grid Destinasi Favorit */}
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
          {favorites.map((dest) => (
            <div 
              key={dest.id} 
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 flex flex-col hover:shadow-xl hover:shadow-red-900/5 transition-all duration-300"
            >
              {/* Gambar & Tombol Hapus */}
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                />
                
                {/* Tombol Hapus Favorit */}
                <button 
                  onClick={() => removeFavorite(dest.id)}
                  className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 z-10 shadow-sm"
                  title="Hapus dari favorit"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Info Destinasi */}
              <div className="p-5 flex flex-col flex-1">
                <h4 className="font-bold text-slate-800 text-lg line-clamp-1 group-hover:text-emerald-600 transition-colors">
                  {dest.name}
                </h4>
                
                <p className="text-slate-500 text-sm flex items-center gap-1.5 mb-3 mt-1">
                  <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" /> 
                  <span className="truncate">{dest.location}</span>
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-4">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-slate-700 text-sm">{dest.rating}</span>
                  <span className="text-slate-400 text-xs">({dest.reviews.toLocaleString()})</span>
                </div>

                {/* Harga & Tombol Rencanakan */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block mb-0.5">Estimasi Biaya</span>
                    <p className="font-bold text-emerald-600">{dest.price}</p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-50 text-emerald-600 text-sm font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-colors duration-300">
                    Rencanakan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* 3. Empty State (Jika tidak ada favorit) */
        <div className="w-full flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-red-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Belum Ada Favorit</h3>
          <p className="text-slate-500 max-w-sm mb-6 leading-relaxed">
            Wah, sepertinya Anda belum menambahkan tempat impian. Kumpulkan destinasi wisata favorit Anda di sini!
          </p>
          <a href="#" className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-600/20">
            Mulai Eksplorasi <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}

    </div>
  );
}