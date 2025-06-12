import { useEffect, useState } from "react";
import "./regCont.style.css";
import { io } from "socket.io-client";
import { data, useNavigate } from "react-router";
import {
  changeEmail,
  changeLogo,
  changeName,
  changeWallet,
} from "../../redux/reducers/userDataSlice";
import { useDispatch } from "react-redux";
import { changeArr } from "../../redux/reducers/arrOfBoughts.reducer";
import { changeArrOfPinCrpt } from "../../redux/reducers/arrOfPinCrpt.reducer";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorComponent } from "../../components";

interface IUser {
  name: string;
  email: string;
  password: string;
}

const socket = io("http://localhost:5000");

export const RegPage = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    unregister,
  } = useForm<IUser>({ mode: "all" });
  const [regError, setRegError] = useState<string>("-40px");
  const [enterError, setEnterError] = useState<string>("-40px");
  const [isPaswShow, setIsPaswShow] = useState<boolean>(false);
  const [paswType, setPaswType] = useState<string>("password");

  useEffect(() => {
    localStorage.getItem("loading")
      ? setTimeout(() => {
          localStorage.removeItem("loading");
        }, 1500)
      : "";
    socket.emit("isWorkToken", localStorage.getItem("token") || "");
    socket.on("getTokenAnser", (answer) => {
      if (answer) {
        socket.emit("getAddInform", localStorage.getItem("email") || "");
        socket.on("giveAddInform", (inform) => {
          dispatch(changeLogo({ logo: inform.logo }));
          dispatch(changeWallet({ wallet: inform.money }));
          dispatch(changeEmail({ email: email }));
          dispatch(changeName({ name: inform.name }));
          dispatch(changeArr({ arr: inform.arr }));
          dispatch(changeArrOfPinCrpt({ arr: inform.arrOfPin }));
        });
        navigate("/");
      }
    });
  }, []);

  const handleOnSubmit: SubmitHandler<IUser> = (data) => {
    setEmail(data.email);

    if (Object.keys(errors).length === 0) {
      if (!isSignIn) {
        socket.emit("registr", {
          name: data.name,
          email: data.email,
          password: data.password,
        });
      } else if (isSignIn) {
        socket.emit("isCorrectLogin", {
          email: data.email,
          password: data.password,
        });
      }
      socket.once("isCorrectReg", async (res) => {
        if (res) {
          localStorage.setItem("email", data.email);

          socket.emit("getAddInform", data.email);
          socket.once("giveAddInform", (inform) => {
            dispatch(changeLogo({ logo: inform.logo }));
            dispatch(changeWallet({ wallet: inform.money }));
            dispatch(changeEmail({ email: data.email }));
            isSignIn
              ? dispatch(changeName({ name: inform.name }))
              : dispatch(changeName({ name: data.name }));
            dispatch(changeArr({ arr: inform.arr }));
            dispatch(changeArrOfPinCrpt({ arr: inform.arrOfPin }));
          });
          socket.emit("createToken", data.email);
          socket.once("getToken", (token) => {
            localStorage.setItem("token", token);
          });
          navigate("/");
        } else {
          console.log(isSignIn);
          if (!isSignIn) {
            setRegError("5px");
            setTimeout(() => setRegError("-40px"), 2000);
          } else {
            setEnterError("5px");
            setTimeout(() => setEnterError("-40px"), 2000);
          }
        }
      });
    }
  };

  const handleOnSignBtnClick = () => {
    reset();
    setRegError("-40px");
    if (!isSignIn) {
      unregister("email");
      unregister("password");
      unregister("name");
    }
    setIsSignIn(!isSignIn);
  };
  const handleOnShowPaswClick = () => {
    if (!isPaswShow) {
      setPaswType("text");
    } else setPaswType("password");
    setIsPaswShow(!isPaswShow);
  };

  return (
    <div className="regCont">
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="inpRegCont">
          {!isSignIn ? (
            <div className="inputsCont">
              {" "}
              <input
                type="text"
                placeholder="Alex"
                {...register(
                  "name",
                  !isSignIn
                    ? {
                        required: true,
                        minLength: 3,
                        pattern: /^[A-Za-z0-9]+$/,
                      }
                    : { required: true }
                )}
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
              type="email"
              placeholder="sasha@crypto.web"
              {...register(
                "email",
                !isSignIn
                  ? {
                      required: true,
                      minLength: 3,
                      pattern: /^[A-Za-z0-9]+@[A-Za-z]+(\.[A-Za-z]+)+$/,
                    }
                  : { required: true }
              )}
            />
            {errors.email && !isSignIn ? (
              <ErrorComponent type={errors.email.type} el="email" />
            ) : (
              ""
            )}
          </div>

          <div className="inputsCont">
            <div className="showPasw" onClick={handleOnShowPaswClick}>
              {" "}
              {!isPaswShow ? (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2767/2767146.png"
                  alt=""
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/158/158746.png"
                  alt=""
                />
              )}
            </div>

            <input
              placeholder="*****"
              type={paswType}
              {...register(
                "password",
                !isSignIn
                  ? {
                      required: true,
                      minLength: 6,
                      pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*_).+$/,
                    }
                  : { required: true }
              )}
            />

            {errors.password && !isSignIn ? (
              <ErrorComponent type={errors.password.type} el="password" />
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="btnCont">
          <button className="signBtn" type="submit">
            {!isSignIn ? "reg" : "enter"}
          </button>
          <div className="signBtn" onClick={handleOnSignBtnClick}>
            {!isSignIn ? "sign in" : "sign up"}
          </div>
        </div>
      </form>

      <div className="erorr" style={{ top: regError, right: "20px" }}>
        This email is already used
      </div>
      <div className="erorr" style={{ top: enterError, right: "320px" }}>
        Wrong password or email is not register
      </div>
    </div>
  );
};
