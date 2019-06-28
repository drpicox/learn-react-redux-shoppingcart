import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import useDispatch from "../lib/useDispatch";
import useReselect from "../lib/useReselect";
import { setView } from "../ducks/view/actions/setView";
import makeGetCartCount from "../ducks/cart/selectors/makeGetCartCount";

function AppNavBar() {
  const goHome = useDispatch(setView, { root: "Home" });
  const goAbout = useDispatch(setView, { root: "About" });
  const goCart = useDispatch(setView, { root: "Cart" });
  const cartCount = useReselect(makeGetCartCount);

  return (
    <Navbar bg="light" expand="lg">
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link data-testid="nav-home" onClick={goHome}>
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link data-testid="nav-about" onClick={goAbout}>
            About
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav>
        <Nav.Item>
          <Nav.Link data-testid="nav-cart" onClick={goCart}>
            Cart ({cartCount})
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default AppNavBar;
