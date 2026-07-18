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
    <section className="py-16 md:py-24 bg-neutral-900/10 border-t border-neutral-900">
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
                className="flex flex-col gap-5 bg-neutral-950/40"
              >
                {Icon && (
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-950 border border-primary-800 text-primary-400">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                )}
                <h3 className="text-2xl font-bold font-heading text-neutral-100">
                  {sec.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
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
