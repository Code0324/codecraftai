'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import Image from 'next/image';
import { X, ArrowUp } from 'lucide-react';

const SYSTEM_PROMPT = `You are the CodeCraftAI Assistant — a smart, friendly AI assistant for CodeCraftAI agency.
CodeCraftAI is a Pakistan-based AI & Full-Stack Development agency specializing in:
- Next.js, FastAPI, Python, Claude API, PostgreSQL (Neon DB)
- AI Agents, Automation (n8n), Docker, Kubernetes, Vercel, Railway
- E-commerce, Community platforms, AI Chatbots, CRM systems
Answer visitor questions about services, pricing, tech stack, and project inquiries.
Keep responses concise, professional, and enthusiastic. End with a CTA to contact us.`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hi! I'm the CodeCraftAI Assistant 👋 I can help you with questions about our services, tech stack, pricing, and project inquiries. What can I help you with today?",
};

/* ─── Chatbot icon (falls back to a glowing AI orb) ────────── */
function ChatIcon({ className = '', sizes = '48px' }: { className?: string; sizes?: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <span
        className={`relative flex items-center justify-center rounded-full ${className}`}
        style={{
          background:
            'radial-gradient(circle at 35% 30%, #22d3ee, #4F8EF7 55%, #7C3AED)',
          boxShadow: '0 0 14px rgba(79,142,247,0.6), inset 0 1px 0 rgba(255,255,255,0.25)',
        }}
        aria-hidden="true"
      >
        <span
          className="absolute rounded-full bg-white/40 blur-[1px]"
          style={{ width: '42%', height: '42%', top: '20%', left: '24%' }}
        />
      </span>
    );
  }

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <Image
        src="/chatbot/chatbot-icon.png"
        alt=""
        fill
        sizes={sizes}
        className="object-contain"
        onError={() => setError(true)}
      />
    </span>
  );
}

/* ─── Subtle AI network particles (opacity < 5%) ───────────── */
function ChatParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: `${(i * 37 + 8) % 100}%`,
        top: `${(i * 53 + 12) % 100}%`,
        size: 2 + (i % 3),
        delay: `${(i % 7) * 0.9}s`,
        duration: `${9 + (i % 6) * 2}s`,
        color: ['#06B6D4', '#4F8EF7', '#7C3AED'][i % 3],
        dx: `${-(20 + (i % 4) * 8)}px`,
        dy: `${-(14 + (i % 3) * 8)}px`,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.045]" aria-hidden="true">
      {/* Ambient neon glows */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.5), transparent 70%)' }}
      />
      <div
        className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.35), transparent 70%)' }}
      />
      {/* Drifting glow dots */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="chat-particle absolute rounded-full"
          style={
            {
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              animationDuration: p.duration,
              animationDelay: p.delay,
              '--dx': p.dx,
              '--dy': p.dy,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ─── Glowing typing dots ──────────────────────────────────── */
function TypingDots() {
  return (
    <span className="flex items-center gap-1.5 py-0.5" role="status" aria-label="Assistant is typing">
      <span
        className="chat-typing-dot"
        style={{ background: '#4F8EF7', boxShadow: '0 0 8px rgba(79,142,247,0.9)', animationDelay: '0ms' }}
      />
      <span
        className="chat-typing-dot"
        style={{ background: '#7C3AED', boxShadow: '0 0 8px rgba(124,58,237,0.9)', animationDelay: '140ms' }}
      />
      <span
        className="chat-typing-dot"
        style={{ background: '#06B6D4', boxShadow: '0 0 8px rgba(6,182,212,0.9)', animationDelay: '280ms' }}
      />
    </span>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* Close on Escape — keyboard accessibility */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        toggleBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMsg: Message = { role: 'user', content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setIsStreaming(true);

    const assistantMsg: Message = { role: 'assistant', content: '' };
    setMessages([...history, assistantMsg]);

    try {
      const apiMessages = history
        .filter((m) => m.content)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, systemPrompt: SYSTEM_PROMPT }),
      });

      if (!res.ok) throw new Error('API error');

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: accumulated };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting. Please try again or reach us directly at hello@codecraftai.dev",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const canSend = !!input.trim() && !isStreaming;

  return (
    <MotionConfig reducedMotion="user">
      {/* ─── Chat Window ─────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="codecraftai-chat"
            role="dialog"
            aria-label="CodeCraftAI Assistant chat window"
            className="fixed z-[10001] flex flex-col overflow-hidden rounded-[28px] bottom-[100px] sm:bottom-[176px] right-4 sm:right-6 w-[calc(100%-32px)] sm:w-[380px] lg:w-[420px] h-[min(75dvh,calc(100dvh-120px))] sm:h-[min(620px,calc(100dvh-200px))] lg:h-[min(680px,calc(100dvh-200px))]"
            style={{
              background: 'rgba(8,10,20,0.55)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(0,255,255,0.18)',
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.04), 0 24px 80px -16px rgba(0,0,0,0.65), 0 0 40px rgba(6,182,212,0.10), 0 0 80px rgba(124,58,237,0.08), inset 0 1px 0 rgba(255,255,255,0.10)',
              transformOrigin: 'bottom right',
            }}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ChatParticles />

            {/* Acrylic sheen */}
            <div
              className="absolute inset-0 pointer-events-none z-[1]"
              style={{
                background:
                  'linear-gradient(115deg, rgba(255,255,255,0.06) 0%, transparent 42%), linear-gradient(to bottom, rgba(255,255,255,0.03), transparent 30%)',
              }}
            />

            {/* Gradient accent bar */}
            <div
              className="relative z-10 h-[2px] w-full flex-shrink-0"
              style={{ background: 'linear-gradient(90deg, #06B6D4 0%, #4F8EF7 50%, #7C3AED 100%)' }}
            />

            {/* Header */}
            <div
              className="relative z-10 flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div
                className="flex-shrink-0 rounded-2xl"
                style={{
                  boxShadow: '0 0 18px rgba(79,142,247,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
              >
                <ChatIcon className="w-10 h-10 rounded-2xl" sizes="40px" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight truncate">
                  CodeCraftAI Assistant
                </p>
                <p className="flex items-center gap-1.5 text-xs font-medium mt-0.5" style={{ color: '#34d399' }}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-chat-status absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Always Online
                </p>
              </div>

              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ rotate: 6, scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                className="group relative w-9 h-9 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-colors duration-200 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                aria-label="Close chat"
              >
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: '0 0 18px rgba(6,182,212,0.45)' }}
                />
                <X size={16} className="relative" />
              </motion.button>
            </div>

            {/* Messages */}
            <div
              className="chat-scroll relative z-10 flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0"
              role="log"
              aria-relevant="additions"
              aria-busy={isStreaming}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="flex-shrink-0 mb-0.5">
                        <ChatIcon className="w-6 h-6 rounded-full" sizes="24px" />
                      </div>
                    )}
                    <div
                      className="max-w-[82%] px-4 py-2.5 rounded-2xl leading-relaxed"
                      style={
                        msg.role === 'user'
                          ? {
                              background:
                                'linear-gradient(135deg, rgba(79,142,247,0.92), rgba(124,58,237,0.85))',
                              border: '1px solid rgba(147,197,253,0.3)',
                              color: '#fff',
                              fontSize: '14px',
                              borderBottomRightRadius: '6px',
                              boxShadow:
                                '0 4px 18px rgba(79,142,247,0.3), inset 0 1px 0 rgba(255,255,255,0.18)',
                            }
                          : {
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(6,182,212,0.25)',
                              backdropFilter: 'blur(10px)',
                              WebkitBackdropFilter: 'blur(10px)',
                              color: '#e2e8f0',
                              fontSize: '14.5px',
                              borderBottomLeftRadius: '6px',
                              boxShadow:
                                'inset 0 1px 0 rgba(255,255,255,0.07), 0 2px 14px rgba(0,0,0,0.2)',
                            }
                      }
                    >
                      {msg.content || <TypingDots />}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="relative z-10 px-3 pt-2.5 pb-3 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div
                className="flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 focus-within:border-cyan-400/50 focus-within:shadow-[0_0_24px_rgba(6,182,212,0.22)]"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask CodeCraftAI anything..."
                  disabled={isStreaming}
                  aria-label="Message CodeCraftAI Assistant"
                  className="flex-1 min-w-0 bg-transparent outline-none text-sm text-white placeholder-slate-500 disabled:opacity-50"
                />
                <motion.button
                  onClick={() => {
                    if (!canSend) return;
                    setRippleKey((k) => k + 1);
                    sendMessage();
                  }}
                  whileHover={canSend ? { scale: 1.06 } : undefined}
                  whileTap={canSend ? { scale: 0.92 } : undefined}
                  disabled={!canSend}
                  aria-label="Send message"
                  className="group relative w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
                  style={{
                    background: 'linear-gradient(135deg, #06B6D4 0%, #4F8EF7 50%, #7C3AED 100%)',
                    boxShadow: canSend
                      ? '0 0 18px rgba(79,142,247,0.55), inset 0 1px 0 rgba(255,255,255,0.25)'
                      : 'inset 0 1px 0 rgba(255,255,255,0.15)',
                  }}
                >
                  {/* Hover glow (only when enabled) */}
                  {canSend && (
                    <span
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ boxShadow: '0 0 26px rgba(6,182,212,0.7)' }}
                    />
                  )}
                  {/* Click ripple */}
                  {rippleKey > 0 && (
                    <motion.span
                      key={rippleKey}
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.7), transparent 70%)' }}
                      initial={{ scale: 0.2, opacity: 0.7 }}
                      animate={{ scale: 2.4, opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  )}
                  <ArrowUp size={18} className="relative text-white" />
                </motion.button>
              </div>
              <p className="text-center text-slate-600 text-[10px] mt-2">
                Powered by Claude · CodeCraftAI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating Toggle Button ────────────────────────────
         The icon PNG itself is the button — no wrapper circle,
         no border, no cropping. Acrylic glow comes from CSS
         drop-shadows applied directly to the image. */}
      <motion.button
        ref={toggleBtnRef}
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.08, y: -4 }}
        whileTap={{ scale: 0.94 }}
        className="group fixed z-[10002] w-16 h-16 md:w-[68px] md:h-[68px] lg:w-[72px] lg:h-[72px] rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
        style={{ bottom: '14px', right: '24px' }}
        transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
        aria-controls="codecraftai-chat"
      >
        {/* Idle float (subtle, 4s, no bounce) */}
        <span className="absolute inset-0 animate-chat-float">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute inset-0 flex items-center justify-center text-white"
              >
                <X size={26} className="text-white drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                {/* The icon itself — acrylic shine + neon glow via CSS */}
                <span className="chat-launcher-icon absolute inset-0">
                  <ChatIcon className="w-full h-full" sizes="(min-width: 1024px) 72px, (min-width: 768px) 68px, 64px" />
                  {/* Acrylic shine sweep overlay */}
                  <span className="chat-launcher-shine" aria-hidden="true" />
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.button>
    </MotionConfig>
  );
}
