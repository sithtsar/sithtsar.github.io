// ponytail: a portrait in six inks. Every source pixel becomes one dab, painted in random order.
const cv = document.querySelector('canvas[data-portrait]');
if (cv) {
  const img = new Image();
  img.src = cv.dataset.src;
  img.decode().then(() => {
    const n = img.naturalWidth;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const size = cv.clientWidth || 320;
    cv.width = cv.height = size * dpr;
    const c = cv.getContext('2d');
    c.scale(dpr, dpr);
    const off = document.createElement('canvas');
    off.width = off.height = n;
    const o = off.getContext('2d');
    o.drawImage(img, 0, 0, n, n);
    const px = o.getImageData(0, 0, n, n).data;
    const ink = ['#171713', '#28559a', '#5d7147', '#c83f2a', '#d1a326', '#f3eedc'];
    // nobel: the Elmehed look, black brush and gold foil on cream.
    const nobel = cv.dataset.style === 'nobel';
    const pick = (r, g, b) => {
      const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
      const s = mx ? d / mx : 0;
      const h = !d ? 0 : mx === r ? ((g - b) / d + 6) % 6 * 60 : mx === g ? ((b - r) / d + 2) * 60 : ((r - g) / d + 4) * 60;
      if (nobel) return l < 0.3 ? ink[0] : l < 0.56 ? ink[4] : ink[5];
      if (l < 0.34) return ink[0];
      if (s < 0.16) return l < 0.55 ? ink[1] : ink[5];
      if (h > 180 && h < 300) return ink[1];
      if (h >= 70 && h <= 180) return ink[2];
      if (h < 40 || h > 300) return l < 0.5 ? ink[3] : ink[4];
      return l < 0.62 ? ink[4] : ink[5];
    };
    const cell = size / n;
    const order = Array.from({ length: n * n }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [order[i], order[j]] = [order[j], order[i]]; }
    c.fillStyle = ink[5];
    c.fillRect(0, 0, size, size);
    c.globalAlpha = 0.92;
    const dab = (i) => {
      const x = i % n, y = (i / n) | 0, q = i * 4;
      c.fillStyle = pick(px[q], px[q + 1], px[q + 2]);
      c.beginPath();
      c.ellipse(x * cell + cell / 2 + (Math.random() - 0.5) * cell * 0.5, y * cell + cell / 2 + (Math.random() - 0.5) * cell * 0.5, cell * (nobel ? 1.6 : 0.95), cell * (nobel ? 0.45 : 0.7), nobel ? -0.6 + (Math.random() - 0.5) * 0.4 : Math.random() * Math.PI, 0, Math.PI * 2);
      c.fill();
    };
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let k = 0;
    const step = () => {
      const end = Math.min(k + (still ? order.length : 160), order.length);
      while (k < end) dab(order[k++]);
      if (k < order.length) requestAnimationFrame(step);
    };
    step();
  });
}
