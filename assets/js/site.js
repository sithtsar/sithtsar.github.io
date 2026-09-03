const status = document.querySelector('[data-copy-status]');

document.addEventListener('click', async ({ target }) => {
  const button = target.closest('[data-copy]');
  if (!button) return;

  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    button.textContent = 'Copied';
    status.textContent = 'Email copied to clipboard.';
  } catch {
    status.textContent = 'Copy unavailable. Select the visible address.';
  }
});

// ponytail: one deterministic ink tree that draws itself once, then stops. No idle loop.
const plate = document.querySelector('canvas[data-plate]');
if (plate) {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const size = plate.clientWidth || 320;
  plate.width = plate.height = size * dpr;
  const c = plate.getContext('2d');
  c.scale(dpr, dpr);
  c.lineCap = 'round';

  let seed = 1520;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const ink = [];
  const leaves = [];
  const grow = (x, y, a, len, w, depth, root) => {
    const x2 = x + Math.cos(a) * len;
    const y2 = y + Math.sin(a) * len;
    ink.push([x, y, x2, y2, w, root, depth]);
    if (depth >= (root ? 6 : 9)) { if (!root) leaves.push([x2, y2]); return; }
    const n = depth < 2 || rnd() < 0.15 ? 3 : 2;
    const spread = depth < 2 ? 1.3 : 1.1;
    for (let i = 0; i < n; i++) grow(x2, y2, a + (i / (n - 1) - 0.5) * spread + (rnd() - 0.5) * 0.5, len * (0.7 + rnd() * 0.14), w * 0.7, depth + 1, root);
  };
  const ground = size * 0.68;
  grow(size / 2, ground, -Math.PI / 2, size * 0.14, size * 0.022, 0, false);
  grow(size / 2, ground, Math.PI / 2, size * 0.09, size * 0.014, 0, true);
  ink.sort((a, b) => a[6] - b[6]);

  const tone = (name) => getComputedStyle(plate).getPropertyValue(name).trim();
  const carbon = tone('--carbon');
  const moss = tone('--moss');
  const vermilion = tone('--vermilion');
  c.strokeStyle = carbon;
  c.lineWidth = 1;
  c.beginPath();
  c.moveTo(size * 0.06, ground);
  c.lineTo(size * 0.94, ground);
  c.stroke();

  const batch = matchMedia('(prefers-reduced-motion: reduce)').matches ? 1e9 : 1;
  let i = 0;
  let j = 0;
  const step = () => {
    for (let k = 0; k < 24 * batch && i < ink.length; k++, i++) {
      const [x, y, x2, y2, w, root] = ink[i];
      c.globalAlpha = root ? 0.45 : 1;
      c.lineWidth = w;
      c.strokeStyle = carbon;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x2, y2);
      c.stroke();
    }
    if (i >= ink.length) {
      for (let k = 0; k < 40 * batch && j < leaves.length; k++, j++) {
        const [x, y] = leaves[j];
        c.globalAlpha = 0.9;
        c.fillStyle = rnd() < 0.18 ? vermilion : moss;
        c.beginPath();
        c.ellipse(x + (rnd() - 0.5) * 8, y + (rnd() - 0.5) * 8, 3 + rnd() * 2.5, 1.8 + rnd() * 1.6, rnd() * Math.PI, 0, 7);
        c.fill();
      }
    }
    if (i < ink.length || j < leaves.length) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
