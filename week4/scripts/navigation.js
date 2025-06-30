// scripts/navigation.js

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const primaryNav = document.getElementById('primary-nav');

    /**
     * Toggles the 'open' class on the primary navigation menu.
     * This class is used by CSS to show/hide the navigation.
     */
    if (hamburgerMenu && primaryNav) {
        hamburgerMenu.addEventListener('click', () => {
            primaryNav.classList.toggle('open');
            // Update ARIA expanded attribute for accessibility
            const isExpanded = primaryNav.classList.contains('open');
            hamburgerMenu.setAttribute('aria-expanded', isExpanded);
        });
    } else {
        console.error("Hamburger menu or primary navigation not found. Check HTML IDs.");
    }

    /**
     * Adds 'active' class to the current page's navigation link.
     * This provides wayfinding.
     */
    const path = window.location.pathname;
    const page = path.split("/").pop(); // Gets the file name (e.g., index.html)

    const navLinks = primaryNav ? primaryNav.querySelectorAll('a') : [];
    navLinks.forEach(link => {
        // If the link's href matches the current page, add 'active' class
        if (link.getAttribute('href') === page || (page === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // Ensure other links are not active
        }
    });
});
