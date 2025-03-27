import React, { useEffect, useState } from "react";
import { crptItm } from "../../types";
import "./cartCrtptCard.style.css";
import { IBoughtArr } from "../../pages";

interface ICartsCryptoCard extends crptItm {
  item: crptItm;
  setArrOfClickedElem: (val: crptItm[]) => void;
  arrOfClickedElem: crptItm[];
  wallet: number;
  setWallet: (val: number) => void;
  setArrOfBoughtEl: (val: IBoughtArr[]) => void;
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
  setArrOfBoughtEl,
  setWallet,
}: ICartsCryptoCard) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<string>("");

  useEffect(() => {
    if (isClicked) {
      const newArr = arrOfClickedElem.filter(elem => elem.id !== item.id);

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
    setQuantity(e.target.value);
  };

  const handleOnBuyBtnClick = (e: React.MouseEvent<HTMLElement>) => {
    const workingElem = arrOfClickedElem.filter(
      (item: crptItm) => item.id == e.target.parentElement?.parentElement?.id
    );
    if (Number(workingElem[0].price_usd) * parseFloat(quantity) <= wallet) {
      localStorage.setItem(
        "wallet",
        `${(
          wallet -
          Number(workingElem[0].price_usd) * parseFloat(quantity)
        ).toFixed(3)}`
      );
      setArrOfBoughtEl(prev => [...prev, [...workingElem, quantity]]);

      setWallet(
        Number(
          (
            wallet -
            Number(workingElem[0].price_usd) * parseFloat(quantity)
          ).toFixed(3)
        )
      );
    } else if (quantity != "")
      alert("you have no many:( pls top up your card or choose less crypto.");
  };

  return (
    <div className="cartCardCont" id={id}>
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
          value={quantity}
          placeholder="0"
          onChange={handleOnInputChange}
          type="number"
        />
        pieces
      </div>
    </div>
  );
};
