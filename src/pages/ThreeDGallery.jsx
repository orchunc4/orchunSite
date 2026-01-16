import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF, Html, useProgress } from '@react-three/drei';
import ContactSection from '../components/ContactSection'; // Import ContactSection
import '../index.css';

function Loader() {
    const { progress } = useProgress();
    return <Html center><span style={{ color: 'white', fontFamily: 'var(--font-heading)' }}>{progress.toFixed(0)} % loaded</span></Html>;
}

const StudioModel = ({ url, ...props }) => {
    const { scene } = useGLTF(url);
    return <primitive object={scene} {...props} />;
};

const PlaceholderSphere = (props) => (
    <mesh {...props}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#8b0000" metalness={0.9} roughness={0.1} />
    </mesh>
);

const availableModels = [
    { id: 1, name: 'Concept Orb', url: '', type: 'placeholder' },
    { id: 2, name: 'Cyber Skull', url: '', type: 'placeholder' },
    { id: 3, name: 'Mech Part', url: '', type: 'placeholder' }
];

const ThreeDGallery = () => {
    const [lightPos, setLightPos] = useState([5, 5, 5]);
    const [intensity, setIntensity] = useState(1);
    const [autoRotate, setAutoRotate] = useState(true);
    const [envPreset, setEnvPreset] = useState('city');
    const [showControls, setShowControls] = useState(true);
    const [showAssets, setShowAssets] = useState(true); // New state for mobile assets toggle
    const [selectedModel, setSelectedModel] = useState(availableModels[0]);
    const [modelScale, setModelScale] = useState(1);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setModelScale(0.6); // Shrink model on mobile
            } else {
                setModelScale(1);
            }
        };
        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ width: '100%', minHeight: '100vh', background: '#050505', overflowX: 'hidden' }}>

            {/* 3D Canvas Container - 100vh */}
            <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
                <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
                    <fog attach="fog" args={['#050505', 5, 15]} />
                    <color attach="background" args={['#050505']} />

                    <Suspense fallback={<Loader />}>
                        <group position={[0, -0.5, 0]} scale={modelScale}>
                            {selectedModel.type === 'placeholder' ? (
                                <PlaceholderSphere />
                            ) : (
                                <StudioModel url={selectedModel.url} />
                            )}
                            <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
                        </group>

                        <Environment preset={envPreset} blur={0.8} />
                    </Suspense>

                    <pointLight position={lightPos} intensity={intensity} castShadow />
                    <OrbitControls autoRotate={autoRotate} makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} enableZoom={false} />
                </Canvas>

                {/* Sidebar (Assets) - Uses Responsive Classes */}
                {/* We toggled visibility via class on mobile, but for simplicity, let's just use the class with conditional rendering/state if needed, 
              or rely on the media query transforms. 
              Let's add a button to open assets on mobile if we want to be fancy, but simply stacking is a good start.
          */}
                <div className="glass-panel studio-panel-left">
                    <h3 style={{ margin: '0 0 15px 0', color: 'var(--accent-red)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>
                        Assets Library
                    </h3>
                    {availableModels.map(model => (
                        <div
                            key={model.id}
                            onClick={() => setSelectedModel(model)}
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                background: selectedModel.id === model.id ? 'var(--accent-red)' : 'rgba(255,255,255,0.05)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <div style={{ width: '40px', height: '40px', background: '#000', borderRadius: '3px' }} />
                            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{model.name}</span>
                        </div>
                    ))}
                </div>

                {/* Controls Panel - Uses Responsive Classes */}
                <div className={`glass-panel studio-panel-right ${showControls ? '' : 'collapsed'}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, color: 'var(--accent-red)' }}>Studio Controls</h3>
                        <button onClick={() => setShowControls(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Environment</label>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {['city', 'sunset', 'studio', 'night'].map(env => (
                                <button key={env} className="glass-btn" style={{ flex: '1 0 40%', padding: '5px', fontSize: '0.8rem', borderColor: envPreset === env ? 'var(--accent-cyan)' : 'var(--glass-border)', background: envPreset === env ? 'rgba(0, 188, 212, 0.1)' : 'transparent' }} onClick={() => setEnvPreset(env)}>{env}</button>
                            ))}
                        </div>
                    </div>
                    <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Auto Rotation</label>
                        <input type="checkbox" checked={autoRotate} onChange={(e) => setAutoRotate(e.target.checked)} style={{ width: '20px', height: '20px', accentColor: 'var(--accent-red)' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Light Intensity</label>
                        <input type="range" min="0" max="5" step="0.1" value={intensity} onChange={(e) => setIntensity(parseFloat(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-red)' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Light Position X/Y/Z</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <input type="range" min="-10" max="10" step="0.5" value={lightPos[0]} onChange={(e) => setLightPos([parseFloat(e.target.value), lightPos[1], lightPos[2]])} style={{ width: '100%', accentColor: 'var(--accent-metal)' }} />
                            <input type="range" min="0" max="10" step="0.5" value={lightPos[1]} onChange={(e) => setLightPos([lightPos[0], parseFloat(e.target.value), lightPos[2]])} style={{ width: '100%', accentColor: 'var(--accent-metal)' }} />
                            <input type="range" min="-10" max="10" step="0.5" value={lightPos[2]} onChange={(e) => setLightPos([lightPos[0], lightPos[1], parseFloat(e.target.value)])} style={{ width: '100%', accentColor: 'var(--accent-metal)' }} />
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
