import React from "react";
import "./square.style.css";
import { NavLink } from "react-router";
import { crptItm } from "../../types";

type sqrType = {
  src: string;
  id: number;
  arrOfCartsCrypta: crptItm[];
};

export const Square = ({ src, id, arrOfCartsCrypta }: sqrType) => {
  const onClickTest = (e: React.MouseEvent) => {
    console.log(e);
  };
  return id === 2 ? (
    <NavLink
      onClick={e => onClickTest(e)}
      to={"/page2"}
      className="imgCont"
      state={{ data: arrOfCartsCrypta }}
    >
      <img src={src} className="image" />
    </NavLink>
  ) : (
    <div onClick={e => onClickTest(e)} className="imgCont">
      <img src={src} className="image" />
    </div>
  );
};
