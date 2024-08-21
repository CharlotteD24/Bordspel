// Laad bestaande bordspellen of initialiseert met een standaard lijst
let games = JSON.parse(localStorage.getItem('games')) || [
    {
        id: 1,
        name: "Catan",
        description: "Een strategisch bordspel waar spelers grondstoffen verzamelen en gebruiken om dorpen en steden te bouwen.",
        players: ["2-4 spelers"],
        duration: "60-120 minuten",
        difficulty: "Gemiddeld",
        reviews: ["Geweldig spel!", "Zeer verslavend."]
    },
    {
        id: 2,
        name: "Pandemic",
        description: "Een coöperatief bordspel waarin spelers samenwerken om de wereld te redden van uitbraken van ziektes.",
        players: ["2-4 spelers"],
        duration: "45-60 minuten",
        difficulty: "Makkelijk",
        reviews: ["Een uitdagend spel", "Geweldig om samen te spelen."]
    },
    // Voeg meer spellen toe indien gewenst
];

// Functie om de lijst van bordspellen te genereren
function generateGameList(filteredGames = games) {
    const gameList = document.getElementById('games-list');
    gameList.innerHTML = ''; // Maak de huidige lijst leeg
    filteredGames.forEach(game => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <a href="game.html?id=${game.id}" class="btn btn-secondary">Bekijk details</a>
        `;
        gameList.appendChild(listItem);
    });
}

// Functie om de details van een spel te tonen
function showGameDetails() {
    const params = new URLSearchParams(window.location.search);
    const gameId = parseInt(params.get('id'));
    const game = games.find(g => g.id === gameId);

    if (game) {
        document.getElementById('game-name').textContent = game.name;
        document.getElementById('game-description').textContent = game.description;

        const playersList = document.getElementById('players-list');
        playersList.innerHTML = '';
        game.players.forEach(player => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = player;
            playersList.appendChild(listItem);
        });

        // Voeg extra informatie toe
        document.getElementById('game-duration').textContent = `Speeltijd: ${game.duration}`;
        document.getElementById('game-difficulty').textContent = `Moeilijkheid: ${game.difficulty}`;
        const reviewsList = document.getElementById('game-reviews');
        reviewsList.innerHTML = '';
        game.reviews.forEach(review => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = review;
            reviewsList.appendChild(listItem);
        });
    } else {
        document.getElementById('game-name').textContent = 'Spel niet gevonden';
    }
}

// Functie om een nieuw spel toe te voegen
function addNewGame(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const players = document.getElementById('players').value.split(',');
    const duration = document.getElementById('duration').value;
    const difficulty = document.getElementById('difficulty').value;
    const reviews = document.getElementById('reviews').value.split(',');

    const newGame = {
        id: games.length + 1,
        name,
        description,
        players,
        duration,
        difficulty,
        reviews: reviews.filter(review => review.trim() !== '')
    };

    games.push(newGame);
    localStorage.setItem('games', JSON.stringify(games));
    generateGameList();
    document.getElementById('add-game-form').reset();
}

// Initialiseer pagina's
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('games-list')) {
        generateGameList();
        document.getElementById('search-input').addEventListener('input', (event) => {
            const searchText = event.target.value.toLowerCase();
            const filteredGames = games.filter(game => game.name.toLowerCase().includes(searchText));
            generateGameList(filteredGames);
        });
        document.getElementById('add-game-form').addEventListener('submit', addNewGame);
    } else if (document.getElementById('game-name')) {
        showGameDetails();
    }
});
