// https://testing-library.com/docs/react-testing-library/example-intro
import { cleanup } from "react-testing-library";
// this adds custom jest matchers from jest-dom , https://github.com/testing-library/jest-dom
import "jest-dom/extend-expect";

afterEach(cleanup);

test("The navbar shows a link to the cart, its text says that it has 0 products", () => {
  // TODO
});

test("When a product is added to the cart, it updates the product count shown in the nav button cart", () => {
  // TODO
});

test("Click on the navbar Cart link shows the cart view", () => {
  // TODO
});

test("If no product added to the cart, it shows a message telling that the cart is empty", () => {
  // TODO
});

test("If no product added to the cart, it offers a button to continue shopping", () => {
  // TODO
});

test("If no product added to the cart, the continue continue shopping shows the catalog view", () => {
  // TODO
});

test("If there are products added to the cart, the cart shows the total price sum of all products prices per its quantities", () => {
  // TODO
});

test("Products added to the cart are shown in the cart view", () => {
  // TODO
});

test("For each product added to the cart, the cart view shows the price", () => {
  // TODO
});

test("For each product added to the cart, the cart view shows the quantity", () => {
  // TODO
});

test("For each product added to the cart, the cart view has a button that increases the quantity", () => {
  // TODO
});

test("For each product added to the cart, the cart view has a button that decreases the quantity", () => {
  // TODO
});

test("The cart total price keeps track of the total price of the cart, even when elements are added and removed", () => {
  // TODO
});

test("For each product added to the cart, the cart view has a button drops the item from the cart", () => {
  // TODO
});

test("For each product added to the cart, the cart view has a button that raises the price of the element", () => {
  // TODO
});

test("For each product added to the cart, the cart view shows the total price of the products of that row", () => {
  // TODO
});
