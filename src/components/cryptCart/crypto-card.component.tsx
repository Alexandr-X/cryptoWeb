import React from "react";
import { crptItm } from "../../types";
import "./cryptaEl.style.css";
interface Ia extends crptItm {
  item: crptItm;
  setArrOfCartsCrypta: (val: crptItm[]) => void;
  arrOfCartsCrypta: crptItm[];
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
  setArrOfCartsCrypta,
  arrOfCartsCrypta,
}: Ia) => {
  const handleOnCardClick = (event: React.MouseEvent) => {
    let temp = false;
    console.log("item", item, "arr", arrOfCartsCrypta);

    for (let i = 0; i < arrOfCartsCrypta.length; i++) {
      if (item.id === arrOfCartsCrypta[i].id) {
        temp = true;
      }
    }

    setIsAddToCart(true);

    setTimeout(() => {
      setIsAddToCart(false);
    }, 1500);

    setTop(event.pageY);

    if (!temp) {
      const newArrOfClickedCard = [...arrOfCartsCrypta, item];
      setArrOfCartsCrypta(newArrOfClickedCard);
    }
  };

  return (
    <div
      key={id}
      className="cryptoCont"
      onClick={(event) => handleOnCardClick(event)}
    >
      <h2 className="cryptoName">{name}</h2>
      <p className="supply">change per hour {percent_change_1h}%</p>
      <span className="price">
        price - {`${parseFloat(price_usd).toFixed(2)}`}$
      </span>
    </div>
  );
};
