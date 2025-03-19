import React, { useEffect, useState } from "react";
import { crptItm } from "../../types";
import "./cartCrtptCard.style.css";

interface ICartsCryptoCard extends crptItm {
  item: crptItm;
  setArrOfClickedElem: (val: crptItm[]) => void;
  arrOfClickedElem: crptItm[];
}

export const CartsCryptoCard = ({
  id,
  name,
  tsupply,
  price_usd,
  nameid,
  rank,
  percent_change_1h,
  item,
  setArrOfClickedElem,
  arrOfClickedElem,
}: ICartsCryptoCard) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    if (isClicked) {
      const newArr = arrOfClickedElem
        .map(item => JSON.stringify(item))
        .filter(value => {
          return value != JSON.stringify(item);
        })
        .map(item => JSON.parse(item));

      setArrOfClickedElem(newArr);

      localStorage.removeItem("arrOfData");
      console.log(newArr, "new");
      localStorage.setItem("arrOfData", JSON.stringify(newArr)),
        setIsClicked(false);
    }
  }, [isClicked]);
  const handleOnDeleteClick = () => {
    setIsClicked(true);
  };
  return (
    <div className="cartCardCont">
      <div onClick={handleOnDeleteClick} className="deleteCardBtn">
        X
      </div>
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
