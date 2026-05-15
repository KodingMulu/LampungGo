import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Memuat font Plus Jakarta Sans dari Google Fonts
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Variasi ketebalan font
  variable: "--font-jakarta",
});

// Mengubah judul tab browser Anda
export const metadata: Metadata = {
  title: "Jelajah Lampung - Dashboard",
  description: "Sistem Pariwisata Provinsi Lampung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id" // Mengubah bahasa default menjadi Indonesia
      className={`${jakarta.variable} h-full antialiased`}
    >
      {/* Menerapkan font jakarta dan warna background dasar ke seluruh aplikasi */}
      <body className={`${jakarta.className} min-h-full flex flex-col bg-slate-50 text-slate-800`}>
        {children}
      </body>
    </html>
  );
}