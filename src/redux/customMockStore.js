import configureStore from "redux-mock-store";

import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const createMockStore = (initialState) => {
  return mockStore(initialState);
};

export default createMockStore;
