import React from "react";
import { fireEvent, render } from "react-testing-library";

import makeApp from "../makeApp";

function renderApp(initialState) {
  const App = makeApp(initialState);
  const result = {
    ...render(<App />),

    // TODO: add or update your helper methods

    clickNavLink(view) {
      fireEvent.click(result.getNavLink(view));
    },

    getCatalogProductCard(productCardNumber) {
      const cards = result.getCatalogProductCards();
      return cards[productCardNumber];
    },

    getCatalogProductCards() {
      return result.getAllByTestId("product-card");
    },

    getNavLink(view) {
      return result.getByTestId(`nav-${view}`);
    },
  };

  return result;
}

export default renderApp;
