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
    'font-semibold',
    'rounded-lg',
    'border',
    'transition-all duration-250',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-primary-500',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-offset-neutral-950',
    'select-none',
    'whitespace-nowrap',
    'cursor-pointer',
  ].join(' ');

  // ── Variant class map ───────────────────────────────────────────
  const variantMap = {
    // Filled primary — brand indigo
    primary: [
      'bg-primary-600 hover:bg-primary-500 active:bg-primary-700',
      'text-white',
      'border-primary-600 hover:border-primary-500',
      'shadow-sm hover:shadow-glow-sm',
    ].join(' '),

    // Filled secondary — neutral dark
    secondary: [
      'bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-900',
      'text-neutral-100',
      'border-neutral-700 hover:border-neutral-600',
    ].join(' '),

    // Outlined — transparent with primary border
    outline: [
      'bg-transparent hover:bg-primary-950',
      'text-primary-400 hover:text-primary-300',
      'border-primary-700 hover:border-primary-500',
    ].join(' '),

    // Ghost — no border, no background
    ghost: [
      'bg-transparent hover:bg-neutral-800 active:bg-neutral-900',
      'text-neutral-400 hover:text-neutral-50',
      'border-transparent',
    ].join(' '),
  };

  // ── Size class map ──────────────────────────────────────────────
  const sizeMap = {
    sm: 'h-8  px-3   text-xs  gap-1.5',
    md: 'h-10 px-5   text-sm  gap-2',
    lg: 'h-12 px-7   text-base gap-2.5',
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
