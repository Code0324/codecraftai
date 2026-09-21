import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';

const About          = dynamic(() => import('@/components/About'));
const Process        = dynamic(() => import('@/components/Process'));
const ProblemSolving = dynamic(() => import('@/components/ProblemSolving'));
const FeaturedServices = dynamic(() => import('@/components/FeaturedServices'));
const Projects       = dynamic(() => import('@/components/Projects'));
const TeamPreview    = dynamic(() => import('@/components/TeamPreview'));
const Testimonials   = dynamic(() => import('@/components/Testimonials'));
const Contact        = dynamic(() => import('@/components/Contact'));
const Footer         = dynamic(() => import('@/components/Footer'));
const AIToolsNeon    = dynamic(() => import('@/components/AIToolsNeon'));

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSolving />
      <About />
      <AIToolsNeon />
      <FeaturedServices />
      <Projects />
      <Process />
      <TeamPreview />
      <Testimonials />
      <Contact />
    </>
  );
}
