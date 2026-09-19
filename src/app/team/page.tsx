import type { Metadata } from 'next';
import TeamPageContent from './TeamPageContent';

export const metadata: Metadata = {
  title: 'Our Team — CodeCraftAI',
  description: 'Meet the CodeCraftAI team — AI engineers, designers, developers, and strategists building the future of business automation.',
  openGraph: {
    title: 'Our Team — CodeCraftAI',
    description: 'Meet the talented team behind CodeCraftAI\'s AI-powered solutions.',
  },
};

export default function TeamPage() {
  return <TeamPageContent />;
}
