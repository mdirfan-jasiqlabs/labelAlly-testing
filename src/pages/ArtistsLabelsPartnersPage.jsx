import ArtistsHero         from '../components/sections/artists/ArtistsHero';
import WhoWeWorkWith       from '../components/sections/artists/WhoWeWorkWith/WhoWeWorkWith';
import WhatYouGet          from '../components/sections/artists/WhatYouGet/WhatYouGet';
import OnboardingProcess   from '../components/sections/artists/OnboardingProcess/OnboardingProcess';
import SEO                 from '../components/common/SEO';

/**
 * ArtistsLabelsPartnersPage — Route: /artists-labels-partners
 *
 * Section order: Hero → Who We Work With → What You Get → Onboarding Process + CTA
 */
function ArtistsLabelsPartnersPage() {
  return (
    <main aria-label="Artists & Record Labels LabelAlly Entertainment">
      <SEO
        title="Artists & Labels | LabelAlly Entertainment"
        description="Discover how LabelAlly helps independent artists, record labels, and content owners with YouTube channel management, rights protection, monetization, and music distribution management."
        canonical="/artists-labels-partners"
      />
      <ArtistsHero />
      <WhoWeWorkWith />
      <WhatYouGet />
      <OnboardingProcess />
    </main>
  );
}

export default ArtistsLabelsPartnersPage;
