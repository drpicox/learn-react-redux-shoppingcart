import { createSelector } from "reselect";
import getCart from "./getCart";
import getCatalog from "../../catalog/selectors/getCatalog";

function makeGetCartPrice() {
  return createSelector(
    getCart,
    getCatalog,
    (cart, catalog) =>
      cart.reduce(
        (price, l) => price + l.quantity * catalog[l.productId].price,
        0,
      ),
  );
}

export default makeGetCartPrice;
