# Orcun's Portfolio Website

A modern, full-stack portfolio website featuring an interactive 3D gallery, dynamic admin dashboard, and stunning UI effects.

## 🚀 Live Demo
[View on Vercel](https://your-vercel-url.vercel.app)

## ✨ Features

- **Hero Video Section** - Full-screen looping video background
- **Parallax Scrolling** - Immersive image galleries with scroll-based animations
- **Interactive 3D Gallery** - View and interact with GLB models
- **Admin Dashboard** - Upload/manage renders and 3D models
- **Contact Form** - Functional form with database storage
- **Responsive Design** - Optimized for desktop and mobile
- **Performance Optimized** - Compressed assets, mobile-specific optimizations

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend | React, Vite, Framer Motion |
| 3D | Three.js, @react-three/fiber, @react-three/drei |
| Backend | Node.js, Express |
| Database | SQLite (dev), MongoDB (production) |
| Storage | Cloudinary |
| Deployment | Vercel |

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/orchunc4/orchunSite.git
cd orchunSite

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values
```

## 🔧 Development

```bash
# Start both frontend and backend
npm run dev:all

# Or separately:
npm run dev      # Frontend only (Vite)
npm run server   # Backend only (Express)
```

## 📁 Project Structure

```
├── api/                 # Express backend
│   ├── index.js         # API routes
│   └── db.js            # Database configuration
├── public/              # Static assets
│   ├── renders/         # Portfolio images
│   ├── Son.mp4          # Hero video
│   └── models/          # 3D model files
├── src/                 # React frontend
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route pages
│   └── index.css        # Global styles
└── vercel.json          # Deployment config
```

## 🎨 Performance Optimizations

- **Images**: Compressed from 84MB to 7MB (-92%)
- **Video**: Optimized from 96MB to 25MB (-75%)
- **Mobile**: Parallax disabled, reduced blur effects
- **Lazy Loading**: Images and 3D models load on demand

## 📄 Documentation

- [System Overview](./SYSTEM_OVERVIEW.md)
- [Frontend Architecture](./src/ARCHITECTURE.md)
- [Backend Architecture](./api/ARCHITECTURE.md)
- [Adding Renders](./ADDING_RENDERS.md)
- [Adding 3D Models](./ADDING_MODELS.md)

## 📝 Environment Variables

```env
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📜 License

MIT License - feel free to use this project as inspiration for your own portfolio!
