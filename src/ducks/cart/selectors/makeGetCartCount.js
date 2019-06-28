import { createSelector } from "reselect";
import getCart from "./getCart";

function makeGetCartCount() {
  return createSelector(
    getCart,
    cart => cart.reduce((count, l) => count + l.quantity, 0),
  );
}

export default makeGetCartCount;
