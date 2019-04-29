import getList from "./getList";

export function hasItem(state, { item }) {
  return getList(state).includes(item);
}

export default hasItem;
