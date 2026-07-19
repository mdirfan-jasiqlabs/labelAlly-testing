import { Globe, Shield, TrendingUp } from 'lucide-react';
import Container from '../../common/Container';
import SectionHeading from '../../common/SectionHeading';
import Card from '../../common/Card';
import artistsData from '../../../data/artists.json';

const ICON_MAP = {
  Globe,
  Shield,
  TrendingUp,
};

/**
 * ArtistCapabilities — Displays dynamic capabilities on the Artists page.
 */
function ArtistCapabilities() {
  const { capabilities } = artistsData;

  if (!capabilities) return null;

  return (
    <section
      aria-labelledby="capabilities-heading"
      className="py-16 md:py-24 bg-neutral-50/60 dark:bg-theme-section border-t border-neutral-100 dark:border-theme-border/50"
    >
      <Container>
        <SectionHeading
          titleAs="h2"
          title={capabilities.heading}
          description={capabilities.description}
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.items.map((item) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <Card
                key={item.id}
                padding="lg"
                radius="xl"
                bordered
                hover
                className="flex flex-col gap-4 bg-white dark:bg-theme-card"
              >
                {Icon && (
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-500/15 border border-primary-100 dark:border-primary-400/20 text-primary-600 dark:text-primary-400">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                )}
                <h3 className="text-lg font-semibold font-heading text-neutral-900 dark:text-theme-heading">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-theme-body leading-relaxed">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default ArtistCapabilities;
