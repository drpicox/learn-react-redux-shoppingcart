import React from "react";
import { render, fireEvent, cleanup, act } from "react-testing-library";
// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";
import { createStore, combineReducers } from "redux";
import StoreContext from "../StoreContext";
import list from "./listDuck";
import { append } from "./listDuck/actions/append";
import ShowList from "./components/ShowList";
import ShowContains from "./components/ShowContains";

afterEach(cleanup);

let store;
beforeEach(() => {
  store = createStore(combineReducers({ list }));
});

function renderList() {
  return render(
    <StoreContext.Provider value={store}>
      <ShowList />
    </StoreContext.Provider>
  );
}

test("shows the list", () => {
  const { container } = renderList();

  expect(container).toHaveTextContent("ab:2");
});

test("update changes", () => {
  const { container } = renderList();
  act(() => {
    store.dispatch(append("c"));
  });

  expect(container).toHaveTextContent("abc:3");
});

function renderContains() {
  return render(
    <StoreContext.Provider value={store}>
      <ShowContains />
    </StoreContext.Provider>
  );
}

test("accepts parameters", () => {
  const { container } = renderContains();

  expect(container).toHaveTextContent("absent");
});

test("with parameters updates when state changes", () => {
  const { container } = renderContains();
  act(() => {
    store.dispatch(append("c"));
  });

  expect(container).toHaveTextContent("present");
});

test("parameters change updates the result", () => {
  const { container, getByTestId } = renderContains();
  fireEvent.change(getByTestId("contains-input"), { target: { value: "a" } });

  expect(container).toHaveTextContent("present");
});
