const checkSuccess = (midBoxIndex, smallBoxIndex, turn, grid, props) => {
	if (checkHorizontal(smallBoxIndex, turn, grid[midBoxIndex])
			|| checkVerical(smallBoxIndex, turn, grid[midBoxIndex])
			|| checkDiagonal(smallBoxIndex, turn, grid[midBoxIndex])
	) {
		if (midBoxIndex === 9) {
			props.setWinner(turn)
			return
		}
		grid[9][midBoxIndex] = turn
		checkSuccess(9, midBoxIndex, turn, grid, props)
	}
};

const checkHorizontal = (clickedBoxIndex, turn, grid) => {
	const rowNumber = Math.floor(clickedBoxIndex/3)
	return grid[rowNumber * 3] === turn
		&& grid[rowNumber * 3+1] === turn
		&& grid[rowNumber * 3 + 2] === turn
};

const checkVerical = (clickedBoxIndex, turn, grid) => {
	return grid[clickedBoxIndex % 3] === turn
		&& grid[clickedBoxIndex % 3 + 3] === turn
		&& grid[clickedBoxIndex % 3 + 6] === turn
};

const checkDiagonal = (clickedBoxIndex, turn, grid) => {
	const diagonalRightIndex = [2, 4, 6]
	if (diagonalRightIndex.includes(clickedBoxIndex)) {
		return diagonalRightIndex.reduce((accumulator, value) => accumulator + (grid[value] === turn ? 1 : 0), 0) === 3;
	}
	
	const diagonalLeftIndex = [0, 4, 8]
	if (diagonalLeftIndex.includes(clickedBoxIndex)) {
		return diagonalLeftIndex.reduce((accumulator, value) => accumulator + (grid[value] === turn ? 1 : 0), 0) === 3;
	}
	
	return false
};

const getGridPro = () => {
	let grid = [];
	for (let index = 0; index < 10; index++) {
		grid.push([]);
		for (let index2 = 0; index2 < 9; index2++) {
			grid[index].push('')
		}
	}
	return grid;
};

module.exports = {
	checkSuccess,
	getGridPro
};
