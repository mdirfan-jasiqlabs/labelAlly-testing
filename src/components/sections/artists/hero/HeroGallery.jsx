import { heroClasses } from './heroClasses';

/**
 * Right-column visual collage: main image + floating photos.
 */
function HeroGallery({ gallery }) {
  if (!gallery?.main) return null;

  const { galleryClass, imageClass } = heroClasses;

  return (
    <div className={galleryClass.root}>
      <div className={galleryClass.stage}>
        <div className={galleryClass.mainWrap}>
          <img
            src={gallery.main.src}
            alt={gallery.main.alt}
            width={gallery.main.width}
            height={gallery.main.height}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className={`${galleryClass.mainImage} ${imageClass}`}
          />
        </div>

        {(gallery.floating ?? []).map((item) => {
          const positionClass =
            galleryClass.float[item.position] ?? galleryClass.float['top-right'];

          return (
            <div key={item.id} className={positionClass}>
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
                className={`${galleryClass.floatImage} ${imageClass}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HeroGallery;
