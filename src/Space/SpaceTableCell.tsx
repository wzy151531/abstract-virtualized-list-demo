import React from "react";
import { SpaceTableCellProps } from "./interface";
import "./styles.css";

export const SpaceTableCell = (props: SpaceTableCellProps) => {
  const { space, style } = props;
  const { id, name, creator } = space;

  return (
    <div style={style}>
      <div className="space-table-cell-wrap">
        <div>{id}</div>
        <div>{name}</div>
        <div>{creator}</div>
      </div>
    </div>
  );
};
