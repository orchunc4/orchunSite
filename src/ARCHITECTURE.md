# Frontend Architecture (SRC)

This directory contains the React application logic.

## Core Structure

### `main.jsx`
- Bootstraps the React application
- Wraps `App` in `React.StrictMode`

### `App.jsx`
- Handles Client-Side Routing using `react-router-dom`
- Routes:
  - `/`: Home Page (Hero Video, Parallax Gallery, About, Contact)
  - `/3d`: Interactive 3D Gallery
  - `/admin`: Admin Login
  - `/admin-dashboard`: Protected Admin Panel

## Components (`/src/components`)

| Component | Description |
|-----------|-------------|
| `Navbar.jsx` | Responsive navigation with hamburger menu and blur effect |
| `ParallaxSection.jsx` | Scroll-based parallax with mobile optimization |
| `ContactSection.jsx` | Functional contact form with API integration |
| `AboutSection.jsx` | About section with glassmorphism styling |
| `ModelViewer.jsx` | 3D model renderer for GLB files |
| `ScrollToTop.jsx` | Utility to reset scroll position on route change |

## Pages (`/src/pages`)

### `Home.jsx`
- **Hero Video**: Full-screen looping video (`Son.mp4`) with overlay text
- **Parallax Gallery**: Dynamic render images from API + static fallbacks
- **Sections**: About and Contact integrated

### `ThreeDGallery.jsx`
The most complex component:
- **Engine**: Uses `@react-three/fiber` Canvas
- **State**: Manages `envIntensity`, `envRotation`, `wireframeMode`, `modelScale`
- **Controls**: OrbitControls with scroll zoom enabled
- **Optimization**: Separated `Suspense` boundaries for Model vs Environment

### `AdminDashboard.jsx`
- **Authentication**: Checks `localStorage` for `isAdmin`
- **Uploads**: Handles multipart form uploads for Images and GLB files
- **Management**: Lists and allows deletion of assets

### `AdminLogin.jsx`
- Simple password form that validates against API

## Styling

### `index.css`
Contains all CSS variables and global styles:
- `--accent-red`: Primary accent color
- `--glass-bg`: Glassmorphism background
- `--font-heading`: Typography for headings

### Key Effects
- **Glassmorphism**: `backdrop-filter: blur()` with transparent backgrounds
- **Parallax**: Framer Motion `useScroll` and `useTransform`
- **Responsive**: Mobile-specific optimizations (disabled parallax, reduced blur)

## Mobile Optimizations

The `ParallaxSection` component includes mobile-specific optimizations:

```jsx
// Detect mobile device
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
}, []);

// Disable parallax on mobile
const y = useTransform(scrollYProgress, [0, 1], 
    isMobile ? ["0%", "0%"] : ["-20%", "20%"]
);
```
