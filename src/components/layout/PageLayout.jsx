import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PageLoader from '../common/PageLoader';
import ScrollToTopButton from '../common/ScrollToTopButton';

/**
 * PageLayout — Shared layout wrapper for all pages.
 */
function PageLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-theme-page">
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

      {/* ── Scroll To Top Button ── */}
      <ScrollToTopButton />
    </div>
  );
}

export default PageLayout;
