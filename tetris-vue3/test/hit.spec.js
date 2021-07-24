import { hitBottomBorder, hitBottomBox } from '../src/game/hit';
import { gameRow } from '../src/game/config'

test("当box到底的时候, 应该返回true", () => {
	const box = {
		x: 0,
		y: gameRow - 1,
		shape: [
			[1, 1],
			[1, 1]
		]
	}

	expect(hitBottomBorder(box)).toBe(true);
})


test("当box碰到其他box的时候, 应该返回true", () => {
	const box = {
		x: 0,
		y: 0,
		shape: [
			[0, 1, 0],
			[1, 1, 0],
			[1, 0, 0]
		]
	}

	const map = [
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, -1, 0, 0, 0, 0],
		[-1, -1, 0, 0, 0, 0],
		[-1, 0, 0, 0, 0, 0]
	]

	expect(hitBottomBox(box, map)).toBe(false);
})
