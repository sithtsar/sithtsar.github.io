// ponytail: one small painting engine. Scenes are lists of steps painted one per frame, then held,
// then washed out. Nothing runs during a hold. Reduced motion paints instantly and never auto-advances.
const canvas = document.querySelector('canvas[data-paint]');
if (canvas) {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const size = canvas.clientWidth || 320;
  canvas.width = canvas.height = size * dpr;
  const c = canvas.getContext('2d');
  c.scale(dpr, dpr);
  c.lineCap = 'round';

  let seed = 1520;
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
