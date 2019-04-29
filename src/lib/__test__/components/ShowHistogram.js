import React from "react";
import useReselect from "../../useReselect";
import makeGetHistogram from "../listDuck/selectors/makeGetHistogram";

function ShowHistogram() {
  const histogram = useReselect(makeGetHistogram);

  return (
    <div>
      <ul>
        {histogram.map(({ item, count }) => (
          <li key={item}>
            -{item}:{count}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowHistogram;
