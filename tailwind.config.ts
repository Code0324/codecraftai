import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#4F8EF7',
        'deep-purple': '#7C3AED',
        'accent-cyan': '#06B6D4',
        'dark-bg': '#050816',
        'card-bg': '#0D1117',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at top, #0D1B4B 0%, #050816 60%)',
        'blue-purple': 'linear-gradient(135deg, #4F8EF7, #7C3AED)',
        'text-gradient': 'linear-gradient(135deg, #60A5FA, #A78BFA, #06B6D4)',
      },
      boxShadow: {
        'glow-blue': '0 0 40px rgba(79,142,247,0.3)',
        'glow-purple': '0 0 40px rgba(124,58,237,0.3)',
        glass: '0 0 40px rgba(79,142,247,0.08), inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        shimmer: 'shimmer 2.5s infinite',
        'bounce-down': 'bounce-down 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(79,142,247,0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(79,142,247,0.7)' },
        },
        shimmer: {
          to: { left: '120%' },
        },
        'bounce-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
