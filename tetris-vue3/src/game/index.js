export * from './config.js'
import { Game } from './game'
import { Player } from './player'
import { Rival } from './rival'
import { initMessage } from './message'

export function initGame() {
	initMessage()
}

let selftGame
export function initSelfGame(map) {
	selftGame = new Game(map)
	selftGame.addPlayer(new Player())
}

let rivalGame
export function initRivalGame(map) {
	rivalGame = new Game(map)
	rivalGame.addPlayer(new Rival())
}

export function startGame() {
	selftGame.start()
	rivalGame.start()
}