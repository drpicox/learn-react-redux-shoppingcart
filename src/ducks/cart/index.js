import { ADD_PRODUCT } from "./actions/addProduct";
import { REMOVE_PRODUCT } from "./actions/removeProduct";
import { DROP_PRODUCT } from "./actions/dropProduct";

function reduceCart(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCT: {
      const { productId } = action;
      const line = state.find(l => l.productId === productId);
      const quantity = 1 + ((line && line.quantity) || 0);
      return [
        { productId, quantity },
        ...state.filter(l => l.productId !== productId),
      ];
    }
    case REMOVE_PRODUCT: {
      const { productId } = action;
      return state.map(line => {
        if (line.productId !== productId || line.quantity === 1) return line;
        return { productId, quantity: line.quantity - 1 };
      });
    }
    case DROP_PRODUCT: {
      const { productId } = action;
      return state.filter(line => line.productId !== productId);
    }
    default:
      return state;
  }
}

export default reduceCart;
