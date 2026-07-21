import Container from '../../common/Container';
import OfficeCard from './OfficeCard';
import ContactHelpStrip from './ContactHelpStrip';
import contactData from '../../../data/contact.json';
import footerData from '../../../data/footer.json';
import { MotionStagger, MotionItem } from '../../motion';

/**
 * OfficeCardsSection — Three-office grid + contact help strip.
 */
function OfficeCardsSection() {
  const { offices, helpStrip } = contactData;

  const enabledOffices = (offices?.items ?? []).filter((office) => office.enabled);
  const showOffices = offices?.enabled !== false && enabledOffices.length > 0;
  const showHelpStrip = Boolean(helpStrip?.enabled);

  if (!showOffices && !showHelpStrip) return null;

  const officeCount = enabledOffices.length;

  const whatsappUrl =
    footerData?.contact?.whatsapp?.enabled !== false
      ? footerData?.contact?.whatsapp?.href
      : null;

  return (
    <section
      role="region"
      aria-labelledby="office-locations-heading"
      className={[
        'relative z-20 w-full overflow-visible',
        'bg-surface-page dark:bg-theme-page',
        'pb-6 sm:pb-8 md:pb-10 lg:pb-12',
        'transition-colors duration-250',
      ].join(' ')}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-3 bottom-6 w-20 h-20 sm:w-24 sm:h-24 text-neutral-400 opacity-20 dark:opacity-10 hidden sm:block"
      >
        <div className="w-full h-full rounded-full bg-dot-grid" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-3 bottom-8 w-20 h-20 sm:w-24 sm:h-24 text-neutral-400 opacity-20 dark:opacity-10 hidden sm:block"
      >
        <div className="w-full h-full rounded-full bg-dot-grid" />
      </div>

      <Container size="2xl" className="relative z-10">
        <h2 id="office-locations-heading" className="sr-only">
          Office locations
        </h2>

        {showOffices && (
          <MotionStagger
            as="ul"
            stagger={0.08}
            className={[
              'grid list-none p-0 m-0 items-stretch',
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
              'gap-5 sm:gap-6 lg:gap-8',
              'contact-cards-pull',
              'max-w-5xl xl:max-w-6xl mx-auto',
            ].join(' ')}
          >
            {enabledOffices.map((office, index) => {
              const isOddLastOnTablet =
                officeCount % 2 === 1 &&
                index === officeCount - 1 &&
                officeCount > 1;

              return (
                <MotionItem
                  key={office.id}
                  as="li"
                  className={[
                    'h-full min-w-0 flex',
                    isOddLastOnTablet
                      ? 'md:col-span-2 md:max-w-sm md:justify-self-center lg:col-span-1 lg:max-w-none lg:justify-self-stretch'
                      : '',
                  ].join(' ')}
                >
                  <div className="w-full">
                    <OfficeCard office={office} />
                  </div>
                </MotionItem>
              );
            })}
          </MotionStagger>
        )}

        {showHelpStrip && (
          <MotionItem
            standalone
            className={showOffices ? 'mt-8 sm:mt-10 md:mt-12' : 'pt-8'}
          >
            <ContactHelpStrip helpStrip={helpStrip} whatsappUrl={whatsappUrl} />
          </MotionItem>
        )}
      </Container>
    </section>
  );
}

export default OfficeCardsSection;
