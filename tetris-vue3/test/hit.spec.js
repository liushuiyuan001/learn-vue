import { hitBorder } from '../src/game/hit';
import { gameRow } from '../src/game/config'

test("当box到底的时候, 应该返回true", () => {
   const box = {
	   x: 0,
	   y: gameRow - 1,
	   shape: [
		  [1,1],
		  [1,1]
	   ]
   }

   expect(hitBorder(box)).toBe(true);
})