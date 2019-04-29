import React, { useState, useCallback } from "react";
import useReselect from "../../useReselect";
import makeIsRepeated from "../listDuck/selectors/makeIsRepeated";

function ShowRepeated() {
  const [item, setItem] = useState("a");
  const repeated = useReselect(makeIsRepeated, { item });
  const onChange = useCallback(({ target }) => setItem(target.value), []);
  return (
    <div>
      <input data-testid="repeated-input" onChange={onChange} value={item} />
      {repeated ? "Is repeated" : "Is unique or absent"}
    </div>
  );
}

export default ShowRepeated;
