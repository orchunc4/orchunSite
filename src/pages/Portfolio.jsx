import React from 'react';
import ModelViewer from '../components/ModelViewer';

const Portfolio = () => {
    return (
        <div style={{
            minHeight: '100vh',
            padding: '100px 5% 50px',
            zIndex: 1,
            position: 'relative'
        }}>
            <h1 style={{
                textAlign: 'center',
                marginBottom: '40px',
                fontSize: '3rem',
                textShadow: '0 0 20px var(--accent-red)'
            }}>
                Selected Works
            </h1>

            <section>
                <h2 style={{ marginBottom: '20px', borderBottom: '1px solid var(--accent-metal)', display: 'inline-block' }}>Interactions</h2>
                <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>Drag to rotate, scroll to zoom.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
                    {/* Example 1: Use a placeholder or a real model URL if available */}
                    <div className="glass-panel" style={{ padding: '20px' }}>
                        <h3 style={{ marginBottom: '10px' }}>Concept Orb</h3>
                        <ModelViewer />
                    </div>
                    {/* Example 2 */}
                    <div className="glass-panel" style={{ padding: '20px' }}>
                        <h3 style={{ marginBottom: '10px' }}>Tech Artifact</h3>
                        <ModelViewer autoRotate={false} />
                    </div>
                </div>
            </section>

            <section>
                <h2 style={{ marginBottom: '20px', borderBottom: '1px solid var(--accent-metal)', display: 'inline-block' }}>Still Renders</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    {/* Placeholders for Gallery Images */}
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="glass-panel" style={{
                            aspectRatio: '1/1',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div style={{
                                width: '100%',
                                height: '100%',
                                background: `linear-gradient(45deg, var(--bg-panel), var(--accent-metal))`,
                                opacity: 0.5
                            }} />
                            <span style={{ position: 'absolute' }}>Render {item}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
