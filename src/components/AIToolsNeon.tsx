'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Tool {
  name: string;
  symbol: string;
  gradientFrom: string;
  gradientTo: string;
  glow: string;
}

interface Category {
  label: string;
  accentColor: string;
  tools: Tool[];
}

const categories: Category[] = [
  {
    label: 'General Assistants',
    accentColor: '#f59e0b',
    tools: [
      { name: 'Claude',      symbol: '✦', gradientFrom: '#92400e', gradientTo: '#fb923c', glow: '#f97316' },
      { name: 'ChatGPT',     symbol: '⬡', gradientFrom: '#064e3b', gradientTo: '#10b981', glow: '#10b981' },
      { name: 'Perplexity',  symbol: '❋', gradientFrom: '#0f172a', gradientTo: '#475569', glow: '#94a3b8' },
    ],
  },
  {
    label: 'Development',
    accentColor: '#60a5fa',
    tools: [
      { name: 'Claude Code', symbol: '⌨', gradientFrom: '#7c2d12', gradientTo: '#f97316', glow: '#fb923c' },
      { name: 'Lovable',     symbol: '♥', gradientFrom: '#4c0519', gradientTo: '#ec4899', glow: '#f472b6' },
      { name: 'Cursor',      symbol: '▶', gradientFrom: '#0f172a', gradientTo: '#2563eb', glow: '#60a5fa' },
    ],
  },
  {
    label: 'Design & Visuals',
    accentColor: '#c084fc',
    tools: [
      { name: 'Nano Banana', symbol: '🍌', gradientFrom: '#713f12', gradientTo: '#facc15', glow: '#fde047' },
      { name: 'Midjourney',  symbol: 'Mj', gradientFrom: '#171717', gradientTo: '#525252', glow: '#a3a3a3' },
      { name: 'Kling AI',    symbol: '▶', gradientFrom: '#4a044e', gradientTo: '#a855f7', glow: '#c084fc' },
      { name: 'HeyGen',      symbol: '◉', gradientFrom: '#1e3a5f', gradientTo: '#3b82f6', glow: '#93c5fd' },
    ],
  },
  {
    label: 'Marketing',
    accentColor: '#fdba74',
    tools: [
      { name: 'Jasper AI',  symbol: 'J', gradientFrom: '#7c2d12', gradientTo: '#fb923c', glow: '#fdba74' },
      { name: 'Gamma',      symbol: 'γ', gradientFrom: '#3b0764', gradientTo: '#a855f7', glow: '#c084fc' },
    ],
  },
  {
    label: 'Automation',
    accentColor: '#2dd4bf',
    tools: [
      { name: 'n8n',        symbol: '⬡', gradientFrom: '#4c0519', gradientTo: '#f43f5e', glow: '#fb7185' },
      { name: 'OpenAI SDK', symbol: '⬡', gradientFrom: '#064e3b', gradientTo: '#059669', glow: '#34d399' },
      { name: 'Notion AI',  symbol: 'N',  gradientFrom: '#262626', gradientTo: '#737373', glow: '#d4d4d4' },
      { name: 'Retell AI',  symbol: '🎙', gradientFrom: '#042f2e', gradientTo: '#0d9488', glow: '#2dd4bf' },
    ],
  },
];

// Precompute global stagger index per tool
const toolDelays: Map<string, number> = new Map();
let idx = 0;
categories.forEach((cat) => cat.tools.forEach((t) => { toolDelays.set(t.name, idx++); }));

const particles = [
  { size: 6,  top: '12%', left: '8%',  color: '#22d3ee', duration: '6s',   delay: '0s'   },
  { size: 4,  top: '65%', left: '4%',  color: '#a855f7', duration: '8s',   delay: '1.2s' },
  { size: 8,  top: '35%', left: '92%', color: '#ec4899', duration: '7s',   delay: '0.5s' },
  { size: 5,  top: '80%', left: '88%', color: '#34d399', duration: '9s',   delay: '2s'   },
  { size: 3,  top: '25%', left: '50%', color: '#f59e0b', duration: '6.5s', delay: '3s'   },
  { size: 7,  top: '55%', left: '75%', color: '#60a5fa', duration: '7.5s', delay: '1s'   },
  { size: 4,  top: '90%', left: '30%', color: '#c084fc', duration: '8.5s', delay: '2.5s' },
  { size: 5,  top: '18%', left: '70%', color: '#fb923c', duration: '6s',   delay: '0.8s' },
  { size: 3,  top: '48%', left: '18%', color: '#2dd4bf', duration: '9s',   delay: '1.8s' },
  { size: 6,  top: '72%', left: '55%', color: '#f472b6', duration: '7s',   delay: '3.5s' },
];

function NeonIcon({ tool, inView }: { tool: Tool; inView: boolean }) {
  const staggerDelay = 0.15 + (toolDelays.get(tool.name) ?? 0) * 0.06;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.4, delay: staggerDelay }}
      className="flex flex-col items-center gap-2 group"
    >
      {/* Icon wrapper */}
      <div className="relative" style={{ width: 68, height: 68 }}>
        {/* Spinning neon ring */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `conic-gradient(transparent 0deg, ${tool.glow}cc 120deg, transparent 240deg)`,
            animation: 'neonSpin 4s linear infinite',
            opacity: 0.55,
          }}
        />
        {/* Icon background */}
        <div
          className="absolute inset-[2px] rounded-2xl flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
          style={{
            background: `linear-gradient(135deg, ${tool.gradientFrom}, ${tool.gradientTo})`,
            boxShadow: `0 0 18px ${tool.glow}70, 0 0 6px ${tool.glow}40`,
          }}
        >
          {/* Glass shine */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, transparent 50%)',
              borderRadius: '14px',
            }}
          />
          <span className="relative z-10 text-white font-bold text-xl leading-none select-none">
            {tool.symbol}
          </span>
        </div>
      </div>
      {/* Tool name */}
      <span className="text-slate-400 text-[10px] font-medium text-center leading-tight max-w-[72px]">
        {tool.name}
      </span>
    </motion.div>
  );
}

export default function AIToolsNeon() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      style={{ background: '#030a1c' }}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <style>{`
        @keyframes neonSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes floatUp {
          0%   { transform: translateY(0px) scale(1);    opacity: 0.6; }
          100% { transform: translateY(-80px) scale(0.5); opacity: 0;   }
        }
      `}</style>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animation: `floatUp ${p.duration} ease-in ${p.delay} infinite`,
          }}
        />
      ))}

      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(88,28,135,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 px-4 relative z-10"
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

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col gap-12">
        {categories.map((cat, catIdx) => (
          <div key={cat.label}>
            {/* Category pill */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * catIdx }}
              className="flex items-center gap-3 mb-6"
            >
              <span
                className="px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: `${cat.accentColor}40`,
                  color: cat.accentColor,
                  boxShadow: `0 0 12px ${cat.accentColor}20`,
                }}
              >
                {cat.label}
              </span>
              <div
                className="flex-1 h-px"
                style={{
                  background: `linear-gradient(to right, ${cat.accentColor}40, transparent)`,
                }}
              />
            </motion.div>

            {/* Icons row */}
            <div className="flex flex-wrap gap-6">
              {cat.tools.map((tool) => (
                <NeonIcon key={tool.name} tool={tool} inView={inView} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
