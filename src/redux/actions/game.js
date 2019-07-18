import { formatUrl, makeRequest } from "../../helpers/requestHelper";

export const fetchGame = () => {
  return async (dispatch, getState) => {
    try {
      const url = formatUrl(
        "https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production",
        { moves: [] }
      );
      const response = await makeRequest(url);
    } catch (err) {
      console.log(err);
    }
  };
};
