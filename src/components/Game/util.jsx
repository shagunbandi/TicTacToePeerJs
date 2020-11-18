const checkSuccess = (rowIndex, colIndex, turn, grid, props) => {
	const { streak, cnt } = props;
	if (
		cnt >= (streak - 1) * 2 &&
		(checkHorizontal(rowIndex, colIndex, turn, grid, props) ||
			checkVerical(rowIndex, colIndex, turn, grid, props) ||
			checkDiagnolRight(rowIndex, colIndex, turn, grid, props) ||
			checkDiagnolLeft(rowIndex, colIndex, turn, grid, props))
	)
		props.setWinner(turn);
};

const checkHorizontal = (rowIndex, colIndex, turn, grid, props) => {
	const { size, streak } = props;
	let cnt = 0;
	for (let i = colIndex; i < size; i++) {
		if (grid[rowIndex][i] === turn) cnt++;
		else break;
	}
	for (let i = colIndex - 1; i >= 0; i--) {
		if (grid[rowIndex][i] === turn) cnt++;
		else break;
	}
	if (cnt >= streak) {
		return true;
	}
	return false;
};

const checkVerical = (rowIndex, colIndex, turn, grid, props) => {
	const { size, streak } = props;
	let cnt = 0;
	for (let i = rowIndex; i < size; i++) {
		if (grid[i][colIndex] === turn) cnt++;
		else break;
	}
	for (let i = rowIndex - 1; i >= 0; i--) {
		if (grid[i][colIndex] === turn) cnt++;
		else break;
	}
	if (cnt >= streak) {
		return true;
	}
	return false;
};

const checkDiagnolRight = (rowIndex, colIndex, turn, grid, props) => {
	const { size, streak } = props;
	let cnt = 0;
	for (let i = rowIndex, j = colIndex; i < size && j < size; i++, j++) {
		if (grid[i][j] === turn) cnt++;
		else break;
	}
	for (let i = rowIndex - 1, j = colIndex - 1; i >= 0 && j >= 0; i--, j--) {
		if (grid[i][j] === turn) cnt++;
		else break;
	}
	if (cnt >= streak) {
		return true;
	}
	return false;
};

const checkDiagnolLeft = (rowIndex, colIndex, turn, grid, props) => {
	const { size, streak } = props;
	let cnt = 0;
	for (let i = rowIndex, j = colIndex; i < size && j >= 0; i++, j--) {
		if (grid[i][j] === turn) cnt++;
		else break;
	}
	for (let i = rowIndex - 1, j = colIndex + 1; i >= 0 && j < size; i--, j++) {
		if (grid[i][j] === turn) cnt++;
		else break;
	}
	if (cnt >= streak) {
		return true;
	}
	return false;
};

const getGrid = (size) => {
	let grid = [];
	for (let index = 0; index < size; index++) {
		grid.push([]);
		for (let index2 = 0; index2 < size; index2++) {
			grid[index].push('');
		}
	}
	return grid;
};

module.exports = {
	checkSuccess,
	getGrid,
};
