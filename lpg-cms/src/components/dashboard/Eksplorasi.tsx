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

// Import komponen modal yang sudah dibuat sebelumnya
import ModalDestinasi from './ModalDestinasi';

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
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    rating: 4.8, reviews: 1245, price: "Rp 250.000", isPopular: true
  },
  { 
    id: "d2", name: "Way Kambas", location: "Lampung Timur", category: 'Alam & Margasatwa',
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    rating: 4.9, reviews: 3102, price: "Rp 50.000", isPopular: true
  },
  { 
    id: "d3", name: "Pantai Gigi Hiu", location: "Kelumbayan, Tanggamus", category: 'Pantai & Pulau',
    image: "https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    rating: 4.7, reviews: 856, price: "Rp 20.000" 
  },
  { 
    id: "d4", name: "Teluk Kiluan", location: "Tanggamus", category: 'Pantai & Pulau',
    image: "https://images.unsplash.com/photo-1607153333881-22fb1387d7b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    rating: 4.6, reviews: 920, price: "Rp 150.000" 
  },
  { 
    id: "d5", name: "Gunung Rajabasa", location: "Kalianda", category: 'Pegunungan',
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    rating: 4.5, reviews: 430, price: "Rp 10.000" 
  },
  { 
    id: "d6", name: "Menara Siger", location: "Bakauheni", category: 'Budaya & Sejarah',
    image: "https://images.unsplash.com/photo-1628181677353-84724b1ae05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    rating: 4.4, reviews: 2150, price: "Rp 15.000" 
  },
];

export default function Eksplorasi() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<Category>('Semua');
  
  // State untuk melacak destinasi mana yang sedang diklik/dipilih untuk modal
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
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 w-full p-6 lg:p-10 pb-20 relative">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Eksplorasi Lampung 🌿</h2>
        <p className="text-slate-500 text-lg font-medium">Temukan keindahan tersembunyi dari ujung ke ujung provinsi.</p>
      </div>

      {/* Search & Filter Bar (Dipercantik shadow-nya) */}
      <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-[2rem] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row gap-4 sticky top-4 z-20 transition-all">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Cari destinasi wisata favoritmu..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100 border border-transparent rounded-full text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
          />
        </div>
        <button className="hidden md:flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-800 hover:bg-slate-900 text-white rounded-full transition-all duration-300 font-semibold shadow-lg shadow-slate-800/20 active:scale-95 whitespace-nowrap">
          <Filter className="w-4 h-4" /> Filter Lanjutan
        </button>
      </div>

      {/* Category Pills (Lebih membulat & Animasi halus) */}
      <div className="flex overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 hide-scrollbar gap-3 pt-2">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(cat.label)}
            className={`
              flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 active:scale-95 border-2
              ${activeCategory === cat.label 
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-[0_8px_20px_rgba(5,150,105,0.25)] -translate-y-0.5' 
                : 'bg-white text-slate-500 border-slate-100 hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50 shadow-sm'
              }
            `}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Destinasi (Efek Lift & Gradient Overlay) */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 pt-2">
          {filteredDestinations.map((dest) => (
            <div 
              key={dest.id} 
              // Aksi klik untuk membuka modal
              onClick={() => setSelectedDestination(dest)}
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 flex flex-col hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer"
            >
              {/* Image Container dengan Gradient Overlay */}
              <div className="relative h-64 overflow-hidden p-2">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                  />
                  {/* Gradient Gelap di bagian bawah gambar agar teks putih selalu terbaca */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
                  
                  {/* Teks Rating yang mengambang di atas gambar */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white font-semibold text-sm">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    {dest.rating}
                  </div>
                </div>

                {/* Tombol Favorit (Muncul saat di hover) */}
                <button 
                  // e.stopPropagation() mencegah modal terbuka saat mengklik tombol favorit
                  onClick={(e) => {
                    e.stopPropagation();
                    // Logika simpan ke favorit bisa ditambahkan di sini nanti
                  }}
                  className="absolute top-6 right-6 p-3 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-all duration-300 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110"
                >
                  <Heart className="w-5 h-5" />
                </button>

                {dest.isPopular && (
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-emerald-500 text-white text-xs font-extrabold tracking-wider rounded-xl shadow-lg shadow-emerald-500/30 uppercase">
                    Populer
                  </div>
                )}
              </div>

              {/* Konten Text Bawah */}
              <div className="p-6 pt-5 flex flex-col flex-1">
                <h4 className="font-extrabold text-slate-800 text-xl line-clamp-1 group-hover:text-emerald-600 transition-colors duration-300 mb-1">
                  {dest.name}
                </h4>
                <p className="text-slate-500 text-sm flex items-center gap-1.5 mb-4 font-medium">
                  <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" /> 
                  <span className="truncate">{dest.location}</span>
                </p>
                
                {/* Garis Pemisah Tipis */}
                <div className="w-full h-px bg-slate-100 my-4" />

                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-1">Mulai dari</span>
                    <p className="font-extrabold text-lg text-emerald-600">{dest.price}</p>
                  </div>
                  <button className="w-12 h-12 flex items-center justify-center bg-slate-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 active:scale-90">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="w-full flex flex-col items-center justify-center py-24 text-center animate-in fade-in">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <Search className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Destinasi Tidak Ditemukan</h3>
          <p className="text-slate-500 max-w-md">
            Maaf, kami tidak dapat menemukan destinasi wisata dengan kata kunci "<span className="font-semibold text-slate-700">{searchQuery}</span>".
          </p>
        </div>
      )}

      {/* Memanggil Komponen Modal Destinasi */}
      <ModalDestinasi 
        isOpen={selectedDestination !== null}
        onClose={() => setSelectedDestination(null)}
        destination={selectedDestination}
      />

    </div>
  );
}