import React from "react";

import { render, cleanup, getAllByTitle } from "@testing-library/react";
import GameGrid from "..";
import { constructGrid } from "../../../helpers/grid";
import { PLAYER_IDS } from "../../../constants";

afterEach(cleanup);

describe("GameContainer", () => {
  it("should render the game grid when there is one", () => {
    const container = render(<GameGrid grid={constructGrid(6, "1")} />);
    expect(container.getByTitle("game-grid")).toBeTruthy();
  });
  it("should render nothing when there is no grid", () => {
    const container = render(<GameGrid />);
    expect(container.queryByTitle("game-grid")).toEqual(null);
  });
  it("should render a button row", () => {
    const grid = constructGrid(6, null);
    const selectableColumns = grid.map(_ => ({ numPlacementsLeft: 2 }));
    const container = render(
      <GameGrid grid={grid} selectableColumns={selectableColumns} />
    );
    expect(container.getByTestId("button-row").children).toHaveLength(
      grid.length
    );
  });
  it("should show token buttons if there are placements available", () => {
    const grid = constructGrid(6, null);
    const selectableColumns = grid.map(_ => ({ numPlacementsLeft: 2 }));
    const container = render(
      <GameGrid
        grid={grid}
        selectableColumns={selectableColumns}
        nextMovePlayer={PLAYER_IDS.PLAYER_1}
      />
    );
    const buttons = container.getAllByTestId("game-token selectable visible");
    expect(buttons).toHaveLength(6);
  });

  it("should hide token buttons if a column is filled", () => {
    const grid = constructGrid(6, null);
    const selectableColumns = grid.map(_ => ({ numPlacementsLeft: 2 }));
    selectableColumns[2].numPlacementsLeft = 0;
    selectableColumns[3].numPlacementsLeft = 0;
    const container = render(
      <GameGrid
        grid={grid}
        selectableColumns={selectableColumns}
        nextMovePlayer={PLAYER_IDS.PLAYER_1}
      />
    );
    const buttons = container.getAllByTestId("game-token selectable visible");
    expect(buttons).toHaveLength(4);
  });

  it("should render slots for each grid position", () => {
    const grid = constructGrid(6, null);
    const container = render(
      <GameGrid grid={grid} nextMovePlayer={PLAYER_IDS.PLAYER_1} />
    );
    const buttons = container.getAllByTestId("game-token visible");
    expect(buttons).toHaveLength(36);
  });

  it("should show the start game button if the game is over", () => {
    const grid = constructGrid(6, null);
    const container = render(
      <GameGrid
        grid={grid}
        nextMovePlayer={PLAYER_IDS.PLAYER_1}
        isGameOver={true}
      />
    );
    expect(container.getByText("Start a new game")).toBeTruthy();
  });
});
