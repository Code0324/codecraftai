'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiOpenai, SiAnthropic, SiGoogle, SiMeta, SiMistral,
  SiGithub, SiReplit, SiVercel, SiDocker,
  SiAmazonaws, SiGooglecloud, SiMicrosoft,
  SiSlack, SiNotion, SiShopify, SiHubspot, SiSalesforce
} from 'react-icons/si';
import {
  Bot, Zap, Code2, Megaphone, Cloud, Database, Users, DollarSign, ShoppingCart, Workflow, ArrowRight
} from 'lucide-react';

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  tools: string[];
}

const categories: Category[] = [
  {
    id: 'llms',
    title: 'LLMs & AI Models',
    icon: <SiOpenai className="w-6 h-6" />,
    tools: ['ChatGPT', 'Claude', 'Gemini', 'Llama', 'Mistral'],
  },
  {
    id: 'agents',
    title: 'AI Agents & Assistants',
    icon: <Bot className="w-6 h-6" />,
    tools: ['Research', 'Analyze', 'Create', 'Plan', 'Execute'],
  },
  {
    id: 'automation',
    title: 'Automation & Workflows',
    icon: <Workflow className="w-6 h-6" />,
    tools: ['Zapier', 'Make', 'n8n', 'Pabbly', 'API'],
  },
  {
    id: 'dev',
    title: 'Development & Coding',
    icon: <Code2 className="w-6 h-6" />,
    tools: ['GitHub', 'Replit', 'Cursor', 'Devin', 'Copilot'],
  },
  {
    id: 'content',
    title: 'Content & Marketing',
    icon: <Megaphone className="w-6 h-6" />,
    tools: ['Copywriting', 'SEO', 'Social Media', 'Design', 'Video'],
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    icon: <Cloud className="w-6 h-6" />,
    tools: ['AWS', 'Azure', 'Google Cloud', 'Oracle', 'Docker'],
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    icon: <Database className="w-6 h-6" />,
    tools: ['BigQuery', 'Snowflake', 'Power BI', 'Looker', 'Databricks'],
  },
  {
    id: 'productivity',
    title: 'Productivity & Collaboration',
    icon: <Users className="w-6 h-6" />,
    tools: ['Slack', 'Notion', 'Microsoft 365', 'Google Workspace', 'Figma'],
  },
  {
    id: 'sales',
    title: 'Sales & CRM',
    icon: <DollarSign className="w-6 h-6" />,
    tools: ['HubSpot', 'Salesforce', 'Pipedrive', 'ActiveCampaign', 'Close'],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Operations',
    icon: <ShoppingCart className="w-6 h-6" />,
    tools: ['Shopify', 'WooCommerce', 'Inventory', 'Payments', 'Shipping'],
  },
];

const flowSteps = [
  { label: 'Discover', desc: 'Ideas & Research' },
  { label: 'Plan', desc: 'Strategy & Tasks' },
  { label: 'Build', desc: 'Content, Code, Systems' },
  { label: 'Execute', desc: 'Automate & Deploy' },
  { label: 'Grow', desc: 'Scale & Optimize' },
];

const outcomes = [
  { icon: '🚀', label: 'Startups', desc: 'Launch faster' },
  { icon: '💼', label: 'Businesses', desc: 'Work smarter' },
  { icon: '👥', label: 'Teams', desc: 'Be more productive' },
  { icon: '📈', label: 'Growth', desc: 'Achieve more' },
];

/* ─── Animated Hub ──────────────────────────────────────────── */
function AIHub() {
  return (
    <motion.div
      className="relative w-32 h-32 mx-auto mb-12"
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Pulsing glow background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Rotating border ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-amber-500 to-purple-500 bg-clip-border"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ padding: '2px' }}
      />

      {/* Central hub */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-purple-600 rounded-full flex items-center justify-center border border-amber-400/30">
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-center"
        >
          <div className="text-4xl font-black text-white">AI</div>
          <div className="text-xs text-amber-100 font-semibold mt-1">Core</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Category Card ──────────────────────────────────────────– */
function CategoryCard({ category, index, isLeft }: { category: Category; index: number; isLeft: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      {/* Card */}
      <div className="relative p-6 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 h-full flex flex-col">
        {/* Hover glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/0 to-purple-500/0 group-hover:from-amber-500/10 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none" />

        {/* Icon with animation */}
        <motion.div
          className="mb-4 text-amber-400 flex-shrink-0"
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
        >
          {category.icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
          {category.title}
        </h3>

        {/* Tools list */}
        <div className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {category.tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="text-xs bg-amber-600/20 text-amber-200 px-2 py-1 rounded border border-amber-500/30"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Border gradient on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, rgba(251,146,60,0.2) 0%, rgba(139,92,246,0.2) 100%)',
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Flow Step ──────────────────────────────────────────────– */
function FlowStep({ step, index, total }: { step: typeof flowSteps[0]; index: number; total: number }) {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
        className="flex-shrink-0"
      >
        <div className="relative">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center border border-amber-400/30 group">
            <div className="text-center">
              <div className="text-xs sm:text-sm font-bold text-white">{step.label}</div>
              <div className="text-xs text-amber-100">{step.desc.split('&')[0]}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {index < total - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.1, duration: 0.5 }}
          className="flex-grow hidden sm:flex items-center origin-left"
        >
          <div className="w-full h-0.5 bg-gradient-to-r from-amber-500 to-purple-600" />
          <ArrowRight className="w-4 h-4 text-amber-400 -ml-2 flex-shrink-0" />
        </motion.div>
      )}
    </div>
  );
}

/* ─── Main Section ──────────────────────────────────────────── */
export default function AIToolsNeon() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950"
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

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl"
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase">
            ⚡ AI-Powered Automation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 mb-4 heading-font">
            Build Smarter · Automate Faster · Grow Bigger
          </h2>
          <p className="text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Leverage the power of LLMs and modern tools to streamline your workflows, boost productivity, and scale your startup or business.
          </p>
        </motion.div>

        {/* Hub */}
        <AIHub />

        {/* 10 Category Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-16">
          {categories.map((cat, idx) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              index={idx}
              isLeft={idx < 5}
            />
          ))}
        </div>

        {/* Flow Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16 bg-slate-900/50 border border-amber-500/20 rounded-xl p-6 sm:p-8"
        >
          <div className="text-sm font-semibold text-amber-400 mb-6 text-center">⚡ End-to-End Automation</div>
          <div className="flex flex-col gap-4 overflow-x-auto">
            <div className="flex gap-3 sm:gap-4 justify-center">
              {flowSteps.map((step, idx) => (
                <FlowStep key={step.label} step={step} index={idx} total={flowSteps.length} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer Outcome Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {outcomes.map((outcome) => (
              <div
                key={outcome.label}
                className="p-4 rounded-lg bg-gradient-to-br from-amber-500/10 to-purple-500/10 border border-amber-500/20 hover:border-amber-400/40 transition-colors"
              >
                <div className="text-2xl mb-2">{outcome.icon}</div>
                <div className="font-semibold text-white text-sm">{outcome.label}</div>
                <div className="text-xs text-slate-400">{outcome.desc}</div>
              </div>
            ))}
          </div>

          <p className="text-lg font-semibold text-amber-100">
            AI + The Right Tools = Endless Possibilities
          </p>
        </motion.div>
      </div>
    </section>
  );
}
