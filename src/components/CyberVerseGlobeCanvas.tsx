import React, { useEffect, useRef } from 'react';

interface CyberVerseGlobeCanvasProps {
  className?: string;
}

export const CyberVerseGlobeCanvas: React.FC<CyberVerseGlobeCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId: number;

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // 3D Camera & Orbit Variables
    let rotX = 0.22;
    let rotY = -0.6;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let autoRotate = true;
    let autoRotateTimeout: any;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      autoRotate = false;
      lastX = e.clientX;
      lastY = e.clientY;
      clearTimeout(autoRotateTimeout);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      rotY += dx * 0.005;
      rotX += dy * 0.005;
      rotX = Math.max(-1.1, Math.min(1.1, rotX));
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      clearTimeout(autoRotateTimeout);
      autoRotateTimeout = setTimeout(() => {
        autoRotate = true;
      }, 2500);
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 3D Globe Parameters
    const globeRadius = 1.95;

    function project(x: number, y: number, z: number) {
      const y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
      const z1 = y * Math.sin(rotX) + z * Math.cos(rotX);

      const x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY);
      const z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY);

      const fov = 480;
      const distance = 4.6;
      const scale = fov / (distance + z2);

      return {
        x: width / 2 + x2 * scale,
        y: height / 2 - y1 * scale,
        z: z2,
        scale,
      };
    }

    // Continent Landmass Clusters [minLat, maxLat, minLon, maxLon]
    const continentBounds: [number, number, number, number][] = [
      [15, 65, -135, -60], // North America
      [-50, 10, -80, -35],  // South America
      [36, 65, -10, 40],    // Europe
      [-32, 35, -15, 48],   // Africa
      [10, 68, 45, 135],    // Asia
      [8, 34, 68, 88],      // India Subcontinent focus
      [-38, -12, 115, 150], // Australia
    ];

    interface EarthNode {
      x: number;
      y: number;
      z: number;
      isIndia: boolean;
    }

    const earthNodes: EarthNode[] = [];
    continentBounds.forEach((c) => {
      const [minLat, maxLat, minLon, maxLon] = c;
      const isInd = c[0] === 8 && c[2] === 68;
      const count = isInd ? 42 : 36;

      for (let i = 0; i < count; i++) {
        const lat = minLat + Math.random() * (maxLat - minLat);
        const lon = minLon + Math.random() * (maxLon - minLon);
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = lon * (Math.PI / 180);

        earthNodes.push({
          x: globeRadius * Math.sin(phi) * Math.cos(theta),
          y: globeRadius * Math.cos(phi),
          z: globeRadius * Math.sin(phi) * Math.sin(theta),
          isIndia: isInd,
        });
      }
    });

    // Cyber Threat & Defense Trajectory Arcs
    const threatArcs = [
      { startLat: 52, startLon: 13, endLat: 20, endLon: 73, color: '#38bdf8', speed: 1.25 }, // Europe -> India
      { startLat: 37, startLon: -122, endLat: 20, endLon: 73, color: '#06b6d4', speed: 1.1 }, // US West -> India
      { startLat: 35, startLon: 139, endLat: 20, endLon: 73, color: '#3b82f6', speed: 1.45 }, // Tokyo -> India
      { startLat: -23, startLon: -46, endLat: 20, endLon: 73, color: '#0ea5e9', speed: 1.2 }, // Sao Paulo -> India
    ];

    function latLonToXYZ(lat: number, lon: number, r: number) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = lon * (Math.PI / 180);
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.cos(phi),
        z: r * Math.sin(phi) * Math.sin(theta),
      };
    }

    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.016;

      if (autoRotate) {
        rotY += 0.004;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Globe Atmosphere Outer Radial Glow
      const center2D = project(0, 0, 0);
      const glowGrad = ctx.createRadialGradient(
        center2D.x,
        center2D.y,
        globeRadius * 50,
        center2D.x,
        center2D.y,
        globeRadius * 140
      );
      glowGrad.addColorStop(0, 'rgba(6, 182, 212, 0.18)');
      glowGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.06)');
      glowGrad.addColorStop(1, 'rgba(5, 11, 24, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(center2D.x, center2D.y, globeRadius * 140, 0, Math.PI * 2);
      ctx.fill();

      // 2. Longitude Arcs
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
          if (p.z > -0.65) {
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

      // Latitude Circles
      for (let lat = -60; lat <= 60; lat += 30) {
        const phi = (90 - lat) * (Math.PI / 180);
        const r = globeRadius * Math.sin(phi);
        const y = globeRadius * Math.cos(phi);

        ctx.beginPath();
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.14;
        let isFirst = true;

        for (let a = 0; a <= 360; a += 15) {
          const theta = a * (Math.PI / 180);
          const p = project(r * Math.cos(theta), y, r * Math.sin(theta));
          if (p.z > -0.65) {
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

      // 3. Dual Orbital Security Perimeter Rings
      [
        { radius: 2.32, tiltX: 0.55, color: '#38bdf8', opacity: 0.32 },
        { radius: 2.62, tiltX: -0.42, color: '#06b6d4', opacity: 0.2 },
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

      // 4. Continent Landmass Nodes & Web Connections
      const projLandNodes = earthNodes.map((n) => ({
        ...project(n.x, n.y, n.z),
        isIndia: n.isIndia,
      }));

      // Render Network lines between close landmass nodes
      for (let i = 0; i < projLandNodes.length; i++) {
        if (projLandNodes[i].z < -0.3) continue;
        for (let j = i + 1; j < projLandNodes.length; j++) {
          if (projLandNodes[j].z < -0.3) continue;
          const dx = projLandNodes[i].x - projLandNodes[j].x;
          const dy = projLandNodes[i].y - projLandNodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 1200) {
            ctx.beginPath();
            ctx.moveTo(projLandNodes[i].x, projLandNodes[i].y);
            ctx.lineTo(projLandNodes[j].x, projLandNodes[j].y);
            ctx.strokeStyle = '#0284c7';
            ctx.lineWidth = 0.8;
            ctx.globalAlpha = Math.max(0.04, (1 - Math.sqrt(d2) / 35) * 0.22);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Draw Landmass Points
      projLandNodes.forEach((p) => {
        if (p.z > -0.6) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.z > 0 ? (p.isIndia ? 3 : 2) : 1.3, 0, Math.PI * 2);
          ctx.fillStyle = p.isIndia ? '#34d399' : p.z > 0.4 ? '#38bdf8' : '#0284c7';
          ctx.shadowColor = p.isIndia ? '#10b981' : '#38bdf8';
          ctx.shadowBlur = p.z > 0 ? 8 : 0;
          ctx.globalAlpha = p.z > 0 ? 0.9 : 0.35;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      });

      // 5. Threat Trajectory Arcs & Intercept Particle Beams
      threatArcs.forEach((arc) => {
        const start = latLonToXYZ(arc.startLat, arc.startLon, globeRadius);
        const end = latLonToXYZ(arc.endLat, arc.endLon, globeRadius);
        const pStart = project(start.x, start.y, start.z);
        const pEnd = project(end.x, end.y, end.z);

        const mid = {
          x: ((start.x + end.x) / 2) * 1.45,
          y: ((start.y + end.y) / 2) * 1.45 + 0.35,
          z: ((start.z + end.z) / 2) * 1.45,
        };
        const pMid = project(mid.x, mid.y, mid.z);

        if (pStart.z > -0.8 || pEnd.z > -0.8) {
          ctx.beginPath();
          ctx.moveTo(pStart.x, pStart.y);
          ctx.quadraticCurveTo(pMid.x, pMid.y, pEnd.x, pEnd.y);
          ctx.strokeStyle = arc.color;
          ctx.lineWidth = 1.4;
          ctx.globalAlpha = 0.55;
          ctx.stroke();
          ctx.globalAlpha = 1;

          // Flying particle bullet along arc
          const tPos = (time * arc.speed) % 1;
          const bx =
            (1 - tPos) * (1 - tPos) * pStart.x +
            2 * (1 - tPos) * tPos * pMid.x +
            tPos * tPos * pEnd.x;
          const by =
            (1 - tPos) * (1 - tPos) * pStart.y +
            2 * (1 - tPos) * tPos * pMid.y +
            tPos * tPos * pEnd.y;

          ctx.beginPath();
          ctx.arc(bx, by, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = arc.color;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 6. Home Security Beacon (India / Vadodara / Pune Coordinates)
      const indiaCoord = latLonToXYZ(19.5, 73.8, globeRadius);
      const pIndia = project(indiaCoord.x, indiaCoord.y, indiaCoord.z);

      if (pIndia.z > -0.5) {
        // Pulsing radar defense ring
        const pulseR = 8 + Math.sin(time * 4) * 4;
        ctx.beginPath();
        ctx.arc(pIndia.x, pIndia.y, pulseR, 0, Math.PI * 2);
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.8;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Core Beacon Dot
        ctx.beginPath();
        ctx.arc(pIndia.x, pIndia.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Coordinates Label Tag
        ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.fillStyle = '#6ee7b7';
        ctx.fillText('SOC_HQ: 19.07°N, 72.87°E', pIndia.x + 12, pIndia.y - 8);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(autoRotateTimeout);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      title="Interactive 3D Cyber Globe · Drag to Rotate"
    />
  );
};
