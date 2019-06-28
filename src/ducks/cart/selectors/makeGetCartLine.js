import { createSelector } from "reselect";
import getCart from "./getCart";
import getProduct from "../../catalog/selectors/getProduct";

function getRawCartLine(state, { productId }) {
  return getCart(state).find(l => l.productId === productId);
}

function makeGetCartLine() {
  return createSelector(
    getRawCartLine,
    getProduct,
    (raw, product) =>
      raw && {
        ...raw,
        ...product,
        linePrice: raw.quantity * product.price,
      },
  );
}

export default makeGetCartLine;
