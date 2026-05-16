# 🏛️ Ambica Home Decor — Luxury Digital Experience

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js_5-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

Welcome to the official repository for **Ambica Home Decor**, a high-end luxury interior decor platform. Established in 1993 in Bardoli, Gujarat, Ambica Home Decor is built on the profound principle: *"We Design your home, We redefine your world."*

This repository contains both the public-facing editorial catalog and the secure administrative CMS built with a modern, full-stack Javascript architecture.

---

## 🌟 Features

### 🏛️ The Public Editorial Catalog (Frontend)
- **High-End Luxury Aesthetics:** Designed utilizing "Global Luxury Restraint", featuring custom Framer Motion animations, glassmorphism overlays, and precise typography.
- **Dynamic Collections:** Real-time browsing of categories including *Seamless Wallpapers, Roman Blinds, Luxury Curtains, and Sofa Fabrics*.
- **Client Testimonials:** Seamless server-side rendering of customer voices and 5-star reviews on the homepage.
- **Inquiry System:** Frictionless contact and inquiry forms connected directly to the backend CRM.

### 🔒 The Ambica CMS (Admin Dashboard)
- **Secure Authentication:** JWT-based robust authentication system shielding the admin routes.
- **Product & Inventory Management:** Fully functional CMS to add, edit, feature, and remove products.
- **Gallery Manager:** Upload directly to Cloudinary via a hidden file dropzone with instant gallery refreshing.
- **Testimonial Engine:** Dynamically manage client reviews that instantly populate the public-facing pages.
- **Inquiries Inbox:** Track, read, and manage customer product inquiries in real-time.

---

## 🏗️ Architecture & Tech Stack

This project is a Monorepo split into two distinct applications:

### **Frontend** (`/frontend`)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3 with custom luxury design tokens.
- **State Management:** Zustand & TanStack React Query (v5)
- **Animations:** Framer Motion

### **Backend** (`/backend`)
- **Framework:** Express.js v5
- **Database:** MongoDB & Mongoose
- **Image Hosting:** Cloudinary (via Multer & Streamifier)
- **Security:** Helmet, Bcryptjs, Express Rate Limit, JWT
- **Validation:** Zod Schema Validation

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/yasar-pathan/Ambica_HomeDecor.git
cd Ambica_HomeDecor
\`\`\`

### 2. Install Dependencies
You will need to install dependencies for both the frontend and backend.
\`\`\`bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
\`\`\`

### 3. Environment Configuration
Create a `.env` file in the `backend/` directory and a `.env.local` file in the `frontend/` directory.

**Backend (`backend/.env`):**
\`\`\`env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_ORIGIN=http://localhost:3000
\`\`\`

**Frontend (`frontend/.env.local`):**
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_BRAND_NAME="Ambica Home Decor"
\`\`\`

*(Note: Never commit your actual `.env` files to version control!)*

### 4. Run the Development Servers
Start both servers simultaneously in two separate terminal windows.

**Terminal 1 (Backend):**
\`\`\`bash
cd backend
npm run dev
\`\`\`

**Terminal 2 (Frontend):**
\`\`\`bash
cd frontend
npm run dev
\`\`\`

Your luxury catalog is now running beautifully on \`http://localhost:3000\`!

---

## 🛡️ Security & Scalability
- **Rate Limiting:** Protects the admin login from brute-force attempts.
- **Sanitized Inputs:** All incoming requests are strictly validated using Zod against NoSQL injection patterns.
- **Optimized Assets:** All imagery is instantly converted to Next-Gen WebP formats via Cloudinary.

## 📄 License
This project is proprietary and confidential. Unauthorized copying of this file, via any medium, is strictly prohibited.

*Built with precision and restraint for Ambica Home Decor.*
