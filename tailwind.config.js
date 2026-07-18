/** @type {import('tailwindcss').Config} */
export default {
  // ─── Content Paths ───────────────────────────────────────────────────────────
  // Tailwind scans these files for class names used in production.
  // All unused utilities are purged in the production build.
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],

  // ─── Dark Mode ───────────────────────────────────────────────────────────────
  // 'class' strategy: dark mode is controlled by adding .dark to <html>.
  darkMode: 'class',

  // ─── Theme Extension ─────────────────────────────────────────────────────────
  theme: {
    extend: {
      // ── Font Families ──────────────────────────────────────────────────────
      fontFamily: {
        heading: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      // ── Brand Colors ───────────────────────────────────────────────────────
      colors: {
        // Primary — indigo / midnight
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Accent — electric gold / amber
        accent: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Neutral dark palette
        neutral: {
          50:  '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
      },

      // ── Background Colors ──────────────────────────────────────────────────
      backgroundColor: {
        'page':     '#09090b',
        'surface':  '#18181b',
        'elevated': '#27272a',
        'panel':    '#3f3f46',
      },

      // ── Gradients ──────────────────────────────────────────────────────────
      backgroundImage: {
        'gradient-hero':
          'linear-gradient(135deg, #1e1b4b 0%, #09090b 50%, #451a03 100%)',
        'gradient-accent':
          'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
        'gradient-card':
          'linear-gradient(180deg, transparent 0%, rgba(9,9,11,0.85) 100%)',
        'gradient-text':
          'linear-gradient(135deg, #818cf8 0%, #fbbf24 100%)',
        'gradient-glow':
          'radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)',
        'gradient-divider':
          'linear-gradient(90deg, transparent, #4f46e5, transparent)',
      },

      // ── Box Shadows ────────────────────────────────────────────────────────
      boxShadow: {
        'glow':      '0 0 30px rgba(99, 102, 241, 0.3)',
        'glow-gold': '0 0 30px rgba(251, 191, 36, 0.3)',
        'glow-sm':   '0 0 15px rgba(99, 102, 241, 0.2)',
        'card':      '0 10px 15px -3px rgba(0,0,0,0.6), 0 4px 6px -4px rgba(0,0,0,0.5)',
        'card-hover':'0 20px 25px -5px rgba(0,0,0,0.7), 0 8px 10px -6px rgba(0,0,0,0.6)',
      },

      // ── Border Radius ──────────────────────────────────────────────────────
      borderRadius: {
        '3xl': '2rem',
        '4xl': '2.5rem',
      },

      // ── Spacing ────────────────────────────────────────────────────────────
      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '30':  '7.5rem',
        '128': '32rem',
      },

      // ── Container ──────────────────────────────────────────────────────────
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-2xl':'1400px',
      },

      // ── Typography ─────────────────────────────────────────────────────────
      fontSize: {
        '7xl': ['4.5rem',  { lineHeight: '1' }],
        '8xl': ['6rem',    { lineHeight: '1' }],
        '9xl': ['8rem',    { lineHeight: '1' }],
      },

      // ── Animation & Transition ─────────────────────────────────────────────
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ── Z-Index ────────────────────────────────────────────────────────────
      zIndex: {
        '60':  60,
        '70':  70,
        '80':  80,
        '90':  90,
        '100': 100,
        '200': 200,
      },
    },
  },

  // ─── Plugins ─────────────────────────────────────────────────────────────────
  plugins: [],
};
