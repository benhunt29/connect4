import React from "react";

import styled, { keyframes } from "styled-components";

const Overlay = styled.div`
  background-color: white;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 10000;
`;

// credit to https://gist.github.com/adrianmcli/9fac3ff3c144c2805be90381eaa8d3d4
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 2px solid black;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const LoadingOverlay = () => (
  <Overlay>
    <Spinner />
  </Overlay>
);

export default LoadingOverlay;
