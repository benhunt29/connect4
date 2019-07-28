import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

import { PLAYER_COLORS } from "../../constants";
import Slot from "../Slot";

const WrapperColumns = Styled.div`
  height: 100%;
`;

const WrapperColumn = Styled.div`
  padding: 30px 10px 30px 10px;
  border-radius: 10px;
`;

const CenteredCol = Styled.div`
  display: flex;
  justify-content: center;
`;

const GameGrid = ({
  grid = [],
  selectableColumns = [],
  handleMoveSelect,
  isGameOver,
  handleStartNewGame
}) => {
  let gridElements = grid.map((row, i) => {
    return (
      <div className="columns is-mobile is-gapless" key={`slotRow-${i}`}>
        {row.map((col, j) => {
          return (
            <div className="column" key={`slot${i}-${j}`}>
              <Slot color={PLAYER_COLORS[col]} />
            </div>
          );
        })}
      </div>
    );
  });

  const ButtonRow = (
    <CenteredCol className="columns is-mobile is-gapless">
      {!isGameOver ? (
        grid.map((col, index) => {
          const isSelectable = selectableColumns[index].numPlacementsLeft > 0;
          return (
            <div className="column" key={index}>
              <Slot
                color={PLAYER_COLORS["1"]}
                handleMoveSelect={handleMoveSelect}
                slotColumn={index}
                isSelectable={isSelectable}
                isVisible={!isSelectable}
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
      <WrapperColumns className="columns is-vcentered is-centered is-mobile">
        <div className="column is-two-thirds-tablet is-full-mobile is-three-fourths-desktop is-full-fullhd">
          <div className="columns is-centered is-mobile">
            <WrapperColumn className="column">{ButtonRow}</WrapperColumn>
          </div>
          <div className="columns is-centered is-mobile">
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
  selectableColumns: PropTypes.array
};

export default GameGrid;
