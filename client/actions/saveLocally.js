import actionTypes from './actionTypes';

export function saveState (state) {
  return {
    type: SAVE_STATE,
    state,
  }
};

export function getSavedState (state) {
  return {
    type: GET_SAVED_STATE,
    state,
  }
}
