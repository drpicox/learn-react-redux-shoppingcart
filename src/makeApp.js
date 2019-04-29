import React from "react";
import StoreContext from "./lib/StoreContext";
import createDucksStore from "./ducks/createDucksStore";
import AppNavBar from "./components/AppNavBar";
import AppRoot from "./components/AppRoot";

function makeApp(initialState, enhancer) {
  const store = createDucksStore(initialState, enhancer);

  function App() {
    return (
      <StoreContext.Provider value={store}>
        <AppNavBar />
        <AppRoot />
      </StoreContext.Provider>
    );
  }

  return App;
}

export default makeApp;
