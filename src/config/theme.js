/**
 * LabelAlly Entertainment — Theme Documentation & Design Reference
 *
 * IMPORTANT: Runtime theme colors are driven by CSS custom properties in
 * `src/styles/globals.css`. Tailwind semantic utilities (`theme-*`, `surface-*`,
 * `ink-*`) map to those variables. Do not treat this file as a second runtime
 * source of truth.
 *
 * Primary action color (Services Page button): Tailwind `orange-500/600/700`
 * → CSS vars `--color-action-primary*` in globals.css.
 *
 * Decorative accent (headings/highlights): amber `accent-*` scale / `--color-accent-decorative`.
 *
 * Legacy brand pink: `--color-brand-accent` (#FF2E74) — footer accents only.
 */

export const theme = {
  // ─────────────────────────────────────────────
  // BRAND
  // ─────────────────────────────────────────────
  brand: {
    name: 'LabelAlly Entertainment',
    tagline: 'Your Vision, Amplified.',
  },

  // ─────────────────────────────────────────────
  // SEMANTIC TOKENS (documentation — runtime values in globals.css)
  // ─────────────────────────────────────────────
  semantic: {
    light: {
      page: '#FCFCFF',
      section: '#FFFFFF',
      card: '#FFFFFF',
      elevated: '#FFFFFF',
      heading: '#11143E',
      body: '#555B70',
      muted: '#7B8092',
      border: '#E2E8F0',
      inputSurface: '#F4F6FB',
      actionPrimary: '#F97316',
      accentDecorative: '#F59E0B',
      brandPink: '#FF2E74',
      focus: '#6366F1',
    },
    dark: {
      page: '#0B0F19',
      section: '#0F172A',
      card: '#1E293B',
      elevated: '#243044',
      heading: '#F8FAFC',
      body: '#CBD5E1',
      muted: '#94A3B8',
      border: '#334155',
      inputSurface: '#111827',
      focus: '#818CF8',
    },
  },

  // ─────────────────────────────────────────────
  // COLORS (static scales — Tailwind primary/accent/neutral)
  // ─────────────────────────────────────────────
  colors: {
    // Primary palette — deep midnight navy
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

    // Accent palette — electric gold / amber
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

    // Neutral / dark backgrounds
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

    // Semantic
    success:  '#22c55e',
    warning:  '#f59e0b',
    error:    '#ef4444',
    info:     '#3b82f6',

    // Base
    white: '#ffffff',
    black: '#000000',

    // Background layers
    background: {
      primary:   '#09090b',   // near-black
      secondary: '#18181b',   // dark surface
      tertiary:  '#27272a',   // card / panel
      elevated:  '#3f3f46',   // elevated element
    },

    // Text
    text: {
      primary:   '#fafafa',
      secondary: '#a1a1aa',
      muted:     '#71717a',
      inverse:   '#09090b',
    },

    // Border
    border: {
      default: '#3f3f46',
      subtle:  '#27272a',
      strong:  '#52525b',
    },
  },

  // ─────────────────────────────────────────────
  // GRADIENTS
  // ─────────────────────────────────────────────
  gradients: {
    // Hero / primary brand gradient
    hero:        'linear-gradient(135deg, #1e1b4b 0%, #09090b 50%, #451a03 100%)',
    // Accent gradient — gold shine
    accent:      'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
    // Subtle card overlay
    cardOverlay: 'linear-gradient(180deg, transparent 0%, rgba(9,9,11,0.85) 100%)',
    // Section divider
    divider:     'linear-gradient(90deg, transparent, #4f46e5, transparent)',
    // Text gradient — primary
    textPrimary: 'linear-gradient(135deg, #818cf8 0%, #fbbf24 100%)',
    // Radial glow
    glow:        'radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)',
  },

  // ─────────────────────────────────────────────
  // TYPOGRAPHY
  // ─────────────────────────────────────────────
  typography: {
    // Font families — keep in sync with tailwind.config.js + globals.css
    fontFamily: {
      heading: "'Outfit', 'Inter', system-ui, sans-serif",
      body: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },

    // Runtime visual tokens live in CSS variables + Tailwind theme.
    // These rem values remain as documentation / non-Tailwind consumers.
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      display: 'clamp(2.5rem, 1.4rem + 4.2vw, 5.5rem)',
      section: 'clamp(2rem, 1.35rem + 2.4vw, 3.75rem)',
      cardTitle: 'clamp(1.125rem, 1.05rem + 0.35vw, 1.5rem)',
      bodyMd: 'clamp(0.9375rem, 0.9rem + 0.2vw, 1.125rem)',
    },

    // Font weights
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },

    // Line heights
    lineHeight: {
      tight: 1.1,
      snug: 1.25,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },

    // Letter spacing
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // ─────────────────────────────────────────────
  // SPACING
  // ─────────────────────────────────────────────
  spacing: {
    // Section vertical padding
    section: {
      sm:  '3rem',     // 48px
      md:  '5rem',     // 80px
      lg:  '7rem',     // 112px
      xl:  '10rem',    // 160px
    },
    // Container max widths
    container: {
      sm:  '640px',
      md:  '768px',
      lg:  '1024px',
      xl:  '1280px',
      '2xl':'1400px',
    },
    // Container horizontal padding
    containerPadding: {
      mobile: '1rem',
      tablet: '1.5rem',
      desktop:'2rem',
    },
  },

  // ─────────────────────────────────────────────
  // BORDER RADIUS
  // ─────────────────────────────────────────────
  radius: {
    none:  '0px',
    sm:    '0.25rem',   // 4px
    md:    '0.5rem',    // 8px
    lg:    '0.75rem',   // 12px
    xl:    '1rem',      // 16px
    '2xl': '1.5rem',    // 24px
    '3xl': '2rem',      // 32px
    full:  '9999px',
  },

  // ─────────────────────────────────────────────
  // SHADOWS
  // ─────────────────────────────────────────────
  shadows: {
    sm:     '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
    md:     '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
    lg:     '0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -4px rgba(0, 0, 0, 0.5)',
    xl:     '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.6)',
    '2xl':  '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
    glow:   '0 0 30px rgba(99, 102, 241, 0.3)',
    glowGold:'0 0 30px rgba(251, 191, 36, 0.3)',
    inner:  'inset 0 2px 4px 0 rgba(0, 0, 0, 0.4)',
  },

  // ─────────────────────────────────────────────
  // Z-INDEX SCALE
  // ─────────────────────────────────────────────
  zIndex: {
    below:   -1,
    base:     0,
    raised:   10,
    dropdown: 100,
    sticky:   200,
    overlay:  300,
    modal:    400,
    toast:    500,
    tooltip:  600,
  },

  // ─────────────────────────────────────────────
  // TRANSITIONS
  // ─────────────────────────────────────────────
  transitions: {
    fast:   '150ms ease',
    base:   '250ms ease',
    slow:   '400ms ease',
    slower: '600ms ease',
  },

  // ─────────────────────────────────────────────
  // BREAKPOINTS
  // ─────────────────────────────────────────────
  breakpoints: {
    sm:  '640px',
    md:  '768px',
    lg:  '1024px',
    xl:  '1280px',
    '2xl':'1536px',
  },
};

export default theme;
