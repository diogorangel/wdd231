document.addEventListener('DOMContentLoaded', function() {
    // Timestamp for hidden form field
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString();
    }

    // Modal functionality
    const detailsButtons = document.querySelectorAll('.details-button');
    const closeButtons = document.querySelectorAll('.close-button');
    const modals = document.querySelectorAll('.modal');

    // Mapeia os IDs dos cartões para os IDs dos modais
    const modalMap = {
        'np-membership': 'modalNP',
        'bronze-membership': 'modalBronze',
        'silver-membership': 'modalSilver',
        'gold-membership': 'modalGold'
    };

    // Abre o modal correspondente quando o botão "Learn More" é clicado
    detailsButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); 
            const membershipCard = this.closest('.membership-card');
            const modalId = modalMap[membershipCard.id];
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex'; 
            }
        });
    });

    // Fecha o modal quando o botão de fechar (x) é clicado
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Fecha o modal quando o usuário clica fora do conteúdo do modal
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    });

      // Dark Mode Toggle (Optional, but included for completeness from header)
    const darkModeToggleBtn = document.querySelector('.dark-mode-toggle button');
    if (darkModeToggleBtn) {
        // Check for saved theme preference
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }

        darkModeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            // Save preference to localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Set copyright year and last modified date for footer
    const currentYear = new Date().getFullYear();
    document.getElementById('copyright-year').textContent = currentYear;

    const lastModified = new Date(document.lastModified);
    document.getElementById('last-modified').textContent = lastModified.toLocaleDateString();
});