import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | LampungGo CMS',
  description: 'Sistem Manajemen Konten untuk Super Admin dan Admin Wilayah LampungGo.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {children}
    </div>
  );
}