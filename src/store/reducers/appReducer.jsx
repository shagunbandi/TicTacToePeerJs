import {
  HOME_STATE,
  INITIAL_SETUP,
  SET_SUBTEXT,
  SET_WINNER,
  USER_PLAY,
} from "../actions/types";

const initialState = {
  size: 3,
  streak: 3,
  grid: [],
  winner: "",
  subtext: "",
  cnt: 0,
  conn: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case INITIAL_SETUP:
      return {
        ...state,
        ...action,
        winner: "",
        cnt: 0,
      };

    case USER_PLAY:
      let grid = state.grid;
      grid[action.rowIndex][action.colIndex] = state.turn ? "X" : "O";
      let cnt = state.cnt + 1;
      let winner = state.winner;
      if (cnt === state.size * state.size) winner = "draw";
      return {
        ...state,
        grid,
        cnt,
        winner,
        turn: action.turn,
      };

    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };

    case HOME_STATE:
      return {
        ...state,
        size: 3,
        subtext: "",
        streak: 3,
        cnt: 0,
        conn: null,
        ...action,
      };

    case SET_SUBTEXT:
      return {
        ...state,
        subtext: action.subtext,
      };

    default:
      return state;
  }
}
