import { gameRow, gameCol } from './config.js';

export function initMap(map) {
	for(let i = 0; i < gameRow; i++) {
		map[i] = []
		for(let j = 0; j < gameCol; j++) {
			map[i][j] = 0
		}
	}
}