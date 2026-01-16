import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);

    // Using the new High-Res specific image
    const bgImage = "/renders/NewLevelSequence2.0021%20copy.jpg";

    return (
        <div id="home" style={{
            height: '100vh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Parallax Background */}
            <motion.div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '120%', // slightly larger for parallax
                backgroundImage: `url('${bgImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0,
                y: y1,
                filter: 'brightness(0.6)'
            }} />

            {/* Overlay Content */}
            <motion.div
                style={{ zIndex: 1, textAlign: 'center', y: y2 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <h1 className="specular-text" style={{
                    fontSize: 'clamp(4rem, 10vw, 8rem)',
                    fontWeight: '900',
                    letterSpacing: '5px',
                    marginBottom: '20px',
                }}>
                    ORCUN KAYHAN
                </h1>
                <h2 style={{
                    fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                    color: 'var(--accent-red)',
                    textTransform: 'uppercase',
                    letterSpacing: '10px',
                    textShadow: '0 0 20px black'
                }}>
                    Cinematic 3D Artist
                </h2>
            </motion.div>

            {/* Scroll indicator */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2,
                animation: 'bounce 2s infinite'
            }}>
                <div style={{
                    width: '30px',
                    height: '50px',
                    border: '2px solid rgba(255,255,255,0.5)',
                    borderRadius: '15px',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '10px'
                }}>
                    <div style={{
                        width: '4px',
                        height: '10px',
                        background: 'white',
                        borderRadius: '2px'
                    }} />
                </div>
            </div>
            <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0) translateX(-50%);}
          40% {transform: translateY(-10px) translateX(-50%);}
          60% {transform: translateY(-5px) translateX(-50%);}
        }
      `}</style>
        </div>
    );
};

export default Hero;
