// https://testing-library.com/docs/react-testing-library/example-intro
import { fireEvent, cleanup } from "react-testing-library";
// this adds custom jest matchers from jest-dom , https://github.com/testing-library/jest-dom
import "jest-dom/extend-expect";
import renderApp from "./renderApp";

afterEach(cleanup);

const initialState = {
  catalog: {
    p1: { id: "p1", name: "P1", price: 11 },
    p2: { id: "p2", name: "P2", price: 20 },
    p3: { id: "p3", name: "P3", price: 37 },
  },
};

let result;
beforeEach(() => {
  result = renderApp(initialState);
});

test("The navbar shows a link to the cart, its text says that it has 0 products", () => {
  const { getNavLink } = result;

  expect(getNavLink("cart")).toHaveTextContent("Cart (0)");
});

test("When a product is added to the cart, it updates the product count shown in the nav button cart", () => {
  const { clickCatalogBuyButton, getNavLink } = result;

  clickCatalogBuyButton(0);

  expect(getNavLink("cart")).toHaveTextContent("Cart (1)");
});

test("Click on the navbar Cart link shows the cart view", () => {
  const { container, clickNavLink } = result;
  clickNavLink("cart");

  expect(container).toHaveTextContent("Your cart");
});

test("If no product added to the cart, it shows a message telling that the cart is empty", () => {
  const { container, clickNavLink } = result;
  clickNavLink("cart");

  expect(container).toHaveTextContent("empty");
});

test("If no product added to the cart, it offers a button to continue shopping", () => {
  const { container, clickNavLink } = result;
  clickNavLink("cart");

  const shoppingButton = container.querySelector("button");
  expect(shoppingButton).toHaveTextContent("Continue shopping");
});

test("If no product added to the cart, the continue continue shopping shows the catalog view", () => {
  const { container, clickNavLink } = result;
  clickNavLink("cart");

  const shoppingButton = container.querySelector("button");
  fireEvent.click(shoppingButton);

  expect(container).toHaveTextContent("Catalog");
});

test("If there are products added to the cart, the cart shows the total price sum of all products prices per its quantities", () => {
  const { clickCatalogBuyButton, clickNavLink, getCartTotalPriceCell } = result;
  clickCatalogBuyButton(0);
  clickCatalogBuyButton(1);
  clickNavLink("cart");

  expect(getCartTotalPriceCell()).toHaveTextContent("31 €");
});

test("Products added to the cart are shown in the cart view", () => {
  const { clickCatalogBuyButton, clickNavLink, getCartLineRow } = result;
  clickCatalogBuyButton(0);
  clickCatalogBuyButton(1);
  clickNavLink("cart");

  expect(getCartLineRow(0)).toHaveTextContent("P2");
  expect(getCartLineRow(1)).toHaveTextContent("P1");
});

test("For each product added to the cart, the cart view shows the price", () => {
  const { clickCatalogBuyButton, clickNavLink, getCartLineRow } = result;
  clickCatalogBuyButton(0);
  clickNavLink("cart");

  expect(getCartLineRow(0)).toHaveTextContent("11€");
});

test("For each product added to the cart, the cart view shows the quantity", () => {
  const { clickCatalogBuyButton, clickNavLink, getCartLineRow } = result;
  clickCatalogBuyButton(0);
  clickNavLink("cart");

  expect(getCartLineRow(0)).toHaveTextContent("1 x");
});

test("For each product added to the cart, the cart view has a button that increases the quantity", () => {
  const { clickCatalogBuyButton, clickNavLink, clickCartLineButton } = result;
  clickCatalogBuyButton(0);
  clickNavLink("cart");

  clickCartLineButton(0, "+");
  clickCartLineButton(0, "+");

  const { getCartLineRow } = result;
  expect(getCartLineRow(0)).toHaveTextContent("3 x");
});

test("For each product added to the cart, the cart view has a button that decreases the quantity", () => {
  const { clickCatalogBuyButton, clickNavLink, clickCartLineButton } = result;
  clickCatalogBuyButton(0);
  clickNavLink("cart");
  clickCartLineButton(0, "+");
  clickCartLineButton(0, "+");

  clickCartLineButton(0, "-");

  const { getCartLineRow } = result;
  expect(getCartLineRow(0)).toHaveTextContent("2 x");
});

test("The cart total price keeps track of the total price of the cart, even when elements are added and removed", () => {
  const { clickCatalogBuyButton, clickNavLink, clickCartLineButton } = result;
  clickCatalogBuyButton(1);
  clickCatalogBuyButton(0);
  clickNavLink("cart");

  clickCartLineButton(0, "+");
  clickCartLineButton(0, "+");
  clickCartLineButton(0, "-");

  const { getCartTotalPriceCell } = result;
  expect(getCartTotalPriceCell()).toHaveTextContent("42 €");
});

test("For each product added to the cart, the cart view has a button drops the item from the cart", () => {
  const { clickCatalogBuyButton, clickNavLink, clickCartLineButton } = result;
  clickCatalogBuyButton(1);
  clickCatalogBuyButton(0);
  clickNavLink("cart");

  clickCartLineButton(0, "X");

  const { getCartTotalPriceCell } = result;
  expect(getCartTotalPriceCell()).toHaveTextContent("20 €");
});

test("For each product added to the cart, the cart view has a button that raises the price of the element", () => {
  const { clickCatalogBuyButton, clickNavLink, clickCartLineButton } = result;
  clickCatalogBuyButton(1);
  clickCatalogBuyButton(0);
  clickNavLink("cart");

  clickCartLineButton(0, "U");

  const { getCartTotalPriceCell } = result;
  expect(getCartTotalPriceCell()).toHaveTextContent("40 €");
});

test("For each product added to the cart, the cart view shows the total price of the products of that row", () => {
  const { clickCatalogBuyButton, clickNavLink, clickCartLineButton } = result;
  clickCatalogBuyButton(0);
  clickNavLink("cart");

  clickCartLineButton(0, "+");

  const { getCartLineRow } = result;
  expect(getCartLineRow(0)).toHaveTextContent("22€");
});
