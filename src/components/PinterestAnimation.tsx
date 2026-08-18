'use client';
import React from 'react';
import { Stage, Sprite, useTimeline, useSprite } from './StageAnimation';

function TechRingBase() {
  return (
    <div className="absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 z-[1]">
       <svg width="400" height="200" viewBox="0 0 400 200">
          <ellipse cx="200" cy="100" rx="140" ry="40" fill="none" stroke="rgba(79, 142, 247, 0.2)" strokeWidth="1" />
          <ellipse cx="200" cy="100" rx="100" ry="28" fill="none" stroke="rgba(79, 142, 247, 0.4)" strokeWidth="2" />
          <ellipse cx="200" cy="100" rx="60" ry="16" fill="rgba(79, 142, 247, 0.1)" stroke="rgba(79, 142, 247, 0.8)" strokeWidth="2" />
          
          {/* Subtle grid lines */}
          <line x1="200" y1="0" x2="200" y2="200" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
          <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
       </svg>
    </div>
  );
}

function GlassTerminal() {
  const { time } = useTimeline() as any;
  const bobbingY = Math.sin(time * Math.PI * 2 / 5) * 10;

  return (
    <div 
      style={{ transform: `translate(-50%, calc(-50% + ${bobbingY}px))` }} 
      className="absolute left-1/2 top-[45%] z-10 w-[280px] h-[180px] bg-[#0a0b0f]/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(79,142,247,0.15)] flex flex-col overflow-hidden"
    >
      <div className="h-8 border-b border-white/5 flex items-center px-4 gap-2 bg-white/5">
         <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
         <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
         <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
      </div>
      <div className="flex-1 p-5 flex flex-col gap-3">
         <div className="w-3/4 h-2 rounded bg-white/10"></div>
         <div className="w-1/2 h-2 rounded bg-[#4F8EF7]/50"></div>
         <div className="w-full h-2 rounded bg-white/5 mt-2"></div>
         <div className="w-5/6 h-2 rounded bg-white/5"></div>
         
         <div className="mt-auto flex justify-between items-end">
            <div className="w-12 h-12 rounded-lg border border-white/10 bg-gradient-to-br from-[#4F8EF7]/20 to-transparent flex items-center justify-center">
              <div className="w-4 h-4 rounded-sm bg-[#4F8EF7]/80 shadow-[0_0_10px_#4F8EF7]"></div>
            </div>
            <div className="flex gap-2">
               <div className="w-8 h-8 rounded-full border border-[#06B6D4]/30"></div>
               <div className="w-8 h-8 rounded-full border border-[#06B6D4]/30"></div>
            </div>
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

function SleekText({ text, color }: { text: string, color: string }) {
  return (
    <div 
      className="font-light text-2xl tracking-[0.2em] uppercase backdrop-blur-sm px-4 py-1 rounded-full border border-white/10" 
      style={{ 
        color, 
        backgroundColor: 'rgba(10, 11, 15, 0.4)',
        boxShadow: `0 0 20px ${color}20` 
      }}
    >
      {text}
    </div>
  );
}

function OrbitingElement({ children, radiusX, radiusY, period, offsetPhase = 0, baseY = 0 }: any) {
  const { localTime } = useSprite() as any;
  const phase = (localTime / period) * Math.PI * 2 + offsetPhase;
  const x = Math.cos(phase) * radiusX;
  const y = Math.sin(phase) * radiusY + baseY;
  const depth = Math.sin(phase); 
  const scale = 1 + depth * 0.3; 
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

export default function PinterestAnimation() {
  return (
    <div className="w-full h-full relative bg-[#0a0b0f] overflow-hidden rounded-[2rem] border border-white/5 shadow-inner">
      <Stage width={400} height={600} duration={6} background="transparent" autoplay loop>
         <Sprite start={0} end={Infinity}>
            <TechRingBase />
            <GlassTerminal />
            
            {/* Primary Nodes */}
            <OrbitingElement radiusX={160} radiusY={90} period={6} offsetPhase={0} baseY={-30}>
               <DataNode color="#4F8EF7" size={24} />
            </OrbitingElement>

            <OrbitingElement radiusX={130} radiusY={70} period={6} offsetPhase={2.1} baseY={-10}>
               <DataNode color="#06B6D4" size={20} />
            </OrbitingElement>
            
            <OrbitingElement radiusX={180} radiusY={100} period={6} offsetPhase={4.2} baseY={-40}>
               <DataNode color="#8B5CF6" size={28} />
            </OrbitingElement>

            {/* Typography Tags */}
            <OrbitingElement radiusX={100} radiusY={50} period={6} offsetPhase={1.0} baseY={0}>
               <SleekText text="Sync" color="#4F8EF7" />
            </OrbitingElement>
            
            <OrbitingElement radiusX={150} radiusY={80} period={6} offsetPhase={3.5} baseY={-20}>
               <SleekText text="Auto" color="#06B6D4" />
            </OrbitingElement>

            <OrbitingElement radiusX={120} radiusY={60} period={6} offsetPhase={5.5} baseY={10}>
               <DataNode color="#FFFFFF" size={12} />
            </OrbitingElement>
         </Sprite>
      </Stage>
    </div>
  );
}
