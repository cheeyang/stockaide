const setSelectedTicker = (state, selectedTicker) => ({
  ...state,
  selectedTicker
});

const setTickerHistory = (state, tickerHistory) => ({
  ...state,
  tickerHistory
});

const reducers = {
  setSelectedTicker,
  setTickerHistory
  // setIbkrAuth
};

export default reducers;
