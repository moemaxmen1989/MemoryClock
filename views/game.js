/**
 * Game defines and stores the entire game
 *
 * 0 = Welcome state
 * 1 = Player has entered their name
 * 2 = Game has begin
 * 3 = Game has ended
 *
 * @param advanceGameState  This advances the game state to the next state
 * @param getGameState      This returns the value of the current game state
 * @param setScore          This sets the score for each level of the game
 * @param reset             This resets the game to start a fresh one
 * @param setPlayerName     This sets the name of the current player
 */
class Game {
    constructor() {
        this.gameState = 0
        this.gameStateEvent = new Event("gameState")
        this.gameScore = {}
        this.playerName = null
    }

    advanceGameState() {
        if (this.gameState !== 3) {
            this.gameState += 1
            document.dispatchEvent(this.gameStateEvent)
            return true
        }

        return false
    }

    getGameState() {
        return this.gameState
    }

    setScore(level, score) {
        this.gameScore[level] = score
    }

    reset() {
        this.gameScore = {}
        this.playerName = null
    }

    setPlayerName(name) {
        const trimmedName = name.trim()
        if (trimmedName === "") return false

        this.playerName = trimmedName
        return true
    }
}

const game = new Game()
