import {
  HOME_STATE,
  INITIAL_SETUP,
  SET_SUBTEXT,
  SET_WINNER,
  USER_PLAY,
} from "../actions/types";

const initialState = {
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
      const size = 3
      grid[action.midBoxIndex][action.smallBoxIndex] = state.turn ? "X" : "O";
      let cnt = state.cnt + 1;
      let winner = state.winner;
      if (cnt === size * size) winner = "draw";
      return {
        ...state,
        grid,
        cnt,
        winner,
        turn: action.turn,
        lastClickedBoxIndex: action.smallBoxIndex
      };

    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };

    case HOME_STATE:
      return {
        ...state,
        subtext: "",
        cnt: 0,
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
