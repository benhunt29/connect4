import React, { Component } from "react";
import { connect } from "react-redux";

import LoadingOverlay from "../../components/LoadingOverlay";
import StartGameModal from "../../components/StartGameModal";
import GameGrid from "../../components/GameGrid";
import {
  fetchComputerMove,
  submitPlayerMove,
  startGame
} from "../../redux/actions/game";

class GameContainer extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isStartGameModalOpen: false
  //   };
  // }

  // toggleStartGameModal = () => {
  //   this.setState(state => {
  //     return !state.isStartGameModalOpen;
  //   });
  // };

  handleStartGame = (event, computerStarts = false) => {
    const { fetchComputerMoveAction, startGameAction } = this.props;
    startGameAction();
    if (computerStarts) {
      fetchComputerMoveAction();
    }
  };

  render() {
    const {
      isLoading,
      hasGameStarted,
      grid,
      submitPlayerMoveAction,
      selectableColumns
    } = this.props;
    return (
      <>
        {isLoading && <LoadingOverlay />}
        <StartGameModal
          isOpen={!hasGameStarted}
          handleStartGame={this.handleStartGame}
        />
        <GameGrid
          grid={grid}
          handleMoveSelect={submitPlayerMoveAction}
          selectableColumns={selectableColumns}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.game.isLoading,
    hasGameStarted: state.game.hasGameStarted,
    grid: state.game.grid,
    selectableColumns: state.game.selectableColumns
  };
};

const mapDispatchToProps = {
  fetchComputerMoveAction: fetchComputerMove,
  submitPlayerMoveAction: selectedColumn => submitPlayerMove(selectedColumn),
  startGameAction: startGame
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameContainer);
