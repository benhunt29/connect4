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

const GameGrid = ({ grid, selectableColumns = [], handleMoveSelect }) => {
  let gridElements = grid.map(row => {
    return (
      <div className="columns is-mobile">
        {row.map(col => {
          return <Slot color={PLAYER_COLORS[col]} />;
        })}
      </div>
    );
  });

  const ButtonRow = (
    <WrapperColumn className="column is-two-thirds">
      <div className="columns">
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
    </WrapperColumn>
  );

  return (
    <WrapperColumns className="columns is-vcentered is-mobile">
      <div className="column">
        <div className="columns is-centered">{ButtonRow}</div>
        <div className="columns is-centered">
          <WrapperColumn className="column is-two-thirds has-background-grey-lighter">
            {gridElements}
          </WrapperColumn>
        </div>
      </div>
    </WrapperColumns>
  );
};

GameGrid.propTypes = {
  grid: PropTypes.array,
  handleMoveSelect: PropTypes.func,
  selectableColumns: PropTypes.object
};

export default GameGrid;
