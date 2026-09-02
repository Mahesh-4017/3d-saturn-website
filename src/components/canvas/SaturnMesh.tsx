import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface SaturnMeshProps {
  wireframe: boolean;
}

const PARTICLE_COUNT = 4500;

export const SaturnMesh: React.FC<SaturnMeshProps> = ({ wireframe }) => {
  const mainGroupRef = useRef<THREE.Group>(null);
  const solidGroupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  const planetMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const ringMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const pointsRef = useRef<THREE.Points>(null);
  const pointsMatRef = useRef<THREE.PointsMaterial>(null);

  const scrollProgressRef = useRef(0);

  // Track page scroll percentage (0 to 1)
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, window.scrollY / (totalHeight || 1)));
      scrollProgressRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 1. Procedural 2048x1024 Saturn Banded Cloud Atmosphere Texture
  const saturnAlbedoMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0.0, '#363d4a'); // North Polar Cap
    grad.addColorStop(0.12, '#a8946e');
    grad.addColorStop(0.25, '#d4bc8b');
    grad.addColorStop(0.38, '#e6d09e'); // Bright Ochre Belt
    grad.addColorStop(0.50, '#c7ab77'); // Equatorial Zone
    grad.addColorStop(0.62, '#e0c996');
    grad.addColorStop(0.75, '#b59c6d');
    grad.addColorStop(0.88, '#7a6b4a');
    grad.addColorStop(1.0, '#2e333d'); // South Polar Cap

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 2048, 1024);

    for (let y = 0; y < 1024; y += 2) {
      const noise = (Math.random() - 0.5) * 15;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(noise) / 100})`;
      ctx.fillRect(0, y, 2048, 2);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

  // 2. Procedural Saturn Ring System Texture
  const saturnRingMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createLinearGradient(0, 0, 1024, 0);
    grad.addColorStop(0.0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(0.1, 'rgba(80, 70, 50, 0.35)'); // C Ring
    grad.addColorStop(0.25, 'rgba(215, 190, 140, 0.95)'); // B Ring Inner
    grad.addColorStop(0.55, 'rgba(235, 210, 160, 0.9)'); // B Ring Outer
    grad.addColorStop(0.62, 'rgba(10, 10, 10, 0.05)'); // Cassini Division Gap
    grad.addColorStop(0.68, 'rgba(180, 155, 115, 0.85)'); // A Ring Inner
    grad.addColorStop(0.85, 'rgba(195, 170, 130, 0.8)'); // A Ring Outer
    grad.addColorStop(0.92, 'rgba(120, 100, 75, 0.3)'); // F Ring Fringe
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 64);

    for (let x = 0; x < 1024; x += 4) {
      if (Math.random() > 0.6) {
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.3})`;
        ctx.fillRect(x, 0, 2, 64);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

  // 3. Glowing Particle Point Texture (Saturn Solar Spark)
  const particleGlowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(254, 240, 138, 0.95)'); // Solar Cream
    grad.addColorStop(0.55, 'rgba(217, 119, 6, 0.5)');   // Warm Amber
    grad.addColorStop(0.80, 'rgba(168, 85, 247, 0.25)');  // Deep Purple Halo
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
  }, []);

  // 4. Compute Authentic Saturn, Star Constellation, and Crescent Moon Particle Morph Data
  const { saturnPositions, starPositions, moonPositions, initialPositions, explosionVelocities, particleColors } = useMemo(() => {
    const satPos = new Float32Array(PARTICLE_COUNT * 3);
    const starPos = new Float32Array(PARTICLE_COUNT * 3);
    const moonPos = new Float32Array(PARTICLE_COUNT * 3);
    const curPos = new Float32Array(PARTICLE_COUNT * 3);
    const expVel = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    const ringTiltMatrix = new THREE.Matrix4().makeRotationFromEuler(
      new THREE.Euler(Math.PI / 2.4, 0.2, -0.3)
    );

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let particleColor: THREE.Color;

      // --- A: SATURN POSITIONS & AUTHENTIC SATURN BAND/RING COLORS ---
      if (i < PARTICLE_COUNT * 0.6) {
        // Sphere Surface
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const radius = 1.4 + (Math.random() - 0.5) * 0.06;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        satPos[i * 3] = x;
        satPos[i * 3 + 1] = y;
        satPos[i * 3 + 2] = z;

        // Assign Saturn Atmospheric Band Colors based on Y height
        const normY = y / 1.4; // -1.0 to +1.0
        if (normY > 0.75) {
          particleColor = new THREE.Color('#64748b'); // Polar Slate
        } else if (normY > 0.4) {
          particleColor = new THREE.Color('#d4bc8b'); // Sandy Ochre
        } else if (normY > 0.1) {
          particleColor = new THREE.Color('#fef08a'); // Bright Solar Yellow Belt
        } else if (normY > -0.2) {
          particleColor = new THREE.Color('#c7ab77'); // Equatorial Zone
        } else if (normY > -0.6) {
          particleColor = new THREE.Color('#b59c6d'); // Warm Ochre
        } else {
          particleColor = new THREE.Color('#475569'); // South Polar Cap
        }

        // Add explosion velocity outwards from sphere center
        const dir = new THREE.Vector3(x, y, z).normalize();
        expVel[i * 3] = dir.x * (1.2 + Math.random() * 2.0);
        expVel[i * 3 + 1] = dir.y * (1.2 + Math.random() * 2.0);
        expVel[i * 3 + 2] = dir.z * (1.2 + Math.random() * 2.0);
      } else {
        // Saturn Rings
        const angle = Math.random() * Math.PI * 2;
        const r = 1.75 + Math.sqrt(Math.random()) * (3.6 - 1.75);
        const vec = new THREE.Vector3(
          r * Math.cos(angle),
          (Math.random() - 0.5) * 0.06,
          r * Math.sin(angle)
        );
        vec.applyMatrix4(ringTiltMatrix);

        satPos[i * 3] = vec.x;
        satPos[i * 3 + 1] = vec.y;
        satPos[i * 3 + 2] = vec.z;

        // Ring Colors based on radius r
        if (r < 2.1) {
          particleColor = new THREE.Color('#a3e635'); // Inner Ring Light Lime Accent
        } else if (r < 2.8) {
          particleColor = new THREE.Color('#fef08a'); // Bright B-Ring Golden Cream
        } else if (r < 2.95) {
          particleColor = new THREE.Color('#78350f'); // Cassini Division Dark Bronze
        } else if (r < 3.45) {
          particleColor = new THREE.Color('#f59e0b'); // A-Ring Amber Gold
        } else {
          particleColor = new THREE.Color('#c084fc'); // Outer Ring Celestial Purple Fringe
        }

        const ringDir = vec.clone().normalize();
        expVel[i * 3] = ringDir.x * (1.5 + Math.random() * 2.5);
        expVel[i * 3 + 1] = ringDir.y * (1.5 + Math.random() * 2.5);
        expVel[i * 3 + 2] = ringDir.z * (1.5 + Math.random() * 2.5);
      }

      // Mix 25% purple/lavender/white highlight into Saturn colors for cosmic brilliance
      if (Math.random() < 0.25) {
        const cosmicAccents = [
          new THREE.Color('#c084fc'),
          new THREE.Color('#e9d5ff'),
          new THREE.Color('#ffffff'),
          new THREE.Color('#fde047'),
        ];
        particleColor = cosmicAccents[Math.floor(Math.random() * cosmicAccents.length)];
      }

      // --- B: 4-POINTED SPARK STAR CONSTELLATION POSITIONS ---
      const randType = Math.random();
      if (randType < 0.38) {
        // Vertical Arm (y from -3.4 to 3.4)
        const y = (Math.random() - 0.5) * 6.8;
        const normY = Math.abs(y) / 3.4;
        const width = Math.max(0.04, Math.pow(1.0 - normY, 0.85)) * 1.6;

        starPos[i * 3] = (Math.random() - 0.5) * width;
        starPos[i * 3 + 1] = y;
        starPos[i * 3 + 2] = (Math.random() - 0.5) * width * 0.5;
      } else if (randType < 0.76) {
        // Horizontal Arm (x from -4.0 to 4.0)
        const x = (Math.random() - 0.5) * 8.0;
        const normX = Math.abs(x) / 4.0;
        const height = Math.max(0.04, Math.pow(1.0 - normX, 0.85)) * 1.6;

        starPos[i * 3] = x;
        starPos[i * 3 + 1] = (Math.random() - 0.5) * height;
        starPos[i * 3 + 2] = (Math.random() - 0.5) * height * 0.5;
      } else if (randType < 0.92) {
        // Core Spark Cluster
        const rad = Math.pow(Math.random(), 1.8) * 1.3;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(Math.random() * 2 - 1);

        starPos[i * 3] = rad * Math.sin(ph) * Math.cos(th);
        starPos[i * 3 + 1] = rad * Math.cos(ph);
        starPos[i * 3 + 2] = rad * Math.sin(ph) * Math.sin(th);
      } else {
        // Outer Sparkle Atmosphere
        starPos[i * 3] = (Math.random() - 0.5) * 9.0;
        starPos[i * 3 + 1] = (Math.random() - 0.5) * 8.0;
        starPos[i * 3 + 2] = (Math.random() - 0.5) * 4.0;
      }

      // --- C: 3D CRESCENT MOON / CELESTIAL STAR MORPH POSITIONS ---
      const uMoon = Math.random();
      const vMoon = Math.random();
      const thMoon = uMoon * Math.PI * 1.6 - Math.PI * 0.8;
      const phMoon = Math.acos(2.0 * vMoon - 1.0);
      const rMoon = 2.4 + (Math.random() - 0.5) * 0.15;

      let mx = rMoon * Math.sin(phMoon) * Math.cos(thMoon);
      let my = rMoon * Math.cos(phMoon);
      let mz = rMoon * Math.sin(phMoon) * Math.sin(thMoon);

      if (mx > 0.3) {
        mx -= 1.1; // Carve out crescent curve
      }

      moonPos[i * 3] = mx;
      moonPos[i * 3 + 1] = my;
      moonPos[i * 3 + 2] = mz;

      // Initial positions set EXACTLY to Saturn shape
      curPos[i * 3] = satPos[i * 3];
      curPos[i * 3 + 1] = satPos[i * 3 + 1];
      curPos[i * 3 + 2] = satPos[i * 3 + 2];

      col[i * 3] = particleColor.r;
      col[i * 3 + 1] = particleColor.g;
      col[i * 3 + 2] = particleColor.b;
    }

    return {
      saturnPositions: satPos,
      starPositions: starPos,
      moonPositions: moonPos,
      initialPositions: curPos,
      explosionVelocities: expVel,
      particleColors: col,
    };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const mouseX = (state.pointer.x * Math.PI) / 6;
    const mouseY = (state.pointer.y * Math.PI) / 6;
    const p = scrollProgressRef.current;

    // Calculate Moon Morph & Particle Shatter trajectory during blank transition after Work Section
    let tMoon = 0;
    if (p > 0.46 && p < 0.64) {
      const normMoon = (p - 0.46) / 0.18;
      tMoon = Math.sin(normMoon * Math.PI); // Peaks at 1.0 in transition space between Work & Services
    }

    const isMobile = window.innerWidth < 768;
    const mobileScale = isMobile ? 0.65 : 1.0;

    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetScale = 2.8 * mobileScale;

    let rawT = 0;
    if (p > 0.10) {
      rawT = Math.min(1.0, (p - 0.10) / 0.30);
    }
    const tMorph = rawT * rawT * (3.0 - 2.0 * rawT);

    if (p <= 0.10) {
      targetX = 0;
      targetY = isMobile ? -2.2 : -3.4;
      targetZ = 0;
      targetScale = 2.8 * mobileScale;
    } else if (p <= 0.40) {
      const norm = (p - 0.10) / 0.30;
      targetX = THREE.MathUtils.lerp(0, 0, norm);
      targetY = THREE.MathUtils.lerp(isMobile ? -2.2 : -3.4, 0.1, norm);
      targetZ = THREE.MathUtils.lerp(0, -3.8, norm);
      targetScale = THREE.MathUtils.lerp(2.8 * mobileScale, 0.95 * mobileScale, norm);
    } else {
      const norm = (p - 0.40) / 0.60;
      const sideSway = Math.sin(p * Math.PI * 10) * (isMobile ? 0.6 : 1.8);

      targetX = sideSway;
      targetY = THREE.MathUtils.lerp(0.1, -0.3, norm);
      targetZ = THREE.MathUtils.lerp(-3.8, -2.8, norm);
      targetScale = THREE.MathUtils.lerp(0.95 * mobileScale, 1.15 * mobileScale, norm);
    }

    if (mainGroupRef.current) {
      mainGroupRef.current.position.x = THREE.MathUtils.lerp(mainGroupRef.current.position.x, targetX, 0.08);
      mainGroupRef.current.position.y = THREE.MathUtils.lerp(mainGroupRef.current.position.y, targetY, 0.08);
      mainGroupRef.current.position.z = THREE.MathUtils.lerp(mainGroupRef.current.position.z, targetZ, 0.08);
      mainGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(mainGroupRef.current.scale.x, targetScale, 0.08));
    }

    // --- 1. SOLID SATURN MESH DISSOLVE & ROTATION ---
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * (0.25 + tMorph * 3.5);
      planetRef.current.rotation.x = THREE.MathUtils.lerp(
        planetRef.current.rotation.x,
        mouseY * 0.4 + Math.sin(time * 0.01) * 0.03,
        0.05
      );
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * (0.05 + tMorph * 2.0);
    }

    const solidOpacity = Math.max(0, 1.0 - tMorph * 1.3);
    if (planetMatRef.current) {
      planetMatRef.current.opacity = solidOpacity;
    }
    if (ringMatRef.current) {
      ringMatRef.current.opacity = (wireframe ? 0.4 : 0.92) * solidOpacity;
    }

    if (solidGroupRef.current) {
      solidGroupRef.current.visible = solidOpacity > 0.005;
    }

    // --- 2. SATURN -> STAR CONSTELLATION -> MOON MORPH & PARTICLE DISINTEGRATION ---
    if (pointsRef.current) {
      const geo = pointsRef.current.geometry;
      const posAttr = geo.attributes.position;
      if (posAttr) {
        const posArray = posAttr.array as Float32Array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const idx = i * 3;

          const satX = saturnPositions[idx];
          const satY = saturnPositions[idx + 1];
          const satZ = saturnPositions[idx + 2];

          const starX = starPositions[idx];
          const starY = starPositions[idx + 1];
          const starZ = starPositions[idx + 2];

          const mX = moonPositions[idx];
          const mY = moonPositions[idx + 1];
          const mZ = moonPositions[idx + 2];

          const vx = explosionVelocities[idx];
          const vy = explosionVelocities[idx + 1];
          const vz = explosionVelocities[idx + 2];

          // Explosion arc offset
          const arc = Math.sin(tMorph * Math.PI) * 0.8;

          const waveX = Math.sin(time * 1.5 + i * 0.04) * 0.04 * tMorph;
          const waveY = Math.cos(time * 1.3 + i * 0.06) * 0.04 * tMorph;
          const waveZ = Math.sin(time * 1.1 + i * 0.02) * 0.04 * tMorph;

          // Trajectory: Saturn Surface -> Star Constellation -> Crescent Moon Morph -> Explosive Shatter into Stars
          let basePos = new THREE.Vector3(
            THREE.MathUtils.lerp(satX, starX, tMorph) + vx * arc * 0.3 + waveX,
            THREE.MathUtils.lerp(satY, starY, tMorph) + vy * arc * 0.3 + waveY,
            THREE.MathUtils.lerp(satZ, starZ, tMorph) + vz * arc * 0.3 + waveZ
          );

          // Morph to Crescent Moon shape in pre-FAQ transition section
          if (tMoon > 0.001) {
            basePos.x = THREE.MathUtils.lerp(basePos.x, mX, tMoon) + vx * tMoon * 0.5;
            basePos.y = THREE.MathUtils.lerp(basePos.y, mY, tMoon) + vy * tMoon * 0.5;
            basePos.z = THREE.MathUtils.lerp(basePos.z, mZ, tMoon) + vz * tMoon * 0.5;
          }

          posArray[idx] = basePos.x;
          posArray[idx + 1] = basePos.y;
          posArray[idx + 2] = basePos.z;
        }

        posAttr.needsUpdate = true;
      }

      // Dynamic scroll rotation
      const scrollRotY = Math.sin(p * Math.PI * 8) * 0.6;
      pointsRef.current.rotation.y = time * 0.08 + mouseX * 0.4 + scrollRotY + tMoon * 1.5;
      pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.05 + mouseY * 0.3;
      pointsRef.current.rotation.z = time * 0.03;
    }

    // --- PARTICLES VISIBILITY & FADE IN / FADE OUT ---
    // Particles fade in after Hero section, and fade out near bottom (FAQ & Footer) so only backend stars remain
    if (pointsMatRef.current) {
      let particleOpacity = Math.min(1.0, Math.max(0, (tMorph - 0.05) * 1.25));
      if (p > 0.80) {
        const fadeOut = Math.max(0, 1.0 - (p - 0.80) / 0.12);
        particleOpacity *= fadeOut;
      }
      pointsMatRef.current.opacity = particleOpacity;
      if (pointsRef.current) {
        pointsRef.current.visible = particleOpacity > 0.001;
      }
    }
  });

  return (
    <group ref={mainGroupRef} position={[0, -3.4, 0]} scale={[2.8, 2.8, 2.8]}>
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* SOLID 3D SATURN MESH GROUP */}
        <group ref={solidGroupRef}>
          {/* Saturn Planet Body */}
          <mesh ref={planetRef} position={[0, 0, 0]} rotation={[0.3, 0, 0.2]}>
            <sphereGeometry args={[1.4, 64, 64]} />
            <meshStandardMaterial
              ref={planetMatRef}
              map={saturnAlbedoMap}
              roughness={0.7}
              metalness={0.1}
              transparent
              opacity={1}
              wireframe={wireframe}
            />
          </mesh>

          {/* Tilted Saturn Ring System */}
          <mesh
            ref={ringsRef}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2.4, 0.2, -0.3]}
          >
            <ringGeometry args={[1.75, 3.6, 128]} />
            <meshStandardMaterial
              ref={ringMatRef}
              map={saturnRingMap}
              transparent
              opacity={wireframe ? 0.4 : 0.92}
              roughness={0.4}
              metalness={0.2}
              side={THREE.DoubleSide}
              wireframe={wireframe}
            />
          </mesh>
        </group>

        {/* SATURN SHATTERING & STAR RE-ASSEMBLY PARTICLE SYSTEM */}
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[initialPositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[particleColors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            ref={pointsMatRef}
            size={0.18}
            map={particleGlowTexture}
            vertexColors
            transparent
            opacity={0.65}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </Float>
    </group>
  );
};


