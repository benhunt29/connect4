import React from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";

const ModalContent = Styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 10px 10px 10px 10px;
  max-width: 500px;
`;

const noop = () => {};

const Modal = ({ isOpen = false, onClose, isClosable = true, children }) => {
  return (
    <div className={`modal${isOpen ? " is-active" : ""}`}>
      <div className="modal-background" onClick={isClosable ? onClose : noop} />
      <ModalContent className="modal-content is-clipped">
        {children}
      </ModalContent>
      {isClosable && (
        <button className="modal-close is-large" aria-label="close" />
      )}
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  isClosable: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Modal;
