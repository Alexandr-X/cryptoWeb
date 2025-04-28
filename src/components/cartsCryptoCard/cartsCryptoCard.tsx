import React, { useEffect, useState } from "react";
import { crptItm } from "../../types";
import "./cartCrtptCard.style.css";
import { IBoughtObj } from "../../pages";

interface ICartsCryptoCard extends crptItm {
  item: crptItm;
  setArrOfClickedElem: (val: crptItm[]) => void;
  arrOfClickedElem: crptItm[];
  wallet: number;
  setWallet: (val: number) => void;
  setArrOfBoughtEl: (val: IBoughtObj[]) => void;
  arrOfBoughtEl: IBoughtObj[];
}

export const CartsCryptoCard = ({
  id,
  name,
  price_usd,
  percent_change_1h,
  item,
  setArrOfClickedElem,
  arrOfClickedElem,
  wallet,
  setArrOfBoughtEl,
  setWallet,
  arrOfBoughtEl,
}: ICartsCryptoCard) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<string>("");

  useEffect(() => {
    if (isClicked) {
      const newArr = arrOfClickedElem.filter((elem) => elem.id !== item.id);

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
    if (parseFloat(e.target.value) >= 0 || e.target.value == "")
      setQuantity(e.target.value);
  };

  const handleOnBuyBtnClick = () => {
    const workingElem = arrOfClickedElem.filter(
      (item: crptItm) => item.id == id
    );
    if (Number(workingElem[0].price_usd) * parseFloat(quantity) <= wallet) {
      localStorage.setItem(
        "wallet",
        `${(
          wallet -
          Number(workingElem[0].price_usd) * parseFloat(quantity)
        ).toFixed(3)}`
      );
      const newAr = [
        ...arrOfBoughtEl,
        { arr: workingElem[0], quantity: Number(parseFloat(quantity)) },
      ];
      setArrOfBoughtEl(newAr);
      localStorage.setItem("boughts", JSON.stringify(newAr));

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
