// https://testing-library.com/docs/react-testing-library/example-intro
import { cleanup } from "react-testing-library";
// this adds custom jest matchers from jest-dom , https://github.com/testing-library/jest-dom
import "jest-dom/extend-expect";
import renderApp from "./renderApp";

afterEach(cleanup);

const initialState = {
  catalog: {
    p1: { id: "p1", name: "P1", price: 115.6, image: "http://p1" },
    p2: { id: "p2", name: "P2", price: 20, image: "http://p2" },
  },
};

let result;
beforeEach(() => {
  result = renderApp(initialState);
});

test("By default it shows the catalog", () => {
  const { container } = result;

  expect(container).toHaveTextContent("Catalog");
});

test("It shows all products available in the redux store (catalog has two)", () => {
  const { getCatalogProductCards } = result;

  expect(getCatalogProductCards()).toHaveLength(2);
});

test("For each product the catalog shows the name", () => {
  const { getCatalogProductCard } = result;

  expect(getCatalogProductCard(0)).toHaveTextContent("P1");
  expect(getCatalogProductCard(1)).toHaveTextContent("P2");
});

test("For each product the catalog shows the price", () => {
  // TODO
});

test("For each product the catalog shows the picture", () => {
  // TODO
});

test("For each product the catalog offers the buy option", () => {
  // TODO
});

test("When the user clicks to the buy button, the buy button transforms into go to the cart", () => {
  // TODO
});

test("When the user clicks see cart button after buy, it goes to the cart view", () => {
  // TODO
});
