import type { Metadata } from 'next';
import PricingPageContent from './PricingPageContent';

export const metadata: Metadata = {
  title: 'Pricing — CodeCraftAI',
  description: 'Affordable AI development and automation pricing for startups and businesses. Starting from $199.',
  openGraph: {
    title: 'Pricing — CodeCraftAI',
    description: 'Transparent pricing for AI agents, chatbots, automation, and web development.',
  },
};

export default function PricingPage() {
  return <PricingPageContent />;
}
