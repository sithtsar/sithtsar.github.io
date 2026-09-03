// ponytail: an N-body proxy for the scrapbook. Cards are boxes that push each other apart, drift home
// on a weak spring, and can be dragged. O(n^2) over twenty bodies is nothing; a grid would be theatre.
const board = document.querySelector('[data-scrap]');
if (board && matchMedia('(min-width: 48.01rem)').matches) {
  board.classList.add('is-sim');
  const string = board.querySelector('.string polyline');
  const PAD = 10, W = () => board.clientWidth, H = () => board.clientHeight;
  const bodies = [...board.querySelectorAll('.piece:not(.piece--deco)')].map((el) => {
    const x = (parseFloat(el.dataset.x ?? el.style.left) / 100) * W();
    const y = (parseFloat(el.dataset.y ?? el.style.top) / 100) * H();
    el.dataset.x = el.style.left; el.dataset.y = el.style.top;
    return { el, x, y, hx: x, hy: y, vx: 0, vy: 0, w: el.offsetWidth, h: el.offsetHeight, r: el.style.getPropertyValue('--r'), pin: el.classList.contains('has-pin'), drag: null };
  });
  const draw = () => {
    for (const b of bodies) b.el.style.transform = `translate(${b.x}px,${b.y}px) rotate(${b.r})`;
    const pins = bodies.filter((b) => b.pin);
    if (string && pins.length > 1) string.setAttribute('points', pins.map((b) => `${((b.x + b.w / 2) / W()) * 100},${(b.y / H()) * 100}`).join(' '));
  };
  let energy = 1, raf = 0;
  const step = () => {
    energy = 0;
    for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i], b = bodies[j];
      const dx = (b.x + b.w / 2) - (a.x + a.w / 2), dy = (b.y + b.h / 2) - (a.y + a.h / 2);
      const ox = (a.w + b.w) / 2 + PAD - Math.abs(dx), oy = (a.h + b.h) / 2 + PAD - Math.abs(dy);
      if (ox <= 0 || oy <= 0) continue;
      const k = 0.12;
      if (ox < oy) { const f = ox * k * Math.sign(dx || 1); if (!a.drag) a.vx -= f; if (!b.drag) b.vx += f; }
      else { const f = oy * k * Math.sign(dy || 1); if (!a.drag) a.vy -= f; if (!b.drag) b.vy += f; }
    }
    for (const b of bodies) {
      if (b.drag) { b.x = b.drag.x; b.y = b.drag.y; b.vx = b.vy = 0; continue; }
      if (settled) { b.vx += (b.hx - b.x) * 0.004; b.vy += (b.hy - b.y) * 0.004; }
      b.vx *= 0.84; b.vy *= 0.84;
      b.x = Math.max(0, Math.min(W() - b.w, b.x + b.vx)); b.y = Math.max(0, Math.min(H() - b.h, b.y + b.vy));
      energy += b.vx * b.vx + b.vy * b.vy;
    }
    draw();
    if (energy > 0.02 || bodies.some((b) => b.drag)) raf = requestAnimationFrame(step); else { raf = 0; settle(); }
  };
  const wake = () => { if (!raf) raf = requestAnimationFrame(step); };
  // Cards start wherever the seed threw them; after the first relaxation, where they landed is home.
  let settled = false;
  const settle = () => { if (settled) return; settled = true; for (const b of bodies) { b.hx = b.x; b.hy = b.y; } };
  for (const b of bodies) {
    b.el.addEventListener('pointerdown', (e) => {
      if (e.button) return;
      b.drag = { x: b.x, y: b.y, ox: e.clientX - b.x, oy: e.clientY - b.y };
      b.el.classList.add('is-drag'); b.el.setPointerCapture(e.pointerId); wake();
    });
    b.el.addEventListener('pointermove', (e) => { if (b.drag) { b.drag.x = e.clientX - b.drag.ox; b.drag.y = e.clientY - b.drag.oy; } });
    const drop = () => { if (!b.drag) return; b.hx = b.x; b.hy = b.y; b.drag = null; b.el.classList.remove('is-drag'); wake(); };
    b.el.addEventListener('pointerup', drop); b.el.addEventListener('pointercancel', drop);
  }
  addEventListener('resize', () => { for (const b of bodies) { b.w = b.el.offsetWidth; b.h = b.el.offsetHeight; } wake(); });
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still) { for (let i = 0; i < 240; i++) step(); cancelAnimationFrame(raf); raf = 0; settle(); draw(); } else wake();
}
