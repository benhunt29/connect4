import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

import { PLAYER_IDS } from "../../constants";
import Slot from "../Slot";

const WrapperColumns = Styled.div`
  height: 100%;
  max-width: 800px;
  margin: auto;
`;

const WrapperColumn = Styled.div`
  padding: 10px;
  border-radius: 10px;
  &&& {
    margin-bottom: 0;
  }
`;

const CenteredCol = Styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  &&& {
    margin-bottom: 0;
  }
  padding-top: 10px;
  padding-bottom: 10px;
`;

const GameGrid = ({
  grid = [],
  selectableColumns = [],
  handleMoveSelect,
  isGameOver,
  handleStartNewGame,
  nextMovePlayer
}) => {
  let gridElements = grid.map((row, i) => {
    return (
      <CenteredCol
        className="columns is-mobile is-gapless"
        key={`slotRow-${i}`}
      >
        {row.map((col, j) => {
          return (
            <div className="column" key={`slot${i}-${j}`}>
              <Slot player={col} />
            </div>
          );
        })}
      </CenteredCol>
    );
  });

  const ButtonRow = (
    <CenteredCol
      className="columns is-mobile is-gapless"
      data-testid="button-row"
    >
      {!isGameOver ? (
        grid.map((col, index) => {
          const isSelectable = Boolean(
            selectableColumns[index] &&
              selectableColumns[index].numPlacementsLeft > 0
          );
          return (
            <div className="column" key={index}>
              <Slot
                player={nextMovePlayer}
                handleMoveSelect={handleMoveSelect}
                slotColumn={index}
                isSelectable={isSelectable}
                isVisible={isSelectable}
              />
            </div>
          );
        })
      ) : (
        <button className="button is-primary" onClick={handleStartNewGame}>
          Start a new game
        </button>
      )}
    </CenteredCol>
  );

  return (
    grid.length > 0 && (
      <WrapperColumns
        className="columns is-vcentered is-centered is-mobile"
        title="game-grid"
      >
        <div className="column is-two-thirds-tablet is-full-mobile is-three-fourths-desktop is-full-fullhd is-gapless">
          <div className="columns is-centered is-mobile">
            <WrapperColumn className="column">{ButtonRow}</WrapperColumn>
          </div>
          <div className="columns is-centered is-mobile is-gapless">
            <WrapperColumn className="column has-background-grey-lighter">
              {gridElements}
            </WrapperColumn>
          </div>
        </div>
      </WrapperColumns>
    )
  );
};

GameGrid.propTypes = {
  grid: PropTypes.array,
  handleMoveSelect: PropTypes.func,
  handleStartNewGame: PropTypes.func,
  isGameOver: PropTypes.bool,
  selectableColumns: PropTypes.array,
  nextMovePlayer: PropTypes.oneOf([PLAYER_IDS.PLAYER_1, PLAYER_IDS.PLAYER_2])
};

export default GameGrid;
