import React from "react";
import { SpaceGridCardProps } from "./interface";
import "./styles.css";

export const SpaceGridCard = (props: SpaceGridCardProps) => {
  const { space, style } = props;
  const { id, name, creator } = space;

  return (
    <div style={style}>
      <div className="space-grid-card-wrap">
        <div className="space-grid-line-content">{id}</div>
        <div className="space-grid-line-content">{name}</div>
        <div className="space-grid-line-content">{creator}</div>
      </div>
    </div>
  );
};
