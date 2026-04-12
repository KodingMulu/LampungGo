# LampungGo — Smart Tourism Application

LampungGo is a mobile-based tourism application designed to help users explore, plan, and manage travel experiences in Lampung. The platform integrates destination discovery, trip planning, and booking services into a single system, while also supporting local businesses such as tour guides, homestays, and small enterprises (UMKM).

This project is built using a modern fullstack architecture with NestJS (backend), NextJS (CMS/admin panel), and React Native (mobile application).

---

## Overview

LampungGo provides a centralized platform for:
- Discovering tourist destinations
- Planning trips efficiently
- Booking local services
- Supporting local economic activities

The system is designed to be scalable and structured, with clear separation between users, partners, and administrators.

---

## Key Features

### For Users (Mobile App)
- Browse and search tourist destinations
- View detailed information, photos, and reviews
- Create travel plans with automated itinerary suggestions
- Manage daily travel schedules
- Book services such as tour guides and accommodations
- Purchase local products from UMKM
- Submit reviews and ratings
- Receive notifications related to bookings and travel conditions

### For Partners (Mitra)
- Register and manage business profile
- Add and manage services (tour packages, homestays, guides)
- Track bookings and transactions
- View performance data

### For Admin (CMS)
- Validate and approve submitted destinations and partners
- Manage platform data and content
- Monitor platform activity and usage
- Control roles and permissions

---

## System Architecture

This project uses a multi-platform architecture:

- Backend API: NestJS  
- Admin Panel (CMS): NextJS  
- Mobile Application: React Native  
- Database: PostgreSQL (via Prisma ORM)

---

## Database Design

The system uses a relational database structure with the following main entities:
- Users (with role-based access control)
- Destinations and destination media
- Reviews and ratings
- Itineraries and travel plans
- Services and bookings
- Transactions
- Products (UMKM) and orders
- Notifications
- Reports (user-submitted locations or issues)

---

## Installation

### Prerequisites
- Node.js
- PostgreSQL
- npm or yarn

### Setup

Clone the repository:
git clone <repository-url>
cd lampunggo

Install dependencies:
npm install

Setup environment variables:
DATABASE_URL="postgresql://user:password@localhost:5432/lampunggo"

Run database migration:
npx prisma migrate dev
npx prisma generate

Start development server:
npm run start:dev

---

## Project Structure

/backend     -> NestJS API
/cms         -> NextJS admin panel
/mobile      -> React Native application
/prisma      -> Database schema and migrations

---

## Roles and Access

- USER: general users (tourists)
- MITRA: business partners
- ADMIN_WILAYAH: regional admin
- SUPER_ADMIN: full system control

---

## Goals

- Simplify travel planning and exploration
- Provide a centralized tourism platform
- Support local businesses digitally
- Improve accessibility of tourism information

---

## License

This project is developed for educational and research purposes.
