import React from "react";
import Styled from "styled-components";

import LoadingOverlay from "./components/LoadingOverlay";
import GameContainer from "./containers/GameContainer";

const Wrapper = Styled.div`
  height: 100vh;
`;

function App() {
  return (
    <Wrapper>
      <GameContainer />
    </Wrapper>
  );
}

export default App;
