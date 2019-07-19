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
  const rowCount = getRowCount(grid, row, col, player);
  console.log("ROW COUNT", rowCount);
  const colCount = getColCount(grid, row, col, player);
  console.log("COL COUNT", rowCount);
  return rowCount >= 4;
};

const getRowCount = (grid, rowIndex, startColIndex, match) => {
  let leftRunner = startColIndex;
  let rightRunner = startColIndex;
  let count = 0;
  while (leftRunner >= 0) {
    if (grid[rowIndex][leftRunner] === match) {
      count++;
    } else {
      break;
    }
    leftRunner--;
  }
  while (rightRunner <= grid.length - 1) {
    if (grid[rowIndex][rightRunner] === match) {
      count++;
    } else {
      break;
    }
    rightRunner++;
  }
  return count;
};

const getColCount = (grid, startRowIndex, colIndex, match) => {
  let topRunner = startRowIndex;
  let bottomRunner = startRowIndex;
  let count = 0;
  while (topRunner >= 0) {
    if (grid[topRunner][colIndex] === match) {
      count++;
    } else {
      break;
    }
    colIndex--;
  }
  while (bottomRunner <= grid.length - 1) {
    if (grid[bottomRunner][colIndex] === match) {
      count++;
    } else {
      break;
    }
    colIndex++;
  }
  return count;
};
