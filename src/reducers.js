import without from "lodash/without";
/**
 * @param {string} loadingId
 * @param {bool} showSpinner
 */
const setLoading = (state, loadingId, showSpinner) => {
  let loadingItems;
  if (showSpinner) {
    loadingItems = [...state.loadingItems, loadingId];
  } else {
    loadingItems = without(state.loadingItems, loadingId);
  }
  return {
    ...state,
    loadingItems
  };
};

const reducers = {
  setLoading
};

export default reducers;
