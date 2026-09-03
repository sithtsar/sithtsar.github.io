const status = document.querySelector('[data-copy-status]');

document.addEventListener('click', async ({ target }) => {
  const button = target.closest('[data-copy]');
  if (!button) return;

  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    button.textContent = 'Copied';
    status.textContent = 'Copied to clipboard.';
  } catch {
    status.textContent = 'Copy unavailable. Select the visible address.';
  }
});

const root = document.documentElement;
const toggle = document.querySelector('[data-theme-toggle]');
const isInk = () => root.dataset.theme === 'ink' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
const label = () => { if (toggle) toggle.textContent = isInk() ? 'Paper' : 'Ink'; };
label();
toggle?.addEventListener('click', () => {
  root.dataset.theme = isInk() ? 'paper' : 'ink';
  try { localStorage.theme = root.dataset.theme; } catch {}
  label();
});

// The archive year: its last digit dissolves to the year of whatever is in view.
const digit = document.querySelector('[data-digit]');
if (digit && 'IntersectionObserver' in window) {
  let cur = digit.textContent;
  let timer;
  const io = new IntersectionObserver((entries) => {
    const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!hit) return;
    const next = hit.target.dataset.year.slice(-1);
    if (next === cur) return;
    cur = next;
    digit.classList.add('is-out');
    clearTimeout(timer);
    timer = setTimeout(() => { digit.textContent = next; digit.classList.remove('is-out'); }, 450);
  }, { rootMargin: '-30% 0px -50% 0px' });
  document.querySelectorAll('[data-year]').forEach((el) => io.observe(el));
}

// Local time at the home base, refreshed once a minute.
const clock = document.querySelector('[data-clock]');
if (clock) {
  const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: clock.dataset.tz, hour: '2-digit', minute: '2-digit' });
  const tick = () => { clock.textContent = fmt.format(new Date()); };
  tick();
  setInterval(tick, 30000);
}
