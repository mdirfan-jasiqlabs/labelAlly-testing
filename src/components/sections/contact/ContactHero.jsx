import Container from '../../common/Container';
import Badge from '../../common/Badge';
import GradientBackground from '../../common/GradientBackground';
import GlowEffect from '../../common/GlowEffect';
import contactData from '../../../data/contact.json';

/**
 * ContactHero — Renders the top hero section of the Contact page.
 */
function ContactHero() {
  const { hero } = contactData;

  if (!hero) return null;

  return (
    <GradientBackground
      as="section"
      variant="hero"
      aria-labelledby="contact-hero-title"
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
              id="contact-hero-title"
              className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight leading-none mb-6"
            >
              {hero.title}
            </h1>
          </GlowEffect>

          {/* Description */}
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed">
            {hero.description}
          </p>
        </div>
      </Container>
    </GradientBackground>
  );
}

export default ContactHero;
