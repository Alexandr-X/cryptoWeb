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
import { useForm } from "react-hook-form";
import { ErrorComponent } from "../../components";

interface IUser {
  name: string;
  email: string;
  password: string;
}

const socket = io("http://localhost:5000");

export const RegPage = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [border, setBorder] = useState<string>("black");
  const [isCorrectEmail, setIsCorrectEmail] = useState<boolean>(true);
  const [isCorrectPasw, setIsCorrectPasw] = useState<boolean>(true);
  const [emTextCol, setEmTextCol] = useState<string>("black");
  const [paswTextCol, setPaswTextCol] = useState<string>("black");
  const [paswType, setPaswType] = useState<string>("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUser>();

  localStorage.getItem("loading")
    ? setTimeout(() => {
        localStorage.removeItem("loading");
      }, 1500)
    : "";

  socket.emit("isWorkToken", localStorage.getItem("token") || "");
  socket.on("getTokenAnser", (answer) => {
    if (answer) {
      socket.emit("getAddInform", localStorage.getItem("email") || email);
      socket.on("giveAddInform", (inform) => {
        dispatch(changeLogo({ logo: inform.logo }));
        dispatch(changeWallet({ wallet: inform.money }));
        dispatch(changeEmail({ email }));
        isSignIn
          ? dispatch(changeName({ name: inform.name }))
          : dispatch(changeName({ name }));
        dispatch(changeArr({ arr: inform.arr }));
        dispatch(changeArrOfPinCrpt({ arr: inform.arrOfPin }));
      });
      navigate("/");
    }
  });

  const handleOnSignBtnClick = () => {
    setIsSignIn(!isSignIn);
    setName("");
    setEmail("");
    setPassword("");
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

    if (email.split("").filter((item: string) => item === "@").length <= 0) {
      setIsCorrectEmail(false);
    } else {
      email.split("").slice(0, email.split("").indexOf("@")).length >= 4
        ? setIsCorrectEmail(true)
        : setIsCorrectEmail(false);
    }
  };
  const handleOnInputPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
    password.length >= 4 ? setIsCorrectPasw(true) : setIsCorrectPasw(false);
  };
  const handleOnEnterBtnClick = () => {
    if (email != "" && password != "" && isCorrectEmail && isCorrectPasw) {
      if (!isSignIn) {
        if (name != "") {
          socket.emit("registr", {
            name: name,
            email: email,
            password: password,
          });
        } else {
          setBorder("red");
          setTimeout(() => {
            setBorder("black");
          }, 5000);
        }
      } else if (isSignIn) {
        socket.emit("isCorrectLogin", { email: email, password: password });
      }

      socket.on("isCorrectReg", async (data) => {
        if (data) {
          localStorage.setItem("email", email);
          socket.emit("getAddInform", email);
          socket.on("giveAddInform", (inform) => {
            dispatch(changeLogo({ logo: inform.logo }));
            dispatch(changeWallet({ wallet: inform.money }));

            dispatch(changeEmail({ email }));
            isSignIn
              ? dispatch(changeName({ name: inform.name }))
              : dispatch(changeName({ name }));
            dispatch(changeArr({ arr: inform.arr }));
            dispatch(changeArrOfPinCrpt({ arr: inform.arrOfPin }));
          });
          socket.emit("createToken", email);
          socket.on("getToken", (token) => {
            localStorage.setItem("token", token);
          });

          navigate("/");
        } else {
          !isSignIn
            ? alert("this email is already used")
            : alert("this email is not regisetrated yet");
        }
      });
    } else if (email == "" && password == "") {
      setBorder("red");
      setTimeout(() => {
        setBorder("black");
      }, 5000);
    } else if (!isCorrectEmail) {
      const oldEmail = email;
      setEmTextCol("red");
      setEmail("Incorrect email");
      setTimeout(() => {
        setEmail(oldEmail);
        setEmTextCol("black");
      }, 1500);
    } else if (!isCorrectPasw) {
      const oldPasw = password;
      setPassword("Incorrect password");
      setPaswType("text");
      setPaswTextCol("red");
      setTimeout(() => {
        setPaswType("password");
        setPaswTextCol("black");
        setPassword(oldPasw);
      }, 1500);
    }
  };

  return (
    <div className="regCont">
      <form action="" className="inpRegCont">
        {!isSignIn ? (
          <div className="inputsCont">
            {" "}
            <input
              type="text"
              placeholder="Alex"
              value={name}
              style={{ border: `2px solid ${border}` }}
              // {...register("name", {
              //   required: true,
              //   minLength: 3,
              //   pattern: /^[A-Za-z0-9]+$/,
              // })}
              onChange={handleOnInputNameChange}
            />
            {errors.name ? (
              <ErrorComponent type={errors.name.type} el="name" />
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        <div className="inputsCont">
          <input
            style={{ border: `2px solid ${border}`, color: emTextCol }}
            value={email}
            type="email"
            placeholder="sasha@crypto.web"
            {...register("email", {
              required: true,
              minLength: 6,
              pattern: /^[A-Za-z0-9@.]+$/,
            })}
            onChange={handleOnInputEmailChange}
          />
          {errors.email ? (
            <ErrorComponent type={errors.email.type} el="email" />
          ) : (
            ""
          )}
        </div>

        <div className="inputsCont">
          <input
            style={{ border: `2px solid ${border}`, color: paswTextCol }}
            value={password}
            placeholder="*****"
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*_).+$/,
            })}
            onChange={handleOnInputPasswordChange}
          />

          {errors.password ? (
            <ErrorComponent type={errors.password.type} el="password" />
          ) : (
            ""
          )}
        </div>
      </form>
      <div className="btnCont">
        <button
          className="signBtn"
          type="submit"
          onClick={handleOnEnterBtnClick}
        >
          {!isSignIn ? "reg" : "enter"}
        </button>
        <div className="signBtn" onClick={handleOnSignBtnClick}>
          {!isSignIn ? "sign in" : "sign up"}
        </div>
      </div>
    </div>
  );
};
