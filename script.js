// Arrays of words for different categories
const words = {
    fruits: ["apple", "banana", "grape", "orange", "pear", "peach", "mango"],
    animals: ["cat", "dog", "elephant", "giraffe", "lion", "tiger", "zebra"]
};

let currentWord = "";  // Store the current word to check against user input
let score = 0;         // Initialize score to 0
let timeLeft = 10;     // Set the timer for 10 seconds
let timer;             // Variable to hold the timer interval
let currentCategory = 'fruits'; // Default category

// Function to shuffle letters in the word
function shuffleWord(word) {
    let shuffled = word.split('').sort(() => 0.5 - Math.random()).join('');
    return shuffled;
}

// Function to set the word category
function setCategory(category) {
    currentCategory = category; // Set the current category
    score = 0; // Reset score for the new category
    document.getElementById("score").innerText = `Score: ${score}`; // Update score display
    newRound(); // Start a new round with the selected category
}

// Function to start a new round with a new jumbled word
function newRound() {
    const wordsList = words[currentCategory]; // Get the words for the current category
    currentWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    document.getElementById("jumbled-word").innerText = shuffleWord(currentWord);
    document.getElementById("user-input").value = "";
    document.getElementById("feedback").innerText = "";
    clearInterval(timer); // Clear any existing timer
    startTimer(); // Start the timer for the new round
}

// Function to start the countdown timer
function startTimer() {
    timeLeft = 10; // Reset time left to 10 seconds
    document.getElementById("time-left").innerText = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time-left").innerText = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! Final Score: " + score);
            score = 0; // Reset score after time runs out
            document.getElementById("score").innerText = `Score: ${score}`;
            newRound(); // Start a new round
        }
    }, 1000); // Update every second
}

// Function to check the user's guess
function checkAnswer() {
    const userGuess = document.getElementById("user-input").value;
    if (userGuess.toLowerCase() === currentWord) {  // Correct guess
        score++;
        document.getElementById("feedback").innerText = "Correct!";
        document.getElementById("user-input").value = ""; // Clear input for next guess
        setTimeout(newRound, 1000); // Move to the next round after 1 second
    } else {  // Incorrect guess
        document.getElementById("feedback").innerText = "Try Again!";
    }
    document.getElementById("score").innerText = `Score: ${score}`;
}

// Function to stop the game
function stopGame() {
    clearInterval(timer); // Clear the timer
    alert("Game stopped! Your final score is: " + score); // Alert final score
    score = 0; // Reset score
    document.getElementById("score").innerText = `Score: ${score}`; // Update score display
    document.getElementById("feedback").innerText = ""; // Clear feedback
}

// Add event listener to the input field for 'Enter' key
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkAnswer(); // Call the checkAnswer function
    }
});

// Start the first round when the page loads
window.onload = newRound;
