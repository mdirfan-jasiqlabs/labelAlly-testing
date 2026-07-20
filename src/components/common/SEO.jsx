import { Helmet } from 'react-helmet-async';

/**
 * SEO Component — Handles all meta tags dynamically via react-helmet-async.
 *
 * Defaults:
 * - Brand: LabelAlly Entertainment
 * - URL: https://label-ally-testing.vercel.app (established project domain)
 * - Image: /default-og.png (1200×630 brand social preview)
 */
function SEO({
  title,
  description,
  canonical,
  image,
  type = 'website',
  noindex = false,
}) {
  const defaultTitle = 'LabelAlly Entertainment | Music Distribution & Rights Management';
  const defaultDescription =
    'LabelAlly Entertainment provides music distribution, YouTube channel management, content rights management, YouTube CMS, Content ID, OTT distribution, and revenue optimization services.';
  const defaultUrl = 'https://label-ally-testing.vercel.app';
  const defaultImage = `${defaultUrl}/default-og.png`;
  
  const pageTitle = title ? `${title} | LabelAlly Entertainment` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageUrl = canonical ? canonical : defaultUrl;
  
  // Set robots metadata instructions
  const robotsMeta = noindex ? 'noindex, nofollow' : 'index, follow';

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{title ? pageTitle : defaultTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={pageUrl} />
      <meta name="robots" content={robotsMeta} />

      {/* Open Graph Metadata */}
      <meta property="og:title" content={title ? pageTitle : defaultTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="LabelAlly Entertainment" />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="LabelAlly Entertainment" />

      {/* Twitter Cards Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? pageTitle : defaultTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      <meta name="twitter:image:alt" content="LabelAlly Entertainment" />
    </Helmet>
  );
}

export default SEO;
