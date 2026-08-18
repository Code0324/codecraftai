'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Most landing page projects take 2-4 weeks, while full web applications can take 2-3 months depending on complexity. We establish clear timelines during the discovery phase."
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer: "Yes! We offer maintenance packages to keep your site updated, secure, and running smoothly. Our Pro and Enterprise plans include dedicated support windows."
  },
  {
    question: "What tech stack do you use?",
    answer: "We specialize in modern web technologies: Next.js, React, Tailwind CSS, TypeScript, and Framer Motion for animations. This ensures high performance and scalability."
  },
  {
    question: "Can you help with design as well as development?",
    answer: "Absolutely. We are a full-service agency. Our design team handles UI/UX, branding, and prototyping before a single line of code is written."
  },
  {
    question: "What is your pricing structure?",
    answer: "We offer fixed-price packages for standard projects to give you budget certainty, and custom quoting for enterprise or complex application requirements."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative bg-[#0a0b0f]">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 heading-font"
          >
            Frequently Asked <span className="text-gradient">Questions</span>
          </motion.h2>
          <div className="section-underline mx-auto" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-medium text-white heading-font">{faq.question}</span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? 'bg-[#4F8EF7]/20 text-[#4F8EF7]' : 'bg-white/5 text-slate-400'}`}>
                  {openIndex === i ? <FiMinus /> : <FiPlus />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
