/** @typedef {'light' | 'dark' | 'system'} ThemePreference */

const VALID_THEMES = new Set(['light', 'dark']);

/**
 * Read persisted theme preference.
 * Returns 'system' when unset, invalid, or storage is unavailable.
 * @returns {ThemePreference}
 */
export function readThemePreference() {
  if (typeof window === 'undefined') return 'system';

  try {
    const stored = localStorage.getItem('theme');
    if (VALID_THEMES.has(stored)) return stored;
  } catch {
    // Storage may be blocked in private mode or by policy.
  }

  return 'system';
}

/**
 * Resolve whether the active appearance should be dark.
 * @param {ThemePreference} theme
 * @param {boolean} systemPrefersDark
 */
export function resolveIsDark(theme, systemPrefersDark) {
  if (theme === 'dark') return true;
  if (theme === 'light') return false;
  return systemPrefersDark;
}

/**
 * Apply resolved appearance to the document root.
 * @param {boolean} isDark
 */
export function applyThemeToDocument(isDark) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  if (isDark) {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
  }
}

/**
 * Persist manual theme selection.
 * System mode clears storage so OS preference is followed.
 * @param {ThemePreference} theme
 */
export function persistThemePreference(theme) {
  if (typeof window === 'undefined') return;

  try {
    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
  } catch {
    // Ignore write failures — DOM state remains authoritative for the session.
  }
}

/**
 * Safe prefers-color-scheme probe for client environments.
 */
export function readSystemPrefersDark() {
  if (typeof window === 'undefined') return false;

  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}
