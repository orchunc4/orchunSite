import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
    return (
        <div id="about" style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            {/* Background Render */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url("/renders/oceanShot_01.00089%20copy.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.6)',
                zIndex: 0
            }} />

            {/* Gradient Overlay for better text contrast */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(5,5,5,1) 0%, rgba(5,5,5,0.4) 20%, rgba(5,5,5,0.4) 80%, rgba(5,5,5,1) 100%)',
                zIndex: 1
            }} />

            {/* Content Container - Glassy */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                    zIndex: 2,
                    maxWidth: '900px',
                    width: '90%',
                    background: 'rgba(255, 255, 255, 0.03)', // Subtle light background for glass
                    backdropFilter: 'blur(25px) saturate(180%)', // Richer blur
                    WebkitBackdropFilter: 'blur(25px) saturate(180%)',
                    padding: '60px',
                    borderRadius: '16px', // Softer corners
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
                    margin: '20px'
                }}
            >
                <h2 style={{
                    color: 'var(--text-primary)',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)', // Fluid typography
                    fontFamily: 'var(--font-heading)',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    letterSpacing: '2px',
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
                }}>
                    ABOUT ME
                </h2>

                <div style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.2rem',
                    lineHeight: '1.8',
                    textAlign: 'justify'
                }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        I am a 3D Artist and Digital Designer passionate about creating immersive environments and cinematic experiences. With a strong foundation in Unreal Engine 5 and procedural generation, I specialize in blending photorealism with stylized aesthetics to tell compelling visual stories.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        My work explores the intersection of technology and art, focusing on dynamic lighting, atmospheric depth, and intricate surface details. Whether it's a calm ocean horizon or a chaotic storm, I strive to capture the emotions of a moment through digital mediums.
                    </p>
                    <p>
                        Currently dealing with real-time rendering, material creation, and virtual production. I am always open to new challenges and collaborations that push the boundaries of what is possible in real-time graphics.
                    </p>
                </div>
            </motion.div>
        </div >
    );
};

export default AboutSection;
