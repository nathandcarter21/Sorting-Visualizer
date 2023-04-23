import React from "react";

type ColumnProps = {
  array: number[];
};

const Columns: React.FunctionComponent<ColumnProps> = (props) => {
  return (
    <div className="columns">
      {props.array.map((value: number, index: number) => {
        return (
          <div
            className="col"
            style={{ height: `${(index + 1) * 5}px` }}
            key={index}></div>
        );
      })}
    </div>
  );
};

export default Columns;
