# Indiran Jewellers - Luxury Jewelry Website

A production-ready luxury jewelry e-commerce website for Indiran Jewellers, built with local sample content, MongoDB-backed APIs, Cloudinary uploads, and a custom admin area.

## Tech Stack

- **Frontend:** Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion
- **Data:** Local content fixtures plus MongoDB models/API routes
- **Media:** Cloudinary
- **Hosting:** Vercel

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.local.example` to `.env.local` and update values as needed:

```bash
cp .env.local.example .env.local
```

## Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - start the production server
- `npm run process-logo` - process logo assets

## Pages

| Page | URL |
|------|-----|
| Home | `/` |
| About | `/about` |
| Collections | `/collections` |
| Product Detail | `/products/[slug]` |
| Wedding | `/wedding` |
| Gold Jewelry | `/gold` |
| Diamond | `/diamond` |
| Contact | `/contact` |
| Gallery | `/gallery` |
| Offers | `/offers` |
| Gold Price | `/gold-price` |
| Inquiry | `/inquiry` |
| Wishlist | `/wishlist` |

## Project Structure

```text
src/
  app/          Next.js pages and API routes
  components/   UI components
  lib/
    content/    Local content helpers and types
    data/       Sample content data
    models/     MongoDB models
public/         Static images and icons
scripts/        Utility scripts
```

## Features

- Luxury dark and gold design
- Product search and category filters
- Wishlist saved in browser
- WhatsApp order button on products
- Image zoom gallery
- Daily gold price widget
- Mobile responsive
- SEO optimized

## License

Private - Indiran Jewellers
