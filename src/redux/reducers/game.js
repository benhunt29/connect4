import { constructGrid, addTokenToGrid, hasWinner } from "../../helpers/grid";
import {
  SUBMIT_MOVE_PENDING,
  SUBMIT_MOVE_SUCCESS,
  SUBMIT_MOVE_ERROR,
  START_GAME,
  GAME_IS_DRAW
} from "../actionTypes";

const initialState = {
  gridSize: 4,
  isLoading: false,
  hasGameStarted: false,
  moves: [],
  grid: [],
  selectableColumns: [],
  gameIsDraw: false,
  totalMovesLeft: 0,
  winner: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_MOVE_PENDING: {
      return { ...state, isLoading: true };
    }
    case SUBMIT_MOVE_SUCCESS: {
      const { grid, selectableColumns, gridSize } = state;

      const { moves, player } = action.payload;
      const lastMove = moves[moves.length - 1];

      const { grid: newGrid, placedRow, placedCol } = addTokenToGrid(
        grid,
        lastMove,
        player
      );

      const newSelectableColumns = [...selectableColumns];
      selectableColumns[placedCol].numPlacementsLeft--;
      const hasMovesLeft = newSelectableColumns.some(
        col => col.numPlacementsLeft > 0
      );
      console.log(hasMovesLeft);
      const winningMove = hasWinner(
        newGrid,
        { row: placedRow, col: placedCol, player },
        gridSize
      );
      return {
        ...state,
        isLoading: false,
        hasGameStarted: true,
        moves,
        grid: [...newGrid],
        selectableColumns: newSelectableColumns,
        winner: winningMove ? player : ""
      };
    }
    case SUBMIT_MOVE_ERROR: {
      return { ...state, error: action.payload.err };
    }
    case START_GAME: {
      const { gridSize } = state;
      const grid = constructGrid(gridSize);
      const selectableColumns = grid.map(row => ({
        numPlacementsLeft: row.length
      }));
      return { ...state, hasGameStarted: true, grid, selectableColumns };
    }
    case GAME_IS_DRAW: {
      return { ...state, gameIsDraw: true, isLoading: false };
    }
    default:
      return state;
  }
}
