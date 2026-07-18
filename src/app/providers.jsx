import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import router from './router';

/**
 * Providers — Application-level context providers.
 *
 * All global providers are composed here so App.jsx stays clean.
 * Adding a new provider means editing only this file.
 *
 * Current providers:
 *   - HelmetProvider  (react-helmet-async) — manages <head> meta tags
 *   - RouterProvider  (react-router-dom)   — drives client-side routing
 *
 * Future providers (added in later phases):
 *   - ThemeProvider (if needed)
 *   - ToastProvider (if needed)
 */
function Providers() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default Providers;
