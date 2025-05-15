import React, { useState } from "react";
import "./topUpPage.style.css";
import { ExitToMainMenu } from "../../components";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { changeWallet } from "../../redux/reducers/userDataSlice";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export const TopUpPage = () => {
  const [money, setMoney] = useState<string>("");
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userDataStore);

  const handleOnConfirmBtnclick = () => {
    if (Number(money) < 0) {
      console.log("");
    } else if (money != "") {
      socket.emit("changeMoney", {
        email: userData.email,
        wallet: Number((userData.wallet + parseFloat(money)).toFixed(3)),
      });
      dispatch(
        changeWallet({
          wallet: Number((userData.wallet + parseFloat(money)).toFixed(3)),
        })
      );
    }
  };

  const handleOnMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoney(e.target.value);
  };
  return (
    <>
      <ExitToMainMenu />

      <div className="cardInfoCont">
        <form action="">
          <h1 className="log">Payment info</h1>

          <div>
            <label htmlFor="name">Full name</label>
            <input className="name" type="text" placeholder="Sasha X" />
          </div>

          <div>
            <label htmlFor="cardNumb">Credit card number</label>
            <input
              className="cardNumb"
              type="text"
              placeholder="1234 1234 1234 1234"
            />
          </div>

          <div className="dateCont">
            <div>
              <label htmlFor="dateOfend">Exp date</label>
              <input className="dateOfend" type="text" placeholder="MM/YY" />
            </div>

            <div>
              <label htmlFor="cvv">CVV</label>{" "}
              <input className="cvv" type="password" placeholder="***" />
            </div>
          </div>

          <div>
            <label htmlFor="code">Аmount of money</label>
            <input
              value={money}
              className="code"
              type="number"
              placeholder="100$"
              onChange={handleOnMoneyChange}
            />
          </div>
          <NavLink className="linkBtn" to={"/page2"}>
            {" "}
            <div className="payBtn" onClick={handleOnConfirmBtnclick}>
              Confirm Payment
            </div>
          </NavLink>
        </form>
      </div>
    </>
  );
};
