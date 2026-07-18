import HeroSection         from '../components/sections/home/HeroSection';
import PlatformStrip       from '../components/sections/home/PlatformStrip';
import AboutSection        from '../components/sections/home/AboutSection';

/**
 * HomePage — Route: /
 *
 * Phase 4 Part 2: Renders Hero + Platform Strip + About.
 * Services and How It Works will be added in Part 3.
 */
function HomePage() {
  return (
    <main aria-label="LabelAlly Entertainment homepage">
      {/* ── Hero ── Phase 4 Part 1 */}
      <HeroSection />

      {/* ── Platform Strip ── Phase 4 Part 2 */}
      <PlatformStrip />

      {/* ── About ── Phase 4 Part 2 */}
      <AboutSection />

      {/* ── Services     — Phase 4 Part 3 */}
      {/* ── How It Works — Phase 4 Part 3 */}
    </main>
  );
}

export default HomePage;
