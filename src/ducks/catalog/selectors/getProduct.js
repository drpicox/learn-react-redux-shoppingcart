import getCatalog from "./getCatalog";

function getProduct(state, { productId }) {
  return getCatalog(state)[productId];
}

export default getProduct;
