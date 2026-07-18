import Container from '../../common/Container';
import SectionHeading from '../../common/SectionHeading';
import Card from '../../common/Card';
import artistsData from '../../../data/artists.json';

/**
 * ArtistSupport — Renders details about the custom support models we offer.
 */
function ArtistSupport() {
  const { support } = artistsData;

  if (!support) return null;

  return (
    <section
      aria-labelledby="support-heading"
      className="py-16 md:py-24 bg-white border-t border-neutral-100"
    >
      <Container>
        <SectionHeading
          titleAs="h2"
          title={support.heading}
          description={support.description}
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {support.items.map((item) => (
            <Card
              key={item.id}
              padding="lg"
              radius="xl"
              bordered
              hover
              className="flex flex-col gap-4 bg-neutral-50/60"
            >
              <h3 className="text-2xl font-bold font-heading text-neutral-900">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ArtistSupport;
