import { createSelector } from "reselect";
import getCatalog from "./getCatalog";

function makeGetProductList() {
  return createSelector(
    getCatalog,
    catalog => Object.values(catalog)
  );
}

export default makeGetProductList;
