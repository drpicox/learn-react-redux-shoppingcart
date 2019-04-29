import React, { useState, useCallback } from "react";
import useSelect from "../../useSelect";
import hasItem from "../listDuck/selectors/hasItem";

function ShowContains() {
  const [item, setItem] = useState("c");
  const present = useSelect(hasItem, { item });
  const onChange = useCallback(({ target }) => setItem(target.value), []);

  return (
    <div>
      <input data-testid="contains-input" onChange={onChange} value={item} />
      {present ? "Is present" : "Is absent"}
    </div>
  );
}

export default ShowContains;
