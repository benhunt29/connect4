import React from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";

import Modal from "../Modal";

const CenteredColumn = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const getHeadingAndSubtext = (winner, isDraw) => {
  if (winner === "1") {
    return {
      headingText: "Congratulations!",
      subText: "You won! So much for that robot revolution."
    };
  } else if (winner === "2") {
    return {
      headingText: "Oh no!",
      subText:
        "It looks like the robots have won this time! Don’t worry, I’m sure it’s just a fluke. Definitely... Don’t... Panic..."
    };
  } else {
    return {
      headingText: "Well...",
      subText:
        "It looks like we’ve got ourselves a draw. Who knows what the implications of that are? ¯\\_(ツ)_/¯"
    };
  }
};

const GameOverModal = ({ isOpen = false, handleStartNewGame, winner }) => {
  const { headingText, subText } = getHeadingAndSubtext(winner);

  return (
    <Modal isOpen={isOpen} isClosable={false}>
      <div className="columns">
        <div className="column">
          <div className="columns">
            <CenteredColumn className="column">
              <h2 className="title is-2">{headingText}</h2>
            </CenteredColumn>
          </div>
          <div className="columns">
            <CenteredColumn className="column">
              <p>{subText}</p>
            </CenteredColumn>
          </div>
        </div>
      </div>
      <div className="columns">
        <CenteredColumn className="column">
          <button className="button is-primary" onClick={handleStartNewGame}>
            Start a new game
          </button>
        </CenteredColumn>
      </div>
    </Modal>
  );
};

GameOverModal.propTypes = {
  isOpen: PropTypes.bool,
  handleStartNewGame: PropTypes.func,
  winner: PropTypes.string
};

export default GameOverModal;
