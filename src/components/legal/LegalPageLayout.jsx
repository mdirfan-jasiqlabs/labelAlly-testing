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
    <article className="section-spacing bg-white dark:bg-theme-page text-neutral-600 dark:text-theme-body">
      <Container>
        <div className="mx-auto w-full max-w-3xl min-w-0">
          <header className="border-b border-neutral-200/80 dark:border-theme-border pb-8 mb-10">
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-theme-heading mb-3 tracking-tight leading-tight">
              {title}
            </h1>
            {lastUpdated ? (
              <p className="text-xs text-neutral-400 dark:text-theme-muted font-medium">
                Last Updated: {lastUpdated}
              </p>
            ) : null}
          </header>

          <div className="flex flex-col gap-8">
            {introduction ? (
              <p className="text-base sm:text-lg text-neutral-500 dark:text-theme-body leading-relaxed font-medium">
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
