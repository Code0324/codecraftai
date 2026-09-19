'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

/* ─── Hook: respect prefers-reduced-motion reliably ──────────── */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/* ─── Data: your real AI Tools content, reorganized into the
   Orchestrator → Agents → Tools hierarchy ───────────────────── */
interface NodeData {
  id: string;
  title: string;
  desc: string;
  icon: string; // path under /public, e.g. /images/Ai-tools/01_llms_ai_models.png
}

const agentNodes: NodeData[] = [
  { id: 'llms', title: 'LLMs & AI Models', desc: 'ChatGPT, Claude, Gemini, Llama, Mistral & more', icon: '/images/Ai-tools/01_llms_ai_models.png' },
  { id: 'agents', title: 'AI Agents & Assistants', desc: 'Research, analyze, create, plan & take action', icon: '/images/Ai-tools/02_ai_agents_assistants.png' },
  { id: 'automation', title: 'Automation & Workflows', desc: 'Zapier, Make, n8n, Pabbly, API integrations', icon: '/images/Ai-tools/03_automation_workflows.png' },
  { id: 'dev', title: 'Development & Coding', desc: 'GitHub, Replit, Cursor, Devin, Copilot', icon: '/images/Ai-tools/04_development_coding.png' },
  { id: 'content', title: 'Content & Marketing', desc: 'Copywriting, SEO, social media, design & video', icon: '/images/Ai-tools/05_content_marketing.png' },
];

const toolNodes: NodeData[] = [
  { id: 'cloud', title: 'Cloud & Infrastructure', desc: 'AWS, Azure, Google Cloud, Oracle, Vercel, Docker', icon: '/images/Ai-tools/06_cloud_infrastructure.png' },
  { id: 'data', title: 'Data & Analytics', desc: 'Databases, BigQuery, Snowflake, Power BI, Looker', icon: '/images/Ai-tools/07_data_analytics.png' },
  { id: 'productivity', title: 'Productivity & Collaboration', desc: 'Slack, Notion, Microsoft 365, Google Workspace', icon: '/images/Ai-tools/08_productivity_collaboration.png' },
  { id: 'sales', title: 'Sales & CRM', desc: 'HubSpot, Salesforce, Pipedrive, ActiveCampaign', icon: '/images/Ai-tools/09_sales_crm.png' },
  { id: 'ecommerce', title: 'E-Commerce & Operations', desc: 'Shopify, WooCommerce, Inventory, Payments', icon: '/images/Ai-tools/10_ecommerce_operations.png' },
];

const HUB_ICON = '/images/Ai-tools/11_central_ai_brain_hub.png';

const COLS = [10, 30, 50, 70, 90]; // % x-positions for 5 evenly spaced columns

/* ─── Animated connector layer (SVG, scales with the row) ────── */
function ConnectorLayer({
  variant,
  reduced,
}: {
  variant: 'fan' | 'columns';
  reduced: boolean;
}) {
  const paths =
    variant === 'fan'
      ? COLS.map((x) => `M50,0 C50,45 ${x},55 ${x},100`)
      : COLS.map((x) => `M${x},0 L${x},100`);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`lineGrad-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id={`dotGrad-${variant}`}>
          <stop offset="0%" stopColor="#fde68a" stopOpacity="1" />
          <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </radialGradient>
      </defs>
      {paths.map((d, i) => (
        <g key={i}>
          <path
            d={d}
            fill="none"
            stroke={`url(#lineGrad-${variant})`}
            strokeWidth={0.35}
            vectorEffect="non-scaling-stroke"
            opacity={0.45}
          >
            {!reduced && (
              <animate
                attributeName="opacity"
                values="0.2;0.65;0.2"
                dur="2.6s"
                begin={`${i * 0.18}s`}
                repeatCount="indefinite"
              />
            )}
          </path>
          {!reduced && (
            <circle r="1.1" fill={`url(#dotGrad-${variant})`}>
              <animateMotion dur="3.2s" begin={`${i * 0.35}s`} repeatCount="indefinite" path={d} />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
}

/* ─── Glass node (SVG/CSS only — no raster images) ────────────── */
function GlassNode({
  node,
  index,
  reduced,
  size = 'md',
}: {
  node: NodeData;
  index: number;
  reduced: boolean;
  size?: 'md' | 'sm';
}) {
  const iconBox = size === 'md' ? 'w-16 h-16' : 'w-14 h-14';
  const imgPx = size === 'md' ? 40 : 34;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: reduced ? 0 : index * 0.08, duration: 0.5 }}
      whileHover={reduced ? {} : { y: -6 }}
      className="group flex flex-col items-center text-center gap-3"
    >
      <div
        className={`relative flex items-center justify-center ${iconBox} rounded-2xl
          bg-white/[0.04] backdrop-blur-md border border-white/10
          shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300
          group-hover:border-amber-400/50 group-hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]`}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/10 to-purple-500/10" />
        <Image
          src={node.icon}
          alt={node.title}
          width={imgPx}
          height={imgPx}
          className="relative z-10 object-contain"
          quality={90}
        />
      </div>
      <div>
        <h4 className="text-xs md:text-sm font-bold text-white leading-tight">{node.title}</h4>
        <p className="hidden md:block text-[11px] text-slate-400 mt-1 max-w-[9.5rem] leading-snug mx-auto">
          {node.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────── */
export default function AIToolsNeon() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const reduced = usePrefersReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950/98 to-slate-950"
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-64 -right-64 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"
          animate={reduced ? {} : { y: [-40, 40, -40], x: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-64 -left-64 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"
          animate={reduced ? {} : { y: [40, -40, 40], x: [20, -20, 20] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/30"
            animate={reduced ? {} : { opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs md:text-sm font-semibold text-amber-300 tracking-widest uppercase">
              ⚡ AI-Powered Business Automation
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 leading-tight">
            Build Smarter<br />
            Automate Faster<br />
            Grow Bigger
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            One orchestrating intelligence, a layer of specialized AI agents, and the real tools
            and platforms they plug into — this is the stack behind everything CodeCraftAI builds.
          </p>
        </motion.div>

        {/* ── Desktop: hierarchical tree (Orchestrator → Agents → Tools) ── */}
        <div className="hidden lg:block mb-16">
          {/* Hub */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="flex justify-center mb-2"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-500/25 to-purple-500/25 rounded-full blur-2xl -m-6"
                animate={reduced ? {} : { scale: [0.95, 1.1, 0.95] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                animate={reduced ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 flex flex-col items-center justify-center w-32 h-32 rounded-full
                  bg-white/[0.05] backdrop-blur-md border border-amber-400/30
                  shadow-[0_0_40px_rgba(245,158,11,0.2)]"
              >
                <Image src={HUB_ICON} alt="CodeCraftAI Core" width={48} height={48} className="object-contain" quality={90} priority />
                <span className="mt-1 text-sm font-bold text-white">CodeCraftAI Core</span>
                <span className="text-[10px] text-slate-400">Powered by Claude</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Hub → Agents connectors */}
          <div className="relative h-16">
            <ConnectorLayer variant="fan" reduced={reduced} />
          </div>

          {/* Agent row */}
          <div className="grid grid-cols-5 gap-4">
            {agentNodes.map((node, idx) => (
              <GlassNode key={node.id} node={node} index={idx} reduced={reduced} />
            ))}
          </div>

          {/* Agents → Tools connectors */}
          <div className="relative h-16">
            <ConnectorLayer variant="columns" reduced={reduced} />
          </div>

          {/* Tool row */}
          <div className="grid grid-cols-5 gap-4">
            {toolNodes.map((node, idx) => (
              <GlassNode key={node.id} node={node} index={5 + idx} reduced={reduced} />
            ))}
          </div>
        </div>

        {/* ── Mobile/Tablet: stacked, no connectors ── */}
        <div className="lg:hidden space-y-12 mb-16">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-500/25 to-purple-500/25 rounded-full blur-2xl -m-6"
                animate={reduced ? {} : { scale: [0.95, 1.1, 0.95] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div
                className="relative z-10 flex flex-col items-center justify-center w-28 h-28 rounded-full
                  bg-white/[0.05] backdrop-blur-md border border-amber-400/30
                  shadow-[0_0_32px_rgba(245,158,11,0.2)]"
              >
                <Image src={HUB_ICON} alt="CodeCraftAI Core" width={40} height={40} className="object-contain" quality={90} priority />
                <span className="mt-1 text-xs font-bold text-white">CodeCraftAI Core</span>
                <span className="text-[9px] text-slate-400">Powered by Claude</span>
              </div>
            </div>
          </motion.div>

          <div>
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider text-center mb-6">
              AI Agents
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8">
              {agentNodes.map((node, idx) => (
                <GlassNode key={node.id} node={node} index={idx} reduced={reduced} size="sm" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider text-center mb-6">
              Tools & Integrations
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8">
              {toolNodes.map((node, idx) => (
                <GlassNode key={node.id} node={node} index={5 + idx} reduced={reduced} size="sm" />
              ))}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 px-6 py-4
            flex flex-wrap items-center justify-center gap-x-10 gap-y-3"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full rounded-full bg-amber-400 ${reduced ? '' : 'animate-ping'} opacity-60`} />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            <span className="text-xs md:text-sm text-slate-300 font-medium">All Systems Operational</span>
          </div>
          <div className="text-xs md:text-sm text-slate-400">
            <span className="text-white font-semibold">{agentNodes.length}</span> AI Agent Capabilities
          </div>
          <div className="text-xs md:text-sm text-slate-400">
            <span className="text-white font-semibold">{toolNodes.length}</span> Tool Integrations
          </div>
          <div className="text-xs md:text-sm text-slate-400">
            <span className="text-white font-semibold">24/7</span> Automation
          </div>
        </motion.div>

        {/* Final Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-lg md:text-xl font-bold text-white">
            AI + The Right Tools = Endless Possibilities
          </p>
        </motion.div>
      </div>
    </section>
  );
}
