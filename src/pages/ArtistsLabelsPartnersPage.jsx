import ArtistsHero         from '../components/sections/artists/ArtistsHero';
import WhoWeWorkWith       from '../components/sections/artists/WhoWeWorkWith/WhoWeWorkWith';
import WhatYouGet          from '../components/sections/artists/WhatYouGet/WhatYouGet';
import ArtistSupport       from '../components/sections/artists/ArtistSupport';
import ArtistCapabilities  from '../components/sections/artists/ArtistCapabilities';
import ArtistsCta          from '../components/sections/artists/ArtistsCta';
import SEO                 from '../components/common/SEO';

/**
 * ArtistsLabelsPartnersPage — Route: /artists-labels-partners
 *
 * Renders the full Artists & Labels page layout.
 * Content is sourced from src/data/artists.json and section data modules.
 */
function ArtistsLabelsPartnersPage() {
  return (
    <main aria-label="Artists & Record Labels LabelAlly Entertainment">
      <SEO
        title="Solutions for Artists & Record Labels | LabelAlly Entertainment"
        description="Discover how LabelAlly Entertainment helps independent artists, record labels, and content owners distribute music, protect rights, and maximize revenue."
        canonical="https://label-ally-testing.vercel.app/artists-labels-partners"
      />
      <ArtistsHero />
      <WhoWeWorkWith />
      <WhatYouGet />
      <ArtistSupport />
      <ArtistCapabilities />
      <ArtistsCta />
    </main>
  );
}

export default ArtistsLabelsPartnersPage;
