/**
 * Container — Reusable layout wrapper.
 *
 * Responsibilities:
 * - Maximum content width (configurable)
 * - Responsive horizontal padding (mobile-first)
 * - Horizontal centering
 *
 * Props:
 * @param {ReactNode}  children   — Content to wrap
 * @param {string}     [as]       — HTML element to render (default: 'div')
 * @param {string}     [size]     — Max-width preset: 'sm'|'md'|'lg'|'xl'|'2xl' (default: '2xl')
 * @param {string}     [className]— Additional Tailwind classes
 */
function Container({ children, as: Tag = 'div', size = '2xl', className = '', ...props }) {
  // Max-width map aligned with theme.js spacing.container
  const sizeMap = {
    sm:  'max-w-screen-sm',   // 640px
    md:  'max-w-screen-md',   // 768px
    lg:  'max-w-screen-lg',   // 1024px
    xl:  'max-w-screen-xl',   // 1280px
    '2xl': 'max-w-[1400px]',  // 1400px (brand container)
  };

  const maxWidth = sizeMap[size] ?? sizeMap['2xl'];

  return (
    <Tag
      className={[
        'w-full mx-auto',
        'px-4 sm:px-6 lg:px-8',
        maxWidth,
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Container;
