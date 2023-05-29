let dinoElement = document.getElementById("dino");
let cactusElement1 = document.getElementById("cactus1");
let cactusElement2 = document.getElementById("cactus2");
let cactusElement3 = document.getElementById("cactus3");
let scoreLabelElement = document.getElementById("score-label");
let highScoreLabelElement = document.getElementById("high-score-label");

let intervalArray = [];
let points;
let topScore = 0;
window.addEventListener("keypress", jump);
function jump() {
  if (dinoElement.style.bottom == "0px") {
    dinoElement.style.bottom = "200px";
  }
}

function gravity() {
  let bottomSpace = +dinoElement.style.bottom.split("p")[0];
  if (bottomSpace > 0) {
    bottomSpace -= 1;
  }
  dinoElement.style.bottom = bottomSpace + "px";
}

function moveLeft(cactusElement) {
  let leftSpace = +cactusElement.style.left.split("p")[0];
  if (leftSpace > -150) {
    leftSpace -= 1;
  } else {
    generateCactus(cactusElement);
    return;
  }
  cactusElement.style.left = leftSpace + "px";
  if (isColliding(cactusElement)) {
    if (points > topScore) {
      topScore = points;
    }
    alert("Lost");
    for (let index = 0; index < intervalArray.length; index++) {
      const id = intervalArray[index];
      clearInterval(id);
    }
    startGame();
  }
}

function runCactus(cactusElement) {
  let intervalId = setInterval(() => moveLeft(cactusElement), 10);
  intervalArray.push(intervalId);
}

function generateCactus(cactusElement) {
  let id = cactusElement.id.split("s")[1];
  console.log(id);
  let random = Math.floor(Math.random() * 100) + 1000 + id * 400;
  console.log(random);
  cactusElement.style.left = random + "px";
}

function isColliding(cactusElement) {
  a = dinoElement.getBoundingClientRect();
  b = cactusElement.getBoundingClientRect();
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    return true;
  }
}

function calculatePoints() {
  points += 1;
  scoreLabelElement.innerText = points;
}

function startGame() {
  points = 0;
  highScoreLabelElement.innerText = "HI" + topScore;
  intervalArray.push(setInterval(gravity, 10));
  generateCactus(cactusElement1);
  runCactus(cactusElement1);
  generateCactus(cactusElement2);
  runCactus(cactusElement2);
  generateCactus(cactusElement3);
  runCactus(cactusElement3);
  intervalArray.push(setInterval(calculatePoints, 100));
}
startGame();
