// scripts/course.js

document.addEventListener('DOMContentLoaded', () => {
    // Course List Array as provided in the assignment
    const courses = [
        {
            "subject": "CSE",
            "number": 110,
            "title": "Introduction to Programming",
            "credits": 2,
            "completed": true
        },
        {
            "subject": "WDD",
            "number": 130,
            "title": "Web Fundamentals",
            "credits": 2,
            "completed": true // Example: This course is completed
        },
        {
            "subject": "CSE",
            "number": 111,
            "title": "Programming with Functions",
            "credits": 2,
            "completed": true
        },
        {
            "subject": "WDD",
            "number": 131,
            "title": "Dynamic Web Fundamentals",
            "credits": 2,
            "completed": true // Example: This course is completed
        },
        {
            "subject": "WDD",
            "number": 231,
            "title": "Frontend Web Development I",
            "credits": 2,
            "completed": false  // Set to true if you've completed this course
        },
        {
            "subject": "CSE",
            "number": 210,
            "title": "Programming with Classes",
            "credits": 2,
            "completed": true // Example: This course is completed
        },
        {
            "subject": "WDD",
            "number": 231,
            "title": "Frontend Web Development I",
            "credits": 2,
            "completed": false // Set to true if you've completed this course
        },
        {
            "subject": "CSE",
            "number": 210,
            "title": "Programming with Classes",
            "credits": 2,
            "completed": true // Example: This course is completed
        },
        {
            "subject": "WDD",
            "number": 331,
            "title": "Frontend Web Development II",
            "credits": 2,
            "completed": false
        },
        {
            "subject": "CSE",
            "number": 341,
            "title": "Web Backend Development",
            "credits": 3,
            "completed": false
        },
        {
            "subject": "CSE",
            "number": 450,
            "title": "Data Science",
            "credits": 3,
            "completed": false
        },
        {
            "subject": "CSE",
            "number": 310,
            "title": "Algorithms",
            "credits": 3,
            "completed": false
        },
        {
            "subject": "CSE",
            "number": 320,
            "title": "Introduction to Databases",
            "credits": 3,
            "completed": false
        },
        {
            "subject": "ITM",
            "number": 111,
            "title": "Introduction to Databases",
            "credits": 3,
            "completed": true
        },
        {
            "subject": "CSE",
            "number": 330,
            "title": "Computer Networks",
            "credits": 3,
            "completed": false
        },
        {
            "subject": "CSE",
            "number": 350,
            "title": "Software Engineering",
            "credits": 3,
            "completed": false
        }
    ];

    const courseCardsContainer = document.getElementById('course-cards-container');
    const totalCreditsValue = document.getElementById('total-credits-value');
    const filterButtons = document.querySelectorAll('.filter-button');

    /**
     * Displays course cards in the DOM based on the provided array of courses.
     * Clears existing cards before rendering new ones.
     * Applies 'completed' class for completed courses.
     * Calculates and displays the total credits for the currently displayed courses.
     * @param {Array<Object>} coursesToDisplay - An array of course objects to display.
     */
    function displayCourses(coursesToDisplay) {
        if (!courseCardsContainer) {
            console.error("Course cards container not found. Check HTML ID.");
            return;
        }

        // Clear existing cards
        courseCardsContainer.innerHTML = '';

        let currentTotalCredits = 0;

        if (coursesToDisplay.length === 0) {
            courseCardsContainer.innerHTML = '<p class="no-courses-message">No courses to display for this filter.</p>';
        } else {
            coursesToDisplay.forEach(course => {
                const card = document.createElement('div');
                card.classList.add('course-card');

                // Add 'completed' class if the course is marked as completed
                if (course.completed) {
                    card.classList.add('completed');
                }

                const title = document.createElement('h3');
                title.textContent = `${course.subject} ${course.number}: ${course.title}`;

                const credits = document.createElement('p');
                credits.textContent = `Credits: ${course.credits}`;

                const status = document.createElement('p');
                status.textContent = `Status: ${course.completed ? 'Completed' : 'Not Completed'}`;
                status.classList.add(course.completed ? 'status-completed' : 'status-not-completed');

                card.appendChild(title);
                card.appendChild(credits);
                card.appendChild(status);
                courseCardsContainer.appendChild(card);

                currentTotalCredits += course.credits;
            });
        }

        // Update total credits display
        if (totalCreditsValue) {
            totalCreditsValue.textContent = currentTotalCredits;
        } else {
            console.error("Total credits display element not found. Check HTML ID.");
        }
    }

    /**
     * Handles filtering of courses based on button clicks.
     * Filters the global 'courses' array and then calls displayCourses.
     * @param {string} filterType - 'all', 'wdd', or 'cse'.
     */
    function filterAndDisplayCourses(filterType) {
        let filteredCourses = [];
        switch (filterType) {
            case 'all':
                filteredCourses = courses;
                break;
            case 'wdd':
                filteredCourses = courses.filter(course => course.subject === 'WDD');
                break;
            case 'cse':
                filteredCourses = courses.filter(course => course.subject === 'CSE');
                break;
            default:
                filteredCourses = courses; // Default to all if unknown filter
        }
        displayCourses(filteredCourses);
    }

    /**
     * Adds event listeners to filter buttons.
     * Manages active state of filter buttons.
     */
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            button.classList.add('active');

            // Get the filter type from the button's ID
            const filterType = button.id.replace('filter-', '');
            filterAndDisplayCourses(filterType);
        });
    });

    // Initial display of all courses when the page loads
    filterAndDisplayCourses('all');
});
