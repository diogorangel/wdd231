document.addEventListener('DOMContentLoaded', () => {
    const attractionsGrid = document.getElementById('attractions-grid');
    const visitMessageElement = document.getElementById('visit-message');

    // Function to fetch and display attractions
    async function getAttractions() {
        try {
            // Adjust path based on your exact file structure.
            // If discover.html is in 'chamber/' and discover.json is in 'data/',
            // then the path from discover.html to discover.json is '../data/discover.json'.
            const response = await fetch('data/discover.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const attractions = await response.json();
            displayAttractions(attractions);
        } catch (error) {
            console.error('Error fetching attractions:', error);
            attractionsGrid.innerHTML = '<p class="text-red-500">Failed to load attractions. Please try again later.</p>';
        }
    }

    // Function to display attractions
    function displayAttractions(attractions) {
        attractionsGrid.innerHTML = ''; // Clear existing content
        attractions.forEach(attraction => {
            const card = document.createElement('div');
            card.classList.add('attraction-card'); // Tailwind classes for styling

            card.innerHTML = `
                <h2>${attraction.name}</h2>
                <figure>
                    <img src="${attraction.image}" alt="${attraction.name}" loading="lazy" width="300" height="200" onerror="this.onerror=null;this.src='https://placehold.co/300x200/cccccc/333333?text=Image+Not+Found';">
                </figure>
                <div class="card-content">
                    <address>${attraction.address}</address>
                    <p>${attraction.membershipLevel}</p>
                    <p>${attraction.tagline}</p>
                    <button class="learn-more-btn">Learn More</button>
                </div>
            `;
            attractionsGrid.appendChild(card);
        });
    }

    // Function to handle last visit message
    function displayLastVisitMessage() {
        const lastVisit = localStorage.getItem('lastVisitDate');
        const now = Date.now(); // Current time in milliseconds

        if (!lastVisit) {
            // First visit
            visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const lastVisitTime = parseInt(lastVisit, 10);
            const timeDifference = now - lastVisitTime; // Difference in milliseconds

            const millisecondsInADay = 24 * 60 * 60 * 1000;
            const daysDifference = Math.floor(timeDifference / millisecondsInADay);

            if (daysDifference < 1) {
                // Less than a day
                visitMessageElement.textContent = "Back so soon! Awesome!";
            } else {
                // More than a day
                const dayText = daysDifference === 1 ? 'day' : 'days';
                visitMessageElement.textContent = `You last visited ${daysDifference} ${dayText} ago.`;
            }
        }
        // Update last visit date for the current visit
        localStorage.setItem('lastVisitDate', now.toString());
    }

    // Initialize functions
    getAttractions();
    displayLastVisitMessage();
});
