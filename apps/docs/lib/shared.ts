import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Vinyl UI';

/** Where the docs (and the /r registry) are deployed. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vinyl-ui.pages.dev';
export const docsRoute = '/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const gitConfig = {
  user: 'supmanyu',
  repo: 'vinyl-ui',
  branch: 'main',
};

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}
