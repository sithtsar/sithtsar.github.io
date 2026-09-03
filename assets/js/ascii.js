// ponytail: ASCII plates redrawn twelve times a second. Three from mid-century annual-report covers (globe, Bell rings,
// Tandy rising line) and three from screens I grew up on: a Mr. Robot terminal, a DedSec skull glitch, a Pantheon upload scan.
const el = document.querySelector('[data-ascii]');
if (el) {
  const W = 64, H = 30, AX = 2.05;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shade = ' .:-=+*#%@';
  let seed = 1520;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const series = Array.from({ length: W }, (_, i) => 0.15 + (i / W) * 0.6 + Math.sin(i / 3.1) * 0.05 + (rnd() - 0.5) * 0.06);

  const globe = (g, a, t) => {
    const R = H / 2 - 1, cx = W / 2, cy = H / 2;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const nx = (x - cx) / (R * AX), ny = (y - cy) / R, d = nx * nx + ny * ny;
      if (d > 1) { if (((x * 7 + y * 13) % 29) === 0) g[y][x] = '.'; continue; }
      const nz = Math.sqrt(1 - d);
      const lon = Math.atan2(nx, nz) + t * 0.5, lat = Math.asin(ny);
      const m = Math.abs(((lon % (Math.PI / 6)) + Math.PI / 6) % (Math.PI / 6) - Math.PI / 12) > Math.PI / 12 - 0.045;
      const p = Math.abs(((lat % (Math.PI / 6)) + Math.PI / 6) % (Math.PI / 6) - Math.PI / 12) > Math.PI / 12 - 0.04;
      const light = Math.max(0, 0.35 * nz + 0.55 * (-nx * 0.6 - ny * 0.5 + nz * 0.6));
      g[y][x] = m && p ? '+' : m ? '|' : p ? '-' : shade[Math.min(9, Math.floor(light * 6))];
      const dl = Math.atan2(Math.sin(lon - 1.36), Math.cos(lon - 1.36)), dt = lat - (-0.37);
      if (dl * dl + dt * dt < 0.004 && nz > 0.1) { g[y][x] = '@'; a[y][x] = 1; }
    }
  };
  const rings = (g, a, t) => {
    const cx = W / 2, cy = H / 2;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const r = Math.hypot((x - cx) / AX, y - cy);
      if (r < 1.2) { g[y][x] = '*'; a[y][x] = 1; continue; }
      const ph = ((r - t * 3.2) % 4.5 + 4.5) % 4.5, k = Math.floor((r - t * 3.2) / 4.5);
      if (ph < 1.1) { g[y][x] = r > H / 2 + 8 ? 'o' : 'O'; if ((k & 1) === 0) a[y][x] = 1; }
      else if (ph < 1.6) g[y][x] = '.';
    }
  };
  const chart = (g, a, t) => {
    const n = Math.min(W, Math.floor(((t % 6) / 4.2) * W));
    for (let y = 0; y < H; y++) { g[y][2] = '|'; if (y % 6 === 3) for (let x = 3; x < W; x += 2) g[y][x] = '.'; }
    for (let x = 2; x < W; x++) g[H - 2][x] = '_';
    for (let x = 4; x < n; x++) {
      const y = Math.round((H - 3) - series[x] * (H - 5)), y0 = Math.round((H - 3) - series[x - 1] * (H - 5));
      for (let yy = Math.min(y, y0); yy <= Math.max(y, y0); yy++) g[yy][x] = y < y0 ? '/' : y > y0 ? '\\' : '_';
      if (x % 8 === 0) for (let yy = y + 1; yy < H - 2; yy++) g[yy][x] = ':';
    }
    if (n > 4) { const y = Math.round((H - 3) - series[n - 1] * (H - 5)); g[y][n - 1] = 'O'; a[y][n - 1] = 1; }
  };
  // Diffusion: noise resolves into a target, coarse blocks first, then detail, like a sampler mid-inference.
  const target = Array.from({ length: H }, () => Array(W).fill(' '));
  { const a = Array.from({ length: H }, () => Array(W).fill(0)); globe(target, a, 1); }
  if (el.dataset.face) {
    const im = new Image();
    im.src = el.dataset.face;
    im.decode().then(() => {
      const c = document.createElement('canvas'); c.width = W; c.height = H;
      const x = c.getContext('2d'); x.drawImage(im, 0, 0, W, H);
      const d = x.getImageData(0, 0, W, H).data;
      for (let i = 0; i < W * H; i++) target[(i / W) | 0][i % W] = shade[Math.round((1 - (0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2]) / 255) * 9)];
    }).catch(() => {});
  }
  const thr = Array.from({ length: H }, () => Array.from({ length: W }, rnd));
  const STEPS = 48;
  const diffuse = (g, a, t) => {
    const s = Math.min(1, (t % 6) / 2.6), tgt = targets[Math.floor(t / 6 / plates.length) % targets.length];
    const block = s < 0.3 ? 4 : s < 0.6 ? 2 : 1;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (thr[y][x] < s) { const ch = tgt[(y / block | 0) * block][(x / block | 0) * block]; g[y][x] = ch; if (block === 1 && ch === '@') a[y][x] = 1; }
      else g[y][x] = shade[1 + ((Math.random() * 8) | 0)];
    }
    const step = Math.round(s * STEPS), loss = ((1 - s) * (1 - s) + Math.random() * 0.01).toFixed(3);
    const line = `denoising  step ${String(step).padStart(2, ' ')}/${STEPS}  loss ${loss}`;
    g[H - 1].fill(' ');
    for (let i = 0; i < line.length; i++) { g[H - 1][i + 2] = line[i]; a[H - 1][i + 2] = 1; }
  };
  const SKULL = ['......########......', '....############....', '...##############...', '..################..', '..###..######..###..', '..##....####....##..', '..###..######..###..', '..################..', '...######..######...', '....####....####....', '.....##########.....', '......##.##.##......', '......########......', '.......##..##.......'];
  const skull = (g, a, t, tear) => {
    const x0 = (W - 40) / 2 | 0, y0 = (H - SKULL.length) / 2 | 0;
    SKULL.forEach((row, j) => {
      const dx = tear && Math.random() < 0.18 ? ((Math.random() * 7) | 0) - 3 : 0;
      for (let i = 0; i < 40; i++) if (row[i >> 1] === '#') { const x = x0 + i + dx; if (x >= 0 && x < W) g[y0 + j][x] = tear && Math.random() < 0.06 ? '%' : '#'; }
    });
  };
  const skullT = Array.from({ length: H }, () => Array(W).fill(' '));
  skull(skullT, 0, 0, false);
  const targets = [target, skullT];
  const glitch = (g, a, t) => {
    skull(g, a, t, true);
    if (((t * 3) | 0) % 5 === 0) { const y = (Math.random() * H) | 0; for (let x = 0; x < W; x++) g[y][x] = '=-'[x & 1]; }
    const msg = '> ACCESS GRANTED' + (((t * 2) | 0) % 2 ? ' _' : '');
    for (let i = 0; i < msg.length; i++) { g[H - 2][i + 3] = msg[i]; a[H - 2][i + 3] = 1; }
    for (let k = 0; k < 3; k++) { const y = (Math.random() * H) | 0, x0 = (Math.random() * W) | 0; for (let x = x0; x < Math.min(W, x0 + 14); x++) if (g[y][x] === ' ') g[y][x] = '01'[(x * 7 + y) & 1]; }
  };
  const LINES = ['$ ssh sarthak@anywhere', 'hello friend.', '$ cat /proc/self/dreams', '  agents online ....... 7', '  deterministic ....... yes', '  tests that lie ...... 0', '$ ./ship --by friday', '  half break, half ship.', '$ █'];
  const term = (g, a, t) => {
    const n = ((t % 6) * 70) | 0;
    let left = n;
    LINES.forEach((line, j) => {
      if (left <= 0) return;
      const k = Math.min(line.length, left); left -= line.length + 4;
      for (let i = 0; i < k; i++) { g[2 + j * 3] [3 + i] = line[i]; if (j === 1 || j === 7) a[2 + j * 3][3 + i] = 1; }
      if (left <= 0 && k === line.length && ((t * 2) | 0) % 2) g[2 + j * 3][3 + k] = '_';
    });
  };
  const upload = (g, a, t) => {
    const p = Math.min(1, (t % 6) / 5), cx = W / 2, cy = H / 2 - 1, sy = 2 + p * (H - 6);
    for (let y = 1; y < H - 3; y++) for (let x = 0; x < W; x++) {
      const solid = skullT[y][x] === '#';
      if (y < sy) { if (solid) g[y][x] = shade[3 + ((Math.sin(x * 0.9 + y * 1.7 + t * 3) * 3 + 3) | 0)]; else if (((x * 3 + y * 5) % 11) === 0) g[y][x] = '.'; }
      else if (solid) g[y][x] = ':';
      if (Math.abs(y - sy) < 0.6) { g[y][x] = '='; a[y][x] = 1; }
    }
    const bar = `upload  [${'#'.repeat(p * 24 | 0).padEnd(24, '.')}] ${String(p * 100 | 0).padStart(3, ' ')}%   UI status: ${p < 1 ? 'scanning' : 'integrated'}`;
    for (let i = 0; i < bar.length; i++) { g[H - 1][i + 2] = bar[i]; if (i > 7 && i < 34) a[H - 1][i + 2] = 1; }
  };
  const rest = [globe, rings, chart, term, glitch, upload];
  for (let i = rest.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [rest[i], rest[j]] = [rest[j], rest[i]]; }
  const plates = [diffuse, ...rest];
  const render = (k, t) => {
    const g = Array.from({ length: H }, () => Array(W).fill(' '));
    const a = Array.from({ length: H }, () => Array(W).fill(0));
    plates[k](g, a, t);
    el.innerHTML = g.map((row, y) => row.map((ch, x) => a[y][x] ? `<b>${ch}</b>` : ch).join('')).join('\n');
  };
  if (still) render(0, 1);
  else {
    const t0 = performance.now();
    setInterval(() => { const t = (performance.now() - t0) / 1000; render(Math.floor(t / 6) % plates.length, t); }, 85);
  }
}
