'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { fadeUpVariants } from '@/lib/animations';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────────── */
interface Metric {
    value: string;
    label: string;
    positive: boolean;
}

interface CaseStudy {
    id: string;
    category: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;          // screenshot / cover image URL
    accentFrom: string;
    accentTo: string;
    metrics: Metric[];
    url?: string;
}

/* ─── Category icons (emoji fallback — swap with lucide if preferred) ── */
const categoryIcons: Record<string, string> = {
    'AI Agents': '🤖',
    'Full-Stack': '⚡',
    'Automation': '🔄',
    'E-Commerce': '🛍️',
    'SaaS': '📊',
    'Community': '🏛️',
};

/* ─── Case study data (CodeCraftAI real projects) ────────────── */
const caseStudies: CaseStudy[] = [
    {
        id: 'ai-employee',
        category: 'AI Agents',
        title: 'Personal AI Employee',
        subtitle: 'Full Autonomous Agent — 28/28 Platinum',
        description:
            'Built a fully autonomous AI agent using Claude API + MCP servers. It handles Gmail OAuth2, posts to social media, manages an Obsidian memory vault, and logs everything to Neon PostgreSQL — all from a magenta-purple Next.js dashboard.',
        image: 'https://image.thum.io/get/width/900/crop/560/noanimate/https://ummay-kulsoom-portfolio.vercel.app/',
        accentFrom: '#4F8EF7',
        accentTo: '#7C3AED',
        metrics: [
            { value: '28/28', label: 'Platinum hackathon score', positive: true },
            { value: '4 hrs', label: 'Saved daily per user', positive: true },
            { value: '100%', label: 'Task automation rate', positive: true },
        ],
        url: 'https://github.com/Ummay480/Personal-AI-Employee',
    },
    {
        id: 'al-imran',
        category: 'E-Commerce',
        title: 'Al Imran Fabrics',
        subtitle: 'Multi-Brand E-Commerce Platform',
        description:
            'Full-stack e-commerce platform with Next.js frontend, FastAPI backend, and Neon DB. Features multi-brand catalog (Nishat, MTJ, Al-Karam), admin panel, social auth, and Railway deployment. Live and serving real customers.',
        image: 'https://image.thum.io/get/width/900/crop/560/noanimate/https://alimranfabricsonline-hazel.vercel.app/',
        accentFrom: '#F59E0B',
        accentTo: '#EF4444',
        metrics: [
            { value: '3x', label: 'Brands on single platform', positive: true },
            { value: '-80%', label: 'Manual order tracking', positive: false },
            { value: '100%', label: 'Mobile responsive', positive: true },
        ],
        url: 'https://alimranfabricsonline-hazel.vercel.app/',
    },
    {
        id: 'crm-factory',
        category: 'AI Agents',
        title: 'CRM Digital FTE Factory',
        subtitle: 'Multi-Channel AI Customer Support',
        description:
            'Multi-channel AI customer support system using OpenAI Agents SDK, FastAPI, Kafka, PostgreSQL/pgvector, and Kubernetes. Next.js frontend deployed on Vercel. Achieved 91% score at GIAIC Hackathon 5.',
        image: 'https://image.thum.io/get/width/900/crop/560/noanimate/https://ummay-kulsoom-portfolio.vercel.app/',
        accentFrom: '#06B6D4',
        accentTo: '#4F8EF7',
        metrics: [
            { value: '91%', label: 'Hackathon score', positive: true },
            { value: '5', label: 'AI channels automated', positive: true },
            { value: '-60%', label: 'Support response time', positive: false },
        ],
        url: 'https://github.com/Ummay480',
    },
    {
        id: 'poshak',
        category: 'Full-Stack',
        title: 'Poshak Visualizer',
        subtitle: 'AI Fashion — Fabric to Model Wear',
        description:
            'AI fashion app converting fabric images to photorealistic model wear using Next.js, FastAPI, HuggingFace SDXL, Cloudinary, and Neon DB. Deployed on Railway with WSL-to-Windows API bridge.',
        image: 'https://image.thum.io/get/width/900/crop/560/noanimate/https://ummay-kulsoom-portfolio.vercel.app/',
        accentFrom: '#EC4899',
        accentTo: '#7C3AED',
        metrics: [
            { value: '< 8s', label: 'Image generation time', positive: true },
            { value: '3', label: 'Deployment platforms', positive: true },
            { value: '100%', label: 'Serverless architecture', positive: true },
        ],
        url: 'https://github.com/Code0324/Poshak-Visualizer',
    },
    {
        id: 'shahpoor',
        category: 'Community',
        title: 'ShahPoor Community Platform',
        subtitle: 'Islamic Community Website — 7 Chunks, Zero Errors',
        description:
            'Full-stack Next.js 14 + Prisma + PostgreSQL + Claude API community platform with Islamic design elements, member management, Stripe payments, AI blog, and multilingual support. All 7 chunks built with zero TypeScript errors.',
        image: 'https://image.thum.io/get/width/900/crop/560/noanimate/https://ummay-kulsoom-portfolio.vercel.app/',
        accentFrom: '#10B981',
        accentTo: '#06B6D4',
        metrics: [
            { value: '0', label: 'TypeScript errors', positive: true },
            { value: '4', label: 'Languages supported', positive: true },
            { value: 'Stripe', label: 'Payments integrated', positive: true },
        ],
        url: 'https://github.com/Ummay480',
    },
    {
        id: 'saaS-dashboard',
        category: 'SaaS',
        title: 'AI SaaS Dashboard',
        subtitle: 'FastAPI + Next.js + GPT-4o Integration',
        description:
            'Multi-tenant SaaS dashboard with real-time analytics, GPT-4o integrations, and subscription billing. Built with Next.js frontend, FastAPI backend, PostgreSQL, and Stripe — designed for scale from day one.',
        image: 'https://image.thum.io/get/width/900/crop/560/noanimate/https://ummay-kulsoom-portfolio.vercel.app/',
        accentFrom: '#7C3AED',
        accentTo: '#EC4899',
        metrics: [
            { value: 'GPT-4o', label: 'AI model integrated', positive: true },
            { value: 'Multi', label: 'Tenant architecture', positive: true },
            { value: 'Stripe', label: 'Billing ready', positive: true },
        ],
        url: 'https://github.com/Ummay480',
    },
];

const categories = ['All', ...Object.keys(categoryIcons)];

/* ─── Metric badge ───────────────────────────────────────────── */
function MetricBadge({ metric }: { metric: Metric }) {
    return (
        <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
            }}
        >
            <span
                className="text-sm font-bold font-mono flex-shrink-0"
                style={{
                    color: metric.positive ? '#34D399' : '#F87171',
                    minWidth: 52,
                }}
            >
                {metric.value}
            </span>
            <span className="text-slate-400 text-sm leading-snug">{metric.label}</span>
        </div>
    );
}

/* ─── Main component ─────────────────────────────────────────── */
export default function CaseStudies() {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: '-80px' });

    const [activeCategory, setActiveCategory] = useState('All');
    const [activeStudy, setActiveStudy] = useState<CaseStudy>(caseStudies[0]);

    const filtered =
        activeCategory === 'All'
            ? caseStudies
            : caseStudies.filter((c) => c.category === activeCategory);

    // Keep activeStudy in sync when category changes
    function setCategory(cat: string) {
        setActiveCategory(cat);
        const next =
            cat === 'All'
                ? caseStudies[0]
                : caseStudies.find((c) => c.category === cat) ?? caseStudies[0];
        setActiveStudy(next);
    }

    return (
        <section
            id="case-studies"
            ref={sectionRef}
            className="relative py-24 lg:py-32"
            style={{ borderBottom: '1px solid rgba(79,142,247,0.08)' }}
        >
            {/* ── Subtle background glow ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 0%, rgba(79,142,247,0.05) 0%, transparent 55%)',
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Header ── */}
                <motion.div
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-semibold text-blue-400 tracking-widest uppercase">
                        Projects
                    </span>
                    <h2
                        className="heading-font font-bold mt-3 text-white"
                        style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
                    >
                        Automation That Delivers{' '}
                        <span className="text-gradient">Real Impact</span>
                    </h2>
                    <div className="section-underline" />
                    <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-base leading-relaxed px-4">
                        We've built custom AI automation solutions that drive measurable results —
                        from hackathon platinum scores to live production deployments.
                    </p>
                </motion.div>

                {/* ── Main layout: sidebar + card ── */}
                <motion.div
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    transition={{ delay: 0.15 }}
                    className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start"
                >

                    {/* ── Left sidebar: category list ── */}
                    <div className="flex flex-row lg:flex-col gap-2 flex-wrap">
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat;
                            const count =
                                cat === 'All'
                                    ? caseStudies.length
                                    : caseStudies.filter((c) => c.category === cat).length;

                            return (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-left w-full transition-all duration-200 group"
                                    style={{
                                        background: isActive
                                            ? 'rgba(79,142,247,0.12)'
                                            : 'transparent',
                                        border: isActive
                                            ? '1px solid rgba(79,142,247,0.35)'
                                            : '1px solid transparent',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            (e.currentTarget as HTMLButtonElement).style.background =
                                                'rgba(255,255,255,0.04)';
                                            (e.currentTarget as HTMLButtonElement).style.borderColor =
                                                'rgba(255,255,255,0.08)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            (e.currentTarget as HTMLButtonElement).style.background =
                                                'transparent';
                                            (e.currentTarget as HTMLButtonElement).style.borderColor =
                                                'transparent';
                                        }
                                    }}
                                >
                                    {cat !== 'All' && (
                                        <span className="text-lg flex-shrink-0">
                                            {categoryIcons[cat]}
                                        </span>
                                    )}
                                    <span
                                        className="text-sm font-medium flex-1"
                                        style={{ color: isActive ? '#f1f5f9' : '#94a3b8' }}
                                    >
                                        {cat}
                                    </span>
                                    <span
                                        className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0"
                                        style={{
                                            background: isActive
                                                ? 'rgba(79,142,247,0.2)'
                                                : 'rgba(255,255,255,0.06)',
                                            color: isActive ? '#93C5FD' : '#64748b',
                                        }}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* ── Right: Project showcase card ── */}
                    <div className="flex flex-col gap-6">

                        {/* ── Project image + detail card ── */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStudy.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="glass-card overflow-hidden"
                            >
                                {/* Cover image */}
                                <div
                                    className="relative w-full overflow-hidden"
                                    style={{ aspectRatio: '16/8', background: '#0d1117' }}
                                >
                                    {/* Gradient placeholder */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: `linear-gradient(135deg, ${activeStudy.accentFrom}22, ${activeStudy.accentTo}18)`,
                                        }}
                                    />
                                    <Image
                                        src={activeStudy.image}
                                        alt={activeStudy.title}
                                        fill
                                        className="object-cover object-top"
                                        unoptimized
                                    />
                                    {/* Bottom fade */}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                                        style={{
                                            background:
                                                'linear-gradient(to top, rgba(13,17,30,0.9), transparent)',
                                        }}
                                    />
                                    {/* Category badge */}
                                    <div
                                        className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                                        style={{
                                            background: 'rgba(10,11,15,0.75)',
                                            border: '1px solid rgba(255,255,255,0.12)',
                                            backdropFilter: 'blur(8px)',
                                            color: '#94a3b8',
                                        }}
                                    >
                                        <span>{categoryIcons[activeStudy.category]}</span>
                                        <span>{activeStudy.category}</span>
                                    </div>
                                    {/* External link */}
                                    {activeStudy.url && (
                                        <a
                                            href={activeStudy.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                                            style={{
                                                background: 'rgba(10,11,15,0.75)',
                                                border: '1px solid rgba(255,255,255,0.12)',
                                                backdropFilter: 'blur(8px)',
                                                color: '#94a3b8',
                                            }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLElement).style.color = '#4F8EF7';
                                                (e.currentTarget as HTMLElement).style.borderColor =
                                                    'rgba(79,142,247,0.4)';
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                                                (e.currentTarget as HTMLElement).style.borderColor =
                                                    'rgba(255,255,255,0.12)';
                                            }}
                                        >
                                            <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>

                                {/* Card body */}
                                <div className="p-7 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8">
                                    {/* Left: title + description */}
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-2">
                                                {activeStudy.subtitle}
                                            </p>
                                            <h3
                                                className="heading-font font-bold text-white leading-snug"
                                                style={{ fontSize: 'clamp(20px, 2.5vw, 26px)' }}
                                            >
                                                {activeStudy.title}
                                            </h3>
                                        </div>
                                        <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                                            {activeStudy.description}
                                        </p>
                                    </div>

                                    {/* Right: metrics */}
                                    <div className="flex flex-col gap-3 min-w-[220px]">
                                        {activeStudy.metrics.map((m, i) => (
                                            <MetricBadge key={i} metric={m} />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* ── Thumbnail row (click to switch) ── */}
                        <div className="flex gap-3 flex-wrap">
                            {filtered.map((cs) => (
                                <button
                                    key={cs.id}
                                    onClick={() => setActiveStudy(cs)}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-200"
                                    style={{
                                        background:
                                            activeStudy.id === cs.id
                                                ? 'rgba(79,142,247,0.12)'
                                                : 'rgba(255,255,255,0.04)',
                                        border:
                                            activeStudy.id === cs.id
                                                ? '1px solid rgba(79,142,247,0.35)'
                                                : '1px solid rgba(255,255,255,0.07)',
                                        color:
                                            activeStudy.id === cs.id ? '#f1f5f9' : '#94a3b8',
                                    }}
                                >
                                    <span className="text-base">{categoryIcons[cs.category]}</span>
                                    <span className="font-medium">{cs.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}