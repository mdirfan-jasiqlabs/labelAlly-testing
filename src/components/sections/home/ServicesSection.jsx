import { Link } from 'react-router-dom';
import {
  Globe,
  PlayCircle,
  Shield,
  Fingerprint,
  Tv,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import Container from '../../common/Container';
import SectionHeading from '../../common/SectionHeading';
import Card from '../../common/Card';
import Button from '../../common/Button';
import homeData from '../../../data/home.json';

/**
 * Maps the icon string from home.json → Lucide React component.
 * Only the 6 icons used in services.items are mapped.
 */
const ICON_MAP = {
  Globe,
  PlayCircle,
  Shield,
  Fingerprint,
  Tv,
  TrendingUp,
};

/**
 * ServicesSection — Homepage services preview grid.
 *
 * Displays all 6 approved services in a responsive card grid.
 * Each card includes an icon, title, and description.
 * A section-level CTA links to the full /services page.
 *
 * All content from src/data/home.json — no hardcoded strings.
 *
 * Layout:
 * - Mobile:  1 column
 * - Tablet:  2 columns
 * - Desktop: 3 columns
 */
function ServicesSection() {
  const { services } = homeData;

  if (!services?.items?.length) return null;

  return (
    <section
      aria-labelledby="services-section-heading"
      className="py-20 md:py-28 lg:py-36 bg-neutral-900/30"
    >
      <Container>

        {/* ── Section Header ── */}
        <SectionHeading
          titleAs="h2"
          badge={services.badge}
          title={services.heading}
          description={services.description}
          align="center"
        />

        {/* ── Service Cards Grid ── */}
        <div
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Services list"
        >
          {services.items.map((service) => {
            const IconComponent = ICON_MAP[service.icon];

            return (
              <Card
                key={service.id}
                padding="lg"
                radius="xl"
                bordered
                hover
                className="flex flex-col gap-5 group"
              >
                {/* Icon */}
                {IconComponent && (
                  <div
                    aria-hidden="true"
                    className={[
                      'flex items-center justify-center',
                      'w-12 h-12 rounded-xl',
                      'bg-primary-950 border border-primary-800/60',
                      'transition-colors duration-400',
                      'group-hover:bg-primary-900 group-hover:border-primary-700',
                    ].join(' ')}
                  >
                    <IconComponent size={22} className="text-primary-400" />
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-semibold font-heading text-neutral-100 leading-snug">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="flex-1 text-sm text-neutral-500 leading-relaxed">
                  {service.description}
                </p>

                {/* Card-level link — links to /services */}
                {service.href && (
                  <Link
                    to={service.href}
                    aria-label={`Learn more about ${service.title}`}
                    className={[
                      'inline-flex items-center gap-1.5',
                      'text-sm font-medium',
                      'text-primary-400 hover:text-primary-300',
                      'transition-colors duration-250',
                      'focus-ring rounded',
                      'mt-auto',
                    ].join(' ')}
                  >
                    Learn more
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                )}
              </Card>
            );
          })}
        </div>

        {/* ── Section CTA ── */}
        <div className="mt-12 flex justify-center">
          <Button
            as={Link}
            to={services.cta.href}
            aria-label={services.cta.ariaLabel}
            variant="secondary"
            size="lg"
            rightIcon={<ArrowRight size={18} aria-hidden="true" />}
          >
            {services.cta.label}
          </Button>
        </div>

      </Container>
    </section>
  );
}

export default ServicesSection;
