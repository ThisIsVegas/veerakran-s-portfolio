import { expect, test } from '@playwright/test';

test('visitor can navigate the professional portfolio', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: 'Veerakran Sereerungruangkul' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link')).toHaveText([
    'Home',
    'Resume',
  ]);
  await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');

  await page.getByRole('link', { name: 'Resume' }).click();
  await expect(page).toHaveURL(/\/resume\/?$/);
  await expect(page.getByRole('link', { name: 'Resume' })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('heading', { level: 1, name: 'Resume' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download PDF' })).toHaveAttribute('href', '/resume.pdf');
});

test('retired routes direct visitors to relevant homepage sections', async ({ page }) => {
  await page.goto('/contact');
  await expect(page).toHaveURL(/\/#contact$/);

  await page.goto('/projects');
  await expect(page).toHaveURL(/\/#experience$/);
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

test('homepage presents experience by professional domain', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 2, name: 'Systems integration' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Experience across systems' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Live-service games' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Enterprise IT systems' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Technical capabilities' })).toBeVisible();
  await expect(page.getByText('Hengtech Co., Ltd.')).toHaveCount(0);
  await expect(page.getByText('Wewasanad Co., Ltd.')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'View detailed experience' })).toHaveAttribute('href', '/resume');
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
  const nameLineCount = await page.getByRole('heading', { level: 1 }).evaluate((heading) => {
    const styles = getComputedStyle(heading);
    return heading.getBoundingClientRect().height / Number.parseFloat(styles.lineHeight);
  });
  expect(nameLineCount).toBeLessThanOrEqual(2.1);

  for (const viewport of [
    { width: 320, height: 800 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    for (const path of ['/', '/resume']) {
      await page.goto(path);
      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(hasHorizontalOverflow).toBe(false);
    }
  }

  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/resume');
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
  await expect(page.getByLabel('Theme')).toBeVisible();
});

test('theme control and primary navigation work from the keyboard', async ({ page }) => {
  await page.goto('/');

  const theme = page.getByLabel('Theme');
  await theme.focus();
  await page.keyboard.press('ArrowDown');
  await expect(theme).toHaveValue('light');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(theme).toHaveCSS('outline-style', 'solid');

  await page.getByRole('link', { name: 'Resume' }).focus();
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
    for (const selector of ['body', '.hero-summary', '.resume-link']) {
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
