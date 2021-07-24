export * from './config.js'
import { gameRow, gameCol } from './config.js'
import { createBox } from './box'
import { render } from './renderer.js'
import { initMap, addBoxToMap, eliminate } from './map.js'
import { addTicker } from './ticker'
import { intervalTimer } from './utils'
import { hitBottomBorder, hitBottomBox } from './hit'
export function startGame(map) {

	initMap(map)

	const isDownMove = intervalTimer()
	let activeBox = createBox()

	function handleTicker(n) {
		if (isDownMove(n, 1000)) {
			if (hitBottomBorder(activeBox) || hitBottomBox(activeBox, map)) {
				addBoxToMap(activeBox, map)
				activeBox = createBox()
				eliminate(map)
				return
			}
			activeBox.y++;
		}
		render(activeBox, map)
	}

	window.addEventListener('keydown', (e) => {
		switch (e.code) {
			case 'ArrowLeft':
				activeBox.x--;
				break;
			case 'ArrowRight':
				activeBox.x++;
				break;
			case 'ArrowDown':
				activeBox.y++;
				break;
			case 'Space':
				activeBox.rotate()
				break;
			default:
				break;
		}
	})

	addTicker(handleTicker)

}