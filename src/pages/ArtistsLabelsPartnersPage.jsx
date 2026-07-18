import ArtistsHero         from '../components/sections/artists/ArtistsHero';
import ArtistSupport       from '../components/sections/artists/ArtistSupport';
import ArtistCapabilities  from '../components/sections/artists/ArtistCapabilities';
import ArtistsCta          from '../components/sections/artists/ArtistsCta';

/**
 * ArtistsLabelsPartnersPage — Route: /artists-labels-partners
 *
 * Renders the full Artists & Labels page layout.
 * Content is sourced from src/data/artists.json.
 */
function ArtistsLabelsPartnersPage() {
  return (
    <main aria-label="Artists & Record Labels LabelAlly Entertainment">
      <ArtistsHero />
      <ArtistSupport />
      <ArtistCapabilities />
      <ArtistsCta />
    </main>
  );
}

export default ArtistsLabelsPartnersPage;
