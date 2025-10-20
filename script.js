// Get the container where the cards will be displayed
const containerElement = document.querySelector('.deck');

/**
 * Class representing a Harry Potter Trading Card.
 * Fulfills Requirement 2.
 */
class Card {
    constructor(data) {
        // Define the card's properties
        this.name = data.name;
        this.house = data.house;
        this.specialty = data.specialty;
        this.image = data.image;
    }

    /**
     * Creates and returns the HTML element for the card.
     * @returns {HTMLElement} The created card DOM element.
     */
    createElement() {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-name', this.name); // Useful for styling or targeting

        // Use template literals to create the inner HTML structure
        cardElement.innerHTML = `
            <img src="${this.image}" alt="${this.name}" class="card-image">
            <h2>${this.name}</h2>
            <p>Specialty: ${this.specialty}</p>
            <p class="house">House: ${this.house}</p>
        `;

        return cardElement;
    }
}


async function getData() {
    try {
        // Use fetch() to load the JSON data
        const response = await fetch('data.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Convert the response into an array of JavaScript objects
        const cardData = await response.json();

        // Loop through the data and create Card instances
        const cards = cardData.map(data => new Card(data));

        displayCards(cards);

    } catch (error) {
        console.error('Could not fetch card data:', error);
        // Display an error message to the user
        containerElement.innerHTML = `<p style="color: red;">Failed to load cards. Make sure your local server is running and data.json exists.</p>`;
    }
}


function displayCards(cards) {
    if (!cards || cards.length === 0) {
        containerElement.innerHTML = `<p>No cards to display.</p>`;
        return;
    }

    // Append each card to the page
    cards.forEach((card, index) => {
        const cardElement = card.createElement();
        containerElement.appendChild(cardElement);

        // GSAP Animation
        // Staggered fade-in animation
        gsap.to(cardElement, {
            opacity: 1, // Fade in
            y: 0,       // Move back to original position (if starting off-screen)
            duration: 1,
            delay: index * .50, // Stagger the start time for each card
            ease: "power2.out"
        });
    });
}

// Call your functions here to start the process
getData();