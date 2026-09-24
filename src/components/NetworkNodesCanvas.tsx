import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface NodeData {
  position: THREE.Vector3;
  basePosition: THREE.Vector3;
  color: THREE.Color;
  size: number;
  pulseSpeed: number;
  phase: number;
}

// Interactive 3D Network Nodes Scene inside R3F
const NetworkScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const linesMeshRef = useRef<THREE.LineSegments>(null);
  const pointsMeshRef = useRef<THREE.Points>(null);
  const shieldGroupRef = useRef<THREE.Group>(null);

  const { pointer, viewport } = useThree();

  // Check prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Generate 3D network node points and connections
  const nodeCount = 54;
  const { nodeData, lineGeometry, pointGeometry } = useMemo(() => {
    const nodes: NodeData[] = [];
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);

    // Color palette: Cyan, Sky Blue, Electric Blue, Emerald (secure status)
    const cyanColor = new THREE.Color(0x06b6d4);
    const skyColor = new THREE.Color(0x38bdf8);
    const blueColor = new THREE.Color(0x3b82f6);
    const emeraldColor = new THREE.Color(0x10b981);

    const colorChoices = [cyanColor, skyColor, blueColor, emeraldColor];

    for (let i = 0; i < nodeCount; i++) {
      // Distributed in an elliptical spherical shell around center
      const radius = 2.0 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta) * 1.4; // wider aspect
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.9;
      const z = radius * Math.cos(phi) * 0.9;

      const pos = new THREE.Vector3(x, y, z);
      const chosenColor = i % 8 === 0 ? emeraldColor : colorChoices[Math.floor(Math.random() * 3)];

      nodes.push({
        position: pos.clone(),
        basePosition: pos.clone(),
        color: chosenColor,
        size: 0.05 + Math.random() * 0.04,
        pulseSpeed: 1.5 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
      });

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    // Points BufferGeometry
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Calculate dynamic connections
    const lineIndices: number[] = [];
    const maxDistance = 1.6;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].basePosition.distanceTo(nodes[j].basePosition);
        if (dist < maxDistance) {
          lineIndices.push(
            nodes[i].basePosition.x, nodes[i].basePosition.y, nodes[i].basePosition.z,
            nodes[j].basePosition.x, nodes[j].basePosition.y, nodes[j].basePosition.z
          );
        }
      }
    }

    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineIndices, 3));

    return { nodeData: nodes, lineGeometry: lGeo, pointGeometry: pGeo };
  }, []);

  // Background floating ambient cyber particles
  const particleCount = 100;
  const ambientParticlesGeometry = useMemo(() => {
    const coords = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      coords[i] = (Math.random() - 0.5) * 16;
      coords[i + 1] = (Math.random() - 0.5) * 12;
      coords[i + 2] = (Math.random() - 0.5) * 10;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(coords, 3));
    return geo;
  }, []);

  // Central 3D Cyber Shield Shape
  const shieldGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.3);
    shape.lineTo(0.85, 1.2);
    shape.quadraticCurveTo(1.05, 0.75, 1.0, 0.1);
    shape.quadraticCurveTo(0.85, -0.9, 0, -1.4);
    shape.quadraticCurveTo(-0.85, -0.9, -1.0, 0.1);
    shape.quadraticCurveTo(-1.05, 0.75, -0.85, 1.2);
    shape.lineTo(0, 1.3);

    const extrudeSettings = {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    return geo;
  }, []);

  // Orbital Rings
  const ringGeometries = useMemo(() => {
    return [
      new THREE.RingGeometry(2.3, 2.32, 64),
      new THREE.RingGeometry(2.7, 2.72, 64),
    ];
  }, []);

  // Mouse interaction state with smooth damping (lerp)
  const mouseTarget = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Smoothly interpolate mouse target
    const targetX = (pointer.x * viewport.width * 0.12);
    const targetY = (pointer.y * viewport.height * 0.12);

    mouseTarget.current.x = THREE.MathUtils.lerp(mouseTarget.current.x, targetX, 0.05);
    mouseTarget.current.y = THREE.MathUtils.lerp(mouseTarget.current.y, targetY, 0.05);

    // Group parallax rotation responding to mouse
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseTarget.current.x * 0.6 + Math.sin(time * 0.3) * 0.15,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouseTarget.current.y * 0.5 + Math.cos(time * 0.25) * 0.1,
        0.05
      );
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouseTarget.current.x * 0.3, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouseTarget.current.y * 0.3, 0.05);
    }

    // Dynamic node displacement responding to mouse in 3D
    const posAttr = pointGeometry.getAttribute('position') as THREE.BufferAttribute;
    const pointer3D = new THREE.Vector3(
      pointer.x * (viewport.width / 2),
      pointer.y * (viewport.height / 2),
      0
    );

    for (let i = 0; i < nodeCount; i++) {
      const node = nodeData[i];
      // Micro breathing & pulsating
      const pulse = Math.sin(time * node.pulseSpeed + node.phase) * 0.08;

      // Mouse interactive repelling/attracting wave
      const worldNodePos = node.basePosition.clone().applyEuler(groupRef.current ? groupRef.current.rotation : new THREE.Euler());
      const distToPointer = worldNodePos.distanceTo(pointer3D);
      const mouseInfluence = Math.max(0, 1 - distToPointer / 3.5);

      const offsetX = Math.sin(time * 0.5 + node.phase) * 0.06 + (worldNodePos.x - pointer3D.x) * mouseInfluence * 0.15;
      const offsetY = Math.cos(time * 0.4 + node.phase) * 0.06 + (worldNodePos.y - pointer3D.y) * mouseInfluence * 0.15;

      posAttr.setXYZ(
        i,
        node.basePosition.x * (1 + pulse) + offsetX,
        node.basePosition.y * (1 + pulse) + offsetY,
        node.basePosition.z * (1 + pulse)
      );
    }
    posAttr.needsUpdate = true;

    // Shield subtle floating oscillation
    if (shieldGroupRef.current) {
      shieldGroupRef.current.rotation.y = time * 0.2;
      shieldGroupRef.current.position.y = Math.sin(time * 0.8) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Security Shield & Perimeter */}
      <group ref={shieldGroupRef} scale={1.15}>
        <mesh geometry={shieldGeometry}>
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.3}
            metalness={0.9}
            transparent
            opacity={0.85}
          />
        </mesh>
        <lineSegments>
          <wireframeGeometry args={[shieldGeometry]} />
          <lineBasicMaterial color="#06b6d4" transparent opacity={0.35} />
        </lineSegments>

        {/* Inner glowing lock / keyhole core */}
        <mesh position={[0, 0.12, 0.2]}>
          <ringGeometry args={[0.18, 0.3, 32]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.75} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.12, 0.2]}>
          <planeGeometry args={[0.14, 0.28]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.75} />
        </mesh>
      </group>

      {/* Interactive Network Nodes Points */}
      <points ref={pointsMeshRef} geometry={pointGeometry}>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      {/* Network Interconnection Lines */}
      <lineSegments ref={linesMeshRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.25}
          linewidth={1}
        />
      </lineSegments>

      {/* Orbital Perimeter Security Rings */}
      <group rotation={[Math.PI / 2.4, 0, 0]}>
        <primitive object={new THREE.Line(ringGeometries[0], new THREE.LineBasicMaterial({ color: '#0ea5e9', transparent: true, opacity: 0.3 }))} />
      </group>
      <group rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <primitive object={new THREE.Line(ringGeometries[1], new THREE.LineBasicMaterial({ color: '#06b6d4', transparent: true, opacity: 0.2 }))} />
      </group>

      {/* Distant ambient cyber particles */}
      <points geometry={ambientParticlesGeometry}>
        <pointsMaterial
          size={0.03}
          color="#38bdf8"
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>

      {/* Dynamic Lighting */}
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 4]} color="#06b6d4" intensity={2.5} distance={15} />
      <pointLight position={[-3, -2, 2]} color="#3b82f6" intensity={1.8} distance={12} />
      <pointLight position={[0, 0, 3]} color="#10b981" intensity={0.8} distance={8} />
    </group>
  );
};

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('React Three Fiber canvas failed to initialize WebGL:', error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export const NetworkNodesCanvas: React.FC = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 45 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
        >
          <NetworkScene />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};
