import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// ── Global Styles (Tailwind + Design Tokens + Base) ──────────────
import './styles/globals.css';
import './styles/theme.css';

// ── Root Component ───────────────────────────────────────────────
import App from './app/App';

/**
 * Application entry point.
 *
 * React 18 createRoot API is used for concurrent mode support.
 * StrictMode is enabled for development warnings.
 * Global CSS is imported here once — never inside components.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
