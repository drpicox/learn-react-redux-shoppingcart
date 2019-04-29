import { SET_VIEW } from "./actions/setView";

function reduceView(state = { root: "Home" }, action) {
  switch (action.type) {
    case SET_VIEW: {
      const { view } = action;
      return { ...state, ...view };
    }
    default:
      return state;
  }
}

export default reduceView;
