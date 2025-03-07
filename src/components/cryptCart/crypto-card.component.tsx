import React from "react";
import { crptItm } from "../../types";
import "./cryptaEl.style.css";

export const CryptoCard: React.FC<crptItm> = ({
  id,
  name,
  tsupply,
  price_usd,
  nameid,
  rank,
  percent_change_1h,
  setIsAddToCart,
}) => {
  const handleOnCardClick = () => {
    setIsAddToCart(true);
    setTimeout(() => {
      setIsAddToCart(false);
    }, 1500);
  };
  return (
    <div key={id} className="cryptoCont" onClick={handleOnCardClick}>
      <h2 className="cryptoName">{name}</h2>
      <p className="supply">change per hour {percent_change_1h}%</p>
      <span className="price">
        price - {`${parseFloat(price_usd).toFixed(2)}`}$
      </span>
    </div>
  );
};
