'use client';
import React from 'react';
import { Stage, Sprite, useTimeline, useSprite } from './StageAnimation';

function TechRingBase() {
  return (
    <div className="absolute left-1/2 top-[75%] -translate-x-1/2 -translate-y-1/2 z-[1]">
       <svg width="300" height="150" viewBox="0 0 300 150">
          <ellipse cx="150" cy="75" rx="120" ry="35" fill="none" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" />
          <ellipse cx="150" cy="75" rx="80" ry="22" fill="none" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" />
          <ellipse cx="150" cy="75" rx="40" ry="12" fill="rgba(139, 92, 246, 0.1)" stroke="rgba(139, 92, 246, 0.8)" strokeWidth="2" />

          {/* Upward Glow */}
          <polygon points="110,75 190,75 250,-150 50,-150" fill="url(#beam-grad)" opacity="0.1" />
          <defs>
            <linearGradient id="beam-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
       </svg>
    </div>
  );
}

function GlassPhone() {
  const { time } = useTimeline() as any;
  const bobbingY = Math.sin(time * Math.PI * 2 / 4) * 12;

  return (
    <div 
      style={{ transform: `translate(-50%, calc(-50% + ${bobbingY}px))` }} 
      className="absolute left-1/2 top-[45%] z-10 w-[200px] h-[380px] bg-[#0a0b0f]/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_0_40px_rgba(139,92,246,0.15)] border border-white/20 flex flex-col overflow-hidden p-1.5"
    >
      <div className="w-full h-full border border-white/10 rounded-[2rem] overflow-hidden flex flex-col bg-gradient-to-b from-white/5 to-transparent relative">
        {/* Sleek Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/40 rounded-full backdrop-blur-md border border-white/5 z-20 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/20 mr-1"></div>
          <div className="w-4 h-1.5 rounded-full bg-white/10"></div>
        </div>
        
        {/* Screen Content */}
        <div className="flex-1 w-full pt-12 px-4 gap-4 flex flex-col relative">
          {/* Abstract App Header */}
          <div className="w-full flex justify-between items-center mb-2">
             <div className="w-8 h-8 rounded-full border border-[#8B5CF6]/50 shadow-[0_0_10px_rgba(139,92,246,0.3)]"></div>
             <div className="flex flex-col gap-1.5 items-end">
               <div className="w-8 h-1 rounded-full bg-white/20"></div>
               <div className="w-12 h-1 rounded-full bg-white/10"></div>
             </div>
          </div>

          {/* Hero Image Abstract */}
          <div className="w-full h-28 rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-transparent border border-white/5 overflow-hidden relative">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#8B5CF6]/30 to-transparent"></div>
          </div>

          {/* Abstract List Items */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full h-10 rounded-lg bg-white/5 border border-white/5 flex items-center px-3 gap-3 backdrop-blur-sm">
              <div className="w-5 h-5 rounded-md border border-white/10 bg-white/5"></div>
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="w-full h-1 rounded-full bg-white/20"></div>
                <div className="w-2/3 h-1 rounded-full bg-white/10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FloatingIcon({ type }: { type: 'node' | 'code' | 'api' | 'data' }) {
  const iconBase = "w-10 h-10 rounded-xl bg-[#0a0b0f]/80 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/20";
  
  if (type === 'node') {
    return (
      <div className={iconBase}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
      </div>
    );
  }
  if (type === 'code') {
    return (
      <div className={iconBase}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
      </div>
    );
  }
  if (type === 'api') {
    return (
      <div className={iconBase}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="1.5"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
      </div>
    );
  }
  return (
    <div className={iconBase}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
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

export default function AppCreationAnimation() {
  return (
    <div className="w-full h-full relative bg-[#0a0b0f] overflow-hidden rounded-[2rem] border border-white/5 shadow-inner">
      <Stage width={400} height={600} duration={4} background="transparent" autoplay loop>
         <Sprite start={0} end={Infinity}>
            <TechRingBase />
            <GlassPhone />
            
            {/* --- ORBITALS --- */}
            <OrbitingElement radiusX={160} radiusY={60} period={4} offsetPhase={0.2} baseY={-80}>
               <FloatingIcon type="code" />
            </OrbitingElement>

            <OrbitingElement radiusX={140} radiusY={50} period={4} offsetPhase={2.0} baseY={30}>
               <FloatingIcon type="api" />
            </OrbitingElement>
            
            <OrbitingElement radiusX={170} radiusY={70} period={4} offsetPhase={3.5} baseY={-40}>
               <FloatingIcon type="node" />
            </OrbitingElement>

            <OrbitingElement radiusX={130} radiusY={40} period={4} offsetPhase={5.0} baseY={10}>
               <FloatingIcon type="data" />
            </OrbitingElement>
         </Sprite>
      </Stage>
    </div>
  );
}
