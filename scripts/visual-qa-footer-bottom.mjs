import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9338;
const BASE = 'http://127.0.0.1:4173';
const OUT = path.resolve('qa-screenshots/part5-phase-a');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let msgId = 0;

async function start() {
  const p = spawn(CHROME, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${path.resolve('.qa-chrome-profile-a2')}`,
  ], { stdio: 'ignore' });
  for (let i = 0; i < 40; i++) {
    try {
      if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) return p;
    } catch {}
    await sleep(200);
  }
  throw new Error('no chrome');
}

function sess(wsUrl) {
  const pending = new Map();
  const ws = new WebSocket(wsUrl);
  return new Promise((resolve, reject) => {
    ws.addEventListener('open', () => {
      const s = {
        async call(m, params = {}) {
          const id = ++msgId;
          return new Promise((res, rej) => {
            pending.set(id, { res, rej });
            ws.send(JSON.stringify({ id, method: m, params }));
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
      resolve(s);
    });
    ws.addEventListener('error', reject);
  });
}

async function open(url) {
  const before = new Set((await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).map((t) => t.id));
  await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
  await sleep(500);
  const after = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const t = after.find((x) => x.type === 'page' && !before.has(x.id)) || after.find((x) => x.type === 'page');
  const s = await sess(t.webSocketDebuggerUrl);
  await s.call('Page.enable');
  await s.call('Runtime.enable');
  return { s, id: t.id };
}

const chrome = await start();
await mkdir(OUT, { recursive: true });

for (const theme of ['light', 'dark']) {
  const { s, id } = await open(`${BASE}/`);
  await s.call('Emulation.setDeviceMetricsOverride', {
    width: 1440, height: 900, deviceScaleFactor: 1, mobile: false,
  });
  const themeScript = theme === 'dark'
    ? `localStorage.setItem('theme','dark'); document.documentElement.classList.add('dark'); document.documentElement.setAttribute('data-theme','dark');`
    : `localStorage.setItem('theme','light'); document.documentElement.classList.remove('dark'); document.documentElement.setAttribute('data-theme','light');`;
  await s.call('Runtime.evaluate', { expression: themeScript });
  await s.call('Page.navigate', { url: `${BASE}/` });
  await sleep(1200);
  await s.call('Runtime.evaluate', { expression: 'window.scrollTo(0, document.body.scrollHeight)' });
  await sleep(700);
  const { data } = await s.call('Page.captureScreenshot', { format: 'png', fromSurface: true });
  await writeFile(path.join(OUT, `footer-bottom-${theme}.png`), Buffer.from(data, 'base64'));
  const m = await s.call('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const f = document.querySelector('footer');
      const cs = getComputedStyle(f);
      return {
        bg: cs.backgroundColor,
        color: cs.color,
        border: cs.borderTopColor,
        hardHexInClass: /#FF2E74|#080B11|neutral-|pink-/.test(f.className),
      };
    })()`,
  });
  console.log(theme, JSON.stringify(m.result.value));
  s.close();
  await fetch(`http://127.0.0.1:${PORT}/json/close/${id}`);
}

chrome.kill();
