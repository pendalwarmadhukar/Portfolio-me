import React, { useEffect, useRef, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import {
  Globe,
  Activity,
  Terminal,
  Send,
  ExternalLink,
  RotateCcw,
  Compass,
  Layers,
  ChevronRight,
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
  actionType: 'fly' | 'projects' | 'soc' | 'terminal' | 'contact' | 'resume';
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

  // Camera Target References for Lerp
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
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Pointer events for orbit
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
      camState.current.targetZoom = Math.max(0.65, Math.min(2.1, camState.current.targetZoom));
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // 3D Projection Engine
    const project = (x: number, y: number, z: number) => {
      const { rotX, rotY, zoom } = camState.current;
      const y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
      const z1 = y * Math.sin(rotX) + z * Math.cos(rotX);

      const x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY);
      const z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY);

      const fov = 480;
      const distance = 4.8 / zoom;
      const scale = fov / (distance + z2);

      return {
        x: width / 2 + x2 * scale,
        y: height / 2 - y1 * scale,
        z: z2,
        scale: scale,
      };
    };

    // 3D Wireframe Box Generator
    const makeBox = (
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

    // Continental Node Generation for Station 1 Globe
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

    const threatArcs = [
      { startLat: 52, startLon: 13, endLat: 20, endLon: 73, color: '#38bdf8' },
      { startLat: 37, startLon: -122, endLat: 20, endLon: 73, color: '#06b6d4' },
      { startLat: 35, startLon: 139, endLat: 20, endLon: 73, color: '#3b82f6' },
      { startLat: -23, startLon: -46, endLat: 20, endLon: 73, color: '#0ea5e9' },
    ];

    let time = 0;

    // Main 3D Animation Render Loop
    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.016;

      // Smooth Camera Interpolation (Lerp)
      const c = camState.current;
      c.rotX += (c.targetRotX - c.rotX) * 0.07;
      c.rotY += (c.targetRotY - c.rotY) * 0.07;
      c.zoom += (c.targetZoom - c.zoom) * 0.07;

      if (c.autoOrbit && !c.isDragging) {
        c.targetRotY += 0.0035;
      }

      ctx.clearRect(0, 0, width, height);

      // Render 3D Perspective Grid Plane Floor
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.09)';
      ctx.lineWidth = 1;
      const gridExtent = 4.5;
      const gridStep = 0.9;
      for (let gx = -gridExtent; gx <= gridExtent; gx += gridStep) {
        const p1 = project(gx, -2.4, -gridExtent);
        const p2 = project(gx, -2.4, gridExtent);
        if (p1.z > -1.5 && p2.z > -1.5) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
      for (let gz = -gridExtent; gz <= gridExtent; gz += gridStep) {
        const p1 = project(-gridExtent, -2.4, gz);
        const p2 = project(gridExtent, -2.4, gz);
        if (p1.z > -1.5 && p2.z > -1.5) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // ==========================================
      // STATION 01: GLOBAL CYBER EARTH GLOBE
      // ==========================================
      const center2D = project(0, 0, 0);
      const radGlow = ctx.createRadialGradient(
        center2D.x,
        center2D.y,
        globeRadius * 40,
        center2D.x,
        center2D.y,
        globeRadius * 140
      );
      radGlow.addColorStop(0, 'rgba(6, 182, 212, 0.18)');
      radGlow.addColorStop(0.5, 'rgba(14, 165, 233, 0.06)');
      radGlow.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = radGlow;
      ctx.beginPath();
      ctx.arc(center2D.x, center2D.y, globeRadius * 140, 0, Math.PI * 2);
      ctx.fill();

      // Longitude Wireframe Rings
      for (let deg = 0; deg < 360; deg += 30) {
        const rad = deg * (Math.PI / 180);
        ctx.beginPath();
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.12;
        let isFirst = true;

        for (let lat = -90; lat <= 90; lat += 12) {
          const phi = (90 - lat) * (Math.PI / 180);
          const p = project(
            globeRadius * Math.sin(phi) * Math.cos(rad),
            globeRadius * Math.cos(phi),
            globeRadius * Math.sin(phi) * Math.sin(rad)
          );
          if (p.z > -0.6) {
            if (isFirst) {
              ctx.moveTo(p.x, p.y);
              isFirst = false;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            isFirst = true;
          }
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Latitude Rings
      for (let lat = -60; lat <= 60; lat += 30) {
        const phi = (90 - lat) * (Math.PI / 180);
        const r = globeRadius * Math.sin(phi);
        const y = globeRadius * Math.cos(phi);

        ctx.beginPath();
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.12;
        let isFirst = true;

        for (let a = 0; a <= 360; a += 15) {
          const theta = a * (Math.PI / 180);
          const p = project(r * Math.cos(theta), y, r * Math.sin(theta));
          if (p.z > -0.6) {
            if (isFirst) {
              ctx.moveTo(p.x, p.y);
              isFirst = false;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            isFirst = true;
          }
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Orbital Defense Rings
      [
        { radius: 2.35, tiltX: 0.55, color: '#38bdf8', opacity: 0.35 },
        { radius: 2.65, tiltX: -0.4, color: '#06b6d4', opacity: 0.22 },
      ].forEach((ring) => {
        ctx.beginPath();
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = ring.opacity;
        for (let a = 0; a <= 360; a += 10) {
          const rad = a * (Math.PI / 180);
          const rx = Math.cos(rad) * ring.radius;
          const rz = Math.sin(rad) * ring.radius;
          const ry = rz * Math.sin(ring.tiltX);
          const rzFinal = rz * Math.cos(ring.tiltX);
          const p = project(rx, ry, rzFinal);
          if (a === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Earth Continent Landmass Nodes
      earthNodes.forEach((node) => {
        const p = project(node.x, node.y, node.z);
        if (p.z > -0.5) {
          ctx.beginPath();
          ctx.fillStyle = node.isIndia ? '#38bdf8' : '#38bdf8';
          ctx.shadowColor = node.isIndia ? '#38bdf8' : '#0284c7';
          ctx.shadowBlur = node.isIndia ? 8 : 3;
          ctx.arc(p.x, p.y, (node.isIndia ? 2.5 : 1.6) * (p.scale / 100), 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Hyderabad Home Beacon (17.385°N, 78.487°E)
      const hydPhi = (90 - 17.385) * (Math.PI / 180);
      const hydTheta = 78.487 * (Math.PI / 180);
      const hydX = globeRadius * Math.sin(hydPhi) * Math.cos(hydTheta);
      const hydY = globeRadius * Math.cos(hydPhi);
      const hydZ = globeRadius * Math.sin(hydPhi) * Math.sin(hydTheta);
      const hydP = project(hydX, hydY, hydZ);

      if (hydP.z > -0.4) {
        const pulse = (Math.sin(time * 4) + 1) / 2;
        ctx.beginPath();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.6;
        ctx.arc(hydP.x, hydP.y, (8 + pulse * 14) * (hydP.scale / 100), 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = '#34d399';
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 12;
        ctx.arc(hydP.x, hydP.y, 4 * (hydP.scale / 100), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Beacon Info Card
        ctx.fillStyle = 'rgba(6, 15, 33, 0.88)';
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 1;
        const tagX = hydP.x + 14;
        const tagY = hydP.y - 18;
        ctx.strokeRect(tagX, tagY, 138, 26);
        ctx.fillRect(tagX, tagY, 138, 26);

        ctx.fillStyle = '#34d399';
        ctx.beginPath();
        ctx.arc(tagX + 8, tagY + 13, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f8fafc';
        ctx.font = '10px monospace';
        ctx.fillText('HYDERABAD // BASE', tagX + 16, tagY + 16);
      }

      // Threat Arcs
      threatArcs.forEach((arc) => {
        const phi1 = (90 - arc.startLat) * (Math.PI / 180);
        const theta1 = arc.startLon * (Math.PI / 180);
        const x1 = globeRadius * Math.sin(phi1) * Math.cos(theta1);
        const y1 = globeRadius * Math.cos(phi1);
        const z1 = globeRadius * Math.sin(phi1) * Math.sin(theta1);

        const phi2 = (90 - arc.endLat) * (Math.PI / 180);
        const theta2 = arc.endLon * (Math.PI / 180);
        const x2 = globeRadius * Math.sin(phi2) * Math.cos(theta2);
        const y2 = globeRadius * Math.cos(phi2);
        const z2 = globeRadius * Math.sin(phi2) * Math.sin(theta2);

        ctx.beginPath();
        ctx.strokeStyle = arc.color;
        ctx.lineWidth = 1.3;
        ctx.globalAlpha = 0.55;
        let isFirstArc = true;
        for (let t = 0; t <= 1; t += 0.08) {
          const elev = Math.sin(t * Math.PI) * 0.42;
          const ax = (x1 + (x2 - x1) * t) * (1 + elev / globeRadius);
          const ay = (y1 + (y2 - y1) * t) * (1 + elev / globeRadius);
          const az = (z1 + (z2 - z1) * t) * (1 + elev / globeRadius);
          const ap = project(ax, ay, az);
          if (ap.z > -0.5) {
            if (isFirstArc) {
              ctx.moveTo(ap.x, ap.y);
              isFirstArc = false;
            } else {
              ctx.lineTo(ap.x, ap.y);
            }
          }
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // ==========================================
      // STATION 02: 3D CYBER DESK & SOC LAB
      // ==========================================
      const deskY = -1.5;
      makeBox(0, deskY - 0.1, 0, 3.8, 0.12, 1.8, 'rgba(15, 23, 42, 0.85)', 'rgba(56, 189, 248, 0.5)');
      makeBox(-1.6, deskY - 0.7, 0, 0.1, 1.2, 1.5, 'rgba(10, 15, 30, 0.9)', 'rgba(56, 189, 248, 0.3)');
      makeBox(1.6, deskY - 0.7, 0, 0.1, 1.2, 1.5, 'rgba(10, 15, 30, 0.9)', 'rgba(56, 189, 248, 0.3)');

      // Monitors
      makeBox(-0.75, deskY + 0.65, -0.2, 1.4, 0.85, 0.06, 'rgba(6, 15, 33, 0.95)', 'rgba(6, 182, 212, 0.9)');
      makeBox(0.75, deskY + 0.65, -0.2, 1.4, 0.85, 0.06, 'rgba(6, 15, 33, 0.95)', 'rgba(16, 185, 129, 0.9)');

      // PC Rig
      makeBox(1.45, deskY + 0.45, 0.25, 0.45, 0.9, 0.75, 'rgba(11, 19, 43, 0.9)', 'rgba(56, 189, 248, 0.7)');

      // ==========================================
      // STATION 03: 3D FLOATING PROJECT CARDS
      // ==========================================
      const projectAngles = [-1.1, -0.4, 0.4, 1.1];
      const projectTitles = ['SentinelDesk', 'CloudShield', 'NetSentinel', 'ML Fraud Det.'];
      projectAngles.forEach((ang, i) => {
        const px = Math.sin(ang) * 2.8;
        const pz = Math.cos(ang) * 2.8 - 0.5;
        const py = 0.35 + Math.sin(time * 2 + i) * 0.12;
        makeBox(px, py, pz, 1.1, 0.75, 0.08, 'rgba(6, 15, 33, 0.85)', 'rgba(56, 189, 248, 0.6)');
        const pProj = project(px, py, pz);
        if (pProj.z > -0.6) {
          ctx.fillStyle = '#38bdf8';
          ctx.font = 'bold 9px monospace';
          ctx.fillText(`PROJ 0${i + 1}`, pProj.x - 24, pProj.y - 10);
          ctx.fillStyle = '#f8fafc';
          ctx.font = '10px monospace';
          ctx.fillText(projectTitles[i], pProj.x - 24, pProj.y + 8);
        }
      });

      // ==========================================
      // STATION 04: 3D CYBER TERMINAL PEDESTAL
      // ==========================================
      const pedX = 0;
      const pedY = -0.5;
      const pedZ = 2.4;
      makeBox(pedX, pedY - 0.9, pedZ, 0.7, 1.1, 0.7, 'rgba(10, 18, 38, 0.9)', 'rgba(56, 189, 248, 0.5)');
      makeBox(pedX, pedY, pedZ, 1.3, 0.85, 0.08, 'rgba(6, 15, 33, 0.95)', 'rgba(52, 211, 153, 0.8)');
      const pedP = project(pedX, pedY, pedZ);
      if (pedP.z > -0.6) {
        ctx.fillStyle = '#34d399';
        ctx.font = '9px monospace';
        ctx.fillText('CLI://madhukar@soc:~$', pedP.x - 38, pedP.y - 12);
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('> nmap portfolio.local', pedP.x - 38, pedP.y + 4);
        ctx.fillStyle = '#f8fafc';
        ctx.fillText('PORTS: 22, 443 [OPEN]', pedP.x - 38, pedP.y + 18);
      }

      // ==========================================
      // STATION 05: 3D TRANSMISSION DISH NODE
      // ==========================================
      const antX = 0;
      const antY = 2.5;
      const antZ = 0;
      const antP = project(antX, antY, antZ);
      if (antP.z > -0.6) {
        ctx.beginPath();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        const pBase = project(antX, antY - 0.8, antZ);
        ctx.moveTo(pBase.x, pBase.y);
        ctx.lineTo(antP.x, antP.y);
        ctx.stroke();

        for (let w = 1; w <= 3; w++) {
          const waveRadius = ((time * 30 + w * 25) % 85) * (antP.scale / 100);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(0, 0.8 - waveRadius / 90)})`;
          ctx.lineWidth = 1.5;
          ctx.arc(antP.x, antP.y, waveRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
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
    <div className={`relative w-full ${isFullscreen ? 'h-full' : 'h-[520px] sm:h-[580px]'} flex flex-col overflow-hidden bg-[#030712] rounded-2xl border border-cyan-500/20 select-none shadow-2xl`}>
      {/* Ambient Lighting Accents */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[25%] w-[550px] h-[550px] rounded-full bg-cyan-600/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

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
              Siddhartha Institute of Tech & Sciences · Hyderabad
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
        <canvas ref={canvasRef} className="w-full h-full absolute inset-0 z-0 cursor-grab active:cursor-grabbing" />

        {/* Dynamic Glass HUD Panel (Updates dynamically per station) */}
        <div className="absolute bottom-4 left-4 max-w-sm sm:max-w-md w-full bg-[#060f21]/80 backdrop-blur-md border border-cyan-500/30 shadow-[0_20px_45px_rgba(2,6,23,0.8)] rounded-2xl p-4 z-20 font-mono text-xs transition-all pointer-events-auto">
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
        <div className="absolute bottom-4 right-4 z-20 bg-[#060f21]/80 backdrop-blur-md border border-cyan-500/30 rounded-xl p-2.5 font-mono text-[10px] text-slate-400 hidden sm:flex flex-col gap-1.5">
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
