'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map, Users, MapPin, Store, AlertCircle, UserCheck } from 'lucide-react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DashboardStats {
  totalUsers: number;
  totalMitra: number;
  pendingMitra: number;
  totalAdminWilayah: number;
  totalRegions: number;
}

export default function Overview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);
      } catch (err) {
        console.error("Gagal memuat stats", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const chartData = {
    labels: ['User', 'Mitra', 'Admin'],
    datasets: [{
      label: 'Jumlah Akun',
      data: stats ? [stats.totalUsers, stats.totalMitra, stats.totalAdminWilayah] : [0, 0, 0],
      backgroundColor: ['#10b981', '#8b5cf6', '#f59e0b'],
      borderRadius: 8,
    }],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  };

  if (isLoading) return <div className="h-64 flex items-center justify-center">Memuat Data...</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Mitra" value={stats?.totalMitra || 0} icon={Store} color="text-emerald-500" />
        <StatCard title="Pending Approval" value={stats?.pendingMitra || 0} icon={AlertCircle} color="text-amber-500" />
        <StatCard title="Total Wilayah" value={stats?.totalRegions || 0} icon={Map} color="text-blue-500" />
        <StatCard title="Total Pengguna" value={stats?.totalUsers || 0} icon={UserCheck} color="text-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Distribusi Akun</h3>
          <Bar data={chartData} options={options} />
        </motion.div>
        
        <div className="bg-emerald-900 text-white p-6 rounded-3xl flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">Informasi Sistem</h3>
            <p className="text-emerald-200 mb-6">Sistem saat ini mencakup data terpusat dari layanan user dan wilayah. Pastikan memonitor mitra yang sedang menunggu approval secara berkala.</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500 text-sm">{title}</p>
                    <h2 className="text-3xl font-black mt-2">{value}</h2>
                </div>
                <div className={`p-3 rounded-2xl bg-gray-50 ${color}`}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    )
}