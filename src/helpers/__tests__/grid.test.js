import {
  constructGrid,
  addTokenToGrid,
  rowHasWinner,
  colHasWinner,
  diagonalHasWinner
} from "../grid";

describe("grid", () => {
  describe("constructGrid", () => {
    it("should construct a grid of a given size", () => {
      const grid = constructGrid(4);
      expect(grid).toHaveLength(4);
      expect(grid[0]).toHaveLength(4);
    });
  });

  describe("add token to grid", () => {
    it("should add a token to an empty grid", () => {
      const grid = constructGrid(4);
      const { newGrid, placedRow, placedCol } = addTokenToGrid(grid, 0, "1");
      expect(newGrid[newGrid.length - 1][0]).toEqual("1");
      expect(placedRow).toEqual(newGrid.length - 1);
      expect(placedCol).toEqual(0);
    });

    it("should add a token to a non empty grid", () => {
      const grid = constructGrid(4);
      grid[2][1] = "1";
      grid[3][1] = "2";
      const tokenCol = 1;
      const { newGrid, placedRow, placedCol } = addTokenToGrid(
        grid,
        tokenCol,
        "1"
      );
      expect(newGrid[1][tokenCol]).toEqual("1");
      expect(placedRow).toEqual(1);
      expect(placedCol).toEqual(tokenCol);
    });

    it("should do nothing to a full grid", () => {
      const grid = constructGrid(4, "1");
      const tokenCol = 1;
      const { newGrid } = addTokenToGrid(grid, tokenCol, "2");
      const allOnes = newGrid
        .reduce((acc, item) => {
          return [...acc, ...item];
        }, [])
        .every(item => item === "1");
      expect(allOnes).toEqual(true);
    });
  });

  describe("rowHasWinner", () => {
    it("should return true if the last placed token results in a winning row", () => {
      const grid = constructGrid(4);
      grid[3][0] = "1";
      grid[3][1] = "1";
      grid[3][3] = "1";
      const winningRow = rowHasWinner(grid, 3, 2, "1", 4);
      expect(winningRow).toEqual(true);
    });
    it("should return false if the last placed token does not result in a winning row", () => {
      const grid = constructGrid(4);
      grid[3][0] = "1";
      grid[3][1] = "1";
      grid[3][3] = "1";
      const winningRow = rowHasWinner(grid, 3, 1, "1", 4);
      expect(winningRow).toEqual(false);
    });
  });

  describe("colHasWinner", () => {
    it("should return true if the last placed token results in a winning column", () => {
      const grid = constructGrid(4);
      grid[1][1] = "2";
      grid[2][1] = "2";
      grid[3][1] = "2";
      const winningRow = colHasWinner(grid, 0, 1, "2", 4);
      expect(winningRow).toEqual(true);
    });
    it("should return false if the last placed token does not result in a winning column", () => {
      const grid = constructGrid(4);
      grid[1][1] = "2";
      grid[2][1] = "2";
      grid[3][1] = "2";
      const winningRow = rowHasWinner(grid, 0, 1, "1", 4);
      expect(winningRow).toEqual(false);
    });
  });

  describe("diagonalHasWinner", () => {
    it("should return true if the last placed token results in a winning diagonal (top left to bottom right)", () => {
      const grid = constructGrid(4);
      grid[0][0] = "2";
      grid[1][1] = "2";
      grid[2][2] = "2";
      const winningRow = diagonalHasWinner(grid, 3, 3, "2", 4);
      expect(winningRow).toEqual(true);
    });
    it("should return true if the last placed token results in a winning diagonal (top right to bottom left)", () => {
      const grid = constructGrid(4);
      grid[1][2] = "2";
      grid[2][1] = "2";
      grid[3][0] = "2";
      const winningRow = diagonalHasWinner(grid, 0, 3, "2", 4);
      expect(winningRow).toEqual(true);
    });
    it("should return false if the last placed token does not result in a winning column", () => {
      const grid = constructGrid(4);
      grid[1][2] = "2";
      grid[2][1] = "2";
      grid[3][0] = "2";
      const winningRow = rowHasWinner(grid, 0, 3, "2", 4);
      expect(winningRow).toEqual(false);
    });
  });
});
