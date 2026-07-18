import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import PageLayout from '../components/layout/PageLayout';

const HomePage                  = lazy(() => import('../pages/HomePage'));
const AboutPage                 = lazy(() => import('../pages/AboutPage'));
const ServicesPage              = lazy(() => import('../pages/ServicesPage'));
const ArtistsLabelsPartnersPage = lazy(() => import('../pages/ArtistsLabelsPartnersPage'));
const ContactPage               = lazy(() => import('../pages/ContactPage'));
const PrivacyPolicyPage         = lazy(() => import('../pages/PrivacyPolicyPage'));
const TermsPage                 = lazy(() => import('../pages/TermsPage'));
const NotFoundPage              = lazy(() => import('../pages/NotFoundPage'));

/**
 * Application Router
 *
 * All routes are nested under PageLayout, which provides the
 * shared Header and Footer. The wildcard (*) route renders
 * the 404 NotFoundPage for any unrecognized path.
 *
 * Routes:
 *   /                         → HomePage
 *   /about                    → AboutPage
 *   /services                 → ServicesPage
 *   /artists-labels-partners  → ArtistsLabelsPartnersPage
 *   /contact                  → ContactPage
 *   /privacy-policy           → PrivacyPolicyPage
 *   /terms-and-conditions     → TermsPage
 *   *                         → NotFoundPage (404)
 */
const router = createBrowserRouter([
  {
    path:    '/',
    element: <PageLayout />,
    children: [
      {
        index:   true,
        element: <HomePage />,
      },
      {
        path:    'about',
        element: <AboutPage />,
      },
      {
        path:    'services',
        element: <ServicesPage />,
      },
      {
        path:    'artists-labels-partners',
        element: <ArtistsLabelsPartnersPage />,
      },
      {
        path:    'contact',
        element: <ContactPage />,
      },
      {
        path:    'privacy-policy',
        element: <PrivacyPolicyPage />,
      },
      {
        path:    'terms-and-conditions',
        element: <TermsPage />,
      },
      {
        path:    '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
