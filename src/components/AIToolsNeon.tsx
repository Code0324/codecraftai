'use client';

import { motion, MotionConfig } from 'framer-motion';
import Image from 'next/image';

interface Category {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

const coreTools: Category[] = [
  {
    id: 'llms',
    title: 'LLMs & AI Models',
    desc: 'ChatGPT • Claude • Gemini • Llama • Mistral',
    icon: '/images/Ai-tools/01_llms_ai_models.png',
  },
  {
    id: 'agents',
    title: 'AI Agents & Assistants',
    desc: 'Research • Analyze • Create • Plan • Take Action',
    icon: '/images/Ai-tools/02_ai_agents_assistants.png',
  },
  {
    id: 'automation',
    title: 'Automation & Workflows',
    desc: 'Zapier • Make • n8n • Pabbly',
    icon: '/images/Ai-tools/03_automation_workflows.png',
  },
  {
    id: 'dev',
    title: 'Development & Coding',
    desc: 'GitHub • Replit • Cursor • Devin • Copilot',
    icon: '/images/Ai-tools/04_development_coding.png',
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    desc: 'AWS • Azure • Google Cloud • Oracle • Vercel',
    icon: '/images/Ai-tools/06_cloud_infrastructure.png',
  },
];

const businessTools: Category[] = [
  {
    id: 'content',
    title: 'Content & Marketing',
    desc: 'Copywriting • SEO • Social Media • Design',
    icon: '/images/Ai-tools/05_content_marketing.png',
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    desc: 'Databases • BigQuery • Snowflake • Power BI',
    icon: '/images/Ai-tools/07_data_analytics.png',
  },
  {
    id: 'productivity',
    title: 'Productivity & Collaboration',
    desc: 'Slack • Notion • Microsoft 365 • Google Workspace',
    icon: '/images/Ai-tools/08_productivity_collaboration.png',
  },
  {
    id: 'sales',
    title: 'Sales & CRM',
    desc: 'HubSpot • Salesforce • Pipedrive • ActiveCampaign',
    icon: '/images/Ai-tools/09_sales_crm.png',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Operations',
    desc: 'Shopify • WooCommerce • Inventory • Payments',
    icon: '/images/Ai-tools/10_ecommerce_operations.png',
  },
];

/* ---------------------------------------------------------
   Neon Connector
--------------------------------------------------------- */

function Connector({
  direction = 'down',
}: {
  direction?: 'down' | 'up';
}) {
  return (
    <div
      className={`relative h-20 w-full overflow-hidden ${
        direction === 'up' ? 'rotate-180' : ''
      }`}
    >
      <div className="absolute left-1/2 top-0 h-full w-px bg-cyan-400/30" />

      <motion.div
        className="absolute left-1/2 top-0 h-8 w-[3px] -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_14px_4px_rgba(34,211,238,0.8)]"
        animate={{
          y: [0, 48, 72],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-cyan-200 bg-cyan-400 shadow-[0_0_18px_5px_rgba(34,211,238,0.7)]" />
    </div>
  );
}

/* ---------------------------------------------------------
   Orchestrator
--------------------------------------------------------- */

function Orchestrator() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: -20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative mx-auto w-fit"
    >
      {/* AI glow */}
      <div className="absolute -inset-12 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* AI Orb */}
      <div className="relative mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/60 bg-cyan-400/10 shadow-[0_0_35px_rgba(34,211,238,0.55)] backdrop-blur-xl">
        <div className="absolute inset-2 rounded-full border border-cyan-300/20" />

        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_30px_rgba(59,130,246,0.8)]">
          <span className="text-xl font-black text-white">AI</span>
        </div>
      </div>

      {/* Orchestrator Card */}
      <div className="relative min-w-[260px] rounded-2xl border border-cyan-400/50 bg-slate-950/70 px-8 py-5 text-center shadow-[0_0_30px_rgba(34,211,238,0.18)] backdrop-blur-xl">
        <h3 className="text-xl font-bold text-white">
          AI Orchestrator
        </h3>

        <p className="mt-1 text-sm text-cyan-200">
          AI Coordinator
        </p>

        <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------
   Tool Card
--------------------------------------------------------- */

function ToolCard({
  tool,
  index,
  core = false,
}: {
  tool: Category;
  index: number;
  core?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.08,
        duration: 0.55,
      }}
      whileHover={{
        y: -7,
        scale: 1.025,
      }}
      className="group relative"
    >
      {/* Glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-400/30 via-blue-500/20 to-violet-500/30 opacity-0 blur-sm transition duration-300 group-hover:opacity-100" />

      {/* Card */}
      <div
        className={`
          relative h-full overflow-hidden rounded-2xl
          border border-cyan-400/30
          bg-slate-950/65
          backdrop-blur-xl
          transition-all duration-300
          group-hover:border-cyan-300/70
          group-hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]
          ${core ? 'min-h-[190px]' : 'min-h-[170px]'}
        `}
      >
        {/* Top glow */}
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-60" />

        {/* Icon */}
        <div className="flex justify-center pt-5">
          <div
            className={`
              relative flex items-center justify-center rounded-full
              border border-cyan-300/50
              bg-gradient-to-br from-cyan-400/20 to-blue-600/10
              shadow-[0_0_25px_rgba(34,211,238,0.25)]
              ${core ? 'h-16 w-16' : 'h-14 w-14'}
            `}
          >
            <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-md" />

            <Image
              src={tool.icon}
              alt={tool.title}
              width={core ? 42 : 36}
              height={core ? 42 : 36}
              className="relative z-10 object-contain brightness-125"
              unoptimized
            />
          </div>
        </div>

        {/* Text */}
        <div className="px-4 pb-5 pt-4 text-center">
          <h3
            className={`
              font-bold text-white
              ${core ? 'text-base md:text-lg' : 'text-sm md:text-base'}
            `}
          >
            {tool.title}
          </h3>

          <p className="mx-auto mt-2 max-w-[260px] text-xs leading-relaxed text-slate-300">
            {tool.desc}
          </p>
        </div>

        {/* Bottom glow */}
        <div className="absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------
   Desktop Connector Network
--------------------------------------------------------- */

function DesktopNetworkLines() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[220px] md:block">
      {/* Main vertical line */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-cyan-400/0 via-cyan-400/40 to-cyan-400/10" />

      {/* Horizontal branching line */}
      <div className="absolute left-[10%] right-[10%] top-[160px] h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* Animated pulse */}
      <motion.div
        className="absolute left-1/2 top-0 h-10 w-[3px] rounded-full bg-cyan-300 shadow-[0_0_15px_5px_rgba(34,211,238,0.8)]"
        animate={{
          y: [0, 120, 170],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

/* ---------------------------------------------------------
   Status Bar
--------------------------------------------------------- */

function StatusBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="relative mt-12 overflow-hidden rounded-2xl border border-cyan-400/40 bg-slate-950/75 shadow-[0_0_35px_rgba(34,211,238,0.16)] backdrop-blur-xl"
    >
      {/* Top glow */}
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

      <div className="grid grid-cols-2 divide-x divide-cyan-400/10 md:grid-cols-4">
        {/* Status */}
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-cyan-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M12 3l7 3v5c0 4.7-3 8-7 10-4-2-7-5.3-7-10V6l7-3z" />
              <path d="M8.5 12l2.2 2.2 4.8-5" />
            </svg>
          </div>

          <div>
            <p className="text-sm font-bold text-white">
              System Status
            </p>
            <p className="text-xs text-cyan-300">
              All Systems Operational
            </p>
          </div>
        </div>

        {/* Efficiency */}
        <div className="px-5 py-5 text-center">
          <div className="text-2xl font-bold text-cyan-300">
            98.7%
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Efficiency
          </div>
        </div>

        {/* Response */}
        <div className="px-5 py-5 text-center">
          <div className="text-2xl font-bold text-cyan-300">
            2.4ms
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Response Time
          </div>
        </div>

        {/* Monitoring */}
        <div className="px-5 py-5 text-center">
          <div className="text-2xl font-bold text-cyan-300">
            24/7
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Monitoring
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="border-t border-cyan-400/10 px-5 py-3">
        <div className="flex h-12 items-end gap-1 opacity-80">
          {[25, 38, 30, 48, 34, 52, 42, 60, 50, 70, 55, 78].map(
            (height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.5 + i * 0.04,
                  duration: 0.5,
                }}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-600/30 to-cyan-300"
              />
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------
   Mobile Category
--------------------------------------------------------- */

function MobileToolList() {
  const tools = [...coreTools, ...businessTools];

  return (
    <div className="grid grid-cols-1 gap-4">
      {tools.map((tool, index) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          index={index}
          core={index < coreTools.length}
        />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------------- */

export default function AIToolsNeon() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-[#050914] py-24 md:py-32">
        {/* ------------------------------------------------
            Ambient Background
        ------------------------------------------------ */}

        <div className="pointer-events-none absolute inset-0">
          {/* Main cyan glow */}
          <div className="absolute left-1/2 top-0 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/[0.06] blur-[140px]" />

          {/* Blue glow */}
          <div className="absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/[0.06] blur-[130px]" />

          {/* Violet glow */}
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-violet-600/[0.05] blur-[130px]" />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34,211,238,0.8) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34,211,238,0.8) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* ------------------------------------------------
              Section Header
          ------------------------------------------------ */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80 md:text-sm">
              Our Ecosystem
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                10+ Categories
              </span>{' '}
              of AI Tools
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
              Explore the AI models, agents, automation platforms,
              development tools and business systems powering modern
              digital workflows.
            </p>

            <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
          </motion.div>

          {/* ------------------------------------------------
              Desktop Architecture
          ------------------------------------------------ */}

          <div className="hidden md:block">
            {/* Orchestrator */}
            <Orchestrator />

            <Connector />

            {/* Core categories */}
            <div className="relative">
              <DesktopNetworkLines />

              <div className="relative grid grid-cols-5 gap-4 lg:gap-5">
                {coreTools.map((tool, index) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    index={index}
                    core
                  />
                ))}
              </div>
            </div>

            {/* Connection */}
            <div className="mx-auto h-16 w-px bg-gradient-to-b from-cyan-400/50 to-violet-400/40" />

            {/* Business categories */}
            <div className="relative">
              <div className="absolute left-[10%] right-[10%] top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />

              <div className="grid grid-cols-5 gap-4 lg:gap-5 pt-10">
                {businessTools.map((tool, index) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Status */}
            <StatusBar />
          </div>

          {/* ------------------------------------------------
              Mobile
          ------------------------------------------------ */}

          <div className="md:hidden">
            <Orchestrator />

            <Connector />

            <MobileToolList />

            <StatusBar />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}