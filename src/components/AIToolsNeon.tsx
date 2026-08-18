'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface Tool {
  name: string;
  symbol: string;
  from: string;
  to: string;
  glow: string;
}

/* ─── Tools organised into 3 orbital rings ──────────────────── */
const innerTools: Tool[] = [
  { name: 'Claude',      symbol: '✦', from: '#92400e', to: '#fb923c', glow: '#f97316' },
  { name: 'Claude Code', symbol: '⌨', from: '#7c2d12', to: '#f97316', glow: '#fb923c' },
  { name: 'Lovable',     symbol: '♥', from: '#4c0519', to: '#ec4899', glow: '#f472b6' },
  { name: 'ChatGPT',     symbol: '⬡', from: '#064e3b', to: '#10b981', glow: '#10b981' },
];

const middleTools: Tool[] = [
  { name: 'Cursor',     symbol: '▶',  from: '#0f172a', to: '#2563eb', glow: '#60a5fa' },
  { name: 'Midjourney', symbol: 'Mj', from: '#171717', to: '#525252', glow: '#a3a3a3' },
  { name: 'n8n',        symbol: '⬡',  from: '#4c0519', to: '#f43f5e', glow: '#fb7185' },
  { name: 'Jasper AI',  symbol: 'J',  from: '#7c2d12', to: '#fb923c', glow: '#fdba74' },
  { name: 'Gamma',      symbol: 'γ',  from: '#3b0764', to: '#a855f7', glow: '#c084fc' },
  { name: 'Perplexity', symbol: '❋',  from: '#0f172a', to: '#475569', glow: '#94a3b8' },
];

const outerTools: Tool[] = [
  { name: 'Nano Banana', symbol: '🍌', from: '#713f12', to: '#facc15', glow: '#fde047' },
  { name: 'Kling AI',    symbol: '▶',  from: '#4a044e', to: '#a855f7', glow: '#c084fc' },
  { name: 'HeyGen',      symbol: '◉',  from: '#1e3a5f', to: '#3b82f6', glow: '#93c5fd' },
  { name: 'OpenAI SDK',  symbol: '⬡',  from: '#064e3b', to: '#059669', glow: '#34d399' },
  { name: 'Notion AI',   symbol: 'N',  from: '#262626', to: '#737373', glow: '#d4d4d4' },
  { name: 'Retell AI',   symbol: '🎙', from: '#042f2e', to: '#0d9488', glow: '#2dd4bf' },
];

const ICON_SIZE = 50;

/* ─── Individual tool icon ──────────────────────────────────── */
function ToolIcon({ tool }: { tool: Tool }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ width: ICON_SIZE, height: ICON_SIZE, position: 'relative', cursor: 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon tile */}
      <div
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${tool.from}, ${tool.to})`,
          boxShadow: hovered
            ? `0 0 22px ${tool.glow}90, 0 0 8px ${tool.glow}50`
            : `0 0 10px ${tool.glow}40`,
          border: '1px solid rgba(255,255,255,0.13)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          transform: hovered ? 'scale(1.18)' : 'scale(1)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        {/* Glass shine */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, transparent 55%)',
            borderRadius: 14,
          }}
        />
        <span
          style={{
            fontSize: 18,
            color: 'white',
            fontWeight: 'bold',
            position: 'relative',
            zIndex: 1,
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          {tool.symbol}
        </span>
      </div>

      {/* Tooltip */}
      <div
        style={{
          position: 'absolute',
          bottom: '115%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(5,8,22,0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 6,
          padding: '3px 8px',
          fontSize: 11,
          color: '#e2e8f0',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.15s',
          zIndex: 50,
        }}
      >
        {tool.name}
      </div>
    </div>
  );
}

/* ─── One orbital ring ──────────────────────────────────────── */
function OrbitalRing({
  tools,
  radius,
  speed,
  containerSize,
  direction = 'cw',
}: {
  tools: Tool[];
  radius: number;
  speed: number;
  containerSize: number;
  direction?: 'cw' | 'ccw';
}) {
  const [paused, setPaused] = useState(false);
  const center = containerSize / 2;
  const ringAnim    = direction === 'cw' ? 'orbit-cw'    : 'orbit-ccw';
  const counterAnim = direction === 'cw' ? 'counter-cw'  : 'counter-ccw';

  return (
    <>
      {/* Decorative orbit path */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: radius * 2,
          height: radius * 2,
          left: center - radius,
          top: center - radius,
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      />

      {/* Rotating ring container — same size as the outer container */}
      <div
        className="absolute inset-0"
        style={{
          animation: `${ringAnim} ${speed}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {tools.map((tool, i) => {
          // Evenly space tools starting from the top (-90°)
          const angleDeg = -90 + (360 / tools.length) * i;
          const angleRad = (angleDeg * Math.PI) / 180;
          const lx = center + radius * Math.cos(angleRad) - ICON_SIZE / 2;
          const ly = center + radius * Math.sin(angleRad) - ICON_SIZE / 2;

          return (
            <div
              key={tool.name}
              style={{
                position: 'absolute',
                left: lx,
                top: ly,
                width: ICON_SIZE,
                height: ICON_SIZE,
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Counter-rotate so the logo stays upright */}
              <div
                style={{
                  animation: `${counterAnim} ${speed}s linear infinite`,
                  animationPlayState: paused ? 'paused' : 'running',
                }}
              >
                <ToolIcon tool={tool} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ─── Responsive container dimensions ──────────────────────── */
function useOrbitalSize() {
  const [cfg, setCfg] = useState({ containerSize: 620, radii: [108, 198, 288] as [number, number, number] });

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 480) {
        setCfg({ containerSize: 320, radii: [58, 103, 146] });
      } else if (w < 768) {
        setCfg({ containerSize: 420, radii: [76, 138, 194] });
      } else if (w < 1024) {
        setCfg({ containerSize: 520, radii: [92, 168, 238] });
      } else {
        setCfg({ containerSize: 620, radii: [108, 198, 288] });
      }
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return cfg;
}

/* ─── Main section ──────────────────────────────────────────── */
export default function AIToolsNeon() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { containerSize, radii } = useOrbitalSize();
  const orbSize = Math.max(60, Math.round(containerSize * 0.122));

  return (
    <section
      ref={sectionRef}
      style={{ background: '#030a1c' }}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* CSS keyframes for orbital rotation */}
      <style>{`
        @keyframes orbit-cw    { from { transform: rotate(0deg);    } to { transform: rotate(360deg);   } }
        @keyframes orbit-ccw   { from { transform: rotate(0deg);    } to { transform: rotate(-360deg);  } }
        @keyframes counter-cw  { from { transform: rotate(0deg);    } to { transform: rotate(-360deg);  } }
        @keyframes counter-ccw { from { transform: rotate(0deg);    } to { transform: rotate(360deg);   } }
        @keyframes orb-pulse   {
          0%, 100% { box-shadow: 0 0 40px rgba(79,142,247,0.55), 0 0 80px rgba(124,58,237,0.28); }
          50%      { box-shadow: 0 0 65px rgba(79,142,247,0.80), 0 0 120px rgba(124,58,237,0.48); }
        }
      `}</style>

      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(88,28,135,0.13) 0%, transparent 70%)',
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 px-4 relative z-10"
      >
        <span className="text-sm font-semibold text-blue-400 tracking-widest uppercase">
          Powered By
        </span>
        <h2
          className="heading-font font-bold mt-3 text-white"
          style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
        >
          Our{' '}
          <em
            className="not-italic font-extrabold"
            style={{
              background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AI
          </em>{' '}
          Tool Stack
        </h2>
        <div className="section-underline" />
        <p className="text-slate-400 mt-6 max-w-xl mx-auto text-base leading-relaxed">
          The world&apos;s best AI tools powering every layer of your project
        </p>
      </motion.div>

      {/* Orbital system */}
      <motion.div
        initial={{ opacity: 0, scale: 0.82 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative mx-auto"
        style={{ width: containerSize, height: containerSize }}
      >
        {/* Center AI orb */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: orbSize,
            height: orbSize,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4F8EF7 0%, #7C3AED 55%, #06B6D4 100%)',
            animation: 'orb-pulse 3s ease-in-out infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            border: '2px solid rgba(255,255,255,0.18)',
          }}
        >
          <span
            style={{
              color: 'white',
              fontWeight: 900,
              fontSize: orbSize * 0.34,
              fontFamily: 'Outfit, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            AI
          </span>
        </div>

        {/* Ring 1 — inner, clockwise, fastest */}
        <OrbitalRing
          tools={innerTools}
          radius={radii[0]}
          speed={20}
          containerSize={containerSize}
          direction="cw"
        />

        {/* Ring 2 — middle, counter-clockwise */}
        <OrbitalRing
          tools={middleTools}
          radius={radii[1]}
          speed={34}
          containerSize={containerSize}
          direction="ccw"
        />

        {/* Ring 3 — outer, clockwise, slowest */}
        <OrbitalRing
          tools={outerTools}
          radius={radii[2]}
          speed={50}
          containerSize={containerSize}
          direction="cw"
        />
      </motion.div>

      {/* Hint */}
      <p className="text-center text-slate-600 text-xs mt-4 tracking-wide relative z-10">
        Hover any tool to pause its orbit
      </p>
    </section>
  );
}
