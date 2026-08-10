/**
 * Schema.org JSON-LD builders for LabelAlly Entertainment.
 * Only includes verified social profiles from site config.
 */
import { company, seo, socialSameAs } from './site';

const siteUrl = seo.siteUrl.replace(/\/$/, '');

export const ORGANIZATION_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;

export function buildOrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: company.legalName,
    alternateName: [company.name, company.brandName],
    url: `${siteUrl}/`,
    logo: `${siteUrl}${seo.logoPath}`,
  };

  if (socialSameAs.length > 0) {
    schema.sameAs = socialSameAs;
  }

  return schema;
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${siteUrl}/`,
    name: company.name,
    alternateName: company.brandName,
    publisher: {
      '@id': ORGANIZATION_ID,
    },
  };
}

/** Homepage graph: Organization + WebSite (linked via publisher). */
export function buildHomepageStructuredData() {
  return [buildOrganizationSchema(), buildWebsiteSchema()];
}
