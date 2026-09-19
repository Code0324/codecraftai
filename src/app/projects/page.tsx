import type { Metadata } from 'next';
import ProjectsPageContent from './ProjectsPageContent';

export const metadata: Metadata = {
  title: 'Our Projects — CodeCraftAI',
  description: 'Explore CodeCraftAI\'s portfolio: AI agents, e-commerce platforms, dashboards, automation systems, and custom web applications.',
  openGraph: {
    title: 'Our Projects — CodeCraftAI',
    description: 'Browse our portfolio of AI-powered web applications, e-commerce stores, and automation systems.',
  },
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
