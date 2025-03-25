import React, { useEffect, useState } from "react";
import { crptItm } from "../../types";
import "./cartCrtptCard.style.css";

interface ICartsCryptoCard extends crptItm {
  item: crptItm;
  setArrOfClickedElem: (val: crptItm[]) => void;
  arrOfClickedElem: crptItm[];
  wallet: number;
  setWallet: (val: number) => void;
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
  wallet,
  setWallet,
}: ICartsCryptoCard) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [cost, setCost] = useState<string>("");

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

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCost(e.target.value);
  };

  const handleOnBuyBtnClick = (e: React.ChangeEvent) => {
    console.log(e.target.parentElement?.parentElement);
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
        <div className="buyBtn" onClick={handleOnBuyBtnClick}>
          buy
        </div>
        <input
          value={cost}
          placeholder="0"
          onChange={handleOnInputChange}
          type="number"
        />
        pieces
      </div>
    </div>
  );
};
