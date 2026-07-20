/**
 * Phase C visual QA — Header, MobileMenu, PageLoader, GradientBackground, glass.
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = path.resolve('qa-screenshots/part5-phase-c');
const PORT = 9342;
let msgId = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function findBase() {
  for (const port of [4181, 4180, 4175, 4173, 4174]) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/`);
      if (r.ok) return `http://127.0.0.1:${port}`;
    } catch {}
  }
  return null;
}

async function startChrome() {
  const proc = spawn(CHROME, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${path.resolve('.qa-chrome-profile-c')}`,
  ], { stdio: 'ignore' });
  for (let i = 0; i < 40; i++) {
    try {
      if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) return proc;
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
        async call(method, params = {}) {
          const id = ++msgId;
          return new Promise((res, rej) => {
            pending.set(id, { res, rej });
            ws.send(JSON.stringify({ id, method, params }));
          });
        },
        close() { ws.close(); },
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
  await session.call('Runtime.evaluate', {
    expression: theme === 'dark'
      ? `localStorage.setItem('theme','dark'); document.documentElement.classList.add('dark'); document.documentElement.setAttribute('data-theme','dark');`
      : `localStorage.setItem('theme','light'); document.documentElement.classList.remove('dark'); document.documentElement.setAttribute('data-theme','light');`,
  });
}

async function navigate(session, url) {
  await session.call('Page.navigate', { url });
  for (let i = 0; i < 50; i++) {
    const { result } = await session.call('Runtime.evaluate', { expression: 'document.readyState' });
    if (result.value === 'complete') break;
    await sleep(200);
  }
  await sleep(800);
}

async function screenshot(session, file) {
  const { data } = await session.call('Page.captureScreenshot', { format: 'png', fromSurface: true });
  await writeFile(file, Buffer.from(data, 'base64'));
}

async function main() {
  await mkdir(OUT, { recursive: true });
  let base = await findBase();
  if (!base) {
    // start preview ourselves via spawn vite? Prefer fail clearly
    throw new Error('No preview server found. Start vite preview first.');
  }
  console.log('using', base);

  const chrome = await startChrome();
  const report = [];

  const shots = [
    { name: 'header-desktop-light', path: '/', theme: 'light', w: 1440, h: 900 },
    { name: 'header-desktop-dark', path: '/', theme: 'dark', w: 1440, h: 900 },
    { name: 'header-tablet', path: '/about', theme: 'light', w: 768, h: 1024 },
    { name: 'mobile-menu-light', path: '/', theme: 'light', w: 375, h: 812, menu: true },
    { name: 'mobile-menu-dark', path: '/', theme: 'dark', w: 375, h: 812, menu: true },
    { name: 'notfound-gradient-dark', path: '/does-not-exist-qa', theme: 'dark', w: 1440, h: 900 },
    { name: 'notfound-gradient-light', path: '/does-not-exist-qa', theme: 'light', w: 1024, h: 900 },
  ];

  for (const shot of shots) {
    const { session, targetId } = await openTab(`${base}${shot.path}`);
    await session.call('Emulation.setDeviceMetricsOverride', {
      width: shot.w, height: shot.h, deviceScaleFactor: 1, mobile: shot.w < 768,
    });
    await applyTheme(session, shot.theme);
    await navigate(session, `${base}${shot.path}`);

    if (shot.menu) {
      await session.call('Runtime.evaluate', {
        expression: `document.querySelector('button[aria-controls="mobile-menu"]')?.click()`,
      });
      await sleep(500);
    }

    const metrics = await session.call('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const activeUnderline = document.querySelector('nav[aria-label="Main navigation"] a .bg-theme-accentDecorative, nav[aria-label="Main navigation"] a [class*="accentDecorative"]');
        const mobileActive = document.querySelector('#mobile-menu a.bg-theme-navActive, #mobile-menu [class*="navActive"]');
        const drawer = document.getElementById('mobile-menu');
        const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        const root = getComputedStyle(document.documentElement);
        return {
          overflow,
          isDark: document.documentElement.classList.contains('dark'),
          navActiveBg: root.getPropertyValue('--color-nav-active-bg').trim(),
          accentDecorative: root.getPropertyValue('--color-accent-decorative').trim(),
          actionPrimary: root.getPropertyValue('--color-action-primary').trim(),
          glassBg: root.getPropertyValue('--color-glass-bg').trim(),
          drawerShadow: drawer ? getComputedStyle(drawer).boxShadow : null,
          hasMobileActive: !!mobileActive || (drawer ? !!drawer.querySelector('[class*="navActive"]') : false),
        };
      })()`,
    });

    await screenshot(session, path.join(OUT, `${shot.name}.png`));
    session.close();
    await closeTab(targetId);
    report.push({ name: shot.name, ...metrics.result.value });
    console.log('captured', shot.name, 'overflow', metrics.result.value.overflow, 'shadow', metrics.result.value.drawerShadow?.slice?.(0, 40));
  }

  // PageLoader: inject via evaluate on a blank route by forcing Suspense is hard;
  // instead measure tokens and render a temporary DOM probe
  {
    const { session, targetId } = await openTab(`${base}/`);
    await session.call('Emulation.setDeviceMetricsOverride', {
      width: 1440, height: 900, deviceScaleFactor: 1, mobile: false,
    });
    await applyTheme(session, 'light');
    await navigate(session, `${base}/`);
    const loaderProbe = await session.call('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const wrap = document.createElement('div');
        wrap.id = 'qa-loader-probe';
        wrap.className = 'fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-theme-page';
        wrap.innerHTML = '<div class="absolute w-12 h-12 rounded-full bg-theme-action-primary/10 blur-xl"></div><svg class="text-theme-action-primary" width="36" height="36" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/></svg><span class="text-theme-body mt-4">Loading...</span>';
        document.body.appendChild(wrap);
        const svg = wrap.querySelector('svg');
        const cs = getComputedStyle(svg);
        return { color: cs.color, expected: getComputedStyle(document.documentElement).getPropertyValue('--color-action-primary').trim() };
      })()`,
    });
    await sleep(200);
    await screenshot(session, path.join(OUT, 'pageloader-probe-light.png'));
    report.push({ name: 'pageloader-probe-light', ...loaderProbe.result.value });
    session.close();
    await closeTab(targetId);
  }

  await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  chrome.kill();
  console.log('done', OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
