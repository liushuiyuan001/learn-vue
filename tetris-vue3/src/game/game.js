import { gameRow, gameCol } from './config.js'
import { createBox } from './box'
import { render } from './renderer.js'
import { initMap, addBoxToMap, eliminate } from './map.js'
import { addTicker } from './ticker'
import { intervalTimer } from './utils'
import { hitBottomBorder, hitBottomBox } from './hit'
import { message } from './message'
export class Game {
	constructor(map) {
		initMap(map);
		this._map = map;
		this._activeBox = null;

	}

	addPlayer(player) {
		player.init(this)
	}

	start() {
		this._activeBox = createBox()
		addTicker(this.handleTicker.bind(this))
	}

	_isDownMove = intervalTimer()
	autoMoveDown = true
	handleTicker(n) {
		if (this.autoMoveDown) {
			if (this._isDownMove(n, 1000)) {
				this.moveBoxToDown()
				message.emit('moveBoxToDown')
			}
		}
		render(this._activeBox, this._map)
	}

	moveBoxToDown() {
		if (!this._activeBox) {
			return
		}
		if (hitBottomBorder(this._activeBox) || hitBottomBox(this._activeBox, this._map)) {
			addBoxToMap(this._activeBox, this._map)
			eliminate(this._map)
			this._activeBox = createBox()
			return
		}
		this._activeBox.y++;
	}

	moveBoxToLeft() {
		this._activeBox.x--
	}
	moveBoxToRight() {
		this._activeBox.x++
	}
	rotateBox() {
		this._activeBox.rotate()
	}
}