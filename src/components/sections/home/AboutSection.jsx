import { Link } from 'react-router-dom';
import { Globe, TrendingUp, Film, Star, ArrowRight } from 'lucide-react';
import Container from '../../common/Container';
import SectionHeading from '../../common/SectionHeading';
import Card from '../../common/Card';
import Button from '../../common/Button';
import homeData from '../../../data/home.json';

/**
 * Maps the icon string from home.json to the Lucide component.
 * Only icons referenced in about.values are mapped.
 */
const ICON_MAP = {
  Globe,
  TrendingUp,
  Film,
  Star,
};

/**
 * AboutSection — Homepage about / introduction section.
 *
 * Displays:
 * - Section badge + heading + description (via SectionHeading)
 * - Supporting paragraph
 * - 2x2 grid of core service value cards
 * - CTA button → /about
 *
 * Layout:
 * - Mobile:  stacked single column
 * - Desktop: left column (text + CTA) | right column (value cards grid)
 *
 * All content from src/data/home.json — zero hardcoded strings in JSX.
 */
function AboutSection() {
  const { about } = homeData;

  return (
    <section
      aria-labelledby="about-section-heading"
      className="py-20 md:py-28 lg:py-36 bg-white"
    >
      <Container className="animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left Column: Text + CTA ── */}
          <div className="flex flex-col gap-6">
            <SectionHeading
              titleAs="h2"
              badge={about.badge}
              title={about.heading}
              description={about.description}
              align="left"
            />

            {/* Supporting paragraph */}
            {about.supporting && (
              <p className="text-base text-neutral-9000 leading-relaxed">
                {about.supporting}
              </p>
            )}

            {/* CTA */}
            <div className="mt-2">
              <Button
                as={Link}
                to={about.cta.href}
                aria-label={about.cta.ariaLabel}
                variant="outline"
                size="md"
                rightIcon={<ArrowRight size={16} aria-hidden="true" />}
              >
                {about.cta.label}
              </Button>
            </div>
          </div>

          {/* ── Right Column: Value Cards Grid ── */}
          {about.values?.length > 0 && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              aria-label="Core services overview"
            >
              {about.values.map((value) => {
                const IconComponent = ICON_MAP[value.icon];

                return (
                  <Card
                    key={value.id}
                    padding="md"
                    radius="xl"
                    bordered
                    hover
                    className="flex flex-col gap-4"
                  >
                    {/* Icon */}
                    {IconComponent && (
                      <div
                        aria-hidden="true"
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 border border-primary-100"
                      >
                        <IconComponent
                          size={20}
                          className="text-primary-600"
                        />
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-base font-semibold font-heading text-neutral-900 leading-snug">
                      {value.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-neutral-9000 leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          )}

        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
