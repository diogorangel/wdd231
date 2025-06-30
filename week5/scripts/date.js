// scripts/date.js

/**
 * Dynamically sets the current year in the HTML element with id "currentyear".
 */
document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});

/**
 * Dynamically sets the last modified date of the document in the HTML element with id "lastModified".
 */
document.addEventListener('DOMContentLoaded', () => {
    const lastModifiedP = document.getElementById('lastModified');
    if (lastModifiedP) {
        lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
    }
});
