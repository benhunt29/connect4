import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

import { PLAYER_COLORS } from "../../constants";
import Slot from "../Slot";

const WrapperColumns = Styled.div`
  height: 100%;
`;

const WrapperColumn = Styled.div`
  max-width: 500px;
  padding: 30px 10px 30px 10px;
  border-radius: 10px;
`;

const GameGrid = ({ grid = [], selectableColumns = [], handleMoveSelect }) => {
  let gridElements = grid.map(row => {
    return (
      <div className="columns is-mobile is-gapless">
        {row.map(col => {
          return (
            <div className="column">
              <Slot color={PLAYER_COLORS[col]} />
            </div>
          );
        })}
      </div>
    );
  });

  const ButtonRow = (
    <div className="columns is-mobile is-gapless">
      {grid.map((col, index) => {
        console.log(selectableColumns);
        const isSelectable = selectableColumns[index].numPlacementsLeft > 0;
        return (
          <div className="column">
            <Slot
              color={PLAYER_COLORS["1"]}
              handleMoveSelect={handleMoveSelect}
              slotColumn={index}
              isSelectable={isSelectable}
              isVisible={!isSelectable}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    grid.length > 0 && (
      <WrapperColumns className="columns is-vcentered is-mobile">
        <div className="column">
          <div className="columns is-centered is-mobile">
            <WrapperColumn className="column is-two-thirds-tablet is-four-fifths-mobile">
              {ButtonRow}
            </WrapperColumn>
          </div>
          <div className="columns is-centered is-mobile">
            <WrapperColumn className="column is-two-thirds-tablet is-four-fifths-mobile has-background-grey-lighter">
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
  selectableColumns: PropTypes.array
};

export default GameGrid;
