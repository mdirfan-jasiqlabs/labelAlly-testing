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
        body: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      // ── Brand Colors ───────────────────────────────────────────────────────
      colors: {
        // Semantic design tokens — map to CSS variables in globals.css
        theme: {
          page: 'var(--color-page-bg)',
          section: 'var(--color-section-bg)',
          card: 'var(--color-card-surface)',
          elevated: 'var(--color-elevated-surface)',
          secondary: 'var(--color-secondary-surface)',
          input: 'var(--color-input-surface)',
          overlay: 'var(--color-overlay)',
          logoCard: 'var(--color-logo-card-surface)',
          logoCardBorder: 'var(--color-logo-card-border)',
          header: 'var(--color-header-bg)',
          footer: 'var(--color-footer-bg)',
          heading: 'var(--color-heading-text)',
          body: 'var(--color-body-text)',
          muted: 'var(--color-muted-text)',
          secondaryForeground: 'var(--color-secondary-foreground)',
          border: 'var(--color-border)',
          inputBorder: 'var(--color-input-border)',
          // Legacy brand pink — footer / ThemeToggle / ScrollToTop accent
          accent: 'var(--color-brand-accent)',
          accentHover: 'var(--color-brand-accent-hover)',
          accentActive: 'var(--color-brand-accent-active)',
          accentDecorative: 'var(--color-accent-decorative)',
          accentDecorativeForeground: 'var(--color-accent-decorative-foreground)',
          // Footer chrome (always-dark)
          footerBorder: 'var(--color-footer-border)',
          footerMuted: 'var(--color-footer-muted)',
          footerMutedSoft: 'var(--color-footer-muted-soft)',
          footerHeading: 'var(--color-footer-heading)',
          footerElevated: 'var(--color-footer-elevated)',
          footerIconSurface: 'var(--color-footer-icon-surface)',
          footerDivider: 'var(--color-footer-divider)',
          footerHover: 'var(--color-footer-hover)',
          action: {
            primary: 'var(--color-action-primary)',
            primaryHover: 'var(--color-action-primary-hover)',
            primaryActive: 'var(--color-action-primary-active)',
            primaryForeground: 'var(--color-action-primary-foreground)',
            primaryBorder: 'var(--color-action-primary-border)',
            primaryBorderHover: 'var(--color-action-primary-border-hover)',
          },
          destructive: 'var(--color-destructive)',
          destructiveForeground: 'var(--color-destructive-foreground)',
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          hover: 'var(--color-hover)',
          focus: 'var(--color-focus)',
          toggle: 'var(--color-toggle-bg)',
          toggleActive: 'var(--color-toggle-active)',
          navActive: 'var(--color-nav-active-bg)',
          navActiveFg: 'var(--color-nav-active-fg)',
          navActiveIcon: 'var(--color-nav-active-icon-bg)',
          navActiveIconFg: 'var(--color-nav-active-icon-fg)',
          glass: 'var(--color-glass-bg)',
          glassBorder: 'var(--color-glass-border)',
          glassStrong: 'var(--color-glass-strong-bg)',
          glassStrongBorder: 'var(--color-glass-strong-border)',
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

        // ── Semantic surface tokens (CSS-var driven) ─
        surface: {
          page: 'var(--color-page-bg)',
          card: 'var(--color-card-surface)',
          muted: 'var(--color-section-bg)',
          elevated: 'var(--color-elevated-surface)',
          secondary: 'var(--color-secondary-surface)',
          input: 'var(--color-input-surface)',
          overlay: 'var(--color-overlay)',
        },

        // ── Ink (text) tokens (CSS-var driven) ──────────
        ink: {
          primary: 'var(--color-heading-text)',
          secondary: 'var(--color-body-text)',
          muted: 'var(--color-muted-text)',
          secondaryForeground: 'var(--color-secondary-foreground)',
        },

        // ── Brand Custom Colors ───────────────────────────────
        brand: {
          pink: 'var(--color-brand-accent)',
          orange: '#FF7E40',
          green: '#96E012',
          blue: '#2B83FC',
          indigo: '#4F46E5',
        },
      },

      // ── Border Colors ──────────────────────────────────────────────────────
      borderColor: {
        theme: 'var(--color-border)',
        subtle: 'var(--color-border-subtle)',
        strong: 'var(--color-border-strong)',
        input: 'var(--color-input-border)',
        // Footer chrome borders (always-dark)
        'theme-footerBorder': 'var(--color-footer-border)',
        'theme-footerDivider': 'var(--color-footer-divider)',
      },

      // ── Background Colors (semantic — CSS-var driven) ─────────────────────
      backgroundColor: {
        page: 'var(--color-page-bg)',
        surface: 'var(--color-section-bg)',
        elevated: 'var(--color-elevated-surface)',
        panel: 'var(--color-card-surface)',
        overlay: 'var(--color-overlay)',
        // Footer chrome surfaces
        'theme-footerElevated': 'var(--color-footer-elevated)',
        'theme-footerIconSurface': 'var(--color-footer-icon-surface)',
        'theme-footerHover': 'var(--color-footer-hover)',
      },

      // ── Ring Colors (focus + feedback) ───────────────────────────────────────
      ringColor: {
        theme: 'var(--color-focus-ring)',
        focus: 'var(--color-focus-ring)',
        destructive: 'var(--color-destructive)',
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
        // Reusable semantic radii for cards + form controls
        card: '1rem',
        control: '0.75rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },

      // ── Spacing (section rhythm helpers via theme) ──────────────────────────
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        128: '32rem',
        'logo-compact': '2.75rem',
        'logo-standard': '3.5rem',
        'logo-wide': '3rem',
        'section-compact-y': '3rem',
        'section-y': '4rem',
        'section-large-y': '5rem',
      },

      // ── Container ──────────────────────────────────────────────────────────
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-2xl': '1400px',
        'logo-compact': '7rem',
        'logo-standard': '10rem',
        'logo-wide': '12rem',
        'logo-extra-wide': '14rem',
      },

      // ── Min Height ─────────────────────────────────────────────────────────
      minHeight: {
        'partner-card': '7rem',
        'partner-card-md': '8rem',
        'partner-card-lg': '9rem',
      },

      // ── Typography ─────────────────────────────────────────────────────────
      // Fluid semantic scales — use these for new/shared headings & body UI.
      // Do not change page copy; components may adopt these tokens gradually.
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        display: [
          'clamp(2.5rem, 1.4rem + 4.2vw, 5.5rem)',
          { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' },
        ],
        section: [
          'clamp(2rem, 1.35rem + 2.4vw, 3.75rem)',
          { lineHeight: '1.12', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
        'card-title': [
          'clamp(1.125rem, 1.05rem + 0.35vw, 1.5rem)',
          { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' },
        ],
        'body-md': [
          'clamp(0.9375rem, 0.9rem + 0.2vw, 1.125rem)',
          { lineHeight: '1.625', fontWeight: '400' },
        ],
        label: [
          '0.75rem',
          { lineHeight: '1.25', letterSpacing: '0.06em', fontWeight: '600' },
        ],
      },

      // ── Animation & Transition ─────────────────────────────────────────────
      keyframes: {
        'hero-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'hero-drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(12px, -16px, 0)' },
        },
        'eq-bar': {
          '0%, 100%': { transform: 'scaleY(0.28)' },
          '25%': { transform: 'scaleY(0.85)' },
          '50%': { transform: 'scaleY(1)' },
          '75%': { transform: 'scaleY(0.55)' },
        },
        'hero-glow-pulse': {
          '0%, 100%': {
            opacity: '0.9',
            transform: 'translate(-50%, -50%) scale(1)',
          },
          '50%': {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1.06)',
          },
        },
        'hero-ring-spin': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'hero-orb-drift': {
          '0%, 100%': { transform: 'translate(-50%, -50%) translate(0, 0)' },
          '33%': { transform: 'translate(-50%, -50%) translate(18px, -14px)' },
          '66%': { transform: 'translate(-50%, -50%) translate(-12px, 10px)' },
        },
        'platform-marquee': {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        'wave-flow': {
          '0%': { transform: 'translateX(-3%)' },
          '100%': { transform: 'translateX(3%)' },
        },
        'spectrum-pulse': {
          '0%, 100%': { opacity: '0.35', transform: 'scaleY(0.55)' },
          '50%': { opacity: '0.7', transform: 'scaleY(1)' },
        },
        'node-float': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)', opacity: '0.45' },
          '50%': { transform: 'translate3d(0, -8px, 0)', opacity: '0.85' },
        },
      },
      animation: {
        'hero-float': 'hero-float 5s ease-in-out infinite',
        'hero-float-delayed': 'hero-float 6.5s ease-in-out 0.8s infinite',
        'hero-drift': 'hero-drift 12s ease-in-out infinite',
        'hero-drift-delayed': 'hero-drift 14s ease-in-out 1.2s infinite',
        'eq-bar': 'eq-bar 0.85s ease-in-out infinite',
        'eq-bar-fast': 'eq-bar 0.55s ease-in-out infinite',
        'eq-bar-slow': 'eq-bar 1.1s ease-in-out infinite',
        'hero-glow-pulse': 'hero-glow-pulse 3.8s ease-in-out infinite',
        'hero-ring-spin': 'hero-ring-spin 22s linear infinite',
        'hero-orb-drift': 'hero-orb-drift 8s ease-in-out infinite',
        'platform-marquee': 'platform-marquee 28s linear infinite',
        'wave-flow': 'wave-flow 14s ease-in-out infinite alternate',
        'wave-flow-delayed': 'wave-flow 18s ease-in-out 1.5s infinite alternate-reverse',
        'spectrum-pulse': 'spectrum-pulse 2.4s ease-in-out infinite',
        'node-float': 'node-float 6s ease-in-out infinite',
      },

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