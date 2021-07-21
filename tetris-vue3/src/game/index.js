export * from './config.js'
import { gameRow, gameCol } from './config.js'
import { render } from './renderer.js'
import { initMap } from './map.js'
import { addTicker } from './ticker'
import { intervalTimer } from './utils'
import { hitBorder } from './hit'
export function startGame(map) {
	const box = {
		x: 0,
		y: 0,
		shape: [
			[1,1],
			[1,1]
		]
	}
	
	initMap(map)
	render(box, map)

    const isDownMove = intervalTimer()

	function handleTicker(n) {
		if(isDownMove(n,1000) && !hitBorder(box)) {
		   box.y++;
		   render(box, map)	
		}
	}
    addTicker(handleTicker)
	
	window.addEventListener('keydown',(e) => {
		if(e.code === 'ArrowDown') {
			box.y++;
			render(box, map)
		}
	})

	// setInterval(() =>{
	// 	box.y++
	// 	render(box, map)
	// },1000)
	
}