/**
 * GlowEffect — Decorative radial glow wrapper.
 *
 * Renders a positioned glow behind its children using a
 * pseudo-element-equivalent absolute div. No business logic.
 *
 * Props:
 * @param {ReactNode}  children    — Content to wrap with glow
 * @param {string}     [color]     — 'primary' | 'accent' (default: 'primary')
 * @param {string}     [intensity] — 'sm' | 'md' | 'lg' (default: 'md')
 * @param {string}     [className] — Additional classes on wrapper
 */
function GlowEffect({ children, color = 'primary', intensity = 'md', className = '' }) {
  // Glow color map — theme-aligned colors
  const colorMap = {
    primary: 'bg-primary-500',
    accent:  'bg-accent-400',
  };

  // Opacity + blur by intensity
  const intensityMap = {
    sm: { opacity: 'opacity-10', blur: 'blur-xl',  size: 'w-48 h-48' },
    md: { opacity: 'opacity-15', blur: 'blur-2xl', size: 'w-72 h-72' },
    lg: { opacity: 'opacity-20', blur: 'blur-3xl', size: 'w-96 h-96' },
  };

  const glowColor = colorMap[color] ?? colorMap.primary;
  const { opacity, blur, size } = intensityMap[intensity] ?? intensityMap.md;

  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      {/* ── Glow Layer (decorative, non-interactive) ── */}
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',
          'absolute inset-0',
          'flex items-center justify-center',
          'z-0',
        ].join(' ')}
      >
        <div
          className={[
            'rounded-full',
            glowColor,
            opacity,
            blur,
            size,
          ].join(' ')}
        />
      </div>

      {/* ── Content Layer ── */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default GlowEffect;
