import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/outfit';
import './globals.css';
import Navbar from '@/components/Navbar';
import ChatBot from '@/components/ChatBot';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'CodeCraftAI — Build smarter with AI Crafted',
  description:
    'CodeCraftAI is an AI-first software agency specializing in intelligent applications, automation pipelines, and AI chatbots for the next generation of businesses.',
  keywords: [
    'AI agency',
    'Next.js development',
    'AI chatbots',
    'automation',
    'CodeCraftAI',
    'software development',
  ],
  openGraph: {
    title: 'CodeCraftAI — Build smarter with AI Crafted',
    description:
      'Build serious new AI-powered web apps and automation pipelines with CodeCraftAI.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeCraftAI — Build smarter with AI Crafted',
    description: 'AI-first software agency for next-gen businesses.',
  },
  icons: {
    icon: [
      { url: '/logo/logo.png?v=2', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <div className="grid-overlay" aria-hidden="true" />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <FloatingWhatsApp />
        <ChatBot />
      </body>
    </html>
  );
}
