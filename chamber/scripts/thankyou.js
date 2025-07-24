document.addEventListener('DOMContentLoaded', function() {
    // JavaScript to parse URL parameters and display data
    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById('display-fname').textContent = urlParams.get('fname') || 'N/A';
    document.getElementById('display-lname').textContent = urlParams.get('lname') || 'N/A';
    document.getElementById('display-email').textContent = urlParams.get('email') || 'N/A';
    document.getElementById('display-phone').textContent = urlParams.get('phone') || 'N/A';
    document.getElementById('display-bizname').textContent = urlParams.get('bizname') || 'N/A';

    const timestamp = urlParams.get('timestamp');
    if (timestamp) {
        try {
            const date = new Date(timestamp);
            document.getElementById('display-timestamp').textContent = date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false // Use 24-hour format
            });
        } catch (e) {
            document.getElementById('display-timestamp').textContent = timestamp + ' (Invalid Format)';
        }
    } else {
        document.getElementById('display-timestamp').textContent = 'N/A';
    }

    // Set copyright year and last modified date for footer
    const currentYear = new Date().getFullYear();
    document.getElementById('copyright-year').textContent = currentYear;

    const lastModified = new Date(document.lastModified);
    document.getElementById('last-modified').textContent = lastModified.toLocaleDateString();
});