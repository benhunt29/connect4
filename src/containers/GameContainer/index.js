import React, { Component } from "react";
import { connect } from "react-redux";

import LoadingOverlay from "../../components/LoadingOverlay";
import StartGameModal from "../../components/StartGameModal";

class GameContainer extends Component {
  render() {
    const { isLoading, isGameStarted } = this.props;
    console.log(isLoading);
    return (
      <div>
        {isLoading && <LoadingOverlay />}
        <StartGameModal isOpen={true} />
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameContainer);
