import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface MoonMeshProps {
  wireframe: boolean;
}

export const MoonMesh: React.FC<MoonMeshProps> = ({ wireframe }) => {
  const groupRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const scrollProgressRef = useRef(0);

  // Track page scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, window.scrollY / (totalHeight || 1)));
      scrollProgressRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate ultra-realistic high-res 2048x1024 Lunar Albedo & Bump Texture Maps
  const [moonAlbedoMap, moonBumpMap, moonRoughnessMap] = useMemo(() => {
    const width = 2048;
    const height = 1024;

    // 1. Albedo Canvas
    const canvasAlbedo = document.createElement('canvas');
    canvasAlbedo.width = width;
    canvasAlbedo.height = height;
    const ctxA = canvasAlbedo.getContext('2d')!;

    // Base bright gray lunar regolith
    ctxA.fillStyle = '#8f95a0';
    ctxA.fillRect(0, 0, width, height);

    // Draw realistic dark Lunar Maria (Sea of Tranquility, Oceanus Procellarum, etc.)
    const mariaRegions = [
      { x: 600, y: 400, rx: 350, ry: 250, angle: 0.2 },
      { x: 1100, y: 350, rx: 400, ry: 280, angle: -0.3 },
      { x: 1400, y: 500, rx: 280, ry: 220, angle: 0.1 },
      { x: 400, y: 600, rx: 250, ry: 180, angle: 0.4 },
      { x: 900, y: 650, rx: 320, ry: 200, angle: -0.1 },
    ];

    mariaRegions.forEach((m) => {
      ctxA.save();
      ctxA.translate(m.x, m.y);
      ctxA.rotate(m.angle);
      const grad = ctxA.createRadialGradient(0, 0, 10, 0, 0, m.rx);
      grad.addColorStop(0, '#2d323b');
      grad.addColorStop(0.5, '#404652');
      grad.addColorStop(0.85, '#626875');
      grad.addColorStop(1, 'transparent');
      ctxA.fillStyle = grad;
      ctxA.beginPath();
      ctxA.ellipse(0, 0, m.rx, m.ry, 0, 0, Math.PI * 2);
      ctxA.fill();
      ctxA.restore();
    });

    // 2. Bump / Heightmap Canvas
    const canvasBump = document.createElement('canvas');
    canvasBump.width = width;
    canvasBump.height = height;
    const ctxB = canvasBump.getContext('2d')!;
    ctxB.fillStyle = '#808080';
    ctxB.fillRect(0, 0, width, height);

    // Draw realistic Impact Craters with bright rims and deep central pits
    const numCraters = 1200;
    for (let i = 0; i < numCraters; i++) {
      const cx = Math.random() * width;
      const cy = Math.random() * height;
      const cr = Math.pow(Math.random(), 3) * 45 + 2.5;

      // Crater Rim (Bright) on both albedo and bump
      const rimGrad = ctxB.createRadialGradient(cx, cy, cr * 0.7, cx, cy, cr * 1.3);
      rimGrad.addColorStop(0, '#ffffff');
      rimGrad.addColorStop(0.6, '#a0a0a0');
      rimGrad.addColorStop(1, '#808080');
      ctxB.fillStyle = rimGrad;
      ctxB.beginPath();
      ctxB.arc(cx, cy, cr * 1.3, 0, Math.PI * 2);
      ctxB.fill();

      // Crater Pit (Dark)
      const pitGrad = ctxB.createRadialGradient(cx, cy, 0, cx, cy, cr * 0.7);
      pitGrad.addColorStop(0, '#101010');
      pitGrad.addColorStop(0.8, '#505050');
      pitGrad.addColorStop(1, '#a0a0a0');
      ctxB.fillStyle = pitGrad;
      ctxB.beginPath();
      ctxB.arc(cx, cy, cr * 0.7, 0, Math.PI * 2);
      ctxB.fill();

      // Albedo impact ray lines for large craters (like Tycho crater)
      if (cr > 20) {
        ctxA.fillStyle = 'rgba(230, 240, 255, 0.4)';
        for (let ray = 0; ray < 12; ray++) {
          const angle = (ray / 12) * Math.PI * 2 + Math.random() * 0.2;
          const len = cr * (3 + Math.random() * 8);
          ctxA.beginPath();
          ctxA.moveTo(cx, cy);
          ctxA.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
          ctxA.lineWidth = 1.5;
          ctxA.strokeStyle = 'rgba(240, 245, 255, 0.25)';
          ctxA.stroke();
        }
      }
    }

    // High frequency noise for realistic regolith texture
    const imgDataA = ctxA.getImageData(0, 0, width, height);
    const imgDataB = ctxB.getImageData(0, 0, width, height);

    for (let p = 0; p < imgDataA.data.length; p += 4) {
      const n = (Math.random() - 0.5) * 28;
      imgDataA.data[p] = Math.min(255, Math.max(0, imgDataA.data[p] + n));
      imgDataA.data[p + 1] = Math.min(255, Math.max(0, imgDataA.data[p + 1] + n));
      imgDataA.data[p + 2] = Math.min(255, Math.max(0, imgDataA.data[p + 2] + n));

      const bn = (Math.random() - 0.5) * 35;
      imgDataB.data[p] = Math.min(255, Math.max(0, imgDataB.data[p] + bn));
      imgDataB.data[p + 1] = Math.min(255, Math.max(0, imgDataB.data[p + 1] + bn));
      imgDataB.data[p + 2] = Math.min(255, Math.max(0, imgDataB.data[p + 2] + bn));
    }

    ctxA.putImageData(imgDataA, 0, 0);
    ctxB.putImageData(imgDataB, 0, 0);

    const texA = new THREE.CanvasTexture(canvasAlbedo);
    texA.wrapS = THREE.RepeatWrapping;
    texA.wrapT = THREE.ClampToEdgeWrapping;

    const texB = new THREE.CanvasTexture(canvasBump);
    texB.wrapS = THREE.RepeatWrapping;
    texB.wrapT = THREE.ClampToEdgeWrapping;

    return [texA, texB, texB];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const mouseX = (state.pointer.x * Math.PI) / 8;
    const mouseY = (state.pointer.y * Math.PI) / 8;
    const scrollP = scrollProgressRef.current;

    if (groupRef.current) {
      // Hero state: Half moon positioned at bottom (Y = -3.4, Scale = 3.0)
      // Scroll state: Smoothly zooms out to center (Y = 0, Scale = 1.25)
      const targetY = THREE.MathUtils.lerp(-3.4, 0, Math.min(1, scrollP * 2.5));
      const targetScale = THREE.MathUtils.lerp(3.0, 1.25, Math.min(1, scrollP * 2.5));

      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08));
    }

    if (moonRef.current) {
      // Infinite lunar axial rotation
      moonRef.current.rotation.y += delta * 0.18;

      // Smooth cursor parallax tilt
      moonRef.current.rotation.x = THREE.MathUtils.lerp(
        moonRef.current.rotation.x,
        mouseY + Math.sin(time * 0.01) * 0.04,
        0.05
      );
      moonRef.current.rotation.z = THREE.MathUtils.lerp(
        moonRef.current.rotation.z,
        mouseX * 0.4,
        0.05
      );
    }

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -3.4, 0]} scale={[3.0, 3.0, 3.0]}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        {/* Main Photorealistic 3D Moon Mesh */}
        <mesh ref={moonRef} position={[0, 0, 0]}>
          <sphereGeometry args={[1.6, 128, 128]} />
          <meshStandardMaterial
            map={moonAlbedoMap}
            bumpMap={moonBumpMap}
            bumpScale={0.18}
            roughness={0.92}
            metalness={0.05}
            color="#ffffff"
            wireframe={wireframe}
          />
        </mesh>

        {/* Soft Lunar Atmospheric Glow */}
        <mesh ref={atmosphereRef} position={[0, 0, 0]}>
          <sphereGeometry args={[1.66, 64, 64]} />
          <meshBasicMaterial
            color="#80e5ff"
            transparent
            opacity={wireframe ? 0.35 : 0.12}
            blending={THREE.AdditiveBlending}
            wireframe={wireframe}
          />
        </mesh>

        {/* Orbital Silver Dust Ring */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 3.5, 0, 0]}>
          <ringGeometry args={[1.95, 1.98, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.18} side={THREE.DoubleSide} />
        </mesh>
      </Float>
    </group>
  );
};
