import { message } from './message'
import { createBoxByType } from './box'
// 重构到基类
export class Rival {
	constructor() { }
	init(game) {
		this._game = game;
		this._game.autoMoveDown = false
		this._game.setCreateStrategy(this.handleCreateBox.bind(this))
		message.on('moveBoxToLeft', this.moveBoxToLeftMsg.bind(this));
		message.on('moveBoxToRight', this.moveBoxToRightMsg.bind(this)); //
		message.on('rotateBox', this.rotateBoxMsg.bind(this));
		message.on('moveBoxToDown', this.moveBoxToDownMsg.bind(this));
		message.on('createBox', this.createBoxMsg.bind(this));
	}

	_boxInfo = null

	_init = false
	createBoxMsg(info) {
		this._boxInfo = info;
		console.log(info)
		if (!this._init) {
			this._game.start()
			this._init = true
		}
	}

	handleCreateBox() {
		// info -> box
		return createBoxByType(this._boxInfo.type)
	}
	moveBoxToLeftMsg() {
		this._game.moveBoxToLeft()
	}
	moveBoxToRightMsg() {
		this._game.moveBoxToRight()
	}
	rotateBoxMsg() {
		this._game.rotateBox()
	}
	moveBoxToDownMsg() {
		this._game.moveBoxToDown()
	}
}