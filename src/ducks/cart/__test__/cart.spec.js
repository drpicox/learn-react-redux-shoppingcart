import createDucksStore from "../../createDucksStore";
import getCart from "../selectors/getCart";
import { addProduct } from "../actions/addProduct";
import { removeProduct } from "../actions/removeProduct";
import { dropProduct } from "../actions/dropProduct";
import makeGetCartLine from "../selectors/makeGetCartLine";
import makeGetCartCount from "../selectors/makeGetCartCount";
import makeGetCartPrice from "../selectors/makeGetCartPrice";

const catalogExample = {
  p2: {
    id: "p2",
    price: 2,
    name: "P2",
    image: "http://p2",
  },
  p3: {
    id: "p3",
    price: 3,
  },
  p5: {
    id: "p5",
    price: 5,
  },
};

let store;
beforeEach(() => {
  store = createDucksStore({ catalog: catalogExample });
});

test("add a product to the cart", () => {
  store.dispatch(addProduct("p2"));

  const cart = getCart(store.getState());
  expect(cart).toEqual([{ productId: "p2", quantity: 1 }]);
});

test("add multiple products to the cart", () => {
  store.dispatch(addProduct("p2"));
  store.dispatch(addProduct("p3"));

  const cart = getCart(store.getState());
  expect(cart).toEqual([
    { productId: "p3", quantity: 1 },
    { productId: "p2", quantity: 1 },
  ]);
});

test("add many times the same product", () => {
  store.dispatch(addProduct("p2"));
  store.dispatch(addProduct("p2"));

  const cart = getCart(store.getState());
  expect(cart).toEqual([{ productId: "p2", quantity: 2 }]);
});

test("the last product added is always the first in the list", () => {
  store.dispatch(addProduct("p2"));
  store.dispatch(addProduct("p3"));
  store.dispatch(addProduct("p2"));

  const cart = getCart(store.getState());
  expect(cart).toEqual([
    { productId: "p2", quantity: 2 },
    { productId: "p3", quantity: 1 },
  ]);
});

test("remove product decreases the quantity of products in the cart", () => {
  store.dispatch(addProduct("p2"));
  store.dispatch(addProduct("p2"));
  store.dispatch(removeProduct("p2"));

  const cart = getCart(store.getState());
  expect(cart).toEqual([{ productId: "p2", quantity: 1 }]);
});

test("cannot remove products until 0", () => {
  store.dispatch(addProduct("p2"));
  store.dispatch(addProduct("p2"));
  store.dispatch(addProduct("p2"));

  store.dispatch(removeProduct("p2"));
  store.dispatch(removeProduct("p2"));
  store.dispatch(removeProduct("p2"));

  const cart = getCart(store.getState());
  expect(cart).toEqual([{ productId: "p2", quantity: 1 }]);
});

test("product removal preserves the order", () => {
  store.dispatch(addProduct("p2"));
  store.dispatch(addProduct("p5"));
  store.dispatch(addProduct("p2"));
  store.dispatch(addProduct("p3"));

  store.dispatch(removeProduct("p2"));

  const cart = getCart(store.getState());
  expect(cart).toEqual([
    { productId: "p3", quantity: 1 },
    { productId: "p2", quantity: 1 },
    { productId: "p5", quantity: 1 },
  ]);
});

test("drop product removes the product from the cart", () => {
  store.dispatch(addProduct("p2"));

  store.dispatch(dropProduct("p2"));

  const cart = getCart(store.getState());
  expect(cart).toEqual([]);
});

test("product dropping preserves the order", () => {
  store.dispatch(addProduct("p2"));
  store.dispatch(addProduct("p5"));
  store.dispatch(addProduct("p2"));
  store.dispatch(addProduct("p3"));

  store.dispatch(dropProduct("p2"));

  const cart = getCart(store.getState());
  expect(cart).toEqual([
    { productId: "p3", quantity: 1 },
    { productId: "p5", quantity: 1 },
  ]);
});

test("getting a cart line returns all the information derived of one productId in the cart", () => {
  store.dispatch(addProduct("p2"));
  store.dispatch(addProduct("p2"));

  const getCartLine = makeGetCartLine();
  const line = getCartLine(store.getState(), { productId: "p2" });

  expect(line).toMatchObject({
    productId: "p2",
    quantity: 2,
    price: 2,
    linePrice: 4,
    name: "P2",
    image: "http://p2",
  });
});

test("getting twice the same line returns the same instance", () => {
  store.dispatch(addProduct("p2"));
  store.dispatch(addProduct("p2"));

  const getCartLine = makeGetCartLine();
  const line1 = getCartLine(store.getState(), { productId: "p2" });
  const line2 = getCartLine(store.getState(), { productId: "p2" });

  expect(line1).toBe(line2);
});

test("computes the total number of items of the cart", () => {
  store.dispatch(addProduct("p2"));
  store.dispatch(addProduct("p3"));
  store.dispatch(addProduct("p2"));

  const getCartCount = makeGetCartCount();
  const count = getCartCount(store.getState());

  expect(count).toBe(3);
});

test("computes the total number of price of the cart", () => {
  store.dispatch(addProduct("p2"));
  store.dispatch(addProduct("p3"));
  store.dispatch(addProduct("p2"));

  const getCartPrice = makeGetCartPrice();
  const count = getCartPrice(store.getState());

  expect(count).toBe(7);
});

test("getting a not added product returns undefined", () => {
  const getCartLine = makeGetCartLine();
  const line = getCartLine(store.getState(), { productId: "p2" });

  expect(line).toBeUndefined();
});
