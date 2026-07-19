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
      'bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300',
      'border border-primary-100 dark:border-primary-800/50',
    ].join(' '),

    // Filled secondary — neutral light
    secondary: [
      'bg-neutral-100 text-neutral-600 dark:bg-theme-hover dark:text-theme-muted',
      'border border-neutral-200 dark:border-theme-border',
    ].join(' '),

    // Outline — transparent with accent border
    outline: [
      'bg-transparent text-accent-600 dark:text-accent-400',
      'border border-accent-400/40 dark:border-accent-500/40',
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
