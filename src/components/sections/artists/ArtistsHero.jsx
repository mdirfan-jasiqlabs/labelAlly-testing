import Container from '../../common/Container';
import Badge from '../../common/Badge';
import GradientBackground from '../../common/GradientBackground';
import GlowEffect from '../../common/GlowEffect';
import artistsData from '../../../data/artists.json';

/**
 * ArtistsHero — Renders the top hero section of the Artists & Labels page.
 */
function ArtistsHero() {
  const { hero } = artistsData;

  if (!hero) return null;

  return (
    <GradientBackground
      as="section"
      variant="hero"
      aria-labelledby="artists-hero-title"
      className="relative py-20 md:py-28"
    >
      <Container className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Badge */}
          {hero.badge && (
            <Badge variant="outline" className="mb-6">
              {hero.badge}
            </Badge>
          )}

          {/* Heading */}
          <GlowEffect color="primary" intensity="md" className="w-full">
            <h1
              id="artists-hero-title"
              className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-neutral-50 tracking-tight leading-none mb-6"
            >
              {hero.title}
            </h1>
          </GlowEffect>

          {/* Description */}
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed">
            {hero.description}
          </p>
        </div>
      </Container>
    </GradientBackground>
  );
}

export default ArtistsHero;
