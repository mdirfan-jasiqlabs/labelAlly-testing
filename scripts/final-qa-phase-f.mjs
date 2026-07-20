/**
 * Phase F — Final production QA via Chrome CDP.
 * Audits every route across viewports + themes for:
 *   console errors, network 404s, horizontal overflow,
 *   heading hierarchy, images missing alt, primary landmarks.
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = path.resolve('qa-screenshots/phase-f');
const PORT = 9350;
let msgId = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'services', path: '/services' },
  { name: 'artists', path: '/artists-labels-partners' },
  { name: 'contact', path: '/contact' },
  { name: 'privacy', path: '/privacy-policy' },
  { name: 'terms', path: '/terms-and-conditions' },
  { name: 'notfound', path: '/this-route-does-not-exist' },
];

const VIEWPORTS = [
  { w: 375, h: 812 },
  { w: 390, h: 844 },
  { w: 414, h: 896 },
  { w: 768, h: 1024 },
  { w: 1024, h: 768 },
  { w: 1280, h: 800 },
  { w: 1440, h: 900 },
];

async function findBase() {
  for (const p of [4183, 4182, 4181, 4180]) {
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
    `--user-data-dir=${path.resolve('.qa-chrome-profile-f')}`,
  ], { stdio: 'ignore' });
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) return proc; } catch {}
    await sleep(200);
  }
  throw new Error('Chrome CDP failed');
}

function createSession(wsUrl) {
  const pending = new Map();
  const listeners = [];
  const ws = new WebSocket(wsUrl);
  return new Promise((resolve, reject) => {
    ws.addEventListener('open', () => {
      const session = {
        call(method, params = {}) {
          const id = ++msgId;
          return new Promise((res, rej) => {
            pending.set(id, { res, rej });
            ws.send(JSON.stringify({ id, method, params }));
          });
        },
        on(fn) { listeners.push(fn); },
        close() { ws.close(); },
      };
      ws.addEventListener('message', (e) => {
        const d = JSON.parse(e.data);
        if (d.id && pending.has(d.id)) {
          const { res, rej } = pending.get(d.id);
          pending.delete(d.id);
          d.error ? rej(new Error(JSON.stringify(d.error))) : res(d.result);
        } else if (d.method) {
          listeners.forEach((fn) => fn(d));
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
  await sleep(400);
  const after = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const target = after.find((t) => t.type === 'page' && !before.has(t.id)) || after.find((t) => t.type === 'page');
  const session = await createSession(target.webSocketDebuggerUrl);
  await session.call('Page.enable');
  await session.call('Runtime.enable');
  await session.call('Network.enable');
  await session.call('Log.enable');
  return { session, targetId: target.id };
}

async function closeTab(id) { await fetch(`http://127.0.0.1:${PORT}/json/close/${id}`); }

function themeExpr(theme) {
  if (theme === 'system') return `localStorage.removeItem('theme');`;
  if (theme === 'dark') return `localStorage.setItem('theme','dark');`;
  return `localStorage.setItem('theme','light');`;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const base = await findBase();
  if (!base) throw new Error('No preview server on 4183. Run: npx vite preview --port 4183');
  console.log('using', base);
  const chrome = await startChrome();

  const report = { pages: [], summary: { consoleErrors: 0, network404s: 0, overflowPages: 0, imgsNoAlt: 0, headingIssues: 0 } };

  // ---- Pass 1: per route × theme — console errors, 404s, a11y at 1440 ----
  for (const route of ROUTES) {
    for (const theme of ['light', 'dark', 'system']) {
      const consoleErrors = [];
      const net404 = [];
      const { session, targetId } = await openTab(`${base}${route.path}`);
      session.on((d) => {
        if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') {
          consoleErrors.push((d.params.args || []).map((a) => a.value || a.description || '').join(' '));
        }
        if (d.method === 'Runtime.exceptionThrown') {
          consoleErrors.push('EXCEPTION: ' + (d.params.exceptionDetails?.exception?.description || d.params.exceptionDetails?.text || ''));
        }
        if (d.method === 'Network.responseReceived' && d.params.response.status === 404) {
          net404.push(d.params.response.url);
        }
        if (d.method === 'Network.loadingFailed') {
          net404.push('FAILED ' + (d.params.errorText || '') + ' ' + (d.params.requestId || ''));
        }
      });
      if (theme === 'system') {
        await session.call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'dark' }] });
      }
      await session.call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
      await session.call('Page.addScriptToEvaluateOnNewDocument', { source: themeExpr(theme) });
      await session.call('Page.navigate', { url: `${base}${route.path}` });
      await sleep(1600);

      const audit = await session.call('Runtime.evaluate', {
        returnByValue: true,
        expression: `(() => {
          const de = document.documentElement;
          const overflow = Math.max(0, de.scrollWidth - de.clientWidth);
          const isDark = de.classList.contains('dark');
          const imgs = [...document.images];
          const imgsNoAlt = imgs.filter((i) => !i.hasAttribute('alt')).map((i) => i.currentSrc || i.src);
          const brokenImgs = imgs.filter((i) => i.complete && i.naturalWidth === 0 && (i.currentSrc || i.src)).map((i) => i.currentSrc || i.src);
          const h1s = [...document.querySelectorAll('h1')].map((h) => h.textContent.trim().slice(0, 60));
          const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => +h.tagName[1]);
          let headingSkip = false, prev = 0;
          for (const lvl of headings) { if (prev && lvl > prev + 1) headingSkip = true; prev = lvl; }
          const main = document.querySelectorAll('main').length;
          const pageBg = getComputedStyle(document.body).backgroundColor;
          const bodyColor = getComputedStyle(document.body).color;
          return { overflow, isDark, imgsNoAlt, brokenImgs, h1count: h1s.length, h1s, headingSkip, mainCount: main, pageBg, bodyColor };
        })()`,
      });
      const a = audit.result.value;

      report.pages.push({ route: route.name, theme, ...a, consoleErrors, net404 });
      report.summary.consoleErrors += consoleErrors.length;
      report.summary.network404s += net404.filter((u) => !u.startsWith('FAILED')).length;
      if (a.overflow > 0) report.summary.overflowPages++;
      report.summary.imgsNoAlt += a.imgsNoAlt.length;
      if (a.headingSkip || a.h1count !== 1) report.summary.headingIssues++;

      console.log(`${route.name}/${theme} overflow=${a.overflow} h1=${a.h1count} noAlt=${a.imgsNoAlt.length} broken=${a.brokenImgs.length} errs=${consoleErrors.length} 404=${net404.length}`);
      session.close();
      await closeTab(targetId);
    }
  }

  // ---- Pass 2: overflow across all viewports (light) ----
  const overflowMatrix = [];
  for (const route of ROUTES) {
    const row = { route: route.name };
    const { session, targetId } = await openTab(`${base}${route.path}`);
    for (const vp of VIEWPORTS) {
      await session.call('Emulation.setDeviceMetricsOverride', { width: vp.w, height: vp.h, deviceScaleFactor: 1, mobile: vp.w < 768 });
      await session.call('Page.navigate', { url: `${base}${route.path}` });
      await sleep(900);
      const o = await session.call('Runtime.evaluate', {
        returnByValue: true,
        expression: `Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth)`,
      });
      row[vp.w] = o.result.value;
    }
    overflowMatrix.push(row);
    console.log('overflow', route.name, JSON.stringify(row));
    session.close();
    await closeTab(targetId);
  }
  report.overflowMatrix = overflowMatrix;

  await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  chrome.kill();
  console.log('\n=== SUMMARY ===');
  console.log(JSON.stringify(report.summary, null, 2));
  console.log('done', OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
