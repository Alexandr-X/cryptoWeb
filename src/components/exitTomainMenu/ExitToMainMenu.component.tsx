import React from "react";
import "./exit.style.css";
import { NavLink } from "react-router";

export const ExitToMainMenu = () => {
  return (
    <NavLink to={"/"}>
      <div className="exit"> X</div>
    </NavLink>
  );
};
