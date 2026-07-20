/**
 * Phase F — representative screenshots for the visual QA record.
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = path.resolve('qa-screenshots/phase-f');
const PORT = 9351;
let msgId = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const BASE = 'http://127.0.0.1:4183';

const SHOTS = [
  { name: 'home-light-1440', route: '/', theme: 'light', w: 1440, h: 900 },
  { name: 'home-dark-1440', route: '/', theme: 'dark', w: 1440, h: 900 },
  { name: 'contact-light-1440', route: '/contact', theme: 'light', w: 1440, h: 900 },
  { name: 'contact-dark-1440', route: '/contact', theme: 'dark', w: 1440, h: 900 },
  { name: 'artists-dark-1440', route: '/artists-labels-partners', theme: 'dark', w: 1440, h: 900 },
  { name: 'services-light-1440', route: '/services', theme: 'light', w: 1440, h: 900 },
  { name: 'about-dark-1440', route: '/about', theme: 'dark', w: 1440, h: 900 },
  { name: 'notfound-dark-1440', route: '/nope', theme: 'dark', w: 1440, h: 900 },
  { name: 'home-mobile-390-dark', route: '/', theme: 'dark', w: 390, h: 844 },
  { name: 'contact-mobile-390-light', route: '/contact', theme: 'light', w: 390, h: 844 },
];

async function startChrome() {
  const proc = spawn(CHROME, [
    `--remote-debugging-port=${PORT}`, '--headless=new', '--disable-gpu',
    `--user-data-dir=${path.resolve('.qa-chrome-profile-f2')}`,
  ], { stdio: 'ignore' });
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) return proc; } catch {}
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
        call(method, params = {}) {
          const id = ++msgId;
          return new Promise((res, rej) => { pending.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); });
        },
        close() { ws.close(); },
      };
      ws.addEventListener('message', (e) => {
        const d = JSON.parse(e.data);
        if (d.id && pending.has(d.id)) { const { res, rej } = pending.get(d.id); pending.delete(d.id); d.error ? rej(new Error(JSON.stringify(d.error))) : res(d.result); }
      });
      resolve(session);
    });
    ws.addEventListener('error', reject);
  });
}

async function openTab(url) {
  await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
  await sleep(400);
  const tabs = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const target = tabs.find((t) => t.type === 'page');
  const session = await createSession(target.webSocketDebuggerUrl);
  await session.call('Page.enable');
  return { session, targetId: target.id };
}
async function closeTab(id) { await fetch(`http://127.0.0.1:${PORT}/json/close/${id}`); }

async function main() {
  await mkdir(OUT, { recursive: true });
  const chrome = await startChrome();
  for (const s of SHOTS) {
    const { session, targetId } = await openTab(`${BASE}${s.route}`);
    if (s.theme === 'system') await session.call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'dark' }] });
    await session.call('Emulation.setDeviceMetricsOverride', { width: s.w, height: s.h, deviceScaleFactor: 1, mobile: s.w < 768 });
    const expr = s.theme === 'system' ? `localStorage.removeItem('theme')` : `localStorage.setItem('theme','${s.theme}')`;
    await session.call('Page.addScriptToEvaluateOnNewDocument', { source: expr });
    await session.call('Page.navigate', { url: `${BASE}${s.route}` });
    await sleep(1600);
    const { data } = await session.call('Page.captureScreenshot', { format: 'png', fromSurface: true });
    await writeFile(path.join(OUT, `${s.name}.png`), Buffer.from(data, 'base64'));
    console.log('shot', s.name);
    session.close();
    await closeTab(targetId);
  }
  chrome.kill();
  console.log('done', OUT);
}
main().catch((e) => { console.error(e); process.exit(1); });
