import { saveState, loadState } from '../../utils/saveLocally';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

window.localStorage = mockLocalStorage;

const state = {
  id: 2,
  firstNmae: 'John',
  lastName: 'Doe',
};

describe('saveState', () => {
  it('persists state to localStorage', () => {
    saveState(state);
    setTimeout(() => {
      expect(localStorage.getItem('state').id).toEqual(2);
    }, 1000);
  });
});

describe('loadState', () => {
  it('reads state from localStorage', () => {
    const loadedState = loadState();
    setTimeout(() => {
      expect(loadedState.id).toEqual(2);
      console.log(localStorage);
    }, 5000);
  });
});
