import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LoadingOverlay from "../../components/LoadingOverlay";
import StartGameModal from "../../components/StartGameModal";
import GameOverModal from "../../components/GameOverModal";
import ErrorModal from "../../components/ErrorModal";
import GameGrid from "../../components/GameGrid";
import {
  fetchComputerMove,
  submitPlayerMove,
  startGame,
  resetGame,
  resetError
} from "../../redux/actions/game";
import {
  selectGrid,
  selectGameHasStarted,
  selectGameIsDraw,
  selectHasError,
  selectIsLoading,
  selectSelectableColumns,
  selectWinner
} from "../../redux/selectors/game";

class GameContainer extends Component {
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
      selectableColumns,
      winner,
      resetGameAction,
      gameIsDraw,
      hasError,
      resetErrorAction
    } = this.props;

    const isGameOver = hasGameStarted && (winner !== "" || gameIsDraw);

    return (
      <>
        <LoadingOverlay isOpen={isLoading} />
        <StartGameModal
          isOpen={!hasGameStarted}
          handleStartGame={this.handleStartGame}
        />
        <GameOverModal
          isOpen={isGameOver}
          handleStartNewGame={resetGameAction}
          winner={winner}
        />
        <ErrorModal isOpen={hasError} onClose={resetErrorAction} />

        <GameGrid
          grid={grid}
          handleMoveSelect={submitPlayerMoveAction}
          selectableColumns={selectableColumns}
          isGameOver={isGameOver}
          handleStartNewGame={resetGameAction}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: selectIsLoading(state),
    hasGameStarted: selectGameHasStarted(state),
    grid: selectGrid(state),
    selectableColumns: selectSelectableColumns(state),
    winner: selectWinner(state),
    gameIsDraw: selectGameIsDraw(state),
    hasError: selectHasError(state)
  };
};

const mapDispatchToProps = {
  fetchComputerMoveAction: fetchComputerMove,
  submitPlayerMoveAction: selectedColumn => submitPlayerMove(selectedColumn),
  startGameAction: startGame,
  resetGameAction: resetGame,
  resetErrorAction: resetError
};

GameContainer.propTypes = {
  isLoading: PropTypes.bool,
  hasGameStarted: PropTypes.bool,
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  selectableColumns: PropTypes.arrayOf(
    PropTypes.shape({ numPlacementsLeft: PropTypes.number })
  ),
  winner: PropTypes.string,
  gameIsDraw: PropTypes.bool,
  hasError: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameContainer);
