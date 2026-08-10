import { Helmet } from 'react-helmet-async';
import { company, seo as seoConfig } from '../../config/site';

/**
 * SEO Component — Handles meta tags and optional JSON-LD via react-helmet-async.
 *
 * Defaults come from src/config/site.js (single source of truth for siteUrl / ogImage).
 * Production canonical host: https://www.labelally.in (apex redirects to www).
 *
 * @param {string}  [title]       Full document title when provided (not auto-suffixed).
 * @param {string}  [description] Meta description
 * @param {string}  [canonical]   Path ("/about") or absolute URL
 * @param {string}  [image]       Absolute or site-relative OG image
 * @param {string}  [type]        og:type (default "website")
 * @param {boolean} [noindex]     Emit noindex,nofollow when true
 * @param {string}  [ogTitle]     Override og:title / twitter:title
 * @param {string}  [ogDescription] Override og/twitter description
 * @param {object|object[]} [jsonLd] Schema.org JSON-LD object(s)
 */
function SEO({
  title,
  description,
  canonical,
  image,
  type = 'website',
  noindex = false,
  ogTitle,
  ogDescription,
  jsonLd,
}) {
  const defaultTitle = seoConfig.defaultTitle;
  const defaultDescription = seoConfig.defaultDescription;
  const defaultUrl = seoConfig.siteUrl.replace(/\/$/, '');
  const defaultImage = `${defaultUrl}${seoConfig.ogImage.startsWith('/') ? seoConfig.ogImage : `/${seoConfig.ogImage}`}`;

  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageUrl = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${defaultUrl}${canonical === '/' ? '/' : canonical.startsWith('/') ? canonical : `/${canonical}`}`
    : `${defaultUrl}/`;

  const resolvedImage = image
    ? image.startsWith('http')
      ? image
      : `${defaultUrl}${image.startsWith('/') ? image : `/${image}`}`
    : defaultImage;

  const socialTitle = ogTitle || pageTitle;
  const socialDescription = ogDescription || pageDescription;
  const robotsMeta = noindex ? 'noindex, nofollow' : 'index, follow';

  const schemas = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd.filter(Boolean)
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={pageUrl} />
      <meta name="robots" content={robotsMeta} />

      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={socialDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={seoConfig.ogSiteName || company.name} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={company.brandName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={socialDescription} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content={company.brandName} />

      {schemas.map((schema, index) => (
        <script key={schema['@id'] || `jsonld-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export default SEO;
