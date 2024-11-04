const words = {
    fruits: ["apple", "banana", "grape", "orange", "pear", "peach", "mango"],
    animals: ["cat", "dog", "elephant", "giraffe", "lion", "tiger", "zebra"]
};

let currentWord = "";
let score = 0;
let timeLeft = 10;
let timer;
let currentCategory = 'fruits';
let currentMode = 'jumble'; // Default game mode

function shuffleWord(word) {
    let shuffled = word.split('').sort(() => 0.5 - Math.random()).join('');
    return shuffled;
}

// Function to set the game mode
function setMode(mode) {
    currentMode = mode;
    score = 0;
    document.getElementById("score").innerText = `Score: ${score}`;
    
    // Display different instructions based on the mode
    const instructions = document.getElementById("instructions");
    if (mode === 'jumble') {
        instructions.innerText = "Unscramble the jumbled word!";
    } else if (mode === 'swap') {
        instructions.innerText = "Reorder the scrambled letters to form the correct word!";
    }

    setCategory(currentCategory); // Restart the game with the selected mode
}

// Function to set the word category
function setCategory(category) {
    currentCategory = category;
    score = 0;
    document.getElementById("score").innerText = `Score: ${score}`;

    setTimeout(() => {
        newRound();
    }, 3000);
}

function newRound() {
    const wordsList = words[currentCategory];
    currentWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    
    // Display jumbled or scrambled word based on the game mode
    if (currentMode === 'jumble') {
        document.getElementById("jumbled-word").innerText = shuffleWord(currentWord);
    } else if (currentMode === 'swap') {
        document.getElementById("jumbled-word").innerText = currentWord.split('').sort(() => 0.5 - Math.random()).join('');
    }
    
    document.getElementById("user-input").value = "";
    document.getElementById("feedback").innerText = "";
    clearInterval(timer);
    startTimer();
}

function startTimer() {
    timeLeft = 10;
    document.getElementById("time-left").innerText = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time-left").innerText = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! Final Score: " + score);
            score = 0;
            document.getElementById("score").innerText = `Score: ${score}`;
            newRound();
        }
    }, 1000);
}

function checkAnswer() {
    const userGuess = document.getElementById("user-input").value.toLowerCase();
    
    if (currentMode === 'jumble' && userGuess === currentWord) {
        handleCorrectAnswer();
    } else if (currentMode === 'swap' && userGuess === currentWord) {
        handleCorrectAnswer();
    } else {
        document.getElementById("feedback").innerText = "Try Again!";
    }
}

function handleCorrectAnswer() {
    score++;
    document.getElementById("feedback").innerText = "Correct!";
    document.getElementById("user-input").value = "";
    document.getElementById("score").innerText = `Score: ${score}`;
    setTimeout(newRound, 1000);
}

function stopGame() {
    clearInterval(timer);
    alert("Game stopped! Your final score is: " + score);
    score = 0;
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("feedback").innerText = "";
}

document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

window.onload = function() {
    document.getElementById("time-left").innerText = "Time left: 10s";
};
