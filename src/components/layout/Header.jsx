import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Button from '../common/Button';
import MobileMenu from './MobileMenu';
import navData from '../../data/navigation.json';

/**
 * Header — Sticky site header with full navigation.
 *
 * Features:
 * - Sticky top positioning with correct z-index
 * - Scroll-aware background (glassmorphism on scroll)
 * - Logo with two-tone text from navigation.json
 * - Desktop navigation with active route styling
 * - Header CTA button
 * - Mobile menu trigger (hamburger)
 * - MobileMenu component managed here
 * - Auto-close mobile menu on route change
 * - Accessible: <header>, <nav>, aria-label, aria-expanded, aria-controls
 *
 * Content source: src/data/navigation.json
 */
function Header() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const location                       = useLocation();

  // ── Close menu on route change ────────────────────────────────
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // ── Scroll detection for background treatment ─────────────────
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 12);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const openMenu  = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════ */}
      <header
        role="banner"
        className={[
          'fixed top-0 left-0 right-0',
          'z-[200]',
          'w-full',
          'transition-all duration-400',
          scrolled
            ? 'glass-strong border-b border-neutral-800 shadow-lg'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-[var(--header-height)]">

            {/* ── Logo ── */}
            <Link
              to="/"
              aria-label={navData.logo.ariaLabel}
              className="flex items-center gap-1 focus-ring rounded-md shrink-0"
            >
              <span className="font-heading text-xl font-bold text-neutral-50 tracking-tight">
                {navData.logo.text}
              </span>
              <span className="font-heading text-xl font-bold text-accent-400 tracking-tight">
                {navData.logo.textHighlight}
              </span>
            </Link>

            {/* ── Desktop Navigation ── */}
            <nav
              aria-label="Main navigation"
              className="hidden md:flex items-center"
            >
              <ul role="list" className="flex items-center gap-1">
                {navData.links.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.href}
                      end={item.href === '/'}
                      className={({ isActive }) =>
                        [
                          'relative px-4 py-2',
                          'rounded-lg',
                          'text-sm font-medium',
                          'transition-all duration-250',
                          'focus-ring',
                          isActive
                            ? 'text-accent-400'
                            : 'text-neutral-400 hover:text-neutral-50 hover:bg-neutral-800/60',
                        ].join(' ')
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          {/* Active indicator dot */}
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-400"
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Right Side: CTA + Mobile trigger ── */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <Button
                as={Link}
                to={navData.cta.href}
                aria-label={navData.cta.ariaLabel}
                variant="primary"
                size="sm"
                className="hidden md:inline-flex"
              >
                {navData.cta.label}
              </Button>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={openMenu}
                aria-label={navData.mobile.openLabel}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className={[
                  'md:hidden',
                  'flex items-center justify-center',
                  'w-10 h-10 rounded-lg',
                  'text-neutral-400 hover:text-neutral-50',
                  'hover:bg-neutral-800',
                  'transition-colors duration-250',
                  'focus-ring',
                ].join(' ')}
              >
                <Menu size={20} aria-hidden="true" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Spacer to prevent content from hiding under fixed header ── */}
      <div className="h-[var(--header-height)]" aria-hidden="true" />

      {/* ── Mobile Menu ── */}
      <MobileMenu isOpen={menuOpen} onClose={closeMenu} />
    </>
  );
}

export default Header;
