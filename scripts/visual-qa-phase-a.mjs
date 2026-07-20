/**
 * Phase A visual QA — Footer + ScrollToTop screenshots via Chrome CDP.
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://127.0.0.1:4173';
const OUT = path.resolve('qa-screenshots/part5-phase-a');
const PORT = 9336;

let msgId = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function startChrome() {
  const userDataDir = path.resolve('.qa-chrome-profile-a');
  const proc = spawn(CHROME, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    `--user-data-dir=${userDataDir}`,
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
  const listBefore = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const beforeIds = new Set(listBefore.map((t) => t.id));
  await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
  await sleep(500);
  const after = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const target =
    after.find((t) => t.type === 'page' && !beforeIds.has(t.id)) ||
    after.find((t) => t.type === 'page' && t.url.includes(url.split('/').pop() || '')) ||
    after.find((t) => t.type === 'page');
  if (!target?.webSocketDebuggerUrl) throw new Error('No page target found');
  const session = await createSession(target.webSocketDebuggerUrl);
  await session.call('Page.enable');
  await session.call('Runtime.enable');
  return { session, targetId: target.id };
}

async function closeTab(targetId) {
  await fetch(`http://127.0.0.1:${PORT}/json/close/${targetId}`);
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
  await sleep(800);
}

async function screenshot(session, file) {
  const { data } = await session.call('Page.captureScreenshot', { format: 'png', fromSurface: true });
  await writeFile(file, Buffer.from(data, 'base64'));
}

async function capture(shot) {
  const { session, targetId } = await openTab(`${BASE}${shot.path}`);
  await session.call('Emulation.setDeviceMetricsOverride', {
    width: shot.w,
    height: shot.h,
    deviceScaleFactor: 1,
    mobile: shot.w < 768,
  });
  await applyTheme(session, shot.theme);
  await navigate(session, `${BASE}${shot.path}`);
  if (shot.scrollFooter) {
    await session.call('Runtime.evaluate', {
      expression: `document.querySelector('footer')?.scrollIntoView({ block: 'start' })`,
    });
    await sleep(500);
  }
  if (shot.scrollForButton) {
    await session.call('Runtime.evaluate', { expression: 'window.scrollTo(0, 800)' });
    await sleep(500);
  }
  const metrics = await session.call('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const footer = document.querySelector('footer');
      const btn = document.querySelector('button[aria-label="Scroll to top of the page"]');
      const fcs = footer ? getComputedStyle(footer) : null;
      const bcs = btn ? getComputedStyle(btn) : null;
      return {
        footerBg: fcs?.backgroundColor ?? null,
        footerColor: fcs?.color ?? null,
        footerBorder: fcs?.borderTopColor ?? null,
        accentSample: footer ? getComputedStyle(footer.querySelector('.bg-theme-accent, [class*=\"theme-accent\"]') || footer).backgroundColor : null,
        scrollBtn: btn ? { bg: bcs.backgroundColor, color: bcs.color, visible: true } : { visible: false },
        hasHardcodedHex: footer ? /#FF2E74|#080B11/.test(footer.outerHTML) : false,
      };
    })()`,
  });
  await screenshot(session, path.join(OUT, `${shot.name}.png`));
  session.close();
  await closeTab(targetId);
  return { name: shot.name, ...metrics.result.value };
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const chrome = await startChrome();
  const shots = [
    { name: 'footer-desktop-light', path: '/', theme: 'light', w: 1440, h: 900, scrollFooter: true },
    { name: 'footer-desktop-dark', path: '/', theme: 'dark', w: 1440, h: 900, scrollFooter: true },
    { name: 'footer-mobile-light', path: '/', theme: 'light', w: 375, h: 812, scrollFooter: true },
    { name: 'scrolltop-desktop-dark', path: '/', theme: 'dark', w: 1440, h: 900, scrollForButton: true },
    { name: 'scrolltop-mobile-light', path: '/about', theme: 'light', w: 375, h: 812, scrollForButton: true },
  ];
  const report = [];
  for (const shot of shots) {
    const result = await capture(shot);
    report.push(result);
    console.log('captured', shot.name, JSON.stringify(result.scrollBtn));
  }
  await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  chrome.kill();
  console.log('done', OUT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
