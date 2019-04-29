import createDucksStore from "../../createDucksStore";
import getProduct from "../selectors/getProduct";
import makeGetProductList from "../selectors/makeGetProductList";
import { roundPriceUp } from "../actions/roundPriceUp";

const catalogExample = {
  p1: {
    id: "p1",
    name: "P1",
    price: 115.6,
    image: "http://p1"
  },
  p2: {
    id: "p2",
    name: "P2",
    price: 20,
    image: "http://p2"
  }
};

let store;
beforeEach(() => {
  store = createDucksStore({ catalog: catalogExample });
});

test("getProduct returns the product with the productId specified", () => {
  const product = getProduct(store.getState(), { productId: "p1" });

  expect(product).toBe(catalogExample.p1);
});

test("getProductList returns products as a list", () => {
  const getProductList = makeGetProductList();
  const productList = getProductList(store.getState());

  expect(productList).toEqual([catalogExample.p1, catalogExample.p2]);
});

test("getProductList memoizes the result", () => {
  const getProductList = makeGetProductList();
  const productList1 = getProductList(store.getState());
  const productList2 = getProductList(store.getState());

  expect(productList1).toBe(productList2);
});

test("roundPriceUp rounds the price of a product around the next 10", () => {
  store.dispatch(roundPriceUp("p1"));

  const product = getProduct(store.getState(), { productId: "p1" });
  expect(product.price).toBe(120);
});
