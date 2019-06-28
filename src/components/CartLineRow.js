import React from "react";
import { Button } from "react-bootstrap";
import useDispatch from "../lib/useDispatch";
import useReselect from "../lib/useReselect";
import { addProduct } from "../ducks/cart/actions/addProduct";
import { removeProduct } from "../ducks/cart/actions/removeProduct";
import { dropProduct } from "../ducks/cart/actions/dropProduct";
import { roundPriceUp } from "../ducks/catalog/actions/roundPriceUp";
import makeGetCartLine from "../ducks/cart/selectors/makeGetCartLine";

function CartLineRow({ productId }) {
  const line = useReselect(makeGetCartLine, { productId });
  const add = useDispatch(addProduct, productId);
  const remove = useDispatch(removeProduct, productId);
  const drop = useDispatch(dropProduct, productId);
  const up = useDispatch(roundPriceUp, productId);

  return (
    <tr data-testid="cart-line-row">
      <td>{line.name}</td>
      <td>
        <Button onClick={add}>+</Button> <Button onClick={remove}>-</Button>{" "}
        <Button variant="danger" onClick={drop}>
          X
        </Button>{" "}
        <Button variant="danger" onClick={up}>
          U
        </Button>
      </td>
      <td>
        {line.quantity} x {line.price}€
      </td>
      <td>{line.linePrice}€</td>
    </tr>
  );
}

export default CartLineRow;
