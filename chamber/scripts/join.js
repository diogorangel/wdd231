document.addEventListener('DOMContentLoaded', function() {
    // Timestamp for hidden form field
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString();
    }

    // Modal functionality
    const detailsLinks = document.querySelectorAll('.details-link');
    const closeButtons = document.querySelectorAll('.close-button');
    const modals = document.querySelectorAll('.modal');

    // Open modal when "Learn More" link is clicked
    detailsLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior (e.g., jumping to top)
            const modalId = this.dataset.modal; // Get the ID of the modal to open
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex'; // Show modal using flex for centering
            }
        });
    });

    // Close modal when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none'; // Hide the parent modal
        });
    });

    // Close modal when clicking outside the modal content
    modals.forEach(modal => {
        window.addEventListener('click', function(event) {
            if (event.target == modal) { // If the click is directly on the modal overlay
                modal.style.display = 'none'; // Hide the modal
            }
        });
    });

    // Set copyright year and last modified date for footer
    const currentYear = new Date().getFullYear();
    document.getElementById('copyright-year').textContent = currentYear;

    const lastModified = new Date(document.lastModified);
    document.getElementById('last-modified').textContent = lastModified.toLocaleDateString();
});