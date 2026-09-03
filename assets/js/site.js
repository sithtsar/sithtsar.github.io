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
