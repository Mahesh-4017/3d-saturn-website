import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { SaturnMesh } from './SaturnMesh';
import { NightSkyStars } from './NightSkyStars';

interface SceneCanvasProps {
  wireframeMode: boolean;
}

export const SceneCanvas: React.FC<SceneCanvasProps> = ({ wireframeMode }) => {
  return (
    <div className="w-full h-full relative bg-[#010206]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#010206']} />
        <Suspense fallback={null}>
          {/* Deep Space Night Sky & Starfield */}
          <NightSkyStars />

          {/* Golden Solar & Planetary Lighting Rig */}
          <ambientLight intensity={0.4} color="#fef08a" />
          {/* Sun Directional Key Light */}
          <directionalLight
            position={[8, 6, 6]}
            intensity={3.0}
            color="#fffbeb"
            castShadow
          />
          {/* Cyan Rim Accent Light */}
          <directionalLight
            position={[-8, -5, -4]}
            intensity={0.8}
            color="#38bdf8"
          />
          <pointLight position={[3, 4, 3]} intensity={2.2} color="#fde047" />
          <pointLight position={[-4, -4, -3]} intensity={1.2} color="#60a5fa" />

          {/* 3D Photorealistic Interactive Saturn */}
          <SaturnMesh wireframe={wireframeMode} />

          {/* Soft Ground Shadow */}
          <ContactShadows
            position={[0, -2.4, 0]}
            opacity={0.6}
            scale={10}
            blur={2.5}
            far={4}
            color="#000000"
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.6}
            minPolarAngle={Math.PI / 3}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
