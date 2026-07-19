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
  // Max-width map aligned with tailwind theme maxWidth.container-*
  const sizeMap = {
    sm: 'max-w-container-sm',
    md: 'max-w-container-md',
    lg: 'max-w-container-lg',
    xl: 'max-w-container-xl',
    '2xl': 'max-w-container-2xl',
  };

  const maxWidth = sizeMap[size] ?? sizeMap['2xl'];

  return (
    <Tag
      className={[
        'w-full min-w-0 mx-auto',
        'px-4 sm:px-6 lg:px-8 xl:px-10',
        maxWidth,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Container;
