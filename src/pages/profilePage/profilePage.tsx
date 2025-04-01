import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { crptItm } from "../../types";
import { CartsCryptoCard } from "../../components";
import { ExitToMainMenu } from "../../components";
import "./profilePage.style.css";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { changeLogo } from "../../redux/reducers/pictureSlice";

export interface IBoughtObj {
  arr: crptItm;
  quantity: number;
}

export function ProfilePage() {
  const pict = useSelector((state: RootState) => state.avatarStore);
  const dispatch = useDispatch();
  const location = useLocation();
  const [imgUrl, setUrl] = useState<string>("");
  const [isChangePict, setIsChange] = useState<boolean>(false);
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
  const handleOnImageClick = () => {
    // dispatch(chabgeLogo({ logo: "link" }));
    setIsChange(!isChangePict);
    console.log(pict);
  };
  const handleOnInpUrlClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const handleOnChangePictClick = () => {
    dispatch(changeLogo({ logo: imgUrl }));
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
                  <p className="quntCont">
                    quantity that you bought -{" "}
                    <p className="qunt">{item.quantity}</p>
                  </p>
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
          src={pict}
          onClick={handleOnImageClick}
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
