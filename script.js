let randomValue = parseInt(Math.random() * 100 + 1);

const userInput = document.querySelector("#guessField");
const submit = document.querySelector("#subt");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const startOver = document.querySelector(".resultParas");
const lowOrHi = document.querySelector(".lowOrHi");

const p = document.createElement("p");

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    let guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please Enter a Valid Number");
  } else if (guess < 1) {
    alert("Please Enter a Valid Number");
  } else if (guess > 100) {
    alert("Please Enter a Valid Number");
  } else {
    prevGuess.push(guess);
    if (numGuess === 11) {
      cleanUpGuess(guess);
      displayMessage(`Game Over!!!<br> Random Value Was ${randomValue}`);
      endGame();
    } else {
      cleanUpGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomValue) {
    displayMessage(`You Guessed it Right`);
    endGame();
  } else if (guess < randomValue) {
    displayMessage(`Number is TOOOOO Low`);
  } else if (guess > randomValue) {
    displayMessage(`Number is TOOOOO High`);
  }
}

function cleanUpGuess(guess) {
  userInput.value = "";
  // guessSlot.innerHTML += `${guess}, `;
  guessSlot.innerHTML = prevGuess.join(", ");
  numGuess++;
  remaining.innerHTML = `${Math.max(0, 11 - numGuess)}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h3>${message}</h3>`;
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  submit.disabled = true;
  p.classList.add("reset-btn");
  p.innerHTML = `<h3 id="newGame">Restart Game</h3>`;
  startOver.appendChild(p);
  playGame = false;
  restartGame();
}

function restartGame() {
  const resetGameBtn = document.querySelector("#newGame");
  resetGameBtn.addEventListener("click", () => {
    randomValue = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = ``;
    remaining.innerHTML = `${11 - numGuess}`;
    userInput.removeAttribute("disabled", "");
    submit.disabled = false;
    displayMessage("");
    startOver.removeChild(p);
    playGame = true;
  });
}
