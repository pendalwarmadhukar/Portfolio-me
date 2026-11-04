import React, { useEffect, useRef, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import {
  Activity,
  Send,
  Layers,
  Maximize2,
  FileText,
} from 'lucide-react';

interface CyberVerse3DViewProps {
  onOpenResume?: () => void;
  onOpenTerminal?: () => void;
  onExpandFullscreen?: () => void;
  isFullscreen?: boolean;
}

interface StationInfo {
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  btnPrimaryText: string;
  targetRotX: number;
  targetRotY: number;
  targetZoom: number;
  actionType: 'fly' | 'terminal';
  nextStation: number;
}

export const CyberVerse3DView: React.FC<CyberVerse3DViewProps> = ({
  onOpenResume,
  onOpenTerminal,
  onExpandFullscreen,
  isFullscreen = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeStation, setActiveStation] = useState<number>(0);
  const activeStationRef = useRef<number>(0);
  const [autoOrbit, setAutoOrbit] = useState<boolean>(true);

  // 5 Specialized Cyber Stations
  const stations: StationInfo[] = [
    {
      tag: 'STATION 01 // GLOBAL CORE',
      title: 'Global Threat Defense Core',
      subtitle: 'Earth Hologram · Hyderabad Active Node',
      desc: '3rd-Year B.Tech Cyber Security at Siddhartha Institute of Technology & Sciences, Hyderabad. Specializing in SOC Operations, AWS Cloud Security Architecture, and Incident Investigation.',
      btnPrimaryText: 'Fly to SOC Lab →',
      targetRotX: 0.22,
      targetRotY: -0.55,
      targetZoom: 1.15,
      actionType: 'fly',
      nextStation: 1,
    },
    {
      tag: 'STATION 02 // SOC DEFENSE LAB',
      title: 'Interactive SOC Operations Station',
      subtitle: 'Dual-Curved Battle Station · Wazuh SIEM',
      desc: 'Simulated 3D dual-display SOC operations center. Real-time Wazuh SIEM threat stream, MITRE ATT&CK T1110 brute force defense, and AWS CloudTrail session monitoring.',
      btnPrimaryText: 'Inspect 3D Projects →',
      targetRotX: 0.42,
      targetRotY: -0.65,
      targetZoom: 1.05,
      actionType: 'fly',
      nextStation: 2,
    },
    {
      tag: 'STATION 03 // 3D PROJECT VAULT',
      title: 'Holographic Security Vault',
      subtitle: 'Architectural Defense Systems',
      desc: 'Inspect Madhukar\'s 4 primary architectural projects floating in 3D: SentinelDesk (Full-Stack SOC), CloudShield (AWS Zero-Trust), NetSentinel (Bash/Nmap), and ML Fraud Detection.',
      btnPrimaryText: 'Open 3D Terminal →',
      targetRotX: 0.15,
      targetRotY: 0.1,
      targetZoom: 1.25,
      actionType: 'fly',
      nextStation: 3,
    },
    {
      tag: 'STATION 04 // 3D CYBER TERMINAL',
      title: 'Pedestal Console & CLI Gateway',
      subtitle: 'Real-Time Holographic Terminal',
      desc: 'Pedestal-mounted holographic terminal executing live security commands: whoami, nmap portfolio audit, cat resume.txt, and sudo hire-madhukar.',
      btnPrimaryText: 'Launch Live CLI [>_]',
      targetRotX: 0.35,
      targetRotY: -0.2,
      targetZoom: 1.18,
      actionType: 'terminal',
      nextStation: 4,
    },
    {
      tag: 'STATION 05 // TRANSMISSION NODE',
      title: 'Encrypted Dispatch Gateway',
      subtitle: 'Satellite Uplink · Direct Contact',
      desc: 'Encrypted satellite transmission node connecting directly to madhukarpendalwar43@gmail.com. Available for summer cybersecurity internships and SOC roles.',
      btnPrimaryText: 'Back to Global Core ↺',
      targetRotX: 0.28,
      targetRotY: -0.45,
      targetZoom: 1.2,
      actionType: 'fly',
      nextStation: 0,
    },
  ];

  const camState = useRef({
    rotX: stations[0].targetRotX,
    rotY: stations[0].targetRotY,
    zoom: stations[0].targetZoom,
    targetRotX: stations[0].targetRotX,
    targetRotY: stations[0].targetRotY,
    targetZoom: stations[0].targetZoom,
    autoOrbit: true,
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });

  const flyToStation = (idx: number) => {
    setActiveStation(idx);
    activeStationRef.current = idx;
    camState.current.targetRotX = stations[idx].targetRotX;
    camState.current.targetRotY = stations[idx].targetRotY;
    camState.current.targetZoom = stations[idx].targetZoom;
  };

  const toggleAutoOrbit = () => {
    setAutoOrbit((prev) => {
      camState.current.autoOrbit = !prev;
      return !prev;
    });
  };

  const resetCamera = () => {
    flyToStation(activeStation);
  };

  const handlePrimaryAction = () => {
    const cur = stations[activeStation];
    if (cur.actionType === 'terminal' && onOpenTerminal) {
      onOpenTerminal();
    } else {
      flyToStation(cur.nextStation);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId: number;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const parent = canvas.parentElement;

      const detectedW = rect.width || (parent ? parent.clientWidth : 0) || window.innerWidth;
      const detectedH = rect.height || (parent ? parent.clientHeight : 0) || (window.innerHeight - 80);

      width = Math.max(320, Math.floor(detectedW));
      height = Math.max(380, Math.floor(detectedH));

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Drag Orbit Events
    const onPointerDown = (e: PointerEvent) => {
      camState.current.isDragging = true;
      camState.current.lastX = e.clientX;
      camState.current.lastY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!camState.current.isDragging) return;
      const dx = e.clientX - camState.current.lastX;
      const dy = e.clientY - camState.current.lastY;
      camState.current.targetRotY += dx * 0.007;
      camState.current.targetRotX += dy * 0.007;
      camState.current.targetRotX = Math.max(-1.15, Math.min(1.2, camState.current.targetRotX));
      camState.current.lastX = e.clientX;
      camState.current.lastY = e.clientY;
    };

    const onPointerUp = () => {
      camState.current.isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camState.current.targetZoom += e.deltaY * -0.001;
      camState.current.targetZoom = Math.max(0.65, Math.min(2.2, camState.current.targetZoom));
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // 3D Perspective Projection Function
    const project = (x: number, y: number, z: number) => {
      const { rotX, rotY, zoom } = camState.current;
      const y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
      const z1 = y * Math.sin(rotX) + z * Math.cos(rotX);

      const x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY);
      const z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY);

      const fov = 480;
      const distance = 4.8 / (zoom || 1);
      const scale = fov / (distance + z2);

      return {
        x: width / 2 + x2 * scale,
        y: height / 2 - y1 * scale,
        z: z2,
        scale: scale,
      };
    };

    // 3D Box Helper
    const drawBox = (
      x: number,
      y: number,
      z: number,
      w: number,
      h: number,
      d: number,
      fillColor: string,
      strokeColor: string
    ) => {
      const hw = w / 2;
      const hh = h / 2;
      const hd = d / 2;
      const corners = [
        [-hw, -hh, -hd],
        [hw, -hh, -hd],
        [hw, hh, -hd],
        [-hw, hh, -hd],
        [-hw, -hh, hd],
        [hw, -hh, hd],
        [hw, hh, hd],
        [-hw, hh, hd],
      ];
      const p = corners.map(([cx, cy, cz]) => project(x + cx, y + cy, z + cz));
      const faces = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [3, 2, 6, 7],
        [0, 1, 5, 4],
        [0, 3, 7, 4],
        [1, 2, 6, 5],
      ];
      faces.forEach((f) => {
        ctx.beginPath();
        ctx.moveTo(p[f[0]].x, p[f[0]].y);
        ctx.lineTo(p[f[1]].x, p[f[1]].y);
        ctx.lineTo(p[f[2]].x, p[f[2]].y);
        ctx.lineTo(p[f[3]].x, p[f[3]].y);
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    };

    // Continental Node Generation for Station 0
    const globeRadius = 1.95;
    const earthNodes: { x: number; y: number; z: number; isIndia: boolean }[] = [];
    const continentBounds: [number, number, number, number][] = [
      [15, 65, -135, -60],
      [-50, 10, -80, -35],
      [36, 65, -10, 40],
      [-32, 35, -15, 48],
      [10, 68, 45, 135],
      [8, 34, 68, 88], // India
      [-38, -12, 115, 150],
    ];
    continentBounds.forEach((c) => {
      const count = c[0] === 8 ? 45 : 32;
      for (let i = 0; i < count; i++) {
        const lat = c[0] + Math.random() * (c[1] - c[0]);
        const lon = c[2] + Math.random() * (c[3] - c[2]);
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = lon * (Math.PI / 180);
        earthNodes.push({
          x: globeRadius * Math.sin(phi) * Math.cos(theta),
          y: globeRadius * Math.cos(phi),
          z: globeRadius * Math.sin(phi) * Math.sin(theta),
          isIndia: c[0] === 8,
        });
      }
    });

    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.016;

      // Smooth camera interpolation
      const c = camState.current;
      c.rotX += (c.targetRotX - c.rotX) * 0.06;
      c.rotY += (c.targetRotY - c.rotY) * 0.06;
      c.zoom += (c.targetZoom - c.zoom) * 0.06;

      if (c.autoOrbit && !c.isDragging) {
        c.targetRotY += 0.0035;
      }

      ctx.clearRect(0, 0, width, height);

      // Deep Space Atmospheric Background Gradient
      const maxDim = Math.max(width, height) * 0.75;
      const bg = ctx.createRadialGradient(width / 2, height / 2, 40, width / 2, height / 2, maxDim);
      bg.addColorStop(0, '#09152b');
      bg.addColorStop(0.5, '#050c18');
      bg.addColorStop(1, '#02050e');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const currentStation = activeStationRef.current;

      // ==========================================
      // STATION 0: CYBER GLOBE
      // ==========================================
      if (currentStation === 0) {
        // Atmospheric Central Glow
        const center2D = project(0, 0, 0);
        const glowGrad = ctx.createRadialGradient(
          center2D.x,
          center2D.y,
          globeRadius * 40,
          center2D.x,
          center2D.y,
          globeRadius * 130
        );
        glowGrad.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
        glowGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.08)');
        glowGrad.addColorStop(1, 'rgba(2, 5, 14, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(center2D.x, center2D.y, globeRadius * 130, 0, Math.PI * 2);
        ctx.fill();

        // Wireframe Latitude Rings
        for (let lat = -60; lat <= 60; lat += 30) {
          const phi = (90 - lat) * (Math.PI / 180);
          const r = globeRadius * Math.sin(phi);
          const y = globeRadius * Math.cos(phi);
          ctx.beginPath();
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.2;
          for (let a = 0; a <= 360; a += 15) {
            const rad = a * (Math.PI / 180);
            const p = project(r * Math.cos(rad), y, r * Math.sin(rad));
            if (a === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Dual Orbit Security Rings
        [
          { radius: 2.35, tilt: 0.5, color: '#38bdf8' },
          { radius: 2.65, tilt: -0.4, color: '#06b6d4' },
        ].forEach((ring) => {
          ctx.beginPath();
          ctx.strokeStyle = ring.color;
          ctx.lineWidth = 1.3;
          ctx.globalAlpha = 0.35;
          for (let a = 0; a <= 360; a += 10) {
            const rad = a * (Math.PI / 180);
            const rx = Math.cos(rad) * ring.radius;
            const rz = Math.sin(rad) * ring.radius;
            const ry = rz * Math.sin(ring.tilt);
            const p = project(rx, ry, rz * Math.cos(ring.tilt));
            if (a === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
        });

        // Earth Continent Nodes & Connections
        const projNodes = earthNodes.map((n) => ({
          ...project(n.x, n.y, n.z),
          isIndia: n.isIndia,
        }));

        for (let i = 0; i < projNodes.length; i++) {
          if (projNodes[i].z < -0.3) continue;
          for (let j = i + 1; j < projNodes.length; j++) {
            if (projNodes[j].z < -0.3) continue;
            const dx = projNodes[i].x - projNodes[j].x;
            const dy = projNodes[i].y - projNodes[j].y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 1400) {
              ctx.beginPath();
              ctx.moveTo(projNodes[i].x, projNodes[i].y);
              ctx.lineTo(projNodes[j].x, projNodes[j].y);
              ctx.strokeStyle = '#0284c7';
              ctx.lineWidth = 0.8;
              ctx.globalAlpha = Math.max(0.04, (1 - Math.sqrt(d2) / 38) * 0.25);
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }

        projNodes.forEach((p) => {
          if (p.z > -0.6) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.z > 0 ? (p.isIndia ? 3.2 : 2.2) : 1.4, 0, Math.PI * 2);
            ctx.fillStyle = p.isIndia ? '#34d399' : p.z > 0.4 ? '#38bdf8' : '#0284c7';
            ctx.shadowColor = p.isIndia ? '#10b981' : '#38bdf8';
            ctx.shadowBlur = p.z > 0 ? 8 : 0;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });

        // Hyderabad Beacon (17.385°N, 78.487°E)
        const hydPhi = (90 - 17.385) * (Math.PI / 180);
        const hydTheta = 78.487 * (Math.PI / 180);
        const hydP = project(
          globeRadius * Math.sin(hydPhi) * Math.cos(hydTheta),
          globeRadius * Math.cos(hydPhi),
          globeRadius * Math.sin(hydPhi) * Math.sin(hydTheta)
        );

        if (hydP.z > -0.5) {
          const pulseR = 8 + Math.sin(time * 4) * 4;
          ctx.beginPath();
          ctx.arc(hydP.x, hydP.y, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = '#34d399';
          ctx.lineWidth = 1.6;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(hydP.x, hydP.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#10b981';
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = 14;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Beacon Label
          ctx.font = 'bold 11px monospace';
          ctx.fillStyle = '#6ee7b7';
          ctx.fillText('Hyderabad [17.38°N, 78.49°E]', hydP.x + 12, hydP.y - 6);
          ctx.font = '9px monospace';
          ctx.fillStyle = '#94a3b8';
          ctx.fillText('Siddhartha Institute of Tech', hydP.x + 12, hydP.y + 8);
        }
      }

      // ==========================================
      // STATION 1: SOC DEFENSE LAB
      // ==========================================
      else if (currentStation === 1) {
        // Floor Grid
        for (let x = -3; x <= 3; x += 0.6) {
          const p1 = project(x, -1.2, -3);
          const p2 = project(x, -1.2, 3);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
          ctx.stroke();
        }
        for (let z = -3; z <= 3; z += 0.6) {
          const p1 = project(-3, -1.2, z);
          const p2 = project(3, -1.2, z);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
          ctx.stroke();
        }

        // Desk
        drawBox(0, 0, 0, 2.6, 0.08, 1.4, '#0b1324', '#06b6d4');
        [
          [-1.2, -0.6],
          [1.2, -0.6],
          [-1.2, 0.6],
          [1.2, 0.6],
        ].forEach(([lx, lz]) => {
          drawBox(lx, -0.6, lz, 0.08, 1.15, 0.08, '#111c30', '#1e293b');
        });

        // Ultrawide Curved Monitor
        drawBox(0, 0.55, -0.28, 1.4, 0.65, 0.05, '#050a14', '#06b6d4');
        const scP = project(0, 0.55, -0.25);
        ctx.font = 'bold 11px monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('WAZUH SIEM: 1,420 EVT/S', scP.x - 70, scP.y - 10);
        ctx.fillStyle = '#34d399';
        ctx.fillText('MITRE T1110: 147 BLOCKED', scP.x - 70, scP.y + 10);

        // Vertical Monitor
        drawBox(-0.95, 0.58, -0.15, 0.45, 0.82, 0.04, '#050a14', '#10b981');
        const vP = project(-0.95, 0.58, -0.12);
        ctx.font = '9px monospace';
        ctx.fillStyle = '#10b981';
        ctx.fillText('CLOUDTRAIL', vP.x - 28, vP.y - 12);
        ctx.fillText('GUARDDUTY', vP.x - 28, vP.y + 6);

        // PC Rig with RGB Fans
        drawBox(1.05, 0.35, -0.05, 0.35, 0.65, 0.65, '#070f1e', '#38bdf8');
        drawBox(-0.15, 0.065, 0.2, 0.72, 0.025, 0.26, '#050914', '#38bdf8');
        drawBox(0.42, 0.065, 0.22, 0.12, 0.03, 0.18, '#0b1324', '#06b6d4');
      }

      // ==========================================
      // STATION 2: 3D PROJECT VAULT
      // ==========================================
      else if (currentStation === 2) {
        const projectCards = [
          { title: '1. SentinelDesk', sub: 'Full-Stack SOC Platform', x: -1.4, y: 0.3, z: 0, color: '#06b6d4' },
          { title: '2. CloudShield', sub: 'AWS Zero-Trust Infra', x: 0, y: 0.3, z: 0.6, color: '#38bdf8' },
          { title: '3. NetSentinel', sub: 'Linux Nmap Audit', x: 1.4, y: 0.3, z: 0, color: '#10b981' },
          { title: '4. ML Fraud Guard', sub: 'Precision Anomaly AI', x: 0, y: 0.3, z: -0.8, color: '#a855f7' },
        ];

        // Central Base Ring
        ctx.beginPath();
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 1.4;
        ctx.globalAlpha = 0.5;
        for (let a = 0; a <= 360; a += 15) {
          const rad = a * (Math.PI / 180);
          const p = project(Math.cos(rad) * 2.2, -1.0, Math.sin(rad) * 2.2);
          if (a === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;

        projectCards.forEach((c) => {
          const bob = Math.sin(time * 2 + c.x) * 0.08;
          drawBox(c.x, c.y + bob, c.z, 0.9, 1.1, 0.08, '#081124', c.color);
          const cp = project(c.x, c.y + bob + 0.1, c.z + 0.05);
          ctx.font = 'bold 11px monospace';
          ctx.fillStyle = c.color;
          ctx.fillText(c.title, cp.x - 44, cp.y - 8);
          ctx.font = '9px monospace';
          ctx.fillStyle = '#cbd5e1';
          ctx.fillText(c.sub, cp.x - 44, cp.y + 10);
        });
      }

      // ==========================================
      // STATION 3: 3D CYBER TERMINAL PEDESTAL
      // ==========================================
      else if (currentStation === 3) {
        drawBox(0, -0.6, 0, 0.8, 1.2, 0.8, '#0a1324', '#06b6d4');
        drawBox(0, 0.45, 0, 1.6, 0.95, 0.06, '#040813', '#38bdf8');

        const tp = project(0, 0.45, 0.04);
        ctx.font = 'bold 10px monospace';
        ctx.fillStyle = '#34d399';
        ctx.fillText('madhukar@soc-station:~$ whoami', tp.x - 78, tp.y - 25);
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('> B.Tech Cyber Security (3rd Year)', tp.x - 78, tp.y - 10);
        ctx.fillText('> Siddhartha Institute of Tech, Hyderabad', tp.x - 78, tp.y + 5);
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('> Target: SOC Analyst L1/L2 · Cloud Sec', tp.x - 78, tp.y + 20);
      }

      // ==========================================
      // STATION 4: TRANSMISSION NODE
      // ==========================================
      else if (currentStation === 4) {
        drawBox(0, -0.8, 0, 0.4, 1.6, 0.4, '#0c162b', '#06b6d4');

        // Satellite Dish
        ctx.beginPath();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.4;
        for (let a = 0; a <= 360; a += 15) {
          const rad = a * (Math.PI / 180);
          const dx = Math.cos(rad) * 1.3;
          const dz = Math.sin(rad) * 1.3;
          const p = project(dx, 0.6 + dz * 0.4, dz);
          if (a === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // Radiating Waves
        for (let w = 0; w < 3; w++) {
          const pulseR = 0.5 + ((time * 1.5 + w * 0.6) % 1.8);
          ctx.beginPath();
          ctx.strokeStyle = '#34d399';
          ctx.globalAlpha = Math.max(0.1, 1 - pulseR / 1.8);
          for (let a = 0; a <= 360; a += 20) {
            const rad = a * (Math.PI / 180);
            const p = project(Math.cos(rad) * pulseR, 1.4 + pulseR * 0.4, Math.sin(rad) * pulseR);
            if (a === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        const dp = project(0, 0.6, 0);
        ctx.font = 'bold 11px monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('DISPATCH: madhukarpendalwar43@gmail.com', dp.x - 120, dp.y + 35);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('wheel', onWheel);
    };
  }, []);

  const curStation = stations[activeStation];

  return (
    <div
      className={`relative w-full ${
        isFullscreen ? 'h-full flex-1' : 'h-[520px] sm:h-[580px]'
      } flex flex-col overflow-hidden bg-[#030712] rounded-2xl border border-cyan-500/20 select-none shadow-2xl`}
      style={{ minHeight: isFullscreen ? '480px' : '520px' }}
    >
      {/* 3D Master Navigation Bar Header */}
      <div className="relative z-20 px-3 sm:px-5 py-2.5 bg-[#050c1c]/90 border-b border-cyan-500/20 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 shrink-0">
        {/* Brand & Status */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500 text-slate-950 font-bold flex items-center justify-center font-mono text-xs shadow-[0_0_12px_rgba(6,182,212,0.5)]">
            3D
          </div>
          <div>
            <div className="text-white font-bold text-xs tracking-wide font-mono flex items-center gap-1.5">
              <span>CYBERVERSE 3D</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                ACTIVE
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
              Siddhartha Institute of Tech &amp; Sciences · Hyderabad
            </div>
          </div>
        </div>

        {/* Station Navigation Selectors */}
        <nav className="flex items-center gap-1 bg-[#02050e] p-1 rounded-xl border border-slate-800 text-[11px] font-mono overflow-x-auto max-w-full">
          {stations.map((s, idx) => (
            <button
              key={s.tag}
              type="button"
              onClick={() => flyToStation(idx)}
              className={`px-2.5 py-1 rounded-lg transition whitespace-nowrap cursor-pointer ${
                activeStation === idx
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              0{idx + 1}. {s.tag.split('// ')[1] || s.tag}
            </button>
          ))}
        </nav>

        {/* Fullscreen Expand Action */}
        {onExpandFullscreen && !isFullscreen && (
          <button
            type="button"
            onClick={onExpandFullscreen}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 hover:text-white hover:border-cyan-500 transition cursor-pointer"
            title="Expand to Fullscreen 3D View"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Main 3D Canvas Viewport */}
      <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full absolute inset-0 z-0 cursor-grab active:cursor-grabbing block"
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        />

        {/* Dynamic Glass HUD Panel */}
        <div className="absolute bottom-4 left-4 max-w-sm sm:max-w-md w-full bg-[#060f21]/85 backdrop-blur-md border border-cyan-500/30 shadow-[0_20px_45px_rgba(2,6,23,0.8)] rounded-2xl p-4 z-20 font-mono text-xs transition-all pointer-events-auto">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] border border-cyan-800 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{curStation.tag}</span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-white mb-0.5">
            {curStation.title}
          </h2>

          <div className="text-[11px] text-cyan-400 mb-1.5 font-medium">
            {curStation.subtitle}
          </div>

          <p className="text-slate-300 text-[11px] leading-relaxed mb-3">
            {curStation.desc}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition flex items-center gap-1.5 cursor-pointer text-xs shadow-md shadow-cyan-500/20"
            >
              <span>{curStation.btnPrimaryText}</span>
            </button>

            {activeStation === 0 && onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white transition flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Resume Dossier</span>
              </button>
            )}

            {activeStation === 1 && (
              <a
                href="#soc"
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white transition flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Open SOC Dashboard</span>
              </a>
            )}

            {activeStation === 2 && (
              <a
                href="#projects"
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white transition flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>View All Projects</span>
              </a>
            )}

            {activeStation === 4 && (
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white transition flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>Email Madhukar</span>
              </a>
            )}
          </div>
        </div>

        {/* 3D Control Hints & Auto-Orbit Toggle (Bottom Right) */}
        <div className="absolute bottom-4 right-4 z-20 bg-[#060f21]/85 backdrop-blur-md border border-cyan-500/30 rounded-xl p-2.5 font-mono text-[10px] text-slate-400 hidden sm:flex flex-col gap-1.5 pointer-events-auto">
          <div className="flex items-center justify-between text-white font-bold border-b border-slate-800 pb-1">
            <span>3D CONTROLS</span>
            <span className="text-cyan-400">↔ 360°</span>
          </div>
          <div>• Drag to Orbit around scene</div>
          <div>• Scroll to Zoom in / out</div>
          <div className="pt-1 border-t border-slate-800 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={toggleAutoOrbit}
              className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 transition cursor-pointer"
            >
              Orbit: {autoOrbit ? 'ON' : 'OFF'}
            </button>
            <button
              type="button"
              onClick={resetCamera}
              className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
