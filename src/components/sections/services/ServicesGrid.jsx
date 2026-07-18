import { Globe, PlayCircle, Shield, Fingerprint, Tv, TrendingUp } from 'lucide-react';
import Container from '../../common/Container';
import SectionHeading from '../../common/SectionHeading';
import Card from '../../common/Card';
import servicesData from '../../../data/services.json';

const ICON_MAP = {
  Globe,
  PlayCircle,
  Shield,
  Fingerprint,
  Tv,
  TrendingUp,
};

/**
 * ServicesGrid — Displays the detailed grid of all 6 services on the Services page.
 */
function ServicesGrid() {
  const { list } = servicesData;

  if (!list) return null;

  return (
    <section
      aria-labelledby="services-list-heading"
      className="py-16 md:py-24 bg-neutral-950 border-t border-neutral-900"
    >
      <Container>
        <SectionHeading
          titleAs="h2"
          title={list.heading}
          description={list.description}
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.items.map((service) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <Card
                key={service.id}
                padding="lg"
                radius="xl"
                bordered
                hover
                className="flex flex-col gap-5 bg-neutral-900/30"
              >
                {Icon && (
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-950 border border-primary-800 text-primary-400">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                )}
                <h3 className="text-xl font-bold font-heading text-neutral-100">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default ServicesGrid;
