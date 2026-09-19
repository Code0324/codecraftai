'use client';

import { type CSSProperties } from 'react';
import Image from 'next/image';
import { motion, MotionConfig } from 'framer-motion';

interface Category {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

const allTools: Category[] = [
  {
    id: 'llms',
    title: 'LLMs & AI Models',
    desc: 'ChatGPT, Claude, Gemini, Llama, Mistral',
    icon: '/images/Ai-tools/01_llms_ai_models.png',
  },
  {
    id: 'agents',
    title: 'AI Agents & Assistants',
    desc: 'Research, analyze, create, plan & take action',
    icon: '/images/Ai-tools/02_ai_agents_assistants.png',
  },
  {
    id: 'automation',
    title: 'Automation & Workflows',
    desc: 'Zapier, Make, n8n, Pabbly, API integrations',
    icon: '/images/Ai-tools/03_automation_workflows.png',
  },
  {
    id: 'dev',
    title: 'Development & Coding',
    desc: 'GitHub, Replit, Cursor, Devin, Copilot',
    icon: '/images/Ai-tools/04_development_coding.png',
  },
  {
    id: 'content',
    title: 'Content & Marketing',
    desc: 'Copywriting, SEO, social media, design & video',
    icon: '/images/Ai-tools/05_content_marketing.png',
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    desc: 'AWS, Azure, Google Cloud, Oracle, Vercel',
    icon: '/images/Ai-tools/06_cloud_infrastructure.png',
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    desc: 'Databases, BigQuery, Snowflake, Power BI',
    icon: '/images/Ai-tools/07_data_analytics.png',
  },
  {
    id: 'productivity',
    title: 'Productivity & Collaboration',
    desc: 'Slack, Notion, Microsoft 365, Google Workspace',
    icon: '/images/Ai-tools/08_productivity_collaboration.png',
  },
  {
    id: 'sales',
    title: 'Sales & CRM',
    desc: 'HubSpot, Salesforce, Pipedrive, ActiveCampaign',
    icon: '/images/Ai-tools/09_sales_crm.png',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Operations',
    desc: 'Shopify, WooCommerce, Inventory, Payments',
    icon: '/images/Ai-tools/10_ecommerce_operations.png',
  },
];

/* ─── Circular Orbit Guide (SVG) ──────────────────────────── */
function OrbitGuide() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="toolHubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Circular orbit guide */}
      <circle
        cx="500"
        cy="500"
        r="340"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeDasharray="8 12"
        opacity="0.2"
      />

      {/* Center glow */}
      <circle cx="500" cy="500" r="100" fill="url(#toolHubGlow)" />
    </svg>
  );
}

/* ─── Glass Shield Tool Icon ──────────────────────────────── */
function ToolIcon({ tool, index }: { tool: Category; index: number }) {
  return (
    <motion.div
      className="group relative w-20 h-20 md:w-24 md:h-24 rounded-full border border-amber-400/30 hover:border-amber-400/70 transition-all duration-300 overflow-hidden cursor-pointer flex-shrink-0 bg-gradient-to-br from-amber-500/10 to-orange-600/5 backdrop-blur-sm"
      whileHover={{ scale: 1.15, borderColor: '#F59E0B' }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      {/* Icon Image */}
      {tool.icon && (
        <Image
          src={tool.icon}
          alt={tool.title}
          fill
          className="object-contain p-3 group-hover:scale-110 transition-transform duration-300"
          unoptimized
        />
      )}

      {/* Hover tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute -top-16 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur px-3 py-2 rounded-lg whitespace-nowrap z-20 pointer-events-none border border-amber-400/40"
      >
        <p className="text-xs font-bold text-amber-300">{tool.title}</p>
        <p className="text-[10px] text-slate-300 mt-1">{tool.desc}</p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Desktop/Tablet: Circular Orbit ──────────────────────── */
function DesktopOrbit() {
  return (
    <div className="relative w-full aspect-square max-w-4xl mx-auto">
      <OrbitGuide />

      {/* Rotating ring with tools */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: 90,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          transformOrigin: '50% 50%',
        } as CSSProperties}
      >
        {allTools.map((tool, i) => {
          const angle = (i / allTools.length) * 360;
          const radius = 300; // distance from center
          const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
          const y = radius * Math.sin((angle - 90) * (Math.PI / 180));

          return (
            <motion.div
              key={tool.id}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              } as CSSProperties}
              animate={{ rotate: -360 }}
              transition={{
                duration: 90,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <ToolIcon tool={tool} index={i} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Center message */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="text-center max-w-sm">
          <h3 className="heading-font text-2xl md:text-3xl font-bold text-white mb-2">
            AI + The Right
            <br />
            <span className="text-gradient">Tools = Endless</span>
            <br />
            Possibilities
          </h3>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Mobile: Static Grid ──────────────────────────────────── */
function MobileGrid() {
  return (
    <div className="space-y-8">
      <motion.div
        className="text-center max-w-sm mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h3 className="heading-font text-2xl font-bold text-white mb-2">
          AI + The Right
          <br />
          <span className="text-gradient">Tools = Endless</span>
          <br />
          Possibilities
        </h3>
      </motion.div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 px-6">
        {allTools.map((tool, i) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            <ToolIcon tool={tool} index={i} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Section ──────────────────────────────────────────────── */
export default function AIToolsNeon() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="py-24 md:py-40 relative bg-[#0a0b0f]">
        {/* Ambient glows */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.08), transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.05), transparent 70%)' }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-amber-400/80 tracking-widest uppercase"
            >
              Our Ecosystem
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl md:text-5xl font-bold mt-3 mb-4 heading-font"
            >
              <span className="text-gradient">10+ Categories</span> of AI Tools
            </motion.h2>
            <div className="section-underline mx-auto" />
          </div>

          {/* Desktop: Circular Orbit */}
          <div className="hidden md:flex justify-center">
            <DesktopOrbit />
          </div>

          {/* Mobile: Static Grid */}
          <div className="md:hidden">
            <MobileGrid />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
