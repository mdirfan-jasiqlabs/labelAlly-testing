import Container from '../../common/Container';
import SectionHeading from '../../common/SectionHeading';
import aboutData from '../../../data/about.json';

/**
 * CompanyOverview — Renders company history/story paragraphs.
 */
function CompanyOverview() {
  const { overview } = aboutData;

  if (!overview) return null;

  return (
    <section
      aria-labelledby="overview-heading"
      className="py-16 md:py-24 bg-white border-t border-neutral-100"
    >
      <Container className="max-w-3xl">
        <SectionHeading
          titleAs="h2"
          title={overview.heading}
          align="left"
          className="mb-8"
        />
        <div className="flex flex-col gap-6 text-neutral-600 text-base leading-relaxed">
          {overview.paragraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CompanyOverview;
