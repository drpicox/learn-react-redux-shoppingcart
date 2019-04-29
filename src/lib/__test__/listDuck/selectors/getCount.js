import getList from "./getList";

function getCount(state) {
  return getList(state).length;
}

export default getCount;
