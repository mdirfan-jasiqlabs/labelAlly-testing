/**
 * Part 4 visual QA via Chrome DevTools Protocol (no npm deps).
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://127.0.0.1:4173';
const OUT = path.resolve('qa-screenshots/part4');
const PORT = 9333;

const REQUIRED = [
  { name: 'home-desktop-light', path: '/', theme: 'light', w: 1440, h: 900 },
  { name: 'home-desktop-dark', path: '/', theme: 'dark', w: 1440, h: 900 },
  { name: 'home-mobile-dark-menu', path: '/', theme: 'dark', w: 375, h: 812, menu: true },
  { name: 'services-desktop-light', path: '/services', theme: 'light', w: 1440, h: 900 },
  { name: 'artists-desktop-dark', path: '/artists-labels-partners', theme: 'dark', w: 1440, h: 900 },
  { name: 'contact-mobile-light', path: '/contact', theme: 'light', w: 375, h: 812 },
  { name: 'legal-dark', path: '/privacy-policy', theme: 'dark', w: 1440, h: 900 },
  { name: 'not-found-dark', path: '/does-not-exist-qa', theme: 'dark', w: 1440, h: 900 },
];

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
  { label: '375', w: 375, h: 812 },
  { label: '768', w: 768, h: 1024 },
  { label: '1024', w: 1024, h: 900 },
  { label: '1440', w: 1440, h: 900 },
];

let msgId = 0;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function startChrome() {
  const userDataDir = path.resolve('.qa-chrome-profile');
  const proc = spawn(CHROME, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${userDataDir}`,
  ], { stdio: 'ignore' });

  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return proc;
    } catch {}
    await sleep(200);
  }
  throw new Error('Chrome CDP did not start');
}

function createSession(wsUrl) {
  const pending = new Map();
  const ws = new WebSocket(wsUrl);

  return new Promise((resolve, reject) => {
    ws.addEventListener('open', () => {
      const session = {
        ws,
        async call(method, params = {}) {
          const id = ++msgId;
          return new Promise((res, rej) => {
            pending.set(id, { res, rej });
            ws.send(JSON.stringify({ id, method, params }));
          });
        },
        close() {
          ws.close();
        },
      };

      ws.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.id && pending.has(data.id)) {
          const { res, rej } = pending.get(data.id);
          pending.delete(data.id);
          if (data.error) rej(new Error(JSON.stringify(data.error)));
          else res(data.result);
        }
      });

      resolve(session);
    });
    ws.addEventListener('error', reject);
  });
}

async function openTab(url = 'about:blank') {
  const listRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  const before = new Set((await listRes.json()).map((t) => t.id));
  await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
  await sleep(300);
  const after = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const target = after.find((t) => !before.has(t.id)) ?? after[after.length - 1];
  const session = await createSession(target.webSocketDebuggerUrl);
  await session.call('Page.enable');
  await session.call('Runtime.enable');
  return { session, targetId: target.id };
}

async function closeTab(targetId) {
  await fetch(`http://127.0.0.1:${PORT}/json/close/${targetId}`, { method: 'GET' });
}

async function setViewport(session, w, h) {
  await session.call('Emulation.setDeviceMetricsOverride', {
    width: w,
    height: h,
    deviceScaleFactor: 1,
    mobile: w < 768,
  });
}

async function applyTheme(session, theme) {
  await session.call('Runtime.evaluate', {
    expression: `(() => {
      const t = ${JSON.stringify(theme)};
      if (t === 'dark') {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.style.colorScheme = 'light';
      }
    })()`,
  });
}

async function navigate(session, url) {
  await session.call('Page.navigate', { url });
  for (let i = 0; i < 50; i++) {
    const { result } = await session.call('Runtime.evaluate', { expression: 'document.readyState' });
    if (result.value === 'complete') break;
    await sleep(200);
  }
  await sleep(700);
}

async function screenshot(session, file) {
  const { data } = await session.call('Page.captureScreenshot', { format: 'png', fromSurface: true });
  await writeFile(file, Buffer.from(data, 'base64'));
  return file;
}

async function evalValue(session, expression) {
  const { result } = await session.call('Runtime.evaluate', { returnByValue: true, expression });
  return result.value;
}

async function openMobileMenu(session) {
  await session.call('Runtime.evaluate', {
    expression: `document.querySelector('button[aria-controls="mobile-menu"]')?.click()`,
  });
  await sleep(500);
}

async function captureShot(shot) {
  const { session, targetId } = await openTab(`${BASE}${shot.path}`);
  await setViewport(session, shot.w, shot.h);
  await applyTheme(session, shot.theme);
  await navigate(session, `${BASE}${shot.path}`);
  if (shot.menu) await openMobileMenu(session);
  const file = path.join(OUT, `${shot.name}.png`);
  await screenshot(session, file);
  session.close();
  await closeTab(targetId);
  return file;
}

async function samplePage(page, theme, vp) {
  const { session, targetId } = await openTab(`${BASE}${page.path}`);
  await setViewport(session, vp.w, vp.h);
  await applyTheme(session, theme);
  await navigate(session, `${BASE}${page.path}`);
  await session.call('Runtime.evaluate', { expression: 'window.scrollTo(0, 400)' });
  await sleep(300);

  const metrics = await evalValue(session, `({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    hasHeader: !!document.querySelector('header[role="banner"]'),
    hasThemeToggle: !!document.querySelector('button[aria-haspopup="listbox"]'),
  })`);

  const readStyles = async (selector) => evalValue(session, `(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { bg: cs.backgroundColor, color: cs.color, border: cs.borderTopColor, opacity: cs.opacity, width: r.width, height: r.height };
  })()`);

  const header = await readStyles('header[role="banner"]');
  const navLink = await readStyles('nav[aria-label="Main navigation"] a');
  const themeToggle = await readStyles('button[aria-haspopup="listbox"]');
  const card = await readStyles('.bg-theme-card');
  const primaryBtn = await readStyles('.bg-orange-500, .bg-theme-action-primary');
  const badge = await readStyles('span.rounded-full');

  const issues = [];
  if (!metrics.hasHeader) issues.push({ severity: 'high', msg: 'Header missing' });
  if (metrics.overflow > 1) issues.push({ severity: 'medium', msg: `Horizontal overflow ${metrics.overflow}px` });
  for (const [label, s] of [['nav', navLink], ['header', header], ['themeToggle', themeToggle], ['card', card]]) {
    if (s && s.bg === s.color) issues.push({ severity: 'high', msg: `${label}: text matches background` });
  }

  session.close();
  await closeTab(targetId);
  return { page: page.name, theme, viewport: vp.label, metrics, header, navLink, themeToggle, card, primaryBtn, badge, issues };
}

async function testInteractions() {
  const results = [];
  const { session, targetId } = await openTab(`${BASE}/`);
  await setViewport(session, 1440, 900);
  await applyTheme(session, 'light');
  await navigate(session, `${BASE}/`);

  await session.call('Runtime.evaluate', {
    expression: `document.querySelector('button[aria-haspopup="listbox"]')?.click()`,
  });
  await sleep(250);
  await screenshot(session, path.join(OUT, 'theme-toggle-dropdown-light.png'));

  await session.call('Runtime.evaluate', {
    expression: `Array.from(document.querySelectorAll('[role="option"]')).find(el => el.textContent.includes('Dark'))?.click()`,
  });
  await sleep(400);
  const darkApplied = await evalValue(session, `document.documentElement.classList.contains('dark')`);
  results.push({ test: 'theme toggle sets dark', pass: darkApplied === true });
  session.close();
  await closeTab(targetId);

  const m = await openTab(`${BASE}/`);
  await setViewport(m.session, 375, 812);
  await applyTheme(m.session, 'dark');
  await navigate(m.session, `${BASE}/`);
  await openMobileMenu(m.session);
  await m.session.call('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await m.session.call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await sleep(400);
  const menuOpen = await evalValue(m.session, `(() => {
    const el = document.getElementById('mobile-menu');
    if (!el) return true;
    const t = getComputedStyle(el).transform;
    return t !== 'none' && !t.includes('matrix(1, 0, 0, 1, 0, 0)');
  })()`);
  results.push({ test: 'escape closes mobile menu', pass: menuOpen === false });
  m.session.close();
  await closeTab(m.targetId);

  return results;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const chrome = await startChrome();
  const report = { captures: [], samples: [], interactions: [], findings: [] };

  for (const shot of REQUIRED) {
    const file = await captureShot(shot);
    report.captures.push(file);
    console.log('captured', path.basename(file));
  }

  for (const vp of VIEWPORTS) {
    for (const theme of ['light', 'dark']) {
      for (const page of PAGES) {
        const sample = await samplePage(page, theme, vp);
        report.samples.push(sample);
        if (sample.issues.length) {
          report.findings.push({ page: page.name, theme, viewport: vp.label, issues: sample.issues });
        }
      }
    }
  }

  report.interactions = await testInteractions();
  await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  chrome.kill();
  console.log(JSON.stringify({ captures: report.captures.length, findings: report.findings.length }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
