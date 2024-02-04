import {
  startConfetti,
  stopConfetti,
  removeConfetti,
} from "assets/js/confetti.js";

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

const playerScoreEl = document.getElementById("playerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoiceEl = document.getElementById("computerChoice");
const resultText = document.getElementById("resultText");

const playerHammer = document.getElementById("playerHammer");
const playerShield = document.getElementById("playerShield");
const playerShuriken = document.getElementById("playerShuriken");
const playerDragon = document.getElementById("playerDragon");
const playerWizard = document.getElementById("playerWizard");

const computerHammer = document.getElementById("computerHammer");
const computerShield = document.getElementById("computerShield");
const computerShuriken = document.getElementById("computerShuriken");
const computerDragon = document.getElementById("computerDragon");
const computerWizard = document.getElementById("computerWizard");

const allGameIcons = document.querySelectorAll(".fa-sharp");

const choices = {
  hammer: { name: "Hammer", defeats: ["shuriken", "dragon"] },
  shield: { name: "Shield", defeats: ["hammer", "wizard"] },
  shuriken: { name: "Shuriken", defeats: ["shield", "dragon"] },
  dragon: { name: "Dragon", defeats: ["shield", "wizard"] },
  wizard: { name: "Wizard", defeats: ["shuriken", "hammer"] },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = "";

// Reset all selected' icons
function resetSelected() {
  allGameIcons.forEach((icons) => {
    icons.classList.remove("selected");
  });
  stopConfetti();
  removeConfetti();
}

// Reset Score & playerChoice/computerChoice
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

// Random computer choice
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

// Add 'selected' styling & computerChoice
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

//Check result, increase scores, update resultText
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

// Call function to process turn
function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// Passing Player selection value and styling icons
function select(playerChoice) {
  console.log("select invoked : ", playerChoice);
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

//On startup, set initial  values
resetAll();
