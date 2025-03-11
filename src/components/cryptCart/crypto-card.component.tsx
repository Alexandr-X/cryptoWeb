import React, { useState } from "react";
import { crptItm } from "../../types";
import "./cryptaEl.style.css";
interface Ia extends crptItm {
  item: crptItm;
  setArrOfCartsCrypta: (val: crptItm[]) => void;
  arrOfCartsCrypta: crptItm[];
}

export const CryptoCard = ({
  id,
  name,
  tsupply,
  price_usd,
  nameid,
  rank,
  percent_change_1h,
  setIsAddToCart,
  setTop,
  item,
  setArrOfCartsCrypta,
  arrOfCartsCrypta,
}: Ia) => {
  const [arr, setArr] = useState<crptItm[]>(arrOfCartsCrypta);

  const handleOnCardClick = (event: React.MouseEvent) => {
    setIsAddToCart(true);
    setTimeout(() => {
      setIsAddToCart(false);
    }, 1500);

    setTop(event.pageY);

    setArr(x => {
      const newArrOfClickedCard = [...x, item];
      setArrOfCartsCrypta(newArrOfClickedCard);
      return newArrOfClickedCard;
    });
  };

  return (
    <div
      key={id}
      className="cryptoCont"
      onClick={event => handleOnCardClick(event)}
    >
      <h2 className="cryptoName">{name}</h2>
      <p className="supply">change per hour {percent_change_1h}%</p>
      <span className="price">
        price - {`${parseFloat(price_usd).toFixed(2)}`}$
      </span>
    </div>
  );
};
