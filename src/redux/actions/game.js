import { formatUrl, makeRequest } from "../../helpers/requestHelper";
import {
  SUBMIT_MOVE_PENDING,
  SUBMIT_MOVE_SUCCESS,
  SUBMIT_MOVE_ERROR,
  START_GAME,
  GAME_IS_DRAW
} from "../actionTypes";

export const fetchComputerMove = delay => {
  return async (dispatch, getState) => {
    const {
      game: { moves = [] }
    } = getState();
    console.log(getState());
    try {
      dispatch({ type: SUBMIT_MOVE_PENDING });
      if (delay) {
        await new Promise(resolve => setTimeout(resolve(), 1000));
      }
      const url = formatUrl(
        "https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production",
        { moves }
      );
      const response = await makeRequest(url);
      dispatch({
        type: SUBMIT_MOVE_SUCCESS,
        payload: { moves: response, player: "2" }
      });
    } catch (err) {
      console.log("err: ", err.message);
      if (err.message.indexOf("overloaded")) {
        dispatch({ type: GAME_IS_DRAW });
      } else {
        dispatch({ type: SUBMIT_MOVE_ERROR, payload: err });
      }
      console.log("DRAW");
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
    console.log("WINNER: ", winner);
    // if (winner === "" && !gameIsDraw) {
    //   dispatch(fetchComputerMove(1000));
    // }
  };
};

export const startGame = () => {
  return dispatch => {
    dispatch({ type: START_GAME });
  };
};
