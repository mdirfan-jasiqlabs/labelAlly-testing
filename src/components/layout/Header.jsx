import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Phone, ArrowRight } from 'lucide-react';
import MobileMenu from './MobileMenu';
import navData from '../../data/navigation.json';

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
      {/* ═══════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════ */}
      <header
        role="banner"
        className={[
          'fixed top-0 left-0 right-0 z-[200] w-full',
          'transition-all duration-300 ease-out',
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200/70 shadow-[0_1px_20px_rgba(15,23,42,0.08)]'
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
              <img
                src="/logo.jpeg"
                alt="LabelAlly Entertainment Logo"
                width={1536}
                height={1024}
                loading="eager"
                decoding="async"
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
              className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2"
            >
              <ul role="list" className="flex items-center gap-0.5">
                {navData.links.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.href}
                      end={item.href === '/'}
                      className={({ isActive }) =>
                        [
                          'relative flex flex-col items-center',
                          'px-4 py-2',
                          'text-[0.8125rem] font-medium',
                          'rounded-lg',
                          'transition-all duration-200',
                          'focus-ring',
                          'group',
                          isActive
                            ? 'text-neutral-900'
                            : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50',
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
                              'h-[2px] rounded-full bg-accent-500',
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
            <div className="flex items-center gap-2.5">

              {/* Phone Pill — Desktop only */}
              <a
                href={navData.phone.href}
                aria-label={navData.phone.ariaLabel}
                className={[
                  'hidden md:inline-flex items-center gap-2',
                  'h-9 px-4',
                  'rounded-full',
                  'border border-neutral-200 hover:border-primary-300',
                  'text-xs font-semibold text-neutral-700 hover:text-primary-600',
                  'bg-white hover:bg-primary-50',
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
                  'hidden md:inline-flex items-center gap-2',
                  'h-9 px-5',
                  'rounded-lg',
                  'bg-primary-600 hover:bg-primary-700',
                  'text-xs font-semibold text-white',
                  'border border-primary-600 hover:border-primary-700',
                  'transition-all duration-200',
                  'hover:shadow-[0_4px_14px_rgba(79,70,229,0.35)]',
                  'active:scale-[0.98]',
                  'focus-ring',
                  'whitespace-nowrap',
                ].join(' ')}
              >
                {navData.cta.label}
                <ArrowRight size={13} aria-hidden="true" strokeWidth={2.5} />
              </Link>

              {/* Mobile: Phone icon button */}
              <a
                href={navData.phone.href}
                aria-label={navData.phone.ariaLabel}
                className={[
                  'md:hidden',
                  'flex items-center justify-center',
                  'w-9 h-9 rounded-full',
                  'border border-neutral-200',
                  'bg-white text-neutral-700',
                  'hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50',
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
                  'lg:hidden',
                  'flex items-center justify-center',
                  'w-9 h-9 rounded-lg',
                  'text-neutral-600 hover:text-neutral-900',
                  'hover:bg-neutral-100',
                  'border border-transparent hover:border-neutral-200',
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

      {/* Spacer — prevents content from hiding under fixed header */}
      <div className="h-24" aria-hidden="true" />

      {/* Mobile / Tablet Menu */}
      <MobileMenu isOpen={menuOpen} onClose={closeMenu} />
    </>
  );
}

export default Header;
