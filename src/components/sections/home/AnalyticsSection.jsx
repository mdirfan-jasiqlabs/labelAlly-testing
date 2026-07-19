import { Link } from 'react-router-dom';
import { BarChart3, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import Container from '../../common/Container';
import SectionHeading from '../../common/SectionHeading';
import Card from '../../common/Card';
import Button from '../../common/Button';
import homeData from '../../../data/home.json';

const ICON_MAP = {
  BarChart3,
  ShieldCheck,
  FileText,
};

/**
 * AnalyticsSection — Renders details about reporting, royalty analytics, and rights auditing.
 */
function AnalyticsSection() {
  const { analytics } = homeData;

  if (!analytics) return null;

  return (
    <section
      aria-labelledby="analytics-section-heading"
      className="section-spacing-large bg-white dark:bg-theme-page border-t border-neutral-100 dark:border-theme-border/50"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Heading and info */}
          <div className="flex flex-col gap-6">
            <SectionHeading
              titleAs="h2"
              badge={analytics.badge}
              title={analytics.heading}
              description={analytics.description}
              align="left"
            />
            {analytics.supportingNote && (
              <p className="text-sm text-neutral-600 dark:text-theme-muted italic">
                {analytics.supportingNote}
              </p>
            )}
            {analytics.cta && (
              <div className="mt-4">
                <Button
                  as={Link}
                  to={analytics.cta.href}
                  aria-label={analytics.cta.ariaLabel}
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight size={16} aria-hidden="true" />}
                >
                  {analytics.cta.label}
                </Button>
              </div>
            )}
          </div>

          {/* Right Column: Key capabilities cards */}
          <div className="flex flex-col gap-4">
            {analytics.features.map((feature) => {
              const Icon = ICON_MAP[feature.icon];
              return (
                <Card
                  key={feature.id}
                  padding="md"
                  radius="lg"
                  bordered
                  hover
                  className="flex items-start gap-4 bg-white dark:bg-theme-card"
                >
                  {Icon && (
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-500/15 border border-primary-100 dark:border-primary-400/20 text-primary-600 dark:text-primary-400">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-semibold font-heading text-neutral-900 dark:text-theme-heading mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-theme-body leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}

export default AnalyticsSection;
