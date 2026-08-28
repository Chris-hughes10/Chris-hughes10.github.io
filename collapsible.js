document.addEventListener('DOMContentLoaded', function() {
    const collapsibles = document.querySelectorAll('.collapsible');
    
    // Ensure all sections start expanded
    collapsibles.forEach(function(collapsible) {
        collapsible.classList.remove('collapsed');
        const content = collapsible.nextElementSibling;
        if (content && content.classList.contains('collapsible-content')) {
            content.classList.remove('collapsed');
        }
    });
    
    collapsibles.forEach(function(collapsible) {
        collapsible.addEventListener('click', function() {
            this.classList.toggle('collapsed');
            const content = this.nextElementSibling;
            
            if (content && content.classList.contains('collapsible-content')) {
                if (this.classList.contains('collapsed')) {
                    content.classList.add('collapsed');
                } else {
                    content.classList.remove('collapsed');
                }
            }
        });
    });
});
