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
        payload: { moves: response, player: "2" }
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

export const submitPlayerMove = moveColumn => {
  return (dispatch, getState) => {
    const {
      game: { moves = [] }
    } = getState();
    dispatch({
      type: SUBMIT_MOVE_SUCCESS,
      payload: { moves: [...moves, moveColumn], player: "1" }
    });

    const {
      game: { winner, gameIsDraw }
    } = getState();
    if (winner === "" && !gameIsDraw) {
      dispatch(fetchComputerMove(1000));
    }
  };
};

export const startGame = () => {
  return dispatch => {
    dispatch({ type: START_GAME });
  };
};

export const resetGame = () => dispatch => dispatch({ type: RESET_GAME });

export const resetError = () => dispatch => dispatch({ type: RESET_ERROR });
