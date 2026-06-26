let firstCard = 10
let secondCard = 14
let hasBlackJack = false
let isAlive = true
let sum = firstCard + secondCard
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.querySelector("#sum-el")
let cardsEl = document.getElementById("cards-el")

function startGame() {
    cardsEl.textContent = "Cards: " + firstCard + " " + secondCard
    sumEl.textContent = "Sum: " + sum
    if (sum < 21) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        hasBlackJack = true
        message = "You've got Blackjack!"
    } else {
        isAlive = false
        message = "You're out of the game!"
    }
    messageEl.textContent = message
}

console.log(isAlive)
console.log(message)
