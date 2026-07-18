/**
 * Badge — Reusable label chip / pill component.
 *
 * Props:
 * @param {ReactNode}  children    — Badge text or content
 * @param {string}     [variant]   — 'primary' | 'secondary' | 'outline' (default: 'primary')
 * @param {string}     [className] — Additional Tailwind classes
 */
function Badge({ children, variant = 'primary', className = '', ...props }) {
  // Variant class map — uses only theme-aligned Tailwind tokens
  const variantMap = {
    // Filled primary — indigo/violet tint with subtle text
    primary: [
      'bg-primary-50 text-primary-750',
      'border border-primary-100',
    ].join(' '),

    // Filled secondary — neutral dark
    secondary: [
      'bg-neutral-800 text-neutral-600',
      'border border-neutral-300',
    ].join(' '),

    // Outline — transparent with accent border
    outline: [
      'bg-transparent text-accent-600',
      'border border-accent-400/40',
    ].join(' '),
  };

  const variantClasses = variantMap[variant] ?? variantMap.primary;

  return (
    <span
      className={[
        // Base
        'inline-flex items-center',
        'px-3 py-1',
        'rounded-full',
        'text-xs font-semibold tracking-wider uppercase',
        'whitespace-nowrap',
        // Variant
        variantClasses,
        // Extension
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
