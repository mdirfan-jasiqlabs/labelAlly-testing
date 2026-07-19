import servicesData from '../../../data/services.json';

/**
 * ProcessImage — Organic image treatment with decorative elements.
 */
function ProcessImage() {
  const { process } = servicesData;

  if (!process?.image) return null;

  const { src, alt, width, height } = process.image;

  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0">
      {/* Decorative outline behind image */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[2.5rem] border-2 border-brand-pink/20 dark:border-brand-pink/10 -rotate-3"
      />

      {/* Dotted pattern decoration */}
      <div
        aria-hidden="true"
        className="absolute -top-6 -left-6 w-24 h-24 opacity-[0.15] dark:opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1.5px, transparent 1.5px)',
          backgroundSize: '8px 8px',
        }}
      />

      {/* Small accent decoration */}
      <div
        aria-hidden="true"
        className="absolute -bottom-4 -right-4 w-12 h-12 bg-brand-green/20 dark:bg-brand-green/10 rounded-full"
      />

      {/* Main image with organic shape */}
      <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-theme-card shadow-lg border border-neutral-200/80 dark:border-theme-border/50">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}

export default ProcessImage;
