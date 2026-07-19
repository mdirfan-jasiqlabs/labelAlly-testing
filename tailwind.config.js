/** @type {import('tailwindcss').Config} */
export default {
  // ─── Content Paths ───────────────────────────────────────────────────────────
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],

  // Light theme is now the default.
  // Keep class-based dark mode support only if needed later.
  darkMode: 'class',

  // ─── Theme Extension ─────────────────────────────────────────────────────────
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      // ── Font Families ──────────────────────────────────────────────────────
      fontFamily: {
        heading: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      // ── Brand Colors ───────────────────────────────────────────────────────
      colors: {
        // Semantic Design Tokens for Theme Toggle
        theme: {
          page: 'var(--color-page-bg)',
          section: 'var(--color-section-bg)',
          card: 'var(--color-card-surface)',
          header: 'var(--color-header-bg)',
          footer: 'var(--color-footer-bg)',
          heading: 'var(--color-heading-text)',
          body: 'var(--color-body-text)',
          muted: 'var(--color-muted-text)',
          border: 'var(--color-border)',
          accent: 'var(--color-brand-accent)',
          hover: 'var(--color-hover)',
          focus: 'var(--color-focus)',
          toggle: 'var(--color-toggle-bg)',
          toggleActive: 'var(--color-toggle-active)',
        },

        // Primary — premium indigo
        primary: {
          50: '#eef2ff',
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

        // Accent — premium gold / amber
        accent: {
          50: '#fffbeb',
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

        // Neutral light palette
        neutral: {
          50: '#fafafa',
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

        // ── Semantic surface tokens ───────────────────────────
        surface: {
          page:  '#FCFCFF',
          card:  '#FFFFFF',
          muted: '#F7F7FC',
        },

        // ── Ink (text) tokens ─────────────────────────────────
        ink: {
          primary:   '#11143E',
          secondary: '#555B70',
          muted:     '#7B8092',
        },

        // ── Brand Custom Colors ───────────────────────────────
        brand: {
          pink: '#FF2E74',
          orange: '#FF7E40',
          green: '#96E012',
          blue: '#2B83FC',
          indigo: '#4F46E5',
        },
      },

      // ── Background Colors ──────────────────────────────────────────────────
      backgroundColor: {
        page: '#ffffff',
        surface: '#fafafa',
        elevated: '#f4f4f5',
        panel: '#ffffff',
      },

      // ── Gradients ──────────────────────────────────────────────────────────
      backgroundImage: {
        artistGlow:
          'radial-gradient(circle at center, rgba(99, 102, 241, 0.08), transparent 70%)',

        'gradient-hero':
          'linear-gradient(135deg, #eef2ff 0%, #ffffff 50%, #fffbeb 100%)',

        'gradient-accent':
          'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',

        'gradient-card':
          'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 100%)',

        'gradient-text':
          'linear-gradient(135deg, #4f46e5 0%, #d97706 100%)',

        'gradient-glow':
          'radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 70%)',

        'gradient-divider':
          'linear-gradient(90deg, transparent, rgba(79,70,229,0.55), transparent)',

        'hero-glow':
          'radial-gradient(circle at center, rgba(99, 102, 241, 0.16), transparent 68%)',

        'artist-fade':
          'linear-gradient(to top, rgba(252,252,255,0.95) 0%, transparent 35%)',
      },

      // ── Box Shadows ────────────────────────────────────────────────────────
      boxShadow: {
        theme: 'var(--color-shadow)',
        artist: '0 18px 45px rgba(40, 40, 90, 0.08)',
        artistHover: '0 30px 60px rgba(40, 40, 90, 0.14)',
        glow: '0 0 30px rgba(99, 102, 241, 0.16)',
        'glow-gold': '0 0 30px rgba(245, 158, 11, 0.18)',
        'glow-sm': '0 0 15px rgba(99, 102, 241, 0.12)',

        card:
          '0 10px 30px -10px rgba(15, 23, 42, 0.12), 0 4px 12px -6px rgba(15, 23, 42, 0.08)',

        'card-hover':
          '0 20px 45px -15px rgba(15, 23, 42, 0.18), 0 10px 20px -10px rgba(15, 23, 42, 0.10)',

        'hero-soft':
          '0 24px 70px rgba(38, 30, 120, 0.08)',

        'platform-strip':
          '0 -1px 0 rgba(0,0,0,0.06), 0 8px 32px rgba(15, 23, 42, 0.06)',
      },

      // ── Border Radius ──────────────────────────────────────────────────────
      borderRadius: {
        artist: '30px',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },

      // ── Spacing ────────────────────────────────────────────────────────────
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        128: '32rem',
      },

      // ── Container ──────────────────────────────────────────────────────────
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-2xl': '1400px',
      },

      // ── Typography ─────────────────────────────────────────────────────────
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },

      // ── Animation & Transition ─────────────────────────────────────────────
      transitionDuration: {
        250: '250ms',
        400: '400ms',
        600: '600ms',
      },

      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ── Z-Index ────────────────────────────────────────────────────────────
      zIndex: {
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        100: 100,
        200: 200,
      },
    },
  },

  plugins: [],
};