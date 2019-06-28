export const ROUND_PRICE_UP = "catalog/ROUND_PRICE_UP";
export function roundPriceUp(productId) {
  return {
    type: ROUND_PRICE_UP,
    productId,
  };
}
