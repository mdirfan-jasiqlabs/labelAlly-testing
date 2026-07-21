import Container from '../common/Container';
import { MotionItem, MotionSection } from '../motion';

/**
 * LegalPageLayout — Shared presentation wrapper for legal/policy content.
 *
 * Motion is intentionally minimal: header + content container only.
 * Individual headings/paragraphs are not animated so legal copy stays readable.
 *
 * Props:
 * @param {string}     title
 * @param {string}     [lastUpdated]
 * @param {string}     [introduction]
 * @param {ReactNode}  children
 */
function LegalPageLayout({ title, lastUpdated, introduction, children }) {
  return (
    <article className="section-spacing bg-surface-page text-ink-secondary">
      <Container>
        <div className="mx-auto w-full max-w-3xl min-w-0">
          <MotionItem standalone as="header" className="border-b border-theme-border/80 pb-8 mb-10">
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-ink-primary mb-3 tracking-tight leading-tight">
              {title}
            </h1>
            {lastUpdated ? (
              <p className="text-xs text-ink-muted font-medium">
                Last Updated: {lastUpdated}
              </p>
            ) : null}
          </MotionItem>

          <MotionSection className="flex flex-col gap-8">
            {introduction ? (
              <p className="text-base sm:text-lg text-ink-secondary leading-relaxed font-medium">
                {introduction}
              </p>
            ) : null}

            <div className="flex flex-col gap-10 break-words">{children}</div>
          </MotionSection>
        </div>
      </Container>
    </article>
  );
}

export default LegalPageLayout;
