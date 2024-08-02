// 1. Create two variables, firstCard and secondCard. 
// Set their values to a random number between 2-11

// 2. Create a variable, sum, and set it to the sum of the two cards

let players = [
    { name: "Butcher", chips: 200 },
    { name: "Homelander", chips: 200 }
]

let currentPlayerIndex = 0
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let currentBet = 0

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

function updatePlayerInfo() {
    playerEl.textContent = `${players[currentPlayerIndex].name}: $${players[currentPlayerIndex].chips}`
}

updatePlayerInfo()

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    if (currentBet > 0 && currentBet <= players[currentPlayerIndex].chips) {
        isAlive = true
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        players[currentPlayerIndex].chips -= currentBet
        renderGame()
    } else {
        alert("Please place a valid bet before starting the game.")
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: " + cards.join(" ")
    sumEl.textContent = "Sum: " + sum

    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        players[currentPlayerIndex].chips += currentBet * 2.5
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
    updatePlayerInfo()
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}

function placeBet() {
    let betAmount = document.getElementById("bet-amount").value
    if (betAmount > 0 && betAmount <= players[currentPlayerIndex].chips) {
        currentBet = parseInt(betAmount)
        startGame()
    } else {
        alert("Invalid bet amount")
    }
}

function switchPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length
    resetGame()
}

function resetGame() {
    cards = []
    sum = 0
    hasBlackJack = false
    isAlive = false
    message = "Want to play a round?"
    messageEl.textContent = message
    cardsEl.textContent = "Cards: "
    sumEl.textContent = "Sum: "
    updatePlayerInfo()
}
