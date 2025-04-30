import React, { useEffect, useState } from "react";
import { crptItm } from "../../types";
import "./cartCrtptCard.style.css";
import { IBoughtObj } from "../../pages";
import { useDispatch, useSelector } from "react-redux";
import { changeWallet } from "../../redux/reducers/userDataSlice";
import { RootState } from "../../redux";
import { io } from "socket.io-client";
import { changeArr } from "../../redux/reducers/arrOfBoughts.reducer";
import { changeArrOfPinCrpt } from "../../redux/reducers/arrOfPinCrpt.reducer";

const socket = io("http://localhost:5000");
interface ICartsCryptoCard extends crptItm {
  item: crptItm;
  arrOfBoughtEl: IBoughtObj[];
}

export const CartsCryptoCard = ({
  id,
  name,
  price_usd,
  percent_change_1h,
  item,
  arrOfBoughtEl,
}: ICartsCryptoCard) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userDataStore);
  const arrOfClickedElem = JSON.parse(
    useSelector((state: RootState) => state.arrOfPinCrpt)
  );
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<string>("");

  useEffect(() => {
    if (isClicked) {
      const newArr = arrOfClickedElem.filter(
        (elem: crptItm) => elem.id !== item.id
      );

      dispatch(changeArrOfPinCrpt({ arr: JSON.stringify(newArr) }));
      socket.emit("udpArrOfPinCrpt", {
        email: userData.email,
        arr: JSON.stringify(newArr),
      });
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
    if (
      Number(workingElem[0].price_usd) * parseFloat(quantity) <=
      userData.wallet
    ) {
      socket.emit("changeMoney", {
        email: userData.email,
        wallet: Number(
          (
            userData.wallet -
            Number(workingElem[0].price_usd) * parseFloat(quantity)
          ).toFixed(3)
        ),
      });
      dispatch(
        changeWallet({
          wallet: Number(
            (
              userData.wallet -
              Number(workingElem[0].price_usd) * parseFloat(quantity)
            ).toFixed(3)
          ),
        })
      );

      const newAr = [
        ...arrOfBoughtEl,
        { arr: workingElem[0], quantity: Number(parseFloat(quantity)) },
      ];
      socket.emit("updArrofBoughts", { email: userData.email, arr: newAr });
      dispatch(changeArr({ arr: JSON.stringify(newAr) }));
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
