import { useState } from "react";
import "./regCont.style.css";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";
import {
  changeEmail,
  changeLogo,
  changeName,
  changeWallet,
} from "../../redux/reducers/userDataSlice";
import { useDispatch } from "react-redux";
import { changeArr } from "../../redux/reducers/arrOfBoughts.reducer";
import { changeArrOfPinCrpt } from "../../redux/reducers/arrOfPinCrpt.reducer";

const socket = io("http://localhost:5000");

export const RegPage = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [border, setBorder] = useState<string>("black");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnSignBtnClick = () => {
    setIsSignIn(!isSignIn);
  };
  const handleOnInputNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };
  const handleOnInputEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };
  const handleOnInputPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };
  const handleOnEnterBtnClick = () => {
    if (email != "" && password != "") {
      if (!isSignIn && name != "") {
        socket.emit("registr", {
          name: name,
          email: email,
          password: password,
        });
      } else if (isSignIn) {
        socket.emit("isCorrectLogin", { email: email, password: password });
      }
      socket.on("isCorrectReg", async data => {
        if (data) {
          socket.emit("getAddInform", email);
          socket.on("giveAddInform", inform => {
            dispatch(changeLogo({ logo: inform.logo }));
            dispatch(changeWallet({ wallet: inform.money }));
            dispatch(changeEmail({ email }));
            dispatch(changeName({ name }));
            dispatch(changeArr({ arr: inform.arr }));
            dispatch(changeArrOfPinCrpt({ arr: inform.arrOfPin }));
          });
          navigate("/");
        } else {
          setBorder("red");
          setTimeout(() => {
            setBorder("black");
          }, 5000);
        }
      });
    }
  };
  return (
    <div className="regCont">
      <form action="" className="inpRegCont">
        {!isSignIn ? (
          <input
            style={{ border: `2px solid ${border}` }}
            value={name}
            onChange={handleOnInputNameChange}
            type="text"
            placeholder="Alex"
          />
        ) : (
          ""
        )}
        <input
          style={{ border: `2px solid ${border}` }}
          value={email}
          onChange={handleOnInputEmailChange}
          type="email"
          placeholder="sasha@crypto.web"
        />
        <input
          style={{ border: `2px solid ${border}` }}
          value={password}
          onChange={handleOnInputPasswordChange}
          type="password"
          placeholder="*****"
        />
      </form>
      <div className="btnCont">
        <div onClick={handleOnEnterBtnClick}>{!isSignIn ? "reg" : "enter"}</div>
        <div onClick={handleOnSignBtnClick}>
          {!isSignIn ? "sign in" : "sign up"}
        </div>
      </div>
    </div>
  );
};
