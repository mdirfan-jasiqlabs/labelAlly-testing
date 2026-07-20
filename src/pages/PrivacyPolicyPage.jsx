import LegalPageLayout from '../components/legal/LegalPageLayout';
import privacyData from '../data/privacy.json';
import SEO             from '../components/common/SEO';

/**
 * PrivacyPolicyPage — Route: /privacy-policy
 * Sourced dynamically from privacy.json.
 */
function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy | LabelAlly Entertainment"
        description="Read the LabelAlly Entertainment Privacy Policy to understand how information submitted through our website is collected, used, and protected."
        canonical="https://label-ally-testing.vercel.app/privacy-policy"
      />
      <LegalPageLayout
        title={privacyData.title}
        lastUpdated={privacyData.lastUpdated}
        introduction={privacyData.introduction}
      >
        {privacyData.sections.map((sec) => (
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

export default PrivacyPolicyPage;
