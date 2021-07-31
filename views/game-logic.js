function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

document.addEventListener("gameState", () => {
    if (game.getGameState() === 2) startGame()
})

const COLORS = ["#28FFBF", "#BCFFB9", "#F5FDB0", "#F7E6AD", "#B980F0", "#FE9898", "#E5FBB8", "#FF7B54", "#FFB26B", "#FFD56B", "#939B62"]

const template = document.querySelector("#coloredCox")
const container = document.querySelector("#gridContainer")
const gameContainer = document.getElementById("gameContainer")
const SIZE = 6

const startGame = () => {
    game.reset()
    const availableColors = [...COLORS]

    gameContainer.classList.remove("hidden")

    for (let i = 0; i < SIZE; i++) {
        const clonedBox = template.content.cloneNode(true)
        const clonedDiv = clonedBox.querySelector(".colored-box")

        const colorIndex = Math.floor(Math.random() * availableColors.length)
        const color = availableColors[colorIndex]
        availableColors.splice(colorIndex, 1)

        clonedDiv.style.backgroundColor = color
        container.append(clonedBox)
    }

    startTimer(30)
}

const startTimer = (timerValue) => {
    const timer = document.getElementById("timer")

    const timerInterval = setInterval(() => {
        timer.innerText = timerValue
        timerValue -= 1
        if (timerValue < 0) {
            clearInterval(timerInterval)
        }
    }, 1000)
}
