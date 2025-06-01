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
        dispatch(
          descrpUpd({
            name: descr.name,
            descr: descr.description,
            logo: descr.logo,
            symbol: descr.symbol,
            first_data_at: descr.started_at,
          })
        );
        //setIdOfCrpt(id.data);
      } else {
        dispatch(
          descrpUpd({
            name: "Undefind cruptocurrency",
            descr: "we havent got any data about this cryptocurrency",
            logo: "data:image/png;base64,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",
            symbol: "undef",
            first_data_at: "1900-01-01",
          })
        );
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
