export function getBoxBottomPoints(matrix, initPoint) {

  const row = matrix.length
  const col = matrix[0].length

  const points = []
  
  for (let i = 0; i < col; i++) {
	  const x = i
	  const y = row - 1 + initPoint.y

	  points.push({
		  x,
		  y
	  })
  }
  return points
}