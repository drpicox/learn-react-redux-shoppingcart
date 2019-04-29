import { cleanup } from "react-testing-library";
// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";
import renderApp from "./renderApp";

afterEach(cleanup);

let result;
beforeEach(() => {
  result = renderApp();
});

test("Shows the option to go to the About", () => {
  const { getNavLink } = result;

  expect(getNavLink("about")).toHaveTextContent("About");
});

test("Click on the About goes to the AboutView", () => {
  const { container, clickNavLink } = result;
  clickNavLink("about");

  expect(container).toHaveTextContent("The author is");
});
