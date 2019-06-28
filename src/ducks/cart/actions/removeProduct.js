export const REMOVE_PRODUCT = "cart/REMOVE_PRODUCT";
export function removeProduct(productId) {
  return {
    type: REMOVE_PRODUCT,
    productId,
  };
}
