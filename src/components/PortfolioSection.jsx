import React, { useState } from 'react';
import ModelViewer from './ModelViewer';

const renderImages = [
    // List of images found in listing
    "renders/NewLevelSequence2.0021%20copy.jpg",
    "renders/NewLevelSequence2.002222%20copy.jpg",
    "renders/oceanShot_01.0005%20copy.jpg",
    "renders/oceanShot_01.000513%20copy.jpg",
    "renders/oceanShot_01.0005_2%20copy.jpg",
    "renders/oceanShot_01.0005_3%20copy.jpg",
    "renders/oceanShot_01.00089%20copy.jpg",
    "renders/oceanShot_01.000add5%20copy.jpg",
    "renders/oceanShot_01.000err5%20copy.jpg",
    "renders/oceanShot_01.000re5%20copy.jpg",
    "renders/oceanShot_01.00dsda05%20copy.jpg"
];

const PortfolioSection = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div id="portfolio" style={{
            minHeight: '100vh',
            padding: '100px 5% 50px',
            zIndex: 1,
            position: 'relative',
            background: 'linear-gradient(to bottom, #0a0a0a, #111)'
        }}>
            <h1 className="specular-text" style={{
                textAlign: 'center',
                marginBottom: '60px',
                fontSize: '4rem',
            }}>
                Selected Works
            </h1>

            {/* 3D Showcase */}
            <div style={{ marginBottom: '100px' }}>
                <h2 style={{ marginBottom: '30px', color: 'var(--accent-cyan)', borderLeft: '4px solid var(--accent-cyan)', paddingLeft: '20px' }}>
                    Realtime 3D
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    <div className="glass-panel" style={{ padding: '20px' }}>
                        <h3 style={{ marginBottom: '15px' }}>Interactive Concept</h3>
                        <ModelViewer />
                    </div>
                    <div className="glass-panel" style={{ padding: '20px' }}>
                        <h3 style={{ marginBottom: '15px' }}>Asset Inspection</h3>
                        <ModelViewer autoRotate={false} />
                    </div>
                </div>
            </div>

            {/* Still Renders Gallery */}
            <div>
                <h2 style={{ marginBottom: '30px', color: 'var(--accent-red)', borderLeft: '4px solid var(--accent-red)', paddingLeft: '20px' }}>
                    Cinematic Renders
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '20px'
                }}>
                    {renderImages.map((src, index) => (
                        <div key={index} className="glass-panel" style={{
                            overflow: 'hidden',
                            cursor: 'pointer',
                            height: '250px',
                            position: 'relative'
                        }} onClick={() => setSelectedImage(src)}>
                            <img
                                src={`/${src}`}
                                alt={`Render ${index}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.5s ease'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox / Modal */}
            {selectedImage && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.95)',
                    zIndex: 2000,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'zoom-out'
                }} onClick={() => setSelectedImage(null)}>
                    <img
                        src={`/${selectedImage}`}
                        style={{ maxHeight: '90vh', maxWidth: '90vw', border: '1px solid var(--accent-metal)', boxShadow: '0 0 50px rgba(0,0,0,0.5)' }}
                        alt="Full size"
                    />
                </div>
            )}
        </div>
    );
};

export default PortfolioSection;
