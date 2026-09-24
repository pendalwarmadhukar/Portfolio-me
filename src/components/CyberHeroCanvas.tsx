import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CyberHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    // Scene background is transparent so CSS gradient works seamlessly
    scene.fog = new THREE.FogExp2(0x0a0e17, 0.045);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all rotating cyber elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Create a 3D Security Shield
    // A shield shape using ExtrudeGeometry or custom shape
    const shieldShape = new THREE.Shape();
    // Start at top center
    shieldShape.moveTo(0, 1.4);
    // Top right shoulder
    shieldShape.lineTo(0.9, 1.3);
    shieldShape.quadraticCurveTo(1.15, 0.8, 1.1, 0.1);
    // Curve down to bottom tip
    shieldShape.quadraticCurveTo(0.9, -1.0, 0, -1.5);
    // Curve up to left shoulder
    shieldShape.quadraticCurveTo(-0.9, -1.0, -1.1, 0.1);
    shieldShape.quadraticCurveTo(-1.15, 0.8, -0.9, 1.3);
    shieldShape.lineTo(0, 1.4);

    const extrudeSettings = {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08
    };

    const shieldGeometry = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    shieldGeometry.center();

    // Shield material: Sleek dark metallic with cyan wireframe rim
    const shieldMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f1a2e,
      roughness: 0.35,
      metalness: 0.85,
      wireframe: false,
    });

    const shieldMesh = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shieldMesh.scale.set(1.2, 1.2, 1.2);
    mainGroup.add(shieldMesh);

    // Wireframe overlay on the shield for technical cyber look
    const wireframeGeometry = new THREE.WireframeGeometry(shieldGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.45,
      linewidth: 1,
    });
    const shieldWireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    shieldWireframe.scale.set(1.205, 1.205, 1.205);
    mainGroup.add(shieldWireframe);

    // Inner glowing core emblem (keyhole / lock geometry)
    const innerEmblemGeo = new THREE.RingGeometry(0.2, 0.35, 32);
    const innerEmblemMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const innerEmblem = new THREE.Mesh(innerEmblemGeo, innerEmblemMat);
    innerEmblem.position.set(0, 0.15, 0.25);
    mainGroup.add(innerEmblem);

    const keyholeStemGeo = new THREE.PlaneGeometry(0.16, 0.35);
    const keyholeStemMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });
    const keyholeStem = new THREE.Mesh(keyholeStemGeo, keyholeStemMat);
    keyholeStem.position.set(0, -0.15, 0.25);
    mainGroup.add(keyholeStem);

    // 2. Surrounding Orbital Rings (Cloud infrastructure / Security perimeter)
    const ringGroup = new THREE.Group();
    mainGroup.add(ringGroup);

    const orbitRing1 = new THREE.Line(
      new THREE.RingGeometry(2.2, 2.22, 64),
      new THREE.LineBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.35 })
    );
    orbitRing1.rotation.x = Math.PI / 2.3;
    ringGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Line(
      new THREE.RingGeometry(2.6, 2.62, 64),
      new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.25 })
    );
    orbitRing2.rotation.x = -Math.PI / 3;
    orbitRing2.rotation.y = Math.PI / 6;
    ringGroup.add(orbitRing2);

    // 3. Network Nodes & Connected Network Lines
    const nodeCount = 38;
    const nodePositions: THREE.Vector3[] = [];
    const nodesGroup = new THREE.Group();
    mainGroup.add(nodesGroup);

    const sphereGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const greenNodeMat = new THREE.MeshBasicMaterial({ color: 0x10b981 }); // subtle green security indicators

    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.0 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);
      nodePositions.push(pos);

      const mesh = new THREE.Mesh(sphereGeo, i % 7 === 0 ? greenNodeMat : nodeMat);
      mesh.position.copy(pos);
      nodesGroup.add(mesh);
    }

    // Connect close nodes with network lines
    const linePositions: number[] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 1.35) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }

    const networkLineGeo = new THREE.BufferGeometry();
    networkLineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const networkLineMat = new THREE.LineBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.22,
    });
    const networkLines = new THREE.LineSegments(networkLineGeo, networkLineMat);
    nodesGroup.add(networkLines);

    // 4. Subtle background floating particles
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 3, 15);
    cyanLight.position.set(3, 3, 4);
    scene.add(cyanLight);

    const blueRimLight = new THREE.PointLight(0x3b82f6, 2, 12);
    blueRimLight.position.set(-3, -2, 2);
    scene.add(blueRimLight);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 0.8;
      mouseY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth mouse parallax easing
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;

        // Gentle shield sway and rotation
        mainGroup.rotation.y = Math.sin(elapsedTime * 0.45) * 0.25 + targetX;
        mainGroup.rotation.x = Math.cos(elapsedTime * 0.35) * 0.12 - targetY;

        // Orbit rings rotation
        ringGroup.rotation.z = elapsedTime * 0.12;
        ringGroup.rotation.y = elapsedTime * 0.08;

        // Nodes slow rotate
        nodesGroup.rotation.y = -elapsedTime * 0.09;

        // Particles gentle float
        particles.rotation.y = elapsedTime * 0.02;
        particles.rotation.x = elapsedTime * 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      shieldGeometry.dispose();
      shieldMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      sphereGeo.dispose();
      nodeMat.dispose();
      greenNodeMat.dispose();
      networkLineGeo.dispose();
      networkLineMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
