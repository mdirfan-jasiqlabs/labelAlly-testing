import { Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import GradientBackground from '../components/common/GradientBackground';
import GlowEffect from '../components/common/GlowEffect';
import notFoundData from '../data/notFound.json';
import SEO from '../components/common/SEO';

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
      className="min-h-[70svh] sm:min-h-[80vh] flex items-center justify-center text-center relative overflow-hidden w-full"
    >
      <SEO
        title="Page Not Found | LabelAlly Entertainment"
        description="The page you are looking for could not be found. Return to the LabelAlly Entertainment website to explore our services."
        noindex={true}
      />
      {/* Decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[min(100%,20rem)] sm:w-[28rem] md:w-[36rem] lg:w-[600px] h-[180px] sm:h-[240px] md:h-[300px] rounded-full bg-primary-100/50 dark:bg-primary-900/20 blur-3xl animate-pulse-slow" />
      </div>

      <Container className="relative z-10 py-12 sm:py-16 flex flex-col items-center justify-center max-w-2xl mx-auto">
        <GlowEffect color="primary" intensity="md" className="w-full max-w-md mx-auto">
          <div className="flex flex-col items-center justify-center text-center w-full">
            {/* Error Code */}
            <span
              aria-hidden="true"
              className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-black font-heading text-primary-200/60 dark:text-primary-800/50 select-none tracking-tighter mb-4"
            >
              {notFoundData.errorCode}
            </span>

            {/* Heading */}
            <h1
              id="not-found-heading"
              className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-neutral-900 dark:text-theme-heading mb-4 tracking-tight text-center"
            >
              {notFoundData.heading}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-600 dark:text-theme-body max-w-md leading-relaxed mb-8 text-center px-1">
              {notFoundData.description}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
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
          </div>
        </GlowEffect>
      </Container>
    </GradientBackground>
  );
}

export default NotFoundPage;
