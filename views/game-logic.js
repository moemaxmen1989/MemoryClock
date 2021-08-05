const lives = document.getElementById("lives")
const score = document.getElementById("score")
const timerContainer = document.getElementById("timerContainer")
const template = document.querySelector("#coloredCox")
const container = document.querySelector("#gridContainer")
const gameContainer = document.getElementById("gameContainer")
const failContainer = document.getElementById("failContainer")
const successContainer = document.getElementById("successContainer")
const submitButton = document.getElementById("game-submit")

class state {
    #value = undefined

    constructor(initialValue) {
        this.#value = initialValue
    }

    /**
     * @returns {*} the current value of this state
     */
    value() {
        return this.#value
    }

    /**
     * Sets the value in this state
     * @param {*} newValue sets this as a new value
     */
    setValue(newValue) {
        this.#value = newValue
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

const refreshLives = () => {
    lives.innerHTML = game.getLivesLeft()
}

const refreshScore = () => {
    score.innerHTML = game.getGameScore()
}

const GREY_COLOR = "#b8b5ad"

document.addEventListener("gameState", () => {
    if (game.getGameState() === 2) startGame()
    if (game.getGameState() === 4) failGame()
})

document.addEventListener("gameLives", () => refreshLives())
document.addEventListener("gameScore", () => refreshScore())

let colors = new state(null)
let gameStart = new state(false)
let currentState = new state()

const runGameLogic = () => {
    const level = game.levelInit()
    console.log("level: ", level)
    colors.setValue(level.colors)

    setTimeout(() => {
        const cubes = generateCubes(level.cubes)
        cubes.forEach((cube) => container.append(cube))

        startTimer(level.waitTime)

        setTimeout(() => {
            const childNodes = container.children

            for (let i = 0; i < childNodes.length; i++) {
                const box = childNodes[i]
                const div = box.querySelector(".colored-box")
                div.style.backgroundColor = GREY_COLOR
            }

            submitButton.disabled = false
            gameStart.setValue(true)
            currentState.setValue(level.cubes.map((cube) => ({ ...cube, color: "" })))
        }, level.waitTime * 1000)
    }, 0)
}

const successHandler = () => {
    document.getElementById("successScore").innerHTML = game.getGameScore()
    gameContainer.classList.add("hidden")
    failContainer.classList.add("hidden")
    successContainer.classList.remove("hidden")
}

const startGame = () => {
    game.reset()

    refreshLives()

    gameContainer.classList.remove("hidden")
    submitButton.disabled = true

    runGameLogic()
}

const nextLevel = () => {
    submitButton.disabled = true
    const res = game.advanceGameLevel()

    if (res) {
        document.getElementById("level").innerHTML = game.getGameLevel()
        container.innerHTML = ""

        runGameLogic()
    } else {
        successHandler()
    }
}

const cycleColors = (event) => {
    if (gameStart.value()) {
        const box = event.target
        const id = box.dataset.id
        const newIndex = (+box.dataset.colorIndex + 1) % colors.value().length
        const newColor = colors.value()[newIndex]

        box.setAttribute("data-color-index", newIndex)
        box.style.backgroundColor = newColor

        const cur = currentState.value()
        const elIndex = cur.findIndex((el) => el.id === id)
        cur[elIndex].color = newColor
        currentState.setValue(cur)
    }
}

const generateCubes = (cubeData) => {
    return cubeData.map(({ id, color }) => {
        const clonedBox = template.content.cloneNode(true)
        const clonedDiv = clonedBox.querySelector(".colored-box")
        clonedDiv.style.backgroundColor = color
        clonedDiv.setAttribute("data-id", id)
        clonedDiv.setAttribute("data-color-index", -1)
        clonedDiv.onclick = cycleColors

        return clonedBox
    })
}

const startTimer = (timerValue) => {
    timerContainer.classList.remove("hidden")
    const timer = document.getElementById("timer")
    timer.innerText = timerValue
    timerValue -= 1

    const timerInterval = setInterval(() => {
        timer.innerText = timerValue
        timerValue -= 1
        if (timerValue < -1) {
            timerContainer.classList.add("hidden")
            clearInterval(timerInterval)
        }
    }, 1000)
}

const failGame = () => {
    gameContainer.classList.add("hidden")
    failContainer.classList.remove("hidden")
}

const restartHandler = () => {
    game.reset(true)
}

const submitHandler = () => {
    const victory = game.verifyLevelFinish(currentState.value())

    if (victory) {
        game.setScore()
        nextLevel()
    } else {
        game.failLevel()
    }
}

submitButton.addEventListener("click", submitHandler)
