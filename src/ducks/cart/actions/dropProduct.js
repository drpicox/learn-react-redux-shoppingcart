export const DROP_PRODUCT = "cart/DROP_PRODUCT";
export function dropProduct(productId) {
  return {
    type: DROP_PRODUCT,
    productId,
  };
}
