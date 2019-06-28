import React from "react";
import { Table, Button } from "react-bootstrap";
import useDispatch from "../lib/useDispatch";
import useSelect from "../lib/useSelect";
import useReselect from "../lib/useReselect";
import getCart from "../ducks/cart/selectors/getCart";
import makeGetCartPrice from "../ducks/cart/selectors/makeGetCartPrice";
import { setView } from "../ducks/view/actions/setView";
import CartLineRow from "./CartLineRow";

function CartView() {
  const goHome = useDispatch(setView, { root: "Home" });
  const cart = useSelect(getCart);
  const price = useReselect(makeGetCartPrice);

  const contents =
    cart.length === 0 ? (
      <div>
        Cart empty, please, return shopping.
        <br />
        <Button onClick={goHome}>Continue shopping</Button>
      </div>
    ) : (
      <Table>
        <tbody>
          {cart.map(r => (
            <CartLineRow key={r.productId} productId={r.productId} />
          ))}
          <tr>
            <td />
            <td />
            <td />
            <td data-testid="cart-totalprice">{price} €</td>
          </tr>
        </tbody>
      </Table>
    );

  return (
    <div>
      <h1>Your cart</h1>
      {contents}
    </div>
  );
}

export default CartView;
