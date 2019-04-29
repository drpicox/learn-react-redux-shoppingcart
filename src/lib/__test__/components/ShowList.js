import React from "react";
import useSelect from "../../useSelect";
import getCount from "../listDuck/selectors/getCount";
import getList from "../listDuck/selectors/getList";

function ShowList() {
  const list = useSelect(getList);
  const count = useSelect(getCount);

  return (
    <div>
      <ul>
        {list.map(i => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <div>:{count}</div>
    </div>
  );
}

export default ShowList;
