export const selectIsLoading = state => state.game.isLoading;
export const selectGameHasStarted = state => state.game.hasGameStarted;
export const selectGrid = state => state.game.grid;
export const selectSelectableColumns = state => state.game.selectableColumns;
export const selectWinner = state => state.game.winner;
export const selectGameIsDraw = state => state.game.gameIsDraw;
export const selectHasError = state => Boolean(state.game.error);
