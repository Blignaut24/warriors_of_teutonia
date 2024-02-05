
// Define game icons
const hammerIcon = document.getElementById("playerHammer");
hammerIcon.addEventListener("click", () => select("hammer"));
const shieldIcon = document.getElementById("playerShield");
shieldIcon.addEventListener("click", () => select("shield"));
const shurikenIcon = document.getElementById("playerShuriken");
shurikenIcon.addEventListener("click", () => select("shuriken"));
const dragonIcon = document.getElementById("playerDragon");
dragonIcon.addEventListener("click", () => select("dragon"));
const wizardIcon = document.getElementById("playerWizard");
wizardIcon.addEventListener("click", () => select("wizard"));

// Define score and choice elements
const playerScoreEl = document.getElementById("playerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoiceEl = document.getElementById("computerChoice");
const resultText = document.getElementById("resultText");

// Define player game icons
const playerHammer = document.getElementById("playerHammer");
const playerShield = document.getElementById("playerShield");
const playerShuriken = document.getElementById("playerShuriken");
const playerDragon = document.getElementById("playerDragon");
const playerWizard = document.getElementById("playerWizard");

// Define computer game icons
const computerHammer = document.getElementById("computerHammer");
const computerShield = document.getElementById("computerShield");
const computerShuriken = document.getElementById("computerShuriken");
const computerDragon = document.getElementById("computerDragon");
const computerWizard = document.getElementById("computerWizard");

// Define all game icons
const allGameIcons = document.querySelectorAll(".fa-sharp");

// Define game choices
const choices = {
  hammer: { name: "Hammer", defeats: ["shuriken", "dragon"] },
  shield: { name: "Shield", defeats: ["hammer", "wizard"] },
  shuriken: { name: "Shuriken", defeats: ["shield", "dragon"] },
  dragon: { name: "Dragon", defeats: ["shield", "wizard"] },
  wizard: { name: "Wizard", defeats: ["shuriken", "hammer"] },
};

// Define initial scores
let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = "";

// Function to reset selected' icons
function resetSelected() {
  allGameIcons.forEach((icons) => {
    icons.classList.remove("selected");
  });
  stopConfetti();
  removeConfetti();
}

// Function to reset score & playerChoice/computerChoice
function resetAll() {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = "";
  computerChoiceEl.textContent = "";
  resultText.textContent = "";
  resetSelected();
}

// Function for computer choice
function computerRandomChoice() {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.2) {
    computerChoice = "hammer";
  } else if (computerChoiceNumber <= 0.4) {
    computerChoice = "shield";
  } else if (computerChoiceNumber <= 0.6) {
    computerChoice = "shuriken";
  } else if (computerChoiceNumber <= 0.8) {
    computerChoice = "dragon";
  } else {
    computerChoice = "wizard";
  }
}

// Function to display computer's choice
function displayComputerChoice() {
  switch (computerChoice) {
    case "hammer":
      computerHammer.classList.add("selected");
      computerChoiceEl.textContent = " --- Hammer";
      break;
    case "shield":
      computerShield.classList.add("selected");
      computerChoiceEl.textContent = " --- Shield";
      break;
    case "shuriken":
      computerShuriken.classList.add("selected");
      computerChoiceEl.textContent = " --- Shuriken";
      break;
    case "dragon":
      computerDragon.classList.add("selected");
      computerChoiceEl.textContent = " --- Dragon";
      break;
    case "wizard":
      computerWizard.classList.add("selected");
      computerChoiceEl.textContent = " --- Wizard";
      break;
    default:
      break;
  }
}

// Function to update scores and display result
function updateScore(playerChoice) {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie.";
  } else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerChoice) > -1) {
      startConfetti();
      resultText.textContent = "You Won!";
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultText.textContent = "You Lost!";
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
}

// Function to check the result
function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// Function to handle player's selection
function select(playerChoice) {
  checkResult(playerChoice);
  // Add 'selected' styling & playerChoice
  switch (playerChoice) {
    case "hammer":
      playerHammer.classList.add("selected");
      playerChoiceEl.textContent = " --- Hammer";
      break;
    case "shield":
      playerShield.classList.add("selected");
      playerChoiceEl.textContent = " --- Shield";
      break;
    case "shuriken":
      playerShuriken.classList.add("selected");
      playerChoiceEl.textContent = " --- Shuriken";
      break;
    case "dragon":
      playerDragon.classList.add("selected");
      playerChoiceEl.textContent = " --- Dragon";
      break;
    case "wizard":
      playerWizard.classList.add("selected");
      playerChoiceEl.textContent = " --- Wizard";
      break;
    default:
      break;
  }
}

// Set initial values on startup
resetAll();
