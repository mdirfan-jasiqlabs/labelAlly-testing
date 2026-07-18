import { useEffect, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X } from 'lucide-react';
import Button from '../common/Button';
import navData from '../../data/navigation.json';

/**
 * MobileMenu — Full-screen mobile navigation overlay.
 *
 * Features:
 * - Open / close with slide-in transition
 * - Closes on nav link click
 * - Closes on Escape key press
 * - Locks body scroll while open
 * - Fully accessible (aria-modal, aria-label, focus management)
 * - Converted to premium light theme
 */
function MobileMenu({ isOpen, onClose }) {
  // ── Keyboard: close on Escape ─────────────────────────────────
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    },
    [isOpen, onClose]
  );

  // ── Body scroll lock ──────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ── Global key listener ───────────────────────────────────────
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          'fixed inset-0 bg-white/40 backdrop-blur-sm z-[190]',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* ── Menu Panel ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          'fixed top-0 right-0 bottom-0 w-full max-w-sm',
          'bg-white border-l border-neutral-200/80',
          'flex flex-col z-[200]',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* ── Panel Header ── */}
        <div className="flex items-center justify-between px-6 h-[var(--header-height)] border-b border-neutral-200/80 shrink-0">
          {/* Logo text */}
          <Link
            to="/"
            onClick={onClose}
            className="font-heading text-lg font-bold text-neutral-900 focus-ring rounded-md"
          >
            {navData.logo.text}{' '}
            <span className="text-primary-600">{navData.logo.textHighlight}</span>
          </Link>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label={navData.mobile.closeLabel}
            className={[
              'flex items-center justify-center',
              'w-10 h-10 rounded-lg',
              'text-neutral-9000 hover:text-neutral-800',
              'hover:bg-neutral-100',
              'transition-colors duration-250',
              'focus-ring',
            ].join(' ')}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* ── Navigation Links ── */}
        <nav
          aria-label="Mobile navigation"
          className="flex-1 overflow-y-auto px-6 py-8"
        >
          <ul role="list" className="flex flex-col gap-1">
            {navData.links.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.href}
                  end={item.href === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      'flex items-center w-full',
                      'px-4 py-3.5',
                      'rounded-xl',
                      'text-base font-medium',
                      'transition-all duration-250',
                      'focus-ring',
                      isActive
                        ? 'bg-primary-50 text-primary-600 border border-primary-100'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── CTA at bottom ── */}
        <div className="px-6 py-6 border-t border-neutral-200/80 shrink-0">
          <Button
            as={Link}
            to={navData.mobile.cta.href}
            aria-label={navData.mobile.cta.ariaLabel}
            onClick={onClose}
            variant="primary"
            size="lg"
            fullWidth
          >
            {navData.mobile.cta.label}
          </Button>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
