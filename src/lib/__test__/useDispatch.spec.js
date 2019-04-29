import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";
import { createStore, combineReducers } from "redux";
import StoreContext from "../StoreContext";
import useDispatch from "../useDispatch";
import list from "./listDuck";

import AppendCButton from "./components/AppendCButton";
import AppendItemButton from "./components/AppendItemButton";
import ShowList from "./components/ShowList";

afterEach(cleanup);

let store;
beforeEach(() => {
  store = createStore(combineReducers({ list }));
});

test("parameters change updates the result", () => {
  const { container, getByTestId } = render(
    <StoreContext.Provider value={store}>
      <div>
        <AppendCButton />
        <ShowList />
      </div>
    </StoreContext.Provider>,
  );

  fireEvent.click(getByTestId("append-button"));

  expect(container).toHaveTextContent("abc:3");
});

test("parameters change updates the result", () => {
  const { container, getByTestId } = render(
    <StoreContext.Provider value={store}>
      <div>
        <AppendItemButton item={"x"} />
        <ShowList />
      </div>
    </StoreContext.Provider>,
  );

  fireEvent.click(getByTestId("append-button"));

  expect(container).toHaveTextContent("abx:3");
});

test("it throws an exception if the actionCreator is not a function", () => {
  let errorCaught;

  function ErrorComponent() {
    try {
      const go = useDispatch(undefined, 3);
      return <button onClick={go}>Go</button>;
    } catch (error) {
      errorCaught = error;
      return null;
    }
  }

  render(
    <StoreContext.Provider value={store}>
      <ErrorComponent />
    </StoreContext.Provider>,
  );

  expect(errorCaught.message).toMatch(/actionCreator is not a function/);
});
