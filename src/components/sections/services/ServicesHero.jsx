import PageHero from '../../common/PageHero';
import servicesData from '../../../data/services.json';
import footerData from '../../../data/footer.json';

/**
 * ServicesHero — Services page hero.
 *
 * Thin, content-driven wrapper over the reusable PageHero. Copy comes from
 * services.json; the secondary CTA reuses the canonical WhatsApp link from the
 * shared footer contact data (no duplicated/invented URL). If that link is
 * unavailable, the secondary CTA is omitted rather than fabricated.
 */
function ServicesHero() {
  const { hero } = servicesData;

  if (!hero || hero.enabled === false) return null;

  const whatsapp = footerData?.contact?.whatsapp;
  const secondaryCta =
    hero.secondaryCta && whatsapp?.enabled !== false && whatsapp?.href
      ? { ...hero.secondaryCta, href: whatsapp.href, external: true }
      : null;

  return (
    <PageHero
      eyebrow={hero.eyebrow}
      title={hero.title}
      highlightedText={hero.highlightedText}
      description={hero.description}
      primaryCta={hero.primaryCta}
      secondaryCta={secondaryCta}
      showWave
      titleId="services-page-title"
    />
  );
}

export default ServicesHero;
