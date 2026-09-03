// ponytail: three ASCII plates adapted from mid-century annual-report covers, redrawn twelve times a second.
// Globe (Canadian Overseas Telecommunication, 1951), signal rings (Bell Telephone, 1964), rising line (Tandy, 1964).
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
    const n = Math.min(W, Math.floor(((t % 9) / 6.5) * W));
    for (let y = 0; y < H; y++) { g[y][2] = '|'; if (y % 6 === 3) for (let x = 3; x < W; x += 2) g[y][x] = '.'; }
    for (let x = 2; x < W; x++) g[H - 2][x] = '_';
    for (let x = 4; x < n; x++) {
      const y = Math.round((H - 3) - series[x] * (H - 5)), y0 = Math.round((H - 3) - series[x - 1] * (H - 5));
      for (let yy = Math.min(y, y0); yy <= Math.max(y, y0); yy++) g[yy][x] = y < y0 ? '/' : y > y0 ? '\\' : '_';
      if (x % 8 === 0) for (let yy = y + 1; yy < H - 2; yy++) g[yy][x] = ':';
    }
    if (n > 4) { const y = Math.round((H - 3) - series[n - 1] * (H - 5)); g[y][n - 1] = 'O'; a[y][n - 1] = 1; }
  };
  const plates = [globe, rings, chart];
  const render = (k, t) => {
    const g = Array.from({ length: H }, () => Array(W).fill(' '));
    const a = Array.from({ length: H }, () => Array(W).fill(0));
    plates[k](g, a, t);
    el.innerHTML = g.map((row, y) => row.map((ch, x) => a[y][x] ? `<b>${ch}</b>` : ch).join('')).join('\n');
  };
  if (still) render(0, 1);
  else {
    const t0 = performance.now();
    setInterval(() => { const t = (performance.now() - t0) / 1000; render(Math.floor(t / 10) % plates.length, t); }, 85);
  }
}
