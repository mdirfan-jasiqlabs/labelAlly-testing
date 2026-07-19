import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { ThemeProvider } from '../context/ThemeContext';
import router from './router';

/**
 * Providers — Application-level context providers.
 *
 * All global providers are composed here so App.jsx stays clean.
 * Adding a new provider means editing only this file.
 *
 * Current providers:
 *   - HelmetProvider  (react-helmet-async) — manages <head> meta tags
 *   - ThemeProvider   (ThemeContext)        — drives app theme (light/dark/system)
 *   - RouterProvider  (react-router-dom)   — drives client-side routing
 */
function Providers() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default Providers;
