import { useEffect, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, Phone, ArrowRight, Home, Info, LayoutGrid, Mic2, Mail } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';
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
          'bg-theme-overlay backdrop-blur-[2px]',
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
          'bg-theme-section',
          'flex flex-col',
          'shadow-[-20px_0_60px_rgba(15,23,42,0.12)]',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >

        {/* ── Panel Header ──────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 h-[4.5rem] border-b border-theme-border shrink-0">
          {/* Logo */}
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center shrink-0 focus-ring rounded-md group"
            aria-label={navData.logo.ariaLabel}
          >
            <BrandLogo className="h-10 w-[60px] object-contain" />
          </Link>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label={navData.mobile.closeLabel}
            className={[
              'flex items-center justify-center',
              'w-11 h-11 rounded-lg',
              'text-theme-muted hover:text-theme-heading',
              'hover:bg-theme-hover',
              'border border-transparent hover:border-theme-border',
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
                          ? 'bg-theme-navActive text-theme-navActiveFg'
                          : 'text-theme-muted hover:text-theme-heading hover:bg-theme-hover',
                      ].join(' ')
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Gold left bar for active */}
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-theme-accentDecorative"
                          />
                        )}

                        <span
                          className={[
                            'flex items-center justify-center w-8 h-8 rounded-lg shrink-0',
                            isActive
                              ? 'bg-theme-navActiveIcon text-theme-navActiveIconFg'
                              : 'bg-theme-secondary text-theme-muted',
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
        <div className="px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] border-t border-theme-border shrink-0 flex flex-col gap-3">
          {/* Phone pill */}
          <a
            href={navData.phone.href}
            aria-label={navData.phone.ariaLabel}
            onClick={onClose}
            className={[
              'flex items-center justify-center gap-2',
              'w-full h-11',
              'rounded-xl',
              'border border-theme-border hover:border-strong',
              'bg-theme-card hover:bg-theme-hover',
              'text-sm font-semibold text-theme-body hover:text-theme-heading',
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
              'bg-theme-action-primary hover:bg-theme-action-primaryHover active:bg-theme-action-primaryActive',
              'text-sm font-bold text-theme-action-primaryForeground',
              'border border-theme-action-primaryBorder hover:border-theme-action-primaryBorderHover',
              'transition-all duration-200',
              'hover:shadow-sm',
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
