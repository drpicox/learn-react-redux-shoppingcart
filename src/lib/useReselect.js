import { useMemo } from "react";
import useSelect from "./useSelect";

function useReselect(makeSelect, ...args) {
  const select = useMemo(makeSelect, [makeSelect]);
  return useSelect(select, ...args);
}

export default useReselect;
