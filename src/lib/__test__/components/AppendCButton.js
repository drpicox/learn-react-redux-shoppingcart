import React, { useCallback } from "react";
import useDispatch from "../../useDispatch";
import { append } from "../listDuck/actions/append";

function AppendCButton() {
  const appendItem = useDispatch(append);
  const onClick = useCallback(() => appendItem("c"), [appendItem]);

  return <button data-testid="append-button" onClick={onClick} />;
}

export default AppendCButton;
