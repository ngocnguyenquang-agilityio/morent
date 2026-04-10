import type { Metadata } from 'next';

const SITE_NAME = 'Morent';

/**
 * Creates a consistent Metadata object for Next.js pages.
 *
 * The root layout already defines `title.template: '%s | Morent'`,
 * so the page `title` is used as-is while `openGraph.title` gets
 * the full brand suffix appended manually (OG titles don't inherit
 * the template).
 */
export const createMetadata = (
  title: string,
  description: string,
): Metadata => ({
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
  },
});
