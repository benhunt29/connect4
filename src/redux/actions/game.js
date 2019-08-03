import { formatUrl, makeRequest } from "../../helpers/requestHelper";
import {
  SUBMIT_MOVE_PENDING,
  SUBMIT_MOVE_SUCCESS,
  SUBMIT_MOVE_ERROR,
  START_GAME,
  BOARD_IS_FULL,
  RESET_GAME,
  RESET_ERROR
} from "../actionTypes";
import { GAME_MODES, PLAYER_IDS, GAME_STATES } from "../../constants";

export const fetchComputerMove = delay => {
  return async (dispatch, getState) => {
    const {
      game: { moves = [], gridSize }
    } = getState();
    try {
      dispatch({ type: SUBMIT_MOVE_PENDING });
      if (delay) {
        await new Promise(resolve => setTimeout(resolve(), 1000));
      }
      const url = formatUrl(
        "https://q471hkjdga.execute-api.us-west-2.amazonaws.com/default/connect4",
        { moves, size: gridSize }
      );
      const response = await makeRequest(url);
      dispatch({
        type: SUBMIT_MOVE_SUCCESS,
        payload: { moves: response, player: PLAYER_IDS.PLAYER_2 }
      });
    } catch (err) {
      const { message = "error" } = err;
      if (message.indexOf("overloaded") > 0) {
        dispatch({ type: BOARD_IS_FULL });
      } else {
        dispatch({ type: SUBMIT_MOVE_ERROR, payload: { err: message } });
      }
    }
  };
};

export const submitPlayerMove = (moveColumn, player) => {
  return (dispatch, getState) => {
    const {
      game: { moves = [] }
    } = getState();
    dispatch({
      type: SUBMIT_MOVE_SUCCESS,
      payload: { moves: [...moves, moveColumn], player }
    });

    const {
      game: { currentGameState, gameMode }
    } = getState();
    if (
      gameMode === GAME_MODES.SINGLE_PLAYER &&
      currentGameState === GAME_STATES.STARTED
    ) {
      dispatch(fetchComputerMove(1000));
    }
  };
};

export const startGame = (gameMode, startingPlayer) => {
  return dispatch => {
    dispatch({
      type: START_GAME,
      payload: {
        gameMode,
        nextMovePlayer: startingPlayer
      }
    });
  };
};

export const resetGame = () => dispatch => dispatch({ type: RESET_GAME });

export const resetError = () => dispatch => dispatch({ type: RESET_ERROR });
