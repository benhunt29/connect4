import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";
import { PLAYER_COLORS, PLAYER_IDS } from "../../constants";

const Circle = Styled.div`
  border-radius: 50%;
  width: 5vw;
  height: 5vw;
  min-width: 25px;
  min-height: 25px;
  max-width: 150px;
  max-height: 150px;
  background-color: ${props => props.color || "white"};
  &:hover {
    cursor: ${props => (props.isSelectable ? "pointer" : "")};
  }
  opacity: ${props => (props.isVisible ? 0 : 1)};
`;

const SlotRow = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const noop = () => {};

const Slot = ({
  color = "white",
  handleMoveSelect = noop,
  slotColumn,
  isSelectable,
  isVisible = false,
  player
}) => {
  const handleClick = useCallback(() => {
    return handleMoveSelect(slotColumn, player);
  }, [slotColumn, handleMoveSelect, player]);

  return (
    <SlotRow className="column">
      <Circle
        color={PLAYER_COLORS[player]}
        onClick={handleClick}
        isSelectable={isSelectable}
        isVisible={isVisible}
      />
    </SlotRow>
  );
};

Slot.propTypes = {
  color: PropTypes.string,
  handleMoveSelect: PropTypes.func,
  slotColumn: PropTypes.number,
  isSelectable: PropTypes.bool,
  isVisible: PropTypes.bool,
  nextMovePlayer: PropTypes.oneOf([PLAYER_IDS.PLAYER_1, PLAYER_IDS.PLAYER_2])
};

export default Slot;
