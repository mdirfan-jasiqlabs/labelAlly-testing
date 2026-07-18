import Container from '../../common/Container';
import homeData from '../../../data/home.json';

/**
 * PlatformStrip — Distribution platform names band.
 *
 * Displays the streaming/digital platforms that LabelAlly distributes to.
 * Text labels only — no invented logos or fake partnership claims.
 * All content from src/data/home.json.
 *
 * Layout:
 * - Centered heading
 * - Responsive wrapping grid of platform name pills
 * - Subtle separator styling top and bottom
 */
function PlatformStrip() {
  const { platformStrip } = homeData;

  if (!platformStrip?.items?.length) return null;

  return (
    <section
      aria-label={platformStrip.heading}
      className="w-full border-y border-neutral-800 bg-neutral-900/50"
    >
      <Container className="py-12 md:py-16">

        {/* ── Heading ── */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">
            {platformStrip.heading}
          </p>
          {platformStrip.subheading && (
            <p className="text-sm text-neutral-600">
              {platformStrip.subheading}
            </p>
          )}
        </div>

        {/* ── Platform Items ── */}
        <ul
          role="list"
          aria-label="Distribution platforms"
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {platformStrip.items.map((platform) => (
            <li key={platform.id}>
              <span
                className={[
                  'inline-flex items-center',
                  'px-5 py-2.5',
                  'rounded-full',
                  'bg-neutral-800/70 border border-neutral-700/60',
                  'text-sm font-medium text-neutral-300',
                  'whitespace-nowrap',
                  'select-none',
                ].join(' ')}
              >
                {platform.label}
              </span>
            </li>
          ))}
        </ul>

      </Container>
    </section>
  );
}

export default PlatformStrip;
