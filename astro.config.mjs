import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE_URL = process.env.SITE_URL ?? 'https://thisisvegas.github.io';
const BASE_PATH = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  integrations: [sitemap()],
  vite: {
    build: {
      // Avoid a duplicate Vite warning; scripts/check-client-bundles.mjs enforces scoped budgets.
      chunkSizeWarningLimit: 520,
    },
  },
});
