import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import Butterfly from './Butterfly';

// ── Shared glow texture for particles ──
function createGlowTexture() {
    const c = document.createElement('canvas');
    c.width = 64; c.height = 64;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.15, 'rgba(255,255,255,0.85)');
    g.addColorStop(0.4, 'rgba(255,255,255,0.25)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
}

const glowTexture = createGlowTexture();

// ═══════════════════════════════════════════════════
//  ☀️  DAYTIME FLOATING PARTICLES  — Golden Bokeh
// ═══════════════════════════════════════════════════
function FloatingBokeh({ count = 120 }) {
    const pointsRef = useRef();

    const [positions, offsets, sizes] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const off = new Float32Array(count * 3); // phase, speed, radius
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;

            off[i * 3] = Math.random() * 100;       // phase
            off[i * 3 + 1] = 0.015 + Math.random() * 0.04; // rise speed
            off[i * 3 + 2] = 1 + Math.random() * 3;     // drift radius

            // Varied sizes — a few big foreground bokeh balls
            sizes[i] = Math.random() < 0.08
                ? 0.15 + Math.random() * 0.2
                : 0.03 + Math.random() * 0.08;
        }
        return [pos, off, sizes];
    }, [count]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const t = state.clock.getElapsedTime();
        const posArr = pointsRef.current.geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const phase = offsets[i3];
            const speed = offsets[i3 + 1];
            const radius = offsets[i3 + 2];

            // Gentle upward float with soft drift
            posArr[i3] += Math.sin(t * 0.3 + phase) * 0.003 * radius;
            posArr[i3 + 1] += speed;
            posArr[i3 + 2] += Math.cos(t * 0.2 + phase) * 0.002 * radius;

            // Loop when they float too high
            if (posArr[i3 + 1] > 12) {
                posArr[i3 + 1] = -12;
                posArr[i3] = (Math.random() - 0.5) * 30;
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Subtle mouse parallax
        pointsRef.current.rotation.x = state.mouse.y * -0.015;
        pointsRef.current.rotation.y = state.mouse.x * 0.015;
    });

    return (
        <Points ref={pointsRef} positions={positions} frustumCulled={false}>
            <bufferGeometry attach="geometry">
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
                <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
            </bufferGeometry>
            <PointMaterial
                transparent
                color="#f59e0b"
                size={0.3}
                sizeAttenuation
                depthWrite={false}
                map={glowTexture}
                alphaMap={glowTexture}
                blending={THREE.AdditiveBlending}
                opacity={0.6}
            />
        </Points>
    );
}

// ── Cherry Blossom Petals (3D meshes, not point sprites) ──
function FallingPetals({ count = 35 }) {
    const petalsRef = useRef([]);

    const petalData = useMemo(() => {
        const data = [];
        for (let i = 0; i < count; i++) {
            data.push({
                x: (Math.random() - 0.5) * 25,
                y: Math.random() * 20 - 5,
                z: (Math.random() - 0.5) * 12 - 3,
                rotSpeed: 0.5 + Math.random() * 2,
                fallSpeed: 0.2 + Math.random() * 0.5,
                driftAmp: 1 + Math.random() * 3,
                phase: Math.random() * Math.PI * 2,
                scale: 0.06 + Math.random() * 0.10,
                color: ['#ffc0cb', '#ffb7c5', '#ff9fb2', '#ffd1dc', '#ffe4e9'][Math.floor(Math.random() * 5)]
            });
        }
        return data;
    }, [count]);

    const petalGeo = useMemo(() => {
        // Petal shape — an elliptical leaf
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0.3, 0.5, 0.3, 1.2, 0, 1.5);
        shape.bezierCurveTo(-0.3, 1.2, -0.3, 0.5, 0, 0);
        const geo = new THREE.ShapeGeometry(shape, 8);
        // Slight 3D curl
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const y = pos.getY(i);
            pos.setZ(i, Math.sin(y * 1.5) * 0.15);
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();
        return geo;
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        petalsRef.current.forEach((ref, i) => {
            if (!ref) return;
            const d = petalData[i];

            // Gentle falling + swaying
            d.y -= d.fallSpeed * 0.016;
            if (d.y < -12) {
                d.y = 12;
                d.x = (Math.random() - 0.5) * 25;
            }

            const sway = Math.sin(t * 0.5 + d.phase) * d.driftAmp * 0.01;

            ref.position.set(
                d.x + sway * 3,
                d.y,
                d.z + Math.cos(t * 0.3 + d.phase) * 0.5
            );

            // Tumbling rotation
            ref.rotation.x = t * d.rotSpeed * 0.3 + d.phase;
            ref.rotation.y = t * d.rotSpeed * 0.5;
            ref.rotation.z = Math.sin(t * 0.7 + d.phase) * 0.5;
        });
    });

    return (
        <>
            {petalData.map((d, i) => (
                <mesh
                    key={i}
                    ref={(el) => (petalsRef.current[i] = el)}
                    geometry={petalGeo}
                    scale={d.scale}
                    position={[d.x, d.y, d.z]}
                >
                    <meshStandardMaterial
                        color={d.color}
                        emissive={d.color}
                        emissiveIntensity={0.3}
                        side={THREE.DoubleSide}
                        transparent
                        opacity={0.85}
                        roughness={0.6}
                    />
                </mesh>
            ))}
        </>
    );
}

// ═══════════════════════════════════════════════════
//  🎬  MAIN SCENE — Conditional rendering by theme
// ═══════════════════════════════════════════════════
function Scene() {
    const { isDark } = useTheme();
    const { pointer } = useThree();

    if (isDark) {
        // ── NIGHT MODE: Realistic butterflies with glitter ──
        return (
            <>
                <ambientLight intensity={1.2} />
                <directionalLight position={[8, 15, 10]} intensity={3.0} color="#ffffff" />
                <directionalLight position={[-8, -5, -5]} intensity={0.8} color="#6677ff" />
                <directionalLight position={[0, 5, -10]} intensity={0.6} color="#ff8844" />

                <Butterfly color="#3399ff" scale={0.7} startPos={[-1.5, 0, 2]} roamSpeed={0.5} flapSpeed={11} mousePointer={pointer} />
                <Butterfly color="#8855ff" scale={0.5} startPos={[3, 1.5, 0]} roamSpeed={0.4} flapSpeed={13} mousePointer={pointer} />
                <Butterfly color="#44ccff" scale={0.35} startPos={[-3, -2, -2]} roamSpeed={0.6} flapSpeed={15} mousePointer={pointer} />
                <Butterfly color="#3399ff" scale={0.45} startPos={[1, -1, -1]} roamSpeed={0.35} flapSpeed={12} mousePointer={pointer} />
            </>
        );
    }

    // ── DAY MODE: Golden bokeh + cherry blossom petals ──
    return (
        <>
            <ambientLight intensity={2.0} />
            <directionalLight position={[10, 15, 8]} intensity={1.5} color="#fff5e0" />
            <directionalLight position={[-5, 10, -5]} intensity={0.5} color="#ffd4a8" />

            <FloatingBokeh count={100} />
            <FallingPetals count={30} />
        </>
    );
}

export default function ThreeBackground() {
    return (
        <div
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0, background: 'transparent' }}
        >
            <Canvas
                camera={{ position: [0, 0, 6], fov: 75 }}
                style={{ background: 'transparent' }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
