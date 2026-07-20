import LegalPageLayout from '../components/legal/LegalPageLayout';
import termsData from '../data/terms.json';
import SEO             from '../components/common/SEO';

/**
 * TermsPage — Route: /terms-and-conditions
 * Sourced dynamically from terms.json.
 */
function TermsPage() {
  return (
    <>
      <SEO
        title="Terms and Conditions | LabelAlly Entertainment"
        description="Review the terms and conditions governing the use of the LabelAlly Entertainment website and its services."
        canonical="https://label-ally-testing.vercel.app/terms-and-conditions"
      />
      <LegalPageLayout
        title={termsData.title}
        lastUpdated={termsData.lastUpdated}
        introduction={termsData.introduction}
      >
        {termsData.sections.map((sec) => (
          <section key={sec.id} aria-labelledby={`sec-${sec.id}`} className="flex flex-col gap-3">
            <h2
              id={`sec-${sec.id}`}
              className="font-heading font-bold text-xl sm:text-2xl text-ink-primary tracking-tight"
            >
              {sec.heading}
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
              {sec.content}
            </p>
          </section>
        ))}
      </LegalPageLayout>
    </>
  );
}

export default TermsPage;
