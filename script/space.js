"use strict";

let modal = document.getElementById("myModal");

let intervalId;
let meteorIntervalIds = [];
let meteors = [];
let isPaused = false;
let counter = 0;
let lives = 3;
let gameInterval;
const container = document.querySelector(".container");
const spaceShip = document.querySelector(".spaceShip");
const buttonStart = document.querySelector(".start");
const buttonPause = document.createElement("button");
buttonPause.textContent = "Pause";
document.body.append(buttonPause);
const counterDisplay = document.createElement("div");
counterDisplay.classList.add("counter");
counterDisplay.textContent = `Counter: ${counter}`;
document.body.append(counterDisplay);
const livesDisplay = document.createElement("div");
livesDisplay.classList.add("lives");
livesDisplay.innerHTML = `Lives: ${"❤️".repeat(lives)}`;
document.body.append(livesDisplay);
let myBoard = [];

setUserInfo();

for (let i = 0; i < 8; i++) {
  myBoard.push([]);
  for (let j = 0; j < 8; j++) {
    let div = document.createElement("div");
    div.classList.add("box");
    div.classList.add("black-box");
    myBoard[i].push(div);
    container.append(div);
  }
}

let x = 0;
let y = 0;
document.addEventListener("keydown", moveKey);
buttonStart.addEventListener("click", startGame);
buttonPause.addEventListener("click", togglePause);

document.querySelector("#play-again").addEventListener("click", () => {
  modal.style.display = "none";
  startGame();
});

document.querySelector("#back").addEventListener("click", () => {
  window.location.replace("../html/games.html");
});

function setUserInfo(){
  var storedUsers = JSON.parse(localStorage.getItem("users"));
  if (storedUsers == null) storedUsers = [];
  const user = storedUsers.find((user) => user.selectedUser == 1);
  if (storedUsers != null)
    document.getElementById("user_info").textContent =
      "Welcome " +
      user.username +
      "!  your score in space ship game is: " +
      user.spacescore +
      ". your score in memory game is: " +
      user.memoryscore;
}

function startGame() {
  resetGame();
  position();
  intervalId = setInterval(createMeteor, 1000); // יצירת מטאור כל שניה
  gameInterval = setInterval(updateCounter, 1000); // עדכון המונה כל שניה
}

function resetGame() {
  counter = 0;
  counterDisplay.textContent = `Counter: ${counter}`;
  lives = 3;
  livesDisplay.innerHTML = `Lives: ${"❤️".repeat(lives)}`;
  clearInterval(intervalId);
  meteorIntervalIds.forEach((id) => clearInterval(id));
  meteorIntervalIds = [];
  meteors.forEach((meteor) => meteor.remove());
  meteors = [];
}

function position() {
  x = 3;
  y = 7;
  myBoard[7][3].append(spaceShip);
}

function moveKey(event) {
  if (isPaused) return;
  if (event.key === "ArrowLeft" && x > 0) {
    x--;
  } else if (event.key === "ArrowRight" && x < 7) {
    x++;
  } else if (event.key === "ArrowUp" && y > 0) {
    y--;
  } else if (event.key === "ArrowDown" && y < 7) {
    y++;
  }
  myBoard[y][x].append(spaceShip);
}

function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    clearInterval(intervalId);
    meteorIntervalIds.forEach((id) => clearInterval(id));
    clearInterval(gameInterval);
  } else {
    intervalId = setInterval(createMeteor, 1000);
    meteors.forEach((meteor) => moveMeteor(meteor));
    gameInterval = setInterval(updateCounter, 1000);
  }
}

function updateCounter() {
  counter++;
  counterDisplay.textContent = `Counter: ${counter}`;
}

function createMeteor() {
  let meteor = document.createElement("div");
  meteor.classList.add("meteor");
  let startX = Math.floor(Math.random() * 8) * 70; // מיקום התחלה אקראי
  meteor.style.left = `${startX}px`;
  meteor.style.top = "-40px";
  meteor.textContent = "🌠";
  container.append(meteor);
  meteors.push(meteor);
  moveMeteor(meteor);
}

function moveMeteor(meteor) {
  let meteorInterval = setInterval(() => {
    if (isPaused) return;
    let top = parseInt(meteor.style.top);
    if (top > container.clientHeight) {
      meteor.remove();
      meteors = meteors.filter((m) => m !== meteor);
      clearInterval(meteorInterval);
    } else {
      meteor.style.top = `${top + 5}px`;
      if (isCollision(meteor)) {
        loseLife();
        meteor.remove();
        meteors = meteors.filter((m) => m !== meteor);
        clearInterval(meteorInterval);
      }
    }
  }, 50);
  meteorIntervalIds.push(meteorInterval);
}

function isCollision(meteor) {
  const meteorRect = meteor.getBoundingClientRect();
  const spaceShipRect = spaceShip.getBoundingClientRect();
  return !(
    meteorRect.top > spaceShipRect.bottom ||
    meteorRect.bottom < spaceShipRect.top ||
    meteorRect.right < spaceShipRect.left ||
    meteorRect.left > spaceShipRect.right
  );
}

function loseLife() {
  lives--;
  livesDisplay.innerHTML = `Lives: ${"❤️".repeat(lives)}`;
  if (lives <= 0) {
    modal.style.display = "block";
    var storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers == null) storedUsers = [];
    var user = storedUsers.find((user) => user.selectedUser === 1);
    user.spacescore = counter;
    localStorage.setItem("users", JSON.stringify(storedUsers));
    clearInterval(intervalId);
    meteors.forEach((m) => m.remove());
    meteors = [];
    meteorIntervalIds.forEach((id) => clearInterval(id));
    meteorIntervalIds = [];
    clearInterval(gameInterval);
  }
}
