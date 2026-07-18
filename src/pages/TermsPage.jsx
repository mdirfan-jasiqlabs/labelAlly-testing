import LegalPageLayout from '../components/legal/LegalPageLayout';
import termsData from '../data/terms.json';

/**
 * TermsPage — Route: /terms-and-conditions
 * Sourced dynamically from terms.json.
 */
function TermsPage() {
  return (
    <LegalPageLayout
      title={termsData.title}
      lastUpdated={termsData.lastUpdated}
      introduction={termsData.introduction}
    >
      {termsData.sections.map((sec) => (
        <section key={sec.id} aria-labelledby={`sec-${sec.id}`} className="flex flex-col gap-3">
          <h2
            id={`sec-${sec.id}`}
            className="font-heading font-bold text-xl sm:text-2xl text-neutral-100 tracking-tight"
          >
            {sec.heading}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            {sec.content}
          </p>
        </section>
      ))}
    </LegalPageLayout>
  );
}

export default TermsPage;
