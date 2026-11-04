import React, { useEffect, useRef, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { Activity, Layers, Send, Maximize2, FileText } from 'lucide-react';

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

const STATIONS: StationInfo[] = [
  {
    tag: 'STATION 01 // GLOBAL CORE',
    title: 'Global Threat Defense Core',
    subtitle: 'Earth Hologram · Hyderabad Active Node',
    desc: '3rd-Year B.Tech Cyber Security at Siddhartha Institute of Technology & Sciences, Hyderabad. Specializing in SOC Operations, AWS Cloud Security, and Incident Investigation.',
    btnPrimaryText: 'Fly to SOC Lab →',
    targetRotX: 0.22, targetRotY: -0.55, targetZoom: 1.15,
    actionType: 'fly', nextStation: 1,
  },
  {
    tag: 'STATION 02 // SOC DEFENSE LAB',
    title: 'Interactive SOC Operations Station',
    subtitle: 'Dual-Curved Battle Station · Wazuh SIEM',
    desc: 'Simulated 3D dual-display SOC operations center. Real-time Wazuh SIEM threat stream, MITRE ATT&CK T1110 brute force defense, and AWS CloudTrail session monitoring.',
    btnPrimaryText: 'Inspect 3D Projects →',
    targetRotX: 0.42, targetRotY: -0.65, targetZoom: 1.05,
    actionType: 'fly', nextStation: 2,
  },
  {
    tag: 'STATION 03 // 3D PROJECT VAULT',
    title: 'Holographic Security Vault',
    subtitle: 'Architectural Defense Systems',
    desc: "Inspect 4 primary architectural projects: SentinelDesk (Full-Stack SOC), CloudShield (AWS Zero-Trust), NetSentinel (Bash/Nmap), and ML Fraud Detection.",
    btnPrimaryText: 'Open 3D Terminal →',
    targetRotX: 0.15, targetRotY: 0.1, targetZoom: 1.25,
    actionType: 'fly', nextStation: 3,
  },
  {
    tag: 'STATION 04 // 3D CYBER TERMINAL',
    title: 'Pedestal Console & CLI Gateway',
    subtitle: 'Real-Time Holographic Terminal',
    desc: 'Pedestal-mounted holographic terminal: whoami, nmap portfolio audit, cat resume.txt, and sudo hire-madhukar.',
    btnPrimaryText: 'Launch Live CLI [>_]',
    targetRotX: 0.35, targetRotY: -0.2, targetZoom: 1.18,
    actionType: 'terminal', nextStation: 4,
  },
  {
    tag: 'STATION 05 // TRANSMISSION NODE',
    title: 'Encrypted Dispatch Gateway',
    subtitle: 'Satellite Uplink · Direct Contact',
    desc: 'Encrypted satellite transmission node. Available for summer cybersecurity internships and SOC roles at madhukarpendalwar43@gmail.com.',
    btnPrimaryText: 'Back to Global Core ↺',
    targetRotX: 0.28, targetRotY: -0.45, targetZoom: 1.2,
    actionType: 'fly', nextStation: 0,
  },
];

export const CyberVerse3DView: React.FC<CyberVerse3DViewProps> = ({
  onOpenResume,
  onOpenTerminal,
  onExpandFullscreen,
  isFullscreen = false,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeStation, setActiveStation] = useState(0);
  const [autoOrbit, setAutoOrbit] = useState(true);

  // All mutable state lives in refs — no stale closure issues
  const stateRef = useRef({
    activeStation: 0,
    autoOrbit: true,
    rotX: STATIONS[0].targetRotX,
    rotY: STATIONS[0].targetRotY,
    zoom: STATIONS[0].targetZoom,
    targetRotX: STATIONS[0].targetRotX,
    targetRotY: STATIONS[0].targetRotY,
    targetZoom: STATIONS[0].targetZoom,
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });

  const flyToStation = (idx: number) => {
    stateRef.current.activeStation = idx;
    stateRef.current.targetRotX = STATIONS[idx].targetRotX;
    stateRef.current.targetRotY = STATIONS[idx].targetRotY;
    stateRef.current.targetZoom = STATIONS[idx].targetZoom;
    setActiveStation(idx);
  };

  const handlePrimaryAction = () => {
    const cur = STATIONS[activeStation];
    if (cur.actionType === 'terminal' && onOpenTerminal) {
      onOpenTerminal();
    } else {
      flyToStation(cur.nextStation);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    let animId = 0;
    let W = 800;
    let H = 500;

    function sizeCanvas() {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      W = Math.max(rect.width || window.innerWidth, 300);
      H = Math.max(rect.height || 500, 300);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      canvas!.style.width = W + 'px';
      canvas!.style.height = H + 'px';
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    }

    // Size immediately, then again after a tick (layout may not be settled)
    sizeCanvas();
    const t1 = setTimeout(sizeCanvas, 50);
    const t2 = setTimeout(sizeCanvas, 200);

    const ro = new ResizeObserver(sizeCanvas);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    window.addEventListener('resize', sizeCanvas, { passive: true });

    // ---- Interaction ----
    function onDown(e: PointerEvent) {
      stateRef.current.isDragging = true;
      stateRef.current.lastX = e.clientX;
      stateRef.current.lastY = e.clientY;
    }
    function onMove(e: PointerEvent) {
      if (!stateRef.current.isDragging) return;
      const dx = e.clientX - stateRef.current.lastX;
      const dy = e.clientY - stateRef.current.lastY;
      stateRef.current.targetRotY += dx * 0.007;
      stateRef.current.targetRotX = Math.max(-1.1, Math.min(1.1,
        stateRef.current.targetRotX + dy * 0.007));
      stateRef.current.lastX = e.clientX;
      stateRef.current.lastY = e.clientY;
    }
    function onUp() { stateRef.current.isDragging = false; }
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      stateRef.current.targetZoom = Math.max(0.6, Math.min(2.2,
        stateRef.current.targetZoom - e.deltaY * 0.001));
    }
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // ---- 3D Engine ----
    function project(x: number, y: number, z: number) {
      const { rotX, rotY, zoom } = stateRef.current;
      const y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
      const z1 = y * Math.sin(rotX) + z * Math.cos(rotX);
      const x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY);
      const z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY);
      const fov = Math.min(W, H) * 1.1;
      const dist = 5 / zoom;
      const sc = fov / (dist + z2);
      return { x: W / 2 + x2 * sc, y: H / 2 - y1 * sc, z: z2, s: sc };
    }

    function makeBox(bx: number, by: number, bz: number,
      w: number, h: number, d: number, fill: string, stroke?: string) {
      const hw = w / 2, hh = h / 2, hd = d / 2;
      const c = [
        [-hw,-hh,-hd],[hw,-hh,-hd],[hw,hh,-hd],[-hw,hh,-hd],
        [-hw,-hh, hd],[hw,-hh, hd],[hw,hh, hd],[-hw,hh, hd],
      ].map(([cx,cy,cz]) => project(bx+cx, by+cy, bz+cz));
      return [[0,1,2,3],[4,5,6,7],[3,2,6,7],[0,1,5,4],[0,3,7,4],[1,2,6,5]]
        .map(f => {
          const pts = f.map(i => c[i]);
          return { type:'poly' as const, pts, z: pts.reduce((s,p)=>s+p.z,0)/4, fill, stroke };
        });
    }

    // Build globe nodes once
    const GR = 2.0;
    const earthNodes: { x:number; y:number; z:number; india:boolean }[] = [];
    ([
      [15,65,-135,-60], [-50,10,-80,-35], [36,65,-10,40],
      [-32,35,-15,48],  [10,68,45,135],  [8,34,68,88],
      [-38,-12,115,150],
    ] as [number,number,number,number][]).forEach(([la0,la1,lo0,lo1]) => {
      const india = la0 === 8;
      const count = india ? 48 : 30;
      for (let i = 0; i < count; i++) {
        const lat = la0 + Math.random() * (la1 - la0);
        const lon = lo0 + Math.random() * (lo1 - lo0);
        const phi = (90 - lat) * Math.PI / 180;
        const th  = lon * Math.PI / 180;
        earthNodes.push({
          x: GR * Math.sin(phi) * Math.cos(th),
          y: GR * Math.cos(phi),
          z: GR * Math.sin(phi) * Math.sin(th),
          india,
        });
      }
    });

    let time = 0;

    function render() {
      animId = requestAnimationFrame(render);
      time += 0.016;

      const s = stateRef.current;
      s.rotX += (s.targetRotX - s.rotX) * 0.06;
      s.rotY += (s.targetRotY - s.rotY) * 0.06;
      s.zoom += (s.targetZoom - s.zoom) * 0.06;
      if (s.autoOrbit && !s.isDragging) s.targetRotY += 0.004;

      ctx.clearRect(0, 0, W, H);

      // Deep space background
      const bg = ctx.createRadialGradient(W/2,H/2,20, W/2,H/2, Math.max(W,H)*0.7);
      bg.addColorStop(0, '#091326');
      bg.addColorStop(0.5, '#050b16');
      bg.addColorStop(1, '#020409');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const drawables: any[] = [];
      const st = s.activeStation;

      // ============ STATION 0: GLOBE ============
      if (st === 0) {
        // Latitude rings
        for (let lat = -60; lat <= 60; lat += 30) {
          const phi = (90 - lat) * Math.PI / 180;
          const r = GR * Math.sin(phi);
          const ny = GR * Math.cos(phi);
          const pts = [];
          for (let a = 0; a <= 360; a += 15) {
            const rad = a * Math.PI / 180;
            pts.push(project(r * Math.cos(rad), ny, r * Math.sin(rad)));
          }
          drawables.push({ type: 'ring', pts, z: 0, color: '#0284c7', alpha: 0.22 });
        }
        // Longitude lines
        for (let lon = 0; lon < 360; lon += 30) {
          const rad = lon * Math.PI / 180;
          const pts = [];
          for (let lat = -90; lat <= 90; lat += 12) {
            const phi = (90 - lat) * Math.PI / 180;
            pts.push(project(
              GR*Math.sin(phi)*Math.cos(rad),
              GR*Math.cos(phi),
              GR*Math.sin(phi)*Math.sin(rad)
            ));
          }
          drawables.push({ type: 'ring', pts, z: 0, color: '#0369a1', alpha: 0.14 });
        }
        // Continent nodes
        earthNodes.forEach(n => {
          const p = project(n.x, n.y, n.z);
          if (p.z > -0.5)
            drawables.push({ type: 'dot', p, z: p.z, r: n.india ? 3.5 : 2.0,
              color: n.india ? '#10b981' : '#38bdf8' });
        });
        // Hyderabad beacon
        const hLat=17.385, hLon=78.487;
        const hPhi=(90-hLat)*Math.PI/180, hTh=hLon*Math.PI/180;
        const bp = project(GR*Math.sin(hPhi)*Math.cos(hTh), GR*Math.cos(hPhi), GR*Math.sin(hPhi)*Math.sin(hTh));
        if (bp.z > -0.5) drawables.push({ type: 'beacon', p: bp, z: bp.z+0.1 });
        // Orbit rings
        [{ r: 2.5, tilt: 0.5, c: '#38bdf8', a: 0.4 }, { r: 2.9, tilt: -0.4, c: '#06b6d4', a: 0.25 }]
          .forEach(ring => {
            const pts = [];
            for (let a = 0; a <= 360; a += 10) {
              const rad = a * Math.PI / 180;
              pts.push(project(Math.cos(rad)*ring.r, Math.sin(rad)*ring.r*Math.sin(ring.tilt), Math.sin(rad)*ring.r*Math.cos(ring.tilt)));
            }
            drawables.push({ type: 'ring', pts, z: 0, color: ring.c, alpha: ring.a });
          });
      }

      // ============ STATION 1: SOC LAB ============
      else if (st === 1) {
        // Grid floor
        for (let x = -3; x <= 3; x += 0.6) {
          const p1=project(x,-1.3,-3), p2=project(x,-1.3,3);
          drawables.push({ type:'line', p1, p2, z:(p1.z+p2.z)/2, color:'#0369a1', alpha:0.3 });
        }
        for (let z = -3; z <= 3; z += 0.6) {
          const p1=project(-3,-1.3,z), p2=project(3,-1.3,z);
          drawables.push({ type:'line', p1, p2, z:(p1.z+p2.z)/2, color:'#0369a1', alpha:0.3 });
        }
        // Desk surface
        drawables.push(...makeBox(0, 0, 0, 2.8, 0.09, 1.5, '#0b1324', '#06b6d4'));
        // Legs
        ([[-1.3,-0.65],[1.3,-0.65],[-1.3,0.65],[1.3,0.65]] as [number,number][])
          .forEach(([lx,lz]) => drawables.push(...makeBox(lx,-0.62,lz,0.08,1.2,0.08,'#111c30','#1e293b')));
        // Main monitor
        drawables.push(...makeBox(0, 0.56, -0.3, 1.5, 0.7, 0.05, '#050a14', '#06b6d4'));
        // Monitor screen face
        const ms = [[-0.7,0.24,-0.27],[0.7,0.24,-0.27],[0.7,0.86,-0.27],[-0.7,0.86,-0.27]].map(([a,b,c])=>project(a,b,c));
        drawables.push({ type:'screen', pts:ms, z:(ms[0].z+ms[2].z)/2, text:'SIEM TRIAGE: ACTIVE' });
        // Side monitor
        drawables.push(...makeBox(-1.0, 0.6, -0.18, 0.5, 0.85, 0.04, '#050a14', '#10b981'));
        // PC tower
        drawables.push(...makeBox(1.1, 0.4, -0.08, 0.38, 0.72, 0.68, '#070f1e', '#38bdf8'));
        // Keyboard
        drawables.push(...makeBox(-0.1, 0.07, 0.22, 0.75, 0.025, 0.28, '#050914', '#38bdf8'));
      }

      // ============ STATION 2: 3D PROJECT VAULT ============
      else if (st === 2) {
        const cards = [
          { title:'SentinelDesk', sub:'Full-Stack SOC Platform', x:-1.5, y:0.3, z:0, c:'#06b6d4' },
          { title:'CloudShield',  sub:'AWS Zero-Trust Infra',   x:0,    y:0.3, z:0.7, c:'#38bdf8' },
          { title:'NetSentinel',  sub:'Linux Nmap Audit',       x:1.5,  y:0.3, z:0, c:'#10b981' },
          { title:'ML Fraud Det', sub:'Precision Anomaly AI',   x:0,    y:0.3, z:-0.9, c:'#a855f7' },
        ];
        // Central ring
        const ring = [];
        for (let a=0; a<=360; a+=15) ring.push(project(Math.cos(a*Math.PI/180)*2.3, -1.1, Math.sin(a*Math.PI/180)*2.3));
        drawables.push({ type:'ring', pts:ring, z:0, color:'#06b6d4', alpha:0.5 });
        cards.forEach(card => {
          const bob = Math.sin(time*2 + card.x) * 0.1;
          drawables.push(...makeBox(card.x, card.y+bob, card.z, 1.0, 1.15, 0.08, '#081124', card.c));
          const cp = project(card.x, card.y+bob+0.12, card.z+0.05);
          drawables.push({ type:'label', p:cp, z:cp.z+0.1, title:card.title, sub:card.sub, color:card.c });
        });
      }

      // ============ STATION 3: TERMINAL PEDESTAL ============
      else if (st === 3) {
        drawables.push(...makeBox(0,-0.65,0, 0.85,1.25,0.85, '#0a1324','#06b6d4'));
        drawables.push(...makeBox(0, 0.46,0, 1.65,1.0,0.07, '#040813','#38bdf8'));
        const tp = [[-0.76,0.0,0.05],[0.76,0.0,0.05],[0.76,0.9,0.05],[-0.76,0.9,0.05]].map(([a,b,c])=>project(a,b,c));
        drawables.push({ type:'terminal', pts:tp, z:(tp[0].z+tp[2].z)/2 });
      }

      // ============ STATION 4: TRANSMISSION NODE ============
      else if (st === 4) {
        drawables.push(...makeBox(0,-0.85,0, 0.4,1.7,0.4, '#0c162b','#06b6d4'));
        const dish = [];
        for (let a=0; a<=360; a+=15) {
          const rad=a*Math.PI/180;
          dish.push(project(Math.cos(rad)*1.4, 0.65+Math.sin(rad)*0.45, Math.sin(rad)*1.4));
        }
        drawables.push({ type:'ring', pts:dish, z:0, color:'#38bdf8', alpha:0.75 });
        for (let w=0; w<3; w++) {
          const pr = 0.5+((time*1.5+w*0.6)%1.8);
          const wp=[];
          for (let a=0; a<=360; a+=20)
            wp.push(project(Math.cos(a*Math.PI/180)*pr, 1.5+pr*0.4, Math.sin(a*Math.PI/180)*pr));
          drawables.push({ type:'ring', pts:wp, z:0, color:'#34d399', alpha:Math.max(0.05, 1-pr/1.8) });
        }
      }

      // ---- Depth-sort & draw ----
      drawables.sort((a,b) => b.z - a.z);
      ctx.lineWidth = 1;

      drawables.forEach(d => {
        if (d.type === 'line') {
          ctx.beginPath(); ctx.moveTo(d.p1.x,d.p1.y); ctx.lineTo(d.p2.x,d.p2.y);
          ctx.strokeStyle=d.color; ctx.globalAlpha=d.alpha||1; ctx.stroke(); ctx.globalAlpha=1;
        } else if (d.type === 'ring') {
          ctx.beginPath();
          d.pts.forEach((p:any,i:number) => i===0 ? ctx.moveTo(p.x,p.y) : ctx.lineTo(p.x,p.y));
          ctx.strokeStyle=d.color; ctx.lineWidth=1.3; ctx.globalAlpha=d.alpha; ctx.stroke();
          ctx.globalAlpha=1; ctx.lineWidth=1;
        } else if (d.type === 'poly') {
          ctx.beginPath();
          d.pts.forEach((p:any,i:number) => i===0 ? ctx.moveTo(p.x,p.y) : ctx.lineTo(p.x,p.y));
          ctx.closePath(); ctx.fillStyle=d.fill; ctx.fill();
          if (d.stroke) { ctx.strokeStyle=d.stroke; ctx.lineWidth=1; ctx.stroke(); }
        } else if (d.type === 'dot') {
          ctx.beginPath(); ctx.arc(d.p.x,d.p.y,d.r,0,Math.PI*2);
          ctx.fillStyle=d.color; ctx.shadowColor=d.color; ctx.shadowBlur=5; ctx.fill(); ctx.shadowBlur=0;
        } else if (d.type === 'beacon') {
          const pulse=(Math.sin(time*4)+1)/2;
          ctx.beginPath(); ctx.arc(d.p.x,d.p.y, 7+pulse*12, 0, Math.PI*2);
          ctx.strokeStyle='#10b981'; ctx.lineWidth=1.5; ctx.stroke();
          ctx.beginPath(); ctx.arc(d.p.x,d.p.y, 4, 0, Math.PI*2);
          ctx.fillStyle='#34d399'; ctx.shadowColor='#34d399'; ctx.shadowBlur=10; ctx.fill(); ctx.shadowBlur=0;
          ctx.font='10px monospace'; ctx.fillStyle='#6ee7b7';
          ctx.fillText('Hyderabad [17.38°N, 78.49°E]', d.p.x+10, d.p.y-6);
        } else if (d.type === 'screen') {
          ctx.beginPath(); d.pts.forEach((p:any,i:number)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
          ctx.closePath(); ctx.fillStyle='#051022'; ctx.fill();
          ctx.strokeStyle='#06b6d4'; ctx.lineWidth=1.5; ctx.shadowColor='#06b6d4'; ctx.shadowBlur=10; ctx.stroke(); ctx.shadowBlur=0;
          const cx=(d.pts[0].x+d.pts[2].x)/2, cy=(d.pts[0].y+d.pts[2].y)/2;
          ctx.font='bold 10px monospace'; ctx.fillStyle='#38bdf8';
          ctx.fillText(d.text, cx-55, cy);
        } else if (d.type === 'label') {
          ctx.font='bold 11px monospace'; ctx.fillStyle=d.color; ctx.shadowColor=d.color; ctx.shadowBlur=7;
          ctx.fillText(d.title, d.p.x-40, d.p.y-8);
          ctx.font='9px monospace'; ctx.fillStyle='#cbd5e1'; ctx.shadowBlur=0;
          ctx.fillText(d.sub, d.p.x-40, d.p.y+9);
        } else if (d.type === 'terminal') {
          ctx.beginPath(); d.pts.forEach((p:any,i:number)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
          ctx.closePath(); ctx.fillStyle='#030814'; ctx.fill();
          ctx.strokeStyle='#38bdf8'; ctx.lineWidth=1.5; ctx.shadowColor='#38bdf8'; ctx.shadowBlur=12; ctx.stroke(); ctx.shadowBlur=0;
          const cx=(d.pts[0].x+d.pts[2].x)/2, cy=(d.pts[0].y+d.pts[2].y)/2;
          ctx.font='10px monospace';
          ctx.fillStyle='#34d399'; ctx.fillText('madhukar@soc:~$ whoami', cx-80, cy-20);
          ctx.fillStyle='#94a3b8';
          ctx.fillText('> B.Tech Cyber Security · Siddhartha Institute', cx-80, cy-5);
          ctx.fillStyle='#38bdf8'; ctx.fillText('> Target: SOC Analyst L1/L2 · Cloud Security', cx-80, cy+12);
          ctx.fillStyle='#34d399'; ctx.fillText('> sudo hire-madhukar [AVAILABLE]', cx-80, cy+28);
        }
      });
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(t1); clearTimeout(t2);
      ro.disconnect();
      window.removeEventListener('resize', sizeCanvas);
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('wheel', onWheel);
    };
  }, []);

  const cur = STATIONS[activeStation];

  // ---- UI ----
  return (
    <div
      style={{ height: isFullscreen ? '100%' : '540px' }}
      className="relative w-full flex flex-col overflow-hidden bg-[#030712] rounded-2xl border border-cyan-500/20 select-none shadow-2xl"
    >
      {/* Header Nav */}
      <div className="relative z-20 px-3 sm:px-4 py-2 bg-[#050c1c]/90 border-b border-cyan-500/20 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-cyan-500 text-slate-950 font-bold flex items-center justify-center font-mono text-[10px] shadow-[0_0_10px_rgba(6,182,212,0.5)]">3D</div>
          <div>
            <div className="text-white font-bold text-xs font-mono flex items-center gap-1.5">
              CYBERVERSE 3D
              <span className="text-[9px] px-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">LIVE</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono hidden sm:block">Siddhartha Institute · Hyderabad</div>
          </div>
        </div>

        <nav className="flex items-center gap-0.5 bg-[#02050e] p-1 rounded-xl border border-slate-800 text-[10px] font-mono overflow-x-auto">
          {STATIONS.map((s, idx) => (
            <button key={idx} type="button" onClick={() => flyToStation(idx)}
              className={`px-2 py-1 rounded-lg transition whitespace-nowrap cursor-pointer ${
                activeStation === idx
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}>
              0{idx+1}. {s.tag.split('// ')[1]}
            </button>
          ))}
        </nav>

        {onExpandFullscreen && !isFullscreen && (
          <button type="button" onClick={onExpandFullscreen}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 hover:text-white hover:border-cyan-500 transition cursor-pointer">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Canvas Wrapper — explicit height so canvas always has real pixels */}
      <div
        ref={wrapperRef}
        className="relative flex-1 w-full overflow-hidden"
        style={{ minHeight: 0 }}
      >
        <canvas
          ref={canvasRef}
          className="cursor-grab active:cursor-grabbing"
          style={{ display: 'block', position: 'absolute', top: 0, left: 0 }}
        />

        {/* Station HUD */}
        <div className="absolute bottom-3 left-3 max-w-xs sm:max-w-sm w-full bg-[#060f21]/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-3 z-20 font-mono text-xs pointer-events-auto">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] border border-cyan-800 mb-1">
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
            {cur.tag}
          </div>
          <div className="text-sm sm:text-base font-bold text-white mb-0.5">{cur.title}</div>
          <div className="text-[11px] text-cyan-400 mb-1">{cur.subtitle}</div>
          <p className="text-slate-300 text-[10px] leading-relaxed mb-2">{cur.desc}</p>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
            <button type="button" onClick={handlePrimaryAction}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md shadow-cyan-500/20 transition">
              {cur.btnPrimaryText}
            </button>
            {activeStation === 0 && onOpenResume && (
              <button type="button" onClick={onOpenResume}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white text-xs cursor-pointer transition flex items-center gap-1">
                <FileText className="w-3 h-3 text-cyan-400" /> Resume
              </button>
            )}
            {activeStation === 1 && (
              <a href="#soc" className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white text-xs cursor-pointer transition flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-400" /> SOC Dashboard
              </a>
            )}
            {activeStation === 2 && (
              <a href="#projects" className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white text-xs cursor-pointer transition flex items-center gap-1">
                <Layers className="w-3 h-3 text-cyan-400" /> All Projects
              </a>
            )}
            {activeStation === 4 && (
              <a href={`mailto:${PERSONAL_INFO.email}`} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white text-xs cursor-pointer transition flex items-center gap-1">
                <Send className="w-3 h-3 text-cyan-400" /> Email
              </a>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-3 right-3 z-20 bg-[#060f21]/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-2 font-mono text-[10px] text-slate-400 hidden sm:flex flex-col gap-1">
          <div className="text-white font-bold text-xs border-b border-slate-800 pb-1 flex justify-between">
            3D CONTROLS <span className="text-cyan-400">360°</span>
          </div>
          <div>• Drag to orbit</div>
          <div>• Scroll to zoom</div>
          <div className="pt-1 border-t border-slate-800 flex gap-1.5">
            <button type="button" onClick={() => { stateRef.current.autoOrbit = !stateRef.current.autoOrbit; setAutoOrbit(p => !p); }}
              className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 cursor-pointer">
              Orbit: {autoOrbit ? 'ON' : 'OFF'}
            </button>
            <button type="button" onClick={() => { const s=STATIONS[activeStation]; stateRef.current.targetRotX=s.targetRotX; stateRef.current.targetRotY=s.targetRotY; }}
              className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 cursor-pointer">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
