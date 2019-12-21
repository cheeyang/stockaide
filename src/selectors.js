const getLoadingItems = () => state => state.app.loadingItems;

const getTheme = () => state => state.app.theme;

const selectors = { getLoadingItems, getTheme };

export default selectors;
