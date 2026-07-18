import { Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import GradientBackground from '../components/common/GradientBackground';
import GlowEffect from '../components/common/GlowEffect';
import notFoundData from '../data/notFound.json';

/**
 * NotFoundPage — Wildcard 404 error page.
 * Sourced dynamically from notFound.json.
 */
function NotFoundPage() {
  return (
    <GradientBackground
      as="section"
      variant="hero"
      aria-labelledby="not-found-heading"
      className="min-h-[80vh] flex items-center relative overflow-hidden"
    >
      {/* Decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[600px] h-[300px] rounded-full bg-primary-950/30 blur-3xl" />
      </div>

      <Container className="relative z-10 py-16 text-center max-w-2xl mx-auto">
        <GlowEffect color="primary" intensity="md" className="flex flex-col items-center">
          
          {/* Error Code */}
          <span
            aria-hidden="true"
            className="text-8xl sm:text-9xl font-black font-heading text-primary-900/50 select-none tracking-tighter mb-4"
          >
            {notFoundData.errorCode}
          </span>

          {/* Heading */}
          <h1
            id="not-found-heading"
            className="font-heading font-bold text-3xl sm:text-4xl text-neutral-50 mb-4 tracking-tight"
          >
            {notFoundData.heading}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed mb-8">
            {notFoundData.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Primary CTA: Back to Home */}
            <Button
              as={Link}
              to={notFoundData.primaryCta.href}
              aria-label={notFoundData.primaryCta.ariaLabel}
              variant="primary"
              size="md"
              className="w-full sm:w-auto"
              leftIcon={<ArrowLeft size={16} aria-hidden="true" />}
            >
              {notFoundData.primaryCta.label}
            </Button>

            {/* Secondary CTA: Contact Support */}
            {notFoundData.secondaryCta && (
              <Button
                as={Link}
                to={notFoundData.secondaryCta.href}
                aria-label={notFoundData.secondaryCta.ariaLabel}
                variant="outline"
                size="md"
                className="w-full sm:w-auto"
                leftIcon={<MessageSquare size={16} aria-hidden="true" />}
              >
                {notFoundData.secondaryCta.label}
              </Button>
            )}
          </div>

        </GlowEffect>
      </Container>
    </GradientBackground>
  );
}

export default NotFoundPage;
