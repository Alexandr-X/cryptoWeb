import React from "react";
import { crptItm } from "../../types";
import "./cryptaEl.style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { changeArrOfPinCrpt } from "../../redux/reducers/arrOfPinCrpt.reducer";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
interface Ia extends crptItm {
  item: crptItm;
  setIsAddToCart: (value: boolean) => void;
  setTop: (value: number) => void;
}

export const CryptoCard = ({
  id,
  name,
  price_usd,
  percent_change_1h,
  setIsAddToCart,
  setTop,
  item,
}: Ia) => {
  const arrOfCartsCrypta = JSON.parse(
    useSelector((state: RootState) => state.arrOfPinCrpt)
  );
  const email = useSelector((state: RootState) => state.userDataStore.email);
  const dispatch = useDispatch();

  const handleOnCardClick = (event: React.MouseEvent) => {
    let temp = false;

    arrOfCartsCrypta.filter((elem: crptItm) => item.id === elem.id).length > 0
      ? (temp = true)
      : (temp = false);

    setIsAddToCart(true);

    setTimeout(() => {
      setIsAddToCart(false);
    }, 1500);

    setTop(event.pageY);

    if (!temp) {
      const newArrOfClickedCard = Array.from(
        new Set(
          [...arrOfCartsCrypta, item].map((item: crptItm) =>
            JSON.stringify(item)
          )
        )
      ).map((item: string) => JSON.parse(item));

      console.log("newArr", newArrOfClickedCard);
      socket.emit("udpArrOfPinCrpt", {
        email: email,
        arr: newArrOfClickedCard,
      });
      dispatch(
        changeArrOfPinCrpt({ arr: JSON.stringify(newArrOfClickedCard) })
      );
    }
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
