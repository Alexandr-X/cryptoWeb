import React, { useEffect, useMemo, useState } from "react";
import { crptItm } from "../../types";
import { CartsCryptoCard } from "../../components";
import { ExitToMainMenu } from "../../components";
import "./profilePage.style.css";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { changeLogo } from "../../redux/reducers/userDataSlice";
import { io } from "socket.io-client";
import { changeArr } from "../../redux/reducers/arrOfBoughts.reducer";
export interface IBoughtObj {
  arr: crptItm;
  quantity: number;
}
const socket = io("http://localhost:5000");

export function ProfilePage() {
  const userData = useSelector((state: RootState) => state.userDataStore);
  const arrOfClicked = JSON.parse(
    useSelector((state: RootState) => state.arrOfPinCrpt)
  );
  const dispatch = useDispatch();
  const [imgUrl, setUrl] = useState<string>("");
  const [isChangePict, setIsChange] = useState<boolean>(false);
  const [isPurchase, setIsPurchase] = useState<boolean>(false);
  const [heightOfMCont2, setHeigh] = useState<number>(98);
  const arrOfBoughtEl = JSON.parse(
    useSelector((state: RootState) => state.arrOfBoughts)
  );
  const [finalyPrice, setFinalyPrice] = useState<number>(0);

  const handleOnChangeContDataClick = () => {
    if (isPurchase) {
      setIsPurchase(false);
      setFinalyPrice(0);
    } else if (!isPurchase) {
      setIsPurchase(true);

      let priceOfBghts = 0;
      arrOfBoughtEl.map(
        (item: IBoughtObj) =>
          (priceOfBghts +=
            finalyPrice + item.quantity * Number(item.arr.price_usd))
      );
      setFinalyPrice(Number(priceOfBghts.toFixed(3)));
      console.log(Number(priceOfBghts.toFixed(3)));
    }
  };
  const handleOnImageClick = () => {
    setIsChange(!isChangePict);
  };
  const handleOnInpUrlClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const handleOnChangePictClick = () => {
    dispatch(changeLogo({ logo: imgUrl }));
    socket.emit("changeLogo", { logo: imgUrl, email: userData.email });
  };
  const hadleOnExitBtnClick = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    let arrT = arrOfBoughtEl;

    arrT.map((item: IBoughtObj) => {
      let ind = Number(
        arrT.findIndex((elem: IBoughtObj) => elem.arr.id === item.arr.id)
      );

      for (let j = 0; j < arrT.length; j++) {
        if (item.arr.id === arrT[j].arr.id && j !== ind) {
          item.quantity += arrT[j].quantity;
          arrT = arrT.slice(0, j).concat(arrT.slice(j + 1));
          dispatch(changeArr({ arr: JSON.stringify(arrT) }));
        }
      }

      return item;
    });

    socket.emit("updArrofBoughts", { email: userData.email, arr: arrT });
  }, [userData.wallet]);

  useMemo(() => {
    if (arrOfClicked.length <= 9) {
      setHeigh(98);
    } else {
      let temp = Math.floor(arrOfClicked.length / 9);

      if (arrOfClicked.length % 9 != 0) {
        temp++;
      }

      setHeigh(58 * temp);
    }
  }, [arrOfClicked.length]);

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
          {arrOfClicked.map((item: crptItm) => {
            return (
              <CartsCryptoCard
                key={item.id}
                id={item.id}
                name={item.name}
                price_usd={item.price_usd}
                percent_change_1h={item.percent_change_1h}
                arrOfBoughtEl={arrOfBoughtEl}
              />
            );
          })}
        </div>
      ) : (
        <div className="bugthsCont">
          {arrOfBoughtEl.length !== 0 ? (
            <div className="boughtsCards">
              {arrOfBoughtEl.map((item: IBoughtObj) => {
                return (
                  <div className="boughtsElem" key={item.arr.id}>
                    <h2>{item.arr.name}</h2>
                    <div className="quntCont">
                      quantity that you bought -{" "}
                      <p className="qunt">{item.quantity}</p>
                    </div>
                  </div>
                );
              })}
              <div className="finalyPrice">totl spend: {finalyPrice}$</div>
            </div>
          ) : (
            <h1>You bought nothing yet</h1>
          )}
        </div>
      )}

      <div className="profInfo">
        <img
          className="picture"
          src={userData.logo}
          onClick={handleOnImageClick}
          alt=""
        />
        <div className="infoCont">
          {" "}
          <p>{userData.name}</p>
          <h2 className="wallet">wallet - {userData.wallet}$</h2>
        </div>

        <NavLink to={"/topUpPage"} className="toPWrap">
          <div className="balance">top up</div>
        </NavLink>
        <NavLink to={"/reg"} className="toPWrap" onClick={hadleOnExitBtnClick}>
          <div className="balance">exit</div>
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
      {isChangePict ? (
        <div className="changePictCont">
          <div className="inpPictCont">
            <input type="text" value={imgUrl} onChange={handleOnInpUrlClick} />
            <button onClick={handleOnChangePictClick}>change avatar</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
