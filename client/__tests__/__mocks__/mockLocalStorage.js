const localStorage = {
  store: {},
  setItem(key, value) {
    return ({ ...localStorage.store, [key]: value });
  },
  getItem(key) {
    return localStorage.store[key];
  },
  removeItem(key) {
    delete localStorage.store[key];
  },
  clear() {
    localStorage.store = {};
  }
};

export default localStorage;
