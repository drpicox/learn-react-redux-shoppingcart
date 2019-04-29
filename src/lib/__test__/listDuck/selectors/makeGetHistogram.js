import { createSelector } from "reselect";
import getList from "./getList";

function makeGetHistogram() {
  return createSelector(
    getList,
    list => {
      const counts = {};
      list.forEach(item => {
        counts[item] = (counts[item] || 0) + 1;
      });

      return Object.entries(counts).map(([item, count]) => ({ item, count }));
    }
  );
}

export default makeGetHistogram;
