/**
 * BrandLogo — Production LabelAlly mark with transparent backgrounds.
 *
 * Uses separate light/dark assets because the approved mark mixes black and red ink;
 * black ink is invisible on dark surfaces without remapping.
 *
 * Paths are root-relative (`/brand/...`) so they resolve on nested routes and Vercel.
 */
function BrandLogo({
  className = '',
  width = 1035,
  height = 847,
  loading = 'lazy',
  decoding = 'async',
  /**
   * auto  — follow document theme (Header / MobileMenu)
   * light — always black+red on transparent (light surfaces)
   * dark  — always white+red on transparent (Footer / always-dark chrome)
   */
  variant = 'auto',
  alt = 'LabelAlly Entertainment Logo',
}) {
  const lightSrc = '/brand/logo.png';
  const darkSrc = '/brand/logo-on-dark.png';

  if (variant === 'light') {
    return (
      <img
        src={lightSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        className={className}
      />
    );
  }

  if (variant === 'dark') {
    return (
      <img
        src={darkSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        className={className}
      />
    );
  }

  return (
    <>
      <img
        src={lightSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        className={[className, 'dark:hidden'].filter(Boolean).join(' ')}
      />
      <img
        src={darkSrc}
        alt=""
        aria-hidden="true"
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        className={[className, 'hidden dark:block'].filter(Boolean).join(' ')}
      />
    </>
  );
}

export default BrandLogo;
