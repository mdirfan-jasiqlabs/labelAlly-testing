import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PageLoader from '../common/PageLoader';

/**
 * PageLayout — Shared layout wrapper for all pages.
 *
 * Structure:
 *   <div> (root)
 *     <Header />        — sticky top navigation
 *     <main>            — page content via <Outlet />
 *       <Outlet />
 *     </main>
 *     <Footer />        — persistent bottom section
 *   </div>
 *
 * Every route rendered inside this layout inherits the
 * consistent header and footer automatically.
 */
function PageLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      {/* ── Header ── */}
      <Header />

      {/* ── Main Content ── */}
      <main
        id="main-content"
        className="flex-1"
        role="main"
        tabIndex={-1}
      >
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}

export default PageLayout;
