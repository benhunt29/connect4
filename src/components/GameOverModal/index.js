import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";

import Modal from "../Modal";
import { PLAYER_IDS, GAME_MODES } from "../../constants";

const CenteredColumn = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const getHeadingAndSubtext = (winner, gameMode) => {
  if (gameMode === GAME_MODES.SINGLE_PLAYER && winner === PLAYER_IDS.PLAYER_1) {
    return {
      headingText: "Congratulations!",
      subText: "You won! So much for that robot revolution."
    };
  } else if (
    gameMode === GAME_MODES.SINGLE_PLAYER &&
    winner === PLAYER_IDS.PLAYER_2
  ) {
    return {
      headingText: "Oh no!",
      subText:
        "It looks like the robots have won this time! Don’t worry, I’m sure it’s just a fluke. Definitely... Don’t... Panic..."
    };
  } else if (gameMode === GAME_MODES.MULTIPLAYER && winner !== "") {
    return {
      headingText: `Congratulations Player ${winner}!`,
      subText: "You won!"
    };
  } else {
    return {
      headingText: "Well...",
      subText: `It looks like we’ve got ourselves a draw.${
        gameMode === GAME_MODES.SINGLE_PLAYER
          ? " Who knows what the implications of that are? ¯\\_(ツ)_/¯"
          : ""
      }`
    };
  }
};

const GameOverModal = ({
  isOpen = false,
  handleStartNewGame,
  winner,
  gameMode
}) => {
  const { headingText, subText } = getHeadingAndSubtext(winner, gameMode);

  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      title={"game-over-modal"}
    >
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
