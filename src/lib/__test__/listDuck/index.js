import { APPEND } from "./actions/append";

function reduceList(state = ["a", "b"], action) {
  switch (action.type) {
    case APPEND:
      return [...state, action.item];
    default:
      return state;
  }
}

export default reduceList;
