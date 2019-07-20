import { constructGrid, addTokenToGrid } from "../grid";

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
});
