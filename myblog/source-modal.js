// Raw markdown source modal functionality.
// Pairs with source-button.lua: turns the rendered ".source-md-button" into a
// modal that shows the post's raw markdown with copy / download actions.
(function() {
  // Create modal HTML (reuses the .code-modal-* styling for visual consistency).
  const modal = document.createElement('div');
  modal.className = 'code-modal-overlay source-modal-overlay';
  modal.id = 'source-modal';
  modal.innerHTML = `
    <div class="code-modal-content">
      <div class="code-modal-header">
        <h2 class="code-modal-title">Markdown source</h2>
        <button class="code-modal-close" aria-label="Close modal">&times;</button>
      </div>
      <div class="code-modal-body">
        <pre id="source-modal-code"><code></code></pre>
      </div>
      <div class="code-modal-footer">
        <button class="code-modal-copy-btn source-modal-download-btn">Download .md</button>
        <button class="code-modal-copy-btn source-modal-copy-btn">Copy Markdown</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const overlay = modal;
  const closeBtn = modal.querySelector('.code-modal-close');
  const copyBtn = modal.querySelector('.source-modal-copy-btn');
  const downloadBtn = modal.querySelector('.source-modal-download-btn');
  const codeDisplay = modal.querySelector('#source-modal-code code');

  let currentMarkdown = '';

  function closeModal() {
    overlay.classList.remove('active');
  }

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(currentMarkdown);
      copyBtn.textContent = 'Copied!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = 'Copy Markdown';
        copyBtn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy markdown:', err);
    }
  });

  // Derive a sensible download filename from the post's URL.
  function postSlug() {
    const parts = window.location.pathname.split('/').filter(Boolean);
    let last = parts.length ? parts[parts.length - 1] : 'index';
    if (last.endsWith('.html')) last = last.slice(0, -5);
    if ((last === 'index' || last === '') && parts.length >= 2) {
      last = parts[parts.length - 2];
    }
    return last || 'post';
  }

  downloadBtn.addEventListener('click', () => {
    const blob = new Blob([currentMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = postSlug() + '.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  function wireButtons() {
    document.querySelectorAll('.source-md-button').forEach((btn) => {
      if (btn.hasAttribute('data-source-wired')) return;
      btn.setAttribute('data-source-wired', 'true');

      const wrapper = btn.closest('.source-button-wrapper');
      const content = wrapper ? wrapper.querySelector('.source-md-content') : null;

      btn.addEventListener('click', () => {
        currentMarkdown = content ? content.textContent : '';
        codeDisplay.textContent = currentMarkdown;
        overlay.classList.add('active');
        copyBtn.textContent = 'Copy Markdown';
        copyBtn.classList.remove('copied');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireButtons);
  } else {
    wireButtons();
  }

  // Handle any content added dynamically after initial load.
  const observer = new MutationObserver(wireButtons);
  observer.observe(document.body, { childList: true, subtree: true });
})();
