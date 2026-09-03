// ponytail: one small painting engine. Scenes are lists of steps painted one per frame, then held,
// then washed out. Nothing runs during a hold. Reduced motion paints instantly and never auto-advances.
const all = [...document.querySelectorAll('canvas[data-paint]')];
// Every visit gets a fresh seed, so the corpus order and every brushstroke differ from the last visit.
const CORPUS = ['chalk', 'starry', 'wave', 'lilies', 'wheat', 'fuji', 'ridge', 'rain', 'sunset', 'tree', 'seed', 'weave', 'whirl', 'swatches', 'ripples', 'meadow', 'lanterns'];
let vseed = (Date.now() % 2147483000) + 1;
const vr = () => (vseed = (vseed * 16807) % 2147483647) / 2147483647;
const order = CORPUS.slice();
for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(vr() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
const randoms = all.filter((k) => k.dataset.paint === 'random');
for (const canvas of all) {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const size = canvas.clientWidth || 320;
  canvas.width = canvas.height = size * dpr;
  const c = canvas.getContext('2d');
  c.scale(dpr, dpr);
  c.lineCap = 'round';

  let seed = canvas.dataset.paint === 'random' ? Math.floor(vr() * 2147483000) + 1 : 1520 + all.indexOf(canvas) * 977;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const tone = (name) => getComputedStyle(canvas).getPropertyValue(name).trim();
  const [paper, carbon, moss, vermilion, harvest, ultramarine] = ['--paper', '--carbon', '--moss', '--vermilion', '--harvest', '--ultramarine'].map(tone);
  const blush = '#e7a4a4';
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('coin' in canvas.dataset) {
    c.beginPath();
    for (let k = 0; k < 120; k++) {
      const a = (k / 120) * Math.PI * 2;
      const r = size * (0.47 + (rnd() - 0.5) * 0.02 - (k % 9 === 0 ? 0.012 : 0));
      c.lineTo(size / 2 + Math.cos(a) * r, size / 2 + Math.sin(a) * r);
    }
    c.closePath();
    c.clip();
  }

  const wash = (col, a) => { c.globalAlpha = a; c.fillStyle = col; c.fillRect(0, 0, size, size); };
  const paperWash = () => {
    wash(paper, 1);
    c.fillStyle = carbon;
    c.globalAlpha = 0.06;
    for (let k = 0; k < 300; k++) c.fillRect(rnd() * size, rnd() * size, 1.2, 1.2);
  };
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
  const pause = (n) => Array.from({ length: n }, () => () => {});
  const rule = (y, a = 0.8) => stroke(size * 0.06, y, size * 0.94, y, 1, carbon, a);

  const growTree = (ground) => {
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
    grow(size / 2, ground, -Math.PI / 2, size * 0.14, size * 0.022, 0, false);
    grow(size / 2, ground, Math.PI / 2, size * 0.09, size * 0.014, 0, true);
    ink.sort((a, b) => a[6] - b[6]);
    return { ink, leaves };
  };

  const scenes = {
    tree() {
      const g = size * 0.68;
      const { ink, leaves } = growTree(g);
      return [
        () => { blob(size / 2, size * 0.36, size * 0.2, harvest, 0.05, 4); rule(g); },
        ...chunk(ink, 24, ([x, y, x2, y2, w, root]) => stroke(x, y, x2, y2, w, carbon, root ? 0.4 : 0.9)),
        ...chunk(leaves, 30, ([x, y]) => blob(x, y, 5 + rnd() * 5, rnd() < 0.2 ? vermilion : rnd() < 0.15 ? harvest : moss, 0.16)),
      ];
    },
    seed() {
      const g = size * 0.68;
      const { ink, leaves } = growTree(g);
      return [
        () => { blob(size / 2, size * 0.34, size * 0.16, harvest, 0.06, 5); rule(g); for (let k = 1; k < 6; k++) rule(g + k * size * 0.05, 0.12); },
        ...pause(10),
        () => blob(size / 2, g + size * 0.03, size * 0.02, carbon, 0.9, 2),
        ...pause(14),
        () => { stroke(size / 2, g, size / 2, g - size * 0.07, 1.6, moss, 0.9); blob(size / 2 - 5, g - size * 0.08, 5, moss, 0.6, 2); blob(size / 2 + 5, g - size * 0.08, 5, moss, 0.6, 2); },
        ...pause(20),
        ...chunk(ink, 20, ([x, y, x2, y2, w, root]) => stroke(x, y, x2, y2, w, carbon, root ? 0.4 : 0.9)),
        ...chunk(leaves, 26, ([x, y]) => blob(x, y, 5 + rnd() * 5, rnd() < 0.25 ? blush : moss, 0.18)),
      ];
    },
    weave() {
      const bands = [];
      const inks = [ultramarine, harvest, vermilion, moss];
      for (let x = 0; x < size; x += 6 + rnd() * 22) bands.push([true, x, 4 + rnd() * 18, inks[bands.length % 4]]);
      for (let y = 0; y < size; y += 6 + rnd() * 22) bands.push([false, y, 4 + rnd() * 18, inks[bands.length % 4]]);
      return chunk(bands, 2, ([vert, p, w, col]) => {
        c.globalAlpha = 0.16; c.fillStyle = col;
        vert ? c.fillRect(p, 0, w, size) : c.fillRect(0, p, size, w);
      });
    },
    whirl() {
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
    },
    swatches() {
      const dots = [];
      const inks = [ultramarine, harvest, vermilion, moss, blush];
      for (let r = 0; r < 6; r++) for (let q = 0; q < 6; q++) dots.push([size * (0.15 + q * 0.14), size * (0.15 + r * 0.14), inks[(r * 7 + q * 3) % 5]]);
      return chunk(dots, 2, ([x, y, col]) => {
        blob(x, y, size * 0.045, col, 0.35, 3);
        c.globalAlpha = 0.7; c.strokeStyle = carbon; c.lineWidth = 0.8;
        c.beginPath(); c.arc(x, y, size * 0.052, 0, 7); c.stroke();
      });
    },
    ripples() {
      const rows = [];
      for (let y = size * 0.12; y < size * 0.92; y += size * 0.055) rows.push(y);
      const grid = [];
      for (let k = 1; k < 8; k++) grid.push(k * size / 8);
      return [
        ...chunk(grid, 2, (p) => { stroke(p, 0, p, size, 0.6, carbon, 0.25); stroke(0, p, size, p, 0.6, carbon, 0.25); }),
        () => blob(size * 0.62, size * 0.5, size * 0.11, vermilion, 0.3, 6),
        ...chunk(rows, 1, (y) => {
          c.strokeStyle = ultramarine; c.globalAlpha = 0.8; c.lineWidth = 1.4;
          c.beginPath();
          for (let x = 0; x <= size; x += 4) {
            const d = Math.hypot(x - size * 0.62, y - size * 0.5) / size;
            const bend = (y - size * 0.5) * Math.exp(-d * d * 40) * -0.9;
            const wave = Math.sin(x / 14 + y / 9) * 3;
            x ? c.lineTo(x, y + bend + wave) : c.moveTo(x, y + wave);
          }
          c.stroke();
        }),
      ];
    },
    meadow() {
      const grass = [];
      for (let k = 0; k < 220; k++) grass.push([size * 0.04 + rnd() * size * 0.92, size * 0.86, (rnd() - 0.5) * 30, -(20 + rnd() * 70)]);
      const flies = [];
      for (let k = 0; k < 34; k++) flies.push([size * 0.08 + rnd() * size * 0.84, size * 0.12 + rnd() * size * 0.62]);
      return [
        () => { wash('#171713', 0.9); blob(size / 2, size * 0.55, size * 0.3, '#28559a', 0.06, 4); },
        ...chunk(grass, 10, ([x, y, dx, dy]) => {
          c.strokeStyle = moss; c.globalAlpha = 0.6; c.lineWidth = 1.2;
          c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + dx * 0.3, y + dy * 0.6, x + dx, y + dy); c.stroke();
        }),
        ...chunk(flies, 3, ([x, y]) => { blob(x, y, 14, '#d1a326', 0.05, 4); blob(x, y, 3, '#f3eedc', 0.9, 1); }),
      ];
    },
    chalk() {
      const eqs = ['∂u/∂t + (u·∇)u = −∇p/ρ + ν∇²u', 'softmax(QKᵀ/√d)V', 'f_i(x+c_iΔt) − f_i = −(f_i − f_i^eq)/τ', 'L = −Σ log p(y|x)', '∇·u = 0', 'θ ← θ − η∇L', 'H|ψ⟩ = E|ψ⟩', 'e^{iπ} + 1 = 0', 'Re = ρuL/μ', 'p(x) ∝ e^{−E(x)}'];
      const marks = [];
      for (let k = 0; k < 6; k++) marks.push([size * (0.05 + rnd() * 0.4), size * (0.14 + k * 0.14 + rnd() * 0.04), eqs.splice(Math.floor(rnd() * eqs.length), 1)[0], 14 + rnd() * 5]);
      const dust = [];
      for (let k = 0; k < 40; k++) dust.push([size * rnd(), size * rnd(), '∑∫∂∇πλ∞≈'[k % 8], 9 + rnd() * 14]);
      return [
        () => { wash('#2d3b33', 1); for (let k = 0; k < 30; k++) stroke(rnd() * size, rnd() * size, rnd() * size, rnd() * size, 8, '#3a4a40', 0.5); stroke(0, size * 0.96, size, size * 0.96, 3, '#7a6a4a', 0.9); },
        ...chunk(dust, 8, ([x, y, ch, f]) => { c.globalAlpha = 0.2; c.fillStyle = paper; c.font = `${f}px serif`; c.fillText(ch, x, y); }),
        ...chunk(marks, 1, ([x, y, eq, f]) => { c.font = `italic ${f}px Georgia, serif`; let w = c.measureText(eq).width; const lim = y < size * 0.34 ? size * 0.62 : size * 0.94; if (w > lim) { c.font = `italic ${(f * lim) / w}px Georgia, serif`; w = lim; } x = Math.max(4, Math.min(x, lim - w)); c.globalAlpha = 0.25; c.fillStyle = paper; c.fillText(eq, x + 1, y + 1); c.globalAlpha = 0.92; c.fillText(eq, x, y); if (rnd() < 0.35) stroke(x, y + 4, x + w, y + 5, 1.2, [harvest, blush, paper][Math.floor(rnd() * 3)], 0.8); }),
        () => { stroke(size * 0.68, size * 0.3, size * 0.92, size * 0.3, 1.5, paper, 0.8); stroke(size * 0.68, size * 0.3, size * 0.68, size * 0.06, 1.5, paper, 0.8); for (let x = 0; x < 20; x++) blob(size * (0.69 + x * 0.011), size * (0.29 - 0.2 * Math.exp(-((x - 10) ** 2) / 18)), 1.6, harvest, 0.9, 1); },
      ];
    },
    starry() {
      const sky = '#1c2b5a', glow = '#8aa5e6';
      const swirls = [];
      const eyes = [[0.3, 0.3, 0.16], [0.62, 0.22, 0.12], [0.8, 0.42, 0.09], [0.12, 0.55, 0.08], [0.48, 0.5, 0.07]];
      eyes.forEach(([cx, cy, R]) => { for (let k = 0; k < 40; k++) { const a = k * 0.55, r = R * size * (0.12 + k / 40); swirls.push([cx * size + Math.cos(a) * r, cy * size + Math.sin(a) * r, a + Math.PI / 2, r * 0.5, k % 3 ? glow : paper]); } });
      const wind = [];
      for (let k = 0; k < 90; k++) wind.push([rnd() * size, rnd() * size * 0.7, (rnd() - 0.5) * 0.6, 8 + rnd() * 14]);
      const stars = [];
      for (let k = 0; k < 9; k++) stars.push([size * (0.08 + rnd() * 0.84), size * (0.06 + rnd() * 0.5), 6 + rnd() * 9]);
      return [
        () => { wash(sky, 1); for (let k = 0; k < 8; k++) blob(rnd() * size, size * (0.75 + rnd() * 0.2), size * 0.16, '#0f1730', 0.6, 3); },
        ...chunk(wind, 12, ([x, y, a, l]) => stroke(x, y, x + Math.cos(a) * l, y + Math.sin(a) * l, 1.6, glow, 0.35)),
        ...chunk(swirls, 12, ([x, y, a, l, col]) => stroke(x, y, x + Math.cos(a) * l, y + Math.sin(a) * l, 1.8, col, 0.7)),
        ...chunk(stars, 2, ([x, y, r]) => { blob(x, y, r * 2.2, harvest, 0.16, 5); blob(x, y, r * 0.5, paper, 0.95, 1); }),
        () => { blob(size * 0.86, size * 0.14, size * 0.07, harvest, 0.9, 1); blob(size * 0.86, size * 0.14, size * 0.16, harvest, 0.12, 5); for (let k = 0; k < 9; k++) blob(size * 0.16 + (rnd() - 0.5) * 8, size * (0.96 - k * 0.09), size * (0.075 - k * 0.006), '#0b0e1a', 0.95, 2); },
      ];
    },
    wave() {
      const deep = '#1f3d78', foam = [];
      const crest = (t) => [size * (0.1 + t * 0.5), size * (0.62 - Math.sin(t * Math.PI) * 0.42)];
      for (let k = 0; k < 60; k++) { const [x, y] = crest(0.35 + rnd() * 0.65); foam.push([x + (rnd() - 0.5) * 30, y + rnd() * 26, 3 + rnd() * 6]); }
      const swell = [];
      for (let k = 0; k < 70; k++) swell.push([size * rnd(), size * (0.66 + rnd() * 0.34), 10 + rnd() * 30]);
      return [
        () => { wash('#e9e2cc', 1); blob(size * 0.7, size * 0.5, size * 0.3, harvest, 0.05, 4); c.globalAlpha = 1; c.fillStyle = '#3d4a6b'; c.beginPath(); c.moveTo(size * 0.56, size * 0.7); c.lineTo(size * 0.7, size * 0.52); c.lineTo(size * 0.84, size * 0.7); c.fill(); c.fillStyle = paper; c.beginPath(); c.moveTo(size * 0.66, size * 0.57); c.lineTo(size * 0.7, size * 0.52); c.lineTo(size * 0.74, size * 0.57); c.fill(); },
        () => { c.globalAlpha = 1; c.fillStyle = deep; c.beginPath(); c.moveTo(0, size); c.lineTo(0, size * 0.6); c.bezierCurveTo(size * 0.2, size * 0.1, size * 0.5, size * 0.1, size * 0.62, size * 0.28); c.bezierCurveTo(size * 0.5, size * 0.26, size * 0.44, size * 0.36, size * 0.5, size * 0.46); c.bezierCurveTo(size * 0.7, size * 0.6, size * 0.9, size * 0.7, size, size * 0.74); c.lineTo(size, size); c.fill(); },
        ...chunk(swell, 7, ([x, y, l]) => stroke(x, y, x + l, y - l * 0.15, 1.4, '#7f9fd8', 0.5)),
        ...chunk(foam, 6, ([x, y, r]) => blob(x, y, r, paper, 0.9, 2)),
        () => { for (let k = 0; k < 14; k++) { const [x, y] = crest(0.5 + k / 28); stroke(x, y, x + 8, y + 16 + k, 2, paper, 0.9); } },
      ];
    },
    lilies() {
      const water = '#4b7d95', pads = [], flowers = [], glints = [];
      for (let k = 0; k < 22; k++) pads.push([size * rnd(), size * (0.15 + rnd() * 0.8), size * (0.03 + rnd() * 0.04)]);
      for (let k = 0; k < 9; k++) flowers.push([size * rnd(), size * (0.2 + rnd() * 0.7)]);
      for (let k = 0; k < 120; k++) glints.push([size * rnd(), size * rnd(), 6 + rnd() * 18, [paper, '#a7c7d9', '#6f9ab0', moss][k % 4]]);
      return [
        () => { wash(water, 1); blob(size * 0.3, size * 0.2, size * 0.28, '#2c5d78', 0.25, 3); blob(size * 0.75, size * 0.1, size * 0.25, blush, 0.12, 3); },
        ...chunk(glints, 15, ([x, y, l, col]) => stroke(x, y, x + l, y, 1.6, col, 0.35)),
        ...chunk(pads, 3, ([x, y, r]) => { c.globalAlpha = 0.85; c.fillStyle = '#5f8a4a'; c.beginPath(); c.ellipse(x, y, r, r * 0.5, 0, 0, 7); c.fill(); stroke(x, y, x + r * 0.7, y - r * 0.2, 1, '#2e4d27', 0.6); }),
        ...chunk(flowers, 2, ([x, y]) => { blob(x, y, 6, blush, 0.9, 3); blob(x, y, 3, vermilion, 0.6, 1); blob(x, y - 2, 4, paper, 0.5, 2); }),
      ];
    },
    wheat() {
      const stalks = [], crows = [];
      for (let k = 0; k < 260; k++) stalks.push([size * rnd(), size * (0.5 + rnd() * 0.5), (rnd() - 0.5) * 12, -(10 + rnd() * 22), rnd() < 0.7 ? harvest : '#e0c15a']);
      for (let k = 0; k < 16; k++) crows.push([size * (0.1 + rnd() * 0.8), size * (0.08 + rnd() * 0.36), 7 + rnd() * 8]);
      const clouds = [];
      for (let k = 0; k < 40; k++) clouds.push([size * rnd(), size * rnd() * 0.45, 12 + rnd() * 30]);
      return [
        () => { wash('#233a7a', 1); blob(size * 0.5, size * 0.1, size * 0.5, '#0e1a44', 0.5, 4); },
        ...chunk(clouds, 8, ([x, y, l]) => stroke(x, y, x + l, y + 2, 2.6, '#5a74b8', 0.5)),
        () => { c.globalAlpha = 1; c.fillStyle = harvest; c.fillRect(0, size * 0.48, size, size * 0.52); for (let k = 0; k < 30; k++) blob(rnd() * size, size * 0.48, size * 0.04, k % 2 ? harvest : '#5a74b8', 0.25, 2); for (let k = 0; k < 5; k++) stroke(size * 0.4 + k * 7, size, size * 0.58 + k * 4, size * 0.5, 5, moss, 0.55); },
        ...chunk(stalks, 20, ([x, y, dx, dy, col]) => stroke(x, y, x + dx, y + dy, 1.4, col, 0.8)),
        ...chunk(crows, 3, ([x, y, w]) => { stroke(x - w, y, x, y + w * 0.5, 2.2, carbon, 0.95); stroke(x, y + w * 0.5, x + w, y, 2.2, carbon, 0.95); }),
      ];
    },
    fuji() {
      const clouds = [], trees = [];
      for (let k = 0; k < 48; k++) clouds.push([size * rnd(), size * rnd() * 0.4, 10 + rnd() * 40]);
      for (let k = 0; k < 44; k++) trees.push([size * rnd(), size * (0.74 + rnd() * 0.26), 3 + rnd() * 7]);
      return [
        () => { wash('#2d5aa6', 1); },
        ...chunk(clouds, 8, ([x, y, l]) => stroke(x, y, x + l, y, 2.2, paper, 0.55)),
        () => { c.globalAlpha = 1; c.fillStyle = '#b8402b'; c.beginPath(); c.moveTo(-size * 0.1, size * 0.86); c.lineTo(size * 0.58, size * 0.2); c.lineTo(size * 1.15, size * 0.86); c.lineTo(size * 1.15, size); c.lineTo(-size * 0.1, size); c.fill(); c.fillStyle = paper; c.beginPath(); c.moveTo(size * 0.47, size * 0.32); for (let k = 0; k <= 8; k++) c.lineTo(size * (0.47 + k * 0.03), size * (0.32 + (k % 2) * 0.03 - 0.12 * Math.exp(-((k - 3.7) ** 2) / 3))); c.fill(); },
        () => { for (let k = 0; k < 10; k++) stroke(size * 0.58 - k * 6, size * 0.26 + k * 12, size * 0.5 - k * 10, size * 0.86, 1.2, '#7a2a1c', 0.5); },
        ...chunk(trees, 10, ([x, y, r]) => blob(x, y, r, '#2f4a2c', 0.9, 2)),
      ];
    },
    ridge() {
      const layers = [];
      for (let l = 0; l < 5; l++) { const pts = []; for (let x = -10; x <= size + 10; x += 12) pts.push([x, size * (0.35 + l * 0.12) + Math.sin(x / (30 + l * 10) + l * 3) * size * 0.06 + (rnd() - 0.5) * 8]); layers.push(pts); }
      const cols = ['#c9cfe0', '#9aa6cc', '#6a78ab', '#3f4f85', '#232e55'];
      return [
        () => { wash('#f0e6d2', 1); blob(size * 0.68, size * 0.3, size * 0.09, harvest, 0.9, 1); blob(size * 0.68, size * 0.3, size * 0.24, harvest, 0.1, 5); },
        ...chunk(layers, 1, (pts) => { const l = layers.indexOf(pts); c.globalAlpha = 1; c.fillStyle = cols[l]; c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.lineTo(size + 10, size + 10); c.lineTo(-10, size + 10); c.fill(); for (let i = 1; i < pts.length; i++) stroke(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], 1.2, l < 2 ? paper : '#0f1530', 0.5); for (let k = 0; k < 3; k++) blob(rnd() * size, pts[3][1] + size * 0.09, size * 0.1, paper, 0.07, 2); }),
        () => { for (let k = 0; k < 40; k++) blob(rnd() * size, size * (0.86 + rnd() * 0.14), 4 + rnd() * 5, '#1a2140', 0.9, 2); },
      ];
    },
    rain() {
      const drops = [], folk = [];
      for (let k = 0; k < 220; k++) drops.push([size * rnd(), size * rnd(), 14 + rnd() * 26]);
      for (let k = 0; k < 7; k++) folk.push([size * (0.15 + rnd() * 0.7), 0]);
      const bridge = (x) => size * (0.62 - Math.sin((x / size) * Math.PI) * 0.1);
      return [
        () => { wash('#c9c1a8', 1); c.globalAlpha = 1; c.fillStyle = '#26324f'; c.fillRect(0, 0, size, size * 0.2); for (let k = 0; k < 20; k++) stroke(rnd() * size, size * (0.15 + rnd() * 0.12), rnd() * size, size * (0.15 + rnd() * 0.12), 3, '#c9c1a8', 0.3); c.fillStyle = '#5b7d9a'; c.fillRect(0, size * 0.72, size, size * 0.28); for (let k = 0; k < 24; k++) stroke(rnd() * size, size * (0.7 + rnd() * 0.05), rnd() * size, size * (0.7 + rnd() * 0.05), 3, '#8fa3b3', 0.3); for (let k = 0; k < 16; k++) stroke(rnd() * size, size * (0.19 + rnd() * 0.03), rnd() * size, size * (0.19 + rnd() * 0.03), 3, '#26324f', 0.35); },
        () => { c.globalAlpha = 1; c.strokeStyle = '#3a2f24'; c.lineWidth = 5; c.beginPath(); for (let x = 0; x <= size; x += 6) x ? c.lineTo(x, bridge(x)) : c.moveTo(x, bridge(x)); c.stroke(); for (let x = size * 0.1; x < size; x += size * 0.2) stroke(x, bridge(x), x, size * 0.72, 3, '#3a2f24', 0.9); },
        ...chunk(folk, 1, ([x]) => { const y = bridge(x); blob(x, y - 10, 5, carbon, 0.95, 1); stroke(x, y - 8, x, y - 1, 2.4, carbon, 0.95); c.globalAlpha = 0.9; c.fillStyle = [vermilion, harvest, ultramarine][Math.floor(rnd() * 3)]; c.beginPath(); c.arc(x, y - 16, 8, Math.PI, 0); c.fill(); }),
        ...chunk(drops, 22, ([x, y, l]) => stroke(x, y, x - l * 0.25, y + l, 0.8, '#2a2f3a', 0.55)),
      ];
    },
    sunset() {
      const bands = ['#f2b16d', '#e88a5a', '#d15d48', '#8d3c5a', '#3a2a55'], ripples = [];
      for (let k = 0; k < 90; k++) ripples.push([size * rnd(), size * (0.6 + rnd() * 0.4), 10 + rnd() * 30]);
      return [
        () => { wash(bands[4], 1); bands.forEach((col, i) => { c.globalAlpha = 1; c.fillStyle = col; c.fillRect(0, size * (0.58 - i * 0.14), size, size * 0.15); }); blob(size * 0.5, size * 0.55, size * 0.13, '#ffd27a', 0.95, 1); blob(size * 0.5, size * 0.55, size * 0.3, '#ffd27a', 0.12, 5); c.globalAlpha = 1; c.fillStyle = '#2a3552'; c.fillRect(0, size * 0.58, size, size * 0.42); },
        ...chunk(ripples, 8, ([x, y, l]) => stroke(x, y, x + l, y, 1.4, Math.abs(x + l / 2 - size / 2) < size * 0.12 ? '#ffd27a' : '#6f7fb0', 0.55)),
        () => { for (let k = 0; k < 6; k++) { const x = size * (0.1 + rnd() * 0.8), y = size * (0.2 + rnd() * 0.25), w = 4 + rnd() * 5; stroke(x - w, y, x, y + w * 0.4, 1.4, '#2a1f3a', 0.75); stroke(x, y + w * 0.4, x + w, y, 1.4, '#2a1f3a', 0.75); } },
      ];
    },
    lanterns() {
      const lamps = [];
      for (let k = 0; k < 26; k++) lamps.push([rnd() * size, size * (0.3 + rnd()), 6 + rnd() * 8, [harvest, vermilion, blush][k % 3], 0.2 + rnd() * 0.5]);
      const village = [];
      for (let x = 0; x < size; x += 10 + rnd() * 16) village.push([x, 8 + rnd() * 18, rnd() < 0.5]);
      const scene = () => {
        wash('#171713', 0.95);
        c.globalAlpha = 1; c.fillStyle = '#f3eedc';
        c.beginPath(); c.arc(size * 0.8, size * 0.16, size * 0.05, 0, 7); c.fill();
        c.fillStyle = '#171713'; c.beginPath(); c.arc(size * 0.815, size * 0.145, size * 0.045, 0, 7); c.fill();
        village.forEach(([x, h, roof]) => {
          c.globalAlpha = 1; c.fillStyle = '#0d0d0b';
          c.beginPath();
          roof ? (c.moveTo(x, size), c.lineTo(x + 6, size - h), c.lineTo(x + 12, size)) : c.rect(x, size - h, 10, h);
          c.fill();
          c.globalAlpha = 0.9; c.fillStyle = harvest; c.fillRect(x + 4, size - h * 0.5, 2, 2);
        });
      };
      const steps = [scene];
      const loop = () => {
        scene();
        lamps.forEach((l) => {
          l[1] -= l[4]; if (l[1] < -20) l[1] = size + 20;
          const [x, y, r, col] = l;
          blob(x, y, r * 2.4, col, 0.06, 2);
          c.globalAlpha = 0.85; c.fillStyle = col;
          c.beginPath(); c.roundRect(x - r / 2, y - r * 0.7, r, r * 1.4, r / 4); c.fill();
          c.globalAlpha = 0.9; c.fillStyle = '#f3eedc'; c.fillRect(x - 1, y - 2, 2, 4);
        });
      };
      return Object.assign(steps, { loop });
    },
  };

  const list = canvas.dataset.paint === 'story'
    ? [...document.querySelectorAll('[data-scene]')].map((li) => ({ scene: li.dataset.scene, text: li.dataset.text, li }))
    : canvas.dataset.paint === 'random'
      ? (() => { const off = randoms.indexOf(canvas) * Math.ceil(order.length / randoms.length); return order.slice(off).concat(order.slice(0, off)).map((scene) => ({ scene })); })()
      : canvas.dataset.paint.split(',').map((scene) => ({ scene }));
  const caption = document.querySelector('[data-caption]');
  const hold = 4500;
  // Story plates advance with the reader's scroll; other plates cycle on a timer.
  const scrolly = canvas.dataset.paint === 'story' && 'IntersectionObserver' in window;
  let run = 0;
  let typing;

  const type = (text) => {
    clearInterval(typing);
    if (!caption) return;
    if (still) { caption.textContent = text; return; }
    let n = 0;
    caption.textContent = '';
    typing = setInterval(() => { caption.textContent = text.slice(0, ++n); if (n >= text.length) clearInterval(typing); }, 28);
  };

  const show = (k) => {
    const me = ++run;
    const item = list[k];
    list.forEach((it, i) => it.li && it.li.classList.toggle('is-active', i === k));
    if (item.text) type(item.text);
    paperWash();
    const steps = scenes[item.scene]();
    let i = 0;
    const next = () => fade(() => show((k + 1) % list.length));
    canvas.style.setProperty('--k', k);
    const tick = (t0) => {
      if (me !== run) return;
      if (still) { while (i < steps.length) steps[i++](); if (steps.loop) steps.loop(); return; }
      if (i < steps.length) { steps[i++](); requestAnimationFrame(() => tick(performance.now())); return; }
      if (steps.loop) {
        const go = (t) => { if (me !== run) return; steps.loop(); t - t0 < hold * 1.6 || scrolly ? requestAnimationFrame(go) : next(); };
        requestAnimationFrame(go);
      } else if (!scrolly) setTimeout(() => me === run && next(), hold);
    };
    const fade = (then) => {
      let n = 0;
      const f = () => { if (me !== run) return; wash(paper, 0.14); ++n < 24 ? requestAnimationFrame(f) : then(); };
      f();
    };
    tick(performance.now());
  };

  list.forEach((it, i) => it.li && it.li.addEventListener('click', () => show(i)));
  if (scrolly) {
    let cur = 0;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const k = list.findIndex((it) => it.li === e.target);
      if (e.isIntersecting && k !== cur) show((cur = k));
    }), { rootMargin: '-45% 0px -45% 0px' });
    list.forEach((it) => it.li && io.observe(it.li));
  }
  canvas.closest('section')?.classList.add('has-paint');
  show(0);
}
