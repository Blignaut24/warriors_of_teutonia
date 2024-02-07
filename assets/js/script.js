/*jshint esversion: 6 */

// ---------------------
// Define game icons
// ---------------------
// Each game icon is defined and an event listener is added to it. When an icon is clicked, the corresponding game character is selected.
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

// ---------------------
// Define score and choice elements
// ---------------------
// Here we're getting the DOM elements that will display the scores and choices of each player.
const playerScoreEl = document.getElementById("playerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoiceEl = document.getElementById("computerChoice");
const resultText = document.getElementById("resultText");

// ---------------------
// Define player and computer game icons
// ---------------------
// These constants hold the DOM elements for the game icons of each player.
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

// ---------------------
// Define game choices
// ---------------------
// This object defines the game mechanics. Each key is a game choice, and the corresponding value is an object that includes the name of the choice and an array of the choices it defeats.
const choices = {
  hammer: { name: "Hammer", defeats: ["shuriken", "dragon"] },
  shield: { name: "Shield", defeats: ["hammer", "wizard"] },
  shuriken: { name: "Shuriken", defeats: ["shield", "dragon"] },
  dragon: { name: "Dragon", defeats: ["shield", "wizard"] },
  wizard: { name: "Wizard", defeats: ["shuriken", "hammer"] },
};

// ---------------------
// Define initial scores
// ---------------------
// Initial scores for the player and computer are set to 0.
let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = "";

// ---------------------
// Function to reset selected icons
// ---------------------
// This function removes the "selected" class from all game icons and stops any running confetti animation.
function resetSelected() {
  allGameIcons.forEach((icons) => {
    icons.classList.remove("selected");
  });
  stopConfetti();
  removeConfetti();
}

// ---------------------
// Function to reset scores and playerChoice/computerChoice
// ---------------------
// This function resets the game by setting all scores and choices to their initial values and calling the resetSelected function.
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

// ---------------------
// Function for computer choice
// ---------------------
// This function generates a random choice for the computer.
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

// ---------------------
// Function to display computer's choice
// ---------------------
// This function updates the computer's choice in the DOM.
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

// ---------------------
// Function to update scores and display result
// ---------------------
// This function updates the scores and displays the result of the game.
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

// ---------------------
// Function to check the result
// ---------------------
// This function checks the result of the game by calling other functions.
function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// ---------------------
// Function to handle player's selection
// ---------------------
// This function handles the player's selection by calling the checkResult function and updating the DOM.
function select(playerChoice) {
  checkResult(playerChoice);
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

// ---------------------
// Set initial values on startup
// ---------------------
resetAll();

// ---------------------
// Rules Modal code snippet modified from the source: <https://www.w3schools.com/howto/howto_css_modals.asp>
// ---------------------

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("rulesBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
