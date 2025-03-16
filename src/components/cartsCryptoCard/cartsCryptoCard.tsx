import React from "react";
import { crptItm } from "../../types";

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
    <div className="cryptoCont">
      <h2 className="cryptoName">{name}</h2>
      <p className="supply">change per hour {percent_change_1h}%</p>
      <span className="price">
        price - {`${parseFloat(price_usd).toFixed(2)}`}$
      </span>
    </div>
  );
};
