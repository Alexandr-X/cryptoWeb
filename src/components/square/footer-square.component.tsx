import React from "react";

import "./square.style.css";
import { NavLink } from "react-router";
type sqrType = {
  src: string;
  id: number;
};

export const Square = ({ src, id }: sqrType) => {
  const onClickTest = (e: React.MouseEvent) => {
    console.log(e);
  };
  console.log("sqr");
  return id === 2 ? (
    <NavLink onClick={e => onClickTest(e)} to={"/page2"} className="imgCont">
      <img src={src} className="image" />
    </NavLink>
  ) : (
    <div onClick={e => onClickTest(e)} className="imgCont">
      <img src={src} className="image" />
    </div>
  );
};
