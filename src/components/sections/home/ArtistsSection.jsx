import { Link } from 'react-router-dom';
import { ArrowRight, Mic2, Building2, Music } from 'lucide-react';
import Container from '../../common/Container';
import SectionHeading from '../../common/SectionHeading';
import Card from '../../common/Card';
import Button from '../../common/Button';
import homeData from '../../../data/home.json';

const ICON_MAP = {
  Mic2,
  Building2,
  Music,
};

/**
 * ArtistsSection — Displays who we work with categories (Artists, Labels, Brands).
 * Sourced from home.json content.
 */
function ArtistsSection() {
  const { artists } = homeData;

  if (!artists) return null;

  return (
    <section
      aria-labelledby="artists-section-heading"
      className="py-20 md:py-28 lg:py-36 bg-white border-t border-neutral-100"
    >
      <Container className="animate-fade-in">
        {/* Section Header */}
        <SectionHeading
          titleAs="h2"
          badge={artists.badge}
          title={artists.heading}
          description={artists.description}
          align="center"
          className="mb-14"
        />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {artists.categories.map((category) => {
            const Icon = ICON_MAP[category.icon];
            return (
              <Card
                key={category.id}
                padding="lg"
                radius="xl"
                bordered
                hover
                className="flex flex-col gap-5 text-center items-center bg-neutral-50"
              >
                {Icon && (
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-50 border border-primary-100 text-primary-600">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                )}
                <h3 className="text-xl font-semibold font-heading text-neutral-900 leading-snug">
                  {category.title}
                </h3>
                <p className="text-sm text-neutral-9000 leading-relaxed max-w-xs">
                  {category.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* CTA Button */}
        {artists.cta && (
          <div className="flex justify-center">
            <Button
              as={Link}
              to={artists.cta.href}
              aria-label={artists.cta.ariaLabel}
              variant="outline"
              size="lg"
              rightIcon={<ArrowRight size={18} aria-hidden="true" />}
            >
              {artists.cta.label}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

export default ArtistsSection;
