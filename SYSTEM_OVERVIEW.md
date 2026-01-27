# System Architecture Overview

This project is a **Full-Stack Portfolio Website** featuring an interactive 3D gallery, dynamic admin dashboard, and modern UI.

## Tech Stack

-   **Frontend**: React (Vite), Three.js (@react-three/fiber, @react-three/drei), Framer Motion.
-   **Backend**: Node.js, Express.
-   **Database**: SQLite (Local development), MongoDB (Planned for Vercel/Production).
-   **Storage**: Cloudinary (Image & 3D Model hosting).
-   **Styling**: Plain CSS with CSS Variables (`index.css`), Glassmorphism aesthetic.

## Directory Structure

### `/` (Root)
-   `package.json`: Dependencies and scripts.
-   `vite.config.js`: Frontend build configuration.
-   `.env`: Environment variables (API Keys, Admin Passwords).
-   `vercel.json`: Deployment configuration.

### `/src` (Frontend)
Located in `d:\PROJELER\testProjesi\src`.
-   **Entry Point**: `main.jsx` -> `App.jsx`.
-   **`pages/`**: Main route components (`Home`, `ThreeDGallery`, `AdminLogin`, `AdminDashboard`).
-   **`components/`**: Reusable UI blocks (`Navbar`, `ContactSection`, `HeroSection`).
-   **`index.css`**: Global design system (colors, typography, glass effects).

### `/api` (Backend)
Located in `d:\PROJELER\testProjesi\api`.
-   **`index.js`**: Main Express server file. Defines API endpoints.
-   **`db.js`**: Database connection and schema initialization (currently SQLite).

## Key Features

1.  **3D Gallery**: Interactive GLB viewer with environment controls (Intensity, Rotation, Wireframe).
2.  **Admin Dashboard**: Secure panel to upload/delete Renders and 3D Models.
3.  **Contact Form**: Saves messages to the database via API.
4.  **Responsive Design**: Mobile-first approach with custom hamburger menu.

## Scripts

-   `npm run dev`: Start frontend (Vite).
-   `npm run server`: Start backend (Nodemon).
-   `npm run dev:all`: Start **BOTH** concurrently (Recommended for dev).
