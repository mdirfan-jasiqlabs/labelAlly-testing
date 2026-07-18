import { Loader2 } from 'lucide-react';

/**
 * PageLoader — Premium, lightweight loading indicator.
 *
 * Sourced from performance optimization requirements.
 * Rendered by Suspense while route chunks are fetched.
 * Fully accessible and respects user motion preferences.
 */
function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="flex flex-col items-center justify-center min-h-[50vh] w-full bg-neutral-950 px-4"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Soft Brand Accent Glow / Spinner */}
        <div className="relative flex items-center justify-center">
          <div aria-hidden="true" className="absolute w-12 h-12 rounded-full bg-primary-500/10 blur-xl animate-pulse-slow" />
          <Loader2
            size={36}
            aria-hidden="true"
            className="text-primary-500 animate-spin motion-reduce:animate-none shrink-0"
          />
        </div>
        
        {/* Loading text */}
        <span className="text-sm font-medium font-heading text-neutral-400 tracking-wide select-none">
          Loading...
        </span>
        
        {/* Visually hidden screen reader status announcement */}
        <span className="sr-only">The page content is loading, please wait.</span>
      </div>
    </div>
  );
}

export default PageLoader;
