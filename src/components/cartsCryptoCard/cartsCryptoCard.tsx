import React from "react";
import { crptItm } from "../../types";
import "./cartCrtptCard.style.css";

export const CartsCryptoCard = ({
  id,
  name,
  tsupply,
  price_usd,
  nameid,
  rank,
  percent_change_1h,
}: crptItm) => {
  return (
    <div className="cartCardCont">
      <h2>{name}</h2>
      <p>change per hour {percent_change_1h}%</p>
      <span className="price">
        price - {`${parseFloat(price_usd).toFixed(2)}`}$
      </span>
      <div className="costCont">
        <div className="buyBtn">buy</div> <input placeholder="0" />
        pieces
      </div>
    </div>
  );
};
