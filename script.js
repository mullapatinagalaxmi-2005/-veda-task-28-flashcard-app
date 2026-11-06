
const originalCards = [
    {
        question: "What does HTML stand for?",
        answer: "HyperText Markup Language."
    },
    {
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheets."
    },
    {
        question: "What is JavaScript?",
        answer: "JavaScript is a programming language used to make websites interactive."
    },
    {
        question: "What is an Array?",
        answer: "An array is a data structure used to store multiple values in one variable."
    },
    {
        question: "What is a Function?",
        answer: "A function is a reusable block of code that performs a specific task."
    },
    {
        question: "What is DOM?",
        answer: "DOM stands for Document Object Model. It represents the structure of an HTML document."
    },
    {
        question: "What is Responsive Web Design?",
        answer: "It is a design approach that makes websites work on mobiles, tablets and desktops."
    },
    {
        question: "What is GitHub?",
        answer: "GitHub is a platform used to store, manage and collaborate on code projects."
    },
    {
        question: "What is CSS Flexbox?",
        answer: "Flexbox is a CSS layout system used to arrange elements in rows or columns."
    },
    {
        question: "What is an API?",
        answer: "API stands for Application Programming Interface. It allows different software applications to communicate."
    }
];

let cards = [...originalCards];
let currentIndex = 0;
let isFlipped = false;

const flashcard = document.getElementById("flashcard");
const question = document.getElementById("question");
const answer = document.getElementById("answer");

const cardNumber = document.getElementById("cardNumber");
const status = document.getElementById("status");
const progressBar = document.getElementById("progressBar");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const flipBtn = document.getElementById("flipBtn");

const shuffleBtn = document.getElementById("shuffleBtn");
const resetBtn = document.getElementById("resetBtn");

const cardContainer = document.getElementById("cardContainer");
const message = document.getElementById("message");

// Display current flashcard
function displayCard() {
    flashcard.classList.remove("flipped");
    isFlipped = false;

    question.textContent = cards[currentIndex].question;
    answer.textContent = cards[currentIndex].answer;

    cardNumber.textContent =
        `Card ${currentIndex + 1} of ${cards.length}`;

    status.textContent = "Question";

    progressBar.style.width =
        `${((currentIndex + 1) / cards.length) * 100}%`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;

    if (currentIndex === cards.length - 1) {
        message.textContent = "🎉 You reached the last card!";
    } else {
        message.textContent = "Keep learning and enjoy your flashcards!";
    }
}

// Flip flashcard
function flipCard() {
    isFlipped = !isFlipped;

    flashcard.classList.toggle("flipped", isFlipped);

    status.textContent = isFlipped ? "Answer" : "Question";
}

// Next card
function nextCard() {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        displayCard();
    }
}

// Previous card
function previousCard() {
    if (currentIndex > 0) {
        currentIndex--;
        displayCard();
    }
}

// Shuffle cards
function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    currentIndex = 0;
    displayCard();

    message.textContent = "🔀 Cards shuffled successfully!";
}

// Reset deck
function resetDeck() {
    cards = [...originalCards];
    currentIndex = 0;
    displayCard();

    message.textContent = "Deck reset successfully!";
}

// Button events
flashcard.addEventListener("click", flipCard);
cardContainer.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        flipCard();
    }
});

prevBtn.addEventListener("click", previousCard);
nextBtn.addEventListener("click", nextCard);
flipBtn.addEventListener("click", flipCard);

shuffleBtn.addEventListener("click", shuffleCards);
resetBtn.addEventListener("click", resetDeck);

// Keyboard navigation
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        nextCard();
    } else if (event.key === "ArrowLeft") {
        previousCard();
    }
});

// Initial display
displayCard();
