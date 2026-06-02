"use client";

import React, { useState } from 'react';
import { Users, Receipt, Copy, Check } from 'lucide-react';

export default function SplitBill() {
  const [total, setTotal] = useState<string>('');
  const [people, setPeople] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  const amountPerPerson = total ? parseInt(total) / people : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Biaya per orang: Rp ${amountPerPerson.toLocaleString('id-ID')}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] w-full max-w-md mx-auto">
      <h3 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
        <Receipt className="w-6 h-6 text-emerald-600" /> Split Bill Trip
      </h3>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Total Biaya Trip (Rp)</label>
          <input 
            type="number" 
            placeholder="Contoh: 1000000"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="w-full px-5 py-4 bg-slate-50 border border-transparent rounded-2xl font-bold focus:bg-white focus:border-emerald-500 outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Jumlah Anggota</label>
          <div className="flex items-center gap-4">
            <input 
              type="range" min="1" max="20" value={people} 
              onChange={(e) => setPeople(parseInt(e.target.value))}
              className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 text-emerald-700 font-extrabold rounded-2xl">
              {people}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <p className="text-sm text-slate-500 font-medium">Beban per orang:</p>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">
            Rp {amountPerPerson.toLocaleString('id-ID')}
          </div>
        </div>

        <button 
          onClick={handleCopy}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
            copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          {copied ? 'Tersalin!' : 'Salin Tagihan'}
        </button>
      </div>
    </div>
  );
}