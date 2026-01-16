import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ThreeDGallery from './pages/ThreeDGallery';
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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <StarField />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/3d" element={<ThreeDGallery />} />
      </Routes>
    </Router>
  );
}

export default App;
