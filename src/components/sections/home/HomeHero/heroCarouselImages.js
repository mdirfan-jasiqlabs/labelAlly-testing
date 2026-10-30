/**
 * Keep the hero carousel in sync with the images actually configured for it.
 * Do not insert sample slides or substitute an unrelated "fallback" image.
 */
export function getUniqueHeroSlides(slides) {
  if (!Array.isArray(slides)) return [];

  const seenSources = new Set();

  return slides.flatMap((slide) => {
    const src = typeof slide?.src === 'string' ? slide.src.trim() : '';
    if (!src || seenSources.has(src)) return [];

    seenSources.add(src);
    return [{ ...slide, id: slide.id || src, src }];
  });
}

export function getAvailableHeroSlides(slides, statuses) {
  return slides.filter((slide) => statuses[slide.src] !== 'failed');
}

export function getReadyHeroSlides(slides, statuses) {
  return slides.filter((slide) => statuses[slide.src] === 'ready');
}

export function getNextReadyHeroSlide(readySlides, currentSrc) {
  if (readySlides.length === 0) return null;

  const currentIndex = readySlides.findIndex((slide) => slide.src === currentSrc);
  return readySlides[(currentIndex + 1) % readySlides.length];
}
