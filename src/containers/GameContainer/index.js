import React, { Component } from "react";
import { connect } from "react-redux";

import LoadingOverlay from "../../components/LoadingOverlay";
import StartGameModal from "../../components/StartGameModal";
import { fetchGame } from "../../redux/actions/game";

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStartGameModalOpen: false
    };
  }

  toggleStartGameModal = () => {
    this.setState(state => {
      return !state.isStartGameModalOpen;
    });
  };

  handleStartGame = (event, computerStarts = false) => {
    console.log("computer starts: ", computerStarts);
  };

  render() {
    const { isLoading, isGameStarted } = this.props;
    console.log(isLoading);
    return (
      <div>
        {isLoading && <LoadingOverlay />}
        <StartGameModal isOpen={true} handleStartGame={this.handleStartGame} />
        <div>Game1</div>
        <div>Game2</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.game.isLoading,
    isGameStarted: state.game.isGameStarted
  };
};

const mapDispatchToProps = {
  fetchGameAction: fetchGame
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameContainer);
