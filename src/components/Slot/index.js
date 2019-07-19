import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

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
  isVisible = false
}) => {
  const handleClick = useCallback(() => {
    return handleMoveSelect(slotColumn);
  }, [slotColumn, handleMoveSelect]);

  return (
    <SlotRow className="column">
      <Circle
        color={color}
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
  isVisiable: PropTypes.bool
};

export default Slot;
