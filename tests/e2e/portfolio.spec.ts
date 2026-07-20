import { expect, test } from '@playwright/test';

test('visitor can navigate the professional portfolio', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Veerakran Sereerungruangkul', { exact: true })).toBeVisible();
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Veerakran Sereerungruangkul',
    }),
  ).toBeVisible();
  await expect(page.getByText('Backend Developer', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Platform & Systems Integration', { exact: true })).toBeVisible();
  await expect(page.getByText('Cloud & Live-Service Games', { exact: true })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link')).toHaveText([
    'Home',
    'Projects',
    'Resume',
  ]);
  await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');

  await page.getByRole('link', { name: 'Resume' }).click();
  await expect(page).toHaveURL(/\/resume\/?$/);
  await expect(page.getByRole('link', { name: 'Resume' })).toHaveAttribute('aria-current', 'page');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Veerakran Sereerungruangkul' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download PDF' })).toHaveAttribute('href', '/resume.pdf');
});

test('visitor can review selected projects', async ({ page }) => {
  await page.goto('/');

  const projectsLink = page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: 'Projects', exact: true });
  await expect(projectsLink).toHaveAttribute('href', '/projects/');
  await projectsLink.click();
  await expect(page).toHaveURL(/\/projects\/?$/);
  await expect(projectsLink).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('heading', { level: 1, name: 'Selected projects' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Tiny Little Platform' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'RentPilot' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'WeLearn Pro' })).toBeVisible();
  await expect(
    page.getByRole('heading', { level: 2, name: 'Government & Public Sector Solutions' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /Explore Tiny Little Platform/ })).toHaveAttribute(
    'href',
    '/projects/tiny-little-platform/',
  );
  await expect(page.locator('figure.project-visual')).toHaveCount(4);
  await expect(page.getByText('Concept image · Replace with approved project material.')).toHaveCount(4);
  await expect(page.getByText('Photon Realtime', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Electron', { exact: true })).toHaveCount(0);
});

test('project records support rich media and verified public destinations', async ({ page }) => {
  await page.goto('/projects/tiny-little-platform/');

  await expect(page.getByRole('heading', { level: 1, name: 'Tiny Little Platform' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(page.getByRole('link', { name: 'Visit Tiny Little' })).toHaveAttribute(
    'href',
    'https://tinylittle.io/',
  );
  await expect(page.getByRole('heading', { level: 2, name: 'Related products' })).toBeVisible();
  await expect(page.getByText('Tiny Little Royale', { exact: true })).toBeVisible();
  await expect(page.getByText('Tiny Little Deva', { exact: true })).toBeVisible();
  await expect(page.getByText('Devares', { exact: true })).toBeVisible();
  await expect(page.locator('.media-gallery figure')).toHaveCount(3);
  await expect(page.getByRole('link', { name: /Tiny Little Royale on Google Play/ })).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=com.hengtech.tinylittleroyale',
  );

  await page.goto('/projects/welearn-pro/');
  await expect(page.getByRole('link', { name: 'Visit WeLearn Pro' })).toHaveAttribute(
    'href',
    'https://welearnpro.com/',
  );

  await page.goto('/projects/rentpilot/');
  await expect(page.getByText('Product demo in preparation', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /demo/i })).toHaveCount(0);
});

test('retired contact route directs visitors to the footer', async ({ page }) => {
  await page.goto('/contact');
  await expect(page).toHaveURL(/\/#contact$/);
});

test('resume PDF is publicly available', async ({ request }) => {
  const response = await request.get('/resume.pdf');

  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('application/pdf');
});

test('visitor can choose and retain an explicit appearance', async ({ page }) => {
  await page.goto('/');

  const theme = page.getByLabel('Theme');
  await expect(theme).toHaveValue('system');
  await expect(theme.locator('option')).toHaveText(['System', 'Light', 'Dark']);

  await theme.selectOption('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(17, 23, 20)');

  await page.reload();
  await expect(theme).toHaveValue('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await theme.selectOption('light');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(245, 246, 243)');
});

test('system appearance follows the operating system preference', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');

  await expect(page.getByLabel('Theme')).toHaveValue('system');
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', /.+/);
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(17, 23, 20)');

  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(245, 246, 243)');
});

test('homepage moves from a brief introduction into the detailed career story', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 2, name: 'How I work' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Learn' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Integrate' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Deliver' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Two industries, similar problems' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Enterprise software' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Live-service games' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Selected work' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Practical software over clever software' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Technical capabilities' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Read the full résumé' })).toHaveAttribute('href', '/resume');
  await expect(page.locator('#contact')).toContainText('veerakran.s@gmail.com');
});

test('resume keeps detailed chronology and supporting capabilities', async ({ page }) => {
  await page.goto('/resume');

  await expect(page.getByRole('heading', { level: 2, name: 'Employment history' })).toBeVisible();
  await expect(page.getByText('Hengtech Co., Ltd.')).toBeVisible();
  await expect(page.getByText('Wewasanad Co., Ltd.')).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Education' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Technical capabilities' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Platform integration' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Languages' })).toBeVisible();
  await expect(page.getByText('Veerakran Sereerungruangkul', { exact: true })).toBeVisible();
});

test('printed resume removes website controls', async ({ page }) => {
  await page.goto('/resume');
  await page.emulateMedia({ media: 'print' });

  await expect(page.locator('body > header')).toBeHidden();
  await expect(page.locator('body > footer')).toBeHidden();
  await expect(page.getByRole('link', { name: 'Download PDF' })).toBeHidden();
  await expect(page.getByRole('heading', { level: 2, name: 'Employment history' })).toBeVisible();
  const hasPrintOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasPrintOverflow).toBe(false);
});

test('portfolio remains usable without horizontal overflow on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });

  await page.goto('/');
  await expect(page.getByText('Veerakran Sereerungruangkul', { exact: true })).toBeVisible();

  for (const viewport of [
    { width: 320, height: 800 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    for (const path of ['/', '/projects/', '/projects/tiny-little-platform/', '/resume']) {
      await page.goto(path);
      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(hasHorizontalOverflow, `${path} overflows at ${viewport.width}px`).toBe(false);
    }
  }

  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/resume');
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
  await expect(page.getByLabel('Theme')).toBeVisible();
});

test('theme control and primary navigation work from the keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');

  const theme = page.getByLabel('Theme');
  const resumeLink = page.getByRole('link', { name: 'Resume' });
  const resumePosition = await resumeLink.boundingBox();
  const themePosition = await theme.boundingBox();
  expect(resumePosition).not.toBeNull();
  expect(themePosition).not.toBeNull();
  expect(themePosition!.y + themePosition!.height).toBeGreaterThanOrEqual(resumePosition!.y);

  await theme.focus();
  await page.keyboard.press('ArrowDown');
  await expect(theme).toHaveValue('light');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(theme).toHaveCSS('outline-style', 'solid');

  await resumeLink.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/resume\/?$/);
});

test('reduced motion preference removes nonessential transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const duration = await page.getByRole('link', { name: 'Resume' }).evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).transitionDuration),
  );
  expect(duration).toBeLessThanOrEqual(0.001);

  const heroDuration = await page.locator('.hero-copy').evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).animationDuration),
  );
  expect(heroDuration).toBeLessThanOrEqual(0.001);
});

test('hero progressively enhances with Three.js while preserving the motion-safe fallback', async ({
  browser,
}) => {
  const enhancedPage = await browser.newPage();
  await enhancedPage.goto('/');
  await expect(enhancedPage.locator('.hero canvas')).toBeVisible();
  await expect(enhancedPage.locator('.hero')).toHaveAttribute('data-three-ready', 'true');
  await enhancedPage.close();

  const reducedContext = await browser.newContext({ reducedMotion: 'reduce' });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto('/');
  await expect(reducedPage.locator('.hero canvas')).toHaveCount(0);
  await expect(reducedPage.locator('.hero-trace')).toBeVisible();
  await reducedContext.close();
});

test('hero keeps the static fallback when the visitor is saving data', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'connection', {
      configurable: true,
      value: { saveData: true },
    });
  });
  await page.goto('/');

  await expect(page.locator('.hero canvas')).toHaveCount(0);
  await expect(page.locator('.hero-trace')).toBeVisible();
});

test('hero pauses and resumes across back-forward cache lifecycle events', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero')).toHaveAttribute('data-three-ready', 'true');

  await page.evaluate(() =>
    window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true })),
  );
  await expect(page.locator('.hero')).not.toHaveAttribute('data-three-ready', 'true');

  await page.evaluate(() =>
    window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })),
  );
  await expect(page.locator('.hero')).toHaveAttribute('data-three-ready', 'true');
});

test('stored appearance is applied by the first document render', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'dark'));
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(17, 23, 20)');
});

test('primary text, supporting text, and links retain accessible contrast', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  for (const theme of ['light', 'dark']) {
    await page.getByLabel('Theme').selectOption(theme);
    for (const selector of ['body', '.lead', '.text-link']) {
      const ratio = await page.locator(selector).first().evaluate((element) => {
        const parseColour = (value: string) =>
          value.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
        const luminance = (colour: number[]) => {
          const channels = colour.map((channel) => {
            const value = channel / 255;
            return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
          });
          return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
        };

        const foreground = luminance(parseColour(getComputedStyle(element).color));
        const background = luminance(parseColour(getComputedStyle(document.body).backgroundColor));
        return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
      });

      expect(ratio).toBeGreaterThanOrEqual(4.5);
    }
  }
});
