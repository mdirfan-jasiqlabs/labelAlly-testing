import { Link } from 'react-router-dom';

/**
 * NotFoundPage — Route: * (wildcard / 404)
 *
 * Rendered for any route that does not match the defined routes.
 * Phase 1: Minimal but functional 404 page.
 */
function NotFoundPage() {
  return (
    <section
      className="section-spacing section-container flex flex-col items-center justify-center text-center min-h-[60vh]"
      aria-labelledby="not-found-heading"
    >
      {/* ── Error Code ── */}
      <p className="text-8xl font-black font-heading text-primary-900 select-none" aria-hidden="true">
        404
      </p>

      {/* ── Heading ── */}
      <h1 id="not-found-heading" className="mt-4 text-3xl font-bold font-heading text-neutral-50">
        Page Not Found
      </h1>

      {/* ── Description ── */}
      <p className="mt-4 max-w-md text-neutral-400">
        The page you are looking for does not exist or has been moved.
      </p>

      {/* ── Back to Home ── */}
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium text-sm transition-colors duration-250 focus-ring"
      >
        &larr; Back to Home
      </Link>
    </section>
  );
}

export default NotFoundPage;
