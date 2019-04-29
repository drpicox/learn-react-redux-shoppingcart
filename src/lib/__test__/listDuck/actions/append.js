export const APPEND = "APPEND";
export function append(item) {
  return {
    type: APPEND,
    item
  };
}
