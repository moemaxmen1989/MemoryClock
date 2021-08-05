const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

const COLORS = ["#28FFBF", "#BCFFB9", "#F5FDB0", "#F7E6AD", "#B980F0", "#FE9898", "#E5FBB8", "#FF7B54", "#FFB26B", "#FFD56B", "#939B62"]

const GAME_RULES = [
    {
        level: 1,
        cubes: 5,
        time: 4,
        score: 50,
    },
    {
        level: 2,
        cubes: 6,
        time: 5,
        score: 60,
    },
    {
        level: 3,
        cubes: 7,
        time: 6,
        score: 70,
    },
    {
        level: 4,
        cubes: 8,
        time: 10,
        score: 80,
    },
]

/**
 * Game defines and stores the entire game
 *
 * 0 = Welcome state
 * 1 = Player has entered their name
 * 2 = Game has begin
 * 3 = Game has ended
 * 4 = Game lost
 *
 */
class Game {
    #gameState = 0
    #gameScore = 0
    #playerName = null
    #gameLevel = 1
    #currentCubeState = null
    #colors
    #rules
    #gameLives
    #gameStateEvent = new Event("gameState")
    #gameLivesEvent = new Event("gameLives")
    #gameScoreEvent = new Event("gameScore")

    constructor(lives, colors, rules) {
        this.#colors = colors
        this.#rules = rules
        this.#gameLives = lives
    }

    /**
     * This advances the game state to the next state
     *
     * @returns boolean `true` if state was advanced to the next one, `false` otherwise
     */
    advanceGameState() {
        if (this.#gameState !== 3) {
            this.#gameState += 1
            document.dispatchEvent(this.#gameStateEvent)
            return true
        }

        return false
    }

    /**
     * This returns the value of the current game state
     * @returns number
     */
    getGameState() {
        return this.#gameState
    }

    /**
     * Returns the number of lives player has left
     * @returns number
     */
    getLivesLeft() {
        return this.#gameLives
    }

    /**
     * Returns the current score
     * @returns number
     */
    getGameScore() {
        return this.#gameScore
    }

    /**
     * This sets the score for each level of the game
     */
    setScore() {
        this.#gameScore += this.#rules[this.#gameLevel - 1].score
        document.dispatchEvent(this.#gameScoreEvent)
    }

    /**
     * Returns the current game level
     * @returns number
     */
    getGameLevel() {
        return this.#gameLevel
    }

    /**
     * Set the game state to lost
     */
    #setGameLost() {
        this.#gameState = 4
        document.dispatchEvent(this.#gameStateEvent)
    }

    /**
     * Reduces the number of lives. If zero, game ends
     */
    failLevel() {
        this.#gameLives -= 1
        document.dispatchEvent(this.#gameLivesEvent)
        if (this.#gameLives === 0) this.#setGameLost()
    }

    /**
     * This resets the game to start a fresh one
     * @param {boolean} newGame Sets to start a new game
     */
    reset(newGame) {
        this.#gameScore = 0
        this.#playerName = null
        if (newGame) location.reload()
    }

    /**
     * This sets the name of the current player
     *
     * @param {string} name Sets the name of the player
     * @returns boolean     `false` if the name of the player is invalid, `true` if it is valid and player name is set
     */
    setPlayerName(name) {
        const trimmedName = name.trim()
        if (trimmedName === "") return false

        this.#playerName = trimmedName
        return true
    }

    /**
     * This advances to the next game level
     */
    advanceGameLevel() {
        if (this.#rules.findIndex((rule) => rule.level === this.#gameLevel + 1) === -1) {
            // game is now over
            return false
        }
        this.#gameLevel += 1
        return true
    }

    /**
     * This returns an object with a unique ID and the color of the box
     * @returns {{ cubes: { id: string; color: string }[], colors: string[], waitTime: number }}
     */
    levelInit() {
        const boxes = this.#rules[this.#gameLevel - 1].cubes
        const availableColors = [...this.#colors]
        const usedColors = []

        const cubes = Array(boxes)
            .fill(0)
            .map(() => {
                const colorIndex = Math.floor(Math.random() * availableColors.length)
                const color = availableColors[colorIndex]
                availableColors.splice(colorIndex, 1)
                usedColors.push(color)

                return { id: uid(), color }
            })

        this.#currentCubeState = cubes

        return {
            cubes,
            colors: usedColors,
            waitTime: this.#rules[this.#gameLevel - 1].time,
        }
    }

    verifyLevelFinish(state) {
        const correctState = this.#currentCubeState

        return JSON.stringify(correctState) === JSON.stringify(state)
    }
}

const game = new Game(3, COLORS, GAME_RULES)
