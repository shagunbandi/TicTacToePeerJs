const checkMainGridSuccess = (midBoxIndex, turn, grid, props) => {
	if (checkHorizontal(midBoxIndex, turn, grid)
		|| checkVerical(midBoxIndex, turn, grid)
		|| checkDiagonal(midBoxIndex, turn, grid)) {
			props.setWinner(turn)
		}
}

const checkMidBoxSuccess = (midBoxIndex, smallBoxIndex, turn, grid, props) => {
	const { cnt } = props;
	const streak = 3
	if (
		cnt >= (streak - 1) * 2 &&
		(checkHorizontal(smallBoxIndex, turn, grid[midBoxIndex])
			|| checkVerical(smallBoxIndex, turn, grid[midBoxIndex])
			|| checkDiagonal(smallBoxIndex, turn, grid[midBoxIndex]))
	) {
		checkMainGridSuccess(midBoxIndex, turn, grid, props)
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
	for (let index = 0; index < 9; index++) {
		grid.push([]);
		for (let index2 = 0; index2 < 9; index2++) {
			grid[index].push('')
		}
	}
	return grid;
};

module.exports = {
	checkMidBoxSuccess,
	getGridPro
};
