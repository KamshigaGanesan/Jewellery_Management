# Jewellery Management
# Indiran Jewellers Website

## Project Overview

Indiran Jewellers is a modern jewellery showcase website developed for a Sri Lankan Tamil jewellery business. The website allows customers to browse jewellery collections, view product details, check daily gold rates, and contact the business through WhatsApp.

The project focuses on simplicity, responsiveness, and a premium user experience while keeping management easy for the developer.

---

## Technologies Used

### Frontend

* Next.js
* React.js
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React Icons

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Image Storage

* Cloudinary

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## Features

### Customer Features

* Responsive Homepage
* Jewellery Collections Showcase
* Product Details Page
* Daily Gold Rate Display
* Search and Filtering
* WhatsApp Inquiry Integration
* Contact Page
* Mobile Friendly Design

### Business Features

* Store jewellery products in MongoDB Atlas
* Store product images in Cloudinary
* Update gold rates directly from the database
* Manage collections through database updates
* Scalable architecture for future enhancements

### Premium Luxury UI/UX & Animations (New Updates)

* **Intersection Observer Scroll Reveals**: Smooth slide-in animations (`translateY: 40px -> 0`) for sections and cards. Staggers children elements automatically by `80ms` delays to create a flowing page load experience.
- **Custom Cursor Glow**: A soft, elegant, low-opacity golden radial gradient glow (`luxury-cursor-glow`) trailing the mouse cursor.
- **Hero Parallax & Scale**: Interactive mouse parallax on spotlight images that moves elements subtly based on cursor position, accompanied by slow scaling transitions on image mounts (`1.05 -> 1.0`).
- **Button Shimmer & Lifts**: Elegant shimmer sweeps passing across CTA buttons, paired with soft shadows and controlled hover scales (max `1.03`).
- **Scroll-Aware Header Blur**: Sticky navigation transitions its blur depth, shadows, and borders dynamically as the user scrolls.
- **Micro-Interactions**: Custom transitions, slow zooms, and brightness transitions on images and cards. Fully respects `prefers-reduced-motion` settings.


---

## Tech Stack

* Next.js
* React.js
* Node.js
* Express.js
* MongoDB Atlas
* Cloudinary
* Tailwind CSS
* Framer Motion

---

## Database Collections

### Products Collection

{
"name": "Temple Gold Necklace",
"category": "Temple Jewellery",
"price": 250000,
"weight": "25g",
"description": "Premium handcrafted necklace",
"images": [],
"createdAt": "2026-06-11"
}

### Gold Rates Collection

{
"gold22k": 356000,
"gold24k": 387000,
"updatedAt": "2026-06-11"
}

---

## Environment Variables

Create a .env file in the backend folder.

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

---

## Installation

### Clone Repository

git clone repository-url

### Install Frontend Dependencies

cd client

npm install

### Install Backend Dependencies

cd server

npm install

### Start Backend

npm run dev

### Start Frontend

npm run dev

---

## Future Improvements

* Admin Dashboard
* Online Ordering System
* Shopping Cart
* Appointment Booking
* Customer Accounts
* Payment Gateway Integration
* Inventory Management
* Tamil and English Language Support

---

## Project Structure

IndiranJewellers/

├── client/

│   ├── public/

│   ├── src/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── layouts/

│   │   ├── services/

│   │   ├── hooks/

│   │   └── assets/

│

├── server/

│   ├── controllers/

│   ├── routes/

│   ├── models/

│   ├── middleware/

│   ├── config/

│   └── server.js

│

├── .env

├── package.json

└── README.md

---

## Author

Developed By:
Kamshiga G

Full Stack Developer

---

## Summary

This project is built using Next.js, React.js, Node.js, Express.js, MongoDB Atlas, Cloudinary, Tailwind CSS, and Framer Motion to provide a modern, responsive, and scalable jewellery showcase platform for Indiran Jewellers.

