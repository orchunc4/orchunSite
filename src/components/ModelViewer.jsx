import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Html, useProgress } from '@react-three/drei';

function Loader() {
    const { progress } = useProgress();
    return <Html center><span style={{ color: 'white' }}>{progress} % loaded</span></Html>;
}

// Separate component that always calls useGLTF (fixes conditional hook error)
const LoadedModel = ({ url }) => {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
};

// Wrapper to load a model if a URL is provided, otherwise show placeholder
const Model = ({ url }) => {
    if (!url) {
        // Placeholder Mesh mainly for dev/demo if no model provided
        return (
            <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#8b0000" metalness={0.8} roughness={0.2} />
            </mesh>
        );
    }

    return <LoadedModel url={url} />;
};

const ModelViewer = ({ modelUrl, autoRotate = true }) => {
    return (
        <div style={{ width: '100%', height: '500px', position: 'relative' }} className="glass-panel">
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
                <Suspense fallback={<Loader />}>
                    <Stage environment="city" intensity={0.6}>
                        <Model url={modelUrl} />
                    </Stage>
                </Suspense>
                <OrbitControls autoRotate={autoRotate} makeDefault />
            </Canvas>
        </div>
    );
};

export default ModelViewer;
