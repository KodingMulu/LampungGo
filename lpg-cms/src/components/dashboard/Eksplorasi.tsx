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
  Landmark,
  Play,
  View
} from 'lucide-react';

// Jika Anda belum membuat file ModalDestinasi, biarkan ini di-comment dulu agar tidak error
// import ModalDestinasi from './ModalDestinasi';

type Category = 'Semua' | 'Pantai & Pulau' | 'Alam & Margasatwa' | 'Pegunungan' | 'Budaya & Sejarah';

interface Destination {
  id: string;
  name: string;
  location: string;
  category: Category;
  moods: string[];
  image: string;
  rating: number;
  reviews: number;
  price: string;
  isPopular?: boolean;
  has360?: boolean;
}

const allDestinations: Destination[] = [
  { 
    id: "d1", name: "Pulau Pahawang", location: "Pesawaran", category: 'Pantai & Pulau', moods: ['Healing', 'Snorkeling', 'Keluarga'],
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    rating: 4.8, reviews: 1245, price: "Rp 250.000", isPopular: true, has360: true
  },
  { 
    id: "d2", name: "Way Kambas", location: "Lampung Timur", category: 'Alam & Margasatwa', moods: ['Edukasi', 'Keluarga', 'Alam'],
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    rating: 4.9, reviews: 3102, price: "Rp 50.000", isPopular: true, has360: false
  },
  { 
    id: "d3", name: "Pantai Gigi Hiu", location: "Kelumbayan, Tanggamus", category: 'Pantai & Pulau', moods: ['Fotografi', 'Petualangan'],
    image: "https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    rating: 4.7, reviews: 856, price: "Rp 20.000", has360: true
  },
  { 
    id: "d4", name: "Teluk Kiluan", location: "Tanggamus", category: 'Pantai & Pulau', moods: ['Healing', 'Alam'],
    image: "https://images.unsplash.com/photo-1607153333881-22fb1387d7b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    rating: 4.6, reviews: 920, price: "Rp 150.000", has360: false
  },
];

const userStories = [
  { id: 1, user: "Rudi", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", hasUnseen: true },
  { id: 2, user: "Sari", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", hasUnseen: true },
  { id: 3, user: "Bima", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop", hasUnseen: false },
  { id: 4, user: "Dina", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", hasUnseen: false },
];

const moodFilters = ['Healing', 'Keluarga', 'Fotografi', 'Petualangan', 'Edukasi'];

export default function Eksplorasi() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('Semua');
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

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
    const matchesMood = activeMood === null || dest.moods.includes(activeMood);
    return matchesSearch && matchesCategory && matchesMood;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 w-full p-6 lg:p-10 pb-20 relative">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Eksplorasi Lampung 🌿</h2>
        <p className="text-slate-500 text-lg font-medium">Temukan keindahan tersembunyi dari ujung ke ujung provinsi.</p>
      </div>

      {/* Momen Wisatawan (Stories) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Momen Wisatawan</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 group-hover:bg-emerald-50 group-hover:border-emerald-300 transition-colors">
              <Play className="w-6 h-6 text-emerald-500 ml-1" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Video Saya</span>
          </div>
          {userStories.map((story) => (
            <div key={story.id} className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0">
              <div className={`p-[2px] rounded-full ${story.hasUnseen ? 'bg-gradient-to-tr from-emerald-400 to-sky-500' : 'bg-slate-200'}`}>
                <div className="w-[60px] h-[60px] bg-white rounded-full p-[2px]">
                  <img src={story.img} alt={story.user} className="w-full h-full rounded-full object-cover" />
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-600">{story.user}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 sticky top-4 z-20">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Cari destinasi wisata favoritmu..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100 border border-transparent rounded-full text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:bg-white focus:border-emerald-500 transition-all duration-300"
          />
        </div>
        <button className="hidden md:flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-800 hover:bg-slate-900 text-white rounded-full transition-all font-semibold active:scale-95">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Categories & Moods */}
      <div className="space-y-4">
        {/* Categories */}
        <div className="flex overflow-x-auto pb-2 -mx-6 px-6 lg:mx-0 lg:px-0 hide-scrollbar gap-3">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border-2
                ${activeCategory === cat.label 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md -translate-y-0.5' 
                  : 'bg-white text-slate-500 border-slate-100 hover:border-emerald-200 hover:text-emerald-600'
                }
              `}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
        
        {/* Mood Filters */}
        <div className="flex flex-wrap gap-2">
          {moodFilters.map(mood => (
            <button
              key={mood}
              onClick={() => setActiveMood(activeMood === mood ? null : mood)}
              className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-colors ${
                activeMood === mood 
                ? 'bg-slate-800 text-white border-slate-800' 
                : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
              }`}
            >
              #{mood}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Destinasi */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 pt-2">
          {filteredDestinations.map((dest) => (
            <div 
              key={dest.id} 
              onClick={() => setSelectedDestination(dest)}
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 flex flex-col hover:shadow-lg hover:-translate-y-1.5 transition-all duration-500 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden p-2">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
                  
                  {/* Rating */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white font-semibold text-sm">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    {dest.rating}
                  </div>
                </div>

                {/* 360 Badge */}
                {dest.has360 && (
                  <div className="absolute top-6 left-6 px-3 py-1.5 bg-indigo-500/90 backdrop-blur text-white text-[10px] font-extrabold tracking-wider rounded-lg flex items-center gap-1.5 animate-pulse">
                    <View className="w-3 h-3" /> 360° VIEW
                  </div>
                )}
                
                {/* Popular Badge */}
                {!dest.has360 && dest.isPopular && (
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-emerald-500 text-white text-xs font-extrabold tracking-wider rounded-xl uppercase">
                    Populer
                  </div>
                )}

                {/* Favorite Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); }}
                  className="absolute top-6 right-6 p-3 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-all opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Text Content */}
              <div className="p-6 pt-5 flex flex-col flex-1">
                <h4 className="font-extrabold text-slate-800 text-xl line-clamp-1 group-hover:text-emerald-600 transition-colors mb-1">
                  {dest.name}
                </h4>
                <p className="text-slate-500 text-sm flex items-center gap-1.5 mb-4 font-medium">
                  <MapPin className="w-4 h-4 text-emerald-500" /> 
                  <span className="truncate">{dest.location}</span>
                </p>
                <div className="w-full h-px bg-slate-100 my-4" />
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-1">Mulai dari</span>
                    <p className="font-extrabold text-lg text-emerald-600">{dest.price}</p>
                  </div>
                  <button className="w-12 h-12 flex items-center justify-center bg-slate-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="w-full flex flex-col items-center justify-center py-24 text-center">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <Search className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Destinasi Tidak Ditemukan</h3>
          <p className="text-slate-500 max-w-md">
            Maaf, tidak ada destinasi dengan filter tersebut.
          </p>
        </div>
      )}

      {/* Hapus atau uncomment ini jika Anda sudah punya file ModalDestinasi.tsx
        <ModalDestinasi 
          isOpen={selectedDestination !== null}
          onClose={() => setSelectedDestination(null)}
          destination={selectedDestination}
        /> 
      */}

    </div>
  );
}