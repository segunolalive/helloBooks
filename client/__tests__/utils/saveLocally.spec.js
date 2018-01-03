import { saveState, loadState } from '../../utils/saveLocally';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import store from '../../store';

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

  it('fails silently', () => {
    localStorage.setItem = () => { throw new Error('something broke'); };
    saveState(state);
    setTimeout(() => {
      expect(localStorage.getItem('state').id).toEqual(false);
    }, 1000);
  });
});

describe('loadState', () => {
  it('reads state from localStorage', () => {
    const loadedState = loadState();
    setTimeout(() => {
      expect(loadedState.id).toEqual(2);
    }, 1000);
  });

  it('returns false if state is null', () => {
    const nullState = null;
    saveState(nullState);
    setTimeout(() => {
      expect(loadState()).toEqual(false);
    }, 5000);
  });
});
