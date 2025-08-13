document.addEventListener('DOMContentLoaded', () => {
    const attractionsGrid = document.getElementById('attractions-grid');
    const visitMessageElement = document.getElementById('visit-message');
    
    // Novo código para o menu hambúrguer
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Função para buscar e exibir atrações
    async function getAttractions() {
        try {
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

    // Função para exibir atrações
    function displayAttractions(attractions) {
        attractionsGrid.innerHTML = ''; 
        attractions.forEach(attraction => {
            const card = document.createElement('div');
            card.classList.add('attraction-card');

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

    // Função para lidar com a mensagem da última visita
    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        // Format the date as desired (e.g., MM/DD/YYYY HH:MM:SS)
        const lastModifiedDate = new Date(document.lastModified);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // Use 24-hour format
        };
        lastModifiedSpan.textContent = lastModifiedDate.toLocaleDateString('en-US', options);
    }

    // Inicializar funções
    getAttractions();
    displayLastVisitMessage();
});