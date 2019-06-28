import React from "react";
import { CardDeck } from "react-bootstrap";
import useReselect from "../lib/useReselect";
import makeGetProductList from "../ducks/catalog/selectors/makeGetProductList";

import ProductCard from "./ProductCard";

function HomeView() {
  const products = useReselect(makeGetProductList);

  return (
    <div>
      <h1>Catalog</h1>
      <CardDeck>
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </CardDeck>
    </div>
  );
}

export default HomeView;
