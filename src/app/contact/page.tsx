import type { Metadata } from 'next';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Contact Us — CodeCraftAI',
  description: 'Get in touch with CodeCraftAI. Book a free consultation for AI agents, chatbots, automation, and web development.',
  openGraph: {
    title: 'Contact Us — CodeCraftAI',
    description: 'Ready to solve your business problem? Contact CodeCraftAI for a free consultation.',
  },
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Contact />
    </div>
  );
}
