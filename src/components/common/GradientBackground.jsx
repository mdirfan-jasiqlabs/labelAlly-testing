/**
 * GradientBackground — Reusable decorative background wrapper.
 *
 * Renders a gradient background behind its children.
 * Uses only theme-aligned Tailwind colors and custom gradient
 * utilities defined in tailwind.config.js.
 *
 * Props:
 * @param {ReactNode}  children    — Page/section content
 * @param {string}     [variant]   — 'hero' | 'dark' | 'subtle' | 'accent' (default: 'hero')
 * @param {string}     [as]        — HTML element (default: 'div')
 * @param {string}     [className] — Additional classes
 */
function GradientBackground({
  children,
  variant = 'hero',
  as: Tag = 'div',
  className = '',
  ...props
}) {
  // Variant class map — uses gradient utilities from tailwind.config.js
  const variantMap = {
    // Light hero gradient; solid theme surface in dark mode
    hero: 'bg-gradient-hero dark:bg-none dark:bg-theme-page',

    // Solid page surface
    dark: 'bg-theme-page',

    // Subtle surface gradient; solid theme section in dark mode
    subtle: 'bg-gradient-to-b from-theme-secondary to-theme-page dark:bg-none dark:bg-theme-section',

    // Accent gradient — gold/amber (use sparingly)
    accent: 'bg-gradient-accent',

    // Radial glow overlay — transparent center
    glow: 'bg-gradient-glow dark:opacity-40',
  };

  const gradientClass = variantMap[variant] ?? variantMap.hero;

  return (
    <Tag
      className={[
        'relative overflow-hidden',
        gradientClass,
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {/* ── Decorative Noise Texture Overlay (subtle grain) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10">
        {children}
      </div>
    </Tag>
  );
}

export default GradientBackground;
