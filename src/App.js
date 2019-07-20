import React from "react";
import Styled from "styled-components";

import GameContainer from "./containers/GameContainer";

const Wrapper = Styled.div`
  height: 100vh;
`;

const GameContainerWrapper = Styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

const Header = Styled.div`
  text-align: center;
  padding-top: 50px;
  padding-bottom: 50px;
`;

function App() {
  return (
    <Wrapper className="columns is-mobile is-vcentered">
      <div className="column">
        <div className="columns is-centered is-mobile">
          <div className="column is-full">
            <Header className="title is-1">Drop Token</Header>
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
