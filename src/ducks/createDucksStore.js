import { createStore, combineReducers } from "redux";
import freezeReducer from "../lib/freezeReducer";

import cart from "./cart";
import catalog from "./catalog";
import view from "./view";

const reducer = freezeReducer(combineReducers({ cart, catalog, view }));

const createDucksStore = (initialState, enhancer) => {
  return createStore(reducer, initialState, enhancer);
};

export default createDucksStore;
