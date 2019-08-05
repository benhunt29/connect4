import React from "react";
import Styled from "styled-components";

import GameContainer from "./containers/GameContainer";

const GameContainerWrapper = Styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

const Header = Styled.div`
  text-align: center;
  padding-top: 50px;
  padding-bottom: 20px;
  @media (min-height: 568px) {
    padding-top: 20px;
    padding-bottom: 10px;
  }
`;

function App() {
  return (
    <div className="container">
      <div className="columns is-mobile is-vcentered">
        <div className="column">
          <div className="columns is-centered is-mobile">
            <div className="column is-full">
              <Header className="title is-1">Connect4</Header>
            </div>
          </div>
          <GameContainerWrapper className="columns is-mobile">
            <div className="column">
              <GameContainer />
            </div>
          </GameContainerWrapper>
        </div>
      </div>
    </div>
  );
}

export default App;
