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
  selectSelectableColumns,
  selectNextMovePlayer,
  selectGameMode,
  selectCurrentGameState
} from "../../redux/selectors/game";
import { GAME_MODES, PLAYER_IDS, GAME_STATES } from "../../constants";

const deriveWinningPlayer = nextMovePlayer => {
  if (nextMovePlayer === PLAYER_IDS.PLAYER_1) {
    return PLAYER_IDS.PLAYER_2;
  }
  return PLAYER_IDS.PLAYER_1;
};

class GameContainer extends Component {
  handleStartGame = (
    event,
    gameMode = GAME_MODES.MULTIPLAYER,
    startingPlayer
  ) => {
    const { fetchComputerMoveAction, startGameAction } = this.props;
    startGameAction(gameMode, startingPlayer);
    if (
      gameMode === GAME_MODES.SINGLE_PLAYER &&
      startingPlayer === PLAYER_IDS.PLAYER_2
    ) {
      fetchComputerMoveAction();
    }
  };

  render() {
    const {
      grid,
      submitPlayerMoveAction,
      selectableColumns,
      resetGameAction,
      resetErrorAction,
      nextMovePlayer,
      gameMode,
      currentGameState
    } = this.props;

    const isGameOver =
      currentGameState === GAME_STATES.DRAW ||
      currentGameState === GAME_STATES.WINNER;

    return (
      <>
        <LoadingOverlay isOpen={currentGameState === GAME_STATES.LOADING} />
        <StartGameModal
          isOpen={currentGameState === GAME_STATES.INITIAL}
          handleStartGame={this.handleStartGame}
          gameMode={gameMode}
        />
        <GameOverModal
          isOpen={isGameOver}
          handleStartNewGame={resetGameAction}
          winner={
            currentGameState === GAME_STATES.WINNER
              ? deriveWinningPlayer(nextMovePlayer)
              : ""
          }
          gameMode={gameMode}
        />
        <ErrorModal
          isOpen={currentGameState === GAME_STATES.ERROR}
          onClose={resetErrorAction}
        />

        <GameGrid
          grid={grid}
          handleMoveSelect={submitPlayerMoveAction}
          selectableColumns={selectableColumns}
          isGameOver={isGameOver}
          handleStartNewGame={resetGameAction}
          nextMovePlayer={nextMovePlayer}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    grid: selectGrid(state),
    selectableColumns: selectSelectableColumns(state),
    nextMovePlayer: selectNextMovePlayer(state),
    gameMode: selectGameMode(state),
    currentGameState: selectCurrentGameState(state)
  };
};

const mapDispatchToProps = {
  fetchComputerMoveAction: fetchComputerMove,
  submitPlayerMoveAction: (selectedColumn, player) =>
    submitPlayerMove(selectedColumn, player),
  startGameAction: startGame,
  resetGameAction: resetGame,
  resetErrorAction: resetError
};

GameContainer.propTypes = {
  hasGameStarted: PropTypes.bool,
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  selectableColumns: PropTypes.arrayOf(
    PropTypes.shape({ numPlacementsLeft: PropTypes.number })
  ),
  winner: PropTypes.string,
  gameIsDraw: PropTypes.bool,
  hasError: PropTypes.bool,
  nextMovePlayer: PropTypes.oneOf([PLAYER_IDS.PLAYER_1, PLAYER_IDS.PLAYER_2]),
  currentGameState: PropTypes.oneOf([
    GAME_STATES.LOADING,
    GAME_STATES.INITIAL,
    GAME_STATES.STARTED,
    GAME_STATES.DRAW,
    GAME_STATES.ERROR,
    GAME_STATES.WINNER
  ])
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameContainer);
