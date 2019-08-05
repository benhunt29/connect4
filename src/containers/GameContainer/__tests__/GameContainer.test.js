import React from "react";

import { render, cleanup } from "@testing-library/react";
import { GameContainer } from "..";
import { GAME_STATES } from "../../../constants";
import { constructGrid } from "../../../helpers/grid";

afterEach(cleanup);

describe("GameContainer", () => {
  it.each`
    gameState              | modalTitle
    ${GAME_STATES.INITIAL} | ${"start-game-modal"}
    ${GAME_STATES.WINNER}  | ${"game-over-modal"}
    ${GAME_STATES.DRAW}    | ${"game-over-modal"}
    ${GAME_STATES.ERROR}   | ${"error-modal"}
  `(
    "should display the correct modal for the $gameState state",
    ({ gameState, modalTitle }) => {
      const container = render(<GameContainer currentGameState={gameState} />);
      const modal = container.getByTitle(modalTitle);
      expect(modal.className.indexOf("is-active")).toBeGreaterThan(-1);
    }
  );

  it("should display the loading overlay when the gameState is LOADING", () => {
    const container = render(
      <GameContainer currentGameState={GAME_STATES.LOADING} />
    );
    expect(container.getByTitle("loading-overlay")).toBeTruthy();
  });

  it("should render the game grid when the gameState is STARTED", () => {
    const container = render(
      <GameContainer
        currentGameState={GAME_STATES.LOADING}
        grid={constructGrid(6, "1")}
      />
    );
    expect(container.getByTitle("game-grid")).toBeTruthy();
  });
});
