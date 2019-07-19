import React from "react";
import Styled from "styled-components";

import GameContainer from "./containers/GameContainer";

const Wrapper = Styled.div`
  height: 100vh;
`;

const GameContainerWrapper = Styled.div`
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

const Header = Styled.div`
  text-align: center;
  padding-top: 50px;
`;

function App() {
  return (
    <Wrapper className="columns is-mobile">
      <div className="column">
        <div className="columns is-centered is-mobile">
          <div className="column is-half">
            <Header className="title">Drop Token</Header>
          </div>
        </div>
        <GameContainerWrapper className="columns is-mobile">
          <div className="column">
            <GameContainer />
          </div>
        </GameContainerWrapper>
      </div>
    </Wrapper>
  );
}

export default App;
