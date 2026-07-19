import { Target, Eye } from 'lucide-react';
import Container from '../../common/Container';
import Card from '../../common/Card';
import aboutData from '../../../data/about.json';

const ICON_MAP = {
  Target,
  Eye,
};

/**
 * MissionVision — Renders the Mission and Vision side-by-side blocks.
 */
function MissionVision() {
  const { missionVision } = aboutData;

  if (!missionVision) return null;

  const sections = [missionVision.mission, missionVision.vision];

  return (
    <section className="py-16 md:py-24 bg-neutral-50/60 dark:bg-theme-section border-t border-neutral-100 dark:border-theme-border/50">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((sec, index) => {
            const Icon = ICON_MAP[sec.icon];
            return (
              <Card
                key={index}
                padding="lg"
                radius="xl"
                bordered
                hover
                className="flex flex-col gap-5 bg-white dark:bg-theme-card"
              >
                {Icon && (
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-500/15 border border-primary-100 dark:border-primary-400/20 text-primary-600 dark:text-primary-400">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                )}
                <h3 className="text-2xl font-bold font-heading text-neutral-900 dark:text-theme-heading">
                  {sec.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-theme-body leading-relaxed">
                  {sec.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default MissionVision;
