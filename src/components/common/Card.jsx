import GlowEffect from './GlowEffect';

/**
 * Card — Reusable content card wrapper.
 *
 * Provides the base visual shell for any card-type UI.
 * Business content (services, artists, etc.) is passed as children.
 *
 * Props:
 * @param {ReactNode}  children      — Card content
 * @param {string}     [as]          — HTML element (default: 'div')
 * @param {boolean}    [bordered]    — Show border (default: true)
 * @param {boolean}    [hover]       — Enable hover lift/glow effect (default: true)
 * @param {boolean}    [glow]        — Wrap with GlowEffect (default: false)
 * @param {string}     [glowColor]   — GlowEffect color: 'primary'|'accent' (default: 'primary')
 * @param {string}     [padding]     — Padding preset: 'none'|'sm'|'md'|'lg' (default: 'md')
 * @param {string}     [radius]      — Border radius: 'md'|'lg'|'xl'|'2xl' (default: 'xl')
 * @param {string}     [className]   — Additional Tailwind classes
 */
function Card({
  children,
  as: Tag = 'div',
  bordered = true,
  hover = true,
  glow = false,
  glowColor = 'primary',
  padding = 'md',
  radius = 'xl',
  className = '',
  ...props
}) {
  // Padding map
  const paddingMap = {
    none: '',
    sm:   'p-4',
    md:   'p-6',
    lg:   'p-8',
  };

  // Radius map
  const radiusMap = {
    md:   'rounded-md',
    lg:   'rounded-lg',
    xl:   'rounded-xl',
    '2xl':'rounded-2xl',
    '3xl':'rounded-3xl',
  };

  const paddingClass = paddingMap[padding] ?? paddingMap.md;
  const radiusClass  = radiusMap[radius]  ?? radiusMap.xl;

  const cardElement = (
    <Tag
      className={[
        // Base
        'relative bg-neutral-900 animate-fade-in',
        radiusClass,
        paddingClass,

        // Border
        bordered ? 'border border-neutral-800' : '',

        // Hover
        hover ? [
          'transition-all duration-300 ease-out',
          'hover:-translate-y-1 hover:scale-[1.01]',
          'hover:border-neutral-700',
          'hover:shadow-card-hover',
        ].join(' ') : '',

        // Extension
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </Tag>
  );

  // Optionally wrap with GlowEffect
  if (glow) {
    return (
      <GlowEffect color={glowColor} intensity="sm">
        {cardElement}
      </GlowEffect>
    );
  }

  return cardElement;
}

export default Card;
