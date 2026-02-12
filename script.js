let secretNumber;
let attempts = 0;
let playerName = "";
let leaderboard = []; 

const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const feedback = document.getElementById("feedback");
const attemptsCount = document.getElementById("attemptsCount");
const leaderboardBody = document.getElementById("leaderboardBody");


function initializeGame() {
  playerName = prompt("Enter your name:") || "Unknown Player";
  playerName = playerName.trim();
  if (playerName === "") playerName = "Unknown Player";

  secretNumber = Math.floor(Math.random() * 100) + 1;

  attempts = 0;
  attemptsCount.textContent = attempts;
  feedback.textContent = "Start guessing...";
  feedback.style.color = "";

  guessInput.value = "";
  guessInput.disabled = false;
  submitBtn.disabled = false;

  renderLeaderboard();
}

function checkGuess() {
  const guess = Number(guessInput.value);

  if (!guessInput.value || isNaN(guess)) {
    feedback.textContent = "Please enter a valid number.";
    return;
  }
  if (guess < 1 || guess > 100) {
    feedback.textContent = "Your guess must be between 1 and 100.";
    return;
  }

  attempts++;
  attemptsCount.textContent = attempts;

  if (guess > secretNumber) {
    feedback.textContent = "Too High";
  } else if (guess < secretNumber) {
    feedback.textContent = "Too Low";
  } else {
    feedback.textContent = "Correct! You guessed the number!";

    alert("Congratulations " + playerName + "! You guessed it in " + attempts + " attempts.");

    updateLeaderboard(playerName, attempts);

    guessInput.disabled = true;
    submitBtn.disabled = true;
  }

  guessInput.value = "";
  guessInput.focus();
}

function updateLeaderboard(name, tries) {
  leaderboard.unshift({ name: name, attempts: tries }); 

  if (leaderboard.length > 3) {
    leaderboard.pop();
  }

  renderLeaderboard();
}

function renderLeaderboard() {
  leaderboardBody.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const tr = document.createElement("tr");

    const tdRank = document.createElement("td");
    tdRank.textContent = i + 1;

    const tdName = document.createElement("td");
    const tdAttempts = document.createElement("td");

    if (leaderboard[i]) {
      tdName.textContent = leaderboard[i].name;
      tdAttempts.textContent = leaderboard[i].attempts;
    } else {
      tdName.textContent = "-";
      tdAttempts.textContent = "-";
    }

    tr.appendChild(tdRank);
    tr.appendChild(tdName);
    tr.appendChild(tdAttempts);

    leaderboardBody.appendChild(tr);
  }
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;

  attemptsCount.textContent = attempts;
  feedback.textContent = "Game reset. Start guessing...";
  feedback.style.color = "";

  guessInput.value = "";
  guessInput.disabled = false;
  submitBtn.disabled = false;

  playerName = prompt("Enter your name for this round:") || "Unknown Player";
  playerName = playerName.trim();
  if (playerName === "") playerName = "Unknown Player";
}

submitBtn.onclick = checkGuess;
resetBtn.onclick = resetGame;

window.onload = initializeGame;
