'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

// ─── Interfaces ───────────────────────────────────────────────
interface TeamMember {
  name: string;
  role: string;
  accent: string;
  image: string;
  initials: string;
}

interface AITool {
  name: string;
  role: string;
  bg: string;
  border: string;
  glowColor: string;
  lc: string;
  symbol: string;
}

interface SVGLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  isFront: boolean;
}

// ─── Data ─────────────────────────────────────────────────────
const teamMembers: TeamMember[] = [
  { name: 'Ummay Kulsoom', role: 'CEO & Founder',     accent: '#00d4ff', image: '/images/ummay-profile.png',  initials: 'UK' },
  { name: 'Ms Laiqa',      role: 'Graphic Designer',  accent: '#ff55bb', image: '/images/team/designer.jpg', initials: 'ML' },
  { name: 'Ms Sumira',     role: 'Content Writer',    accent: '#c050ff', image: '/images/team/writer.jpg',   initials: 'MS' },
  { name: 'Mr Ameer',      role: 'Marketing Manager', accent: '#ffc000', image: '/images/team/marketing.jpg',initials: 'MA' },
  { name: 'Mr Bilal',      role: 'SEO Expert',        accent: '#00ffaa', image: '/images/team/seo.jpg',      initials: 'MB' },
];

const aiTools: AITool[] = [
  { name: 'Claude',      role: 'Core AI · Anthropic',  bg: 'linear-gradient(135deg,#7a3520,#cc785c)', border: 'rgba(204,120,92,0.65)',  glowColor: '#cc785c', lc: '#cc785c', symbol: '✦' },
  { name: 'OpenClaw',    role: 'AI Agent · Lobster',   bg: 'linear-gradient(135deg,#7f1d1d,#dc2626)', border: 'rgba(239,68,68,0.65)',   glowColor: '#ef4444', lc: '#ef4444', symbol: '🦞' },
  { name: 'Paperclip',   role: 'Multi-Agent Ops',      bg: 'linear-gradient(135deg,#1e293b,#334155)', border: 'rgba(148,163,184,0.65)', glowColor: '#94a3b8', lc: '#94a3b8', symbol: '📎' },
  { name: 'Antigravity', role: 'Google Agent IDE',     bg: 'linear-gradient(135deg,#1a237e,#4285f4)', border: 'rgba(66,133,244,0.65)',  glowColor: '#4285f4', lc: '#4285f4', symbol: '↑' },
  { name: 'Kiro',        role: 'Amazon AWS IDE',       bg: 'linear-gradient(135deg,#7c2d00,#ff9900)', border: 'rgba(255,153,0,0.65)',   glowColor: '#ff9900', lc: '#ff9900', symbol: '▶' },
];

const particles = [
  { top: '10%', left: '5%',  color: '#00d4ff', size: 5, dur: '7s',   delay: '0s'   },
  { top: '70%', left: '3%',  color: '#a855f7', size: 3, dur: '9s',   delay: '1s'   },
  { top: '30%', left: '95%', color: '#ff55bb', size: 6, dur: '8s',   delay: '0.5s' },
  { top: '80%', left: '90%', color: '#00ffaa', size: 4, dur: '6s',   delay: '2s'   },
  { top: '50%', left: '50%', color: '#ffc000', size: 3, dur: '7s',   delay: '3s'   },
  { top: '20%', left: '80%', color: '#4285f4', size: 5, dur: '8s',   delay: '1.5s' },
  { top: '90%', left: '20%', color: '#cc785c', size: 4, dur: '9s',   delay: '0.8s' },
  { top: '15%', left: '40%', color: '#c050ff', size: 3, dur: '6s',   delay: '2.5s' },
];

// ─── Component ────────────────────────────────────────────────
export default function OurAITeam() {
  const [activeIdx,    setActiveIdx]    = useState(0);
  const [frontIdx,     setFrontIdx]     = useState(0);
  const [hoveredLeft,  setHoveredLeft]  = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);
  const [imgErrors,    setImgErrors]    = useState<boolean[]>(
    () => new Array(teamMembers.length).fill(false)
  );
  const [lines, setLines]   = useState<SVGLine[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const orbRef          = useRef<HTMLDivElement>(null);
  const cardRefs        = useRef<(HTMLDivElement | null)[]>([]);
  const svgWrapRef      = useRef<HTMLDivElement>(null);
  const outerRef        = useRef<HTMLDivElement>(null);

  // ── Auto-cycle team member every 2s
  useEffect(() => {
    if (hoveredLeft) return;
    const t = setInterval(() => setActiveIdx(i => (i + 1) % teamMembers.length), 2000);
    return () => clearInterval(t);
  }, [hoveredLeft]);

  // ── Auto-cycle front AI tool every 2.2s
  useEffect(() => {
    if (hoveredRight) return;
    const t = setInterval(() => setFrontIdx(i => (i + 1) % aiTools.length), 2200);
    return () => clearInterval(t);
  }, [hoveredRight]);

  // ── Calculate SVG lines from orb edge to each card's left side
  const calcLines = useCallback(() => {
    if (!orbRef.current || !svgWrapRef.current) return;
    const svgRect = svgWrapRef.current.getBoundingClientRect();
    const orbRect = orbRef.current.getBoundingClientRect();
    const orbCX   = orbRect.left + orbRect.width  / 2 - svgRect.left;
    const orbCY   = orbRect.top  + orbRect.height / 2 - svgRect.top;
    const orbR    = orbRect.width / 2;

    const newLines: SVGLine[] = [];
    aiTools.forEach((tool, i) => {
      const card = cardRefs.current[i];
      if (!card) return;
      const cr = card.getBoundingClientRect();
      const cx = cr.left - svgRect.left;          // card left edge
      const cy = cr.top  + cr.height / 2 - svgRect.top;
      const dx = cx - orbCX;
      const dy = cy - orbCY;
      const angle = Math.atan2(dy, dx);
      newLines.push({
        x1: orbCX + orbR * Math.cos(angle),
        y1: orbCY + orbR * Math.sin(angle),
        x2: cx,
        y2: cy,
        color: tool.glowColor,
        isFront: i === frontIdx,
      });
    });
    setLines(newLines);
  }, [frontIdx]);

  useEffect(() => {
    calcLines();
    const ro = new ResizeObserver(calcLines);
    if (svgWrapRef.current) ro.observe(svgWrapRef.current);
    window.addEventListener('scroll', calcLines, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', calcLines);
    };
  }, [calcLines]);

  const handleImgError = (i: number) => {
    setImgErrors(prev => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  };

  return (
    <section
      style={{ background: '#0a0a0f' }}
      className="relative py-24 overflow-hidden"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');

        @keyframes spinCW   { from{transform:rotate(0deg)}   to{transform:rotate(360deg)}   }
        @keyframes spinCCW  { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)}  }
        @keyframes orbitRng { from{transform:rotate(0deg)}   to{transform:rotate(360deg)}   }
        @keyframes floatOrb { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes floatPrt {
          0%   { transform:translateY(0)    scale(1);   opacity:0.6; }
          100% { transform:translateY(-80px) scale(0.5); opacity:0;   }
        }
        @keyframes pO {
          0%   { transform:scale(1);   opacity:0.7; }
          100% { transform:scale(2.8); opacity:0;   }
        }
        @keyframes shimmerLine { 0%{opacity:0.3} 50%{opacity:0.7} 100%{opacity:0.3} }
      `}</style>

      {/* Background dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,180,255,0.04) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
      }} />

      {/* Ambient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)',
        transform: 'translate(-30%,-30%)',
      }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(0,180,255,0.06), transparent 70%)',
        transform: 'translate(30%,30%)',
      }} />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none" style={{
          top: p.top, left: p.left, width: p.size, height: p.size,
          background: p.color, boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          animation: `floatPrt ${p.dur} ease-in ${p.delay} infinite`,
        }} />
      ))}

      {/* ─── Section Header ─── */}
      <div className="text-center mb-16 px-4 relative z-10">
        <div style={{
          color: 'rgba(0,200,255,0.8)', fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
        }}>
          // our_ai_team — human + artificial intelligence
        </div>
        <h2 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800,
          fontSize: 'clamp(28px,4vw,42px)', color: '#fff', marginTop: 12,
        }}>
          Our{' '}
          <span style={{ color: '#cc785c' }}>AI</span>{' '}
          Team
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.45)', marginTop: 12, fontSize: 15,
          fontFamily: 'DM Sans, sans-serif', fontWeight: 300,
        }}>
          Real humans + cutting-edge AI tools = extraordinary results
        </p>
      </div>

      {/* ─── Layout (responsive) ─── */}
      <div
        ref={outerRef}
        className="max-w-7xl mx-auto px-4 relative z-10"
        style={
          isMobile
            ? { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }
            : { display: 'flex', alignItems: 'center', gap: 20, minHeight: 380 }
        }
      >
        {/* SVG overlay — desktop only */}
        <div
          ref={svgWrapRef}
          style={{
            position: 'absolute', inset: 0,
            pointerEvents: 'none', overflow: 'visible', zIndex: 5,
            display: isMobile ? 'none' : 'block',
          }}
        >
          <svg
            width="100%" height="100%"
            style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
          >
            <defs>
              {lines.map((_, i) => (
                <filter key={`dg-${i}`} id={`dg-${i}`} x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              ))}
            </defs>
            {lines.map((l, i) => {
              const sw   = l.isFront ? 2.8 : 1.4;
              const pid  = `lp-${i}`;
              const dur  = l.isFront ? '1.3s' : '2.2s';
              const dop  = l.isFront ? 0.85 : 0.35;
              return (
                <g key={i}>
                  {/* glow copy */}
                  <line
                    x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                    stroke={l.color}
                    strokeWidth={l.isFront ? 9 : 4}
                    opacity={l.isFront ? 0.18 : 0.08}
                    style={{ filter: `blur(${l.isFront ? 5 : 2}px)` }}
                  />
                  {/* dashed line */}
                  <line
                    x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                    stroke={l.color} strokeWidth={sw}
                    strokeDasharray="9 6" opacity={dop}
                  />
                  {/* endpoint dots */}
                  <circle cx={l.x1} cy={l.y1} r={l.isFront ? 3 : 1.5}
                    fill={l.color} opacity={0.8} filter={`url(#dg-${i})`} />
                  <circle cx={l.x2} cy={l.y2} r={l.isFront ? 3 : 1.5}
                    fill={l.color} opacity={0.8} filter={`url(#dg-${i})`} />
                  {/* traveling packet */}
                  <path id={pid} d={`M${l.x1},${l.y1} L${l.x2},${l.y2}`} fill="none" stroke="none" />
                  <circle r={l.isFront ? 4 : 2.5} fill="white" opacity={l.isFront ? 0.9 : 0.4}
                    filter={`url(#dg-${i})`}>
                    <animateMotion dur={dur} repeatCount="indefinite" calcMode="linear">
                      <mpath href={`#${pid}`} />
                    </animateMotion>
                  </circle>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ── LEFT: Human Team Cards ── */}
        <div
          style={isMobile
            ? { width: '100%', maxWidth: 340, zIndex: 10 }
            : { width: 200, flexShrink: 0, zIndex: 10 }
          }
          onMouseEnter={() => setHoveredLeft(true)}
          onMouseLeave={() => setHoveredLeft(false)}
          className="flex flex-col gap-3"
        >
          {teamMembers.map((m, i) => {
            const isActive = i === activeIdx;
            return (
              <div
                key={m.name}
                onClick={() => setActiveIdx(i)}
                className="relative flex items-center cursor-pointer select-none"
                style={{ height: 52 }}
              >
                {/* Photo circle */}
                <div
                  className="relative z-20 flex-shrink-0"
                  style={{
                    width: 52, height: 52, borderRadius: '50%', overflow: 'hidden',
                    border: `2.5px solid ${isActive ? m.accent : 'rgba(255,255,255,0.15)'}`,
                    boxShadow: isActive ? `0 0 14px ${m.accent}88` : 'none',
                    transition: 'border-color 0.35s, box-shadow 0.35s',
                    background: `${m.accent}22`,
                  }}
                >
                  {!imgErrors[i] ? (
                    <Image
                      src={m.image}
                      alt={m.name}
                      width={52}
                      height={52}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      onError={() => handleImgError(i)}
                    />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `linear-gradient(135deg, ${m.accent}44, ${m.accent}22)`,
                      color: m.accent,
                      fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 13,
                    }}>
                      {m.initials}
                    </div>
                  )}
                </div>

                {/* Info panel */}
                <div
                  style={{
                    position: 'relative', flex: 1,
                    marginLeft: -18, paddingLeft: 28, paddingRight: 10,
                    paddingTop: 7, paddingBottom: 7,
                    background: 'linear-gradient(135deg,#0f2a5a,#0a1e44)',
                    borderRadius: 12,
                    border: `1px solid ${isActive ? m.accent + '55' : 'rgba(255,255,255,0.06)'}`,
                    transition: 'border-color 0.35s',
                    minHeight: 40, overflow: 'hidden',
                  }}
                >
                  {/* Top shimmer line */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                    background: `linear-gradient(to right, transparent, ${m.accent}88, transparent)`,
                    animation: 'shimmerLine 2s ease-in-out infinite',
                  }} />
                  <div style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 10.5,
                    color: isActive ? m.accent : '#fff',
                    transition: 'color 0.35s',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    lineHeight: 1.2,
                  }}>
                    {m.name}
                  </div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif', fontWeight: 400, fontSize: 9,
                    color: 'rgba(255,255,255,0.4)', marginTop: 2,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {m.role}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CENTER: Glowing AI Orb ── */}
        <div
          className="flex items-center justify-center"
          style={isMobile
            ? { width: '100%', zIndex: 10, minHeight: 180, order: -1 }
            : { flex: 1, zIndex: 10, minHeight: 380 }
          }
        >
          <div
            ref={orbRef}
            style={{
              width: 130, height: 130, borderRadius: '50%',
              position: 'relative', flexShrink: 0,
              animation: 'floatOrb 4s ease-in-out infinite',
            }}
          >
            {/* Pulse rings */}
            {[0, 1, 2].map(j => (
              <div key={j} style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                border: '1.5px solid rgba(0,200,255,0.35)',
                animation: `pO 3s ease-out ${j}s infinite`,
                pointerEvents: 'none',
              }} />
            ))}

            {/* Dashed orbit ring */}
            <div style={{
              position: 'absolute', inset: -22, borderRadius: '50%',
              border: '1.5px dashed rgba(0,200,255,0.25)',
              animation: 'orbitRng 16s linear infinite',
              pointerEvents: 'none',
            }} />

            {/* Conic ring CW */}
            <div style={{
              position: 'absolute', inset: -7, borderRadius: '50%',
              background: 'conic-gradient(transparent 0deg, rgba(0,200,255,0.7) 90deg, transparent 180deg)',
              animation: 'spinCW 2.8s linear infinite',
              pointerEvents: 'none',
            }} />

            {/* Conic ring CCW */}
            <div style={{
              position: 'absolute', inset: -11, borderRadius: '50%',
              background: 'conic-gradient(transparent 0deg, rgba(120,80,255,0.55) 120deg, transparent 240deg)',
              animation: 'spinCCW 5s linear infinite',
              pointerEvents: 'none',
            }} />

            {/* Orb body */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #00e5ff, #0080ff 38%, #6030c0 68%, #1a0040)',
              border: '2px solid rgba(0,200,255,0.75)',
              boxShadow: '0 0 35px rgba(0,180,255,0.6), 0 0 80px rgba(0,120,255,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              {/* Glass shine overlay */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 55%)',
                pointerEvents: 'none',
              }} />
              {/* AI text */}
              <span style={{
                fontFamily: 'Orbitron, monospace',
                fontWeight: 900, fontSize: 34, color: '#fff',
                textShadow: '0 0 20px #00e5ff, 0 0 40px #0080ff',
                zIndex: 1, userSelect: 'none', lineHeight: 1,
              }}>
                AI
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: AI Tool Cards ── */}
        <div
          style={isMobile
            ? { width: '100%', maxWidth: 340, zIndex: 10 }
            : { width: 185, flexShrink: 0, zIndex: 10 }
          }
          onMouseEnter={() => setHoveredRight(true)}
          onMouseLeave={() => setHoveredRight(false)}
          className="flex flex-col gap-3"
        >
          {aiTools.map((tool, i) => {
            const diff        = Math.abs(i - frontIdx);
            const wrappedDiff = Math.min(diff, aiTools.length - diff);
            const isFront     = i === frontIdx;
            const scaleVal    = isFront ? 1.10 : wrappedDiff === 1 ? 0.97 : 0.86;
            const opacityVal  = isFront ? 1    : wrappedDiff === 1 ? 0.88 : 0.60;
            const glowShadow  = isFront
              ? `0 0 18px ${tool.glowColor}66, 0 0 6px ${tool.glowColor}33`
              : 'none';

            return (
              <div
                key={tool.name}
                ref={el => { cardRefs.current[i] = el; }}
                onClick={() => setFrontIdx(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 10px 6px 9px',
                  borderRadius: 10,
                  backdropFilter: 'blur(14px)',
                  background: 'rgba(4,12,42,0.88)',
                  border: `1px solid ${tool.border}`,
                  boxShadow: glowShadow,
                  transform: `scale(${scaleVal})`,
                  opacity: opacityVal,
                  transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s, box-shadow 0.35s',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Left accent strip */}
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                  background: tool.lc,
                  borderRadius: '10px 0 0 10px',
                  boxShadow: `0 0 8px ${tool.lc}88`,
                }} />

                {/* Logo box */}
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: tool.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', position: 'relative', overflow: 'hidden',
                  boxShadow: `0 0 10px ${tool.glowColor}44`,
                  fontSize: 14,
                }}>
                  {/* Spinning ring */}
                  <div style={{
                    position: 'absolute', inset: -2, borderRadius: 10,
                    border: '1.5px solid transparent',
                    borderTop: `1.5px solid ${tool.glowColor}`,
                    borderRight: `1.5px solid ${tool.glowColor}88`,
                    animation: 'spinCW 3s linear infinite',
                  }} />
                  {/* Glass shine */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.22) 0%, transparent 55%)',
                    pointerEvents: 'none',
                  }} />
                  <span style={{ position: 'relative', zIndex: 1, lineHeight: 1 }}>
                    {tool.symbol}
                  </span>
                </div>

                {/* Text */}
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 9.5,
                    color: '#fff',
                    textShadow: `0 0 8px ${tool.glowColor}88`,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    lineHeight: 1.3,
                  }}>
                    {tool.name}
                  </div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif', fontWeight: 400, fontSize: 7,
                    color: 'rgba(255,255,255,0.4)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {tool.role}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
