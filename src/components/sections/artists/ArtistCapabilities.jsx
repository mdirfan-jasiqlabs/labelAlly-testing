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
      className="py-16 md:py-24 bg-neutral-50/60 border-t border-neutral-100"
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
                className="flex flex-col gap-4 bg-white/40"
              >
                {Icon && (
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-50 border border-primary-100 text-primary-600">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                )}
                <h3 className="text-lg font-semibold font-heading text-neutral-900">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-900 leading-relaxed">
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
