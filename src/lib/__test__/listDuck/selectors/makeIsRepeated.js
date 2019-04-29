import { createSelector } from "reselect";
import makeGetHistogram from "./makeGetHistogram";

function makeIsRepeated() {
  const getHistogram = makeGetHistogram();
  const getItem = (_, { item }) => item;

  return createSelector(
    getHistogram,
    getItem,
    (histogram, item) =>
      !!histogram.find(entry => entry.item === item && entry.count > 1)
  );
}

export default makeIsRepeated;
