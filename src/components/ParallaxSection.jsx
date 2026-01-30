import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../index.css';

const ParallaxSection = ({ image, title, subtitle, align = 'center' }) => {
    const ref = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Disable parallax on mobile for better performance
    const y = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-20%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const textY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["50%", "-50%"]);

    const alignmentStyles = {
        left: { alignItems: 'flex-start', textAlign: 'left', paddingLeft: '10%' },
        right: { alignItems: 'flex-end', textAlign: 'right', paddingRight: '10%' },
        center: { alignItems: 'center', textAlign: 'center' }
    };

    return (
        <div
            ref={ref}
            style={{
                height: '110vh',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                ...alignmentStyles[align]
            }}
        >
            <motion.div style={{
                position: 'absolute',
                top: '-20%',
                left: 0,
                width: '100%',
                height: '140%',
                backgroundImage: `url('${image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0,
                y: y,
                filter: 'brightness(0.9) contrast(1.1)'
            }} />

            {/* Gradient Overlay */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.3))',
                zIndex: 0
            }} />

            <motion.div
                style={{
                    zIndex: 1,
                    y: textY,
                    opacity,
                    maxWidth: '800px',
                }}
            >
                {/* Dark Blurry Text Container */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    padding: 'clamp(20px, 4vw, 40px)', // Responsive padding
                    borderRadius: '2px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    ...(isMobile && {
                        background: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)'
                    })
                }}>
                    {title && (
                        <h2 style={{
                            fontSize: 'clamp(1.8rem, 5vw, 4rem)', // Smaller minimum font size
                            lineHeight: 1,
                            marginBottom: '1rem',
                            color: '#ffffff', // Pure white
                            fontFamily: 'var(--font-heading)',
                            letterSpacing: '5px',
                            textShadow: '0 0 20px rgba(0,0,0,0.8)'
                        }}>
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p style={{
                            fontSize: '1.2rem',
                            color: 'var(--text-secondary)',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            margin: 0
                        }}>
                            {subtitle}
                        </p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ParallaxSection;
