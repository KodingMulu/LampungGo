"use client"
import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  SlidersHorizontal,
  Heart,
  Navigation
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '..//components/Header';

// --- MOCK DATA (Lokal Lampung) ---
const allDestinations = [
  {
    id: "1",
    name: "Pulau Pahawang",
    category: "Pantai",
    location: "Pesawaran",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    price: "Rp 250.000",
    tag: "Terpopuler"
  },
  {
    id: "2",
    name: "Way Kambas",
    category: "Konservasi",
    location: "Lampung Timur",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    price: "Rp 50.000",
    tag: "Edukasi"
  },
  {
    id: "3",
    name: "Pantai Gigi Hiu",
    category: "Pantai",
    location: "Tanggamus",
    image: "https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    price: "Rp 20.000",
    tag: "Fotografi"
  },
  {
    id: "4",
    name: "Mata Air Way Sumpuk",
    category: "Pemandian",
    location: "Tanggamus",
    image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    price: "Rp 15.000",
    tag: "Hidden Gem"
  },
  {
    id: "5",
    name: "Bukit Aslan",
    category: "City View",
    location: "Bandar Lampung",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    price: "Rp 35.000",
    tag: "Terbaru"
  },
  {
    id: "6",
    name: "Danau Ranau",
    category: "Danau",
    location: "Lampung Barat",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    price: "Gratis",
    tag: "Alam"
  }
];

const categories = ["Semua", "Pantai", "Konservasi", "City View", "Pemandian", "Danau"];

export default function ExplorationPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = allDestinations.filter(dest => {
    const matchCategory = selectedCategory === "Semua" || dest.category === selectedCategory;
    const matchSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar - Sekarang tanpa props activeMenu karena sudah deteksi otomatis via URL */}
      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
          title="Eksplorasi Lampung" 
          user={{ 
            name: "Raden Intan", 
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" 
          }} 
        />

        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* --- TOP BAR: SEARCH & CATEGORIES --- */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Cari destinasi di Lampung..."
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-2xl border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full md:w-auto no-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-6 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                        selectedCategory === cat 
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105' 
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* --- RESULTS INFO --- */}
            <div className="flex items-center justify-between">
              <p className="text-slate-500 font-medium">
                Menampilkan <span className="text-slate-800 font-bold">{filteredDestinations.length}</span> tempat menarik
              </p>
              <button className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700">
                <SlidersHorizontal className="w-4 h-4" /> Filter Lanjutan
              </button>
            </div>

            {/* --- DESTINATION GRID --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
              {filteredDestinations.map((dest) => (
                <div 
                  key={dest.id} 
                  className="group bg-white rounded-[3rem] p-4 border border-slate-100 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-6 shadow-inner">
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    
                    {/* Badge Tag */}
                    <div className="absolute top-4 left-4">
                      <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm">
                        <p className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest">{dest.tag}</p>
                      </div>
                    </div>

                    {/* Like Button */}
                    <button className="absolute top-4 right-4 p-3 bg-black/20 backdrop-blur-md rounded-2xl text-white hover:bg-red-500 transition-all duration-300 group/heart">
                      <Heart className="w-5 h-5 group-hover/heart:fill-current" />
                    </button>

                    {/* Rating Overlay */}
                    <div className="absolute bottom-4 right-4 px-4 py-2 bg-emerald-600/90 backdrop-blur-md rounded-2xl text-white flex items-center gap-1.5 shadow-lg">
                      <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                      <span className="font-bold text-sm">{dest.rating}</span>
                    </div>
                  </div>

                  <div className="px-3 pb-2">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-slate-400 text-sm font-medium flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-emerald-500" /> {dest.location}, Lampung
                      </p>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-3xl group-hover:bg-emerald-50 transition-colors duration-500">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Estimasi Biaya</p>
                        <p className="text-xl font-black text-emerald-600">{dest.price}</p>
                      </div>
                      <button className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-emerald-600 transition-all duration-300 shadow-xl shadow-slate-900/20 active:scale-95">
                        <Navigation className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredDestinations.length === 0 && (
                <div className="col-span-full py-32 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-dashed border-slate-200">
                  <div className="p-6 bg-slate-50 rounded-full mb-4">
                    <Search className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Yah, destinasinya nggak ketemu...</h3>
                  <p className="text-slate-400 mt-2">Coba cari dengan kata kunci lain atau kategori berbeda.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}