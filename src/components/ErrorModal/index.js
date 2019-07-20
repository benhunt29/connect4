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

const ErrorModal = ({
  isOpen = false,
  message = "Looks like something’s wrong, please try again",
  onClose
}) => {
  return (
    <Modal isOpen={isOpen} isClosable={true} onClose={onClose}>
      <div className="columns">
        <div className="column">
          <div className="columns">
            <CenteredColumn className="column">
              <h2 className="title is-2">Sorry!</h2>
            </CenteredColumn>
          </div>
          <div className="columns">
            <CenteredColumn className="column">
              <p>{message}</p>
            </CenteredColumn>
          </div>
        </div>
      </div>
    </Modal>
  );
};

ErrorModal.propTypes = {
  isOpen: PropTypes.bool,
  message: PropTypes.string,
  onClose: PropTypes.func
};

export default ErrorModal;
