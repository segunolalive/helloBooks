/**
 * saves application state to disk
 *
 * @param  {Object} state         application state
 *
 * @return {undefined|Boolean}   writes to disk
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
 *
 * @return {Object|Boolean}   State Object or false
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    return serializedState === null ?
      false : JSON.parse(serializedState);
  } catch (e) {
    return false;
  }
};
