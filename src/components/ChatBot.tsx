'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles } from 'lucide-react';

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

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed z-[9998] flex flex-col overflow-hidden"
            style={{
              bottom: '96px',
              right: '24px',
              width: 'min(380px, calc(100vw - 32px))',
              height: 'min(500px, calc(100dvh - 120px))',
              background: 'rgba(10,11,15,0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(79,142,247,0.18)',
              borderRadius: '1.5rem',
              boxShadow: '0 8px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(79,142,247,0.08), 0 0 40px rgba(79,142,247,0.06)',
            }}
          >
            {/* Gradient accent bar */}
            <div
              className="h-0.5 w-full flex-shrink-0"
              style={{ background: 'linear-gradient(90deg, #4F8EF7 0%, #7C3AED 50%, #06b6d4 100%)' }}
            />

            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #4F8EF7 0%, #7C3AED 100%)',
                  boxShadow: '0 0 16px rgba(79,142,247,0.4)',
                }}
              >
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight truncate">
                  CodeCraftAI Assistant
                </p>
                <p className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Online
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 min-h-0">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                        style={{
                          background: 'linear-gradient(135deg, #4F8EF7 0%, #7C3AED 100%)',
                          boxShadow: '0 0 10px rgba(79,142,247,0.3)',
                        }}
                      >
                        <Bot size={12} className="text-white" />
                      </div>
                    )}
                    <div
                      className="max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                      style={
                        msg.role === 'user'
                          ? {
                              background: 'linear-gradient(135deg, #4F8EF7 0%, #3b72d6 100%)',
                              color: '#fff',
                              borderBottomRightRadius: '4px',
                              boxShadow: '0 2px 12px rgba(79,142,247,0.25)',
                            }
                          : {
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              color: '#e2e8f0',
                              borderBottomLeftRadius: '4px',
                            }
                      }
                    >
                      {msg.content || (
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '120ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '240ms' }} />
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="px-3 py-3 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="flex items-center gap-2 rounded-full px-4 py-2.5 transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(79,142,247,0.2)',
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything…"
                  disabled={isStreaming}
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder-slate-500 disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isStreaming}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #4F8EF7 0%, #7C3AED 100%)',
                    boxShadow: input.trim() ? '0 0 12px rgba(79,142,247,0.5)' : 'none',
                  }}
                  aria-label="Send"
                >
                  <Send size={13} className="text-white" />
                </button>
              </div>
              <p className="text-center text-slate-600 text-[10px] mt-1.5">
                Powered by Claude · CodeCraftAI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed z-[9999] w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          bottom: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, #4F8EF7 0%, #7C3AED 100%)',
          boxShadow: '0 0 0 0 rgba(79,142,247,0.4)',
        }}
        aria-label="Open chat"
      >
        {/* Pulse rings */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{ background: 'linear-gradient(135deg, #4F8EF7, #7C3AED)' }}
        />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} className="text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Sparkles size={22} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
