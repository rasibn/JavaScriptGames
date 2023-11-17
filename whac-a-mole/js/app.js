const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");

console.log(squares);
let result = 0;

function setRandomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });
  let randomSquare = squares[Math.floor(Math.random() * squares.length)];

  randomSquare.classList.add("mole");
}

squares.forEach((square) => {
  id.addEventListener("mousedown", () => {
    hitPosition = setRandomSquare.id;
    if (hitPosition === this.id) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

function moveMole() {
  let timerId = setInterval(setRandomSquare, 500);
}

setRandomSquare();
moveMole();
