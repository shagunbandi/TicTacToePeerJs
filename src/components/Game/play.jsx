import React, { Component } from "react";
import { connect } from "react-redux";

import { userPlayed, setWinner } from "../../store/actions/appActions";

export class Play extends Component {
  boxClicked = (rowIndex, colIndex) => {
    let grid = this.props.grid;
    if (this.props.winner === "" && grid[rowIndex][colIndex] === "") {
      const turn = this.props.turn;
      grid[rowIndex][colIndex] = turn;
      this.props.userPlayed(rowIndex, colIndex);
      this.checkSuccess(rowIndex, colIndex, turn, grid);
    }
  };

  checkSuccess = (rowIndex, colIndex, turn, grid) => {
    if (
      this.props.cnt >= 2 * this.props.size - 1 &&
      (this.checkHorizontal(rowIndex, colIndex, turn, grid) ||
        this.checkVerical(rowIndex, colIndex, turn, grid) ||
        this.checkDiagnolRight(rowIndex, colIndex, turn, grid) ||
        this.checkDiagnolLeft(rowIndex, colIndex, turn, grid))
    )
      this.props.setWinner(turn);
  };

  checkHorizontal = (rowIndex, colIndex, turn, grid) => {
    const { size, streak } = this.props;
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

  checkVerical = (rowIndex, colIndex, turn, grid) => {
    const { size, streak } = this.props;
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

  checkDiagnolRight = (rowIndex, colIndex, turn, grid) => {
    const { size, streak } = this.props;
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

  checkDiagnolLeft = (rowIndex, colIndex, turn, grid) => {
    const { size, streak } = this.props;
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

  render() {
    let grid = this.props.grid.map((row, rowIndex) => {
      return (
        <div className='row'>
          {row.map((value, colIndex) => {
            return (
              <div
                className='box text-center align-middle'
                onClick={() => this.boxClicked(rowIndex, colIndex)}>
                {value}
              </div>
            );
          })}
        </div>
      );
    });

    let message;
    if (this.props.winner === "draw") {
      message = "Game Draw";
    } else if (this.props.winner === "") {
      message = this.props.turn + " turn to play";
    } else {
      message = this.props.winner + " has won the game";
    }

    return (
      <>
        {grid}
        <div className='row'>
          <h1>{message}</h1>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  size: state.app.size,
  streak: state.app.streak,
  grid: state.app.grid,
  turn: state.app.turn,
  winner: state.app.winner,
  cnt: state.app.cnt,
});

export default connect(mapStateToProps, { userPlayed, setWinner })(Play);
