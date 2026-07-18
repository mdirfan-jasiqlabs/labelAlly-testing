import { Layers, Globe, UserCheck, Headphones, CheckCircle, Zap } from 'lucide-react';
import Container from '../../common/Container';
import SectionHeading from '../../common/SectionHeading';
import Card from '../../common/Card';
import homeData from '../../../data/home.json';

const ICON_MAP = {
  Layers,
  Globe,
  UserCheck,
  Headphones,
  CheckCircle,
  Zap,
};

/**
 * WhyChooseSection — Section explaining the benefits of choosing LabelAlly Entertainment.
 * Sourced from home.json content.
 */
function WhyChooseSection() {
  const { whyChoose } = homeData;

  if (!whyChoose) return null;

  return (
    <section
      aria-labelledby="why-choose-heading"
      className="py-20 md:py-28 lg:py-36 bg-neutral-900/10 border-t border-neutral-900"
    >
      <Container>
        {/* Section Header */}
        <SectionHeading
          titleAs="h2"
          badge={whyChoose.badge}
          title={whyChoose.heading}
          description={whyChoose.description}
          align="center"
          className="mb-14"
        />

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChoose.benefits.map((benefit) => {
            const Icon = ICON_MAP[benefit.icon];
            return (
              <Card
                key={benefit.id}
                padding="lg"
                radius="xl"
                bordered
                hover
                className="flex flex-col gap-4 bg-neutral-950/40"
              >
                {Icon && (
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-950 border border-accent-900/30 text-accent-400">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                )}
                <h3 className="text-lg font-semibold font-heading text-neutral-100 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default WhyChooseSection;
