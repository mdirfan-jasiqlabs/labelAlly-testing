import { useEffect, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, Phone, ArrowRight, Home, Info, LayoutGrid, Mic2, Mail } from 'lucide-react';
import navData from '../../data/navigation.json';

/**
 * MobileMenu — Premium full-screen side-drawer navigation.
 *
 * Design: Slide-in panel from right with backdrop.
 * Inspired by: Linear, Framer, Vercel mobile menus.
 *
 * Features:
 * - Smooth slide-in/out with opacity backdrop
 * - Large touch targets (min 52px)
 * - Active state with gold left-bar indicator
 * - Phone pill + primary CTA pinned at bottom
 * - Keyboard accessible (Escape closes)
 * - Body scroll locked while open
 */

/** Map each nav ID to a Lucide icon */
const NAV_ICONS = {
  'home':                   Home,
  'about':                  Info,
  'services':               LayoutGrid,
  'artists-labels-partners': Mic2,
  'contact':                Mail,
};

function MobileMenu({ isOpen, onClose }) {
  /* Escape key handler */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    },
    [isOpen, onClose]
  );

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Global key listener */
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* ── Backdrop ────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          'fixed inset-0 z-[190]',
          'bg-neutral-950/25 backdrop-blur-[2px]',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* ── Drawer Panel ────────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          'fixed top-0 right-0 bottom-0 z-[200]',
          'w-full max-w-[320px] sm:max-w-[360px]',
          'bg-white dark:bg-theme-section',
          'flex flex-col',
          'shadow-[−20px_0_60px_rgba(15,23,42,0.12)]',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >

        {/* ── Panel Header ──────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 h-[4.5rem] border-b border-neutral-100 dark:border-theme-border shrink-0">
          {/* Logo */}
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center shrink-0 focus-ring rounded-md group"
            aria-label={navData.logo.ariaLabel}
          >
            <img
              src="/logo.jpeg"
              alt="LabelAlly Entertainment Logo"
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              className="h-10 w-[60px] object-contain"
            />
          </Link>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label={navData.mobile.closeLabel}
            className={[
              'flex items-center justify-center',
              'w-9 h-9 rounded-lg',
              'text-neutral-500 hover:text-neutral-900 dark:text-theme-muted dark:hover:text-theme-heading',
              'hover:bg-neutral-100 dark:hover:bg-theme-hover',
              'border border-transparent hover:border-neutral-200 dark:hover:border-theme-border',
              'transition-all duration-200',
              'focus-ring',
            ].join(' ')}
          >
            <X size={18} aria-hidden="true" strokeWidth={2} />
          </button>
        </div>

        {/* ── Navigation Links ──────────────────────────────── */}
        <nav
          aria-label="Mobile navigation"
          className="flex-1 overflow-y-auto px-4 py-6"
        >
          <ul role="list" className="flex flex-col gap-1">
            {navData.links.map((item) => {
              const Icon = NAV_ICONS[item.id] ?? Home;
              return (
                <li key={item.id}>
                  <NavLink
                    to={item.href}
                    end={item.href === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      [
                        'relative flex items-center gap-3.5',
                        'px-4 py-3.5',
                        'rounded-xl',
                        'text-[0.9rem] font-medium',
                        'transition-all duration-200',
                        'focus-ring',
                        isActive
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 dark:text-theme-muted dark:hover:text-theme-heading dark:hover:bg-theme-hover',
                      ].join(' ')
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Gold left bar for active */}
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-accent-500"
                          />
                        )}

                        <span
                          className={[
                            'flex items-center justify-center w-8 h-8 rounded-lg shrink-0',
                            isActive
                              ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-300'
                              : 'bg-neutral-100 text-neutral-500 dark:bg-theme-hover dark:text-theme-muted',
                          ].join(' ')}
                        >
                          <Icon size={15} aria-hidden="true" strokeWidth={2} />
                        </span>

                        {item.label}
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Bottom CTA Area ───────────────────────────────── */}
        <div className="px-5 py-5 border-t border-neutral-100 dark:border-theme-border shrink-0 flex flex-col gap-3">
          {/* Phone pill */}
          <a
            href={navData.phone.href}
            aria-label={navData.phone.ariaLabel}
            onClick={onClose}
            className={[
              'flex items-center justify-center gap-2',
              'w-full h-11',
              'rounded-xl',
              'border border-neutral-200 hover:border-primary-300 dark:border-theme-border dark:hover:border-primary-400',
              'bg-white hover:bg-primary-50 dark:bg-theme-card dark:hover:bg-theme-hover',
              'text-sm font-semibold text-neutral-700 hover:text-primary-600 dark:text-theme-body dark:hover:text-primary-300',
              'transition-all duration-200',
              'focus-ring',
            ].join(' ')}
          >
            <Phone size={14} aria-hidden="true" strokeWidth={2.5} />
            {navData.phone.label}
          </a>

          {/* Primary CTA */}
          <Link
            to={navData.mobile.cta.href}
            aria-label={navData.mobile.cta.ariaLabel}
            onClick={onClose}
            className={[
              'flex items-center justify-center gap-2',
              'w-full h-12',
              'rounded-xl',
              'bg-primary-600 hover:bg-primary-700',
              'text-sm font-bold text-white',
              'border border-primary-600 hover:border-primary-700',
              'transition-all duration-200',
              'hover:shadow-[0_4px_14px_rgba(79,70,229,0.35)]',
              'focus-ring',
            ].join(' ')}
          >
            {navData.mobile.cta.label}
            <ArrowRight size={15} aria-hidden="true" strokeWidth={2.5} />
          </Link>
        </div>

      </div>
    </>
  );
}

export default MobileMenu;
