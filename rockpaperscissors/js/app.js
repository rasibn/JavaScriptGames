const userChoiceDisplay = document.getElementById("user-choice")
const computerChoiceDisplay = document.getElementById("computer-choice")
const resultDisplay = document.getElementById("result")

const possibleChoices = document.querySelectorAll("button")


let userChoice = undefined

possibleChoices.forEach(
  possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice


    computerChoiceDisplay.innerHTML = "thinking..."
    resultDisplay.innerHTML = "Waiting for result..."
    possibleChoices.forEach(possibleChoices => possibleChoices.disabled = true)

    setTimeout(() => {
      const computerChoice = generateComputerChoice()

      computerChoiceDisplay.innerHTML = computerChoice

      setTimeout(() => {
        const result = getResult(computerChoice, userChoice)
        resultDisplay.innerHTML = result
        possibleChoices.forEach(possibleChoices => possibleChoices.disabled = false)
      }, 300)
    }, 1000)
  }))


function generateComputerChoice() {
  const randomNumber = Math.floor(Math.floor(Math.random() * 3) + 1)
  let computerChoice = undefined

  switch (randomNumber) {
    case 1:
      computerChoice = "rock"
      break;
    case 2:
      computerChoice = "paper"
      break;
    case 3:
      computerChoice = "scissors"
      break;
  }
  return computerChoice
}

function getResult(computerChoice, userChoice) {
  let result = undefined
  if (computerChoice === userChoice) {
    result = "it is a draw"
  } else if (computerChoice === "rock" && userChoice === "paper") {
    result = "you win"
  } else if (computerChoice === "paper" && userChoice === "scissors") {
    result = "you win"
  } else if (computerChoice === "scissors" && userChoice === "rock") {
    result = "you win"
  }
  else {
    result = "you lose"
  }

  return result
}

console.log(possibleChoices)

