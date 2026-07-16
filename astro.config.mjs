import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: set to the real domain/GitHub Pages URL once the repo is initialized.
// GitHub Pages project sites also need `base: '/<repo-name>'`.
const SITE_URL = 'https://example.com';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
});
