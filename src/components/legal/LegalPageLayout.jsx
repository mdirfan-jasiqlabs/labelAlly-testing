import Container from '../common/Container';

/**
 * LegalPageLayout — Shared presentation wrapper for legal/policy content.
 *
 * Requirements:
 * - Readable typography (leading-relaxed)
 * - Controlled text width (max-w-3xl)
 * - Semantic headings (h1, h2)
 * - Responsive padding and margins
 *
 * Props:
 * @param {string}     title        — Page title
 * @param {string}     [lastUpdated]— Optional date string
 * @param {string}     [introduction]— Introductory paragraph
 * @param {ReactNode}  children     — Nested legal content / paragraphs
 */
function LegalPageLayout({ title, lastUpdated, introduction, children }) {
  return (
    <article className="py-16 md:py-24 bg-neutral-950 text-neutral-300">
      <Container className="max-w-3xl">
        {/* Header */}
        <header className="border-b border-neutral-800 pb-8 mb-10">
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-neutral-50 mb-3 tracking-tight">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-xs text-neutral-500 font-medium">
              Last Updated: {lastUpdated}
            </p>
          )}
        </header>

        {/* Content */}
        <div className="flex flex-col gap-8">
          {introduction && (
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-medium">
              {introduction}
            </p>
          )}

          <div className="flex flex-col gap-10">
            {children}
          </div>
        </div>
      </Container>
    </article>
  );
}

export default LegalPageLayout;
