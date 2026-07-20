import { Loader2 } from 'lucide-react';

/**
 * Button — Reusable interactive button component.
 *
 * Renders a <button> or any element via the `as` prop.
 * For internal routing, pass `as={Link}` from react-router-dom.
 *
 * Props:
 * @param {ReactNode}    children    — Button label / content
 * @param {string}       [variant]   — 'primary'|'secondary'|'outline'|'ghost' (default: 'primary')
 * @param {string}       [size]      — 'sm'|'md'|'lg' (default: 'md')
 * @param {boolean}      [disabled]  — Disables the button
 * @param {boolean}      [loading]   — Shows spinner; disables interaction
 * @param {boolean}      [fullWidth] — Stretches to 100% width
 * @param {ElementType}  [as]        — Polymorphic element (default: 'button')
 * @param {string}       [className] — Additional Tailwind classes
 * @param {ReactNode}    [leftIcon]  — Icon to render before children
 * @param {ReactNode}    [rightIcon] — Icon to render after children
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  as: Tag = 'button',
  className = '',
  leftIcon,
  rightIcon,
  ...props
}) {
  // ── Base classes (applied to all variants) ──────────────────────
  const base = [
    'inline-flex items-center justify-center gap-2',
    'font-body font-semibold',
    'rounded-lg',
    'border',
    'transition-all duration-250 ease-out',
    'hover:scale-[1.015] active:scale-[0.985]',
    'motion-reduce:hover:scale-100 motion-reduce:active:scale-100',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-offset-[var(--color-page-bg)]',
    'select-none',
    'whitespace-nowrap',
    'cursor-pointer',
    'min-h-11',
  ].join(' ');

  // ── Variant class map ───────────────────────────────────────────
  const variantMap = {
    // Filled primary — brand orange
    primary: [
      'bg-orange-500 hover:bg-orange-600 active:bg-orange-700',
      'text-white',
      'border-orange-500 hover:border-orange-600',
      'shadow-sm hover:shadow-[0_8px_24px_-8px_rgba(249,115,22,0.55)]',
      'focus-visible:ring-orange-500',
    ].join(' '),

    // Filled secondary — neutral light
    secondary: [
      'bg-theme-secondary hover:bg-theme-hover active:bg-theme-elevated',
      'text-theme-heading',
      'border-theme-border hover:border-strong',
      'focus-visible:ring-theme-focus',
    ].join(' '),

    // Outlined — transparent with orange border
    outline: [
      'bg-transparent hover:bg-theme-hover',
      'text-orange-600 hover:text-orange-700',
      'border-orange-500 hover:border-orange-600',
      'focus-visible:ring-orange-500',
    ].join(' '),

    // Ghost — no border, no background
    ghost: [
      'bg-transparent hover:bg-theme-hover active:bg-theme-elevated',
      'text-theme-muted hover:text-theme-heading',
      'border-transparent',
      'focus-visible:ring-theme-focus',
    ].join(' '),
  };

  // ── Size class map (md+ meet ~44px touch target) ────────────────
  const sizeMap = {
    sm: 'h-9  min-h-9  px-3   text-xs  gap-1.5',
    md: 'h-11 min-h-11 px-5   text-sm  gap-2',
    lg: 'h-12 min-h-12 px-7   text-base gap-2.5',
  };

  // ── Disabled / loading state ────────────────────────────────────
  const isDisabled = disabled || loading;

  const disabledClasses = isDisabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  // ── Full width ──────────────────────────────────────────────────
  const widthClass = fullWidth ? 'w-full' : '';

  // ── Icon size by button size ────────────────────────────────────
  const iconSizeMap = {
    sm: 14,
    md: 16,
    lg: 18,
  };
  const iconSize = iconSizeMap[size] ?? 16;

  return (
    <Tag
      className={[
        base,
        variantMap[variant] ?? variantMap.primary,
        sizeMap[size] ?? sizeMap.md,
        disabledClasses,
        widthClass,
        className,
      ].filter(Boolean).join(' ')}
      disabled={Tag === 'button' ? isDisabled : undefined}
      aria-disabled={isDisabled ? true : undefined}
      aria-busy={loading ? true : undefined}
      {...props}
    >
      {/* ── Loading Spinner ── */}
      {loading && (
        <Loader2
          size={iconSize}
          className="animate-spin shrink-0"
          aria-hidden="true"
        />
      )}

      {/* ── Left Icon (hidden when loading) ── */}
      {!loading && leftIcon && (
        <span className="shrink-0" aria-hidden="true">
          {leftIcon}
        </span>
      )}

      {/* ── Label ── */}
      <span>{children}</span>

      {/* ── Right Icon (hidden when loading) ── */}
      {!loading && rightIcon && (
        <span className="shrink-0" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </Tag>
  );
}

export default Button;
