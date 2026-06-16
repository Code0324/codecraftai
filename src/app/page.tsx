import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';

const About        = dynamic(() => import('@/components/About'));
const Process      = dynamic(() => import('@/components/Process'));
const Services     = dynamic(() => import('@/components/Services'));
const Features     = dynamic(() => import('@/components/Features'));
const OurAITeam    = dynamic(() => import('@/components/OurAITeam'));
const AIToolsNeon  = dynamic(() => import('@/components/AIToolsNeon'));
const Projects     = dynamic(() => import('@/components/Projects'));
const Pricing      = dynamic(() => import('@/components/Pricing'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const FAQ          = dynamic(() => import('@/components/FAQ'));
const CTABanner    = dynamic(() => import('@/components/CTABanner'));
const Contact      = dynamic(() => import('@/components/Contact'));
const Footer       = dynamic(() => import('@/components/Footer'));

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Process />
      <Services />
      <Features />
      <OurAITeam />
      <AIToolsNeon />
      <Projects />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Contact />
      <Footer />
    </>
  );
}
