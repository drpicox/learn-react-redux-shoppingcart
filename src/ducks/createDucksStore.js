import { createStore, combineReducers } from "redux";
import freezeReducer from "../lib/freezeReducer";

import view from "./view";

const reducer = freezeReducer(
  combineReducers({
    view,
  }),
);

const createDucksStore = (initialState, enhancer) => {
  return createStore(reducer, initialState, enhancer);
};

export default createDucksStore;
