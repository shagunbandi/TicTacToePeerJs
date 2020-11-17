import { INITIAL_SETUP, USER_PLAY, SET_WINNER } from "./types";

export const initialSetup = (size, streak, grid, conn) => (dispatch) => {
  dispatch({
    size: size,
    streak: streak,
    grid: grid,
    conn: conn,
    type: INITIAL_SETUP,
  });
};

export const userPlayed = (rowIndex, colIndex) => (dispatch) => {
  dispatch({
    rowIndex: rowIndex,
    colIndex: colIndex,
    type: USER_PLAY,
  });
};

export const setWinner = (winner) => (dispatch) => {
  dispatch({
    winner: winner,
    type: SET_WINNER,
  });
};
