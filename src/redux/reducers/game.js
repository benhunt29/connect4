import { constructGrid, addTokenToGrid, hasWinner } from "../../helpers/grid";
import {
  SUBMIT_MOVE_PENDING,
  SUBMIT_MOVE_SUCCESS,
  SUBMIT_MOVE_ERROR,
  START_GAME
} from "../actionTypes";

const initialState = {
  isLoading: false,
  hasGameStarted: false,
  moves: [],
  grid: [],
  selectableColumns: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_MOVE_PENDING: {
      return { ...state, isLoading: true };
    }
    case SUBMIT_MOVE_SUCCESS: {
      const { grid, selectableColumns } = state;

      const { moves, player } = action.payload;
      const lastMove = moves[moves.length - 1];

      const { grid: newGrid, placedRow, placedCol } = addTokenToGrid(
        grid,
        lastMove,
        player
      );

      const newSelectableColumns = [...selectableColumns];
      selectableColumns[placedCol].numPlacementsLeft--;

      console.log(
        "HAS WINNER",
        hasWinner(newGrid, { row: placedRow, col: placedCol, player }, 4)
      );

      return {
        ...state,
        isLoading: false,
        hasGameStarted: true,
        moves,
        grid: [...newGrid],
        selectableColumns: newSelectableColumns
      };
    }
    case SUBMIT_MOVE_ERROR: {
      return { ...state, error: action.payload.err };
    }
    case START_GAME: {
      const grid = constructGrid(4);
      const selectableColumns = grid.map(row => ({
        numPlacementsLeft: row.length
      }));
      return { ...state, hasGameStarted: true, grid, selectableColumns };
    }
    default:
      return state;
  }
}
