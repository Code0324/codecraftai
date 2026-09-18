'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface Category {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

const leftCategories: Category[] = [
  {
    id: 'llms',
    title: 'LLMs & AI Models',
    desc: 'ChatGPT, Claude, Gemini, Llama, Mistral & more',
    icon: '/images/Ai-tools/01_llms_ai_models.png',
  },
  {
    id: 'agents',
    title: 'AI Agents & Assistants',
    desc: 'Research, analyze, create, plan, & take action',
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
];

const rightCategories: Category[] = [
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    desc: 'AWS, Azure, Google Cloud, Oracle, Vercel, Docker',
    icon: '/images/Ai-tools/06_cloud_infrastructure.png',
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    desc: 'Databases, BigQuery, Snowflake, Power BI, Looker',
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

const flowSteps = [
  { label: 'Discover', icon: '/images/Ai-tools/12_workflow_discover.png' },
  { label: 'Plan', icon: '/images/Ai-tools/13_workflow_plan.png' },
  { label: 'Build', icon: '/images/Ai-tools/14_workflow_build.png' },
  { label: 'Execute', icon: '/images/Ai-tools/15_workflow_execute.png' },
  { label: 'Grow', icon: '/images/Ai-tools/16_workflow_grow.png' },
];

const outcomes = [
  { label: 'Startups', desc: 'Launch faster', icon: '/images/Ai-tools/17_benefit_startups.png' },
  { label: 'Businesses', desc: 'Work smarter', icon: '/images/Ai-tools/18_benefit_businesses.png' },
  { label: 'Teams', desc: 'Be more productive', icon: '/images/Ai-tools/19_benefit_teams.png' },
  { label: 'Growth', desc: 'Achieve more', icon: '/images/Ai-tools/20_benefit_growth.png' },
];

/* ─── Category Card ──────────────────────────────────────────– */
function CategoryCard({ category, index }: { category: Category; index: number }) {
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: prefersReduced.current ? 0 : index * 0.06, duration: 0.5 }}
      whileHover={prefersReduced.current ? {} : { x: 8 }}
      className="group flex items-start gap-4 cursor-pointer"
    >
      {/* Icon Image */}
      <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20">
        <Image
          src={category.icon}
          alt={category.title}
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-lg"
          quality={90}
        />
      </div>

      {/* Text Content */}
      <div className="flex-grow pt-0 md:pt-2">
        <h3 className="text-sm md:text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
          {category.title}
        </h3>
        <p className="text-xs md:text-sm text-slate-400 leading-snug">
          {category.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Flow Step ──────────────────────────────────────────────– */
function FlowStep({ step, index, total }: { step: typeof flowSteps[0]; index: number; total: number }) {
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: prefersReduced.current ? 0 : index * 0.1, duration: 0.4 }}
        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 flex items-center justify-center group hover:border-cyan-400/60 transition-all"
      >
        <Image
          src={step.icon}
          alt={step.label}
          width={60}
          height={60}
          className="w-10 h-10 md:w-12 md:h-12 object-contain"
        />
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: prefersReduced.current ? 0 : index * 0.1 + 0.1, duration: 0.3 }}
        className="text-xs md:text-sm font-bold text-white text-center"
      >
        {step.label}
      </motion.span>

      {index < total - 1 && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReduced.current ? 0 : index * 0.1 + 0.2, duration: 0.4 }}
          className="absolute left-full top-1/3 w-8 h-0.5 origin-left"
          style={{ background: 'linear-gradient(to right, #06b6d4, #7c3aed)' }}
        />
      )}
    </div>
  );
}

/* ─── Outcome Card ──────────────────────────────────────────– */
function OutcomeCard({ outcome, index }: { outcome: typeof outcomes[0]; index: number }) {
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: prefersReduced.current ? 0 : index * 0.1, duration: 0.5 }}
      whileHover={prefersReduced.current ? {} : { y: -8 }}
      className="group text-center cursor-pointer"
    >
      <div className="mb-4 relative inline-block">
        <Image
          src={outcome.icon}
          alt={outcome.label}
          width={100}
          height={100}
          className="w-24 h-24 md:w-32 md:h-32 object-contain mx-auto drop-shadow-lg group-hover:drop-shadow-2xl transition-all"
        />
      </div>
      <h3 className="text-base md:text-lg font-bold text-white mb-1">{outcome.label}</h3>
      <p className="text-xs md:text-sm text-slate-400">{outcome.desc}</p>
    </motion.div>
  );
}

/* ─── Main Section ──────────────────────────────────────────── */
export default function AIToolsNeon() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

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

      {/* Animated background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-64 -right-64 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"
          animate={prefersReduced.current ? {} : { y: [-40, 40, -40], x: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-64 -left-64 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"
          animate={prefersReduced.current ? {} : { y: [40, -40, 40], x: [20, -20, 20] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30"
            animate={prefersReduced.current ? {} : { opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs md:text-sm font-semibold text-cyan-300 tracking-widest uppercase">
              ⚡ AI-Powered Business Automation
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 leading-tight">
            Build Smarter<br />
            Automate Faster<br />
            Grow Bigger
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Leverage the power of AI, automation, modern software and cloud technology to streamline workflows, boost productivity, and scale your business.
          </p>
        </motion.div>

        {/* Desktop Layout: Left | Center | Right */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center mb-20">
          {/* Left Column - 5 Categories */}
          <div className="lg:col-span-4 space-y-6">
            {leftCategories.map((cat, idx) => (
              <CategoryCard key={cat.id} category={cat} index={idx} />
            ))}
          </div>

          {/* Center - AI Core */}
          <div className="lg:col-span-4 flex justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl -m-8"
                animate={prefersReduced.current ? {} : { scale: [0.95, 1.1, 0.95] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                animate={prefersReduced.current ? {} : { y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Image
                  src="/images/Ai-tools/11_central_ai_brain_hub.png"
                  alt="AI Brain"
                  width={320}
                  height={320}
                  priority
                  className="relative z-10 drop-shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - 5 Categories */}
          <div className="lg:col-span-4 space-y-6">
            {rightCategories.map((cat, idx) => (
              <CategoryCard key={cat.id} category={cat} index={5 + idx} />
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden space-y-12 mb-16">
          {/* AI Core */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <motion.div
              className="relative"
              animate={prefersReduced.current ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/images/Ai-tools/11_central_ai_brain_hub.png"
                alt="AI Brain"
                width={240}
                height={240}
                priority
                className="drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

          {/* Left Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider text-center mb-6">
              AI & Automation
            </h3>
            <div className="space-y-4">
              {leftCategories.map((cat, idx) => (
                <CategoryCard key={cat.id} category={cat} index={idx} />
              ))}
            </div>
          </div>

          {/* Right Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider text-center mb-6">
              Infrastructure & Operations
            </h3>
            <div className="space-y-4">
              {rightCategories.map((cat, idx) => (
                <CategoryCard key={cat.id} category={cat} index={5 + idx} />
              ))}
            </div>
          </div>
        </div>

        {/* End-to-End Automation Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16 lg:mb-20"
        >
          <div className="inline-flex w-full justify-center mb-8">
            <div className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 backdrop-blur-sm">
              <span className="text-xs md:text-sm font-semibold text-cyan-300 tracking-widest uppercase">
                ⚡ End-to-End Automation
              </span>
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="relative flex flex-col md:flex-row justify-center items-center gap-4 md:gap-2">
            {flowSteps.map((step, idx) => (
              <div key={step.label} className="relative flex-1 max-w-xs md:max-w-none">
                <FlowStep step={step} index={idx} total={flowSteps.length} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Business Outcomes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {outcomes.map((outcome, idx) => (
              <OutcomeCard key={outcome.label} outcome={outcome} index={idx} />
            ))}
          </div>
        </motion.div>

        {/* Final Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-lg md:text-xl font-bold text-white">
            AI + The Right Tools = Endless Possibilities
          </p>
        </motion.div>
      </div>
    </section>
  );
}
