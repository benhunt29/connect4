import React, { useCallback, useState, useEffect } from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";

import Modal from "../Modal";
import { GAME_MODES, PLAYER_IDS } from "../../constants";

const CenteredColumn = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StartGameModal = ({
  isOpen = false,
  handleStartGame,
  gameMode: initialGameMode = null
}) => {
  const [gameMode, setGameMode] = useState(initialGameMode);
  useEffect(() => {
    setGameMode(initialGameMode);
  }, [initialGameMode]);

  const handlePlayer1Start = useCallback(() => {
    handleStartGame({}, gameMode, PLAYER_IDS.PLAYER_1);
  }, [handleStartGame, gameMode]);

  const handlePlayer2Start = useCallback(() => {
    handleStartGame({}, gameMode, PLAYER_IDS.PLAYER_2);
  }, [handleStartGame, gameMode]);

  return (
    <Modal isOpen={isOpen} isClosable={false}>
      <div className="columns">
        <CenteredColumn className="column">
          <h2 className="title is-2">Let’s start a game!</h2>
        </CenteredColumn>
      </div>
      <div className="columns">
        {gameMode === null ? (
          <>
            <CenteredColumn className="column">
              <button
                className="button is-primary"
                onClick={() => setGameMode(GAME_MODES.SINGLE_PLAYER)}
              >
                Single Player
              </button>
            </CenteredColumn>
            <CenteredColumn className="column">
              <button
                className="button is-primary"
                onClick={() => setGameMode(GAME_MODES.MULTIPLAYER)}
              >
                Multiplayer
              </button>
            </CenteredColumn>
          </>
        ) : (
          <>
            <CenteredColumn className="column">
              <button
                className="button is-primary"
                onClick={handlePlayer1Start}
              >
                {gameMode === GAME_MODES.SINGLE_PLAYER
                  ? "I'll go first"
                  : "Player 1 goes first"}
              </button>
            </CenteredColumn>
            <CenteredColumn className="column">
              <button
                className="button is-primary"
                onClick={handlePlayer2Start}
              >
                {gameMode === GAME_MODES.SINGLE_PLAYER
                  ? "Computer goes first"
                  : "Player 2 goes first"}
              </button>
            </CenteredColumn>
          </>
        )}
      </div>
    </Modal>
  );
};

StartGameModal.propTypes = {
  isOpen: PropTypes.bool,
  handleStartGame: PropTypes.func,
  gameMode: PropTypes.oneOf([GAME_MODES.SINGLE_PLAYER, GAME_MODES.MULTIPLAYER])
};

export default StartGameModal;
