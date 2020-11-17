import { act } from "react-dom/test-utils";
import { INITIAL_SETUP, SET_WINNER, USER_PLAY } from "../actions/types";

const initialState = {
  size: 3,
  streak: 3,
  grid: [],
  winner: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case INITIAL_SETUP:
      return {
        ...state,
        size: action.size,
        streak: action.streak,
        grid: action.grid,
        turn: "x",
      };

    case USER_PLAY:
      let grid = state.grid;
      grid[action.rowIndex][action.colIndex] = state.turn;
      let turn = state.turn === "x" ? "o" : "x";
      return {
        ...state,
        grid,
        turn,
      };

    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };

    default:
      return state;
  }
}
