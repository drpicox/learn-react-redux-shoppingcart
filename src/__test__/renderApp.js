import React from "react";
import { fireEvent, render } from "react-testing-library";

import makeApp from "../makeApp";

function renderApp(initialState) {
  const App = makeApp(initialState);
  const result = {
    ...render(<App />),

    clickCartLineButton(productCardNumber, buttonText) {
      fireEvent.click(result.getCartLineButton(productCardNumber, buttonText));
    },

    clickCatalogBuyButton(productCardNumber) {
      fireEvent.click(result.getCatalogBuyButton(productCardNumber));
    },

    clickNavLink(view) {
      fireEvent.click(result.getNavLink(view));
    },

    getCartLineButton(lineNumber, buttonText) {
      const buttons = result.getAllByText(buttonText);
      return buttons[lineNumber];
    },

    getCartLineRow(lineNumber) {
      const lines = result.getAllByTestId("cart-line-row");
      return lines[lineNumber];
    },

    getCartTotalPriceCell() {
      return result.getByTestId("cart-totalprice");
    },

    getCatalogBuyButton(productCardNumber) {
      return result
        .getCatalogProductCard(productCardNumber)
        .querySelector("button");
    },

    getCatalogProductCard(productCardNumber, element = "") {
      const cards = result.getCatalogProductCards();
      const card = cards[productCardNumber];
      if (element) return card.querySelector(element);
      return card;
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
