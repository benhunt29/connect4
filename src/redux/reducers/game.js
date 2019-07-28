import { constructGrid, addTokenToGrid, hasWinner } from "../../helpers/grid";
import {
  SUBMIT_MOVE_PENDING,
  SUBMIT_MOVE_SUCCESS,
  SUBMIT_MOVE_ERROR,
  START_GAME,
  BOARD_IS_FULL,
  RESET_GAME,
  RESET_ERROR
} from "../actionTypes";

const initialState = {
  gridSize: 6,
  isLoading: false,
  hasGameStarted: false,
  moves: [],
  grid: [],
  selectableColumns: [],
  gameIsDraw: false,
  winner: "",
  error: undefined
};

const handleSubmitMoveSuccess = (state, payload) => {
  const { grid, selectableColumns } = state;

  const { moves, player } = payload;
  const lastMove = moves[moves.length - 1];

  const { newGrid, placedRow, placedCol } = addTokenToGrid(
    grid,
    lastMove,
    player
  );

  const newSelectableColumns = [...selectableColumns];
  selectableColumns[placedCol].numPlacementsLeft--;
  const hasMovesLeft = newSelectableColumns.some(
    col => col.numPlacementsLeft > 0
  );
  const winningMove = hasWinner(newGrid, {
    row: placedRow,
    col: placedCol,
    player
  });
  return {
    ...state,
    isLoading: false,
    hasGameStarted: true,
    moves,
    grid: newGrid,
    selectableColumns: newSelectableColumns,
    winner: winningMove ? player : "",
    gameIsDraw: !hasMovesLeft && !winningMove
  };
};

const handleStartGame = state => {
  const { gridSize } = state;
  const grid = constructGrid(gridSize);
  const selectableColumns = grid.map(row => ({
    numPlacementsLeft: row.length
  }));
  return { ...state, hasGameStarted: true, grid, selectableColumns };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_MOVE_PENDING: {
      return { ...state, isLoading: true };
    }
    case SUBMIT_MOVE_SUCCESS: {
      return handleSubmitMoveSuccess(state, action.payload || {});
    }
    case SUBMIT_MOVE_ERROR: {
      return {
        ...state,
        error: action.payload.err || "error",
        isLoading: false
      };
    }
    case START_GAME: {
      return handleStartGame(state);
    }
    case BOARD_IS_FULL: {
      return { ...state, gameIsDraw: true, isLoading: false };
    }
    case RESET_ERROR:
      return { ...state, error: undefined };
    case RESET_GAME:
      return initialState;
    default:
      return state;
  }
}
