import { createStore, combineReducers } from "redux";
import freezeReducer from "../freezeReducer";
import list from "./listDuck";
import { append } from "./listDuck/actions/append";

let store;
beforeEach(() => {
  store = createStore(freezeReducer(combineReducers({ list })));
});

test("state freezed with freezeReducer cannot be changed", () => {
  const state = store.getState();
  expect(() => {
    state.list = ["newList"];
  }).toThrow();
});

test("it is safe to dispatch new actions", () => {
  store.dispatch(append("c"));
  const state = store.getState();
  expect(state).toEqual({ list: ["a", "b", "c"] });
});

test("freezes nested objects", () => {
  store.dispatch(append({ deep: "object" }));
  const state = store.getState();

  expect(state.list[2]).toEqual({ deep: "object" });
  expect(() => {
    state.list[2].newProperty = "newValue";
  }).toThrow();
});
