import React from "react";
import { Card, Button } from "react-bootstrap";
import useDispatch from "../lib/useDispatch";
import useReselect from "../lib/useReselect";
import { setView } from "../ducks/view/actions/setView";
import { addProduct } from "../ducks/cart/actions/addProduct";
import makeGetCartLine from "../ducks/cart/selectors/makeGetCartLine";

function BuyProduct({ product }) {
  const buy = useDispatch(addProduct, product.id);

  return (
    <Button variant="primary" onClick={buy}>
      Buy
    </Button>
  );
}
function SeeCart() {
  const goCart = useDispatch(setView, { root: "Cart" });

  return (
    <Button variant="secondary" onClick={goCart}>
      See Cart
    </Button>
  );
}

function ProductCard({ product }) {
  const line = useReselect(makeGetCartLine, { productId: product.id });

  return (
    <Card style={{ width: "18rem" }} data-testid="product-card">
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.price} €</Card.Text>
      </Card.Body>
      <Card.Footer>
        {line ? <SeeCart /> : <BuyProduct product={product} />}
      </Card.Footer>
    </Card>
  );
}

export default ProductCard;
