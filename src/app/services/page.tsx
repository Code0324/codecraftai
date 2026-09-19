import type { Metadata } from 'next';
import ServicesPageContent from './ServicesPageContent';

export const metadata: Metadata = {
  title: 'Our Services — CodeCraftAI',
  description: 'CodeCraftAI offers AI agents, chatbots, automation, e-commerce, custom dashboards, CRM, and full-stack development solutions for businesses.',
  openGraph: {
    title: 'Our Services — CodeCraftAI',
    description: 'AI-powered solutions for businesses: chatbots, automation, e-commerce, dashboards, and more.',
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
