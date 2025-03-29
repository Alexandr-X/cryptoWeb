import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { crptItm } from "../../types";
import { CartsCryptoCard } from "../../components";
import { ExitToMainMenu } from "../../components";
import "./profilePage.style.css";
import { NavLink } from "react-router";
import { JSX } from "react/jsx-runtime";

export interface IBoughtObj {
  arr: crptItm;
  quantity: number;
}

export function ProfilePage() {
  const location = useLocation();
  const [isPurchase, setIsPurchase] = useState<boolean>(false);
  const [arrOfClickedElem, setArrOfClickedElem] = useState<crptItm[]>(
    location.state.data
  );
  const [heightOfMCont2, setHeigh] = useState<number>(98);
  const [arrOfBoughtEl, setArrOfBoughtEl] = useState<IBoughtObj[]>(
    JSON.parse(localStorage.getItem("boughts") || "[]")
  );

  const [wallet, setWallet] = useState<number>(
    parseFloat(localStorage.getItem("wallet") || "0")
  );

  const handleOnChangeContDataClick = () => {
    if (isPurchase) setIsPurchase(false);
    else if (!isPurchase) setIsPurchase(true);
  };

  useEffect(() => {
    let arrT = arrOfBoughtEl;
    console.log("boght", arrOfBoughtEl);

    arrT.map((item: IBoughtObj) => {
      let ind = Number(
        arrT.findIndex((elem: IBoughtObj) => elem.arr.id === item.arr.id)
      );
      for (let j = 0; j < arrT.length; j++) {
        if (item.arr.id === arrT[j].arr.id && j !== ind) {
          item.quantity += arrT[j].quantity;
          console.log(item.quantity, "qua");
          arrT = arrT.slice(0, j).concat(arrT.slice(j + 1));
          setArrOfBoughtEl(arrT);
          localStorage.setItem("boughts", JSON.stringify(arrT));
        }
      }
      return item;
    });
  }, [wallet]);
  useEffect(() => {
    if (!localStorage.getItem("arrOfData")) {
      localStorage.setItem("arrOfData", JSON.stringify(location.state.data));
    } else {
      let temp = JSON.parse(localStorage.getItem("arrOfData") || "[]");

      temp.push(...location.state.data);

      temp = Array.from(
        new Set(temp.map((item: crptItm) => JSON.stringify(item)))
      ).map(item => JSON.parse(item));

      setArrOfClickedElem(temp);

      localStorage.setItem("arrOfData", JSON.stringify(temp));
    }
  }, [location.state.data]);

  useMemo(() => {
    if (JSON.parse(localStorage.getItem("arrOfData") || "[]").length <= 9) {
      setHeigh(98);
    } else {
      let temp = Math.floor(
        JSON.parse(localStorage.getItem("arrOfData") || "[]").length / 9
      );

      if (
        JSON.parse(localStorage.getItem("arrOfData") || "[]").length % 9 !=
        0
      ) {
        temp++;
      }

      setHeigh(58 * temp);
    }
  }, [JSON.parse(localStorage.getItem("arrOfData") || "[]").length]);

  return (
    <div
      className="mainContOfPage2"
      style={{
        height: `${heightOfMCont2}%`,
      }}
    >
      <ExitToMainMenu />
      {!isPurchase ? (
        <div className="cardContInCart">
          {arrOfClickedElem.map((item: crptItm) => {
            return (
              <CartsCryptoCard
                key={item.id}
                id={item.id}
                name={item.name}
                tsupply={item.tsupply}
                price_usd={item.price_usd}
                nameid={item.nameid}
                rank={item.rank}
                percent_change_1h={item.percent_change_1h}
                item={item}
                setArrOfClickedElem={setArrOfClickedElem}
                arrOfClickedElem={arrOfClickedElem}
                wallet={wallet}
                setWallet={setWallet}
                setArrOfBoughtEl={setArrOfBoughtEl}
                arrOfBoughtEl={arrOfBoughtEl}
              />
            );
          })}
        </div>
      ) : (
        <div className="bugthsCont">
          {arrOfBoughtEl.length !== 0 ? (
            arrOfBoughtEl.map((item: IBoughtObj) => {
              return (
                <div className="boughtsElem">
                  <h2>{item.arr.name}</h2>
                  <h3 className="quntCont">
                    quantity that you bought -{" "}
                    <p className="qunt">{item.quantity}</p>
                  </h3>
                </div>
              );
            })
          ) : (
            <h1>You bought nothing yet</h1>
          )}
        </div>
      )}

      <div className="profInfo">
        <img
          className="picture"
          src={
            "data:image/png;base64,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"
          }
          alt=""
        />
        <h1>Alexandr</h1>
        <span>wallet - {wallet}$</span>
        <NavLink to={"/topUpPage"} className="toPWrap">
          <div className="balance">top up</div>
        </NavLink>
        {!isPurchase ? (
          <div onClick={handleOnChangeContDataClick} className="balance purch">
            Show purchase
          </div>
        ) : (
          <div onClick={handleOnChangeContDataClick} className="balance purch">
            Show pin crpt
          </div>
        )}
      </div>
    </div>
  );
}
