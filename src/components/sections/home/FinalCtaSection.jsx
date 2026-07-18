import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Container from '../../common/Container';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import GradientBackground from '../../common/GradientBackground';
import GlowEffect from '../../common/GlowEffect';
import Card from '../../common/Card';
import homeData from '../../../data/home.json';

/**
 * FinalCtaSection — High-impact call-to-action block at the end of the homepage.
 */
function FinalCtaSection() {
  const { finalCta } = homeData;

  if (!finalCta) return null;

  return (
    <GradientBackground
      as="section"
      variant="subtle"
      className="py-20 md:py-28 lg:py-36 border-t border-neutral-100 overflow-hidden relative"
    >
      {/* Decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] translate-y-1/3 translate-x-1/3 rounded-full bg-primary-900/20 blur-3xl"
      />

      <Container>
        <GlowEffect color="primary" intensity="md" className="max-w-4xl mx-auto">
          <Card
            padding="lg"
            radius="2xl"
            bordered
            hover={false}
            className="flex flex-col items-center text-center gap-6 bg-neutral-50/50 border border-neutral-200/80 py-16 px-4 sm:px-12 md:py-20 relative z-10"
          >
            {/* Badge */}
            {finalCta.badge && (
              <Badge variant="outline" className="mb-2">
                {finalCta.badge}
              </Badge>
            )}

            {/* Heading */}
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-neutral-900 leading-tight max-w-2xl">
              {finalCta.heading}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-600 max-w-xl leading-relaxed">
              {finalCta.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
              <Button
                as={Link}
                to={finalCta.primaryCta.href}
                aria-label={finalCta.primaryCta.ariaLabel}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight size={18} aria-hidden="true" />}
              >
                {finalCta.primaryCta.label}
              </Button>
              <Button
                as={Link}
                to={finalCta.secondaryCta.href}
                aria-label={finalCta.secondaryCta.ariaLabel}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<ChevronRight size={18} aria-hidden="true" />}
              >
                {finalCta.secondaryCta.label}
              </Button>
            </div>

            {/* Contact Note */}
            {finalCta.contactNote && (
              <p className="text-xs text-neutral-900 mt-2">
                {finalCta.contactNote}
              </p>
            )}
          </Card>
        </GlowEffect>
      </Container>
    </GradientBackground>
  );
}

export default FinalCtaSection;
