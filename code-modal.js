// Code block modal functionality
(function() {
  // Create modal HTML
  const modal = document.createElement('div');
  modal.className = 'code-modal-overlay';
  modal.id = 'code-modal';
  modal.innerHTML = `
    <div class="code-modal-content">
      <div class="code-modal-header">
        <h2 class="code-modal-title">Code</h2>
        <button class="code-modal-close" aria-label="Close modal">&times;</button>
      </div>
      <div class="code-modal-body">
        <pre id="code-modal-code"><code></code></pre>
      </div>
      <div class="code-modal-footer">
        <button class="code-modal-copy-btn">Copy Code</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Get references
  const modalOverlay = document.getElementById('code-modal');
  const closeBtn = modal.querySelector('.code-modal-close');
  const copyBtn = modal.querySelector('.code-modal-copy-btn');
  const codeDisplay = modal.querySelector('#code-modal-code');

  // Close modal on close button
  closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });

  // Close modal on overlay click (but not on content click)
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      modalOverlay.classList.remove('active');
    }
  });

  // Copy button functionality
  copyBtn.addEventListener('click', async () => {
    const codeText = codeDisplay.textContent;
    try {
      await navigator.clipboard.writeText(codeText);
      copyBtn.textContent = 'Copied!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = 'Copy Code';
        copyBtn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  });

  // Function to add expand buttons
  function addExpandButtons() {
    const codeBlocks = document.querySelectorAll('.sourceCode');
    console.log('Found', codeBlocks.length, 'code blocks');

    codeBlocks.forEach((block) => {
      // Skip if already has expand button
      if (block.hasAttribute('data-expand-added')) return;
      block.setAttribute('data-expand-added', 'true');

      // Get the code content
      const codeContent = block.querySelector('code');
      if (!codeContent) return;

      // Find the scaffold and copy button
      let scaffold = block.parentElement;
      let copyButton = null;

      if (scaffold && scaffold.classList.contains('code-copy-outer-scaffold')) {
        // Look for copy button after the scaffold
        copyButton = scaffold.nextElementSibling;

        // Make sure the scaffold and its parent are positioned correctly
        scaffold.style.position = 'relative';
        scaffold.style.display = 'block';

        // Make the parent container position: relative for absolute positioning
        let parent = scaffold.parentElement;
        if (parent && getComputedStyle(parent).position === 'static') {
          parent.style.position = 'relative';
        }
      }

      // Create expand button
      const expandBtn = document.createElement('button');
      expandBtn.className = 'code-expand-button';
      expandBtn.innerHTML = '⛶ Expand';
      expandBtn.setAttribute('aria-label', 'View code in fullscreen');
      expandBtn.type = 'button';
      expandBtn.title = 'View full code in modal';

      // Insert expand button right before copy button
      if (copyButton) {
        copyButton.parentElement.insertBefore(expandBtn, copyButton);
      } else if (scaffold) {
        scaffold.parentElement.insertBefore(expandBtn, scaffold.nextSibling);
      }

      expandBtn.addEventListener('click', (e) => {
        e.preventDefault();
        codeDisplay.textContent = codeContent.textContent;
        modalOverlay.classList.add('active');
        copyBtn.textContent = 'Copy Code';
        copyBtn.classList.remove('copied');
      });
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addExpandButtons);
  } else {
    addExpandButtons();
  }

  // Also run on mutation in case content is added dynamically
  const observer = new MutationObserver(addExpandButtons);
  observer.observe(document.body, { childList: true, subtree: true });
})();
