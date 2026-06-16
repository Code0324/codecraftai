'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const IMAGES = [
  '/images/services/chatbot.png',
  '/images/services/telegram-bot.png',
  '/images/services/crm.png',
  '/images/services/uiux.png',
  '/images/services/ai-agent.png',
  '/images/services/ai-automation.png',
  '/images/services/saas-ai.png',
  '/images/services/portfolio.png',
  '/images/services/custom-dashboard.png',
  '/images/services/ecommerce.png',
  '/images/services/n8n-automation.png',
  '/images/services/mob-app.png',
];

const COUNT = IMAGES.length;
const RX = 255;
const RY = 52;
const SPEED = 0.007;
const SIZE_MIN = 30;
const SIZE_MAX = 112;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ServicesCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const angleRef     = useRef<number>(0);
  const rafRef       = useRef<number>(0);
  const cwRef        = useRef<number>(0); // cached container width

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Cache width once, then only update on resize (avoids layout thrashing)
    const updateWidth = () => { cwRef.current = container.offsetWidth; };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(container);

    function animate() {
      angleRef.current += SPEED;
      const cw = cwRef.current || container!.offsetWidth;
      const CX = cw / 2;
      const CY = 220; // bottom-third-ish of 320px container

      for (let i = 0; i < COUNT; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;

        const baseAngle = (2 * Math.PI * i) / COUNT;
        const angle = baseAngle + angleRef.current;

        const x = CX + RX * Math.sin(angle);
        const y = CY + RY * Math.cos(angle);

        // frontness: bottom of oval = front (cos(angle) closest to -1 when bottom)
        const angleDiff = angle % (2 * Math.PI);
        const cosVal = Math.cos(angleDiff);
        // front when cosVal = -1 (bottom), back when cosVal = 1 (top)
        const f = Math.pow((-cosVal + 1) / 2, 3.5);

        const size = Math.round(lerp(SIZE_MIN, SIZE_MAX, f));
        const opacity = lerp(0.2, 1.0, f);
        const zIndex = Math.round(f * 200) + 2;

        const glowCyan = `drop-shadow(0 0 ${Math.round(f * 14)}px rgba(0,255,255,${(f * 0.85).toFixed(2)}))`;
        const glowPurple = `drop-shadow(0 0 ${Math.round(f * 22)}px rgba(168,85,247,${(f * 0.7).toFixed(2)}))`;
        const filter = f > 0.3 ? `${glowCyan} ${glowPurple}` : 'none';

        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.left = `${x - size / 2}px`;
        el.style.top = `${y - size / 2}px`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(zIndex);
        el.style.filter = filter;
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        background: '#06071a',
        position: 'relative',
        width: '100%',
        paddingBottom: '48px',
        paddingTop: '8px',
      }}
    >
      {/* Subtle purple radial glow behind oval */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '60%',
          transform: 'translate(-50%, -50%)',
          width: '560px',
          height: '160px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Purple glow ring at bottom of oval */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '220px',
          transform: 'translate(-50%, -50%)',
          width: `${RX * 2 + 40}px`,
          height: `${RY * 2 + 40}px`,
          borderRadius: '50%',
          border: '2px solid rgba(168,85,247,0.35)',
          boxShadow: '0 0 32px 8px rgba(168,85,247,0.18), 0 0 80px 16px rgba(168,85,247,0.10)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Carousel track */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: '320px',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        {IMAGES.map((src, i) => (
          <div
            key={src}
            ref={(el) => { itemRefs.current[i] = el; }}
            style={{
              position: 'absolute',
              width: `${SIZE_MIN}px`,
              height: `${SIZE_MIN}px`,
              transition: 'none',
              willChange: 'transform, opacity, width, height, left, top',
            }}
          >
            <Image
              src={src}
              alt=""
              unoptimized
              width={112}
              height={112}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                borderRadius: '12px',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
