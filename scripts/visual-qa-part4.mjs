/**
 * Part 4 shared-component visual QA (review-only).
 * Run: node scripts/visual-qa-part4.mjs
 */
import { chromium, devices } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE = 'http://127.0.0.1:4173';
const OUT = path.resolve('qa-screenshots/part4');

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'services', path: '/services' },
  { name: 'artists', path: '/artists-labels-partners' },
  { name: 'contact', path: '/contact' },
  { name: 'privacy', path: '/privacy-policy' },
  { name: 'terms', path: '/terms-and-conditions' },
  { name: 'not-found', path: '/does-not-exist-qa' },
];

const VIEWPORTS = [
  { label: '375', width: 375, height: 812 },
  { label: '768', width: 768, height: 1024 },
  { label: '1024', width: 1024, height: 900 },
  { label: '1440', width: 1440, height: 900 },
];

async function applyTheme(page, theme) {
  await page.evaluate((t) => {
    const root = document.documentElement;
    if (t === 'dark') {
      localStorage.setItem('theme', 'dark');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      localStorage.setItem('theme', 'light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }, theme);
  await page.reload({ waitUntil: 'networkidle' });
}

async function readStyles(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      exists: true,
      bg: cs.backgroundColor,
      color: cs.color,
      border: cs.borderColor,
      opacity: cs.opacity,
      boxShadow: cs.boxShadow,
      width: rect.width,
      height: rect.height,
    };
  }, selector);
}

async function collectIssues(page, theme, viewport) {
  const issues = [];

  const header = await readStyles(page, 'header[role="banner"]');
  if (!header) issues.push({ severity: 'high', msg: 'Header missing' });

  const navLink = await readStyles(page, 'nav[aria-label="Main navigation"] a');
  const scrolled = await page.evaluate(() => window.scrollY);
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(300);
  const headerScrolled = await readStyles(page, 'header[role="banner"]');

  const primaryBtn = await readStyles(page, 'a[href="/contact"], button');
  const themeToggle = await readStyles(page, 'button[aria-haspopup="listbox"]');

  // Button variants on services if available
  await page.goto(`${BASE}/services`, { waitUntil: 'networkidle' });
  await page.evaluate((t) => {
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, theme);

  const btnPrimary = await readStyles(page, 'button.bg-orange-500, a.bg-orange-500, .bg-orange-500');
  const btnOutline = await readStyles(page, '.border-orange-500');

  // Card sample
  await page.goto(`${BASE}/about`, { waitUntil: 'networkidle' });
  await page.evaluate((t) => {
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, theme);
  const card = await readStyles(page, '.bg-theme-card, article');

  // Badge
  const badge = await readStyles(page, 'span.rounded-full');

  // Check horizontal overflow
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  if (overflow.scrollWidth > overflow.clientWidth + 1) {
    issues.push({
      severity: 'medium',
      msg: `Horizontal overflow ${overflow.scrollWidth - overflow.clientWidth}px`,
    });
  }

  // Low contrast heuristic: same bg and text rgb
  const checkContrast = (label, s) => {
    if (!s?.bg || !s?.color) return;
    if (s.bg === s.color) {
      issues.push({ severity: 'high', msg: `${label}: text matches background (${s.color})` });
    }
    if (s.opacity && Number(s.opacity) < 0.35 && label.includes('nav')) {
      issues.push({ severity: 'medium', msg: `${label}: very low opacity ${s.opacity}` });
    }
  };
  checkContrast('nav', navLink);
  checkContrast('header scrolled', headerScrolled);
  checkContrast('theme toggle', themeToggle);

  return {
    theme,
    viewport,
    scrolled: headerScrolled,
    header,
    navLink,
    btnPrimary,
    btnOutline,
    card,
    badge,
    issues,
  };
}

async function screenshotSet(page, name, theme) {
  const file = path.join(OUT, `${name}-${theme}.png`);
  await page.screenshot({ path: file, fullPage: false });
  return file;
}

async function openMobileMenu(page) {
  const btn = page.locator('button[aria-controls="mobile-menu"]');
  if (await btn.count()) {
    await btn.click();
    await page.waitForTimeout(400);
    return true;
  }
  return false;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const report = { captures: [], samples: [], menu: [], loader: [], findings: [] };

  // Required captures
  const required = [
    { page: '/', name: 'home-desktop-light', theme: 'light', w: 1440 },
    { page: '/', name: 'home-desktop-dark', theme: 'dark', w: 1440 },
    { page: '/', name: 'home-mobile-dark-menu', theme: 'dark', w: 375, menu: true },
    { page: '/services', name: 'services-desktop-light', theme: 'light', w: 1440 },
    { page: '/artists-labels-partners', name: 'artists-desktop-dark', theme: 'dark', w: 1440 },
    { page: '/contact', name: 'contact-mobile-light', theme: 'light', w: 375 },
    { page: '/privacy-policy', name: 'legal-dark', theme: 'dark', w: 1440 },
    { page: '/does-not-exist-qa', name: 'not-found-dark', theme: 'dark', w: 1440 },
  ];

  for (const shot of required) {
    const context = await browser.newContext({
      viewport: { width: shot.w, height: shot.w <= 400 ? 812 : 900 },
    });
    const page = await context.newPage();
    await page.goto(`${BASE}${shot.page}`, { waitUntil: 'networkidle' });
    await applyTheme(page, shot.theme);
    if (shot.menu) await openMobileMenu(page);
    const file = path.join(OUT, `${shot.name}.png`);
    await page.screenshot({ path: file });
    report.captures.push(file);
    await context.close();
  }

  // Sample all pages both themes at key breakpoints
  for (const vp of VIEWPORTS) {
    for (const theme of ['light', 'dark']) {
      for (const p of PAGES) {
        const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
        const page = await context.newPage();
        await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle' });
        await applyTheme(page, theme);
        const sample = await collectIssues(page, theme, vp.label);
        sample.page = p.name;
        report.samples.push(sample);
        if (sample.issues.length) {
          report.findings.push({ page: p.name, theme, viewport: vp.label, issues: sample.issues });
        }
        await context.close();
      }
    }
  }

  // Theme toggle interaction
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    await page.locator('button[aria-haspopup="listbox"]').click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT, 'theme-toggle-dropdown-light.png') });
    await page.getByRole('option', { name: 'Dark' }).click();
    await page.waitForTimeout(300);
    const darkClass = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    report.menu.push({ action: 'set dark via toggle', darkClass });
    await context.close();
  }

  // Mobile menu keyboard escape
  {
    const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    await applyTheme(page, 'dark');
    await openMobileMenu(page);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const open = await page.locator('#mobile-menu').evaluate((el) => {
      const t = getComputedStyle(el).transform;
      return !t.includes('matrix(1, 0, 0, 1, 0, 0)') && t !== 'none';
    }).catch(() => false);
    report.menu.push({ action: 'escape closes menu', stillOpen: open });
    await context.close();
  }

  await browser.close();
  await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ captures: report.captures.length, findings: report.findings.length, out: OUT }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
