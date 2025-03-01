import React from "react";

import "./square.style.css";
type sqrType = {
  src: string;
};

export const Square = ({ src }: sqrType) => {
  return (
    <div className="imgCont">
      <img src={src} className="image" />
    </div>
  );
};
