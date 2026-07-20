import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Phone, ArrowRight } from 'lucide-react';
import MobileMenu from './MobileMenu';
import BrandLogo from '../common/BrandLogo';
import navData from '../../data/navigation.json';
import ThemeToggle from '../ui/ThemeToggle';

/**
 * Header — Premium sticky site header.
 *
 * Design: Stripe / Linear inspired.
 * Layout: Logo (left) | Nav (center) | Phone + CTA (right)
 *
 * Features:
 * - Transparent on top, white + shadow when scrolled
 * - Elegant animated underline active indicator
 * - Reduced height on scroll
 * - Phone pill CTA + primary Get in Touch button
 * - Fully accessible (ARIA, keyboard, focus rings)
 */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  /* Close mobile menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* Scroll detection */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 16);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const openMenu  = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ─── HEADER ─── */}
      <header
        role="banner"
        className={[
          'fixed top-0 left-0 right-0 z-[200] w-full',
          'transition-all duration-300 ease-out',
          scrolled
            ? 'bg-theme-header backdrop-blur-md border-b border-theme-border shadow-theme'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <div className="section-container">
          <div
            className={[
              'flex items-center justify-between',
              'transition-all duration-300',
              scrolled ? 'h-18' : 'h-24',
            ].join(' ')}
          >

            {/* ── Logo ─────────────────────────────────────────── */}
            <Link
              to="/"
              aria-label={navData.logo.ariaLabel}
              className="flex items-center shrink-0 focus-ring rounded-md group"
            >
              <BrandLogo
                loading="eager"
                className={[
                  'object-contain transition-all duration-300',
                  scrolled
                    ? 'h-10 w-[60px] md:h-11 md:w-[66px] lg:h-12 lg:w-[72px]'
                    : 'h-12 w-[72px] md:h-14 md:w-[84px] lg:h-16 lg:w-24',
                ].join(' ')}
              />
            </Link>

            {/* ── Desktop Navigation (center) ──────────────────── */}
            <nav
              aria-label="Main navigation"
              className="hidden xl:flex xl:flex-1 items-center justify-center min-w-0"
            >
              <ul role="list" className="flex items-center gap-1 2xl:gap-2">
                {navData.links.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.href}
                      end={item.href === '/'}
                      className={({ isActive }) =>
                        [
                          'relative flex flex-col items-center',
                          'px-3 2xl:px-4 py-2',
                          'text-[0.8125rem] font-medium',
                          'whitespace-nowrap',
                          'rounded-lg',
                          'transition-all duration-200',
                          'focus-ring',
                          'group',
                          isActive
                            ? 'text-theme-heading'
                            : 'text-theme-muted hover:text-theme-heading hover:bg-theme-hover',
                        ].join(' ')
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}

                          {/* Active: gold underline bar */}
                          <span
                            aria-hidden="true"
                            className={[
                              'absolute bottom-0 left-1/2 -translate-x-1/2',
                              'h-[2px] rounded-full bg-theme-accentDecorative',
                              'transition-all duration-300 ease-out',
                              isActive ? 'w-4/5 opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-40',
                            ].join(' ')}
                          />
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Right Side: Phone + CTA ───────────────────────── */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 xl:gap-3 2xl:gap-4 shrink-0">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Phone Pill — Desktop only (avoid tablet crowding) */}
              <a
                href={navData.phone.href}
                aria-label={navData.phone.ariaLabel}
                className={[
                  'hidden xl:inline-flex items-center gap-2',
                  'h-11 px-4',
                  'rounded-full',
                  'border border-theme-border hover:border-strong',
                  'text-xs font-semibold text-theme-body hover:text-theme-heading',
                  'bg-theme-card hover:bg-theme-hover',
                  'transition-all duration-200',
                  'focus-ring',
                  'whitespace-nowrap',
                  'shadow-sm',
                ].join(' ')}
              >
                <Phone size={12} aria-hidden="true" strokeWidth={2.5} />
                {navData.phone.label}
              </a>

              {/* Primary CTA — Desktop */}
              <Link
                to={navData.cta.href}
                aria-label={navData.cta.ariaLabel}
                className={[
                  'hidden xl:inline-flex items-center gap-2',
                  'h-11 px-5',
                  'rounded-lg',
                  'bg-theme-action-primary hover:bg-theme-action-primaryHover active:bg-theme-action-primaryActive',
                  'text-xs font-semibold text-theme-action-primaryForeground',
                  'border border-theme-action-primaryBorder hover:border-theme-action-primaryBorderHover',
                  'transition-all duration-200',
                  'hover:shadow-sm',
                  'active:scale-[0.98]',
                  'focus-ring',
                  'whitespace-nowrap',
                ].join(' ')}
              >
                {navData.cta.label}
                <ArrowRight size={13} aria-hidden="true" strokeWidth={2.5} />
              </Link>

              {/* Mobile / Tablet / Laptop: Phone icon button */}
              <a
                href={navData.phone.href}
                aria-label={navData.phone.ariaLabel}
                className={[
                  'xl:hidden',
                  'flex items-center justify-center',
                  'w-11 h-11 rounded-full',
                  'border border-theme-border hover:border-strong',
                  'bg-theme-card text-theme-body',
                  'hover:text-theme-heading hover:bg-theme-hover',
                  'transition-all duration-200',
                  'focus-ring',
                ].join(' ')}
              >
                <Phone size={15} aria-hidden="true" strokeWidth={2.5} />
              </a>

              {/* Hamburger — Mobile / Tablet */}
              <button
                type="button"
                onClick={openMenu}
                aria-label={navData.mobile.openLabel}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className={[
                  'xl:hidden',
                  'flex items-center justify-center',
                  'w-11 h-11 rounded-lg',
                  'text-theme-muted hover:text-theme-heading',
                  'hover:bg-theme-hover',
                  'border border-transparent hover:border-theme-border',
                  'transition-all duration-200',
                  'focus-ring',
                ].join(' ')}
              >
                <Menu size={18} aria-hidden="true" strokeWidth={2} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Spacer — matches unscrolled header height (h-24) */}
      <div className="h-24" aria-hidden="true" />

      {/* Mobile / Tablet Menu */}
      <MobileMenu isOpen={menuOpen} onClose={closeMenu} />
    </>
  );
}

export default Header;
