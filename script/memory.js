let choise = document.querySelector(".choise");
let easy = document.querySelector(".easy");
let medium = document.querySelector(".medium");
let hard = document.querySelector(".hard");
let container = document.querySelector(".container");
let winMessage = document.getElementById("winMessage");
let newGameButton = document.getElementById("newGameButton");
let back = document.querySelector(".back");
let arr = [
  "😊",
  "😊",
  "😂",
  "😂",
  "🤣",
  "🤣",
  "😍",
  "😍",
  "😘",
  "😘",
  "😎",
  "😎",
  "🤩",
  "🤩",
  "🙂",
  "🙂",
];

easy.addEventListener("click", function () {
  // back.style.display = "none";

  createCards(8);
});
medium.addEventListener("click", function () {
  createCards(12);
});
hard.addEventListener("click", function () {
  createCards(16);
});
newGameButton.addEventListener("click", resetGame);

let firstCard = null;
let secondCard = null;
let lockBoard = false;

setUserInfo();
function setUserInfo() {
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
function createCards(num) {
  let Arr = shuffleArray(arr.slice(0, num));
  choise.style.display = "none";
  container.style.display = "grid";
  container.innerHTML = "";

  for (let index = 0; index < num; index++) {
    let value = Arr[index];
    let div = document.createElement("div");
    div.classList.add("grid-item");

    let front = document.createElement("div");
    front.classList.add("card", "front");
    front.textContent = "";

    let back = document.createElement("div");
    back.classList.add("card", "back");
    back.textContent = value;

    div.appendChild(front);
    div.appendChild(back);
    container.appendChild(div);

    div.addEventListener("click", function () {
      console.log(1);
      if (lockBoard) return;
      if (div === firstCard) return;

      div.classList.add("flip");

      if (!firstCard) {
        firstCard = div;
        return;
      }

      secondCard = div;
      checkForMatch();
    });
  }
}

function checkForMatch() {
  let isMatch =
    firstCard.querySelector(".back").textContent ===
    secondCard.querySelector(".back").textContent;

  if (isMatch) {
    disableCards();
    checkForWin();
  } else {
    unflipCards();
  }
}

function checkForWin() {
  let flippedCards = document.querySelectorAll(".grid-item.flip");
  if (flippedCards.length === container.children.length) {
    var storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers == null) storedUsers = [];
    var user = storedUsers.find((user) => user.selectedUser === 1);
    user.memoryscore = user.memoryscore + 1;
    localStorage.setItem("users", JSON.stringify(storedUsers));
    setUserInfo();
    setTimeout(func, 1000);
    function func() {
      winMessage.style.display = "flex";
    }
  }
}

function disableCards() {
  firstCard.removeEventListener("click", createCards);
  secondCard.removeEventListener("click", createCards);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function resetGame() {
  choise.style.display = "block";
  container.style.display = "none";
  container.innerHTML = "";
  winMessage.style.display = "none";
}
