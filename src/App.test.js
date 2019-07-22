import React from "react";
import { Provider } from "react-redux";
// I know you wouldn't use the real redux store in tests, I'm just making a bare-bones render test here
import store from "./redux/store";
import ReactDOM from "react-dom";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
