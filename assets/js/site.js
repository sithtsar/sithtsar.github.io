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

// ponytail: three watercolour scenes painted in turn on one canvas. Each paints stroke by stroke,
// holds, washes out. No per-frame work while holding; reduced motion paints the first scene once.
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
  const tone = (name) => getComputedStyle(plate).getPropertyValue(name).trim();
  const [paper, carbon, moss, vermilion, harvest, ultramarine] = ['--paper', '--carbon', '--moss', '--vermilion', '--harvest', '--ultramarine'].map(tone);
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const wash = (col, a) => { c.globalAlpha = a; c.fillStyle = col; c.fillRect(0, 0, size, size); };
  const blob = (x, y, r, col, a, n = 3) => {
    c.fillStyle = col;
    for (let k = 0; k < n; k++) {
      c.globalAlpha = a;
      c.beginPath();
      c.ellipse(x + (rnd() - 0.5) * r, y + (rnd() - 0.5) * r, r * (0.6 + rnd() * 0.7), r * (0.4 + rnd() * 0.6), rnd() * Math.PI, 0, 7);
      c.fill();
    }
  };
  const stroke = (x, y, x2, y2, w, col, a) => {
    c.strokeStyle = col;
    c.globalAlpha = a * 0.35; c.lineWidth = w * 2.4;
    c.beginPath(); c.moveTo(x, y); c.lineTo(x2, y2); c.stroke();
    c.globalAlpha = a; c.lineWidth = w;
    c.beginPath(); c.moveTo(x, y); c.lineTo(x2, y2); c.stroke();
  };
  const chunk = (items, n, draw) => {
    const steps = [];
    for (let i = 0; i < items.length; i += n) steps.push(() => items.slice(i, i + n).forEach(draw));
    return steps;
  };

  const tree = () => {
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
    return [
      () => { blob(size / 2, size * 0.36, size * 0.2, harvest, 0.05, 4); stroke(size * 0.06, ground, size * 0.94, ground, 1, carbon, 0.8); },
      ...chunk(ink, 24, ([x, y, x2, y2, w, root]) => stroke(x, y, x2, y2, w, carbon, root ? 0.4 : 0.9)),
      ...chunk(leaves, 30, ([x, y]) => blob(x, y, 5 + rnd() * 5, rnd() < 0.2 ? vermilion : rnd() < 0.15 ? harvest : moss, 0.16)),
    ];
  };

  const whirl = () => {
    const squares = [];
    for (let k = 0, side = size * 0.8, angle = 0; k < 64; k++, side *= 0.962, angle += 0.075) squares.push([side, angle, k]);
    return [
      () => blob(size / 2, size / 2, size * 0.24, ultramarine, 0.05, 5),
      ...chunk(squares, 1, ([side, angle, k]) => {
        c.save(); c.translate(size / 2, size / 2); c.rotate(angle);
        c.globalAlpha = 0.85; c.lineWidth = k % 6 === 5 ? 1.6 : 0.9; c.strokeStyle = k % 6 === 5 ? vermilion : carbon;
        c.strokeRect(-side / 2, -side / 2, side, side); c.restore();
      }),
    ];
  };

  const meadow = () => {
    const grass = [];
    for (let k = 0; k < 220; k++) grass.push([size * 0.04 + rnd() * size * 0.92, size * 0.86, (rnd() - 0.5) * 30, -(20 + rnd() * 70)]);
    const flies = [];
    for (let k = 0; k < 34; k++) flies.push([size * 0.08 + rnd() * size * 0.84, size * 0.12 + rnd() * size * 0.62]);
    return [
      () => { wash(carbon, 0.9); blob(size / 2, size * 0.55, size * 0.3, ultramarine, 0.06, 4); },
      ...chunk(grass, 10, ([x, y, dx, dy]) => {
        c.strokeStyle = moss; c.globalAlpha = 0.6; c.lineWidth = 1.2;
        c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + dx * 0.3, y + dy * 0.6, x + dx, y + dy); c.stroke();
      }),
      ...chunk(flies, 3, ([x, y]) => { blob(x, y, 14, harvest, 0.05, 4); blob(x, y, 3, paper, 0.9, 1); }),
    ];
  };

  const scenes = [tree, whirl, meadow];
  let scene = 0;
  const run = () => {
    wash(paper, 1);
    const steps = scenes[scene++ % scenes.length]();
    let i = 0;
    const tick = () => {
      if (still) { while (i < steps.length) steps[i++](); return; }
      steps[i++]();
      if (i < steps.length) requestAnimationFrame(tick);
      else setTimeout(fade, 4500);
    };
    tick();
  };
  const fade = () => {
    let n = 0;
    const f = () => { wash(paper, 0.14); if (++n < 24) requestAnimationFrame(f); else run(); };
    f();
  };
  run();
}
