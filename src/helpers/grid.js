export const constructGrid = size => {
  return new Array(size).fill(null).map(() => new Array(size).fill(null));
};

export const addTokenToGrid = (grid, tokenColumn, tokenValue) => {
  let row = grid.length - 1;
  while (row >= 0) {
    if (grid[row][tokenColumn] === null) {
      grid[row][tokenColumn] = tokenValue;
      break;
    }
    row--;
  }
  return { grid, placedRow: row, placedCol: tokenColumn };
};

export const hasWinner = (grid, lastPlacedToken, winningCount = 4) => {
  const { row, col, player } = lastPlacedToken;
  console.log(player);
  const rowWinner = rowHasWinner(grid, row, col, player, winningCount);
  console.log("ROW WINNER", rowWinner);
  const colWinner = colHasWinner(grid, row, col, player, winningCount);
  console.log("COL WINNER: ", colWinner);
  // const colCount = getColCount(grid, row, col, player);
  // console.log("COL COUNT", rowCount);
  // return rowWinner || colWinner ||;
  return diagonalHasWinner(grid, col, row, player, winningCount, -1);
};

const rowHasWinner = (grid, rowIndex, startColIndex, match, winningCount) => {
  let leftRunner = startColIndex - 1;
  let rightRunner = startColIndex + 1;
  let count = 1;
  while (leftRunner >= 0) {
    if (grid[rowIndex][leftRunner] === match) {
      count++;
      if (count === winningCount) return true;
      leftRunner--;
    } else {
      break;
    }
  }

  while (rightRunner <= grid.length - 1) {
    if (grid[rowIndex][rightRunner] === match) {
      count++;
      if (count === winningCount) return true;
      rightRunner++;
    } else {
      break;
    }
  }
  return false;
};

const colHasWinner = (grid, startRowIndex, colIndex, match, winningCount) => {
  let upRunner = startRowIndex - 1;
  let downRunner = startRowIndex + 1;
  let count = 1;
  console.log("GRID: ", grid);
  console.log("ROW INDEX: ", colIndex);
  console.log("BOTTOM RUNNER: ", downRunner);
  while (upRunner >= 0) {
    if (grid[upRunner][colIndex] === match) {
      count++;
      if (count === winningCount) return true;
      upRunner--;
    } else {
      break;
    }
  }
  while (downRunner <= grid.length - 1) {
    if (grid[downRunner][colIndex] === match) {
      count++;
      if (count === winningCount) return true;
      downRunner++;
    } else {
      break;
    }
  }
  return false;
};

const diagonalHasWinner = (
  grid,
  startRowIndex,
  startColIndex,
  match,
  winningCount,
  diagonalDirection
) => {
  let upRunner = startRowIndex - diagonalDirection;
  let downRunner = startRowIndex + diagonalDirection;
  let leftRunner = startColIndex - diagonalDirection;
  let rightRunner = startColIndex + diagonalDirection;

  let count = 1;

  while (upRunner >= 0 && rightRunner <= grid.length - 1) {
    if (grid[upRunner][rightRunner] === match) {
      count++;
      if (count === winningCount) return true;
      upRunner--;
      rightRunner++;
    } else {
      break;
    }
  }
  while (leftRunner >= 0 && downRunner <= grid.length - 1) {
    if (grid[downRunner][leftRunner] === match) {
      count++;
      if (count === winningCount) return true;
      leftRunner--;
      downRunner++;
    } else {
      break;
    }
  }
  console.log(count);
  return false;
};
