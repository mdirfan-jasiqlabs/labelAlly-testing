/**
 * Phase D visual QA — Artists & Labels page.
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = path.resolve('qa-screenshots/part5-phase-d');
const PORT = 9345;
const PAGE = '/artists-labels-partners';
let msgId = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function findBase() {
  for (const p of [4182, 4181, 4180, 4175, 4173]) {
    try {
      const r = await fetch(`http://127.0.0.1:${p}/`);
      if (r.ok) return `http://127.0.0.1:${p}`;
    } catch {}
  }
  return null;
}

async function startChrome() {
  const proc = spawn(CHROME, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${path.resolve('.qa-chrome-profile-d')}`,
  ], { stdio: 'ignore' });
  for (let i = 0; i < 40; i++) {
    try {
      if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) return proc;
    } catch {}
    await sleep(200);
  }
  throw new Error('Chrome CDP failed');
}

function createSession(wsUrl) {
  const pending = new Map();
  const ws = new WebSocket(wsUrl);
  return new Promise((resolve, reject) => {
    ws.addEventListener('open', () => {
      const session = {
        async call(method, params = {}) {
          const id = ++msgId;
          return new Promise((res, rej) => {
            pending.set(id, { res, rej });
            ws.send(JSON.stringify({ id, method, params }));
          });
        },
        close() { ws.close(); },
      };
      ws.addEventListener('message', (e) => {
        const d = JSON.parse(e.data);
        if (d.id && pending.has(d.id)) {
          const { res, rej } = pending.get(d.id);
          pending.delete(d.id);
          d.error ? rej(new Error(JSON.stringify(d.error))) : res(d.result);
        }
      });
      resolve(session);
    });
    ws.addEventListener('error', reject);
  });
}

async function openTab(url) {
  const before = new Set((await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).map((t) => t.id));
  await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
  await sleep(500);
  const after = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const target = after.find((t) => t.type === 'page' && !before.has(t.id)) || after.find((t) => t.type === 'page');
  const session = await createSession(target.webSocketDebuggerUrl);
  await session.call('Page.enable');
  await session.call('Runtime.enable');
  return { session, targetId: target.id };
}

async function closeTab(id) {
  await fetch(`http://127.0.0.1:${PORT}/json/close/${id}`);
}

async function applyTheme(session, theme) {
  const expr = theme === 'system'
    ? `localStorage.removeItem('theme');`
    : theme === 'dark'
      ? `localStorage.setItem('theme','dark'); document.documentElement.classList.add('dark'); document.documentElement.setAttribute('data-theme','dark');`
      : `localStorage.setItem('theme','light'); document.documentElement.classList.remove('dark'); document.documentElement.setAttribute('data-theme','light');`;
  await session.call('Runtime.evaluate', { expression: expr });
  if (theme === 'system') {
    await session.call('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-color-scheme', value: 'dark' }],
    });
    await session.call('Runtime.evaluate', {
      expression: `document.documentElement.classList.add('dark'); document.documentElement.setAttribute('data-theme','dark');`,
    });
  }
}

async function navigate(session, url) {
  await session.call('Page.navigate', { url });
  for (let i = 0; i < 50; i++) {
    const { result } = await session.call('Runtime.evaluate', { expression: 'document.readyState' });
    if (result.value === 'complete') break;
    await sleep(200);
  }
  await sleep(1000);
}

async function screenshot(session, file) {
  const { data } = await session.call('Page.captureScreenshot', { format: 'png', fromSurface: true });
  await writeFile(file, Buffer.from(data, 'base64'));
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const base = await findBase();
  if (!base) throw new Error('No preview server. Start vite preview first.');
  console.log('using', base);
  const chrome = await startChrome();
  const report = [];

  const shots = [
    { name: 'hero-desktop-light', theme: 'light', w: 1440, h: 900, scrollY: 0 },
    { name: 'hero-desktop-dark', theme: 'dark', w: 1440, h: 900, scrollY: 0 },
    { name: 'hero-mobile-light', theme: 'light', w: 375, h: 812, scrollY: 0 },
    { name: 'who-desktop-light', theme: 'light', w: 1440, h: 900, scrollY: 900 },
    { name: 'whatyouget-desktop-dark', theme: 'dark', w: 1440, h: 900, scrollY: 1800 },
    { name: 'onboarding-desktop-light', theme: 'light', w: 1440, h: 900, scrollY: 3200 },
    { name: 'cta-desktop-dark', theme: 'dark', w: 1440, h: 900, scrollY: 4200 },
    { name: 'tablet-768-light', theme: 'light', w: 768, h: 1024, scrollY: 0 },
    { name: 'laptop-1024-dark', theme: 'dark', w: 1024, h: 900, scrollY: 0 },
    { name: 'system-dark-hero', theme: 'system', w: 1440, h: 900, scrollY: 0 },
  ];

  for (const shot of shots) {
    const { session, targetId } = await openTab(`${base}${PAGE}`);
    await session.call('Emulation.setDeviceMetricsOverride', {
      width: shot.w, height: shot.h, deviceScaleFactor: 1, mobile: shot.w < 768,
    });
    await applyTheme(session, shot.theme);
    await navigate(session, `${base}${PAGE}`);
    if (shot.scrollY) {
      await session.call('Runtime.evaluate', { expression: `window.scrollTo(0, ${shot.scrollY})` });
      await sleep(500);
    }
    const metrics = await session.call('Runtime.evaluate', {
      returnByValue: true,
      expression: `({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        isDark: document.documentElement.classList.contains('dark'),
        pageBg: getComputedStyle(document.documentElement).getPropertyValue('--color-page-bg').trim(),
        heading: getComputedStyle(document.documentElement).getPropertyValue('--color-heading-text').trim(),
        action: getComputedStyle(document.documentElement).getPropertyValue('--color-action-primary').trim(),
      })`,
    });
    await screenshot(session, path.join(OUT, `${shot.name}.png`));
    session.close();
    await closeTab(targetId);
    report.push({ name: shot.name, ...metrics.result.value });
    console.log('captured', shot.name, 'overflow', metrics.result.value.overflow, 'dark', metrics.result.value.isDark);
  }

  await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  chrome.kill();
  console.log('done', OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
