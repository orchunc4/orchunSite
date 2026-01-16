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
                    background: 'rgba(0, 0, 0, 0.3)', // Reduced opacity from 0.65
                    backdropFilter: 'blur(30px)', // Increased blur
                    WebkitBackdropFilter: 'blur(30px)',
                    padding: '60px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                </div>
            </motion.div>
        </div >
    );
};

export default AboutSection;
