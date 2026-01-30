# System Architecture Overview

This project is a **Full-Stack Portfolio Website** featuring an interactive 3D gallery, dynamic admin dashboard, and modern UI with performance optimizations.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React (Vite), Three.js (@react-three/fiber, @react-three/drei), Framer Motion |
| **Backend** | Node.js, Express |
| **Database** | SQLite (Local development), MongoDB (Production/Vercel) |
| **Storage** | Cloudinary (Image & 3D Model hosting) |
| **Styling** | Plain CSS with CSS Variables, Glassmorphism aesthetic |
| **Deployment** | Vercel |

## Directory Structure

### `/` (Root)
- `package.json`: Dependencies and scripts
- `vite.config.js`: Frontend build configuration
- `.env`: Environment variables (API Keys, Admin Passwords)
- `vercel.json`: Deployment configuration (rewrites, functions)

### `/src` (Frontend)
- **Entry Point**: `main.jsx` -> `App.jsx`
- **`pages/`**: Main route components (`Home`, `ThreeDGallery`, `AdminLogin`, `AdminDashboard`)
- **`components/`**: Reusable UI blocks (`Navbar`, `ContactSection`, `ParallaxSection`)
- **`index.css`**: Global design system (colors, typography, glass effects)

### `/api` (Backend)
- **`index.js`**: Main Express server file with API endpoints
- **`db.js`**: Database connection and schema initialization

### `/public` (Static Assets)
- **`renders/`**: Optimized portfolio images (~7MB total)
- **`Son.mp4`**: Hero video (~25MB, optimized)
- **`models/`**: Static 3D model files

## Key Features

1. **Hero Video Section**: Full-screen looping video with overlay text
2. **Parallax Gallery**: Scroll-based image animations with glassmorphism text boxes
3. **3D Gallery**: Interactive GLB viewer with environment controls
4. **Admin Dashboard**: Secure panel to upload/delete Renders and 3D Models
5. **Contact Form**: Saves messages to the database via API
6. **Responsive Design**: Mobile-first with hamburger menu and optimized animations

## Performance Optimizations

| Optimization | Before | After | Improvement |
|--------------|--------|-------|-------------|
| Render Images | 84 MB | 7 MB | -92% |
| Hero Video | 96 MB | 25 MB | -75% |
| Mobile Parallax | Enabled | Disabled | Smoother scroll |
| Mobile Blur | 15px | 5px | Better performance |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend (Vite) |
| `npm run server` | Start backend (Nodemon) |
| `npm run dev:all` | Start **BOTH** concurrently (Recommended) |
| `npm run build` | Production build |

## Deployment

The project is configured for Vercel deployment with:
- Serverless functions for API (`/api`)
- Static file serving for frontend
- Automatic builds on git push
