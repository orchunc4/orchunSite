import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF, Html, useProgress, Center, Grid } from '@react-three/drei';
import * as THREE from 'three';
import ContactSection from '../components/ContactSection';
import '../index.css';

function Loader() {
    const { progress } = useProgress();
    return <Html center><span style={{ color: 'white', fontFamily: 'var(--font-heading)' }}>{progress.toFixed(0)} % loaded</span></Html>;
}

// Helper to manage environment settings using useEffect
// This prevents layout thrashing/context issues from useFrame while still enforcing settings
const EnvSettings = ({ intensity, rotation }) => {
    const { scene } = useThree();
    useEffect(() => {
        // Enforce Intensity
        scene.environmentIntensity = intensity;

        // Enforce Rotation
        const rotRad = rotation * (Math.PI / 180);
        if (!scene.environmentRotation) {
            scene.environmentRotation = new THREE.Euler(0, rotRad, 0);
        } else {
            scene.environmentRotation.y = rotRad;
        }

    }, [scene, intensity, rotation, scene.environment]); // Re-run if environment map updates (e.g. preset change)
    return null;
};

const StudioModel = ({ url, wireframe, ...props }) => {
    const { scene } = useGLTF(url);

    // Memoize clone to keep it stable but allow recreation if scene changes
    const clonedScene = useMemo(() => scene.clone(true), [scene]);

    useEffect(() => {
        clonedScene.traverse((child) => {
            if (child.isMesh) {
                // Store original material if not already stored
                if (!child.userData.originalMaterial) {
                    child.userData.originalMaterial = child.material;
                }

                if (wireframe) {
                    // Create a wireframe material
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0x00bcd4, // Cyan
                        wireframe: true,
                        emissive: 0x00bcd4,
                        emissiveIntensity: 0.5,
                        roughness: 0.2,
                        metalness: 0.8
                    });
                } else {
                    // Restore original (cloned to be safe)
                    child.material = child.userData.originalMaterial.clone();
                }
            }
        });
    }, [clonedScene, wireframe]);

    return <primitive object={clonedScene} {...props} />;
};

const ThreeDGallery = () => {
    // Removed specific intensity state for spotlight, keeping envIntensity
    const [envIntensity, setEnvIntensity] = useState(1);
    const [envRotation, setEnvRotation] = useState(0);
    const [autoRotateSpeed, setAutoRotateSpeed] = useState(2);
    const [envPreset, setEnvPreset] = useState('city');
    const [showControls, setShowControls] = useState(true);
    const [availableModels, setAvailableModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);
    const [modelScale, setModelScale] = useState(1);

    // New Toggles
    const [wireframeMode, setWireframeMode] = useState(false);
    const [showGrid, setShowGrid] = useState(true);

    // Fetch models from API
    useEffect(() => {
        const fetchModels = async () => {
            try {
                const res = await fetch('/api/models');
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) {
                        const apiModels = data.map((m, i) => ({
                            id: m._id || i + 100,
                            name: m.name || 'Unnamed Model',
                            url: m.fileUrl,
                            thumbnailUrl: m.thumbnailUrl,
                            type: 'glb'
                        }));
                        setAvailableModels(apiModels);
                        if (apiModels.length > 0) {
                            setSelectedModel(apiModels[0]);
                        }
                    }
                }
            } catch {
                console.log('API not available or no models found');
            }
        };
        fetchModels();
    }, []);

    // Handle responsive scaling
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setModelScale(0.6);
            } else {
                setModelScale(1);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ width: '100%', minHeight: '100vh', background: '#050505', overflowX: 'hidden' }}>

            {/* 3D Canvas Container - 100vh */}
            <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
                <Canvas shadows camera={{ position: [0, 2, 6], fov: 40 }} gl={{ preserveDrawingBuffer: true }}>
                    <fog attach="fog" args={['#050505', 5, 20]} />
                    <color attach="background" args={['#050505']} />

                    {/* Separate Suspense for Environment to avoid reloading when Model changes */}
                    <Suspense fallback={null}>
                        <Environment preset={envPreset} blur={0.8} />
                        <EnvSettings intensity={envIntensity} rotation={envRotation} />
                    </Suspense>

                    <Suspense fallback={<Loader />}>
                        <group position={[0, -0.5, 0]} scale={modelScale}>
                            <Center top>
                                {selectedModel && (
                                    <StudioModel url={selectedModel.url} wireframe={wireframeMode} />
                                )}
                            </Center>
                            <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />

                            {/* Futuristic Grid Floor */}
                            {showGrid && (
                                <Grid
                                    position={[0, -0.01, 0]}
                                    args={[10, 10]}
                                    cellColor="#202020"
                                    sectionColor="#404040"
                                    sectionThickness={1}
                                    cellThickness={0.5}
                                    fadeDistance={10}
                                    infiniteGrid
                                />
                            )}
                        </group>
                    </Suspense>

                    {/* Spotlight for Key Light - Fixed Intensity/Position as Fill */}
                    <spotLight
                        position={[5, 10, 5]}
                        angle={0.5}
                        penumbra={1}
                        intensity={2}
                        castShadow
                        shadow-inputBias={-0.0001}
                    />

                    <OrbitControls
                        autoRotate={autoRotateSpeed > 0}
                        autoRotateSpeed={autoRotateSpeed}
                        makeDefault
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 1.75}
                        enableZoom={true}
                    />
                </Canvas>

                {/* Sidebar (Assets) */}
                <div className="glass-panel studio-panel-left">
                    <h3 style={{ margin: '0 0 20px 0', color: 'var(--accent-red)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '15px', letterSpacing: '1px' }}>
                        ASSETS LIBRARY
                    </h3>
                    {availableModels.length === 0 ? (
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', fontSize: '0.9rem' }}>
                            No models uploaded yet.
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {availableModels.map(model => (
                                <div
                                    key={model.id}
                                    onClick={() => setSelectedModel(model)}
                                    style={{
                                        padding: '12px',
                                        borderRadius: '10px',
                                        background: selectedModel?.id === model.id ? 'var(--accent-red)' : 'rgba(255,255,255,0.03)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '15px',
                                        border: '1px solid',
                                        borderColor: selectedModel?.id === model.id ? 'var(--accent-red)' : 'rgba(255,255,255,0.05)',
                                        boxShadow: selectedModel?.id === model.id ? '0 0 20px rgba(139, 0, 0, 0.3)' : 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (selectedModel?.id !== model.id) {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (selectedModel?.id !== model.id) {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                        }
                                    }}
                                >
                                    <img
                                        src={model.thumbnailUrl || "/model-thumb.png"}
                                        alt="Model Thumbnail"
                                        style={{
                                            width: '45px',
                                            height: '45px',
                                            objectFit: 'cover',
                                            background: 'rgba(0,0,0,0.3)',
                                            borderRadius: '6px',
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        }}
                                    />
                                    <span style={{ fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.5px' }}>{model.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Controls Panel */}
                <div className={`glass-panel studio-panel-right ${showControls ? '' : 'collapsed'}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                        <h3 style={{ margin: 0, color: 'var(--accent-red)', letterSpacing: '1px' }}>STUDIO CONTROLS</h3>
                        <button onClick={() => setShowControls(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem', opacity: 0.6 }}>✕</button>
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>VISUAL STYLE</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                className="glass-btn"
                                style={{
                                    flex: 1,
                                    background: wireframeMode ? 'var(--accent-cyan)' : 'transparent',
                                    color: wireframeMode ? 'black' : 'white',
                                    border: wireframeMode ? '1px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.1)'
                                }}
                                onClick={() => setWireframeMode(!wireframeMode)}
                            >
                                WIREFRAME
                            </button>
                            <button
                                className="glass-btn"
                                style={{
                                    flex: 1,
                                    background: showGrid ? 'var(--accent-metal)' : 'transparent',
                                    border: showGrid ? '1px solid var(--accent-metal)' : '1px solid rgba(255,255,255,0.1)'
                                }}
                                onClick={() => setShowGrid(!showGrid)}
                            >
                                GRID
                            </button>
                        </div>
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>ENV INTENSITY: {envIntensity}</label>
                        <input type="range" min="0" max="8" step="0.1" value={envIntensity} onChange={(e) => setEnvIntensity(parseFloat(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-red)', cursor: 'pointer' }} />
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>ENV ROTATION: {envRotation}°</label>
                        <input type="range" min="0" max="360" step="1" value={envRotation} onChange={(e) => setEnvRotation(parseFloat(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-red)', cursor: 'pointer' }} />
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>ROTATION SPEED: {autoRotateSpeed}</label>
                        <input type="range" min="0" max="20" step="0.5" value={autoRotateSpeed} onChange={(e) => setAutoRotateSpeed(parseFloat(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-red)', cursor: 'pointer' }} />
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>ENVIRONMENT MAP</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            {['city', 'sunset', 'studio', 'night'].map(env => (
                                <button
                                    key={env}
                                    className="glass-btn"
                                    style={{
                                        padding: '8px',
                                        fontSize: '0.75rem',
                                        borderRadius: '6px',
                                        borderColor: envPreset === env ? 'var(--accent-red)' : 'rgba(255,255,255,0.1)',
                                        background: envPreset === env ? 'rgba(139, 0, 0, 0.15)' : 'transparent',
                                        boxShadow: envPreset === env ? '0 0 10px rgba(139, 0, 0, 0.2)' : 'none'
                                    }}
                                    onClick={() => setEnvPreset(env)}
                                >
                                    {env.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {!showControls && (
                    <button className="glass-btn studio-trigger" onClick={() => setShowControls(true)}>Open Controls</button>
                )}
            </div>

            {/* Contact Section Footer */}
            <div id="contact" style={{ position: 'relative', zIndex: 5 }}>
                <ContactSection />
            </div>

        </div>
    );
};

export default ThreeDGallery;
