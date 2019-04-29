import React from "react";
import { render, fireEvent, cleanup, act } from "react-testing-library";
// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";
import { createStore, combineReducers } from "redux";
import StoreContext from "../StoreContext";
import list from "./listDuck";
import { append } from "./listDuck/actions/append";
import ShowHistogram from "./components/ShowHistogram";
import ShowRepeated from "./components/ShowRepeated";

afterEach(cleanup);

let store;
beforeEach(() => {
  store = createStore(combineReducers({ list }));
});

function renderHistogram() {
  return render(
    <StoreContext.Provider value={store}>
      <ShowHistogram />
    </StoreContext.Provider>
  );
}

test("shows the histogram", () => {
  const { container } = renderHistogram();

  expect(container).toHaveTextContent("-a:1-b:1");
});

test("update changes", () => {
  const { container } = renderHistogram();
  act(() => {
    store.dispatch(append("b"));
  });

  expect(container).toHaveTextContent("-a:1-b:2");
});

function renderRepeated() {
  return render(
    <StoreContext.Provider value={store}>
      <ShowRepeated />
    </StoreContext.Provider>
  );
}

test("accepts parameters", () => {
  const { container } = renderRepeated();

  expect(container).toHaveTextContent("unique");
});

test("with parameters updates when state changes", () => {
  const { container } = renderRepeated();
  act(() => {
    store.dispatch(append("a"));
  });

  expect(container).toHaveTextContent("repeated");
});

test("parameters change updates the result", () => {
  store.dispatch(append("a"));
  const { container, getByTestId } = renderRepeated();

  fireEvent.change(getByTestId("repeated-input"), { target: { value: "b" } });

  expect(container).toHaveTextContent("unique");
});
