import type { Variants } from 'framer-motion';

/* ─── Fade Up ───────────────────────────────────────────────── */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Stagger Container ─────────────────────────────────────── */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/* ─── Stagger Item ──────────────────────────────────────────── */
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Scale In ──────────────────────────────────────────────── */
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Slide In Left ─────────────────────────────────────────── */
export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Slide In Right ────────────────────────────────────────── */
export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Card Hover ────────────────────────────────────────────── */
export const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -8, transition: { duration: 0.2, ease: 'easeOut' } },
};

/* ─── Navbar Scroll Transition ──────────────────────────────── */
export const navbarVariants: Variants = {
  top: {
    backgroundColor: 'rgba(5, 8, 22, 0)',
    backdropFilter: 'blur(0px)',
    borderBottomColor: 'rgba(255,255,255,0)',
  },
  scrolled: {
    backgroundColor: 'rgba(5, 8, 22, 0.85)',
    backdropFilter: 'blur(24px)',
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
};
