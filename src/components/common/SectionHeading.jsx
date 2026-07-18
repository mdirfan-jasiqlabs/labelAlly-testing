import Badge from './Badge';

/**
 * SectionHeading — Reusable section heading block.
 *
 * Used at the top of every page section.
 * Renders a consistent: Badge (optional) → Title → Description (optional).
 *
 * Props:
 * @param {string}     title        — Section title (required)
 * @param {string}     [badge]      — Small label rendered above the title
 * @param {string}     [badgeVariant]— Badge variant: 'primary'|'secondary'|'outline' (default: 'primary')
 * @param {string}     [description]— Supporting paragraph text below title
 * @param {string}     [align]      — Text alignment: 'left'|'center'|'right' (default: 'center')
 * @param {string}     [titleAs]    — Heading element: 'h1'|'h2'|'h3' (default: 'h2')
 * @param {string}     [className]  — Additional classes on wrapper
 */
function SectionHeading({
  title,
  badge,
  badgeVariant = 'primary',
  description,
  align = 'center',
  titleAs: TitleTag = 'h2',
  className = '',
}) {
  // Alignment map
  const alignMap = {
    left:   'items-start text-left',
    center: 'items-center text-center',
    right:  'items-end text-right',
  };

  // Description max-width by alignment
  const descMaxWidth = align === 'center' ? 'max-w-2xl' : 'max-w-3xl';

  const alignClasses = alignMap[align] ?? alignMap.center;

  return (
    <div
      className={[
        'flex flex-col gap-4',
        alignClasses,
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* ── Badge (optional) ── */}
      {badge && (
        <Badge variant={badgeVariant}>
          {badge}
        </Badge>
      )}

      {/* ── Title ── */}
      <TitleTag
        className={[
          'font-heading font-bold tracking-tight',
          'text-3xl sm:text-4xl lg:text-5xl',
          'text-neutral-50',
          'leading-tight',
        ].join(' ')}
      >
        {title}
      </TitleTag>

      {/* ── Description (optional) ── */}
      {description && (
        <p
          className={[
            'text-neutral-400',
            'text-base sm:text-lg',
            'leading-relaxed',
            descMaxWidth,
            align === 'center' ? 'mx-auto' : '',
          ].filter(Boolean).join(' ')}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
