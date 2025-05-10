import React, { useState } from "react";
import { crptItm } from "../../types";
import "./cryptaEl.style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { changeArrOfPinCrpt } from "../../redux/reducers/arrOfPinCrpt.reducer";
import { io } from "socket.io-client";
import { descrpUpd } from "../../redux/reducers/cryptaDescr";
// import { useCryptoDescrp } from "../../features/useCryptoDescrp/useCryptoDescrp";

const socket = io("http://localhost:5000");
interface Ia extends crptItm {
  item: crptItm;
  setIsAddToCart: (value: boolean) => void;
  setTop: (value: number) => void;
  setIsRightBtnOnCrptCardClick: (value: number) => void;
}

export const CryptoCard = ({
  id,
  name,
  price_usd,
  percent_change_1h,
  setIsAddToCart,
  setTop,
  item,
  setIsRightBtnOnCrptCardClick,
}: Ia) => {
  const arrOfCartsCrypta = JSON.parse(
    useSelector((state: RootState) => state.arrOfPinCrpt)
  );
  // const [idOfCrpt, setIdOfCrpt] = useState<string>("");
  // const { data: descrData, isLoading, isError } = useCryptoDescrp(idOfCrpt);
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
  const handleOnRightBtnCryptaCardClick = (event: React.MouseEvent) => {
    event.preventDefault();
    socket.emit("getDescrAbout", name);
    socket.on("getCrptId", async (id) => {
      if (id.isSuccsesful) {
        const descr = await fetch(
          `https://api.coinpaprika.com/v1/coins/${id.data}`
        ).then((data) => data.json());
        console.log(descr);
        dispatch(
          descrpUpd({
            name: descr.name,
            descr: descr.description,
            logo: descr.logo,
            symbol: descr.symbol,
            first_data_at: descr.first_data_at,
          })
        );
        //setIdOfCrpt(id.data);
      } else {
        console.log("error");
      }
    });
    setIsRightBtnOnCrptCardClick(10);
  };

  return (
    <div
      key={id}
      className="cryptoCont"
      onClick={(event) => handleOnCardClick(event)}
      onContextMenu={handleOnRightBtnCryptaCardClick}
    >
      <h2 className="cryptoName">{name}</h2>
      <p className="supply">change per hour {percent_change_1h}%</p>
      <span className="price">
        price - {`${parseFloat(price_usd).toFixed(2)}`}$
      </span>
    </div>
  );
};
