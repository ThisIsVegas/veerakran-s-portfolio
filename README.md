# Veerakran Sereerungruangkul Portfolio

Static professional portfolio built with Astro and TypeScript.

## Local development

```sh
npm install
npm run dev
```

## Verification

```sh
npm run build
npx playwright install chromium
npm run test:e2e
```

The end-to-end suite builds the production site and verifies its public behaviour in Chromium.

## Content and deployment

Professional facts and approved wording live in `docs/`. Update those sources before changing public career content.

The default build targets a root deployment. GitHub Pages supplies `SITE_URL` and `BASE_PATH` through the deployment workflow so internal links and assets work from the repository subpath. Cloudflare Pages can provide `SITE_URL` for its production domain and leave `BASE_PATH` unset.

Archivo and Public Sans are self-hosted under the SIL Open Font License. License texts are stored beside the font assets in `public/fonts/`.
