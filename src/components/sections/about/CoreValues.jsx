import { Compass, Heart, Shield } from 'lucide-react';
import Container from '../../common/Container';
import SectionHeading from '../../common/SectionHeading';
import Card from '../../common/Card';
import aboutData from '../../../data/about.json';

const ICON_MAP = {
  Compass,
  Heart,
  Shield,
};

/**
 * CoreValues — Renders core values cards from about.json.
 */
function CoreValues() {
  const { coreValues } = aboutData;

  if (!coreValues) return null;

  return (
    <section
      aria-labelledby="values-heading"
      className="py-8 md:py-12 bg-white dark:bg-theme-page border-t border-neutral-100 dark:border-theme-border/50"
    >
      <Container>
        <SectionHeading
          titleAs="h2"
          title={coreValues.heading}
          description={coreValues.description}
          align="center"
          className="mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.items.map((item) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <Card
                key={item.id}
                padding="lg"
                radius="xl"
                bordered
                hover
                className="flex flex-col gap-4 bg-neutral-50/60 dark:bg-theme-card/60"
              >
                {Icon && (
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-50 dark:bg-accent-500/15 border border-accent-200/30 dark:border-accent-400/20 text-accent-600 dark:text-accent-400">
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

export default CoreValues;
