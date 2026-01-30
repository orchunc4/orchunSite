import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Same static renders as Home.jsx
const staticRenders = [
    { src: "/renders/NewLevelSequence2.0021%20copy.jpg", title: "THE BEGINNING", subtitle: "Conceptual environments in Unreal Engine 5" },
    { src: "/renders/NewLevelSequence2.002222%20copy.jpg", title: "ATMOSPHERE", subtitle: "Volumetric lighting and dense fog studies" },
    { src: "/renders/oceanShot_01.0005%20copy.jpg", title: "THE DEEP", subtitle: "Procedural ocean shaders and fluid dynamics" },
    { src: "/renders/oceanShot_01.000513%20copy.jpg", title: "REFLECTION", subtitle: "Raytraced reflections and roughness maps" },
    { src: "/renders/oceanShot_01.0005_2%20copy.jpg", title: "HORIZON", subtitle: "Infinite ocean systems" },
    { src: "/renders/oceanShot_01.0005_3%20copy.jpg", title: "STORM", subtitle: "Dynamic weather systems and chaos" },
    { src: "/renders/oceanShot_01.00089%20copy.jpg", title: "OBSERVER", subtitle: "Cinematic camera composition" },
    { src: "/renders/oceanShot_01.000add5%20copy.jpg", title: "NIGHTFALL", subtitle: "Low light exposure testing" },
    { src: "/renders/oceanShot_01.000err5%20copy.jpg", title: "GLITCH", subtitle: "Post-process material effects" },
    { src: "/renders/oceanShot_01.000re5%20copy.jpg", title: "SURFACE", subtitle: "Detailed surface imperfections" },
    { src: "/renders/oceanShot_01.00dsda05%20copy.jpg", title: "ABYSS", subtitle: "Final composite render" },
    { src: "/renders/b01.jpg", title: "ORIENTAL", subtitle: "Final composite render" },
];

const Gallery = () => {
    const [images, setImages] = useState(staticRenders);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const fetchRenders = async () => {
            try {
                const res = await fetch('/api/renders');
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) {
                        const apiRenders = data.map(r => ({
                            src: r.imageUrl,
                            title: r.title || 'UNTITLED',
                            subtitle: r.subtitle || ''
                        }));
                        setImages([...staticRenders, ...apiRenders]);
                    }
                }
            } catch {
                console.log("Using static images only");
            }
        };
        fetchRenders();
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Image */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0
            }}>
                <img
                    src="/renders/NewLevelSequence2.0021%20copy.jpg"
                    alt="Background"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'brightness(0.6)',
                        transform: 'scale(1.02)'
                    }}
                />
                {/* Gradient Overlay - Matching AboutSection */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(5,5,5,1) 0%, rgba(5,5,5,0.4) 20%, rgba(5,5,5,0.4) 80%, rgba(5,5,5,1) 100%)'
                }} />
            </div>

            {/* Content Container */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                padding: isMobile ? '120px 15px 40px' : '120px 40px 60px'
            }}>
                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: isMobile ? '30px' : '60px' }}
                >
                    <h1 style={{
                        fontSize: 'clamp(1.8rem, 5vw, 4rem)',
                        fontWeight: 700,
                        letterSpacing: isMobile ? '0.1em' : '0.2em',
                        textTransform: 'uppercase',
                        background: 'linear-gradient(135deg, #fff 0%, #888 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '15px',
                        textShadow: '0 4px 30px rgba(0,0,0,0.5)'
                    }}>
                        GALLERY
                    </h1>
                    <p style={{
                        fontSize: isMobile ? '0.95rem' : '1.1rem',
                        color: 'rgba(255,255,255,0.7)',
                        letterSpacing: '0.1em',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        padding: isMobile ? '0 10px' : '0'
                    }}>
                        Full resolution renders & concept art
                    </p>
                </motion.div>

                {/* Glass Container for Grid - Matching AboutSection style */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        maxWidth: '1650px',
                        margin: '0 auto',
                        padding: isMobile ? '15px' : '40px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: isMobile ? 'blur(15px) saturate(150%)' : 'blur(25px) saturate(180%)',
                        WebkitBackdropFilter: isMobile ? 'blur(15px) saturate(150%)' : 'blur(25px) saturate(180%)',
                        borderRadius: isMobile ? '12px' : '16px',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)'
                    }}
                >
                    {/* Image Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: isMobile ? '15px' : '25px'
                    }}>
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                onClick={() => setSelectedImage(image)}
                                style={{
                                    position: 'relative',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    aspectRatio: '16/10',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.4)'
                                }}
                            >
                                {/* Image */}
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                />

                                {/* Hover Overlay */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        padding: '30px 20px 20px',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    <h3 style={{
                                        fontSize: '1.3rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                        color: '#fff',
                                        marginBottom: '5px'
                                    }}>
                                        {image.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: 'rgba(255,255,255,0.7)',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {image.subtitle}
                                    </p>
                                </motion.div>

                                {/* Glass border effect */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '16px',
                                    pointerEvents: 'none'
                                }} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Lightbox - Outside glass container for proper fixed positioning */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9999,
                            background: 'rgba(0,0,0,0.95)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: isMobile ? '15px' : '40px',
                            cursor: 'zoom-out'
                        }}
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setSelectedImage(null)}
                            style={{
                                position: 'absolute',
                                top: isMobile ? '15px' : '30px',
                                right: isMobile ? '15px' : '30px',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '50%',
                                width: isMobile ? '40px' : '50px',
                                height: isMobile ? '40px' : '50px',
                                color: '#fff',
                                fontSize: isMobile ? '1.2rem' : '1.5rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            ✕
                        </motion.button>

                        {/* Full Image */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                maxWidth: '90vw',
                                maxHeight: '85vh',
                                position: 'relative'
                            }}
                        >
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '80vh',
                                    objectFit: 'contain',
                                    borderRadius: '12px',
                                    boxShadow: '0 25px 80px rgba(0,0,0,0.6)'
                                }}
                            />
                            {/* Caption */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                style={{
                                    textAlign: 'center',
                                    marginTop: isMobile ? '15px' : '25px',
                                    padding: isMobile ? '0 10px' : '0'
                                }}
                            >
                                <h2 style={{
                                    fontSize: isMobile ? '1.3rem' : '1.8rem',
                                    fontWeight: 700,
                                    letterSpacing: isMobile ? '0.1em' : '0.2em',
                                    textTransform: 'uppercase',
                                    color: '#fff',
                                    marginBottom: '8px'
                                }}>
                                    {selectedImage.title}
                                </h2>
                                <p style={{
                                    fontSize: isMobile ? '0.85rem' : '1rem',
                                    color: 'rgba(255,255,255,0.6)',
                                    letterSpacing: '0.1em'
                                }}>
                                    {selectedImage.subtitle}
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;


