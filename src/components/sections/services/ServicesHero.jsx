import Container from '../../common/Container';
import Badge from '../../common/Badge';
import GradientBackground from '../../common/GradientBackground';
import GlowEffect from '../../common/GlowEffect';
import servicesData from '../../../data/services.json';

/**
 * ServicesHero — Renders the top hero section of the Services page.
 */
function ServicesHero() {
  const { hero } = servicesData;

  if (!hero) return null;

  return (
    <GradientBackground
      as="section"
      variant="hero"
      aria-labelledby="services-hero-title"
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Decorative Shapes */}
      <div
        aria-hidden="true"
        className="absolute left-[5%] top-[20%] w-12 h-6 bg-brand-pink/20 dark:bg-brand-pink/10 rounded-full transform rotate-45 hidden lg:block pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute right-[8%] top-[15%] w-8 h-8 border-2 border-brand-green/30 dark:border-brand-green/20 rounded-sm transform rotate-12 hidden lg:block pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute left-[10%] bottom-[25%] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[16px] border-b-brand-orange/20 dark:border-b-brand-orange/10 hidden lg:block pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute right-[12%] bottom-[30%] w-16 h-16 opacity-[0.15] dark:opacity-[0.08] hidden lg:block pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1.5px, transparent 1.5px)',
          backgroundSize: '8px 8px',
        }}
      />

      <Container className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Badge */}
          {hero.badge && (
            <Badge variant="outline" className="mb-6">
              {hero.badge}
            </Badge>
          )}

          {/* Heading */}
          <h1
            id="services-hero-title"
            className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-neutral-900 dark:text-theme-heading tracking-tight leading-none mb-6"
          >
            {hero.title}
          </h1>

          {/* Decorative Underline */}
          <div
            aria-hidden="true"
            className="h-1 w-20 bg-brand-pink rounded-full mb-6"
          />

          {/* Description */}
          <p className="text-base sm:text-lg text-neutral-600 dark:text-theme-body max-w-2xl leading-relaxed">
            {hero.description}
          </p>
        </div>
      </Container>
    </GradientBackground>
  );
}

export default ServicesHero;
