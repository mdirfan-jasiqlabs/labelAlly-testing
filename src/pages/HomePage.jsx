import HeroSection from '../components/sections/home/HeroSection';

/**
 * HomePage — Route: /
 *
 * Phase 4 Part 1: Renders HeroSection only.
 * Additional sections will be added in Parts 2 and 3.
 */
function HomePage() {
  return (
    <main aria-label="LabelAlly Entertainment homepage">
      {/* ── Hero ── Phase 4 Part 1 */}
      <HeroSection />

      {/* ── Platform Strip     — Phase 4 Part 2 */}
      {/* ── About              — Phase 4 Part 2 */}
      {/* ── Services           — Phase 4 Part 2 */}
      {/* ── How It Works       — Phase 4 Part 3 */}
    </main>
  );
}

export default HomePage;
