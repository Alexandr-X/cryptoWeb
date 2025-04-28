import { useState } from "react";
import "./regCont.style.css";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";

const socket = io("http://localhost:5000");

export const RegPage = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [border, setBorder] = useState<string>("black");
  const navigate = useNavigate();

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
      socket.on("isCorrectReg", (data) => {
        if (data) {
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
