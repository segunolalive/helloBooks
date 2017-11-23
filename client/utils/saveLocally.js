/**
 * saves application state to disk
 * @param  {Object} state application state
 * @return {undefined}    wites to disk
 */
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    return false;
  }
};

/**
 * loads state from disk
 * @return {Object} State Object
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return false;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return false;
  }
};
