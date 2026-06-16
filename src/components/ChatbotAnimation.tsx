'use client';
import React from 'react';
import { Stage, Sprite, useTimeline, useSprite } from './StageAnimation';

function TechRingBase() {
  return (
    <div className="absolute left-1/2 top-[75%] -translate-x-1/2 -translate-y-1/2 z-[1]">
       <svg width="300" height="150" viewBox="0 0 300 150">
          <ellipse cx="150" cy="75" rx="120" ry="35" fill="none" stroke="rgba(236, 72, 153, 0.2)" strokeWidth="1" />
          <ellipse cx="150" cy="75" rx="80" ry="22" fill="none" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="2" />
          <ellipse cx="150" cy="75" rx="40" ry="12" fill="rgba(236, 72, 153, 0.1)" stroke="rgba(236, 72, 153, 0.8)" strokeWidth="2" />

          {/* Upward Glow */}
          <polygon points="110,75 190,75 250,-150 50,-150" fill="url(#beam-grad)" opacity="0.1" />
          <defs>
            <linearGradient id="beam-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
       </svg>
    </div>
  );
}

function GlassChatWindow() {
  const { time } = useTimeline() as any;
  const bobbingY = Math.sin(time * Math.PI * 2 / 4) * 12;

  return (
    <div 
      style={{ transform: `translate(-50%, calc(-50% + ${bobbingY}px))` }} 
      className="absolute left-1/2 top-[45%] z-10 w-[220px] h-[340px] bg-[#0a0b0f]/80 backdrop-blur-xl rounded-[2rem] shadow-[0_0_40px_rgba(236,72,153,0.15)] border border-white/20 flex flex-col overflow-hidden"
    >
      <div className="h-12 border-b border-white/10 flex items-center px-4 gap-3 bg-white/5 relative z-10">
         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 shadow-[0_0_15px_rgba(236,72,153,0.4)] border border-white/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white/80"></div>
         </div>
         <div className="flex flex-col gap-1.5">
            <div className="w-16 h-2 rounded-full bg-white/30"></div>
            <div className="w-8 h-1.5 rounded-full bg-emerald-400/80"></div>
         </div>
      </div>
      
      <div className="flex-1 p-4 flex flex-col gap-4 relative">
         <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent"></div>
         
         {/* User Bubble */}
         <div className="self-end max-w-[80%] rounded-2xl rounded-tr-sm bg-white/10 border border-white/5 p-3 flex flex-col gap-2 relative z-10">
            <div className="w-20 h-1.5 rounded-full bg-white/20"></div>
            <div className="w-12 h-1.5 rounded-full bg-white/10"></div>
         </div>

         {/* AI Bubble */}
         <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 p-3 flex flex-col gap-2 relative z-10 shadow-[0_0_20px_rgba(236,72,153,0.1)]">
            <div className="w-24 h-1.5 rounded-full bg-pink-300/80"></div>
            <div className="w-32 h-1.5 rounded-full bg-pink-300/60"></div>
            <div className="w-16 h-1.5 rounded-full bg-pink-300/40"></div>
         </div>

         {/* User Bubble */}
         <div className="self-end max-w-[80%] rounded-2xl rounded-tr-sm bg-white/10 border border-white/5 p-3 flex flex-col gap-2 relative z-10 mt-auto">
            <div className="w-16 h-1.5 rounded-full bg-white/20"></div>
         </div>

         {/* Typing Indicator */}
         <div className="self-start max-w-[50%] rounded-full bg-white/5 border border-white/5 px-4 py-2 flex items-center gap-1.5 relative z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse delay-75"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse delay-150"></div>
         </div>
      </div>
      
      {/* Input area */}
      <div className="h-14 border-t border-white/10 bg-white/5 flex items-center px-4 gap-2">
         <div className="flex-1 h-8 rounded-full bg-white/5 border border-white/10"></div>
         <div className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center">
            <div className="w-3 h-3 rounded bg-pink-400/80" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
         </div>
      </div>
    </div>
  );
}

function DataNode({ color, size = 16 }: { color: string, size?: number }) {
  return (
    <div 
      className="rounded-full shadow-lg flex items-center justify-center backdrop-blur-md border border-white/20"
      style={{ 
        width: size, height: size, 
        background: `radial-gradient(circle at 30% 30%, ${color}, rgba(0,0,0,0.8))` 
      }}
    >
      <div className="w-1/2 h-1/2 rounded-full bg-white/30 blur-[1px]"></div>
    </div>
  );
}

function FloatingIcon({ type }: { type: 'brain' | 'sparkle' }) {
  const iconBase = "w-10 h-10 rounded-xl bg-[#0a0b0f]/80 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/20";
  
  if (type === 'brain') {
    return (
      <div className={iconBase}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="1.5"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path></svg>
      </div>
    );
  }
  return (
    <div className={iconBase}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
    </div>
  );
}

function OrbitingElement({ children, radiusX, radiusY, period, offsetPhase = 0, baseY = 0 }: any) {
  const { localTime } = useSprite() as any;
  const phase = (localTime / period) * Math.PI * 2 + offsetPhase;
  const x = Math.cos(phase) * radiusX;
  const y = Math.sin(phase) * radiusY + baseY;
  const depth = Math.sin(phase); 
  const scale = 1 + depth * 0.25; 
  const zIndex = depth > 0 ? 20 : 0; 
  
  return (
    <div style={{
      position: 'absolute',
      left: '50%', top: '50%',
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
      zIndex,
    }}>
      {children}
    </div>
  );
}

export default function ChatbotAnimation() {
  return (
    <div className="w-full h-full relative bg-[#0a0b0f] overflow-hidden rounded-[2rem] border border-white/5 shadow-inner">
      <Stage width={400} height={600} duration={4} background="transparent" autoplay loop>
         <Sprite start={0} end={Infinity}>
            <TechRingBase />
            <GlassChatWindow />
            
            {/* --- ORBITALS --- */}
            <OrbitingElement radiusX={150} radiusY={60} period={5} offsetPhase={0} baseY={-60}>
               <DataNode color="#EC4899" size={20} />
            </OrbitingElement>

            <OrbitingElement radiusX={130} radiusY={50} period={5} offsetPhase={2.0} baseY={20}>
               <FloatingIcon type="sparkle" />
            </OrbitingElement>
            
            <OrbitingElement radiusX={160} radiusY={70} period={5} offsetPhase={3.5} baseY={-30}>
               <FloatingIcon type="brain" />
            </OrbitingElement>

            <OrbitingElement radiusX={120} radiusY={40} period={5} offsetPhase={5.0} baseY={10}>
               <DataNode color="#A855F7" size={16} />
            </OrbitingElement>
         </Sprite>
      </Stage>
    </div>
  );
}
