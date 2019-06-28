import { ROUND_PRICE_UP } from "./actions/roundPriceUp";

function reduceCatalog(state = {}, action) {
  switch (action.type) {
    case ROUND_PRICE_UP: {
      const { productId } = action;
      const product = state[productId];
      const newProduct = {
        ...product,
        price: Math.ceil(product.price / 10) * 10
      };
      return { ...state, [productId]: newProduct };
    }
    default:
      return state;
  }
}

export default reduceCatalog;
