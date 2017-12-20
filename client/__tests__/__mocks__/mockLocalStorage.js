const mockLocalStorage = {
  store: {},
  setItem(key, value) {
    return ({ ...mockLocalStorage.store, [key]: value });
  },
  getItem(key) {
    return mockLocalStorage.store[key];
  },
  removeItem(key) {
    delete mockLocalStorage.store[key];
  },
  clear() {
    mockLocalStorage.store = {};
  }
};

export default mockLocalStorage;
