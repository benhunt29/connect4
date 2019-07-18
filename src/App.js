import React from "react";
import styled from "styled-components";

import LoadingOverlay from "./components/LoadingOverlay";
import GameContainer from "./containers/GameContainer";

const Wrapper = styled.div`
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
