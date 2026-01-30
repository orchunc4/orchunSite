import React, { useState, useEffect } from 'react';
import ParallaxSection from '../components/ParallaxSection';
import ContactSection from '../components/ContactSection';
import AboutSection from '../components/AboutSection';

// Fallback static renders (used when API is not available)
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

const Home = () => {
    const [renderImages, setRenderImages] = useState(staticRenders);

    useEffect(() => {
        const fetchRenders = async () => {
            try {
                const res = await fetch('/api/renders');
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) {
                        // Map API data to component format
                        const apiRenders = data.map(r => ({
                            src: r.imageUrl,
                            title: r.title || 'UNTITLED',
                            subtitle: r.subtitle || ''
                        }));
                        // Combine: Static renders first, then API renders
                        setRenderImages([...staticRenders, ...apiRenders]);
                    }
                }
            } catch {
                console.log("Using static models");
            }
        };
        fetchRenders();
    }, []);

    return (
        <>
            {/* Hero Video Section */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: '100%',
                        minHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'cover',
                        zIndex: -1
                    }}
                >
                    <source src="/Son.mp4" type="video/mp4" />
                </video>
                {/* Optional overlay for better text visibility */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.5) 100%)',
                    zIndex: 0
                }} />
                {/* Hero Text */}
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                    color: 'white',
                    padding: '0 20px'
                }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        marginBottom: '20px',
                        textShadow: '0 4px 30px rgba(0,0,0,0.5)'
                    }}>
                        WELCOME
                    </h1>
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                        fontWeight: 300,
                        letterSpacing: '0.1em',
                        opacity: 0.9,
                        textShadow: '0 2px 15px rgba(0,0,0,0.5)'
                    }}>
                        Creative 3D Artist & Developer
                    </p>
                </div>
                {/* Scroll indicator */}
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    animation: 'bounce 2s infinite'
                }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </div>
            </div>

            <div id="home" style={{ position: 'relative' }}>
                {renderImages.map((item, index) => (
                    <ParallaxSection
                        key={index}
                        image={item.src}
                        title={item.title}
                        subtitle={item.subtitle}
                        align="center"
                    />
                ))}
            </div>
            <AboutSection />
            <ContactSection />
        </>
    );
};

export default Home;
