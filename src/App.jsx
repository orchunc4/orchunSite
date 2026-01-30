import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ThreeDGallery from './pages/ThreeDGallery';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const StarField = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none', background: '#000' }}>
    <Canvas>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </Canvas>
  </div>
);

import ScrollToTop from './components/ScrollToTop';

// Wrapper to conditionally hide Navbar on admin pages
const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const is3DPage = location.pathname === '/3d';

  const isGalleryPage = location.pathname === '/gallery';

  return (
    <>
      <ScrollToTop />
      {!isAdminPage && !is3DPage && !isGalleryPage && <StarField />}
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/3d" element={<ThreeDGallery />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

