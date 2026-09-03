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
