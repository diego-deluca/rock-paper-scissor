const result = document.querySelector("#show-el");
const startBtn = document.querySelector("#start-btn");
const rockBtn = document.querySelector("#rock-btn");
const paperBtn = document.querySelector("#paper-btn");
const scissorBtn = document.querySelector("#scissor-btn");
const buttons = document.querySelector("#container-el");
const scoreEl = document.querySelector("#score-el");
const drawEl = document.querySelector("#draw-el");

let aiSelector = ["ROCK!", "PAPER!", "SCISSOR!"];
let computerChoice;
let userChoice;
let counter = 3;
let score = {
  Player: 0,
  AI: 0,
};
let gameEnd = false;

//LISTEN TO BUTTON CLICKED AND SAVE IT TO USER CHOICE
const clickHandler = (e) => {
  userChoice = e.target.id;
  console.log(userChoice);
  if (userChoice != "container-el") {
    getResult();
    result.textContent = computerChoice;
    showScore();

    startBtn.disabled = false;
    if (score.Player === 3) {
      result.textContent = "YOU WIN!";
      score.Player = 0;
      score.AI = 0;
    }
    if (score.AI === 3) {
      result.textContent = "YOU LOSE!";
      score.Player = 0;
      score.AI = 0;
    }
  }

  e.stopPropagation();
};
buttons.addEventListener("click", clickHandler);

//COMPUTER CHOICE RANDOMIZER
let randomize = () => {
  const randomChoice =
    aiSelector[Math.floor(Math.random() * aiSelector.length)];
  computerChoice = randomChoice;
};

//COMPARE USER CHOICE VS COMPUTER CHOICE
const getResult = () => {
  switch (userChoice + computerChoice) {
    case "rock-btnSCISSOR!":
    case "paper-btnROCK!":
    case "scissor-btnPAPER!":
      score.Player += 1;
      break;
    case "rock-btnPAPER!":
    case "paper-btnSCISSOR!":
    case "scissor-btnROCK!":
      score.AI += 1;
      break;
    case "rock-btnROCK!":
    case "paper-btnPAPER!":
    case "scissor-btnSCISSOR!":
      drawEl.textContent = "DRAW!";
      break;
  }
  disableButtons();
};

//START BUTTON
startBtn.onclick = () => {
  drawEl.textContent = "";
  showScore();
  randomize();
  let countDown = () => {
    result.textContent = counter;
    if (counter === 0) {
      counter = 4;
      clearInterval(timeOut1);
      result.textContent = "GO!";
      startBtn.disabled = true;
      enableButtons();
      startBtn.disabled = true;
    }
    counter -= 1;
  };
  const timeOut1 = setInterval(countDown, 250);
};

//DISABLE BUTTONS FUNCION
let disableButtons = () => {
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorBtn.disabled = true;
};
//ENABLE BUTTONS FUNCION
let enableButtons = () => {
  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorBtn.disabled = false;
};
const showScore = () =>
  (scoreEl.textContent =
    "SCORE: Player: " + score.Player + " " + "Computer: " + score.AI + " ");
