import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Glitter Config ──
const GLITTER_COUNT = 60;

// Shared sparkle texture (soft radial glow dot)
const sparkleTexture = (() => {
    const c = document.createElement('canvas');
    c.width = 32; c.height = 32;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.2, 'rgba(255,255,255,0.8)');
    g.addColorStop(0.5, 'rgba(255,255,255,0.15)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(c);
})();

// ── Create a realistic butterfly wing shape (not a rectangle) ──
function createWingGeometry() {
    // Define wing outline as a 2D shape — based on real Blue Morpho silhouette
    const shape = new THREE.Shape();

    // Wing root at origin (0,0), extending right and up
    shape.moveTo(0, 0);

    // Forewing upper edge — sweeping curve upward
    shape.bezierCurveTo(0.3, 0.6, 0.8, 1.5, 1.4, 1.8);
    // Wing tip — rounded peak
    shape.bezierCurveTo(1.7, 1.9, 2.0, 1.7, 2.1, 1.4);
    // Outer trailing edge with scalloped effect
    shape.bezierCurveTo(2.0, 1.0, 1.9, 0.6, 1.8, 0.3);
    // Hindwing lobe
    shape.bezierCurveTo(1.7, 0.0, 1.5, -0.3, 1.2, -0.5);
    // Hindwing scalloped bottom edge
    shape.bezierCurveTo(0.9, -0.6, 0.6, -0.5, 0.4, -0.3);
    // Return to wing root
    shape.bezierCurveTo(0.2, -0.15, 0.05, -0.05, 0, 0);

    const geo = new THREE.ShapeGeometry(shape, 24);

    // Add 3D curvature — wings aren't flat!
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        // Gentle upward curve at the tips
        const distFromRoot = Math.sqrt(x * x + y * y);
        const curve = distFromRoot * distFromRoot * 0.06;
        pos.setZ(i, curve);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();

    // Generate UV coordinates based on bounding box for texture mapping
    geo.computeBoundingBox();
    const bb = geo.boundingBox;
    const uvs = geo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        uvs.setXY(
            i,
            (x - bb.min.x) / (bb.max.x - bb.min.x),
            (y - bb.min.y) / (bb.max.y - bb.min.y)
        );
    }
    uvs.needsUpdate = true;

    return geo;
}

export default function Butterfly({
    color = '#4488ff',
    scale = 1,
    startPos = [0, 0, 0],
    roamSpeed = 1,
    flapSpeed = 12,
    mousePointer = null
}) {
    const groupRef = useRef();
    const leftWingRef = useRef();
    const rightWingRef = useRef();
    const glitterRef = useRef();
    const timeRef = useRef(Math.random() * 100);

    // ── Glitter particle pool ──
    const glitterState = useMemo(() => {
        const positions = new Float32Array(GLITTER_COUNT * 3);
        const velocities = new Float32Array(GLITTER_COUNT * 3);
        const lifetimes = new Float32Array(GLITTER_COUNT);
        const maxLife = new Float32Array(GLITTER_COUNT);
        const sizes = new Float32Array(GLITTER_COUNT);
        for (let i = 0; i < GLITTER_COUNT; i++) {
            lifetimes[i] = 0;
            positions[i * 3 + 1] = -999;
        }
        return { positions, velocities, lifetimes, maxLife, sizes, nextSpawn: 0 };
    }, []);

    const glitterSizes = useMemo(() => new Float32Array(GLITTER_COUNT), []);

    // ── Wing texture with transparency ──
    const wingTexture = useMemo(() => {
        const texture = new THREE.Texture();
        texture.colorSpace = THREE.SRGBColorSpace;
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = '/butterfly_wing.png';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i], g = data[i + 1], b = data[i + 2];
                const lum = 0.299 * r + 0.587 * g + 0.114 * b;
                if (lum < 10) {
                    data[i + 3] = 0;
                } else if (lum < 35) {
                    data[i + 3] = Math.floor((lum - 10) * 10.2);
                }
                // Boost saturation on blues to keep the vivid morpho color
                if (b > r * 1.3 && b > g * 1.2) {
                    data[i] = Math.min(255, Math.floor(r * 0.7));       // Reduce red
                    data[i + 1] = Math.min(255, Math.floor(g * 0.85));  // Slightly reduce green
                    data[i + 2] = Math.min(255, Math.floor(b * 1.15));  // Boost blue
                }
            }
            ctx.putImageData(imageData, 0, 0);
            texture.image = canvas;
            texture.needsUpdate = true;
        };
        return texture;
    }, []);

    const randomPhase = useMemo(() => Math.random() * Math.PI * 2, []);

    // ── Geometries ──
    const wingGeoBase = useMemo(() => createWingGeometry(), []); // Keep original geo
    const wingGeoLeft = useMemo(() => wingGeoBase.clone(), [wingGeoBase]);
    const wingGeoRight = useMemo(() => wingGeoBase.clone(), [wingGeoBase]);

    // Create legs (brush-footed butterflies typically show 4 legs when resting, tuck them when flying)
    const legGeo = useMemo(() => {
        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0.04, -0.05, 0),
            new THREE.Vector3(0.02, -0.15, 0.02)
        );
        return new THREE.TubeGeometry(curve, 4, 0.003, 4, false);
    }, []);

    const bodyGeo = useMemo(() => new THREE.CapsuleGeometry(0.06, 0.8, 6, 6), []);

    // Avoidance state
    const velocityExt = useRef(new THREE.Vector3(0, 0, 0));

    // ── Flight parameters ──
    const flightRadiusX = 4;
    const flightRadiusY = 2.5;
    const flightRadiusZ = 2.5;

    // Random pause/gliding behavior
    const pausePattern = useMemo(() => ({
        pauseAt: 3 + Math.random() * 5,    // When to pause (seconds into cycle)
        pauseDuration: 0.3 + Math.random() * 0.5,
        glideFactor: 0.3 + Math.random() * 0.4
    }), []);

    useFrame((state, delta) => {
        const safeDelta = Math.min(delta, 0.1);
        timeRef.current += safeDelta;
        const t = timeRef.current;

        // ── 1. ORGANIC FLAPPING & WING BENDING ──
        // Real butterflies: fast forceful downstroke, slow lazy upstroke, occasional glides
        const cyclePos = (t * flapSpeed + randomPhase) % (Math.PI * 2);
        const inPauseCycle = (t % (pausePattern.pauseAt + pausePattern.pauseDuration)) > pausePattern.pauseAt;

        let flapAngle;
        let flexAmount = 0; // Negative bends tips down, positive bends tips up

        if (inPauseCycle) {
            // Brief gliding moment — wings held slightly open
            flapAngle = pausePattern.glideFactor;
            flexAmount = 0.05; // Gentle upward flex while gliding
        } else {
            // Asymmetric flap: sharp downstroke, gentle upstroke
            const rawFlap = Math.sin(cyclePos);
            const sharpness = 0.35 * Math.sin(2 * cyclePos); // Adds asymmetry
            flapAngle = (rawFlap + sharpness) * 0.9;

            // Flexing: tips lag behind root due to air resistance
            // When angle goes down rapidly (downstroke), tips bend UP
            // When angle goes up (upstroke), tips bend DOWN
            const flapVelocity = Math.cos(cyclePos) + 0.7 * Math.cos(2 * cyclePos);
            flexAmount = flapVelocity * -0.25;
        }

        // Apply vertex bending to wing tips
        if (leftWingRef.current && rightWingRef.current) {
            leftWingRef.current.rotation.y = flapAngle;
            rightWingRef.current.rotation.y = -flapAngle;

            // Update wings geometry vertices for dynamic flex
            for (let w = 0; w < 2; w++) {
                const geo = w === 0 ? wingGeoLeft : wingGeoRight;
                const pos = geo.attributes.position;
                const basePos = wingGeoBase.attributes.position;

                for (let i = 0; i < pos.count; i++) {
                    const bx = basePos.getX(i);
                    const by = basePos.getY(i);
                    const bz = basePos.getZ(i);

                    // Flex is stronger further from root (x=0) and near wing tip (x=2, y=1.5)
                    const distFromRoot = Math.max(0, bx - 0.2);
                    const flexZ = distFromRoot * distFromRoot * flexAmount;

                    pos.setZ(i, bz + flexZ);
                }
                pos.needsUpdate = true;
                geo.computeVertexNormals(); // Recalculate normals for correct lighting on bent wing
            }
        }

        // ── 2. NATURAL FLIGHT PATH ──
        if (groupRef.current) {
            // Multi-layered Lissajous figure for organic, non-repeating paths
            const baseX = Math.sin(t * 0.25 * roamSpeed + randomPhase) * flightRadiusX
                + Math.sin(t * 0.11 * roamSpeed) * 1.5;
            const baseY = Math.cos(t * 0.35 * roamSpeed + randomPhase) * flightRadiusY
                + Math.sin(t * 0.17 * roamSpeed + 1) * 0.8;
            const baseZ = Math.sin(t * 0.18 * roamSpeed + randomPhase * 0.5) * flightRadiusZ;

            // Lift on downstroke — butterfly bobs up when wings push down
            const flapCycleVal = Math.sin(cyclePos);
            const lift = Math.max(0, -flapCycleVal) * 0.25;

            // Micro-jitter — chaotic darting that real butterflies do
            const jX = Math.sin(t * 13.7) * 0.03 + Math.sin(t * 23.1) * 0.02;
            const jY = Math.sin(t * 19.3) * 0.03 + lift;
            const jZ = Math.cos(t * 16.9) * 0.02;

            // ── AVOIDANCE SYSTEM ──
            // If mouse pointer is close to butterfly, add a darting vector
            if (mousePointer && state.camera) {
                // Approximate unprojection from normalized device coords to world space at z=0 plane
                const mouseWorld = new THREE.Vector3(mousePointer.x * 6, mousePointer.y * 4, 0);
                const distToMouse = groupRef.current.position.distanceTo(mouseWorld);

                if (distToMouse < 2.5) {
                    // Dart away from mouse
                    const escapeDir = new THREE.Vector3().subVectors(groupRef.current.position, mouseWorld).normalize();
                    // Stronger push the closer it is
                    const force = (2.5 - distToMouse) * 0.5;
                    velocityExt.current.add(escapeDir.multiplyScalar(force * safeDelta * 20));
                }
            }

            // Dampen avoidance velocity back to zero over time
            velocityExt.current.multiplyScalar(0.92);

            const finalX = startPos[0] + baseX + jX + velocityExt.current.x;
            const finalY = startPos[1] + baseY + jY + velocityExt.current.y;
            const finalZ = startPos[2] + baseZ + jZ + velocityExt.current.z;

            groupRef.current.position.set(finalX, finalY, finalZ);

            // ── Face forward along trajectory ──
            const dx = Math.cos(t * 0.25 * roamSpeed + randomPhase) * flightRadiusX * 0.25 * roamSpeed
                + Math.cos(t * 0.11 * roamSpeed) * 1.5 * 0.11 * roamSpeed + velocityExt.current.x;
            const dy = -Math.sin(t * 0.35 * roamSpeed + randomPhase) * flightRadiusY * 0.35 * roamSpeed + velocityExt.current.y;
            const dz = Math.cos(t * 0.18 * roamSpeed + randomPhase * 0.5) * flightRadiusZ * 0.18 * roamSpeed + velocityExt.current.z;

            const lookTarget = new THREE.Vector3(
                finalX + dx, finalY + dy, finalZ + dz
            );

            groupRef.current.lookAt(lookTarget);
            groupRef.current.rotateY(Math.PI / 2);
            groupRef.current.rotateX(Math.PI / 2);

            // Banking into turns
            const bankAngle = dx * 0.4;
            groupRef.current.rotateZ(-Math.PI / 8 - bankAngle);

            // ── 3. GLITTER from wing tips ──
            if (glitterRef.current) {
                const posAttr = glitterRef.current.geometry.attributes.position;
                const sizeAttr = glitterRef.current.geometry.attributes.size;
                const posArr = posAttr.array;
                const sizeArr = sizeAttr.array;
                const { velocities, lifetimes, maxLife, sizes } = glitterState;

                // Spawn more during downstrokes
                const spawns = flapCycleVal < -0.3 ? 2 : (Math.random() < 0.3 ? 1 : 0);

                for (let s = 0; s < spawns; s++) {
                    let idx = -1;
                    for (let i = 0; i < GLITTER_COUNT; i++) {
                        const ci = (glitterState.nextSpawn + i) % GLITTER_COUNT;
                        if (lifetimes[ci] <= 0) { idx = ci; glitterState.nextSpawn = (ci + 1) % GLITTER_COUNT; break; }
                    }
                    if (idx >= 0) {
                        const wo = (Math.random() - 0.5) * 1.5 * scale;
                        posArr[idx * 3] = finalX + wo;
                        posArr[idx * 3 + 1] = finalY - 0.1 + (Math.random() - 0.5) * 0.5 * scale;
                        posArr[idx * 3 + 2] = finalZ + (Math.random() - 0.5) * 0.4;

                        velocities[idx * 3] = (Math.random() - 0.5) * 0.15;
                        velocities[idx * 3 + 1] = -(0.2 + Math.random() * 0.5);
                        velocities[idx * 3 + 2] = (Math.random() - 0.5) * 0.15;

                        maxLife[idx] = 1.2 + Math.random() * 1.8;
                        lifetimes[idx] = maxLife[idx];
                        sizes[idx] = 0.02 + Math.random() * 0.04;
                    }
                }

                for (let i = 0; i < GLITTER_COUNT; i++) {
                    if (lifetimes[i] > 0) {
                        lifetimes[i] -= safeDelta;
                        posArr[i * 3] += velocities[i * 3] * safeDelta;
                        posArr[i * 3 + 1] += velocities[i * 3 + 1] * safeDelta;
                        posArr[i * 3 + 2] += velocities[i * 3 + 2] * safeDelta;
                        posArr[i * 3] += Math.sin(t * 4 + i * 0.7) * 0.001;
                        velocities[i * 3] *= 0.99;
                        velocities[i * 3 + 1] *= 0.997;
                        velocities[i * 3 + 2] *= 0.99;
                        const lr = Math.max(0, lifetimes[i] / maxLife[i]);
                        // Twinkle effect — slight size pulsing
                        const twinkle = 0.7 + 0.3 * Math.sin(t * 20 + i * 3);
                        sizeArr[i] = sizes[i] * lr * twinkle;
                    } else {
                        sizeArr[i] = 0;
                        posArr[i * 3 + 1] = -999;
                    }
                }
                posAttr.needsUpdate = true;
                sizeAttr.needsUpdate = true;
            }
        }
    });

    // ── True Iridescent Wing Material ──
    const wingMatProps = {
        map: wingTexture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: true,
        alphaTest: 0.05,
        clearcoat: 0.1,             // Adds a reflective clear layer like chitin
        clearcoatRoughness: 0.2,
        iridescence: 1.0,           // Maximum iridescence
        iridescenceIOR: 1.3,        // Angle of incidence shift
        iridescenceThicknessRange: [100, 400], // Defines the color shift band
        roughness: 0.3,
        metalness: 0.2,
    };

    return (
        <>
            <group ref={groupRef} scale={scale} dispose={null}>
                {/* ── Body ── */}
                <mesh geometry={bodyGeo} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial
                        color="#0a0a12"
                        emissive="#112244"
                        emissiveIntensity={0.15}
                        roughness={0.9}
                        metalness={0.05}
                    />
                </mesh>

                {/* ── Antennae ── */}
                {[-1, 1].map((side) => (
                    <group key={side} position={[side * 0.04, 0.42, 0]} rotation={[0.3, side * 0.4, 0]}>
                        <mesh>
                            <cylinderGeometry args={[0.008, 0.004, 0.5, 4]} />
                            <meshStandardMaterial color="#111122" roughness={0.8} />
                        </mesh>
                        {/* Antenna tip club */}
                        <mesh position={[0, 0.27, 0]}>
                            <sphereGeometry args={[0.015, 6, 6]} />
                            <meshStandardMaterial color="#111122" roughness={0.7} />
                        </mesh>
                    </group>
                ))}

                {/* ── Legs (tucked under thorax) ── */}
                {[-1, 1].map((side) => (
                    <group key={`legs-${side}`}>
                        {/* Front leg */}
                        <mesh geometry={legGeo} position={[side * 0.04, 0.2, 0.05]} rotation={[0.5, side * 0.2, side * 0.3]}>
                            <meshStandardMaterial color="#0a0a12" roughness={0.9} />
                        </mesh>
                        {/* Mid leg */}
                        <mesh geometry={legGeo} position={[side * 0.05, 0.0, 0.05]} rotation={[0.1, side * 0.3, side * 0.2]}>
                            <meshStandardMaterial color="#0a0a12" roughness={0.9} />
                        </mesh>
                        {/* Hind leg */}
                        <mesh geometry={legGeo} position={[side * 0.04, -0.2, 0.02]} rotation={[-0.3, side * 0.2, side * 0.1]}>
                            <meshStandardMaterial color="#0a0a12" roughness={0.9} />
                        </mesh>
                    </group>
                ))}

                {/* ── Left Wing (mirrored) ── */}
                <group ref={leftWingRef} position={[0, 0.1, 0]}>
                    <mesh geometry={wingGeoLeft} scale={[-1, 1, 1]}>
                        <meshPhysicalMaterial {...wingMatProps} color={color} />
                    </mesh>
                </group>

                {/* ── Right Wing ── */}
                <group ref={rightWingRef} position={[0, 0.1, 0]}>
                    <mesh geometry={wingGeoRight}>
                        <meshPhysicalMaterial {...wingMatProps} color={color} />
                    </mesh>
                </group>
            </group>

            {/* ── Glitter sparkles (world space) ── */}
            <points ref={glitterRef} frustumCulled={false}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={GLITTER_COUNT} array={glitterState.positions} itemSize={3} />
                    <bufferAttribute attach="attributes-size" count={GLITTER_COUNT} array={glitterSizes} itemSize={1} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.12}
                    sizeAttenuation
                    map={sparkleTexture}
                    transparent
                    opacity={0.85}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    color={color}
                />
            </points>
        </>
    );
}
