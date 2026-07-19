import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * ScrollToTopButton — Reusable floating circular scroll-to-top button.
 *
 * Appears only after the user has scrolled down a certain threshold (e.g. 300px).
 * Styled with a premium brand pink background and smooth bounce/hover effects.
 */
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top of the page"
      className={[
        'fixed z-[210]',
        'bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))]',
        'sm:bottom-8 sm:right-8',
        'flex items-center justify-center',
        'w-12 h-12 rounded-full',
        'bg-pink-600 hover:bg-pink-700 active:bg-pink-800',
        'text-white',
        'shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30',
        'transition-all duration-300 ease-out hover:scale-110 active:scale-95',
        'focus-ring outline-none border-none',
        'animate-fade-in',
      ].join(' ')}
    >
      <ArrowUp size={20} aria-hidden="true" strokeWidth={2.5} />
    </button>
  );
}

export default ScrollToTopButton;
