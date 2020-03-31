const getSelectedTicker = () => state => state.trade.selectedTicker;
const getTickerHistory = () => state => state.trade.tickerHistory;

// const getIbkrAuth = () => state => state.auth.ibkrAuth;

const selectors = { getSelectedTicker, getTickerHistory };

export default selectors;
