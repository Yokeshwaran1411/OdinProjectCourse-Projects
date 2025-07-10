let winner = "";
let choiceJson = null;
let playerChoice = "";
let computerChoice = null;
async function loadChoices() {
  try {
    const response = await fetch("./choice.json");
    choiceJson = await response.json();
    console.log("✅ Loaded choices:", choiceJson);
  } catch (error) {
    console.error("Error loading choices:", error);
  }
}

loadChoices();

function clicked(selectedElement) {
  document.querySelectorAll(".choice").forEach((choice) => {
    choice.classList.remove("selected");
  });

  selectedElement.classList.add("selected");

  const emoji = selectedElement.textContent;
  const symbol = selectedElement.getAttribute("data-symbol");

  playerChoice = symbol;
  document.getElementById("playerChoice").textContent = emoji;
}

function resetFucntion() {
  const selected = document.querySelector(".choice.selected");
  if (selected) {
    selected.classList.remove("selected");
  }
  playerChoice = "";
  computerChoice = null;
  document.getElementById("playerChoice").textContent = "";
  document.getElementById("computerChoice").textContent = "";
}

function getComputerChoice() {
  if (!choiceJson) {
    alert("Choices not loaded yet!");
    return;
  }
  const randomIndex = Math.floor(Math.random() * choiceJson.length);
  computerChoice = choiceJson[randomIndex];
}

function selectWinner() {
  getComputerChoice();

  if (playerChoice === "" || computerChoice === null) {
    alert("Player or Computer has not selected a choice. Try again.");
    return;
  }

  const computerItem = computerChoice.Item;
  let winner = "";

  if (
    (playerChoice === "Rock" && computerItem === "Scissors") ||
    (playerChoice === "Scissors" && computerItem === "Paper") ||
    (playerChoice === "Paper" && computerItem === "Rock")
  ) {
    winner = "Player Wins!";
  } else if (playerChoice === computerItem) {
    winner = "It's a draw!";
  } else {
    winner = "Computer Wins!";
  }

  document.getElementById("computerChoice").textContent = computerChoice.Emoji;

  // Show toast
  const toast = document.getElementById("resultToast");
  const toastText = document.getElementById("toastText");

  toastText.textContent = winner;
  toast.classList.remove("hidden");
  toast.classList.add("show");

  // Auto-hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 400);
    document.getElementById("computerChoice").innerHTML = "";
    resetFucntion();
  }, 2000);
}
