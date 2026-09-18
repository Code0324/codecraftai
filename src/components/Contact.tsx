'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { IconType } from 'react-icons/lib';
import { FaYoutube, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Send } from 'lucide-react';
import GlossyButton from './GlossyButton';
import { fadeUpVariants, slideInLeftVariants, slideInRightVariants } from '@/lib/animations';

interface SocialItem {
  Icon: IconType;
  label: string;
  href: string;
  hoverColor: string;
}

const socials: SocialItem[] = [
  { Icon: FaYoutube, label: 'YouTube', href: 'https://youtube.com/@CodeCraftAI', hoverColor: '#FF0000' },
  { Icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com', hoverColor: '#E1306C' },
  { Icon: FaXTwitter, label: 'Twitter', href: 'https://twitter.com', hoverColor: '#1DA1F2' },
  { Icon: FaLinkedin, label: 'LinkedIn', href: 'https://linkedin.com', hoverColor: '#0A66C2' },
  { Icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/923249208788', hoverColor: '#25D366' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user starts typing again
    if (error) setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        // Backend returned an error
        throw new Error(data.error || 'Failed to send message');
      }

      // Success - show success message and reset form
      setSent(true);
      setForm({ name: '', phone: '', email: '', message: '' });
      setLoading(false);
    } catch (err) {
      // Error occurred - show error message
      const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMsg);
      setLoading(false);
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32">
      {/* Header */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold text-blue-400 tracking-widest uppercase">
          Get In Touch
        </span>
        <h2
          className="heading-font font-bold mt-3 text-white"
          style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
        >
          Contact
        </h2>
        <div className="section-underline" />
        <p className="text-slate-400 mt-6 max-w-xl mx-auto text-base leading-relaxed px-4">
          Ready to build something extraordinary? Reach out and we will respond within 24 hours.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            variants={slideInLeftVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="glass-card p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #4F8EF7, #7C3AED)' }}
                  >
                    <Send size={24} className="text-white" />
                  </div>
                  <h3 className="heading-font font-semibold text-white text-xl">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-slate-400 text-center text-sm">
                    Thank you for reaching out. We will be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-sm text-slate-400">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Smith"
                        value={form.name}
                        onChange={handleChange}
                        className="glass-input"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-sm text-slate-400">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={form.phone}
                        onChange={handleChange}
                        className="glass-input"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm text-slate-400">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="glass-input"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-sm text-slate-400">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your project..."
                      value={form.message}
                      onChange={handleChange}
                      className="glass-input resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                      <p className="font-medium">Error:</p>
                      <p>{error}</p>
                    </div>
                  )}

                  <GlossyButton
                    type="submit"
                    fullWidth
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'} <Send size={16} />
                  </GlossyButton>
                </form>
              )}
            </div>
          </motion.div>

          {/* Map + Socials */}
          <motion.div
            variants={slideInRightVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-6"
          >
            {/* Map */}
            <div
              className="overflow-hidden flex-1 rounded-2xl"
              style={{
                minHeight: 280,
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462143.93200548446!2d66.85325344999999!3d24.8607343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1711000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 280, filter: 'invert(90%) hue-rotate(180deg)', borderRadius: 'inherit' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CodeCraftAI office location — Karachi"
              />
            </div>

            {/* Contact info */}
            <div className="glass-card p-6 flex flex-col gap-4">
              <h3 className="heading-font font-semibold text-white">Find Us Online</h3>
              <div className="flex flex-wrap gap-4">
                {socials.map(({ Icon, label, href, hoverColor }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="social-icon"
                    style={
                      { '--hover-color': hoverColor } as React.CSSProperties
                    }
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = hoverColor;
                      (e.currentTarget as HTMLElement).style.filter = `drop-shadow(0 0 6px ${hoverColor})`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '';
                      (e.currentTarget as HTMLElement).style.filter = '';
                    }}
                  >
                    <Icon size={24} />
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <a href="mailto:contact@codecraftai.net" className="text-slate-400 text-sm hover:text-[#4F8EF7] transition-colors">
                  <span className="text-slate-300 font-medium">Email: </span>
                  contact@codecraftai.net
                </a>
                <a href="tel:+923249208788" className="text-slate-400 text-sm hover:text-[#4F8EF7] transition-colors">
                  <span className="text-slate-300 font-medium">Phone: </span>
                  0324 9208788
                </a>
                <p className="text-slate-400 text-sm">
                  <span className="text-slate-300 font-medium">Location: </span>
                  Karachi, Pakistan
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
