import { useContext, useEffect, useState, useRef } from "react";
import StoreContext from "./StoreContext";

function useSelect(select, ...args) {
  const savedRefresh = useRef();
  const store = useContext(StoreContext);
  const value = select(store.getState(), ...args);
  const [, setValue] = useState();

  savedRefresh.current = function refresh() {
    const newValue = select(store.getState(), ...args);
    if (newValue !== value) {
      setValue(newValue);
    }
  };

  useEffect(() => {
    return store.subscribe(() => savedRefresh.current());
  }, [store]);

  return value;
}

export default useSelect;
