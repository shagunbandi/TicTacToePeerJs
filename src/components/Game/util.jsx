const checkSuccess = (midBoxIndex, smallBoxIndex, turn, grid, props) => {
	const { cnt } = props;
	const streak = 3
	if (
		cnt >= (streak - 1) * 2 &&
		(checkHorizontal(midBoxIndex, smallBoxIndex, turn, grid, props) ||
			checkVerical(midBoxIndex, smallBoxIndex, turn, grid, props) ||
			checkDiagnolRight(midBoxIndex, smallBoxIndex, turn, grid, props) ||
			checkDiagnolLeft(midBoxIndex, smallBoxIndex, turn, grid, props))
	)
		props.setWinner(turn);
};

const checkHorizontal = (midBoxIndex, smallBoxIndex, turn, grid, props) => {
	const size = 3
	const streak = 3
	let cnt = 0;
	for (let i = smallBoxIndex; i < size; i++) {
		if (grid[midBoxIndex][i] === turn) cnt++;
		else break;
	}
	for (let i = smallBoxIndex - 1; i >= 0; i--) {
		if (grid[midBoxIndex][i] === turn) cnt++;
		else break;
	}
	if (cnt >= streak) {
		return true;
	}
	return false;
};

const checkVerical = (midBoxIndex, smallBoxIndex, turn, grid, props) => {
	const size = 3
	const streak = 3
	let cnt = 0;
	for (let i = midBoxIndex; i < size; i++) {
		if (grid[i][smallBoxIndex] === turn) cnt++;
		else break;
	}
	for (let i = midBoxIndex - 1; i >= 0; i--) {
		if (grid[i][smallBoxIndex] === turn) cnt++;
		else break;
	}
	if (cnt >= streak) {
		return true;
	}
	return false;
};

const checkDiagnolRight = (midBoxIndex, smallBoxIndex, turn, grid, props) => {
	const size = 3
	const streak = 3
	let cnt = 0;
	for (let i = midBoxIndex, j = smallBoxIndex; i < size && j < size; i++, j++) {
		if (grid[i][j] === turn) cnt++;
		else break;
	}
	for (let i = midBoxIndex - 1, j = smallBoxIndex - 1; i >= 0 && j >= 0; i--, j--) {
		if (grid[i][j] === turn) cnt++;
		else break;
	}
	if (cnt >= streak) {
		return true;
	}
	return false;
};

const checkDiagnolLeft = (midBoxIndex, smallBoxIndex, turn, grid, props) => {
	const size = 3
	const streak = 3
	let cnt = 0;
	for (let i = midBoxIndex, j = smallBoxIndex; i < size && j >= 0; i++, j--) {
		if (grid[i][j] === turn) cnt++;
		else break;
	}
	for (let i = midBoxIndex - 1, j = smallBoxIndex + 1; i >= 0 && j < size; i--, j++) {
		if (grid[i][j] === turn) cnt++;
		else break;
	}
	if (cnt >= streak) {
		return true;
	}
	return false;
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
	checkSuccess,
	getGridPro
};
