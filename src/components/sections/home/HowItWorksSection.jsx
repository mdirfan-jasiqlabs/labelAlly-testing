import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../../common/Container';
import SectionHeading from '../../common/SectionHeading';
import Button from '../../common/Button';
import homeData from '../../../data/home.json';

/**
 * HowItWorksSection — Homepage process steps section.
 *
 * Displays the ordered steps to get started with LabelAlly.
 * Clear numbered hierarchy. Responsive step layout.
 * All content from src/data/home.json — no hardcoded strings.
 *
 * Layout:
 * - Mobile:  stacked vertically (1 column)
 * - Tablet:  2 columns
 * - Desktop: 4 columns (one per step)
 *
 * Semantics:
 * - <section> with aria-labelledby
 * - <ol> for ordered process steps
 */
function HowItWorksSection() {
  const { howItWorks } = homeData;

  if (!howItWorks?.steps?.length) return null;

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="py-20 md:py-28 lg:py-36 bg-neutral-950 relative overflow-hidden"
    >
      {/* ── Decorative background glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[800px] h-[400px] rounded-full bg-primary-950/40 blur-3xl" />
      </div>

      <Container className="relative z-10">

        {/* ── Section Header ── */}
        <SectionHeading
          titleAs="h2"
          badge={howItWorks.badge}
          title={howItWorks.heading}
          description={howItWorks.description}
          align="center"
        />

        {/* ── Steps ── */}
        <ol
          aria-label="How to get started"
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
        >
          {howItWorks.steps.map((step, index) => {
            const isLast = index === howItWorks.steps.length - 1;

            return (
              <li
                key={step.number}
                className="relative flex flex-col gap-4"
              >
                {/* ── Connector line (desktop only, not on last item) ── */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="hidden lg:block absolute top-5 left-[calc(50%+2rem)] right-0 h-px bg-gradient-to-r from-neutral-700 to-transparent"
                  />
                )}

                {/* ── Step Number Circle ── */}
                <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                  <div
                    aria-hidden="true"
                    className={[
                      'flex items-center justify-center',
                      'w-10 h-10 shrink-0',
                      'rounded-full',
                      'border-2 border-primary-700',
                      'bg-primary-950',
                      'text-primary-400 font-heading font-bold text-sm',
                    ].join(' ')}
                  >
                    {step.number}
                  </div>

                  {/* ── Title ── */}
                  <h3 className="text-base font-semibold font-heading text-neutral-100 leading-snug lg:hidden">
                    {step.title}
                  </h3>
                </div>

                {/* ── Title (desktop) ── */}
                <h3 className="hidden lg:block text-base font-semibold font-heading text-neutral-100 leading-snug">
                  {step.title}
                </h3>

                {/* ── Description ── */}
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>

        {/* ── Section CTA ── */}
        <div className="mt-16 flex justify-center">
          <Button
            as={Link}
            to="/contact"
            aria-label="Get started — contact LabelAlly Entertainment"
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight size={18} aria-hidden="true" />}
          >
            Get Started
          </Button>
        </div>

      </Container>
    </section>
  );
}

export default HowItWorksSection;
