import React from "react";
import useDispatch from "../../useDispatch";
import { append } from "../listDuck/actions/append";

function AppendItemButton({ item }) {
  const appendItem = useDispatch(append, item);

  return <button data-testid="append-button" onClick={appendItem} />;
}

export default AppendItemButton;
