import { useCallback, useContext } from "react";
import StoreContext from "./StoreContext";

function useDispatch(actionCreator, ...args) {
  if (!actionCreator) throw new Error("The actionCreator is not a function");
  const store = useContext(StoreContext);

  return useCallback(
    (...moreArgs) => {
      const action = actionCreator(...args, ...moreArgs);
      store.dispatch(action);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actionCreator, ...args],
  );
}

export default useDispatch;
