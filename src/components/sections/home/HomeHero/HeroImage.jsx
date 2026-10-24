import ArtistCarousel from './ArtistCarousel';

/**
 * HeroImage — backward-compatible delegation to ArtistCarousel.
 */
function HeroImage({ slides }) {
  return <ArtistCarousel slides={slides} />;
}

export default HeroImage;
