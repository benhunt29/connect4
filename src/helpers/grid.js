export const constructGrid = (size, fillValue = null) => {
  return new Array(size)
    .fill(fillValue)
    .map(() => new Array(size).fill(fillValue));
};

export const addTokenToGrid = (grid, tokenColumn, tokenValue) => {
  const newGrid = [...grid];
  let row = newGrid.length - 1;
  while (row >= 0) {
    if (newGrid[row][tokenColumn] === null) {
      newGrid[row][tokenColumn] = tokenValue;
      break;
    }
    row--;
  }
  return { newGrid, placedRow: row, placedCol: tokenColumn };
};

export const hasWinner = (grid, lastPlacedToken, winningCount = 4) => {
  const { row, col, player } = lastPlacedToken;
  return (
    rowHasWinner(grid, row, col, player, winningCount) ||
    colHasWinner(grid, row, col, player, winningCount) ||
    diagonalHasWinner(grid, col, row, player, winningCount, -1)
  );
};

export const rowHasWinner = (
  grid,
  rowIndex,
  startColIndex,
  match,
  winningCount
) => {
  let count = 1;

  // check left
  let i = startColIndex - 1;
  while (i >= 0) {
    if (grid[rowIndex][i] === match) {
      count++;
      if (count === winningCount) return true;
      i--;
    } else {
      break;
    }
  }

  // check right
  i = startColIndex + 1;
  while (i <= grid.length - 1) {
    if (grid[rowIndex][i] === match) {
      count++;
      if (count === winningCount) return true;
      i++;
    } else {
      break;
    }
  }
  return false;
};

export const colHasWinner = (
  grid,
  startRowIndex,
  colIndex,
  match,
  winningCount
) => {
  let count = 1;
  // only need to check down (gravity, yo)
  let i = startRowIndex + 1;
  while (i <= grid.length - 1) {
    if (grid[i][colIndex] === match) {
      count++;
      if (count === winningCount) return true;
      i++;
    } else {
      break;
    }
  }
  return false;
};

export const diagonalHasWinner = (
  grid,
  startRowIndex,
  startColIndex,
  match,
  winningCount
) => {
  let i = startRowIndex - 1;
  let j = startColIndex + 1;
  let count = 1;
  // bottom left to top right diagonal
  while (i >= 0 && j <= grid.length - 1) {
    if (grid[i][j] === match) {
      count++;
      if (count === winningCount) return true;
      i--;
      j++;
    } else {
      break;
    }
  }
  i = startRowIndex + 1;
  j = startColIndex - 1;
  while (j >= 0 && i <= grid.length - 1) {
    if (grid[i][j] === match) {
      count++;
      if (count === winningCount) return true;
      j--;
      i++;
    } else {
      break;
    }
  }

  // reset count and check other diagonal (top left to bottom right)
  count = 1;
  i = startRowIndex - 1;
  j = startColIndex - 1;
  while (i >= 0 && j >= 0) {
    if (grid[i][j] === match) {
      count++;
      if (count === winningCount) return true;
      i--;
      j--;
    } else {
      break;
    }
  }

  i = startColIndex + 1;
  j = startRowIndex + 1;
  while (i <= grid.length - 1 && j <= grid.length - 1) {
    if (grid[i][j] === match) {
      count++;
      if (count === winningCount) return true;
      i++;
      j++;
    } else {
      break;
    }
  }
  return false;
};
