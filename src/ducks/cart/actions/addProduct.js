export const ADD_PRODUCT = "cart/ADD_PRODUCT";
export function addProduct(productId) {
  return {
    type: ADD_PRODUCT,
    productId,
  };
}
