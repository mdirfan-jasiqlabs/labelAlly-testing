/**
 * Phase B visual QA — structural color migration screenshots.
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://127.0.0.1:4180';
const OUT = path.resolve('qa-screenshots/part5-phase-b');
const PORT = 9340;
let msgId = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function startChrome() {
  const proc = spawn(CHROME, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    `--user-data-dir=${path.resolve('.qa-chrome-profile-b')}`,
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
      ? `localStorage.setItem('theme','dark'); document.documentElement.classList.add('dark'); document.documentElement.setAttribute('data-theme','dark'); document.documentElement.style.colorScheme='dark';`
      : `localStorage.setItem('theme','light'); document.documentElement.classList.remove('dark'); document.documentElement.setAttribute('data-theme','light'); document.documentElement.style.colorScheme='light';`,
  });
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

async function capture(shot) {
  const { session, targetId } = await openTab(`${BASE}${shot.path}`);
  await session.call('Emulation.setDeviceMetricsOverride', {
    width: shot.w, height: shot.h, deviceScaleFactor: 1, mobile: shot.w < 768,
  });
  await applyTheme(session, shot.theme);
  await navigate(session, `${BASE}${shot.path}`);
  if (shot.scrollY) {
    await session.call('Runtime.evaluate', { expression: `window.scrollTo(0, ${shot.scrollY})` });
    await sleep(400);
  }
  const metrics = await session.call('Runtime.evaluate', {
    returnByValue: true,
    expression: `({
      pageBg: getComputedStyle(document.documentElement).getPropertyValue('--color-page-bg').trim(),
      heading: getComputedStyle(document.documentElement).getPropertyValue('--color-heading-text').trim(),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      isDark: document.documentElement.classList.contains('dark'),
    })`,
  });
  await screenshot(session, path.join(OUT, `${shot.name}.png`));
  session.close();
  await closeTab(targetId);
  return { name: shot.name, ...metrics.result.value };
}

async function main() {
  await mkdir(OUT, { recursive: true });
  // Probe which preview port works
  let base = BASE;
  for (const port of [4180, 4175, 4173, 4174, 4176]) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/`);
      if (r.ok || r.status === 200) { base = `http://127.0.0.1:${port}`; break; }
    } catch {}
  }
  console.log('using', base);

  const chrome = await startChrome();
  const shots = [
    { name: 'home-desktop-light', path: '/', theme: 'light', w: 1440, h: 900 },
    { name: 'home-desktop-dark', path: '/', theme: 'dark', w: 1440, h: 900 },
    { name: 'home-about-section-light', path: '/', theme: 'light', w: 1440, h: 900, scrollY: 900 },
    { name: 'about-desktop-light', path: '/about', theme: 'light', w: 1440, h: 900 },
    { name: 'about-desktop-dark', path: '/about', theme: 'dark', w: 1440, h: 900 },
    { name: 'services-desktop-light', path: '/services', theme: 'light', w: 1440, h: 900 },
    { name: 'services-desktop-dark', path: '/services', theme: 'dark', w: 1440, h: 900 },
    { name: 'contact-desktop-light', path: '/contact', theme: 'light', w: 1440, h: 900 },
    { name: 'contact-mobile-dark', path: '/contact', theme: 'dark', w: 375, h: 812 },
    { name: 'privacy-desktop-dark', path: '/privacy-policy', theme: 'dark', w: 1440, h: 900 },
    { name: 'terms-desktop-light', path: '/terms-and-conditions', theme: 'light', w: 1440, h: 900 },
    { name: 'not-found-dark', path: '/does-not-exist-qa', theme: 'dark', w: 1440, h: 900 },
  ];

  // Patch BASE for captures
  const report = [];
  for (const shot of shots) {
    const urlBase = base;
    const { session, targetId } = await openTab(`${urlBase}${shot.path}`);
    await session.call('Emulation.setDeviceMetricsOverride', {
      width: shot.w, height: shot.h, deviceScaleFactor: 1, mobile: shot.w < 768,
    });
    await applyTheme(session, shot.theme);
    await navigate(session, `${urlBase}${shot.path}`);
    if (shot.scrollY) {
      await session.call('Runtime.evaluate', { expression: `window.scrollTo(0, ${shot.scrollY})` });
      await sleep(400);
    }
    const metrics = await session.call('Runtime.evaluate', {
      returnByValue: true,
      expression: `({
        pageBg: getComputedStyle(document.documentElement).getPropertyValue('--color-page-bg').trim(),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        isDark: document.documentElement.classList.contains('dark'),
      })`,
    });
    await screenshot(session, path.join(OUT, `${shot.name}.png`));
    session.close();
    await closeTab(targetId);
    report.push({ name: shot.name, ...metrics.result.value });
    console.log('captured', shot.name, 'overflow', metrics.result.value.overflow);
  }

  await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  chrome.kill();
  console.log('done', OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
