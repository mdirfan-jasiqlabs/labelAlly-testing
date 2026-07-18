import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../../common/Container';
import Button from '../../common/Button';
import GradientBackground from '../../common/GradientBackground';
import GlowEffect from '../../common/GlowEffect';
import Card from '../../common/Card';
import servicesData from '../../../data/services.json';

/**
 * ServicesCta — Call to action section at the bottom of the Services page.
 */
function ServicesCta() {
  const { cta } = servicesData;

  if (!cta) return null;

  return (
    <GradientBackground
      as="section"
      variant="subtle"
      className="py-16 md:py-24 border-t border-neutral-900 overflow-hidden relative"
    >
      <Container>
        <GlowEffect color="primary" intensity="md" className="max-w-4xl mx-auto">
          <Card
            padding="lg"
            radius="2xl"
            bordered
            hover={false}
            className="flex flex-col items-center text-center gap-6 bg-neutral-900/60 border border-neutral-800 py-12 px-6 sm:px-12 md:py-16 relative z-10"
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-50 leading-tight max-w-xl">
              {cta.heading}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed">
              {cta.description}
            </p>
            <div className="mt-2 w-full sm:w-auto">
              <Button
                as={Link}
                to={cta.primaryCta.href}
                aria-label={cta.primaryCta.ariaLabel}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight size={18} aria-hidden="true" />}
              >
                {cta.primaryCta.label}
              </Button>
            </div>
          </Card>
        </GlowEffect>
      </Container>
    </GradientBackground>
  );
}

export default ServicesCta;
