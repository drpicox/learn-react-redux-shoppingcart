import createDucksStore from "../../createDucksStore";
import getView from "../selectors/getView";
import { setView } from "../actions/setView";

let store;
beforeEach(() => {
  store = createDucksStore();
});

test('default root view is "Home"', () => {
  const view = getView(store.getState());

  expect(view).toMatchObject({ root: "Home" });
});

test("can extend view with setView", () => {
  store.dispatch(setView({ root: "Detail", id: 1 }));

  const view = getView(store.getState());
  expect(view).toMatchObject({ root: "Detail", id: 1 });
});

test("setView merges new fields and preserves old ones", () => {
  store.dispatch(setView({ sidePanel: "List" }));

  const view = getView(store.getState());
  expect(view).toMatchObject({ root: "Home", sidePanel: "List" });
});
