import React, { useCallback } from "react";
import Styled from "styled-components";

import Modal from "../Modal";

const CenteredColumn = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StartGameModal = ({ isOpen = false, handleStartGame }) => {
  const handleComputerStart = useCallback(() => {
    handleStartGame({}, true);
  }, [handleStartGame]);

  return (
    <Modal isOpen={isOpen} isClosable={false}>
      <div className="columns">
        <CenteredColumn className="column">
          <h2 className="title is-2">Let’s start a game!</h2>
        </CenteredColumn>
      </div>
      <div className="columns">
        <CenteredColumn className="column">
          <button className="button is-primary" onClick={handleStartGame}>
            I'll go first
          </button>
        </CenteredColumn>
        <CenteredColumn className="column">
          <button className="button is-primary" onClick={handleComputerStart}>
            Computer goes first
          </button>
        </CenteredColumn>
      </div>
    </Modal>
  );
};

export default StartGameModal;
