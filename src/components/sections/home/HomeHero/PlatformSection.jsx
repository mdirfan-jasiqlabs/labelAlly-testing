import PlatformMarquee from '../../../common/PlatformMarquee';

/**
 * Bottom platform availability strip — premium infinite CSS marquee.
 * JSON-driven; transparent; pause on hover; respects reduced motion.
 */
function PlatformSection({ platforms }) {
  if (!platforms?.enabled || !platforms.items?.length) return null;

  return (
    <PlatformMarquee
      items={platforms.items}
      heading={platforms.heading}
      highlightText={platforms.highlightText}
      moreLabel={platforms.moreLabel}
      moreHref={platforms.moreHref}
    />
  );
}

export default PlatformSection;
