import { Smartphone, Bot, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ─── Nav Links ─────────────────────────────────────────────── */
export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Dashboard', href: '#hero' },
  { label: 'About', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Our Team', href: '#team' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

/* ─── Services ──────────────────────────────────────────────── */
export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  image: string;
}

export const services: Service[] = [
  {
    icon: Smartphone,
    title: 'App Creation',
    description:
      'We design and build high-performance web and mobile applications powered by AI. From concept to deployment, every line of code is crafted for scale, speed, and seamless user experience.',
    gradient: 'from-blue-500 to-cyan-500',
    image: '/images/services/saas-ai.png',
  },
  {
    icon: Bot,
    title: 'AI Chatbots',
    description:
      'Deploy intelligent conversational agents that understand context, learn from interactions, and automate customer engagement 24/7 — integrated with your existing platforms.',
    gradient: 'from-purple-500 to-pink-500',
    image: '/images/services/chatbot.png',
  },
  {
    icon: Settings,
    title: 'Automation',
    description:
      'Eliminate repetitive workflows with AI-driven automation pipelines. We connect your tools, automate your processes, and free your team to focus on what matters most.',
    gradient: 'from-cyan-500 to-blue-600',
    image: '/images/services/ai-automation.png',
  },
];

/* ─── Project Categories ────────────────────────────────────── */
export const projectCategories = [
  'All',
  'Portfolio & Tools',
  'AI & Automation',
  'Dashboards',
  'E-Commerce',
  'Community & Misc',
] as const;

export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectCategoryTag = Exclude<ProjectCategory, 'All'>;

/* ─── Projects ──────────────────────────────────────────────── */
export interface Project {
  title: string;
  description: string;
  url: string;
  tags: string[];
  category: ProjectCategoryTag;
  accentColor: string; // loading skeleton accent
}

export const projects: Project[] = [
  /* ── Portfolio & Tools ── */
  {
    title: 'Ummay Kulsoom Portfolio',
    description:
      'Personal developer portfolio showcasing projects, skills, and AI-first work — built with Next.js 14 and Framer Motion animations.',
    url: 'https://ummay-kulsoom-portfolio.vercel.app/',
    tags: ['Next.js', 'Framer Motion', 'Portfolio'],
    category: 'Portfolio & Tools',
    accentColor: 'from-blue-600/30 to-violet-900/30',
  },
  {
    title: 'Docusaurus Textbook',
    description:
      'Full interactive digital textbook built with Docusaurus — structured learning content, MDX components, and search-enabled navigation.',
    url: 'https://1-docosaurus-textbook.vercel.app/',
    tags: ['Docusaurus', 'MDX', 'Docs'],
    category: 'Portfolio & Tools',
    accentColor: 'from-sky-600/30 to-blue-900/30',
  },
  {
    title: 'Workflow Automation',
    description:
      'Visual workflow builder and automation orchestration platform — connect APIs, trigger actions, and manage multi-step business processes.',
    url: 'https://work-flow-psi.vercel.app/',
    tags: ['Workflow', 'Automation', 'Next.js'],
    category: 'Portfolio & Tools',
    accentColor: 'from-teal-600/30 to-cyan-900/30',
  },

  /* ── AI & Automation ── */
  {
    title: 'CRM Digital Employee',
    description:
      'Autonomous AI agent that handles CRM data entry, follow-up emails, and lead scoring — acting as a fully-functional digital sales employee.',
    url: 'https://crm-digital-employee.vercel.app/',
    tags: ['Claude API', 'CRM', 'AI Agent'],
    category: 'AI & Automation',
    accentColor: 'from-purple-600/30 to-indigo-900/30',
  },
  {
    title: 'Karachi Port Watch',
    description:
      'Real-time AI-powered port monitoring dashboard — tracking vessel movement, cargo status, and port congestion analytics for Karachi harbor.',
    url: 'https://karachi-port-watch.vercel.app/',
    tags: ['Real-time', 'AI Analytics', 'Maps'],
    category: 'AI & Automation',
    accentColor: 'from-blue-700/30 to-sky-900/30',
  },
  {
    title: 'Vessel Tracking',
    description:
      'Live maritime vessel tracking system with AIS data integration, route history, and port arrival predictions powered by machine learning.',
    url: 'https://vessel-tracking-update.vercel.app/',
    tags: ['AIS Data', 'Tracking', 'ML'],
    category: 'AI & Automation',
    accentColor: 'from-cyan-700/30 to-blue-900/30',
  },

  /* ── Dashboards ── */
  {
    title: 'Next.js Dashboard',
    description:
      'Production-ready analytics dashboard with server-side data fetching, dynamic charts, user management, and role-based access control.',
    url: 'https://nextjs-dashboard-sepia-seven-garbo3q349.vercel.app/',
    tags: ['Next.js', 'Charts', 'RBAC'],
    category: 'Dashboards',
    accentColor: 'from-indigo-600/30 to-blue-900/30',
  },
  {
    title: 'Todo App',
    description:
      'Feature-complete task management app with authentication, real-time sync, drag-and-drop reordering, and priority labels.',
    url: 'https://todo-app-login-signup-5cyh.vercel.app/',
    tags: ['Auth', 'Real-time', 'React'],
    category: 'Dashboards',
    accentColor: 'from-green-600/30 to-emerald-900/30',
  },

  /* ── E-Commerce ── */
  {
    title: 'MakeUp Muse',
    description:
      'AI-assisted beauty e-commerce store with virtual try-on suggestions, skin-tone matching, and personalised product recommendations.',
    url: 'https://make-up-muse.vercel.app/',
    tags: ['E-Commerce', 'AI Recs', 'Beauty'],
    category: 'E-Commerce',
    accentColor: 'from-pink-600/30 to-rose-900/30',
  },
  {
    title: 'Glow Up Beauty',
    description:
      'Modern beauty & skincare storefront with product filtering, wishlist, cart, and checkout — built for conversion-optimised UX.',
    url: 'https://glow-up-hyee.vercel.app/',
    tags: ['Storefront', 'Skincare', 'Next.js'],
    category: 'E-Commerce',
    accentColor: 'from-fuchsia-600/30 to-purple-900/30',
  },
  {
    title: 'DailyWear Collections',
    description:
      'Everyday fashion e-commerce site with size guides, outfit builder, lookbook gallery, and express checkout flow.',
    url: 'https://dailywear-collections.vercel.app/',
    tags: ['Fashion', 'Catalogue', 'Cart'],
    category: 'E-Commerce',
    accentColor: 'from-orange-600/30 to-amber-900/30',
  },
  {
    title: 'Luxe Living',
    description:
      'Premium home goods and furniture store with 3D product previews, room visualiser, and curated collection pages.',
    url: 'https://luxe-living-amber.vercel.app/',
    tags: ['Furniture', 'Luxury', 'Shopify'],
    category: 'E-Commerce',
    accentColor: 'from-yellow-600/30 to-orange-900/30',
  },
  {
    title: 'Home Appliances',
    description:
      'Consumer electronics and appliances marketplace with comparison tool, spec sheets, and smart product search powered by AI.',
    url: 'https://home-appliances-flame.vercel.app/',
    tags: ['Electronics', 'Comparison', 'Search'],
    category: 'E-Commerce',
    accentColor: 'from-slate-600/30 to-gray-900/30',
  },
  {
    title: 'Real Estate',
    description:
      'Property listing platform with map-based search, mortgage calculator, virtual tour embeds, and agent contact forms.',
    url: 'https://real-estate-omega-topaz.vercel.app/',
    tags: ['Property', 'Maps', 'Listings'],
    category: 'E-Commerce',
    accentColor: 'from-lime-600/30 to-green-900/30',
  },
  {
    title: 'Al Imran Fabrics',
    description:
      'Fabric and textile e-commerce store with per-metre ordering, custom colour swatch display, and bulk wholesale pricing tiers.',
    url: 'https://alimranfabricsonline-hazel.vercel.app/',
    tags: ['Textiles', 'Custom Orders', 'B2B'],
    category: 'E-Commerce',
    accentColor: 'from-emerald-600/30 to-teal-900/30',
  },

  /* ── Community & Misc ── */
  {
    title: 'SMJS Community Site',
    description:
      'Full-featured community platform with real-time discussions, event listings, member profiles, and AI-moderated content feeds.',
    url: 'https://community-dun-two.vercel.app/',
    tags: ['Community', 'Firebase', 'Real-time'],
    category: 'Community & Misc',
    accentColor: 'from-violet-600/30 to-purple-900/30',
  },
  {
    title: 'FoodTuck Restaurant',
    description:
      'Restaurant website with online menu, table reservation system, delivery tracking, and seasonal specials — built mobile-first.',
    url: 'https://foodtuck-bice.vercel.app/',
    tags: ['Restaurant', 'Reservations', 'Menu'],
    category: 'Community & Misc',
    accentColor: 'from-red-600/30 to-orange-900/30',
  },
];

/* ─── Team ──────────────────────────────────────────────────── */
export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  gradient: string;
}

export const team: TeamMember[] = [
  {
    name: 'Chirat de Architect',
    role: 'Lead Python Developer',
    initials: 'CA',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    name: 'Nandesh Cashier',
    role: 'AI Solutions Engineer',
    initials: 'NC',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    name: 'Aiden Reyes',
    role: 'Full Stack Developer',
    initials: 'AR',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    name: 'Mia Patel',
    role: 'UI/UX Designer',
    initials: 'MP',
    gradient: 'from-emerald-500 to-cyan-600',
  },
];

/* ─── Pricing ───────────────────────────────────────────────── */
export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended: boolean;
  ctaLabel: string;
}

export const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$499',
    period: '/project',
    description: 'Perfect for startups and small businesses exploring AI.',
    features: [
      '1 AI Chatbot Integration',
      'WhatsApp Automation Setup',
      'Basic CRM Sync (1 platform)',
      '2 Workflow Automations',
      '30-day Support',
      'Documentation & Handover',
    ],
    recommended: false,
    ctaLabel: 'Start Now',
  },
  {
    name: 'Growth',
    price: '$1,299',
    period: '/project',
    description: 'Ideal for scaling teams that need serious AI infrastructure.',
    features: [
      '3 AI Agents / Chatbots',
      'Full CRM Sync (3 platforms)',
      'n8n Automation Pipelines',
      'Custom Next.js Web App',
      'Firebase + Neon DB Setup',
      '60-day Priority Support',
      'Weekly Progress Calls',
    ],
    recommended: true,
    ctaLabel: 'Start Now',
  },
  {
    name: 'Pro',
    price: '$3,499',
    period: '/project',
    description: 'Enterprise-grade AI solutions with full-stack delivery.',
    features: [
      'Unlimited AI Agents',
      'Multi-platform Automation',
      'Custom AI Model Fine-tuning',
      'Full Product Development',
      'Cloud Infrastructure Setup',
      'Dedicated Project Manager',
      '6-month Support & Maintenance',
    ],
    recommended: false,
    ctaLabel: 'Contact Us',
  },
];

/* ─── Tech Badges ───────────────────────────────────────────── */
export const techBadges: string[] = [
  'Next.js',
  'Python',
  'Neon DB',
  'Claude Code',
  'Firebase',
  'n8n',
  'OpenClaw Agency',
];

/* ─── Social Links ──────────────────────────────────────────── */
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  hoverColor: string;
}

export const socialLinks: SocialLink[] = [
  { platform: 'YouTube', url: 'https://youtube.com', icon: 'FaYoutube', hoverColor: '#FF0000' },
  { platform: 'Instagram', url: 'https://instagram.com', icon: 'FaInstagram', hoverColor: '#E1306C' },
  { platform: 'Twitter', url: 'https://twitter.com', icon: 'FaXTwitter', hoverColor: '#1DA1F2' },
  { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'FaLinkedin', hoverColor: '#0A66C2' },
  { platform: 'WhatsApp', url: 'https://wa.me/', icon: 'FaWhatsapp', hoverColor: '#25D366' },
];
