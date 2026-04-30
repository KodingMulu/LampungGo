<<<<<<< HEAD
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
=======
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
>>>>>>> 9f8e3f4440943b89bb0911d92e4180bd46c6bebd
