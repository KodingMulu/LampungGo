"use client";

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Heart, 
  Filter, 
  ArrowRight,
  Tent,
  Waves,
  TreePine,
  Landmark
} from 'lucide-react';

type Category = 'Semua' | 'Pantai & Pulau' | 'Alam & Margasatwa' | 'Pegunungan' | 'Budaya & Sejarah';

interface Destination {
  id: string;
  name: string;
  location: string;
  category: Category;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  isPopular?: boolean;
}

const allDestinations: Destination[] = [
  { 
    id: "d1", name: "Pulau Pahawang", location: "Pesawaran", category: 'Pantai & Pulau',
    image: "[https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)", 
    rating: 4.8, reviews: 1245, price: "Rp 250.000", isPopular: true
  },
  { 
    id: "d2", name: "Taman Nasional Way Kambas", location: "Lampung Timur", category: 'Alam & Margasatwa',
    image: "[https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)", 
    rating: 4.9, reviews: 3102, price: "Rp 50.000", isPopular: true
  },
  { 
    id: "d3", name: "Pantai Gigi Hiu", location: "Kelumbayan, Tanggamus", category: 'Pantai & Pulau',
    image: "[https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)", 
    rating: 4.7, reviews: 856, price: "Rp 20.000" 
  },
  { 
    id: "d4", name: "Teluk Kiluan", location: "Tanggamus", category: 'Pantai & Pulau',
    image: "[https://images.unsplash.com/photo-1607153333881-22fb1387d7b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1607153333881-22fb1387d7b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)", 
    rating: 4.6, reviews: 920, price: "Rp 150.000" 
  },
  { 
    id: "d5", name: "Gunung Rajabasa", location: "Kalianda, Lampung Selatan", category: 'Pegunungan',
    image: "[https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)", 
    rating: 4.5, reviews: 430, price: "Rp 10.000" 
  },
  { 
    id: "d6", name: "Menara Siger", location: "Bakauheni, Lampung Selatan", category: 'Budaya & Sejarah',
    image: "[https://images.unsplash.com/photo-1628181677353-84724b1ae05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1628181677353-84724b1ae05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)", 
    rating: 4.4, reviews: 2150, price: "Rp 15.000" 
  },
];

export default function Eksplorasi() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<Category>('Semua');

  const categories: { label: Category; icon: React.ReactNode }[] = [
    { label: 'Semua', icon: <Search className="w-4 h-4" /> },
    { label: 'Pantai & Pulau', icon: <Waves className="w-4 h-4" /> },
    { label: 'Alam & Margasatwa', icon: <TreePine className="w-4 h-4" /> },
    { label: 'Pegunungan', icon: <Tent className="w-4 h-4" /> },
    { label: 'Budaya & Sejarah', icon: <Landmark className="w-4 h-4" /> },
  ];

  const filteredDestinations = allDestinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Semua' || dest.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 w-full p-6 lg:p-10">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Eksplorasi Lampung 🌿</h2>
        <p className="text-slate-500 text-lg">Temukan keindahan tersembunyi dari ujung ke ujung provinsi Lampung.</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50 flex flex-col md:flex-row gap-4 sticky top-0 z-20">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Cari destinasi atau lokasi (misal: Pahawang)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
          />
        </div>
        <button className="hidden md:flex items-center gap-2 px-6 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl transition-colors border border-slate-100 font-medium whitespace-nowrap">
          <Filter className="w-5 h-5" /> Filter Lanjutan
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex overflow-x-auto pb-2 -mx-6 px-6 lg:mx-0 lg:px-0 hide-scrollbar gap-3">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(cat.label)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 border
              ${activeCategory === cat.label 
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50'
              }
            `}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Destinasi */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
          {filteredDestinations.map((dest) => (
            <div key={dest.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 flex flex-col hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 cursor-pointer">
              <div className="relative h-56 overflow-hidden">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                <button className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500 hover:text-white transition-all duration-300 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                  <Heart className="w-5 h-5" />
                </button>
                {dest.isPopular && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm">Populer</div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h4 className="font-bold text-slate-800 text-lg line-clamp-1 group-hover:text-emerald-600 transition-colors">{dest.name}</h4>
                <p className="text-slate-500 text-sm flex items-center gap-1.5 mb-3">
                  <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" /> 
                  <span className="truncate">{dest.location}</span>
                </p>
                <div className="flex items-center gap-1.5 mb-4">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-slate-700 text-sm">{dest.rating}</span>
                  <span className="text-slate-400 text-xs">({dest.reviews.toLocaleString()} ulasan)</span>
                </div>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block mb-0.5">Estimasi Biaya</span>
                    <p className="font-bold text-emerald-600">{dest.price}</p>
                  </div>
                  <button className="w-10 h-10 flex items-center justify-center bg-slate-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center py-20 text-center animate-in fade-in">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <Search className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Destinasi Tidak Ditemukan</h3>
          <p className="text-slate-500 max-w-md">
            Maaf, kami tidak dapat menemukan destinasi wisata dengan kata kunci "<span className="font-semibold text-slate-700">{searchQuery}</span>" di kategori ini.
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('Semua'); }}
            className="mt-6 px-6 py-2.5 bg-emerald-100 text-emerald-700 font-medium rounded-xl hover:bg-emerald-200 transition-colors"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
}