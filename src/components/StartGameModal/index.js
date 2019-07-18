import React, { useState, useCallback } from "react";
import styled from "styled-components";

const ModalContent = styled.div`
  background-color: white;
  border-radius: 5px;
`;

const CenteredColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StartGameModal = ({ isOpen = false, startGame }) => {
  const [isActive, setIsActive] = useState(isOpen);

  const toggleModal = useCallback(() => {
    setIsActive(!setIsActive);
  }, [isActive]);

  return (
    <div className={`modal${isActive ? " is-active" : ""}`}>
      <div className="modal-background" onClick={toggleModal} />
      <ModalContent className="modal-content">
        <div className="columns">
          <CenteredColumn className="column">
            <h2 className="title is-2">Let’s start a game!</h2>
          </CenteredColumn>
        </div>
        <div className="columns">
          <CenteredColumn className="column">
            <button className="button is-primary">I'll go first</button>
          </CenteredColumn>
          <CenteredColumn className="column">
            <button className="button is-primary">Computer goes first</button>
          </CenteredColumn>
        </div>
      </ModalContent>
      <button className="modal-close is-large" aria-label="close" />
    </div>
  );
};

export default StartGameModal;
