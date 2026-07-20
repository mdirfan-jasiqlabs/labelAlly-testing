/**
 * Phase E visual QA — brand logos, favicons, nested routes, theme modes.
 * Uses Chrome CDP (same approach as Phase D).
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = path.resolve('qa-screenshots/part5-phase-e');
const PORT = 9346;
let msgId = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function findBase() {
  for (const p of [4183, 4182, 4181, 4180, 4175, 4173]) {
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
    `--user-data-dir=${path.resolve('.qa-chrome-profile-e')}`,
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
  await session.call('Network.enable');
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
  await sleep(900);
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

  const assetChecks = [];
  for (const asset of [
    '/brand/logo.png',
    '/brand/logo-on-dark.png',
    '/brand/og-image.png',
    '/default-og.png',
    '/favicon.svg',
    '/favicon.png',
    '/favicon-32x32.png',
    '/favicon.ico',
    '/apple-touch-icon.png',
  ]) {
    const res = await fetch(`${base}${asset}`);
    assetChecks.push({ path: asset, status: res.status, ok: res.ok });
    console.log(`asset ${asset} → ${res.status}`);
  }

  const chrome = await startChrome();
  const report = { assets: assetChecks, shots: [], nested404s: [] };

  const shots = [
    { name: 'header-home-light', theme: 'light', route: '/', w: 1440, h: 900, scrollY: 0 },
    { name: 'header-home-dark', theme: 'dark', route: '/', w: 1440, h: 900, scrollY: 0 },
    { name: 'footer-home-dark', theme: 'dark', route: '/', w: 1440, h: 900, scrollY: 7000 },
    { name: 'nested-artists-light', theme: 'light', route: '/artists-labels-partners', w: 1440, h: 900, scrollY: 0 },
    { name: 'nested-services-dark', theme: 'dark', route: '/services', w: 1440, h: 900, scrollY: 0 },
    { name: 'mobile-375-light', theme: 'light', route: '/', w: 375, h: 812, scrollY: 0 },
    { name: 'mobile-375-dark', theme: 'dark', route: '/', w: 375, h: 812, scrollY: 0 },
    { name: 'tablet-768-light', theme: 'light', route: '/', w: 768, h: 1024, scrollY: 0 },
    { name: 'laptop-1024-dark', theme: 'dark', route: '/', w: 1024, h: 900, scrollY: 0 },
    { name: 'system-dark-home', theme: 'system', route: '/', w: 1440, h: 900, scrollY: 0 },
  ];

  for (const shot of shots) {
    const { session, targetId } = await openTab(`${base}${shot.route}`);
    await session.call('Emulation.setDeviceMetricsOverride', {
      width: shot.w, height: shot.h, deviceScaleFactor: 1, mobile: shot.w < 768,
    });
    await applyTheme(session, shot.theme);
    await navigate(session, `${base}${shot.route}`);
    if (shot.scrollY) {
      await session.call('Runtime.evaluate', { expression: `window.scrollTo(0, ${shot.scrollY})` });
      await sleep(600);
    }
    const metrics = await session.call('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const headerImgs = [...document.querySelectorAll('header img')];
        const footerImgs = [...document.querySelectorAll('footer img')];
        const visible = (img) => img && getComputedStyle(img).display !== 'none' && img.offsetParent !== null;
        const headerVisible = headerImgs.find(visible) || headerImgs[0];
        const footerVisible = footerImgs.find(visible) || footerImgs[0];
        return {
          overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
          isDark: document.documentElement.classList.contains('dark'),
          headerSrc: headerVisible ? (headerVisible.currentSrc || headerVisible.src) : null,
          headerNatural: headerVisible ? { w: headerVisible.naturalWidth, h: headerVisible.naturalHeight } : null,
          footerSrc: footerVisible ? (footerVisible.currentSrc || footerVisible.src) : null,
          headerBox: headerVisible ? !!headerVisible.closest('[class*=\"logoCard\"]') : false,
          footerHasLogoCard: !!document.querySelector('footer [class*=\"logoCard\"]'),
        };
      })()`,
    });
    await screenshot(session, path.join(OUT, `${shot.name}.png`));
    session.close();
    await closeTab(targetId);
    report.shots.push({ name: shot.name, ...metrics.result.value });
    console.log(
      'captured',
      shot.name,
      'overflow',
      metrics.result.value.overflow,
      'header',
      metrics.result.value.headerSrc
    );
  }

  // Nested-route missing asset probe
  const { session, targetId } = await openTab(`${base}/artists-labels-partners`);
  const failed = [];
  session.call('Network.enable').catch(() => {});
  // Collect 404s via Runtime after load
  await applyTheme(session, 'light');
  await navigate(session, `${base}/artists-labels-partners`);
  const miss = await session.call('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const imgs = [...document.images].filter((i) => !i.complete || i.naturalWidth === 0);
      return imgs.map((i) => i.currentSrc || i.src);
    })()`,
  });
  report.nested404s = miss.result.value || [];
  console.log('broken images on nested route', report.nested404s.length ? report.nested404s : 'none');
  session.close();
  await closeTab(targetId);

  await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  chrome.kill();
  console.log('done', OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
