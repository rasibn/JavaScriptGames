const baseCard = [
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "icecream",
    img: "images/icecream.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
];

const cards = baseCard.concat(baseCard);

// shuffle function
// the sort callback either returns a positive or negative number
// sort needs to return a value:
// if the value is negative, a is sorted before b
// if the value is positive, b is sorted before a
cards.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
const result = document.querySelector("#result");
const missed = document.querySelector("#missed");

result.textContent = 0;
missed.textContent = 0;

const gameState = {
  flippedCardCount: 0,
  prevCard: null,
  prevCardId: null,
  missedCount: 0,
};

function createCardElement(id, name) {
  const cardElement = document.createElement("img");
  cardElement.setAttribute("src", "images/blank.png");
  cardElement.setAttribute("data-id", id);
  cardElement.setAttribute("data-name", name);
  cardElement.addEventListener("click", flipCard);
  return cardElement;
}

function resetGameBoard() {
  gridDisplay.innerHTML = "";
  gameState.flippedCardCount = 0;
  gameState.prevCard = null;
  gameState.prevCardId = null;
  gameState.missedCount = 0;
  result.textContent = 0;
  missed.textContent = 0;
  createBoard();
}

function createBoard() {
  cards.forEach(({ name }, i) => {
    const cardElement = createCardElement(i, name);
    gridDisplay.appendChild(cardElement);
  });
}

function flipCard() {
  if (gameState.flippedCardCount === cards.length) {
    youWin();
  }

  // Don't flip a faceup card
  if (this.getAttribute("src") !== "images/blank.png") {
    console.log("card already flipped");
    return;
  }

  // Flip the card if prevCard is empty and store the name
  if (gameState.prevCard === null) {
    console.log("first card flipped");
    this.setAttribute("src", cards[this.getAttribute("data-id")].img);
    gameState.prevCard = this.getAttribute("data-name");
    gameState.prevCardId = this.getAttribute("data-id");
    return;
  }

  // if prevCard is not empty, flip the card and compare the cards
  this.setAttribute("src", cards[this.getAttribute("data-id")].img);

  if (gameState.prevCard != this.getAttribute("data-name")) {
    HandleNotMatch.bind(this)();
    return;
  }

  handleMatch();
}

function HandleNotMatch() {
  console.log("not a match");
  const missed = document.querySelector("#missed");
  missed.textContent = ++gameState.missedCount;

  const allCards = gridDisplay.querySelectorAll("img");

  allCards.forEach((card) => {
    card.removeEventListener("click", flipCard);
  });

  setTimeout(() => {
    this.setAttribute("src", "images/blank.png");
    const prev = document.querySelector(`[data-id="${gameState.prevCardId}"]`);
    prev.setAttribute("src", "images/blank.png");
    gameState.prevCard = null;
    gameState.prevCardId = null;

    allCards.forEach((card) => {
      card.addEventListener("click", flipCard);
    });
  }, 1000);
}

function youWin() {
  alert(`You win! You missed ${gameState.missedCount} times! Restart?`);
  resetGameBoard();
}

function handleMatch() {
  // Handle a match
  console.log("match");
  gameState.prevCard = null;
  gameState.prevCardId = null;
  gameState.flippedCardCount += 2;

  if (gameState.flippedCardCount === cards.length) {
    setTimeout(() => {
      youWin();
    }, 500);
  }
  result.textContent = gameState.flippedCardCount;
}

createBoard();
