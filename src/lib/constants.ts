/* ─── Contact ──────────────────────────────────────────────── */
export const contactEmail = 'contact@codecraftai.net';
export const contactPhone = '0324 9208788';
export const contactPhoneTel = 'tel:+923249208788';
export const contactEmailMailto = 'mailto:contact@codecraftai.net';
export const whatsappUrl = 'https://wa.me/923249208788';

/* ─── Nav Links ─────────────────────────────────────────────── */
export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Team', href: '/team' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

/* ─── Services ──────────────────────────────────────────────── */
export interface Service {
  title: string;
  slug: string;
  shortDescription: string;
}

export const services: Service[] = [
  {
    title: 'AI Agents',
    slug: 'ai-agents',
    shortDescription: 'Autonomous AI agents that handle repetitive tasks, answer queries, and make decisions — freeing your team to focus on growth.',
  },
  {
    title: 'AI Chatbots',
    slug: 'ai-chatbots',
    shortDescription: 'Intelligent chatbots that understand context and provide instant, consistent support to your customers across every channel.',
  },
  {
    title: 'Business Automation',
    slug: 'business-automation',
    shortDescription: 'End-to-end automation of your business workflows — from data processing to customer follow-ups — saving hours every week.',
  },
  {
    title: 'E-Commerce Solutions',
    slug: 'ecommerce',
    shortDescription: 'Custom e-commerce platforms built for conversion, with seamless checkout and AI-powered product recommendations.',
  },
  {
    title: 'Mobile Apps',
    slug: 'mobile-apps',
    shortDescription: 'Cross-platform mobile applications built with React Native and Expo — one codebase for iOS and Android.',
  },
  {
    title: 'Custom Dashboards',
    slug: 'custom-dashboards',
    shortDescription: 'Real-time dashboards that turn raw data into actionable insights with interactive charts, filters, and role-based access.',
  },
  {
    title: 'CRM Systems',
    slug: 'crm',
    shortDescription: 'Tailored CRM solutions that help you manage leads, track interactions, automate follow-ups, and close deals faster.',
  },
  {
    title: 'n8n Automation',
    slug: 'n8n-automation',
    shortDescription: 'Self-hosted automation workflows using n8n — connect any tool, trigger any action, on your own infrastructure.',
  },
  {
    title: 'Portfolio Websites',
    slug: 'portfolio',
    shortDescription: 'Modern portfolio websites with smooth animations and fast performance that showcase your work and attract clients.',
  },
  {
    title: 'SaaS & AI Products',
    slug: 'saas-ai',
    shortDescription: 'Full-stack SaaS products with AI capabilities — from concept to deployment, including auth, payments, and scaling.',
  },
];

/* ─── Featured Services (for homepage) ──────────────────────── */
export const featuredServiceSlugs = [
  'ai-agents',
  'ai-chatbots',
  'business-automation',
  'ecommerce',
  'custom-dashboards',
  'n8n-automation',
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
  accentColor: string;
  image?: string;
}

export const projects: Project[] = [
  /* ── Portfolio & Tools ── */
  {
    title: 'Ummay Kulsoom Portfolio',
    description: 'Personal developer portfolio showcasing projects, skills, and AI-first work — built with Next.js 14 and Framer Motion animations.',
    url: 'https://ummay-kulsoom-portfolio.vercel.app/',
    tags: ['Next.js', 'Framer Motion', 'Portfolio'],
    category: 'Portfolio & Tools',
    accentColor: 'from-blue-600/30 to-violet-900/30',
    image: '/images/project/Portfolio Website.png',
  },
  {
    title: 'Docusaurus Textbook',
    description: 'Full interactive digital textbook built with Docusaurus — structured learning content, MDX components, and search-enabled navigation.',
    url: 'https://1-docosaurus-textbook.vercel.app/',
    tags: ['Docusaurus', 'MDX', 'Docs'],
    category: 'Portfolio & Tools',
    accentColor: 'from-sky-600/30 to-blue-900/30',
    image: '/images/project/Docusaurus.png',
  },
  {
    title: 'Workflow Automation',
    description: 'Visual workflow builder and automation orchestration platform — connect APIs, trigger actions, and manage multi-step business processes.',
    url: 'https://work-flow-psi.vercel.app/',
    tags: ['Workflow', 'Automation', 'Next.js'],
    category: 'Portfolio & Tools',
    accentColor: 'from-teal-600/30 to-cyan-900/30',
  },

  /* ── AI & Automation ── */
  {
    title: 'CRM Digital Employee',
    description: 'Autonomous AI agent that handles CRM data entry, follow-up emails, and lead scoring — acting as a fully-functional digital sales employee.',
    url: 'https://crm-digital-employee.vercel.app/',
    tags: ['Claude API', 'CRM', 'AI Agent'],
    category: 'AI & Automation',
    accentColor: 'from-purple-600/30 to-indigo-900/30',
    image: '/images/project/CRM.png',
  },
  {
    title: 'Karachi Port Watch',
    description: 'Real-time AI-powered port monitoring dashboard — tracking vessel movement, cargo status, and port congestion analytics for Karachi harbor.',
    url: 'https://karachi-port-watch.vercel.app/',
    tags: ['Real-time', 'AI Analytics', 'Maps'],
    category: 'AI & Automation',
    accentColor: 'from-blue-700/30 to-sky-900/30',
    image: '/images/project/Karchi port vessel tracker.png',
  },
  {
    title: 'Vessel Tracking',
    description: 'Live maritime vessel tracking system with AIS data integration, route history, and port arrival predictions powered by machine learning.',
    url: 'https://vessel-tracking-update.vercel.app/',
    tags: ['AIS Data', 'Tracking', 'ML'],
    category: 'AI & Automation',
    accentColor: 'from-cyan-700/30 to-blue-900/30',
  },
  {
    title: 'AI Employee Platform',
    description: 'Autonomous AI employee that manages tasks, responds to messages, and coordinates workflows — your digital team member.',
    url: '#',
    tags: ['AI Agent', 'Automation', 'Python'],
    category: 'AI & Automation',
    accentColor: 'from-indigo-600/30 to-purple-900/30',
    image: '/images/project/ai-employee.png',
  },

  /* ── Dashboards ── */
  {
    title: 'Next.js Dashboard',
    description: 'Production-ready analytics dashboard with server-side data fetching, dynamic charts, user management, and role-based access control.',
    url: 'https://nextjs-dashboard-sepia-seven-garbo3q349.vercel.app/',
    tags: ['Next.js', 'Charts', 'RBAC'],
    category: 'Dashboards',
    accentColor: 'from-indigo-600/30 to-blue-900/30',
  },
  {
    title: 'Todo App',
    description: 'Feature-complete task management app with authentication, real-time sync, drag-and-drop reordering, and priority labels.',
    url: 'https://todo-app-login-signup-5cyh.vercel.app/',
    tags: ['Auth', 'Real-time', 'React'],
    category: 'Dashboards',
    accentColor: 'from-green-600/30 to-emerald-900/30',
  },

  /* ── E-Commerce ── */
  {
    title: 'MakeUp Muse',
    description: 'AI-assisted beauty e-commerce store with virtual try-on suggestions, skin-tone matching, and personalised product recommendations.',
    url: 'https://make-up-muse.vercel.app/',
    tags: ['E-Commerce', 'AI Recs', 'Beauty'],
    category: 'E-Commerce',
    accentColor: 'from-pink-600/30 to-rose-900/30',
    image: '/images/project/ecommerce.png',
  },
  {
    title: 'Glow Up Beauty',
    description: 'Modern beauty & skincare storefront with product filtering, wishlist, cart, and checkout — built for conversion-optimised UX.',
    url: 'https://glow-up-hyee.vercel.app/',
    tags: ['Storefront', 'Skincare', 'Next.js'],
    category: 'E-Commerce',
    accentColor: 'from-fuchsia-600/30 to-purple-900/30',
  },
  {
    title: 'DailyWear Collections',
    description: 'Everyday fashion e-commerce site with size guides, outfit builder, lookbook gallery, and express checkout flow.',
    url: 'https://dailywear-collections.vercel.app/',
    tags: ['Fashion', 'Catalogue', 'Cart'],
    category: 'E-Commerce',
    accentColor: 'from-orange-600/30 to-amber-900/30',
  },
  {
    title: 'Luxe Living',
    description: 'Premium home goods and furniture store with 3D product previews, room visualiser, and curated collection pages.',
    url: 'https://luxe-living-amber.vercel.app/',
    tags: ['Furniture', 'Luxury', 'Shopify'],
    category: 'E-Commerce',
    accentColor: 'from-yellow-600/30 to-orange-900/30',
    image: '/images/project/Luxe Living .png',
  },
  {
    title: 'Home Appliances',
    description: 'Consumer electronics and appliances marketplace with comparison tool, spec sheets, and smart product search powered by AI.',
    url: 'https://home-appliances-flame.vercel.app/',
    tags: ['Electronics', 'Comparison', 'Search'],
    category: 'E-Commerce',
    accentColor: 'from-slate-600/30 to-gray-900/30',
    image: '/images/project/Home Appliences.png',
  },
  {
    title: 'Real Estate',
    description: 'Property listing platform with map-based search, mortgage calculator, virtual tour embeds, and agent contact forms.',
    url: 'https://real-estate-omega-topaz.vercel.app/',
    tags: ['Property', 'Maps', 'Listings'],
    category: 'E-Commerce',
    accentColor: 'from-lime-600/30 to-green-900/30',
    image: '/images/project/Real Estate.png',
  },
  {
    title: 'Al Imran Fabrics',
    description: 'Fabric and textile e-commerce store with per-metre ordering, custom colour swatch display, and bulk wholesale pricing tiers.',
    url: 'https://alimranfabricsonline-hazel.vercel.app/',
    tags: ['Textiles', 'Custom Orders', 'B2B'],
    category: 'E-Commerce',
    accentColor: 'from-emerald-600/30 to-teal-900/30',
    image: '/images/project/al-imran fabrics.png',
  },
  {
    title: 'Hunermand Marketplace',
    description: 'Skilled professionals marketplace connecting clients with verified freelancers — featuring portfolios, bidding, and secure payments.',
    url: '#',
    tags: ['Marketplace', 'Freelancing', 'Next.js'],
    category: 'E-Commerce',
    accentColor: 'from-cyan-600/30 to-blue-900/30',
    image: '/images/project/Hunermand.png',
  },

  /* ── Community & Misc ── */
  {
    title: 'SMJS Community Site',
    description: 'Full-featured community platform with real-time discussions, event listings, member profiles, and AI-moderated content feeds.',
    url: 'https://community-dun-two.vercel.app/',
    tags: ['Community', 'Firebase', 'Real-time'],
    category: 'Community & Misc',
    accentColor: 'from-violet-600/30 to-purple-900/30',
    image: '/images/project/Community.png',
  },
  {
    title: 'FoodTuck Restaurant',
    description: 'Restaurant website with online menu, table reservation system, delivery tracking, and seasonal specials — built mobile-first.',
    url: 'https://foodtuck-bice.vercel.app/',
    tags: ['Restaurant', 'Reservations', 'Menu'],
    category: 'Community & Misc',
    accentColor: 'from-red-600/30 to-orange-900/30',
    image: '/images/project/foodTuck Resturant Plateform.png',
  },
  {
    title: 'Exclussive Fashion',
    description: 'Premium fashion brand website with lookbook gallery, collection pages, and appointment booking for personal styling.',
    url: '#',
    tags: ['Fashion', 'Brand', 'Next.js'],
    category: 'Community & Misc',
    accentColor: 'from-rose-600/30 to-pink-900/30',
    image: '/images/project/Exclussive.png',
  },
];

/* ─── Featured Projects (for homepage) ──────────────────────── */
export const featuredProjectIndices = [0, 3, 4, 10, 17, 18];

/* ─── Team ──────────────────────────────────────────────────── */
export interface TeamMember {
  name: string;
  role: string;
  image: string;
  size: 'sm' | 'md' | 'lg';
  position: { top: string; left: string };
  bio?: string;
  skills?: string[];
}

export const team: TeamMember[] = [
  {
    name: 'Ummay Kulsoom',
    role: 'CEO & Founder',
    image: '/images/our team/Ummay Kulsoom — CEO & Founder.png',
    size: 'lg',
    position: { top: '5%', left: '5%' },
    bio: 'Visionary leader driving CodeCraftAI\'s mission to make AI accessible for businesses of all sizes.',
    skills: ['Strategic Planning', 'AI Solutions', 'Business Development', 'Team Leadership'],
  },
  {
    name: 'Ms Laiqa',
    role: 'Graphic Designer',
    image: '/images/our team/Ms Laiqa.png',
    size: 'md',
    position: { top: '25%', left: '80%' },
    bio: 'Creative designer crafting visual identities that communicate brand stories effectively.',
    skills: ['Brand Design', 'UI Design', 'Illustration', 'Figma'],
  },
  {
    name: 'Ms Sumira',
    role: 'Content Writer',
    image: '/images/our team/Ms Sumira.png',
    size: 'sm',
    position: { top: '55%', left: '2%' },
    bio: 'Strategic content creator who turns complex technical concepts into clear, compelling copy.',
    skills: ['Content Strategy', 'Technical Writing', 'SEO Copywriting', 'Brand Voice'],
  },
  {
    name: 'Mr Ameer',
    role: 'Marketing Manager',
    image: '/images/our team/Mr Ameer.png',
    size: 'md',
    position: { top: '65%', left: '72%' },
    bio: 'Data-driven marketer who connects the right solutions with the right audiences.',
    skills: ['Digital Marketing', 'Campaign Strategy', 'Analytics', 'Growth Hacking'],
  },
  {
    name: 'Mr Bilal',
    role: 'SEO Expert',
    image: '/images/our team/Mr Bilal.png',
    size: 'sm',
    position: { top: '10%', left: '72%' },
    bio: 'Search optimization specialist who drives organic growth through technical and content SEO.',
    skills: ['Technical SEO', 'Keyword Research', 'Link Building', 'Analytics'],
  },
  {
    name: 'Alex Morgan',
    role: 'AI Agent',
    image: '/images/our team/AI Team/Frontendd Developer.png',
    size: 'md',
    position: { top: '40%', left: '15%' },
    bio: 'Frontend specialist building performant, accessible web applications with React and Next.js.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    name: 'Daniel Carter',
    role: 'AI Agent',
    image: '/images/our team/AI Team/Backend Developer.png',
    size: 'sm',
    position: { top: '75%', left: '40%' },
    bio: 'Backend architect designing scalable APIs and database systems for enterprise applications.',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'REST APIs'],
  },
  {
    name: 'Emily Parker',
    role: 'AI Agent',
    image: '/images/our team/AI Team/UI UX Designer.png',
    size: 'md',
    position: { top: '15%', left: '45%' },
    bio: 'User-centered designer who transforms complex workflows into intuitive interfaces.',
    skills: ['User Research', 'Wireframing', 'Prototyping', 'Figma', 'Design Systems'],
  },
  {
    name: 'James Wilson',
    role: 'AI Agent',
    image: '/images/our team/AI Team/SEO Expert.png',
    size: 'sm',
    position: { top: '50%', left: '55%' },
    bio: 'Analytics-focused specialist who drives measurable organic traffic growth through SEO.',
    skills: ['Google Analytics', 'Search Console', 'Content SEO', 'Technical Audits'],
  },
  {
    name: 'Olivia Bennett',
    role: 'AI Agent',
    image: '/images/our team/AI Team/Graphic Designer.png',
    size: 'lg',
    position: { top: '80%', left: '10%' },
    bio: 'Strategic designer who builds cohesive brand systems that resonate with target audiences.',
    skills: ['Brand Strategy', 'Visual Identity', 'Motion Design', 'Art Direction'],
  },
];

/* ─── Featured Team (for homepage — first 4) ────────────────── */
export const featuredTeamIndices = [0, 5, 7, 9];

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
    price: '$200',
    period: '/project',
    description: 'Perfect for small businesses getting started with AI and automation.',
    features: [
      '1 AI Chatbot or Automation',
      'WhatsApp Integration',
      'Basic CRM Setup (1 platform)',
      '2 Workflow Automations',
      '14-day Support',
      'Documentation & Handover',
    ],
    recommended: false,
    ctaLabel: 'Get Started',
  },
  {
    name: 'Growth',
    price: '$300',
    period: '/project',
    description: 'Ideal for growing businesses that need real AI infrastructure.',
    features: [
      '3 AI Agents / Chatbots',
      'Full CRM Sync (3 platforms)',
      'n8n Automation Pipelines',
      'Custom Next.js Web App',
      'Database Setup (Firebase + Neon)',
      '30-day Priority Support',
      'Weekly Progress Updates',
    ],
    recommended: true,
    ctaLabel: 'Get Started',
  },
  {
    name: 'Enterprise',
    price: '$500',
    period: '/project',
    description: 'Enterprise-grade AI solutions with full-stack delivery and dedicated support.',
    features: [
      'Unlimited AI Agents',
      'Multi-platform Automation',
      'Custom AI Model Integration',
      'Full Product Development',
      'Cloud Infrastructure Setup',
      'Dedicated Project Manager',
      '90-day Support & Maintenance',
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
];

/* ─── Social Links ──────────────────────────────────────────── */
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  hoverColor: string;
}

export const socialLinks: SocialLink[] = [
  { platform: 'YouTube', url: 'https://youtube.com/@CodeCraftAI', icon: 'FaYoutube', hoverColor: '#FF0000' },
  { platform: 'Instagram', url: 'https://instagram.com', icon: 'FaInstagram', hoverColor: '#E1306C' },
  { platform: 'Twitter', url: 'https://twitter.com', icon: 'FaXTwitter', hoverColor: '#1DA1F2' },
  { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'FaLinkedin', hoverColor: '#0A66C2' },
  { platform: 'WhatsApp', url: 'https://wa.me/923249208788', icon: 'FaWhatsapp', hoverColor: '#25D366' },
];

/* ─── Problem Solving Messages ──────────────────────────────── */
export const problemSolvingMessages = {
  headline: 'We Solve Your Business Problems',
  subheadline: 'Technology is just a tool. We focus on the problem first.',
  problems: [
    {
      title: 'Repetitive Manual Work',
      description: 'Your team spends hours on tasks that could be automated — data entry, follow-ups, reporting.',
      solution: 'We build AI agents and automation workflows that handle the repetitive work, freeing your team to focus on growth.',
    },
    {
      title: 'Poor Customer Experience',
      description: 'Slow response times, inconsistent support, and missed inquiries are costing you customers.',
      solution: 'We deploy intelligent chatbots and CRM systems that provide instant, consistent support across every channel.',
    },
    {
      title: 'Scattered Data & No Visibility',
      description: 'Your business data is spread across spreadsheets, emails, and tools — making decisions slow and risky.',
      solution: 'We build custom dashboards and CRM systems that give you a single source of truth and real-time insights.',
    },
    {
      title: 'Scaling Bottlenecks',
      description: 'Your business is growing, but your processes can\'t keep up — hiring more people isn\'t the answer.',
      solution: 'We design scalable systems and automations that grow with your business without proportionally increasing costs.',
    },
  ],
};
