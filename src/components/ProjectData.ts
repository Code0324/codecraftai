export interface CarouselProject {
  title: string
  description: string
  image: string
  category: string
  tags: string[]
  liveUrl: string
  githubUrl: string
}

/* Bump this whenever images in public/images/project are replaced in-place,
   to bust the Next.js image-optimizer and browser caches. */
const IMG_VER = 'v=3'

const img = (path: string) => `${path}?${IMG_VER}`

const projects: CarouselProject[] = [
  {
    title: 'AI Resume Builder',
    description: 'AI-powered resume builder that crafts professional resumes using intelligent formatting and content suggestions.',
    image: img('/images/project/Resume Builder app.png'),
    category: 'AI & Automation',
    tags: ['Next.js', 'AI', 'PDF'],
    liveUrl: 'https://ummay-kulsoom-portfolio.vercel.app/',
    githubUrl: 'https://github.com',
  },
  {
    title: 'Amazon Clone',
    description: 'Full-featured e-commerce clone with product listings, cart, checkout, and payment integration.',
    image: img('/images/project/Amazon clone.png'),
    category: 'E-Commerce',
    tags: ['Next.js', 'Stripe', 'Auth'],
    liveUrl: 'https://amazon-clone.vercel.app/',
    githubUrl: 'https://github.com',
  },
  {
    title: 'Personal Portfolio',
    description: 'Modern developer portfolio with smooth animations, dark mode, and a showcase of AI-driven projects.',
    image: img('/images/project/Portfolio Website.png'),
    category: 'Portfolio',
    tags: ['Next.js', 'Framer Motion', '3D'],
    liveUrl: 'https://ummay-kulsoom-portfolio.vercel.app/',
    githubUrl: 'https://github.com',
  },
  {
    title: 'AI Employee Platform',
    description: 'Autonomous AI agent platform that handles CRM tasks, lead scoring, and automated follow-ups.',
    image: img('/images/project/ai-employee.png'),
    category: 'AI & Automation',
    tags: ['AI Agent', 'CRM', 'Automation'],
    liveUrl: 'https://crm-digital-employee.vercel.app/',
    githubUrl: 'https://github.com',
  },
  {
    title: 'Luxury Furniture Store',
    description: 'Premium furniture e-commerce with 3D product previews, room visualiser, and curated collections.',
    image: img('/images/project/Luxe Living .png'),
    category: 'E-Commerce',
    tags: ['Shopify', '3D', 'Luxury'],
    liveUrl: 'https://luxe-living-amber.vercel.app/',
    githubUrl: 'https://github.com',
  },
  {
    title: 'Modern Ecommerce',
    description: 'Conversion-optimised e-commerce platform with AI-powered search and personalised recommendations.',
    image: img('/images/project/ecommerce.png'),
    category: 'E-Commerce',
    tags: ['Next.js', 'AI', 'Storefront'],
    liveUrl: 'https://make-up-muse.vercel.app/',
    githubUrl: 'https://github.com',
  },
  {
    title: 'Physical AI Textbook',
    description: 'Interactive digital textbook built with Docusaurus — structured AI learning with MDX components.',
    image: img('/images/project/Docusaurus.png'),
    category: 'Portfolio & Tools',
    tags: ['Docusaurus', 'MDX', 'Docs'],
    liveUrl: 'https://1-docosaurus-textbook.vercel.app/',
    githubUrl: 'https://github.com',
  },
  {
    title: 'Community Platform',
    description: 'Full-featured community platform with real-time discussions, member profiles, and AI-moderated feeds.',
    image: img('/images/project/Community.png'),
    category: 'Community',
    tags: ['Firebase', 'Real-time', 'React'],
    liveUrl: 'https://community-dun-two.vercel.app/',
    githubUrl: 'https://github.com',
  },
  {
    title: 'Food Delivery Platform',
    description: 'Restaurant website with online ordering, table reservations, delivery tracking, and seasonal specials.',
    image: img('/images/project/foodTuck Resturant Plateform.png'),
    category: 'E-Commerce',
    tags: ['Food', 'Reservations', 'Mobile'],
    liveUrl: 'https://foodtuck-bice.vercel.app/',
    githubUrl: 'https://github.com',
  },
  {
    title: 'Real Estate Platform',
    description: 'Property listing platform with map-based search, mortgage calculator, and virtual tour embeds.',
    image: img('/images/project/Real Estate.png'),
    category: 'Real Estate',
    tags: ['Maps', 'Property', 'Search'],
    liveUrl: 'https://real-estate-omega-topaz.vercel.app/',
    githubUrl: 'https://github.com',
  },
  {
    title: 'AI Employee Landing Page',
    description: 'High-conversion landing page showcasing AI employee capabilities with interactive product demos.',
    image: img('/images/project/fte.png'),
    category: 'Landing Page',
    tags: ['Next.js', 'Marketing', 'UI/UX'],
    liveUrl: 'https://crm-digital-employee.vercel.app/',
    githubUrl: 'https://github.com',
  },
]

export default projects
