import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Dynamic 3D Shooting Comets / Meteors with glowing additive trails
const ShootingMeteors: React.FC = () => {
  const count = 5;
  const groupRef = useRef<THREE.Group>(null);

  const meteorData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 50,
      y: 15 + Math.random() * 25,
      z: -10 - Math.random() * 30,
      speed: 20 + Math.random() * 25,
      length: 2.0 + Math.random() * 3.0,
      color: Math.random() > 0.4 ? '#fde047' : '#38bdf8',
    }));
  }, [count]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const data = meteorData[i];
      child.position.x += data.speed * delta * 0.9;
      child.position.y -= data.speed * delta * 0.55;

      // Loop back when passing screen limits
      if (child.position.x > 35 || child.position.y < -25) {
        child.position.x = -35 - Math.random() * 20;
        child.position.y = 20 + Math.random() * 20;
        child.position.z = -10 - Math.random() * 25;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {meteorData.map((data, i) => (
        <group key={i} position={[data.x, data.y, data.z]} rotation={[0, 0, -Math.PI / 3.5]}>
          <mesh>
            <cylinderGeometry args={[0.015, 0.14, data.length, 8]} />
            <meshBasicMaterial
              color={data.color}
              transparent
              opacity={0.85}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export const NightSkyStars: React.FC = () => {
  const mainGroupRef = useRef<THREE.Group>(null);
  const starsPointsRef = useRef<THREE.Points>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollProgressRef = useRef(0);

  // Listen to window mouse movement globally so HTML overlays don't block mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      mousePos.current.targetX = x;
      mousePos.current.targetY = y;
    };

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, window.scrollY / (totalHeight || 1)));
      scrollProgressRef.current = progress;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Generate 2,500 rich twinkling night sky stars
  const [starPositions, starSizes, starColors] = useMemo(() => {
    const count = 2500;
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color('#ffffff'), // Pure White
      new THREE.Color('#80e5ff'), // Electric Cyan
      new THREE.Color('#cce6ff'), // Ice Blue
      new THREE.Color('#ffeaae'), // Warm Gold Star
      new THREE.Color('#d8b4fe'), // Deep Violet
    ];

    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      sizes[i] = 0.06 + Math.random() * 0.22;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return [pos, sizes, colors];
  }, []);

  // Frame loop: Fast smooth lerp for visible mouse-following star movement & scroll sway
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const p = scrollProgressRef.current;
    const scrollSway = Math.sin(p * Math.PI * 10) * 1.5;

    // Lerp mouse positions
    mousePos.current.x = THREE.MathUtils.lerp(mousePos.current.x, mousePos.current.targetX, 0.08);
    mousePos.current.y = THREE.MathUtils.lerp(mousePos.current.y, mousePos.current.targetY, 0.08);

    if (mainGroupRef.current) {
      // Move starfield position in 3D space according to mouse movement and scroll sway
      mainGroupRef.current.position.x = mousePos.current.x * 2.5 - scrollSway * 0.8;
      mainGroupRef.current.position.y = mousePos.current.y * 2.5;

      // Rotate starfield in direction of cursor movement and scroll card sway
      mainGroupRef.current.rotation.y = mousePos.current.x * 0.8 + time * 0.03 + scrollSway * 0.25;
      mainGroupRef.current.rotation.x = -mousePos.current.y * 0.8 + Math.sin(time * 0.02) * 0.05;
    }

    if (starsPointsRef.current) {
      // Counter rotation for dynamic parallax depth
      starsPointsRef.current.rotation.z = -mousePos.current.x * 0.4 + time * 0.015 - scrollSway * 0.15;
    }
  });

  return (
    <group ref={mainGroupRef}>
      {/* Outer Deep Space Stars */}
      <Stars
        radius={80}
        depth={60}
        count={5000}
        factor={6}
        saturation={0.8}
        fade
        speed={2}
      />

      {/* 3D Shooting Meteors / Comets */}
      <ShootingMeteors />

      {/* Mouse-following Foreground Twinkling Stars */}
      <points ref={starsPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[starColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

