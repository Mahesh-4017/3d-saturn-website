import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface HeroShaderMeshProps {
  wireframe: boolean;
}

export const HeroShaderMesh: React.FC<HeroShaderMeshProps> = ({ wireframe }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const mouseX = (state.pointer.x * Math.PI) / 4;
    const mouseY = (state.pointer.y * Math.PI) / 4;

    if (meshRef.current) {
      // Smooth lerp rotation based on cursor
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouseY + time * 0.2, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouseX + time * 0.3, 0.05);
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -time * 0.15;
      outerRingRef.current.rotation.x = time * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
        {/* Core Morphing Torus Knot */}
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <torusKnotGeometry args={[1.3, 0.42, 128, 32, 2, 3]} />
          <meshStandardMaterial
            color="#00f3ff"
            emissive="#0055ff"
            emissiveIntensity={wireframe ? 0.8 : 0.25}
            roughness={0.15}
            metalness={0.9}
            wireframe={wireframe}
          />
        </mesh>

        {/* Outer Orbital Glowing Ring */}
        <mesh ref={outerRingRef} position={[0, 0, 0]}>
          <torusGeometry args={[2.5, 0.03, 16, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
};
