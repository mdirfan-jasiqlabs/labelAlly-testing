import { aboutIntroData } from '../../data/aboutData';
import { MotionStagger, MotionItem } from '../motion';

/**
 * AboutImageGallery — 2x2 image grid for the right side of the About section.
 * Supports image loading optimizations (lazy-load, explicit dimensions, aspect-ratios).
 */
function AboutImageGallery() {
  const { images } = aboutIntroData;

  if (!images || images.length === 0) return null;

  // Filter enabled images
  const enabledImages = images.filter((img) => img.enabled);
  if (enabledImages.length === 0) return null;

  return (
    <MotionStagger
      className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6 w-full"
      stagger={0.08}
    >
      {enabledImages.slice(0, 4).map((image) => (
        <MotionItem
          key={image.id}
          variant="scale"
          className="relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] border border-theme-border dark:border-theme-border/30 bg-surface-muted dark:bg-theme-card shadow-[0_8px_24px_rgba(25,24,70,0.02)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(25,24,70,0.05)] aspect-[4/5] sm:aspect-[1.1]"
        >
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        </MotionItem>
      ))}
    </MotionStagger>
  );
}

export default AboutImageGallery;
