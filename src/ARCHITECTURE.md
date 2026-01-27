# Frontend Architecture (SRC)

This directory contains the React application logic.

## Core Structure

### `main.jsx`
-   Bootstraps the React application.
-   Wraps `App` in `React.StrictMode`.

### `App.jsx`
-   Handles Client-Side Routing using `react-router-dom`.
-   Defines routes:
    -   `/`: Home Page (Hero, Parallax, About, Renders).
    -   `/3d`: Interactive 3D Gallery.
    -   `/admin`: Admin Login.
    -   `/admin-dashboard`: Protected Admin Panel.

## Components (`/src/components`)

-   **`Navbar.jsx`**: Responsive navigation bar with hamburger menu and blurred background.
-   **`HeroSection.jsx`**: Landing area with typo-animation and background video (`Son.mp4`).
-   **`ContactSection.jsx`**: Functional contact form. Sends POST requests to `/api/contact`.
-   **`ScrollToTop.jsx`**: Utility to reset scroll position on route change.

## Pages (`/src/pages`)

### `ThreeDGallery.jsx`
The most complex component.
-   **Engine**: Uses `@react-three/fiber` Canvas.
-   **State**: Manages `envIntensity`, `envRotation`, `wireframeMode`, `modelScale`.
-   **Optimization**: Separated `Suspense` boundaries for Model vs Environment to prevent context loss.
-   **Enforcers**: Uses `useEffect` hooks to strictly enforce lighting settings against resets.

### `AdminDashboard.jsx`
-   **Authentication**: Checks `localStorage` for `isAdmin`.
-   **Uploads**: Handles multipart form uploads for Images and GLB files to the API.
-   **Management**: Lists and allows deletion of assets.

## Styling
-   **`index.css`**: Contains all CSS variables (`--accent-red`, `--glass-bg`).
-   **Glassmorphism**: Heavy use of `backdrop-filter: blur()` and transparent backgrounds.
