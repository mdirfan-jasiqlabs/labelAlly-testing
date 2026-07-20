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
    <article className="section-spacing bg-surface-page text-ink-secondary">
      <Container>
        <div className="mx-auto w-full max-w-3xl min-w-0">
          <header className="border-b border-theme-border/80 pb-8 mb-10">
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-ink-primary mb-3 tracking-tight leading-tight">
              {title}
            </h1>
            {lastUpdated ? (
              <p className="text-xs text-ink-muted font-medium">
                Last Updated: {lastUpdated}
              </p>
            ) : null}
          </header>

          <div className="flex flex-col gap-8">
            {introduction ? (
              <p className="text-base sm:text-lg text-ink-secondary leading-relaxed font-medium">
                {introduction}
              </p>
            ) : null}

            <div className="flex flex-col gap-10 break-words">{children}</div>
          </div>
        </div>
      </Container>
    </article>
  );
}

export default LegalPageLayout;
