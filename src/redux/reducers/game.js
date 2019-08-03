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
import { PLAYER_IDS, GAME_STATES } from "../../constants";

const initialState = {
  gridSize: 6,
  currentGameState: GAME_STATES.INITIAL,
  hasGameStarted: false,
  moves: [],
  grid: [],
  selectableColumns: [],
  error: undefined,
  gameMode: undefined,
  nextMovePlayer: undefined
};

const deriveGameState = (hasMovesLeft, winningMove) => {
  if (winningMove) {
    return GAME_STATES.WINNER;
  } else if (!hasMovesLeft) {
    return GAME_STATES.DRAW;
  } else {
    return GAME_STATES.STARTED;
  }
};

const handleSubmitMoveSuccess = (state, payload = {}) => {
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
    currentGameState: deriveGameState(hasMovesLeft, winningMove),
    moves,
    grid: newGrid,
    selectableColumns: newSelectableColumns,
    nextMovePlayer:
      player === PLAYER_IDS.PLAYER_1 ? PLAYER_IDS.PLAYER_2 : PLAYER_IDS.PLAYER_1
  };
};

const handleStartGame = (state, payload) => {
  const { gameMode, nextMovePlayer } = payload;
  const { gridSize } = state;
  const grid = constructGrid(gridSize);
  const selectableColumns = grid.map(row => ({
    numPlacementsLeft: row.length
  }));
  return {
    ...state,
    currentGameState: GAME_STATES.STARTED,
    grid,
    selectableColumns,
    gameMode,
    nextMovePlayer
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_MOVE_PENDING: {
      return { ...state, currentGameState: GAME_STATES.LOADING };
    }
    case SUBMIT_MOVE_SUCCESS: {
      return handleSubmitMoveSuccess(state, action.payload);
    }
    case SUBMIT_MOVE_ERROR: {
      return {
        ...state,
        error: action.payload.err || "error",
        currentGameState: GAME_STATES.ERROR
      };
    }
    case START_GAME: {
      return handleStartGame(state, action.payload);
    }
    case BOARD_IS_FULL: {
      return { ...state, currentGameState: GAME_STATES.DRAW };
    }
    case RESET_ERROR:
      return {
        ...state,
        currentGameState: GAME_STATES.STARTED,
        error: undefined
      };
    case RESET_GAME:
      return initialState;
    default:
      return state;
  }
}
