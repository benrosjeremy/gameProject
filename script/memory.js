// let choise = document.querySelector(".choise");
// let easy = document.querySelector(".easy");
// let medium = document.querySelector(".medium");
// let hard = document.querySelector(".hard");
// let container = document.querySelector(".container");
// let arr = [ "😊", "😊","😂","😂","🤣","🤣","😍","😍","😘","😘","😎","😎","🤩","🤩","🙂","🙂",
// ];

// easy.addEventListener("click", function () {
//   createCards(8);
// });
// medium.addEventListener("click", function () {
//   createCards(12);
// });
// hard.addEventListener("click", function () {
//   createCards(16);
// });
// let firstVal='';
// function createCards(num) {
//   let Arr = shuffleArray(arr.slice(0, 8));
//   choise.style.display = "none";
//   container.style.display = "grid";
//   for (let index = 0; index < num; index++) {
//     let value = Arr[index];
//     let span = document.createElement("span");
//     span.classList.add("span");
//     let div = document.createElement("div");
//     div.classList.add("grid-item");
//     span.textContent = value;
//     span.style.display = "none";
//     div.appendChild(span);
//     container.appendChild(div);




// //     div.addEventListener("click", game);
// //     function geme() {
// //         span.style.display="block";
// //         if(firstVal==='')
// //             firstVal=span.value;
// //         else if(firstVal !== span.value)
// //             {
// //                 span.style.display="none";
// //                 //להפוך בחזרה את שני הקלפים
// //                 firstVal='';
// //             }
// //             //בדיקה אם הכל כבר הפוך - ליגמור מישחק
      

// //     }
//   }
// }


// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }
let choise = document.querySelector(".choise");
let easy = document.querySelector(".easy");
let medium = document.querySelector(".medium");
let hard = document.querySelector(".hard");
let container = document.querySelector(".container");
let winMessage = document.getElementById("winMessage");
let newGameButton = document.getElementById("newGameButton");
let arr = [ "😊", "😊", "😂", "😂", "🤣", "🤣", "😍", "😍", "😘", "😘", "😎", "😎", "🤩", "🤩", "🙂", "🙂"];

easy.addEventListener("click", function () {
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

function createCards(num) {
  let Arr = shuffleArray(arr.slice(0, num));
  choise.style.display = "none";
  container.style.display = "grid";
  //container.style.gridTemplateColumns = `repeat(${Math.ceil(Math.sqrt(num))}, 100px)`;
  container.innerHTML = '';

  for (let index = 0; index < num; index++) {
    let value = Arr[index];
    let div = document.createElement("div");
    div.classList.add("grid-item");
    
    let front = document.createElement("div");
    front.classList.add("card", "front");
    front.textContent = '';

    let back = document.createElement("div");
    back.classList.add("card", "back");
    back.textContent = value;
    
    div.appendChild(front);
    div.appendChild(back);
    container.appendChild(div);

    div.addEventListener("click", function() {
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
  let isMatch = firstCard.querySelector('.back').textContent === secondCard.querySelector('.back').textContent;

  if (isMatch) {
    disableCards();
    checkForWin();
  } else {
    unflipCards();
  }
}

function checkForWin(){
    let flippedCards = document.querySelectorAll('.grid-item.flip');
  if (flippedCards.length === container.children.length) {
    //setTimeout(() => {
        //container.innerHTML = '';
        //let div = document.createElement("div");
        //div.textContent ="ניצחת";
        //container.appendChild(div);
        winMessage.style.display = 'flex';
      //resetGame();
    //}, 500);
  }
}

function disableCards() {
  firstCard.removeEventListener('click', createCards);
  secondCard.removeEventListener('click', createCards);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

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
  container.innerHTML = '';
  winMessage.style.display = "none";
  }
